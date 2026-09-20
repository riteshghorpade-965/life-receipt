import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

const CATEGORY_META = {
  music: { label: "Music", icon: "♫" },
  movies: { label: "Movies", icon: "◉" },
  places: { label: "Places", icon: "⌖" },
  purchases: { label: "Purchases", icon: "₹" },
  photos: { label: "Photos", icon: "▧" },
  messages: { label: "Messages", icon: "✦" },
  searches: { label: "Searches", icon: "⌕" },
  events: { label: "Events", icon: "✧" },
  notes: { label: "Notes", icon: "✎" },
};

const FILTERS = [
  "all",
  "music",
  "movies",
  "places",
  "purchases",
  "photos",
  "messages",
  "searches",
  "events",
  "notes",
];

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatNumber(value) {
  return number(value).toLocaleString("en-IN");
}

function getCategory(item) {
  const raw = String(
    item?.category ||
      item?.type ||
      item?.kind ||
      item?.source ||
      "music"
  ).toLowerCase();

  if (raw.includes("music") || raw.includes("spotify")) return "music";
  if (raw.includes("movie") || raw.includes("film")) return "movies";
  if (raw.includes("place") || raw.includes("location")) return "places";
  if (raw.includes("purchase") || raw.includes("transaction")) return "purchases";
  if (raw.includes("photo") || raw.includes("image")) return "photos";
  if (raw.includes("message") || raw.includes("chat")) return "messages";
  if (raw.includes("search")) return "searches";
  if (raw.includes("event")) return "events";
  if (raw.includes("note")) return "notes";

  return "music";
}

function getDate(item) {
  return (
    item?.date ||
    item?.timestamp ||
    item?.datetime ||
    item?.time ||
    ""
  );
}

function getTitle(item) {
  return (
    item?.title ||
    item?.track ||
    item?.name ||
    item?.description ||
    item?.item ||
    item?.artist ||
    "Untitled receipt"
  );
}

function getSecondary(item) {
  return (
    item?.artist ||
    item?.album ||
    item?.location ||
    item?.place ||
    item?.merchant ||
    item?.category ||
    ""
  );
}

