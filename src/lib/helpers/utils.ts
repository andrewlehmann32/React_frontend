// Imports:
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const mergeClasses = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const calculateDaysFromDate = (createdAt: Date): number => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  // Calculate the difference in time
  const timeDifference = currentDate.getTime() - createdDate.getTime();

  // Convert time difference from milliseconds to days
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Return the number of days, rounded to the nearest whole number
  return Math.floor(daysDifference);
};
