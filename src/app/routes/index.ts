import { Router } from "express";
import { studentRouter } from "../modules/student/student.route";
import { userRouter } from "../modules/user/user.route";

const router = Router();

const routes = [
  {
    path: "/students",
    route: studentRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
