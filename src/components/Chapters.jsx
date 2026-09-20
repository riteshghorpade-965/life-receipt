import React from "react";
export default function Chapters() {
  const chapters=[
    ['01','EARLY SIGNALS','2013 — 2015','The first layer of the recorded journey.'],
    ['02','THE LISTENING YEARS','2016 — 2019','Music and household activity create a richer recorded context.'],
    ['03','THE DIGITAL YEARS','2022 — 2024','Shopping, travel and entertainment appear in the later transaction dataset.']
  ];
  return <section className="section" id="chapters"><div className="section-heading"><div><p className="eyebrow">05 · LIFE CHAPTERS</p><h2>Turn signals into a story.</h2></div><p>Chapters are descriptive, not identity claims.</p></div>
    <div className="chapters">{chapters.map(c=><article className="chapter" key={c[0]}><span>{c[0]}</span><div><p>{c[2]}</p><h3>{c[1]}</h3><p>{c[3]}</p></div><span>↗</span></article>)}</div>
  </section>;
}
