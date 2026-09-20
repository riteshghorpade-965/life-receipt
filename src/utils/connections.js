export function getConnections(receipts, date) {
  return receipts.filter((receipt) => receipt.date === date);
}
