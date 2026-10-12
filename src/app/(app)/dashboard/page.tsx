import type { Metadata } from "next";
import type { ReactNode } from "react";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import {
  KeyIcon,
  LayersIcon,
  PlusIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { activity, stats } from "@/lib/mock";

import ActivityFeed from "./_components/ActivityFeed";
import Spotlight from "./_components/Spotlight";
import StatTile from "./_components/StatTile";

export const metadata: Metadata = {
  title: "Overview",
};

const STAT_ICONS: Record<string, ReactNode> = {
  stat_users: <UsersIcon />,
  stat_spaces: <LayersIcon />,
  stat_sessions: <KeyIcon />,
  stat_roles: <ShieldIcon />,
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        eyebrow="Overview"
        title="The identity fleet, at a glance"
        description="Users, spaces, live sessions, and the roles that bind them together."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">
              <PlusIcon className="h-4 w-4" />
              Invite user
            </Button>
          </>
        }
      />

      <section
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        aria-label="Key metrics"
      >
        {stats.map((stat) => (
          <StatTile key={stat.id} stat={stat} icon={STAT_ICONS[stat.id]} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="font-display text-foreground text-xl font-bold">
              Recent activity
            </h2>
            <span className="eyebrow">Live</span>
          </div>
          <ActivityFeed entries={activity} />
        </Card>

        <Spotlight />
      </section>
    </div>
  );
}
