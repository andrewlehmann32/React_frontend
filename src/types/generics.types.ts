// Imports:
import { HTMLInputTypeAttribute } from "react";
import { InvoiceStatus } from "../constants/constants";

export type TGenericProps = {
  children: React.ReactNode;
  className?: string;
};

export type TImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export type TSplitScreenProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  leftClassName?: string;
  rightClassName?: string;
};

export type TInputProps = {
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
};

export enum Roles {
  ADMINISTRATOR = "Administrator",
  USER = "User",
  OWNER = "Owner",
}

export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
  confirmPassword?: string;
  avatar: {
    public_id?: string;
    url: string;
  };
  googleId?: string;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  projects: ProjectsType[];
  dcimUserId: number;
};

interface teamMember {
  user: User;
  role: string;
}

export interface Resource {
  resourceId: number | string;
  name: string;
  status: string;
  price: number;
  ip: string;
  password: string;
  username: string;
  hostname: string;
  os: string;
  projectId: string;
  serverId: number;
  createdAt: Date;
}

export type ResourcesType = {
  resource: Resource;
  projectId: string;
};

export type ProjectsType = {
  _id: string;
  name: string;
  icon: string;
  createdBy: string;
  createdAt: Date;
  credit?: number;
  teammates?: teamMember[];
  sshKeys?: ISSH[];
  paymentMethods?: PaymentMethodsType[];
  defaultPaymentMethod?: string;
  invoices?: InvoiceType[];
  resources?: ResourcesType[];
};

export type PopulatedProjectsType = {
  _id: string;
  name: string;
  icon: string;
  createdBy: User;
  createdAt: Date;
  credit?: number;
  teammates?: teamMember[];
  sshKeys?: ISSH[];
  paymentMethods?: PaymentMethodsType[];
  defaultPaymentMethod?: string;
  invoices?: InvoiceType[];
  resources?: ResourcesType[];
};

export type ISSH = {
  name: string;
  key: string;
  projectId: string;
};
export type PaymentMethodsType = {
  paymentMethod: any;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type InvoiceType = {
  invoiceNumber: string;
  amount: number;
  status: InvoiceStatus;
  projectId: string;
};

export type PlanData = {
  _id: string;
  name: string;
  cpu: {
    name: string;
    cores: number;
    speed: string;
  };
  ram: number;
  storage: string;
  enabled: boolean;
  network: {
    total: number;
    speed: string;
  };
  price: {
    monthly: number;
    hourly: number;
  };
  regions: Array<{
    name: string;
    quantity: number;
    keyword: string;
  }>;
};

export type HeadersType = {
  Authorization: string;
  "Content-Type"?: string;
  "api-key"?: string;
};
