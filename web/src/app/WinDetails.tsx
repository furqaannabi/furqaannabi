"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Win } from "./data";

/**
 * Full-card click target that opens a modal with the complete project record.
 * Uses the native <dialog> (focus trap, Esc, top layer) portalled to <body>
 * so the card's hover transform doesn't bleed into the modal.
 */
export default function WinDetails({
  win,
  rank,
  total,
}: {
  win: Win;
  rank: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  const close = () => dialogRef.current?.close();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const meta: [string, string][] = [
    ["PLACEMENT", win.placement],
    ["EVENT", win.event],
    ["ORG", win.org],
    ["DATE", win.date.toUpperCase()],
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`View details for ${win.name}`}
        className="absolute inset-0 z-0 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-secondary"
      />

      {open &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby="win-details-title"
            onClose={() => setOpen(false)}
            onClick={(e) => {
              // Clicks on the dialog element itself land on the backdrop
              if (e.target === e.currentTarget) close();
            }}
            className="project-dialog m-auto p-0 bg-transparent text-on-surface w-[calc(100%-32px)] max-w-2xl max-h-[calc(100dvh-32px)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
          >
            <div className="module-border bg-surface-container-lowest flex flex-col max-h-[calc(100dvh-32px)]">
              {/* Title bar */}
              <div className="border-b border-surface-variant p-2 px-4 flex items-center justify-between bg-surface-container-low shrink-0">
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  {`PROJECT_DETAIL // RANK_${pad(rank)}_OF_${pad(total)}`}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="font-label-caps text-label-caps text-outline hover:text-secondary transition-colors"
                  aria-label="Close"
                >
                  [ ESC ]
                </button>
              </div>

              <div className="p-module-padding flex flex-col gap-6 overflow-y-auto">
                <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3">
                  <h2
                    id="win-details-title"
                    className="font-headline-md text-headline-sm sm:text-headline-md text-secondary"
                  >
                    {win.name}
                  </h2>
                  <span className="self-start font-label-caps text-label-caps border px-2 py-1 whitespace-nowrap text-tertiary border-tertiary bg-tertiary-fixed-dim/10">
                    {`PRIZE ${win.prize}`}
                  </span>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-surface-variant">
                  {meta.map(([label, value]) => (
                    <div
                      key={label}
                      className="border-b border-r border-surface-variant px-3 py-2"
                    >
                      <dt className="font-label-caps text-label-caps text-outline">
                        {label}
                      </dt>
                      <dd className="font-body-md text-body-md text-on-surface mt-1">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <div className="font-label-caps text-label-caps text-outline mb-2">
                    &gt; DESCRIPTION
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    {win.description}
                  </p>
                </div>

                <div>
                  <div className="font-label-caps text-label-caps text-outline mb-2">
                    &gt; STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {win.stack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-variant text-on-surface px-2 py-1 font-label-caps text-label-caps"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-surface-variant">
                  <a
                    href={win.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-button font-label-caps text-label-caps px-5 py-3 uppercase tracking-widest text-primary"
                  >
                    [ View Source ]
                  </a>
                  {win.proof && (
                    <a
                      href={win.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-button font-label-caps text-label-caps px-5 py-3 uppercase tracking-widest text-primary"
                    >
                      [ Proof ]
                    </a>
                  )}
                </div>
              </div>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
