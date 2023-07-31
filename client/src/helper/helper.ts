export const convertDateToEpoch = (date: number): number => {
  return Math.floor(date / 1000);
};

export const convertEpochToTimeString = (num: number) => {
  console.log('num', num);
  const hours = Math.floor(num / 3600);
  const minutes = Math.floor((num % 3600) / 60);
  const seconds = num % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
