export const getUnixTimestamps = (date) => {
  let today = Math.floor(date.getTime() / 1000);

  let oneYearAgo = new Date(date);
  oneYearAgo.setFullYear(date.getFullYear() - 1);
  oneYearAgo = Math.floor(oneYearAgo.getTime() / 1000);

  return { today, oneYearAgo };
};

export const ObjectToArray = (obj) => {
  const resultArray = [];

  // Iterate through the arrays 'c' and 't'
  for (let i = 0; i < obj.c.length; i++) {
    // Extract the data from arrays 'c' and 't' at index i
    const cData = obj.c[i];
    const tData = unixTimestampToYearMonthDayString(obj.t[i]);

    // Create an object with 'c' and 't' data and push it into the result array
    resultArray.push({ price: cData, date: tData });
  }

  return resultArray;
};

const unixTimestampToYearMonthDayString = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString(undefined, options);
};
