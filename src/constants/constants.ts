// Imports:
import { Calendar, Home } from "lucide-react";
import { ComponentType } from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { HiServerStack } from "react-icons/hi2";
import { LuSquareActivity } from "react-icons/lu";
import {
  PiCreditCardDuotone,
  PiShoppingCartSimpleDuotone,
} from "react-icons/pi";
// Menu items.

interface MenuItem {
  title: string;
  url: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Compute Resources",
    url: "#",
    icon: HiServerStack,
  },
  {
    title: "Team",
    url: "/team",
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
