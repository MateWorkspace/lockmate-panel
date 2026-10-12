import Avatar from "@/components/ui/avatar";
import Badge, { type BadgeTone } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import type { User, UserStatus } from "@/lib/mock";

const STATUS: Record<UserStatus, { tone: BadgeTone; label: string }> = {
  active: { tone: "success", label: "Active" },
  invited: { tone: "info", label: "Invited" },
  suspended: { tone: "warning", label: "Suspended" },
};

export default function UserCard({
  user,
  roleName,
}: {
  user: User;
  roleName: string;
}) {
  const status = STATUS[user.status];

  return (
    <Card className="lift flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <Avatar name={user.name} className="h-11 w-11" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate font-semibold">{user.name}</p>
          <p className="text-muted truncate text-sm">{user.email}</p>
        </div>
        <Badge tone={status.tone} dot>
          {status.label}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">{roleName}</Badge>
        {user.spaces.map((space) => (
          <Badge key={space}>{space}</Badge>
        ))}
      </div>

      <div className="border-border text-muted mt-auto flex items-center justify-between gap-3 border-t pt-3 text-xs">
        <span className="truncate">{user.lastActiveLabel}</span>
        <span className="font-mono text-[0.7rem]">{user.id}</span>
      </div>
    </Card>
  );
}
