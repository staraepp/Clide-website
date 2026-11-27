import { DOWNLOAD, REPO_URL } from "@/lib/site";
import { DownloadIcon, GithubIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { ShaderField } from "./ShaderField";
import styles from "./OpenSourceBand.module.css";

export function OpenSourceBand() {
  return (
    <section className={styles.band} aria-labelledby="oss-title">
      <ShaderField energy={0.35} fadeTop={0.4} fadeBottom={0.4} />
      <Reveal className={`container ${styles.inner}`}>
        <span className="eyebrow">MIT licensed</span>
        <h2 id="oss-title" className={`display ${styles.title}`}>
          Free, open source, and <span className="serif">yours to hack on.</span>
        </h2>
        <p className="lede">
          clide is built in the open by one contributor and a growing repo.
          Issues, pull requests and ideas are welcome. Every bit of help counts.
        </p>
        <div className={styles.ctas}>
          <a className="btn btn-primary" href={DOWNLOAD.href}>
            <DownloadIcon />
            {DOWNLOAD.label}
          </a>
          <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noreferrer">
            <GithubIcon />
            View on GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
