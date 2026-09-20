# 🧾 LIFE RECEIPT — Connect the Dots

> **Your Life, In Receipts**

LIFE RECEIPT is an interactive frontend experience that transforms scattered
digital-life receipts into meaningful patterns, contextual connections, and
visual stories.

Instead of presenting the dataset as a simple list or timeline, the project
lets users explore their journey through **Life Pulse, Receipt Explorer,
Connect the Dots, Pattern Lab, and Life Chapters**.

---

## 🌐 Live Demo

**Live Website:**  
https://life-receipt-86fy.vercel.app

**GitHub Repository:**  
https://github.com/riteshghorpade-965/life-receipt

---

## 🎯 Problem

Digital life is made up of thousands of small records:

- 🎵 Music
- 🎬 Movies & Entertainment
- 📍 Places
- 🛍️ Purchases
- 📸 Photos
- 💬 Messages
- 🔎 Searches
- 📅 Events
- 📝 Personal Notes

Individually, these records are just receipts.

The challenge is to transform those records into something users can
**explore, connect, understand, and experience as a story**.

---

## 💡 Solution

LIFE RECEIPT follows the journey:

**Raw Data → Insights → Connections → Story**

The experience converts prepared dataset insights into an interactive
digital-museum style interface.

Users can:

1. Explore activity across years
2. Search and filter receipts
3. Inspect individual receipt insights
4. Discover contextual relationships between dates
5. Explore recurring patterns
6. Navigate visual life chapters

---

# ✨ Key Features

## 📈 1. Life Pulse

A year-wise visualization showing changes in activity over time.

Users can select different years and explore how the volume of life receipts
changes throughout the dataset.

---

## 🧾 2. Receipt Explorer

An interactive exploration area for prepared receipt insights.

Features include:

- Search
- Category filtering
- Year-based exploration
- Receipt cards
- Additional receipt context
- Progressive exploration instead of rendering the complete raw dataset

This keeps the interface easier to navigate and avoids placing thousands of
raw records directly into the DOM.

---

## 🔗 3. Connect the Dots

The central interactive storytelling feature.

Users can explore receipts that occur around the same dates and discover
relationships between different categories of activity.

For example, a particular date can connect:

**Music → Purchase → Event → Other Activity**

These connections are **temporal and contextual**.

They do not claim that records from different datasets belong to the same
person or represent a verified personal identity.

---

## 🧠 4. Pattern Lab

Pattern Lab surfaces notable patterns from the prepared dataset insights.

It helps users move beyond individual records and look for recurring
activity across time and categories.

---

## 📖 5. Life Chapters

Life Chapters transform data into a visual narrative.

Instead of only asking:

> "What happened?"

the experience encourages users to explore:

> "What patterns and moments can be discovered across the data?"

---

## 🔎 6. Search & Filtering

The interface provides interactive controls for navigating the prepared
receipt insights.

Users can combine:

- Search queries
- Categories
- Years
- Dates

to narrow down the information they want to explore.

---

# 🎨 Design Direction

LIFE RECEIPT is designed as a **digital museum of everyday life** rather than
a conventional analytics dashboard.

The visual direction uses:

- Dark editorial interface
- Large typography
- High-contrast accent elements
- Receipt-inspired visual language
- Interactive cards
- Data visualizations
- Storytelling sections
- Responsive layouts

The goal is to make data exploration feel more like discovering a story than
reading a spreadsheet.

---

# 🏗️ Architecture

The application follows a frontend component-based architecture.

```text
life-receipt/
│
├── public/
│   └── data/
│       └── insights.json
│
├── src/
│   ├── components/
│   │   ├── Chapters.jsx
│   │   ├── ConnectionExplorer.jsx
│   │   ├── Hero.jsx
│   │   ├── LifePulse.jsx
│   │   ├── PatternLab.jsx
│   │   └── ReceiptExplorer.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
