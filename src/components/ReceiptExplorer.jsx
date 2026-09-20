import React from "react";
import { useMemo, useState } from 'react';
import { filterReceipts } from '../utils/filters';

export default function ReceiptExplorer({ receipts }) {
  const [query,setQuery] = useState('');
  const [type,setType] = useState('all');
  const results = useMemo(() => filterReceipts(receipts, query, type).slice(0, 18), [receipts, query, type]);
  return <section className="section" id="explore">
    <div className="section-heading"><div><p className="eyebrow">02 · RECEIPT EXPLORER</p><h2>Look closer.</h2></div><p>Search and filter the prepared receipt index.</p></div>
    <div className="controls">
      <label className="search"><span aria-hidden="true">⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search artists, tracks, categories..." aria-label="Search receipts" /></label>
      <div className="chips" role="group" aria-label="Receipt type filters">
        {['all','music','household','transaction'].map((item)=><button key={item} className={type===item?'active':''} onClick={()=>setType(item)}>{item}</button>)}
      </div>
    </div>
    <div className="receipt-grid">
      {results.map((r,i)=><article className="receipt-card" key={`${r.date}-${r.type}-${i}`}><span className={`receipt-type ${r.type}`}>{r.type}</span><h3>{r.title}</h3><p>{r.detail}</p><time>{r.date}</time></article>)}
    </div>
    {!results.length && <p className="empty">No prepared receipts match that search.</p>}
  </section>;
}
