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
import { svgDrawer } from "../lib/helpers/svgDrawer";
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

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
}

export const serversList = [
  {
    id: 1,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 2,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 3,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 4,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
  {
    id: 5,
    name: "Ubuntu_webdav",
    ip: "174.193.182.199",
    specs: "1 Core, 12 GB",
  },
];

export const raid = [
  { title: "No RAID", subTitle: "" },
  { title: "RAID 0", subTitle: "Distributes data evenly" },
  { title: "RAID 1", subTitle: "Mirrors data across disks" },
];

export const OS = [
  {
    icon: svgDrawer.centOS,
    title: "CentOS 24.04",
    label: "CentOS 24.04",
  },
  {
    icon: svgDrawer.rocky,
    title: "Rocky 24.04",
    label: "Rocky 24.04",
  },
  {
    icon: svgDrawer.ubuntu,
    title: "Ubuntu 24.04",
    label: "Ubuntu 24.04",
  },
  {
    icon: svgDrawer.debian,
    title: "Debian 24.04",
    label: "Debian 24.04",
  },
  {
    icon: svgDrawer.redHat,
    title: "Red Hat 24.04",
    label: "Red Hat 24.04",
  },
  {
    icon: svgDrawer.windows,
    title: "Windows 24.04",
    label: "Windows 24.04",
  },
];

type OSItem = {
  id?: number;
  icon: React.ReactNode;
  title: string;
  version: string;
};

export const OSOrdering: OSItem[] = [
  {
    id: 33,
    icon: svgDrawer.centOS,
    title: "CentOS",
    version: "20.04 LTS",
  },
  {
    id: 36,
    icon: svgDrawer.rocky,
    title: "Rocky",
    version: "20.04 LTS",
  },
  {
    id: 47,
    icon: svgDrawer.ubuntu,
    title: "Ubuntu",
    version: "20.04 LTS",
  },
  {
    id: 3,
    icon: svgDrawer.debian,
    title: "Debian",
    version: "20.04 LTS",
  },
  {
    id: 33,
    icon: svgDrawer.redHat,
    title: "Red Hat",
    version: "20.04 LTS",
  },
  {
    id: 33,
    icon: svgDrawer.windows,
    title: "Windows",
    version: "20.04 LTS",
  },
];
