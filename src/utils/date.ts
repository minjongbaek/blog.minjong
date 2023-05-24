export const dateFormat = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
};

export const getPreiod = (startDate: Date, endDate?: Date) => {
  if (!endDate) return "진행 중";
  const years =
    (Number(endDate.getFullYear()) - Number(startDate.getFullYear())) * 12;
  const months = Math.abs(
    Number(endDate.getMonth()) - Number(startDate.getMonth())
  );

  const periodMonth = Math.abs(years - months) % 12;
  const periodYear = Math.floor(Math.abs(years - months) / 12);

  if (periodYear === 0) return `${periodMonth}개월`;
  if (periodMonth === 0) return `${periodYear}년`;

  return `${periodYear}년 ${periodMonth}개월`;
};
