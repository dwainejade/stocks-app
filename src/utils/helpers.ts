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

const unixTimestampToYearMonthDayString = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and pad with '0' if needed
  const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if needed
  return `${year}-${month}-${day}`;
};
