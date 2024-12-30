import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { adminControllers } from "./admin.controller";
import { AdminValidations } from "./admin.validation";

const router = Router();

// get all faculties
router.get("/", adminControllers.getAllAdmins);

// get single admin
router.get("/:id", adminControllers.getSingleAdmin);

// update single admin
router.patch(
  "/:id",
  validateRequest(AdminValidations.UpdateAdmin),
  adminControllers.updateSingleAdmin,
);
// delete single admin
router.delete("/:id", adminControllers.deleteSingleAdmin);

export const adminRouter = router;
