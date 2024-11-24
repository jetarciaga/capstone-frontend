export const convertDate = (strDate) => {
  const date = new Date(strDate);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const convertTime = (strTime) => {
  const [hours, minutes] = strTime.split(":");

  const date = new Date();
  date.setHours(hours, minutes);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hours12: true,
  }).format(date);
  return formattedTime;
};
