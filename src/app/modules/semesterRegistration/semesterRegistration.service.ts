/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.const";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import httpStatus from "http-status";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  // is academic semester exist?
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester not found");
  }

  // is semester already registered
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, "This semester already registered");
  }
  // Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSEmester?.status} registered semester`,
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationIntoDb = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.queryModel;
  return result;
};
const getSingleSemesterRegistrationIntoDb = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDb = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester not found");
  }
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;
  // check registration status === ENDED
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester already ${currentSemesterStatus}`,
    );
  }
  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSemesterRegistrationIntoDb = async (id: string) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester not found");
  }
  const semesterRegistrationStatus = isSemesterRegistrationExists?.status;

  if (semesterRegistrationStatus !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );
    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration !",
      );
    }
    const deleteSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, { session, new: true });
    if (!deleteSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration !",
      );
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDb,
  getAllSemesterRegistrationIntoDb,
  getSingleSemesterRegistrationIntoDb,
  updateSemesterRegistrationIntoDb,
  deleteSemesterRegistrationIntoDb,
};
