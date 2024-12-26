// Imports:
import { Calendar, Home } from "lucide-react";
import { BsQuestionSquare } from "react-icons/bs";
import { LuSquareActivity } from "react-icons/lu";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { PiCreditCardDuotone } from "react-icons/pi";
import { HiServerStack } from "react-icons/hi2";
// Menu items.
export const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Compute Resources",
    url: "#",
    icon: HiServerStack,
  },
  {
    title: "Team",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Ordering",
    url: "#",
    icon: PiShoppingCartSimpleDuotone,
  },
  {
    title: "Billing",
    url: "#",
    icon: PiCreditCardDuotone,
  },
];

export const miscItems = [
  {
    title: "Activity Log",
    url: "#",
    icon: LuSquareActivity,
  },
  {
    title: "Help Center",
    url: "#",
    icon: BsQuestionSquare,
  },
];
