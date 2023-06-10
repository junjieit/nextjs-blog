function addZeroPrefix(text: string | number) {
  const textRes = String(text);
  if (textRes.length === 1) {
    return `0${textRes}`;
  }
  return textRes;
}
export function formatDate(
  dateProps: Date | number,
  {
    split = "-",
    showTime,
  }: {
    split?: string;
    showTime?: boolean;
  } = {}
) {
  const date = typeof dateProps === "number" ? new Date(dateProps) : dateProps;
  const timeSplit = ":";
  const Y = date.getFullYear();
  const M = addZeroPrefix(date.getMonth() + 1);
  const D = addZeroPrefix(date.getDate());
  let res = `${Y}${split}${M}${split}${D}`;
  if (!showTime) return res;
  const h = addZeroPrefix(date.getHours());
  const m = addZeroPrefix(date.getMinutes());
  const s = addZeroPrefix(date.getSeconds());
  res += ` ${h}${timeSplit}${m}${timeSplit}${s}`;
  return res;
}
