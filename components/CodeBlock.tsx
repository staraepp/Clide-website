import { CopyButton } from "./CopyButton";
import styles from "./CodeBlock.module.css";

export function CodeBlock({ code, label = "Terminal" }: { code: string; label?: string }) {
  return (
    <figure className={styles.block}>
      <figcaption className={styles.bar}>
        <span className="eyebrow">{label}</span>
        <CopyButton text={code} label="Copy" />
      </figcaption>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
