export function formatSOL(lamports: number): string {
  return (lamports / 1_000_000_000).toFixed(4)
}

export function formatLamports(lamports: number): string {
  return lamports.toLocaleString()
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}

export function formatSlot(slot: number): string {
  return slot.toLocaleString()
}

export function formatEpoch(epoch: number): string {
  return `Epoch ${epoch}`
}

export function formatTPS(transactions: number, seconds: number): number {
  return Math.round(transactions / seconds)
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `${seconds}s ago`
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
