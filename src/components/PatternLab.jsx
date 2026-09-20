import React from "react";
export default function PatternLab({ insights }) {
  const topArtist = insights.topArtists[0];
  const topHousehold = insights.householdCategories[0];
  const topTransaction = insights.transactionCategories[0];
  return <section className="section" id="patterns">
    <div className="section-heading"><div><p className="eyebrow">04 · PATTERN LAB</p><h2>Signals worth noticing.</h2></div><p>Computed from the organizer-provided datasets.</p></div>
    <div className="pattern-grid">
      <Card icon="🎧" title="Most played artist" value={topArtist?.name} meta={`${topArtist?.count.toLocaleString()} records`} />
      <Card icon="🍽️" title="Most frequent household category" value={topHousehold?.name} meta={`${topHousehold?.count.toLocaleString()} receipts`} />
      <Card icon="🛒" title="Top transaction signal" value={topTransaction?.name} meta={`${topTransaction?.count.toLocaleString()} records`} />
      <Card icon="🔗" title="Music + household shared dates" value={insights.sharedDates.musicHousehold.toLocaleString()} meta="calendar-date overlap" />
      <Card icon="🧩" title="Music + transaction shared dates" value={insights.sharedDates.musicTransactions.toLocaleString()} meta="calendar-date overlap" />
      <Card icon="📚" title="Total recorded receipts" value={(insights.totals.music+insights.totals.household+insights.totals.transactions).toLocaleString()} meta="across all supplied datasets" />
    </div>
  </section>;
}
function Card({icon,title,value,meta}){return <article className="pattern-card"><span>{icon}</span><p>{title}</p><strong>{value}</strong><small>{meta}</small></article>}
