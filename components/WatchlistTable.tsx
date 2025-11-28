import React from "react"
import { WATCHLIST_TABLE_HEADER } from "@/lib/constants"

// Sample table rows (text-only, left-aligned)
const SAMPLE_ROWS = [
  ["Apple Inc.", "AAPL", "$228.14", "+1.28%", "$3.53T", "35.4", "—", "—"],
  ["Microsoft", "MSFT", "$432.15", "+0.83%", "$3.22T", "39.2", "—", "—"],
  ["NVIDIA", "NVDA", "$121.55", "+2.11%", "$3.00T", "74.8", "—", "—"],
  ["Amazon", "AMZN", "$185.44", "-0.35%", "$1.93T", "52.1", "—", "—"],
  ["Alphabet", "GOOGL", "$169.27", "+0.22%", "$2.16T", "28.7", "—", "—"],
]

export default function WatchlistTable() {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="bg-muted/40 border-b border-border/50">
              {WATCHLIST_TABLE_HEADER.map((col) => (
                <th
                  key={col}
                  className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROWS.map((row, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="p-4 align-middle text-left">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
