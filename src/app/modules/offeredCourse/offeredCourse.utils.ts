import { TSchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedule) {
    const existingStartTime = new Date(`1998-04-28T${schedule.startTime}`);
    const existingEndTime = new Date(`1998-04-28T${schedule.endTime}`);
    const newStartTime = new Date(`1998-04-28T${newSchedule.startTime}`);
    const newEndTime = new Date(`1998-04-28T${newSchedule.endTime}`);

    // old time: s11.30 - e01.30
    // new time: s10.30 - e11.30
    // (newStartTime < existingEndTime && newEndTime > existingStartTime)
    if (existingStartTime < newEndTime && existingEndTime > newStartTime) {
      return true;
    }
  }
  return false;
};
