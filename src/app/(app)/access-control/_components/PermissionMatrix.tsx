"use client";

import { useMemo, useState } from "react";

import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import type { Permission } from "@/lib/mock";

interface PermissionMatrixProps {
  permissions: Permission[];
  permissionGroups: string[];
  initial: string[];
  editable: boolean;
}

type SaveState = "idle" | "saving" | "saved";

export default function PermissionMatrix({
  permissions,
  permissionGroups,
  initial,
  editable,
}: PermissionMatrixProps) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initial));
  const [state, setState] = useState<SaveState>("idle");

  const grouped = useMemo(
    () =>
      permissionGroups.map((group) => ({
        group,
        items: permissions.filter((permission) => permission.group === group),
      })),
    [permissions, permissionGroups]
  );

  function toggle(slug: string) {
    if (!editable) {
      return;
    }
    setState("idle");
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function save() {
    setState("saving");
    window.setTimeout(() => setState("saved"), 550);
  }

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-foreground text-lg font-bold">
          Permissions
        </h3>
        <Badge tone="accent">
          <span className="font-mono tabular-nums">{selected.size}</span> of{" "}
          <span className="font-mono tabular-nums">{permissions.length}</span>
        </Badge>
      </div>

      <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2">
        {grouped.map((section) => (
          <fieldset key={section.group} className="min-w-0">
            <legend className="eyebrow mb-2">{section.group}</legend>
            <div className="flex flex-col gap-1">
              {section.items.map((permission) => {
                const checked = selected.has(permission.slug);
                return (
                  <label
                    key={permission.slug}
                    className="hover:bg-surface-2/60 flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!editable}
                      onChange={() => toggle(permission.slug)}
                      className="accent-primary focus-visible:ring-focus/50 h-4 w-4 shrink-0 rounded focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
                    />
                    <span className="text-foreground min-w-0 flex-1 text-sm">
                      {permission.label}
                    </span>
                    <span className="text-subtle hidden font-mono text-[0.7rem] sm:inline">
                      {permission.slug}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="border-border mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <p className="text-muted text-sm">
          {editable
            ? "Changes apply to everyone holding this role."
            : "System roles are read-only."}
        </p>
        <div className="flex items-center gap-3">
          {state === "saved" ? (
            <Badge tone="success" dot>
              Saved
            </Badge>
          ) : null}
          <Button
            size="sm"
            onClick={save}
            disabled={!editable}
            loading={state === "saving"}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
