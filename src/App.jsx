import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

function App() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch("/data/insights.json")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setSelectedDate(result.demoDates?.[0] || null);
      })
      .catch((error) => console.error("Data loading error:", error));
  }, []);

  const filteredReceipts = useMemo(() => {
    if (!data) return [];

    return data.receipts.filter((item) => {
      const matchesType =
        filter === "ALL" ||
        item.type.toLowerCase() === filter.toLowerCase();

      const text = `${item.title} ${item.detail} ${item.date}`.toLowerCase();

      return matchesType && text.includes(search.toLowerCase());
    });
  }, [data, filter, search]);

  const connectedReceipts = useMemo(() => {
    if (!data || !selectedDate) return [];

    return data.receipts.filter(
      (item) => item.date === selectedDate
    );
  }, [data, selectedDate]);

  if (!data) {
    return (
      <div className="loading">
        <div className="loading-dot"></div>
        LOADING DIGITAL ARCHIVE...
      </div>
    );
  }

  const maxMusic = Math.max(
    ...data.musicByYear.map((item) => item.count)
  );

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          LIFE<span>RECEIPT</span>
        </div>

        <nav>
          <a href="#pulse">Pulse</a>
          <a href="#receipts">Receipts</a>
          <a href="#connections">Connections</a>
          <a href="#chapters">Chapters</a>
        </nav>

        <div className="nav-status">
          <span className="status-dot"></span>
          DIGITAL ARCHIVE
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-label">
            DIGITAL LIFE ARCHIVE / 001
          </div>

          <h1>
            YOUR LIFE,
            <br />
            <span>IN RECEIPTS.</span>
          </h1>

          <p className="hero-text">
            {data.totals.music.toLocaleString()} songs.
            12 years. Thousands of tiny moments.
            <br />
            What story do they tell when the dots are connected?
          </p>

          <a href="#pulse" className="hero-button">
            EXPLORE THE STORY ↓
          </a>

          <div className="hero-stats">
            <div>
              <strong>
                {data.totals.music.toLocaleString()}
              </strong>
              <span>Music records</span>
            </div>

            <div>
              <strong>12 YEARS</strong>
              <span>Digital history</span>
            </div>

            <div>
              <strong>
                {data.sharedDates.musicHousehold}
              </strong>
              <span>Shared dates</span>
            </div>
          </div>
        </section>

        {/* LIFE PULSE */}
        <section id="pulse" className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                01 / LIFE PULSE
              </span>

              <h2>WHEN DID LIFE GET LOUD?</h2>
            </div>

            <p>
              A year-by-year view of the actual recorded
              music activity in the archive.
            </p>
          </div>

          <div className="pulse-card">
            <div className="chart">
              {data.musicByYear.map((item) => (
                <div className="bar-wrap" key={item.year}>
                  <div
                    className="bar"
                    style={{
                      height: `${Math.max(
                        8,
                        (item.count / maxMusic) * 100
                      )}%`,
                    }}
                    title={`${item.year}: ${item.count.toLocaleString()} records`}
                  ></div>

                  <span>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECEIPT EXPLORER */}
        <section id="receipts" className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                02 / RECEIPT EXPLORER
              </span>

              <h2>SEARCH THE MOMENTS.</h2>
            </div>

            <p>
              Search and filter actual receipts from the
              prepared dataset.
            </p>
          </div>

          <div className="explorer">

            <div className="controls">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artist, song, category or date..."
                aria-label="Search receipts"
              />

              <div className="filters">
                {[
                  "ALL",
                  "MUSIC",
                  "HOUSEHOLD",
                  "TRANSACTION",
                ].map((item) => (
                  <button
                    key={item}
                    className={filter === item ? "active" : ""}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="receipt-list">
              {filteredReceipts
                .slice(0, 30)
                .map((item, index) => (
                  <article
                    className="receipt"
                    key={`${item.date}-${item.title}-${index}`}
                  >
                    <div className="receipt-icon">
                      {item.type === "music"
                        ? "♫"
                        : item.type === "household"
                        ? "◈"
                        : "₹"}
                    </div>

                    <div className="receipt-main">
                      <span className="receipt-type">
                        {item.type.toUpperCase()}
                      </span>

                      <h3>{item.title}</h3>

                      <p>{item.detail}</p>
                    </div>

                    <time>{item.date}</time>
                  </article>
                ))}

              {filteredReceipts.length === 0 && (
                <div className="empty">
                  No matching receipts found.
                </div>
              )}
            </div>

            <p className="result-count">
              Showing {Math.min(filteredReceipts.length, 30)} of{" "}
              {filteredReceipts.length.toLocaleString()} matching
              receipts
            </p>
          </div>
        </section>

        {/* CONNECT THE DOTS */}
        <section
          id="connections"
          className="section connection-section"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                03 / CONNECT THE DOTS
              </span>

              <h2>ONE DATE. MULTIPLE STORIES.</h2>
            </div>

            <p>
              Select a date and discover contextual relationships
              between different receipt types.
            </p>
          </div>

          <div className="connection-grid">

            <div className="date-panel">
              <span>SELECT A DATE</span>

              {data.demoDates.slice(0, 6).map((date) => (
                <button
                  key={date}
                  className={
                    selectedDate === date
                      ? "date-active"
                      : ""
                  }
                  onClick={() => setSelectedDate(date)}
                >
                  {new Date(date).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                    }
                  )}

                  <small>
                    {date.substring(0, 4)}
                  </small>
                </button>
              ))}
            </div>

            <div className="connection-story">

              <div className="story-date">
                {selectedDate}
              </div>

              <div className="dots-line"></div>

              {connectedReceipts
                .slice(0, 8)
                .map((item, index) => (
                  <div
                    className="connection-card"
                    key={`${item.title}-${index}`}
                  >
                    <div className="connection-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <span>
                        {item.type.toUpperCase()}
                      </span>

                      <h3>{item.title}</h3>

                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}

              {connectedReceipts.length === 0 && (
                <div className="connection-card">
                  <div className="connection-number">
                    01
                  </div>

                  <div>
                    <span>DATE</span>

                    <h3>
                      No sampled receipt
                    </h3>

                    <p>
                      Try another date from the archive.
                    </p>
                  </div>
                </div>
              )}

              <div className="context-note">
                Contextual connections are based on matching
                dates in the provided datasets. They do not
                establish that the datasets belong to the same
                person.
              </div>
            </div>
          </div>
        </section>

        {/* PATTERN LAB */}
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                04 / PATTERN LAB
              </span>

              <h2>THE SIGNALS.</h2>
            </div>

            <p>
              Repeated records reveal patterns hidden inside
              the archive.
            </p>
          </div>

          <div className="pattern-grid">

            <article className="pattern">
              <span className="pattern-number">01</span>

              <span className="pattern-label">
                Most played artist
              </span>

              <h3>
                {data.topArtists[0].name}
              </h3>

              <p>
                {data.topArtists[0].count.toLocaleString()}
                {" "}music records
              </p>
            </article>

            <article className="pattern">
              <span className="pattern-number">02</span>

              <span className="pattern-label">
                Household signal
              </span>

              <h3>
                {data.householdCategories[0].name}
              </h3>

              <p>
                {data.householdCategories[0].count}
                {" "}records
              </p>
            </article>

            <article className="pattern">
              <span className="pattern-number">03</span>

              <span className="pattern-label">
                Transaction signal
              </span>

              <h3>
                {data.transactionCategories[0].name}
              </h3>

              <p>
                {data.transactionCategories[0].count.toLocaleString()}
                {" "}records
              </p>
            </article>

            <article className="pattern">
              <span className="pattern-number">04</span>

              <span className="pattern-label">
                Music + household
              </span>

              <h3>
                {data.sharedDates.musicHousehold}
              </h3>

              <p>
                Shared calendar dates discovered
              </p>
            </article>

          </div>
        </section>

        {/* CHAPTERS */}
        <section id="chapters" className="section chapters">

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                05 / LIFE CHAPTERS
              </span>

              <h2>THE STORY, IN CHAPTERS.</h2>
            </div>
          </div>

          <div className="chapter-grid">

            <article>
              <span>01</span>

              <h3>EARLY SIGNALS</h3>

              <p>2013 — 2015</p>

              <small>
                The archive begins and early listening
                activity starts forming.
              </small>
            </article>

            <article>
              <span>02</span>

              <h3>THE LISTENING YEARS</h3>

              <p>2016 — 2019</p>

              <small>
                Recorded music activity becomes much more
                pronounced across the archive.
              </small>
            </article>

            <article>
              <span>03</span>

              <h3>THE DIGITAL YEARS</h3>

              <p>2022 — 2024</p>

              <small>
                Transaction records add another layer to
                the digital-life story.
              </small>
            </article>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          LIFE RECEIPT
        </div>

        <p>
          Raw Data → Insights → Connections → Story
        </p>

        <span>
          FRONTEND-ONLY DATA EXPERIENCE · WEBRUSH
        </span>
      </footer>

    </div>
  );
}

export default App;