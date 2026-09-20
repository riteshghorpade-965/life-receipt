export default function Hero({ totals, onExplore }) {
  return <header className="hero" id="top">
    <p className="eyebrow">DIGITAL LIFE ARCHIVE · FRONTEND EXPERIENCE</p>
    <h1>Your life,<br/><span>in receipts.</span></h1>
    <p className="hero-copy">Thousands of tiny signals. One story waiting to be discovered.</p>
    <div className="hero-stats">
      <Stat value={totals.music.toLocaleString()} label="music moments" />
      <Stat value={totals.household.toLocaleString()} label="household receipts" />
      <Stat value={totals.transactions.toLocaleString()} label="transaction records" />
    </div>
    <button className="primary-btn" onClick={onExplore}>Explore the story ↓</button>
  </header>;
}
function Stat({value,label}) { return <div><strong>{value}</strong><span>{label}</span></div>; }
