// Imports:
import { Home } from "lucide-react";
import { ComponentType } from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { GiHouseKeys } from "react-icons/gi";
import { HiServerStack } from "react-icons/hi2";
import { LuSquareActivity } from "react-icons/lu";
import {
  PiCreditCardDuotone,
  PiShoppingCartSimpleDuotone,
} from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
// Menu items.

interface MenuItem {
  identifier: string;
  title: string;
  url: string;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const menuItems: MenuItem[] = [
  {
    identifier: "home",
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    identifier: "resources",
    title: "Compute Resources",
    url: "/resources",
    icon: HiServerStack,
  },
  {
    identifier: "team",
    title: "Team",
    url: "/team",
    icon: RiTeamLine,
  },
  {
    identifier: "ordering",
    title: "Ordering",
    url: "/ordering",
    icon: PiShoppingCartSimpleDuotone,
  },
  {
    identifier: "billing",
    title: "Billing",
    url: "/billing",
    icon: PiCreditCardDuotone,
  },
  {
    identifier: "sshkeys",
    title: "SSH Keys",
    url: "/sshkeys",
    icon: GiHouseKeys,
  },
];

export const miscItems = [
  {
    identifier: "activity",
    title: "Activity Log",
    url: "/activity",
    icon: LuSquareActivity,
  },
  {
    identifier: "help",
    title: "Help Center",
    url: "/help",
    icon: BsQuestionSquare,
  },
];

export enum DROPDOWN_DIRECTION {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}
