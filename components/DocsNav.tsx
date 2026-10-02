"use client";

import { useEffect, useState } from "react";
import styles from "./DocsNav.module.css";

type Section = { id: string; label: string };

/** Sticky table of contents that highlights the section currently being read. */
export function DocsNav({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.nav} aria-label="On this page">
      <p className="eyebrow">On this page</p>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
              data-active={active === section.id}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
