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

export type ProjectsType = {
  name: string;
  icon?: string;
  createdBy: string;
  createdAt?: Date;
  teammates?: string[];
  sshKeys?: string[];
  paymentMethod?: string;
};
