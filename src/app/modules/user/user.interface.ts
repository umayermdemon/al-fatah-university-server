export type TUser = {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: "Student" | "Admin" | "Faculty";
  status: "In-progress" | "Blocked";
  isDeleted: boolean;
};
