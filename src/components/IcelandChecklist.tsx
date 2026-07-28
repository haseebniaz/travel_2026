"use client";

import { useEffect, useState } from "react";
import type { ChecklistGroup } from "@/data/iceland";

const STORAGE_KEY = "iceland-family-checklist";

/**
 * The book & pack checklists, with real checkboxes persisted to localStorage
 * so ticks survive reloads on the same device.
 */
export default function IcelandChecklist({ groups }: { groups: ChecklistGroup[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore unreadable storage
    }
  }, []);

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage may be unavailable; ticks just won't persist
      }
      return next;
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <div key={g.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sea-900/5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-sea-900">
            <span>{g.icon}</span> {g.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {g.items.map((item, i) => {
              const key = `${g.title}-${i}`;
              const on = !!checked[key];
              return (
                <li key={key}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(key)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-sea-700"
                    />
                    <span className={on ? "text-sea-700/50 line-through" : "text-sea-700"}>
                      {item}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
