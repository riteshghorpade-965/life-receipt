import { useMemo, useState } from 'react';
import { getConnections } from '../utils/connections';

export default function ConnectionExplorer({ receipts, dates, sharedDates }) {
  const [date,setDate] = useState(dates[0] || '');
  const connections = useMemo(()=>getConnections(receipts,date),[receipts,date]);
  const types = [...new Set(connections.map(x=>x.type))];
  return <section className="section connection-section" id="connections">
    <div className="section-heading"><div><p className="eyebrow">03 · CONNECT THE DOTS</p><h2>Moments hide between datasets.</h2></div><p>Choose a shared calendar date and explore contextual connections.</p></div>
    <div className="connection-layout">
      <div className="date-picker"><label htmlFor="moment-date">Explore a shared date</label><select id="moment-date" value={date} onChange={e=>setDate(e.target.value)}>{dates.map(d=><option key={d}>{d}</option>)}</select>
        <div className="connection-stat"><strong>{connections.length}</strong><span>prepared receipts around this date</span></div>
        <p className="note">Shared dates found: {sharedDates.musicHousehold} music + household · {sharedDates.musicTransactions} music + transaction.</p>
      </div>
      <div className="node-field">
        <div className="date-node"><span>SELECTED MOMENT</span><strong>{date}</strong></div>
        {connections.slice(0,8).map((r,i)=><div className={`node node-${i%4}`} key={`${r.date}-${r.type}-${i}`}><span>{icon(r.type)}</span><b>{r.title}</b><small>{r.type}</small></div>)}
        {!types.length && <p className="empty">No prepared connections for this date.</p>}
      </div>
    </div>
  </section>;
}
function icon(type){return type==='music'?'🎵':type==='household'?'💰':'🛒';}
