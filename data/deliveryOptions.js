import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function deliveryDate(offset) {
  const now = dayjs();
  if (!(typeof offset == "number")) {
    for (const option of deliveryOptions) {
      if (option.id == offset) {
        offset = option.deliveryDays;
        break;
      }
    }
  }
  let daysLeft = offset;
  offset = 0;
  while (daysLeft) {
    offset++;
    const tomorrow = now.add(offset, "days").day();
    if (tomorrow && tomorrow < 6) daysLeft--;
  }
  return formatDate(now.add(offset, "days"));
}

export function formatDate(date, includeDay = true) {
  return dayjs(date).format(`${includeDay ? "dddd," : ""} MMMM D`);
}

export function deliveryDurationFactor(orderTime, deliveryTime) {
  orderTime = dayjs(orderTime);
  deliveryTime = dayjs(deliveryTime);
  return dayjs().diff(orderTime) / deliveryTime.diff(orderTime);
}
