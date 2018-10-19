import moment from "moment";

export async function getWorkoutFromDates(program, startDate, curDate) {
  const { curDay, curWeek } = getWorkoutDayAndWeek(startDate, curDate);

  const week = program.weeks[curWeek];
  let day = undefined;
  if (week) {
    day = week.days[curDay];
  }

  if (day) {
    return (await day.get()).data();
  }

  return undefined;
}

export function getWorkoutDayAndWeek(startDate, curDate) {
  const startM = moment(startDate);
  const endM = moment(curDate);

  const numDays = endM.diff(startM, "days");

  const curWeek = Math.floor(numDays / 7);
  const curDay = numDays % 7;

  return { curDay, curWeek };
}

export function getDateFromWorkoutDate(startDate, curDay, curWeek) {
  return startDate + curDay + (7 * curWeek);
}

export const dayStrings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];