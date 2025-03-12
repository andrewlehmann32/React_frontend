// Imports:
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import axios from "../../lib/apiConfig";

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

export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log(error)
      const status = error.response.status;
      const message = error.response.data?.error;

      switch (status) {
        case 400:
          toast.error(message ?? `Bad Request: ${message}`);
          break;
        case 401:
          toast.error(message ?? "Unauthorized. Please log in again.");
          break;
        case 403:
          toast.error(message ?? "Access denied. You don't have permission to perform this action.");
          break;
        case 404:
          toast.error(message ?? "Resource not found.");
          break;
        case 500:
          toast.error(message ?? "Internal server error. Please try again later.");
          break;
        default:
          toast.error(message);
          break;
      }
    } else if (error.request) {
      // Request made but no response received
      toast.error("No response from the server. Please check your network.");
    } else {
      // Something else happened
      toast.error(`Error: ${error.message}`);
    }
  } else {
    // Non-Axios errors
    toast.error(error?.message ?? "An unexpected error occurred.");
  }
};
