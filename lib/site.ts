export const REPO_URL = "https://github.com/staraepp/clide_stt";
export const WEBSITE_REPO_URL = "https://github.com/staraepp/Clide-website";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export type Dmg = {
  file: string;
  url: string;
  size: string;
  sha256: string;
};

/**
 * The current version of clide. `dmg` points at the notarized build attached to
 * the GitHub release, so the repo carries no binary. Set it to null to fall
 * back to a "build from source" call to action between releases.
 */
export const RELEASE: {
  version: string;
  minMacOS: string;
  notarized: boolean;
  dmg: Dmg | null;
} = {
  version: "2.0.0",
  minMacOS: "13",
  notarized: true,
  dmg: {
    file: "clide_2.0.0_aarch64.dmg",
    url: "https://github.com/staraepp/clide_stt/releases/download/v2.0.0/clide_2.0.0_aarch64.dmg",
    size: "14.9 MiB",
    sha256: "1b3c0b96abec9975d1f4a6bb930d31a85ed034bde27426eb567a4ae530db4379",
  },
};

/** The last published build. It still contains the removed cloud engines. */
export const LEGACY: Dmg & { version: string } = {
  version: "0.1.2",
  file: "clide-0.1.2-apple-silicon.dmg",
  url: "/downloads/clide-0.1.2-apple-silicon.dmg",
  size: "13.3 MiB",
  sha256: "41f0426b2666ff670e52f966bd5a2c78139de0786d6786fe47e0961a65ec27b8",
};

/** What the primary download button should do right now. */
export const DOWNLOAD = RELEASE.dmg
  ? { href: RELEASE.dmg.url, download: true, label: "Download for Mac" }
  : { href: "/#get-started", download: false, label: "Get clide 2.0" };

export const SHORTCUT = ["⌥", "."] as const;

export const CLONE_COMMAND = "git clone https://github.com/staraepp/clide_stt clide";
export const BUILD_COMMAND = "npm install && npm run app:build -- --debug --bundles app";
