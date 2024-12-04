import { TUser } from "./user.interface";
import { User } from "./user.model";

// create user
const createUserIntoDb = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};
// get all user
const getAllUserFromDb = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUserFromDb,
};
