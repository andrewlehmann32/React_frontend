// Imports:
import { HTMLInputTypeAttribute } from "react";

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
  role: "user" | "admin";
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  projects: ProjectsType[];
};

export type ProjectsType = {
  _id: string;
  name: string;
  icon?: string;
  createdBy: string;
  createdAt: Date;
  teammates?: User[];
  sshKeys?: ISSH[];
  paymentMethod?: string;
};

export type ISSH = {
  name: string;
  key: string;
  projectId: string;
};
