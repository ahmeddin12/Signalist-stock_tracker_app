import WatchlistTable from "@/components/WatchlistTable";

// Static sample data to mirror the provided layout. No handlers; display only.
const ALERTS = [
  { company: "Apple Inc.", symbol: "AAPL", price: "$228.95", change: "+1.4%" },
  { company: "Tesla Inc.", symbol: "TSLA", price: "$306.00", change: "-2.58%" },
  { company: "Meta Platforms Inc.", symbol: "META", price: "$470.40", change: "+0.8%" },
  { company: "Microsoft Corporation", symbol: "MSFT", price: "$432.12", change: "+0.63%" },
  { company: "NVIDIA Corp", symbol: "NVDA", price: "$121.55", change: "+2.11%" },
  { company: "Uber Technologies", symbol: "UBER", price: "$94.77", change: "+1.17%" },
];

const NEWS = [
  {
    tag: "Markets",
    title: "Alphabet Unveils The AI Boost. What Does That Mean For Investors?",
    excerpt:
      "Alphabet showcased a suite of AI-first features aimed at deepening engagement and monetization. Analysts weigh in on revenue impact.",
    meta: "Today • WSJ",
  },
  {
    tag: "Tech",
    title: "Apple Prepares Major iPhone Redesign for 2026",
    excerpt:
      "Supply chain checks point to a lighter chassis, bigger battery, and a new on-device AI coprocessor slated for next-gen models.",
    meta: "2h • Bloomberg",
  },
  {
    tag: "Markets",
    title: "Tesla Announces Affordable EV Model for Global Markets",
    excerpt:
      "The company outlined plans to ramp production while preserving margins through platform reuse and localized manufacturing.",
    meta: "1h • Reuters",
  },
  {
    tag: "Earnings",
    title: "Nvidia Faces Growing Competition in AI Chips",
    excerpt:
      "Rivals push new accelerators to challenge Nvidia's dominance as cloud providers diversify their silicon portfolios.",
    meta: "3h • CNBC",
  },
  {
    tag: "Crypto",
    title: "Coinbase Sees Surge in Volumes on ETF Inflows",
    excerpt:
      "Spot ETF demand drove higher retail participation as Bitcoin hovered near multi-month highs.",
    meta: "4h • CoinDesk",
  },
  {
    tag: "Regulation",
    title: "Microsoft Expects AI Integration Across Office Suite",
    excerpt:
      "Executives detail Copilot adoption metrics and roadmap for embedded AI experiences across productivity apps.",
    meta: "Today • The Verge",
  },
  {
    tag: "Social",
    title: "Meta Platforms Sees Surge in VR Headset Sales",
    excerpt:
      "New content partnerships and aggressive pricing lifted holiday quarter sell-through, according to channel checks.",
    meta: "6h • TechCrunch",
  },
  {
    tag: "Autos",
    title: "Amazon Tests Drone Deliveries in Suburban Texas",
    excerpt:
      "The pilot expands its Prime Air footprint, targeting same-hour delivery for small household items.",
    meta: "5h • Axios",
  },
];

const SectionHeader = ({ title, action }: { title: string; action?: string }) => (
  <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
    <h2 className="text-sm font-semibold tracking-wide text-gray-200">{title}</h2>
    {action ? (
      <span className="rounded-md border border-border/50 bg-muted/20 px-3 py-1 text-xs text-gray-300">{action}</span>
    ) : null}
  </div>
);

const AlertItem = ({ company, symbol, price, change }: { company: string; symbol: string; price: string; change: string }) => {
  const negative = change.trim().startsWith("-");
  return (
    <div className="flex items-start justify-between rounded-lg border border-border/40 bg-muted/10 p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-border/40 bg-muted/20 text-xs font-semibold">
          {symbol.slice(0, 1)}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-200 leading-5">{company}</div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{symbol}</div>
          <div className="mt-1 text-xs text-gray-300">Price: <span className="font-medium text-gray-100">{price}</span> <span className={negative ? "text-red-400" : "text-emerald-400"}>{change}</span></div>
        </div>
      </div>
      <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">Active</span>
    </div>
  );
};

const NewsCard = ({ tag, title, excerpt, meta }: { tag: string; title: string; excerpt: string; meta: string }) => (
  <article className="rounded-lg border border-border/40 bg-muted/10 p-4 shadow-sm transition-colors hover:bg-muted/20">
    <div className="mb-2 inline-flex items-center gap-2">
      <span className="rounded-sm border border-yellow-500/40 bg-yellow-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-yellow-400">{tag}</span>
      <span className="text-[11px] text-muted-foreground">{meta}</span>
    </div>
    <h4 className="mb-2 text-sm font-semibold leading-5 text-gray-100">{title}</h4>
    <p className="text-xs leading-5 text-gray-300">{excerpt}</p>
  </article>
);

const WatchlistPage = () => {
  return (
    <div className="w-full min-h-screen px-4 py-5 md:px-6">
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Left: Watchlist */}
        <section className="xl:col-span-8 rounded-xl border border-border/60 bg-muted/10 shadow-sm">
          <SectionHeader title="Watchlist" action="Add Stock" />
          <div className="p-2 md:p-3">
            <WatchlistTable />
          </div>
        </section>

        {/* Right: Alerts */}
        <aside className="xl:col-span-4 rounded-xl border border-border/60 bg-muted/10 shadow-sm">
          <SectionHeader title="Alerts" action="Create Alert" />
          <div className="space-y-3 p-3 md:p-4 max-h-[640px] overflow-auto">
            {ALERTS.map((a) => (
              <AlertItem key={a.symbol} {...a} />
            ))}
          </div>
        </aside>

        {/* Bottom: News */}
        <section className="xl:col-span-12 rounded-xl border border-border/60 bg-muted/10 shadow-sm">
          <SectionHeader title="News" />
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
            {NEWS.map((n, idx) => (
              <NewsCard key={idx} {...n} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default WatchlistPage;
