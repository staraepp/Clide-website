import { BUILD_COMMAND, CLONE_COMMAND, LEGACY, RELEASE, RELEASES_URL } from "@/lib/site";
import { CopyButton } from "./CopyButton";
import { DownloadIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./GetStarted.module.css";

const INSTALLERS = [
  {
    name: "macOS",
    requirements: `Apple Silicon · macOS ${RELEASE.minMacOS}+`,
    description: "Open the signed, notarized disk image and drag clide into Applications.",
    asset: RELEASE.dmg,
  },
  {
    name: "Windows",
    requirements: "Windows x64 · WebView2",
    description: "Run the setup file and choose a local Whisper or Parakeet model. This installer is unsigned.",
    asset: RELEASE.windows,
  },
  {
    name: "Windows with CUDA",
    requirements: "Windows x64 · NVIDIA GPU · WebView2",
    description: "Optional CUDA 13 acceleration for Whisper and Parakeet. Requires a compatible NVIDIA driver. This installer is unsigned.",
    asset: RELEASE.cuda,
  },
];

export function GetStarted() {
  return (
    <section className={`container ${styles.section}`} id="get-started" aria-labelledby="start-title">
      <SectionHead
        index="04"
        label={`Download · v${RELEASE.version}`}
        titleId="start-title"
        title={<>Get clide <span className="serif">for your device.</span></>}
      />

      <div className={styles.grid}>
        {INSTALLERS.map(({ name, requirements, description, asset }) => (
          <Reveal key={name} className={styles.download}>
            <div className={styles.downloadHead}>
              <span className="eyebrow">{requirements}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <a className="btn btn-primary" href={asset.url} aria-label={`Download clide for ${name}`}>
              <DownloadIcon />
              Download · {asset.size}
            </a>
            <details className={styles.checksum}>
              <summary>SHA-256 checksum</summary>
              <div>
                <code>{asset.sha256}</code>
                <CopyButton text={asset.sha256} label={`Copy ${name} checksum`} />
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <div className={styles.secondary}>
        <div className={styles.command}>
          <h3>Build for macOS</h3>
          <code>{BUILD_COMMAND}</code>
          <CopyButton text={BUILD_COMMAND} label="Copy build command" />
        </div>
        <div className={styles.command}>
          <h3>Clone the source</h3>
          <code>{CLONE_COMMAND}</code>
          <CopyButton text={CLONE_COMMAND} label="Copy clone command" />
        </div>
      </div>
      <p className={styles.legacy}>
        <a href={RELEASES_URL}>All releases on GitHub</a>
        {" · "}
        <a href={LEGACY.url} download>macOS {LEGACY.version} preview</a>
      </p>
    </section>
  );
}
