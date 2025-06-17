import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

// get all Admins
const getAllAdmins = catchAsync(async (req, res) => {
  // console.log(req.query);
  const result = await adminServices.getAllAdminsFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all Admins successfully",
    data: result,
  });
});

// get single admin
const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a admin successfully",
    data: result,
  });
});

// update single admin
const updateSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.updateSingleAdminIntoDb(
    id,
    req.body.admin,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a admin successfully",
    data: result,
  });
});
// delete single admin
const deleteSingleAdmin = catchAsync(async (req, res) => {
  const  id  = req.params.id;
  const result = await adminServices.deleteSingleAdminFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete a admin successfully",
    data: result,
  });
});

export const adminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
