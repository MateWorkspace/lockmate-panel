import type { ActivityEntry, Stat } from "./types";

export const activity: ActivityEntry[] = [
  {
    id: "act_01",
    actor: "Citra Halim",
    action: "granted",
    target: "session:revoke → Support",
    label: "18 minutes ago",
  },
  {
    id: "act_02",
    actor: "Bayu Pratama",
    action: "invited",
    target: "putri@partner.dev",
    label: "2 hours ago",
  },
  {
    id: "act_03",
    actor: "Sari Wijaya",
    action: "exported",
    target: "Audit log · last 7 days",
    label: "5 hours ago",
  },
  {
    id: "act_04",
    actor: "Rangga Putra",
    action: "revoked",
    target: "3 sessions for Maya Lestari",
    label: "Yesterday",
  },
  {
    id: "act_05",
    actor: "Fajar Ramadhan",
    action: "registered",
    target: "client · ops-dashboard",
    label: "Yesterday",
  },
  {
    id: "act_06",
    actor: "Dewi Kartika",
    action: "created",
    target: "role · Auditor",
    label: "3 days ago",
  },
];

export const stats: Stat[] = [
  {
    id: "stat_users",
    label: "Active users",
    value: 1284,
    delta: "+42 this month",
    tone: "primary",
  },
  {
    id: "stat_spaces",
    label: "Spaces",
    value: 17,
    delta: "2 pending invite",
    tone: "accent",
  },
  {
    id: "stat_sessions",
    label: "Live sessions",
    value: 342,
    delta: "across 6 regions",
    tone: "info",
  },
  {
    id: "stat_roles",
    label: "Roles",
    value: 9,
    delta: "1 custom this week",
    tone: "success",
  },
];
