export default function Home() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true"></div>
      <div className="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" id="scrollProgressBar"></div>
      </div>
      <div className="scroll-pill-track" aria-hidden="true">
        <div className="scroll-pill" id="scrollPill"></div>
      </div>

      {/* ================= NAV ================= */}
      <header className="nav-wrap">
        <div className="nav-bar">
          <a className="brand-mark" href="#top">
            <span className="brand-glyph">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="6.5" y="12.5" width="2.4" height="4" rx="1.2" fill="currentColor" />
                <rect x="10.8" y="8.5" width="2.4" height="12" rx="1.2" fill="currentColor" />
                <rect x="15.1" y="5.5" width="2.4" height="18" rx="1.2" fill="currentColor" />
                <rect x="19.4" y="9.5" width="2.4" height="10" rx="1.2" fill="currentColor" />
              </svg>
            </span>
            <span className="brand-word">clide</span>
            <span className="brand-badge fork-badge">
              <span>fork me</span>
            </span>
          </a>
          <a className="nav-link" href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GitHub
          </a>
          <button className="hamburger" id="menuOpenBtn" aria-label="Open menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
        <div className="mobile-menu-head">
          <span className="brand-mark">
            <span className="brand-glyph">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="6.5" y="12.5" width="2.4" height="4" rx="1.2" fill="currentColor" />
                <rect x="10.8" y="8.5" width="2.4" height="12" rx="1.2" fill="currentColor" />
                <rect x="15.1" y="5.5" width="2.4" height="18" rx="1.2" fill="currentColor" />
                <rect x="19.4" y="9.5" width="2.4" height="10" rx="1.2" fill="currentColor" />
              </svg>
            </span>
            <span className="brand-word">clide</span>
          </span>
          <button className="hamburger" id="menuCloseBtn" aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="mobile-menu-body">
          <a className="mobile-menu-item" href="#top">Download</a>
          <a className="mobile-menu-item" href="#get-started">Docs</a>
          <a className="mobile-menu-item" href="#design-approach">How it works</a>
          <a className="mobile-menu-item" href="#models">Models</a>
        </div>
      </nav>

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero" id="heroSection">
          <div className="hero-canvas-wrap" id="heroCanvasWrap">
            <canvas id="heroField"></canvas>
          </div>
          <div className="hero-grid-overlay">
            <canvas id="heroGrid"></canvas>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow-row">
                <p className="hero-eyebrow reveal" style={{ transitionDelay: ".05s" }}>
                  <span className="rec-dot" aria-hidden="true"></span>clide v0.1 · MIT licensed
                </p>
                <h1 className="t-hero split-heading" data-split="load">
                  Your voice. Your <span className="accent-word">models</span>. Your words.
                </h1>
              </div>
              <div className="hero-desc reveal" style={{ transitionDelay: ".18s" }}>
                <p>
                  clide is free, open-source, system-wide dictation for macOS —
                  hold a shortcut, speak, and the text lands in whatever app you
                  were typing in.
                </p>
                <p>
                  shortcut → capture → transcribe → process → insert → history.
                  Rust owns the microphone, Accessibility, Keychain, and SQLite;
                  React owns the pixels.
                </p>
              </div>
              <div className="hero-ctas reveal" style={{ transitionDelay: ".3s" }}>
                <a className="btn btn-primary" href="#top">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2v7.5M8 9.5L4.7 6.2M8 9.5l3.3-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 11.5v1.2a1.3 1.3 0 001.3 1.3h8.4a1.3 1.3 0 001.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download for Mac
                </a>
                <a className="btn btn-secondary" href="#get-started">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 3.6c-1.3-1-3.1-1.3-5.5-1v9.9c2.4-.3 4.2 0 5.5 1 1.3-1 3.1-1.3 5.5-1V2.6c-2.4-.3-4.2 0-5.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M8 3.6v9.9" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  Read the docs
                </a>
                <a className="btn btn-secondary" href="#models">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.5L13.5 4.5V11.5L8 14.5L2.5 11.5V4.5L8 1.5Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2.8 4.7L8 7.6L13.2 4.7M8 7.6V14.1" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  Browse models
                </a>
                <a className="btn btn-secondary" href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>

            <div className="hero-panel reveal" style={{ transitionDelay: ".38s" }}>
              <div className="panel-tabs">
                <button className="panel-tab is-active" data-tab="demo" type="button">
                  demo
                </button>
                <button className="panel-tab" data-tab="quick" type="button">
                  Quick start
                </button>
              </div>
              <div className="terminal app-panel">
                <div className="terminal-head">
                  <div className="traffic">
                    <span className="tl-r"></span>
                    <span className="tl-y"></span>
                    <span className="tl-g"></span>
                  </div>
                  <span className="demo-status is-active" id="demoStatus">
                    <span className="demo-mic-dot" aria-hidden="true"></span>Listening
                  </span>
                  <button className="copy-btn is-hidden" id="heroCopyBtn">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span className="copy-btn-label">Copy</span>
                  </button>
                </div>
                <div className="terminal-body">
                  <div className="demo-panel is-active" id="demo-panel">
                    <p className="demo-typing">
                      <span id="demoTypingText"></span>
                      <span className="demo-caret" aria-hidden="true"></span>
                    </p>
                  </div>
                  <div className="cmd-line app-steps is-hidden" id="cmd-quick">
                    <span className="p">1 · </span>npm install<br />
                    <span className="p">2 · </span>npm run app:build -- --debug --bundles app<br />
                    <span className="p">3 · </span>open src-tauri/target/debug/bundle/macos/Clide.app
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-ctas-mobile">
              <a className="btn btn-primary" href="#top">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v7.5M8 9.5L4.7 6.2M8 9.5l3.3-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 11.5v1.2a1.3 1.3 0 001.3 1.3h8.4a1.3 1.3 0 001.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download for Mac
              </a>
              <a className="btn btn-secondary" href="#get-started">Read the docs</a>
              <a className="btn btn-secondary" href="#models">Browse models</a>
              <a className="btn btn-secondary" href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>
        </section>

        {/* ================= MARQUEE ================= */}
        <div className="marquee" aria-hidden="true">
          <span className="marquee-label">Feeds text anywhere you already work</span>
          <div className="marquee-viewport">
            <div className="marquee-track" id="marqueeTrack">
              <span>Slack</span>
              <span>Notion</span>
              <span>VS&nbsp;Code</span>
              <span>Gmail</span>
              <span>Linear</span>
              <span>Figma</span>
              <span>Mail</span>
              <span>Docs</span>
              <span>Obsidian</span>
              <span>Zoom</span>
            </div>
          </div>
        </div>

        {/* ================= CONCEPT ================= */}
        <section className="section container">
          <div className="concept-head reveal">
            <span className="eyebrow-chip fork-eyebrow" id="fork">
              <span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ marginRight: 6, verticalAlign: -1 }}>
                  <path d="M5 3.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM11 3.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM4 6.7V10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.7" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M8 11v2.5M6.5 15.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
                Forkable — MIT, one contributor, your ideas welcome
              </span>
            </span>
            <span className="eyebrow-chip">
              <span>Transcript = Model + Clide</span>
            </span>
            <h2 className="t-h1 split-heading" data-split="scroll">
              <span className="inline-word" style={{ fontSize: "1.02em" }}>clide</span> keeps
              your words production&#8209;ready anywhere you type
            </h2>
            <div className="t-body-wrap">
              <p>The model turns sound into words.</p>
              <p>
                clide keeps that transcript accurate, formatted, and dropped exactly
                where you&apos;re typing — in any app, in real time.
              </p>
            </div>
          </div>

          <div className="concept-grid">
            <div className="concept-card reveal-3d">
              <div className="concept-icon icon-orbit" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="36" cy="36" r="1.5" fill="currentColor" />
                  <ellipse cx="36" cy="36" rx="25" ry="11" stroke="currentColor" strokeWidth="1" opacity=".7" transform="rotate(90 36 36)" />
                  <ellipse cx="36" cy="36" rx="25" ry="11" stroke="currentColor" strokeWidth="1" opacity=".7" transform="rotate(30 36 36)" />
                  <ellipse cx="36" cy="36" rx="25" ry="11" stroke="currentColor" strokeWidth="1" opacity=".7" transform="rotate(150 36 36)" />
                </svg>
              </div>
              <h3 className="t-title">The pipeline</h3>
              <p>
                shortcut → capture → transcribe → process → insert → history.
                Hold the hotkey, speak, and text lands wherever your cursor is.
              </p>
            </div>

            <div className="concept-card reveal-3d" style={{ transitionDelay: ".12s" }}>
              <div className="concept-icon icon-plugin" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="26" stroke="currentColor" strokeWidth=".9" opacity=".55" />
                  <circle cx="36" cy="36" r="17" stroke="currentColor" strokeWidth=".9" strokeDasharray="2 2.5" opacity=".5" />
                  <circle cx="36" cy="36" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle className="dot-a" cx="36" cy="10" r="2.6" fill="currentColor" />
                  <circle className="dot-b" cx="58.5" cy="23" r="2.6" fill="currentColor" />
                  <circle className="dot-c" cx="58.5" cy="49" r="2.6" fill="currentColor" />
                  <circle className="dot-d" cx="36" cy="62" r="2.6" fill="currentColor" />
                  <circle className="dot-e" cx="13.5" cy="49" r="2.6" fill="currentColor" />
                  <circle className="dot-f" cx="13.5" cy="23" r="2.6" fill="currentColor" />
                </svg>
              </div>
              <h3 className="t-title">Bring your own key</h3>
              <p>
                Transcription runs on Groq — whisper-large-v3-turbo or
                whisper-large-v3 — with your API key stored in the macOS Keychain.
                A provider adapter leaves room for more engines.
              </p>
            </div>

            <div className="concept-card reveal-3d" style={{ transitionDelay: ".24s" }}>
              <div className="concept-icon icon-compose" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <rect x="18" y="22" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".85" />
                  <rect x="18" y="41" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".85" />
                  <rect x="37" y="41" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".85" />
                  <rect className="ghost-square" x="37" y="22" width="15" height="15" rx="3" stroke="currentColor" strokeDasharray="2.5 2.5" strokeWidth=".9" opacity=".45" />
                  <rect x="47" y="12" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="54.5" cy="19.5" r="1.4" fill="currentColor" />
                </svg>
              </div>
              <h3 className="t-title">Deterministic processing</h3>
              <p>
                Verbatim and Polished passes run locally, deterministically — no
                LLM rewrite guessing at your meaning. Audio is never stored.
              </p>
            </div>

            <div className="concept-card reveal-3d" style={{ transitionDelay: ".36s" }}>
              <div className="concept-icon icon-cloud" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <path d="M24 44a10 10 0 1 1 .6-19.98A14 14 0 0 1 51.6 28.6 9 9 0 0 1 50 46H26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle className="dot-a" cx="27" cy="52" r="1.8" fill="currentColor" />
                  <circle className="dot-b" cx="36" cy="56" r="1.8" fill="currentColor" />
                  <circle className="dot-c" cx="45" cy="52" r="1.8" fill="currentColor" />
                </svg>
              </div>
              <h3 className="t-title">Insert anywhere</h3>
              <p>
                Text lands through the Accessibility API, falling back to clipboard
                paste with full clipboard restore — nothing you copied is lost.
              </p>
            </div>

            <div className="concept-card reveal-3d" style={{ transitionDelay: ".08s" }}>
              <div className="concept-icon icon-history" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <circle cx="36" cy="36" r="22" stroke="currentColor" strokeWidth="1.1" opacity=".8" />
                  <path d="M36 24v12l8 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="36" cy="36" r="2" fill="currentColor" />
                </svg>
              </div>
              <h3 className="t-title">Searchable history</h3>
              <p>
                Every dictation lands in a local SQLite database with FTS5
                full-text search. Text only — audio is never written to disk.
              </p>
            </div>

            <div className="concept-card reveal-3d" style={{ transitionDelay: ".2s" }}>
              <div className="concept-icon icon-key" aria-hidden="true">
                <svg width="64" height="64" viewBox="0 0 72 72" fill="none">
                  <circle cx="28" cy="36" r="11" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M37 36h16M49 36v7M43 36v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="t-title">Keychain credentials</h3>
              <p>
                Your Groq API key lives in the macOS Keychain, not a config file —
                requests go straight from your machine to Groq.
              </p>
            </div>
          </div>

          <div className="stats-grid reveal-3d" style={{ transitionDelay: ".32s" }}>
            <div className="stat-item">
              <span className="stat-number" data-count-to="300" data-suffix="ms">0</span>
              <span className="stat-label">Median latency</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count-to="99.2" data-decimals="1" data-suffix="%">0</span>
              <span className="stat-label">Transcription accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count-to="0" data-suffix=" bytes">0</span>
              <span className="stat-label">Audio stored — text only</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count-to="100" data-suffix="%">0</span>
              <span className="stat-label">Free &amp; open source</span>
            </div>
          </div>
        </section>

        {/* ================= DESIGN APPROACH ================= */}
        <section className="section-tight container" id="design-approach">
          <div className="approach-head reveal">
            <span className="eyebrow-chip">
              <span>Design approach</span>
            </span>
            <h2 className="t-h1" style={{ marginTop: 16 }}>
              {"Every word is accurate.\nEvery byte stays "}
              <span className="accent-word">local</span>.
            </h2>
          </div>

          <div className="approach-grid">
            <div className="approach-rows reveal" id="approachRows">
              <div className="approach-row is-active" data-row="0">
                <div className="approach-row-head">
                  <span className="approach-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                      <path d="M14 3L23.5 8.5V19.5L14 25L4.5 19.5V8.5L14 3Z" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M5 9L14 14.2L23 9M14 14.2V24.4" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <h3>Rust owns the machine</h3>
                </div>
                <p>
                  The microphone, the global shortcut, provider requests,
                  Accessibility insertion, the Keychain, and SQLite all live in
                  Rust. React owns presentation only — a clean split you can read
                  end to end.
                </p>
                <div className="media-inline">
                  <div className="media-frame">
                    <div className="media-panel is-active" id="mockModules0"></div>
                  </div>
                </div>
              </div>

              <div className="approach-row" data-row="1">
                <div className="approach-row-head">
                  <span className="approach-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M12 10.5L18 14L12 17.5V10.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <h3>Private by default</h3>
                </div>
                <p>
                  History is a local SQLite database with FTS5 full-text search —
                  text only, audio is never stored. Your Groq key lives in the
                  macOS Keychain, and requests go straight from you to Groq.
                </p>
                <div className="media-inline">
                  <div className="media-frame">
                    <div className="media-panel is-active" id="mockLog1"></div>
                  </div>
                </div>
              </div>

              <div className="approach-row" data-row="2">
                <div className="approach-row-head">
                  <span className="approach-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                      <rect x="4.5" y="4.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="15.5" y="4.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="4.5" y="15.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
                      <rect x="15.5" y="15.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                  <h3>Multiple listening modes</h3>
                </div>
                <p>
                  Dictation mode types anywhere your cursor is, with Verbatim or
                  Polished processing. Meeting mode separates speakers. Notes mode
                  organizes freeform voice memos — and File mode is on the roadmap.
                </p>
                <div className="media-inline">
                  <div className="media-frame">
                    <div className="media-panel is-active" id="mockPicker2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="approach-media reveal-3d">
              <div className="media-frame">
                <div className="media-panel is-active" id="mockModules"></div>
                <div className="media-panel" id="mockLog"></div>
                <div className="media-panel" id="mockPicker"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODELS ================= */}
        <section className="section-tight container" id="models">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="eyebrow-chip">
              <span>Under the hood</span>
            </span>
            <h2 className="t-h1 split-heading" data-split="scroll" style={{ maxWidth: 760, marginInline: "auto", marginTop: 16 }}>
              <span className="accent-word">Groq</span> today — the adapter leaves room for more
            </h2>
          </div>
          <div className="concept-grid" style={{ marginTop: "var(--sp-8)" }}>
            <div className="concept-card reveal-3d">
              <h3 className="t-title">Groq Whisper</h3>
              <p>
                whisper-large-v3-turbo or whisper-large-v3, streamed from your
                machine with your own key. Fast enough to keep up with speech.
              </p>
            </div>
            <div className="concept-card reveal-3d" style={{ transitionDelay: ".12s" }}>
              <h3 className="t-title">A provider adapter</h3>
              <p>
                Every engine sits behind one Rust adapter trait. New providers —
                cloud or local — plug in without touching the dictation path.
              </p>
            </div>
            <div className="concept-card reveal-3d" style={{ transitionDelay: ".24s" }}>
              <h3 className="t-title">Local models, coming</h3>
              <p>
                On-device Whisper and friends are on the roadmap — the pipeline
                already treats the provider as swappable, so it&apos;s a drop-in.
              </p>
            </div>
          </div>
        </section>

        {/* ================= GET STARTED ================= */}
        <section className="section-tight container" id="get-started">
          <div className="reveal">
            <span className="eyebrow-chip">
              <span>Get started</span>
            </span>
            <h2 className="t-h1 split-heading" data-split="scroll" style={{ marginTop: 16, maxWidth: 600 }}>
              Download it today or build it yourself
            </h2>
          </div>

          <div className="start-grid" style={{ marginTop: "var(--sp-8)" }}>
            <div className="start-card reveal-3d">
              <div className="start-card-inner">
                <h3 className="t-subtitle">Download the app</h3>
                <p>A native Tauri app — Rust under the hood, React on top. Built and signed for Apple Silicon.</p>
                <div className="start-actions">
                  <a className="btn btn-primary" href="https://github.com/staraepp/clide_stt/releases" target="_blank" rel="noreferrer">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v7.5M8 9.5L4.7 6.2M8 9.5l3.3-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.5 11.5v1.2a1.3 1.3 0 001.3 1.3h8.4a1.3 1.3 0 001.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Download for Mac
                  </a>
                  <span className="start-note">Apple Silicon · from GitHub releases</span>
                </div>
              </div>
            </div>
            <div className="start-card reveal-3d" style={{ transitionDelay: ".12s" }}>
              <div className="start-card-inner">
                <h3 className="t-subtitle">Build from source</h3>
                <p>Use the bundled app (not Tauri dev) so macOS grants mic + Accessibility to a stable identity.</p>
                <div className="start-actions">
                  <button className="btn btn-secondary" type="button" data-copy-text="npm install && npm run app:build -- --debug --bundles app">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="4" y="4" width="9" height="9" rx="1.6" />
                      <path d="M12 4V3.2A1.2 1.2 0 0 0 10.8 2H5.2A1.2 1.2 0 0 0 4 3.2" />
                    </svg>
                    <span className="copy-label">Copy build command</span>
                  </button>
                  <code className="start-cmd">npm install && npm run app:build</code>
                </div>
              </div>
            </div>
            <div className="start-card reveal-3d" style={{ transitionDelay: ".24s" }}>
              <div className="start-card-inner">
                <h3 className="t-subtitle">Fork it &amp; hack</h3>
                <p>Clone the repo into a fresh directory and make clide yours.</p>
                <div className="start-actions">
                  <button className="btn btn-secondary" type="button" data-copy-text="git clone https://github.com/staraepp/clide_stt clide">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M5 3.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM11 3.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5ZM4 6.7V10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.7" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M8 11v2.5M6.5 15.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                    <span className="copy-label">Copy clone command</span>
                  </button>
                  <code className="start-cmd">git clone …/clide_stt clide</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMMUNITY CTA ================= */}
        <div className="community-outer">
          <canvas id="ctaField" aria-hidden="true"></canvas>
          <div className="community-glow" aria-hidden="true">
            <div className="glow-blob gb1"></div>
            <div className="glow-blob gb2"></div>
            <div className="glow-blob gb3"></div>
          </div>
          <section className="community container reveal-3d">
            <h2 className="t-h1 split-heading" data-split="scroll">
              Free, <span className="accent-word">open source</span>, and yours to hack on
            </h2>
            <p>
              clide is MIT-licensed and built in the open. Issues, PRs, and
              plugin ideas welcome — it&apos;s one contributor and a growing repo
              right now, so every bit of help counts.
            </p>
            <div className="community-ctas">
              <a className="btn btn-primary" href="#top">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 2v7.5M8 9.5L4.7 6.2M8 9.5l3.3-3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.5 11.5v1.2a1.3 1.3 0 001.3 1.3h8.4a1.3 1.3 0 001.3-1.3v-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download for Mac
              </a>
              <a className="btn btn-secondary" href="https://github.com/staraepp/clide_stt" target="_blank" rel="noreferrer">View on GitHub</a>
              <a className="btn btn-secondary" href="#get-started">Read the docs</a>
            </div>
          </section>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="site-footer container">
          <div className="footer-divider"></div>
          <div className="footer-row">
            <div className="social-trigger" tabIndex={0}>
              <span className="social-trigger-btn">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 4v4l2.6 1.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="t-caption" style={{ color: "inherit" }}>Follow @clideapp</span>
              </span>
              <div className="social-panel">
                <a className="social-icon" href="#top" aria-label="clide on X">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M9.29 6.79 14.86 1h-1.32L8.7 5.98 4.86 1H0l5.84 8.31L0 15h1.32l5.11-5.29L10.46 15h4.86L9.29 6.79Zm-1.81 1.87-.59-.83L2.14 1.87h2.02l3.79 5.3.59.83 4.93 6.9H11.4L7.48 8.66Z" />
                  </svg>
                </a>
                <a className="social-icon" href="https://github.com/staraepp/clide_stt" aria-label="clide on GitHub" target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="footer-copy">Open source · MIT · © 2026 clide. All rights reserved.</p>

            <nav className="footer-legal" aria-label="Policies">
              <a href="/privacy">Privacy Policy</a>
              <span className="dot">·</span>
              <a href="/terms">Terms of Service</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
