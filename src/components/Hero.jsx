import React from "react";

function formatNumber(value) {
  if (typeof value !== "number") return "—";
  return value.toLocaleString();
}

function Hero({ totals = {}, onExplore }) {
  const music =
    totals.music ??
    totals.musicRecords ??
    totals.spotify ??
    0;

  const transactions =
    totals.transactions ??
    totals.household ??
    0;

  const dates =
    totals.dates ??
    totals.uniqueDates ??
    0;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            DIGITAL LIFE ARCHIVE
          </div>

          <h1 id="hero-title">
            YOUR LIFE,
            <br />
            IN <span>RECEIPTS.</span>
          </h1>

          <p className="hero-description">
            Thousands of tiny moments become a story.
            Explore the patterns, places, habits and
            connections hidden inside everyday data.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={onExplore}
            >
              Explore the archive
              <span aria-hidden="true">↓</span>
            </button>

            <a
              className="secondary-button"
              href="#connections"
            >
              Connect the dots
            </a>
          </div>
        </div>

        <div
          className="hero-receipt"
          aria-label="Archive summary"
        >
          <div className="receipt-paper">
            <div className="receipt-top">
              <span>LIFE RECEIPT</span>
              <span>ARCHIVE / 01</span>
            </div>

            <div className="receipt-line" />

            <div className="receipt-title">
              A LIFE IN
              <br />
              SMALL MOMENTS
            </div>

            <div className="receipt-stats">
              <div>
                <strong>{formatNumber(music)}</strong>
                <span>MUSIC</span>
              </div>

              <div>
                <strong>{formatNumber(transactions)}</strong>
                <span>RECEIPTS</span>
              </div>

              <div>
                <strong>{formatNumber(dates)}</strong>
                <span>DAYS</span>
              </div>
            </div>

            <div className="receipt-barcode" aria-hidden="true">
              ||| || |||| | ||| || || |||| ||| |||
            </div>

            <div className="receipt-footer">
              <span>RAW DATA</span>
              <span>→</span>
              <span>STORY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;