function getSearchText(item) {
  return JSON.stringify(item).toLowerCase();
}

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/insights.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Archive request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (cancelled) return;

        setData(result);

        const firstYear = result?.musicByYear?.[0]?.year;
        if (firstYear) setSelectedYear(firstYear);

        const firstDate = result?.demoDates?.[0];
        if (firstDate) setSelectedDate(firstDate);
      })
      .catch((err) => {
        console.error(err);

        if (!cancelled) {
          setError(err.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const receipts = useMemo(() => {
    return Array.isArray(data?.receipts) ? data.receipts : [];
  }, [data]);

  const filteredReceipts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return receipts.filter((item) => {
      const categoryMatch =
        filter === "all" || getCategory(item) === filter;

      const searchMatch =
        !q || getSearchText(item).includes(q);

      return categoryMatch && searchMatch;
    });
  }, [receipts, query, filter]);

  const visibleReceipts = showAll
    ? filteredReceipts
    : filteredReceipts.slice(0, 12);

  const musicByYear = Array.isArray(data?.musicByYear)
    ? data.musicByYear
    : [];

  const maxYearCount = Math.max(
    ...musicByYear.map((item) => number(item.count)),
    1
  );

  const selectedYearData =
    musicByYear.find(
      (item) => String(item.year) === String(selectedYear)
    ) || musicByYear[0];

  const demoDates = Array.isArray(data?.demoDates)
    ? data.demoDates
    : [];

  const selectedConnection =
    selectedDate || demoDates[0] || null;

  const sharedDates = data?.sharedDates || {};

  const totalRecords =
    data?.totals?.total ||
    data?.totals?.records ||
    receipts.length ||
    0;

  const musicRecords =
    data?.totals?.music ||
    data?.totals?.musicRecords ||
    data?.totals?.spotify ||
    musicByYear.reduce(
      (sum, item) => sum + number(item.count),
      0
    );

  const transactionRecords =
    data?.totals?.transactions ||
    data?.totals?.household ||
    0;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (error) {
    return (
      <main className="error-page">
        <div className="error-card">
          <span className="mini-label">LIFE RECEIPT / ERROR</span>
          <h1>Archive unavailable.</h1>
          <p>{error}</p>
          <button
            className="button button-light"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="loading-screen">
        <div className="loading-mark">LR</div>
        <div className="loading-copy">
          <span>INITIALIZING ARCHIVE</span>
          <i />
        </div>
      </main>
    );
  }

  return (
    <div className="site-shell">
      {/* NAV */}
      <header className="topbar">
        <a href="#top" className="brand">
          <span className="brand-mark">LR</span>
          <span>
            LIFE
            <b>RECEIPT</b>
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#pulse">01 Pulse</a>
          <a href="#receipts">02 Receipts</a>
          <a href="#connections">03 Connections</a>
          <a href="#patterns">04 Patterns</a>
        </nav>

        <button
          className="nav-explore"
          onClick={() => scrollTo("receipts")}
        >
          Explore archive <span>↗</span>
        </button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-noise" />

          <div className="hero-inner">
            <div className="hero-topline">
              <span>PERSONAL DATA / 2013—2024</span>
              <span>FRONTEND DIGITAL MUSEUM</span>
            </div>

            <div className="hero-layout">
              <div className="hero-main">
                <div className="hero-kicker">
                  <span className="pulse-dot" />
                  YOUR DIGITAL LIFE, RECONSTRUCTED
                </div>

                <h1>
                  YOUR LIFE
                  <br />
                  <em>IN</em> RECEIPTS<span>.</span>
                </h1>

                <p className="hero-lede">
                  A visual archive of tiny moments — songs,
                  places, purchases, searches and memories —
                  transformed into one connected story.
                </p>

                <div className="hero-buttons">
                  <button
                    className="button button-accent"
                    onClick={() => scrollTo("pulse")}
                  >
                    Start exploring
                    <span>↓</span>
                  </button>

                  <button
                    className="text-button"
                    onClick={() => scrollTo("connections")}
                  >
                    See the connections <span>→</span>
                  </button>
                </div>
              </div>

              <div className="hero-receipt-wrap">
                <div className="hero-receipt-shadow" />

                <article className="hero-receipt">
                  <div className="receipt-header">
                    <strong>LIFE RECEIPT</strong>
                    <span>ARCHIVE 001</span>
                  </div>

                  <div className="receipt-rule" />

                  <p className="receipt-small">
                    YOUR RECORDED MOMENTS
                  </p>

                  <div className="receipt-big-number">
                    {formatNumber(totalRecords)}
                  </div>

                  <p className="receipt-label">
                    DIGITAL RECEIPTS
                  </p>

                  <div className="receipt-grid">
                    <div>
                      <strong>{formatNumber(musicRecords)}</strong>
                      <span>MUSIC</span>
                    </div>

                    <div>
                      <strong>
                        {formatNumber(transactionRecords)}
                      </strong>
                      <span>TRANSACTIONS</span>
                    </div>
                  </div>

                  <div className="barcode">
                    {Array.from({ length: 34 }).map((_, i) => (
                      <i
                        key={i}
                        style={{
                          width:
                            i % 5 === 0
                              ? "4px"
                              : i % 3 === 0
                              ? "2px"
                              : "1px",
                        }}
                      />
                    ))}
                  </div>

                  <div className="receipt-footer">
                    <span>RAW DATA</span>
                    <span>→</span>
                    <span>STORY</span>
                  </div>
                </article>
              </div>
            </div>

            <div className="hero-bottom">
              <span>SCROLL TO DISCOVER</span>
              <div className="scroll-line">
                <i />
              </div>
              <span>01 / 05</span>
            </div>
          </div>
        </section>

        {/* PULSE */}
        <section className="section pulse-section" id="pulse">
          <div className="section-intro">
            <div>
              <span className="section-number">01</span>
              <span className="section-label">LIFE PULSE</span>
            </div>

            <h2>
              Some years
              <br />
              <i>sound louder.</i>
            </h2>

            <p>
              Your listening history becomes a visual
              rhythm. Select a year to inspect its place
              in the archive.
            </p>
          </div>

          <div className="pulse-card">
            <div className="pulse-meta">
              <div>
                <span>LISTENING ACTIVITY</span>
                <strong>
                  {selectedYearData?.year || "—"}
                </strong>
              </div>

              <div className="pulse-selected">
                <span>SELECTED YEAR</span>
                <b>
                  {formatNumber(
                    selectedYearData?.count || 0
                  )}
                </b>
                <small>records</small>
              </div>
            </div>

            <div className="pulse-chart">
              {musicByYear.map((item) => {
                const count = number(item.count);
                const height = Math.max(
                  5,
                  (count / maxYearCount) * 100
                );

                const active =
                  String(selectedYear) ===
                  String(item.year);

                return (
                  <button
                    key={item.year}
                    type="button"
                    className={`year-column ${
                      active ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedYear(item.year)
                    }
                    aria-label={`${item.year}: ${count} music records`}
                    aria-pressed={active}
                  >
                    <span className="column-value">
                      {active
                        ? formatNumber(count)
                        : ""}
                    </span>

                    <span
                      className="column-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <span className="column-year">
                      {item.year}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pulse-footer">
              <span>2013</span>
              <div />
              <span>
                {musicByYear[musicByYear.length - 1]?.year ||
                  "2024"}
              </span>
            </div>
          </div>
        </section>

        {/* RECEIPT EXPLORER */}
        <section
          className="section receipts-section"
          id="receipts"
        >
          <div className="section-intro split">
            <div>
              <span className="section-number">02</span>
              <span className="section-label">
                RECEIPT EXPLORER
              </span>

              <h2>
                Every record
                <br />
                <i>has a trace.</i>
              </h2>
            </div>

            <p>
              Search across the prepared archive and move
              between different kinds of life receipts.
            </p>
          </div>

          <div className="explorer">
            <div className="explorer-toolbar">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="search"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search the archive..."
                  aria-label="Search receipts"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <span className="result-count">
                {formatNumber(
                  filteredReceipts.length
                )}{" "}
                records
              </span>
            </div>

            <div className="filter-row">
              {FILTERS.map((item) => {
                const meta =
                  CATEGORY_META[item] || {
                    label: "All",
                    icon: "✦",
                  };

                const active = filter === item;

                return (
                  <button
                    key={item}
                    type="button"
                    className={`filter-chip ${
                      active ? "active" : ""
                    }`}
                    onClick={() => {
                      setFilter(item);
                      setShowAll(false);
                    }}
                  >
                    <span>{meta.icon}</span>
                    {item === "all"
                      ? "All receipts"
                      : meta.label}
                  </button>
                );
              })}
            </div>

            {visibleReceipts.length > 0 ? (
              <div className="receipt-grid-list">
                {visibleReceipts.map((item, index) => {
                  const category = getCategory(item);
                  const meta =
                    CATEGORY_META[category] ||
                    CATEGORY_META.music;

                  return (
                    <article
                      className="receipt-card"
                      key={`${getDate(item)}-${getTitle(
                        item
                      )}-${index}`}
                    >
                      <div className="card-top">
                        <span className="card-icon">
                          {meta.icon}
                        </span>

                        <span className="card-category">
                          {meta.label}
                        </span>

                        <span className="card-index">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="card-body">
                        <h3>{getTitle(item)}</h3>

                        <p>
                          {getSecondary(item) ||
                            "Recorded life moment"}
                        </p>
                      </div>

                      <div className="card-bottom">
                        <time>
                          {getDate(item) || "Undated"}
                        </time>
                        <span>↗</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No receipts found.</h3>
                <p>
                  Try another search or category.
                </p>
              </div>
            )}

            {filteredReceipts.length > 12 && (
              <button
                className="load-more"
                type="button"
                onClick={() => setShowAll((value) => !value)}
              >
                {showAll
                  ? "Show fewer receipts"
                  : `View all ${formatNumber(
                      filteredReceipts.length
                    )} receipts`}
                <span>↓</span>
              </button>
            )}
          </div>
        </section>

        {/* CONNECTIONS */}
        <section
          className="section connections-section"
          id="connections"
        >
          <div className="connection-heading">
            <div>
              <span className="section-number">03</span>
              <span className="section-label">
                CONNECT THE DOTS
              </span>
            </div>

            <h2>
              One day.
              <br />
              <i>Many signals.</i>
            </h2>

            <p>
              The interesting story is not inside one
              receipt. It appears when different records
              share the same moment.
            </p>
          </div>

          <div className="connection-layout">
            <div className="date-rail">
              <span className="rail-title">
                DISCOVERY DATES
              </span>

              {demoDates.slice(0, 8).map((date, index) => (
                <button
                  type="button"
                  key={date}
                  className={
                    selectedConnection === date
                      ? "date-item active"
                      : "date-item"
                  }
                  onClick={() =>
                    setSelectedDate(date)
                  }
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <b>{date}</b>

                  <i>→</i>
                </button>
              ))}
            </div>

            <div className="connection-canvas">
              <div className="connection-date">
                <span>CONTEXTUAL SNAPSHOT</span>
                <strong>
                  {selectedConnection || "Select a date"}
                </strong>
              </div>

              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />

              <div className="connection-center">
                <span>THE DAY</span>
                <strong>
                  {selectedConnection
                    ? String(selectedConnection).slice(
                        0,
                        10
                      )
                    : "—"}
                </strong>
              </div>

              <div className="connection-node node-music">
                <span>♫</span>
                <b>MUSIC</b>
                <small>listening</small>
              </div>

              <div className="connection-node node-receipt">
                <span>₹</span>
                <b>RECEIPT</b>
                <small>transaction</small>
              </div>

              <div className="connection-node node-place">
                <span>⌖</span>
                <b>PLACE</b>
                <small>context</small>
              </div>

              <div className="connection-node node-memory">
                <span>✦</span>
                <b>MEMORY</b>
                <small>story</small>
              </div>

              <div className="connection-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>

          <div className="connection-proof">
            <div>
              <span>MUSIC × HOUSEHOLD</span>
              <strong>
                {formatNumber(
                  sharedDates?.musicHousehold?.length ||
                    sharedDates?.musicHousehold ||
                    0
                )}
              </strong>
              <small>
                shared calendar dates
              </small>
            </div>

            <div>
              <span>MUSIC × TRANSACTIONS</span>
              <strong>
                {formatNumber(
                  sharedDates?.musicTransactions
                    ?.length ||
                    sharedDates?.musicTransactions ||
                    0
                )}
              </strong>
              <small>
                contextual overlaps
              </small>
            </div>

            <p>
              Connections shown here are temporal/contextual
              relationships — not claims about a single
              person's identity.
            </p>
          </div>
        </section>

        {/* PATTERNS */}
        <section
          className="section patterns-section"
          id="patterns"
        >
          <div className="section-intro split">
            <div>
              <span className="section-number">04</span>
              <span className="section-label">
                PATTERN LAB
              </span>

              <h2>
                Zoom out.
                <br />
                <i>See the shape.</i>
              </h2>
            </div>

            <p>
              Aggregate signals turn thousands of individual
              records into patterns that are easier to
              explore.
            </p>
          </div>

          <div className="pattern-grid">
            <article className="pattern-feature">
              <span className="pattern-index">
                PATTERN / 01
              </span>

              <div className="pattern-visual">
                <div className="pattern-ring ring-one" />
                <div className="pattern-ring ring-two" />
                <div className="pattern-ring ring-three" />
                <span>♫</span>
              </div>

              <div>
                <h3>
                  Your archive
                  <br />
                  has a rhythm.
                </h3>

                <p>
                  Listening activity is distributed
                  unevenly across the recorded years,
                  creating visible peaks and quiet periods.
                </p>
              </div>
            </article>

            <article className="pattern-card">
              <span>PATTERN / 02</span>
              <strong>
                {formatNumber(musicRecords)}
              </strong>
              <h3>Music records</h3>
              <p>
                Listening activity preserved in the
                prepared archive.
              </p>
              <i>♫</i>
            </article>

            <article className="pattern-card lime">
              <span>PATTERN / 03</span>
              <strong>
                {formatNumber(transactionRecords)}
              </strong>
              <h3>Transaction records</h3>
              <p>
                Purchase activity represented as
                contextual receipts.
              </p>
              <i>₹</i>
            </article>

            <article className="pattern-card purple">
              <span>PATTERN / 04</span>
              <strong>
                {formatNumber(demoDates.length)}
              </strong>
              <h3>Discovery dates</h3>
              <p>
                Selected moments where different signals
                can be explored together.
              </p>
              <i>✦</i>
            </article>
          </div>
        </section>

        {/* CHAPTERS */}
        <section className="chapters-section" id="chapters">
          <div className="chapters-inner">
            <div className="chapter-label">
              <span>05</span>
              LIFE CHAPTERS
            </div>

            <div className="chapter-title">
              <h2>
                The archive
                <br />
                becomes a <i>story.</i>
              </h2>

              <p>
                Raw records are only the beginning. The
                final layer is interpretation: moments,
                patterns and connections that help you
                navigate the archive as a visual narrative.
              </p>
            </div>

            <div className="chapter-list">
              <div>
                <span>01</span>
                <strong>LISTENING YEARS</strong>
                <i>→</i>
              </div>

              <div>
                <span>02</span>
                <strong>EVERYDAY RECEIPTS</strong>
                <i>→</i>
              </div>

              <div>
                <span>03</span>
                <strong>CONNECTED MOMENTS</strong>
                <i>→</i>
              </div>

              <div>
                <span>04</span>
                <strong>EMERGING PATTERNS</strong>
                <i>→</i>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            LIFE<span>RECEIPT</span>
          </div>

          <p>
            Raw Data
            <b>→</b>
            Insights
            <b>→</b>
            Connections
            <b>→</b>
            Story
          </p>
        </div>

        <div className="footer-bottom">
          <span>
            FRONTEND-ONLY DATA EXPERIENCE
          </span>

          <span>
            WEBRUSH / 2026
          </span>

          <span>
            DATA MINIMIZED FOR PRESENTATION
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;