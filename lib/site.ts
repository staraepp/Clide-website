export const REPO_URL = "https://github.com/staraepp/clide_stt";
export const WEBSITE_REPO_URL = "https://github.com/staraepp/Clide-website";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const RELEASES_URL = `${REPO_URL}/releases`;

export type Installer = {
  file: string;
  url: string;
  size: string;
  sha256: string;
};

export const RELEASE = {
  version: "2.1.2",
  minMacOS: "13",
  dmg: {
    file: "clide_2.1.2_aarch64.dmg",
    url: `${RELEASES_URL}/download/v2.1.2/clide_2.1.2_aarch64.dmg`,
    size: "13.8 MiB",
    sha256: "96937d614c979ce534a907733019658f3adbd2e13a425faeb2e614360a0695ac",
  },
  windows: {
    file: "clide_2.1.2_x64-setup.exe",
    url: `${RELEASES_URL}/download/v2.1.2/clide_2.1.2_x64-setup.exe`,
    size: "17.1 MiB",
    sha256: "5582080bd72f79850a5252bff69fabc22d1e57ddf434b01437dc0669541627f0",
  },
  cuda: {
    file: "clide_2.1.2_cuda_x64-setup.exe",
    url: `${RELEASES_URL}/download/v2.1.2/clide_2.1.2_cuda_x64-setup.exe`,
    size: "449.7 MiB",
    sha256: "ef4c3eba739ff457505e25319d9dedcf46fb1c31fd0e6410233444e793688474",
  },
};

/** The last published build. It still contains the removed cloud engines. */
export const LEGACY: Installer & { version: string } = {
  version: "0.1.2",
  file: "clide-0.1.2-apple-silicon.dmg",
  url: "/downloads/clide-0.1.2-apple-silicon.dmg",
  size: "13.3 MiB",
  sha256: "41f0426b2666ff670e52f966bd5a2c78139de0786d6786fe47e0961a65ec27b8",
};

export const DOWNLOAD = { href: "/#get-started", label: "Download" };

export const SHORTCUT = ["⌥", "."] as const;

export const CLONE_COMMAND = "git clone https://github.com/staraepp/clide_stt clide";
export const BUILD_COMMAND = "npm install && npm run app:build -- --debug --bundles app";
