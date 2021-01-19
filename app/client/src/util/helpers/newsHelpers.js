export const getDate = (date) => {
  console.log(date);
  const formattedDate = date.slice(0, 10).split("-").reverse().join("-");
  console.log(formattedDate);
  return formattedDate;
};
