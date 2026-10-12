export type UserStatus = "active" | "invited" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: UserStatus;
  spaces: string[];
  lastActiveLabel: string;
}

export interface Permission {
  slug: string;
  label: string;
  group: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  system: boolean;
  permissionSlugs: string[];
  updatedLabel: string;
}

export interface ActivityEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  label: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  delta: string;
  tone: "primary" | "accent" | "success" | "info";
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roleName: string;
  spaces: string[];
}
