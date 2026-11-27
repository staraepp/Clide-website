"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DOWNLOAD, REPO_URL } from "@/lib/site";
import { CloseIcon, DownloadIcon, GithubIcon, MenuIcon } from "./Icons";
import { Logo } from "./Logo";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#models", label: "Models" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) menuButton.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !sheet.current) return;
      const items = sheet.current.querySelectorAll<HTMLElement>("a[href], button");
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={styles.wrap}>
        <motion.div
          className={styles.bar}
          data-scrolled={scrolled}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className={styles.brand} aria-label="clide home">
            <Logo size={22} animated />
            <span>clide</span>
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              className={styles.iconLink}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="clide on GitHub"
            >
              <GithubIcon size={17} />
            </a>
            <a className="btn btn-primary btn-sm" href={DOWNLOAD.href}>
              <DownloadIcon size={14} />
              {DOWNLOAD.label}
            </a>
            <button
              ref={menuButton}
              type="button"
              className={styles.menuButton}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={sheet}
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.sheetHead}>
              <span className={styles.brand}>
                <Logo size={22} />
                <span>clide</span>
              </span>
              <button
                type="button"
                className={styles.menuButton}
                style={{ display: "grid" }}
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>
            <nav className={styles.sheetLinks} aria-label="Mobile">
              {[...LINKS, { href: DOWNLOAD.href, label: DOWNLOAD.label }].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
