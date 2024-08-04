function getNextDate(date: Date, seconds: number): Date {
  const time = new Date(date.getTime());
  time.setSeconds(time.getSeconds() + seconds);
  return time;
}

export { getNextDate };
