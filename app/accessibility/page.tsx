import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ISSUES_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility — clide",
  description:
    "How the clide website is built for keyboard, screen reader and reduced-motion users, what we know is not perfect yet, and how to report a barrier.",
};

export default function AccessibilityPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Accessibility"
      updated="Last updated 1 October 2026"
      intro="clide is a voice tool, so being usable by everyone matters to us. This page says what we do, what we know is incomplete, and how to tell us when we get it wrong."
    >
      <div className="prose">
        <h2>Our goal</h2>
        <p>
          We aim for this website to meet the{" "}
          <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">
            Web Content Accessibility Guidelines (WCAG) 2.2
          </a>{" "}
          at level AA. We have tested it ourselves, including with automated
          checks and keyboard-only use. It has not yet been through an
          independent audit, so we do not claim formal conformance.
        </p>

        <h2>What we have built in</h2>
        <ul>
          <li>Semantic landmarks and heading order on every page, plus a &quot;Skip to content&quot; link as the first focusable item.</li>
          <li>Everything works with a keyboard alone, with a clearly visible focus ring. The mobile menu opens as a modal dialog, keeps focus inside while open, closes with Escape, and hands focus back to the menu button.</li>
          <li>Interactive controls use proper roles and states: switches, radio groups, tabs and buttons announce what they are and whether they are selected.</li>
          <li>Text and controls are designed to meet contrast ratios of at least 4.5:1 for body text and 3:1 for large text and interface components on the dark background.</li>
          <li>The site respects your system&apos;s <strong>Reduce motion</strong> setting: animations are replaced with instant changes, the background shader shows a still frame, and the demo no longer plays by itself.</li>
          <li>Decorative visuals, such as the background shader and the waveform, are hidden from assistive technology.</li>
          <li>Layouts adapt to small screens and to browser zoom up to 200% without losing content or function.</li>
          <li>No content is conveyed by colour alone, and nothing flashes more than three times a second.</li>
          <li>Pages need no cookies or accounts, so nothing blocks you from reading them.</li>
        </ul>

        <h2>Known limitations</h2>
        <ul>
          <li>
            The window on the homepage is an interactive replica of the app, not
            the app itself. It plays a looping demo and some screen reader
            users may find the repeated updates noisy. Reduce Motion stops the
            automatic playback.
          </li>
          <li>
            The background animation uses WebGL. If your browser or device
            cannot run it, a static background is shown instead, and nothing
            is lost.
          </li>
          <li>
            The clide app for macOS has not had a full accessibility review. It
            is built with standard web components inside a native shell, and
            we are working through VoiceOver and keyboard behaviour. Since
            clide is a dictation tool, you can already use it without typing.
          </li>
        </ul>

        <h2>Compatibility</h2>
        <p>
          The site is built to work in current versions of Safari, Chrome,
          Firefox and Edge, and with VoiceOver on macOS and iOS. It relies on
          standard HTML, CSS and JavaScript.
        </p>

        <h2>Tell us about a barrier</h2>
        <p>
          If something on this site is hard or impossible for you to use,
          please open an issue on the{" "}
          <a href={ISSUES_URL} target="_blank" rel="noreferrer">GitHub issue tracker</a>.
          Tell us the page, what you were trying to do, and the browser or
          assistive technology you use. We will look into it and aim to reply
          within a reasonable time, and we will fix confirmed barriers as soon
          as we can. The code is open, so fixes from the community are welcome
          too.
        </p>
      </div>
    </PageShell>
  );
}
