export const CATEGORY_META = {
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

export const FILTERS = [
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

export function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function formatNumber(value) {
  return number(value).toLocaleString("en-IN");
}

export function getCategory(item) {
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

  if (
    raw.includes("purchase") ||
    raw.includes("transaction")
  ) {
    return "purchases";
  }

  if (raw.includes("photo") || raw.includes("image")) return "photos";
  if (raw.includes("message") || raw.includes("chat")) return "messages";
  if (raw.includes("search")) return "searches";
  if (raw.includes("event")) return "events";
  if (raw.includes("note")) return "notes";

  return "music";
}

export function getDate(item) {
  return (
    item?.date ||
    item?.timestamp ||
    item?.datetime ||
    item?.time ||
    ""
  );
}

export function getTitle(item) {
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

export function getSecondary(item) {
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

export function getSearchText(item) {
  return JSON.stringify(item).toLowerCase();
}