"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Toggle } from "@/shared/components/ui/toggle";
import { Icons } from "@/shared/components/icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSystemActive = mounted && theme === "system";
  const isDarkActive = mounted && theme === "dark";
  const isLightActive = mounted && theme === "light";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border bg-[#fafafa] p-1 dark:border-zinc-800 dark:bg-[#111]">
      <Toggle
        aria-label="Use system theme"
        pressed={isSystemActive}
        className="rounded-full px-2 text-zinc-700 data-[state=on]:bg-white data-[state=on]:text-zinc-900 data-[state=on]:shadow-xl dark:text-zinc-500 dark:data-[state=on]:bg-[#333] dark:data-[state=on]:text-zinc-50"
        onPressedChange={() => setTheme("system")}
      >
        <Icons.monitor />
      </Toggle>
      <Toggle
        aria-label="Use dark theme"
        pressed={isDarkActive}
        className="rounded-full px-2 text-zinc-700 data-[state=on]:bg-white data-[state=on]:text-zinc-900 data-[state=on]:shadow-xl dark:text-zinc-500 dark:data-[state=on]:bg-[#333] dark:data-[state=on]:text-zinc-50"
        onPressedChange={() => setTheme("dark")}
      >
        <Icons.moon />
      </Toggle>
      <Toggle
        aria-label="Use light theme"
        pressed={isLightActive}
        className="rounded-full px-2 text-zinc-700 data-[state=on]:bg-white data-[state=on]:text-zinc-900 data-[state=on]:shadow-xl dark:text-zinc-500 dark:data-[state=on]:bg-[#333] dark:data-[state=on]:text-zinc-50"
        onPressedChange={() => setTheme("light")}
      >
        <Icons.sun />
      </Toggle>
    </div>
  );
}
