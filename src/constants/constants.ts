// Imports:
import { Home } from "lucide-react";
import { ComponentType } from "react";
import { BsQuestionSquare } from "react-icons/bs";
import {
  FaClipboardList,
  FaProjectDiagram,
  FaShoppingCart,
  FaUserFriends,
} from "react-icons/fa";
import { GiHouseKeys } from "react-icons/gi";
import { HiServerStack } from "react-icons/hi2";
import { LuSquareActivity } from "react-icons/lu";
import { MdAdminPanelSettings, MdAttachMoney } from "react-icons/md";
import {
  PiCreditCardDuotone,
  PiShoppingCartSimpleDuotone,
} from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { svgDrawer } from "../lib/helpers/svgDrawer";
import { PlanData } from "../types/generics.types";
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

export const adminMenuItems: MenuItem[] = [
  {
    identifier: "admin/home",
    title: "Home",
    url: "/admin/home",
    icon: MdAdminPanelSettings,
  },
  {
    identifier: "admin/projects",
    title: "Projects",
    url: "/admin/projects",
    icon: FaProjectDiagram,
  },
  {
    identifier: "admin/clients",
    title: "Clients",
    url: "/admin/clients",
    icon: FaUserFriends,
  },
  {
    identifier: "credit",
    title: "Credit",
    url: "/admin/credit",
    icon: MdAttachMoney,
  },
  {
    identifier: "admin/orders",
    title: "Orders",
    url: "/admin/orders",
    icon: FaShoppingCart,
  },
  {
    identifier: "admin/plans",
    title: "Plans",
    url: "/admin/plans",
    icon: FaClipboardList,
  },
  {
    identifier: "admin/servers",
    title: "Manage Servers",
    url: "/admin/servers",
    icon: HiServerStack,
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

export const initialPlan: PlanData = {
  name: "",
  cpu: {
    name: "",
    cores: 0,
    speed: "",
  },
  ram: 0,
  storage: "",
  network: {
    total: 0,
    speed: "",
  },
  price: {
    monthly: 0,
    hourly: 0,
  },
  enabled: true,
  regions: [
    {
      name: "",
      quantity: 0,
      keyword: "",
    },
  ],
};

export const initialPlansData: PlanData[] = [
  {
    name: "c2.small.x86",
    cpu: {
      name: "E-2173G",
      cores: 6,
      speed: "3.7",
    },
    ram: 32,
    storage: "500",
    network: {
      total: 20,
      speed: "1",
    },
    price: {
      monthly: 92,
      hourly: 0.13,
    },
    enabled: true,
    regions: [
      {
        name: "New York",
        quantity: 2,
        keyword: "NY",
      },
    ],
  },
  {
    name: "c2.medium.x86",
    cpu: {
      name: "E-2288G",
      cores: 8,
      speed: "3.8",
    },
    ram: 64,
    storage: "1000",
    network: {
      total: 40,
      speed: "2",
    },
    price: {
      monthly: 150,
      hourly: 0.2,
    },
    enabled: false,
    regions: [
      {
        name: "New York",
        quantity: 2,
        keyword: "NY",
      },
    ],
  },
  {
    name: "c2.large.x86",
    cpu: {
      name: "E-2378G",
      cores: 12,
      speed: "3.9",
    },
    ram: 128,
    storage: "2000",
    network: {
      total: 80,
      speed: "4",
    },
    price: {
      monthly: 300,
      hourly: 0.4,
    },
    enabled: true,
    regions: [
      {
        name: "New York",
        quantity: 2,
        keyword: "NY",
      },
    ],
  },
];
