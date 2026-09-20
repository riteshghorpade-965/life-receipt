export function filterReceipts(receipts, query = '', type = 'all') {
  const q = query.trim().toLowerCase();
  return receipts.filter((receipt) => {
    const typeMatch = type === 'all' || receipt.type === type;
    const text = `${receipt.title} ${receipt.detail}`.toLowerCase();
    return typeMatch && (!q || text.includes(q));
  });
}
