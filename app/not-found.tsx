import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found — clide",
  description: "That page does not exist.",
};

/**
 * The 404.
 *
 * A dictation app's missing page should look like a dictation that came back
 * empty: the waveform is flat, and the status line reads the way clide's own
 * HUD would. It stays a signpost rather than a joke — the useful links are the
 * point, the flat line is just why you smile on the way to them.
 */
export default function NotFound() {
  const FLAT = Array.from({ length: 13 }, () => 4);

  return (
    <main className="legal-page container" style={{ textAlign: "center" }}>
      <span
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          height: 34,
          marginBottom: 28,
        }}
      >
        {FLAT.map((height, index) => (
          <span
            key={index}
            style={{
              width: 5,
              height,
              borderRadius: 2.5,
              background: "var(--brand-text)",
              opacity: 0.45,
            }}
          />
        ))}
      </span>

      <h1 className="t-h1">Nothing here to transcribe</h1>
      <p style={{ maxWidth: 460, marginInline: "auto" }}>
        That page does not exist. It may have moved, or the link may have been
        mistyped — which, in fairness, is the problem clide exists to solve.
      </p>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 28,
        }}
      >
        <Link className="btn btn-primary" href="/">Back to clide</Link>
        <Link className="btn btn-secondary" href="/docs">Read the docs</Link>
        <Link className="btn btn-secondary" href="/changelog">Changelog</Link>
      </div>
    </main>
  );
}
