import type { ReactNode } from "react";
import { X } from "lucide-react";

export function SlideUp({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-fg/40"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-lg rounded-t-2xl bg-surface p-4 pb-8 shadow-(--shadow-float)">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-lg text-muted hover:bg-surface-2"
            aria-label="Close sheet"
          >
            <X className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
