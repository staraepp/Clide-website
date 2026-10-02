import { BUILD_COMMAND, CLONE_COMMAND, DOWNLOAD, LEGACY, RELEASE, RELEASES_URL } from "@/lib/site";
import { CopyButton } from "./CopyButton";
import { DownloadIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./GetStarted.module.css";

export function GetStarted() {
  const dmg = RELEASE.dmg;

  return (
    <section className={`container ${styles.section}`} id="get-started" aria-labelledby="start-title">
      <SectionHead
        index="04"
        label="Get started"
        titleId="start-title"
        title={
          <>
            Get clide, or <span className="serif">build it yourself.</span>
          </>
        }
      />

      <div className={styles.grid}>
        <Reveal className={styles.primary}>
          <div className={styles.download}>
            <div className={styles.downloadHead}>
              <span className="eyebrow">
                v{RELEASE.version} · Apple Silicon · macOS {RELEASE.minMacOS}+
              </span>
              <h3>clide for Mac</h3>
              <p>
                A native Tauri app: Rust under the hood, React on top. Runs fully on your Mac, and
                updates itself only when you press the button.
              </p>
            </div>

            {dmg ? (
              <>
                <a className="btn btn-primary" href={DOWNLOAD.href} download>
                  <DownloadIcon />
                  Download {dmg.size}
                </a>
                <div className={styles.callout} data-notarized={RELEASE.notarized}>
                  <p>
                    {RELEASE.notarized
                      ? "Signed with a Developer ID certificate and notarized by Apple, so it opens without a Gatekeeper warning."
                      : "This build is not notarized, so macOS may show a Gatekeeper warning the first time. Right-click the app and choose Open."}
                  </p>
                </div>
                <dl className={styles.checksum}>
                  <dt className="eyebrow">SHA-256</dt>
                  <dd>
                    <code>{dmg.sha256}</code>
                    <CopyButton text={dmg.sha256} label="Copy" />
                  </dd>
                </dl>
              </>
            ) : (
              <>
                <div className={styles.callout} data-notarized="true">
                  <p>
                    Version {RELEASE.version} is merged and ready to build from source today. The
                    signed, notarized download is being published. When it is, this button becomes a
                    download that opens without a Gatekeeper warning.
                  </p>
                </div>
                <a className="btn btn-ghost" href={RELEASES_URL} target="_blank" rel="noreferrer">
                  Watch releases on GitHub
                </a>
              </>
            )}

            <p className={styles.legacy}>
              Looking for the previous preview?{" "}
              <a href={LEGACY.url} download>
                {LEGACY.version} ({LEGACY.size})
              </a>{" "}
              is not notarized and still includes optional cloud engines that were removed in{" "}
              {RELEASE.version}. It cannot update itself.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={styles.secondary}>
          <div className={styles.command}>
            <div>
              <h3>Build from source</h3>
              <p>Use the bundled app, not Tauri dev, so microphone and Accessibility permissions behave.</p>
            </div>
            <code>{BUILD_COMMAND}</code>
            <CopyButton text={BUILD_COMMAND} label="Copy build command" />
          </div>
          <div className={styles.command}>
            <div>
              <h3>Fork it and hack</h3>
              <p>MIT licensed. Clone it into a fresh directory and make clide yours.</p>
            </div>
            <code>{CLONE_COMMAND}</code>
            <CopyButton text={CLONE_COMMAND} label="Copy clone command" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
