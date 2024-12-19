import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./course.const";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import httpStatus from "http-status";

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.queryModel;
  return result;
};
const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course",
  );
  return result;
};
const updateSingleCourseIntoDb = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  //   step-1: basic course info update
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    { new: true, runValidators: true },
  );
  if (!updateBasicCourseInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // delete preRequisite course
    const deletePreRequisites = preRequisiteCourses
      .filter(el => el.course && el.isDeleted)
      .map(el => el.course);
    const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequisites } } },
    });
    if (!deletePreRequisiteCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    // add preRequisite course
    const addPreRequisites = preRequisiteCourses.filter(
      el => el.course && !el.isDeleted,
    );
    const addPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: addPreRequisites } },
    });
    if (!addPreRequisiteCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }
  }
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course",
  );
  return result;
};
const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
  updateSingleCourseIntoDb,
};
