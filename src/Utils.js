// Yay for StackOverflow
// https://stackoverflow.com/questions/22859704/number-of-weeks-between-two-dates-using-javascript
export function calculateWeeksBetween(date1, date2) {
  // The number of milliseconds in one week
  var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return hole weeks
  return Math.floor(difference_ms / ONE_WEEK);
}

export function getWorkoutDayAndWeek(startDate, curDate) {
  if (startDate.getDay() != 1) {
    // start must be a monday
    return undefined;
  }

  // get index in day list
  let curDay = curDate.getDay() - 1;
  if (curDay < 0) curDay = 6;

  const curWeek = calculateWeeksBetween(startDate, curDate);

  return { curDay, curWeek };
}

export function getDateFromWorkoutDate(startDate, curDay, curWeek) {
  return startDate + curDay + (7 * curWeek);
}

export const dayStrings = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const getInitials = name => {
  if (!name.length) return "AP";

  const arr = name.split(" ");
  if (arr.length > 1) return `${arr[0][0].toUpperCase()}${arr[1][0].toUpperCase()}`;
  return arr[0].toUpperCase();
};
