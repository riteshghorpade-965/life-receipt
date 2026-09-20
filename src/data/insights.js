export async function loadInsights() {
  const response = await fetch('/data/insights.json');
  if (!response.ok) throw new Error('Unable to load prepared receipt insights.');
  return response.json();
}
