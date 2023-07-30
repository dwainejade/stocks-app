export const getUnixTimestamps = (date) => {
  let today = Math.floor(date.getTime() / 1000);

  let oneYearAgo = new Date(date);
  oneYearAgo.setFullYear(date.getFullYear() - 1);
  oneYearAgo = Math.floor(oneYearAgo.getTime() / 1000);

  return { today, oneYearAgo };
};
