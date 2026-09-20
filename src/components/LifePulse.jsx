export default function LifePulse({ years, selectedYear, setSelectedYear }) {
  const max = Math.max(...years.map((x) => x.count), 1);
  return <section className="section" id="pulse">
    <div className="section-heading"><div><p className="eyebrow">01 · LIFE PULSE</p><h2>Your life has a rhythm.</h2></div><p>Listening activity changes across the recorded years.</p></div>
    <div className="pulse">
      {years.map((item) => <button className={`bar-wrap ${selectedYear === item.year ? 'selected' : ''}`} key={item.year} onClick={() => setSelectedYear(item.year)} aria-label={`View ${item.year}, ${item.count} music records`}>
        <span className="bar" style={{height: `${Math.max(8, item.count/max*100)}%`}}></span><small>{item.year}</small>
      </button>)}
    </div>
    {selectedYear && <div className="insight-strip"><b>{selectedYear}</b><span>Selected listening chapter</span></div>}
  </section>;
}
