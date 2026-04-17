import { useState, useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell as BarCell
} from 'recharts'

// ─── Data ───────────────────────────────────────────────────────────────────

const TODAY = new Date()

function daysAgo(n) {
  const d = new Date(TODAY)
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

const COMPANIES = [
  { id: 1,  name: 'Arclight AI',       fund: 'Fund III', stage: 'Seed',     sector: 'AI/ML',          arr: 1200000,  cash: 4800000,  burn: 380000, headcount: 18, valuation: 28000000,  lastReported: daysAgo(12), support: 'Help with Series A deck' },
  { id: 2,  name: 'Meridian Finance',  fund: 'Fund II',  stage: 'Seed',     sector: 'Fintech',        arr: 3400000,  cash: 7200000,  burn: 290000, headcount: 31, valuation: 45000000,  lastReported: daysAgo(8),  support: 'Intro to enterprise sales talent' },
  { id: 3,  name: 'Stackform',         fund: 'Fund III', stage: 'Pre-Seed', sector: 'Dev Tools',      arr: 180000,   cash: 2100000,  burn: 95000,  headcount: 7,  valuation: 8000000,   lastReported: daysAgo(30), support: 'None this quarter' },
  { id: 4,  name: 'Crestline Health',  fund: 'Fund II',  stage: 'Seed',     sector: 'Healthcare',     arr: 2100000,  cash: 5500000,  burn: 420000, headcount: 24, valuation: 32000000,  lastReported: daysAgo(22), support: 'CFO recruiting support' },
  { id: 5,  name: 'Dawnlight',         fund: 'Fund IV',  stage: 'Pre-Seed', sector: 'AI/ML',          arr: 0,        cash: 3800000,  burn: 120000, headcount: 5,  valuation: 12000000,  lastReported: daysAgo(15), support: 'None this quarter' },
  { id: 6,  name: 'Irongate Security', fund: 'Fund III', stage: 'Seed',     sector: 'Infrastructure', arr: 890000,   cash: 3100000,  burn: 210000, headcount: 14, valuation: 18000000,  lastReported: daysAgo(40), support: 'Legal intro for international expansion' },
  { id: 7,  name: 'Fable Data',        fund: 'Fund II',  stage: 'Seed',     sector: 'AI/ML',          arr: 4800000,  cash: 9200000,  burn: 510000, headcount: 42, valuation: 68000000,  lastReported: daysAgo(7),  support: 'Customer reference connections' },
  { id: 8,  name: 'Palisade Bio',      fund: 'Fund I',   stage: 'Seed',     sector: 'Healthcare',     arr: 8200000,  cash: 12000000, burn: 680000, headcount: 67, valuation: 120000000, lastReported: daysAgo(33), support: 'None this quarter' },
  { id: 9,  name: 'Relay Commerce',    fund: 'Fund III', stage: 'Seed',     sector: 'Consumer',       arr: 1600000,  cash: 4200000,  burn: 340000, headcount: 21, valuation: 24000000,  lastReported: daysAgo(55), support: 'PR / media intro' },
  { id: 10, name: 'Northstar Maps',    fund: 'Fund II',  stage: 'Seed',     sector: 'Infrastructure', arr: 2800000,  cash: 3800000,  burn: 295000, headcount: 19, valuation: 38000000,  lastReported: daysAgo(60), support: 'None this quarter' },
  { id: 11, name: 'Cipher Labs',       fund: 'Fund III', stage: 'Pre-Seed', sector: 'Dev Tools',      arr: 90000,    cash: 1800000,  burn: 75000,  headcount: 6,  valuation: 7000000,   lastReported: daysAgo(50), support: 'Intro to enterprise sales talent' },
  { id: 12, name: 'Cloudspan',         fund: 'Fund II',  stage: 'Seed',     sector: 'Infrastructure', arr: 5100000,  cash: 6800000,  burn: 445000, headcount: 38, valuation: 55000000,  lastReported: daysAgo(62), support: 'None this quarter' },
  { id: 13, name: 'Wavefront AI',      fund: 'Fund III', stage: 'Seed',     sector: 'AI/ML',          arr: 2200000,  cash: 4100000,  burn: 380000, headcount: 22, valuation: 30000000,  lastReported: daysAgo(48), support: 'Help with Series A deck' },
  { id: 14, name: 'Brasa Payments',    fund: 'Fund I',   stage: 'Seed',     sector: 'Fintech',        arr: 11400000, cash: 18000000, burn: 820000, headcount: 89, valuation: 160000000, lastReported: daysAgo(58), support: 'Customer reference connections' },
  { id: 15, name: 'Openframe',         fund: 'Fund IV',  stage: 'Pre-Seed', sector: 'Dev Tools',      arr: 0,        cash: 2900000,  burn: 105000, headcount: 4,  valuation: 9000000,   lastReported: daysAgo(52), support: 'None this quarter' },
  { id: 16, name: 'Apex Carbon',       fund: 'Fund II',  stage: 'Seed',     sector: 'Infrastructure', arr: 1900000,  cash: 2200000,  burn: 310000, headcount: 17, valuation: 22000000,  lastReported: daysAgo(90), support: 'CFO recruiting support' },
  { id: 17, name: 'Luminos Vision',    fund: 'Fund III', stage: 'Seed',     sector: 'AI/ML',          arr: 720000,   cash: 1400000,  burn: 290000, headcount: 11, valuation: 14000000,  lastReported: daysAgo(82), support: 'Legal intro for international expansion' },
  { id: 18, name: 'Tidal Finance',     fund: 'Fund I',   stage: 'Seed',     sector: 'Fintech',        arr: 6800000,  cash: 4100000,  burn: 590000, headcount: 54, valuation: 85000000,  lastReported: daysAgo(95), support: 'Intro to enterprise sales talent' },
  { id: 19, name: 'Groundwork AI',     fund: 'Fund III', stage: 'Pre-Seed', sector: 'AI/ML',          arr: 150000,   cash: 1100000,  burn: 88000,  headcount: 5,  valuation: 6000000,   lastReported: daysAgo(110),support: 'PR / media intro' },
  { id: 20, name: 'Harborview Health', fund: 'Fund II',  stage: 'Seed',     sector: 'Healthcare',     arr: 3200000,  cash: 2800000,  burn: 460000, headcount: 28, valuation: 40000000,  lastReported: daysAgo(78), support: 'Help with Series A deck' },
]

const FUNDS_RAW = [
  { name: 'Fund I',   vintage: 2018, committed: 80000000,  called: 75000000,  distributions: 42000000, nav: 180000000, irr: 28,  exits: 3, active: 3 },
  { name: 'Fund II',  vintage: 2021, committed: 130000000, called: 110000000, distributions: 8000000,  nav: 195000000, irr: 19,  exits: 2, active: 6 },
  { name: 'Fund III', vintage: 2023, committed: 235000000, called: 140000000, distributions: 2000000,  nav: 168000000, irr: 14,  exits: 1, active: 8 },
  { name: 'Fund IV',  vintage: 2025, committed: 320000000, called: 45000000,  distributions: 0,        nav: 48000000,  irr: null, exits: 0, active: 3 },
]

const FUNDS = FUNDS_RAW.map(f => ({
  ...f,
  dpi:  f.called > 0 ? f.distributions / f.called : 0,
  rvpi: f.called > 0 ? f.nav / f.called : 0,
  tvpi: f.called > 0 ? (f.distributions + f.nav) / f.called : 0,
}))

// Navy gradient: Fund I (darkest) → Fund IV (lightest)
const FUND_BAR_COLORS = ['#0F1729', '#2A3F6F', '#4A6FA5', '#7A9CC8']

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysSince(dateStr) {
  return Math.floor((TODAY - new Date(dateStr)) / 86400000)
}

function getStatus(dateStr) {
  const d = daysSince(dateStr)
  if (d <= 45) return 'Submitted'
  if (d <= 75) return 'Pending'
  return 'Overdue'
}

function runway(cash, burn) {
  if (!burn) return null
  return Math.floor(cash / burn)
}

function fmt$(n) {
  if (n === 0) return '$0'
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const STATUS_STYLES = {
  Submitted: 'bg-green-100 text-green-800',
  Pending:   'bg-yellow-100 text-yellow-800',
  Overdue:   'bg-red-100 text-red-800',
}

const SECTOR_COLORS = ['#0F1729', '#2563EB', '#7C3AED', '#059669', '#DC2626', '#CA8A04', '#0891B2']

const LAST_UPDATED = TODAY.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

// ─── Components ──────────────────────────────────────────────────────────────

function SummaryCard({ label, value, sub, accent }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 px-5 py-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  )
}

function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  )
}

function SortIcon({ col, sortCol, sortDir }) {
  if (sortCol !== col) return <span className="ml-1 text-gray-300">↕</span>
  return <span className="ml-1 text-gray-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
}

function RunwayCell({ value }) {
  if (value === null) return <span className="text-gray-400">—</span>
  if (value <= 6)  return <span className="font-semibold text-red-600">{value}</span>
  if (value <= 12) return <span className="font-medium text-yellow-600">{value}</span>
  return <span className="text-gray-900">{value}</span>
}

// ─── Daily Insights ──────────────────────────────────────────────────────────

const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getDayContext() {
  const day = TODAY.getDay()
  if (day === 1) return 'Start of week — here\'s what to prioritize today.'
  if (day === 5) return 'End of week — here\'s what\'s still open.'
  if (day === 0 || day === 6) return 'Weekend check-in — here\'s where things stand.'
  return 'Here\'s what needs your attention today.'
}

function buildInsights(companies) {
  const insights = []

  const chaseNow = companies.filter(c => c.status === 'Overdue' && typeof c.runway === 'number' && c.runway <= 6)
  if (chaseNow.length > 0) {
    insights.push({
      tier: 1,
      label: 'Chase Today',
      color: 'red',
      items: chaseNow.map(c => ({
        name: c.name,
        detail: `${daysSince(c.lastReported)}d overdue · ${c.runway} mo runway · ${fmt$(c.burn)}/mo burn`,
      })),
    })
  }

  const chaseWeek = companies.filter(c => c.status === 'Overdue' && typeof c.runway === 'number' && c.runway > 6 && c.runway <= 12)
  if (chaseWeek.length > 0) {
    insights.push({
      tier: 2,
      label: 'Chase This Week',
      color: 'orange',
      items: chaseWeek.map(c => ({
        name: c.name,
        detail: `${daysSince(c.lastReported)}d overdue · ${c.runway} mo runway · ${fmt$(c.burn)}/mo burn`,
      })),
    })
  }

  const approaching = companies.filter(c => {
    const d = daysSince(c.lastReported)
    return d >= 35 && d < 46
  })
  if (approaching.length > 0) {
    insights.push({
      tier: 3,
      label: 'Get Ahead of It',
      color: 'yellow',
      items: approaching.map(c => ({
        name: c.name,
        detail: `${daysSince(c.lastReported)}d since last report — goes overdue in ${45 - daysSince(c.lastReported)}d`,
      })),
    })
  }

  const submitted = companies.filter(c => c.status === 'Submitted').length
  const pct = Math.round((submitted / companies.length) * 100)
  insights.push({
    tier: 4,
    label: 'Portfolio Pulse',
    color: 'blue',
    items: [{
      name: `${pct}% submitted this cycle`,
      detail: `${submitted} current · ${companies.filter(c=>c.status==='Pending').length} pending · ${companies.filter(c=>c.status==='Overdue').length} overdue`,
    }],
  })

  return insights
}

const INSIGHT_STYLES = {
  red:    { border: 'border-red-200',    bg: 'bg-red-50',    dot: 'bg-red-500',    label: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  orange: { border: 'border-orange-200', bg: 'bg-orange-50', dot: 'bg-orange-500', label: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  yellow: { border: 'border-yellow-200', bg: 'bg-yellow-50', dot: 'bg-yellow-500', label: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  blue:   { border: 'border-blue-200',   bg: 'bg-blue-50',   dot: 'bg-blue-500',   label: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700' },
}

function DailyInsights({ companies }) {
  const [open, setOpen] = useState(true)
  const insights = useMemo(() => buildInsights(companies), [companies])
  const actionCount = insights.filter(i => i.tier < 4).reduce((s, i) => s + i.items.length, 0)

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">
            Today's Focus — {DAY_LABELS[TODAY.getDay()]}
          </span>
          <span className="text-xs text-gray-400">{getDayContext()}</span>
        </div>
        <div className="flex items-center gap-2">
          {actionCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {actionCount} action{actionCount > 1 ? 's' : ''}
            </span>
          )}
          <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-100">
          {insights.map(insight => {
            const s = INSIGHT_STYLES[insight.color]
            return (
              <div key={insight.label} className={`px-5 py-3 ${s.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wide ${s.label}`}>{insight.label}</span>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${s.badge}`}>{insight.items.length}</span>
                </div>
                <div className="flex flex-col gap-1.5 pl-4">
                  {insight.items.map((item, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── At Risk Panel ────────────────────────────────────────────────────────────

function AtRiskPanel({ companies }) {
  const atRisk = companies.filter(c => c.status === 'Overdue' && typeof c.runway === 'number' && c.runway <= 12)
  if (atRisk.length === 0) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-red-600 font-semibold text-sm">At Risk</span>
        <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">{atRisk.length}</span>
        <span className="text-red-400 text-xs ml-1">Overdue reporting + &lt;12 mo runway</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {atRisk.map(c => (
          <div key={c.id} className="bg-white border border-red-200 rounded-md px-3 py-2 text-xs">
            <div className="font-semibold text-gray-900">{c.name}</div>
            <div className="text-gray-500 mt-0.5">{c.fund} · {c.runway} mo runway · {fmt$(c.burn)}/mo burn</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tab 1: Portfolio Companies ───────────────────────────────────────────────

function PortfolioTab() {
  const [filters, setFilters] = useState({ fund: 'All', stage: 'All', sector: 'All', status: 'All' })
  const [sortCol, setSortCol] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')

  const enriched = useMemo(() => COMPANIES.map(c => ({
    ...c,
    status: getStatus(c.lastReported),
    runway: runway(c.cash, c.burn),
  })), [])

  const filtered = useMemo(() => enriched.filter(c => (
    (filters.fund   === 'All' || c.fund   === filters.fund) &&
    (filters.stage  === 'All' || c.stage  === filters.stage) &&
    (filters.sector === 'All' || c.sector === filters.sector) &&
    (filters.status === 'All' || c.status === filters.status) &&
    (search === '' || c.name.toLowerCase().includes(search.toLowerCase()))
  )), [enriched, filters, search])

  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    let av = a[sortCol] ?? '', bv = b[sortCol] ?? ''
    if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase()
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  }), [filtered, sortCol, sortDir])

  function toggleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const avgRunway = Math.round(
    enriched.reduce((s, c) => s + (typeof c.runway === 'number' ? c.runway : 0), 0) /
    enriched.filter(c => typeof c.runway === 'number').length
  )
  const overdue = enriched.filter(c => c.status === 'Overdue').length
  const pending = enriched.filter(c => c.status === 'Pending').length

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }))

  const cols = [
    { key: 'name',         label: 'Company' },
    { key: 'fund',         label: 'Fund' },
    { key: 'stage',        label: 'Stage' },
    { key: 'sector',       label: 'Sector' },
    { key: 'lastReported', label: 'Last Reported' },
    { key: 'status',       label: 'Status' },
    { key: 'arr',          label: 'ARR/MRR' },
    { key: 'cash',         label: 'Cash Balance' },
    { key: 'burn',         label: 'Net Burn' },
    { key: 'runway',       label: 'Runway (mo)' },
    { key: 'headcount',    label: 'Headcount' },
    { key: 'valuation',    label: 'Last Valuation' },
    { key: 'support',      label: 'Support Needed' },
  ]

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Total Companies" value="20" />
        <SummaryCard label="Avg Runway" value={`${avgRunway} mo`} />
        <SummaryCard label="Submissions Overdue" value={overdue} accent={overdue > 0 ? 'text-red-600' : 'text-gray-900'} />
        <SummaryCard label="Submissions Pending"  value={pending}  accent={pending  > 0 ? 'text-yellow-600' : 'text-gray-900'} />
      </div>

      {/* Daily Insights */}
      <DailyInsights companies={enriched} />

      {/* At Risk Panel */}
      <AtRiskPanel companies={enriched} />

      {/* Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-sm border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
          />
        </div>

        <div className="w-px h-5 bg-gray-200" />

        {[
          { key: 'fund',   opts: ['All', 'Fund I', 'Fund II', 'Fund III', 'Fund IV'] },
          { key: 'stage',  opts: ['All', 'Pre-Seed', 'Seed'] },
          { key: 'sector', opts: ['All', 'AI/ML', 'Fintech', 'Infrastructure', 'Consumer', 'Dev Tools', 'Healthcare'] },
          { key: 'status', opts: ['All', 'Submitted', 'Pending', 'Overdue'] },
        ].map(({ key, opts }) => (
          <div key={key} className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-500 capitalize">{key}</label>
            <select
              value={filters[key]}
              onChange={e => setFilter(key, e.target.value)}
              className="text-sm border border-gray-200 rounded px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}

        <button
          onClick={() => { setFilters({ fund: 'All', stage: 'All', sector: 'All', status: 'All' }); setSearch('') }}
          className="ml-auto text-xs text-gray-400 hover:text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {cols.map(c => (
                  <th
                    key={c.key}
                    onClick={() => toggleSort(c.key)}
                    className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide cursor-pointer select-none whitespace-nowrap hover:bg-gray-100"
                  >
                    {c.label}<SortIcon col={c.key} sortCol={sortCol} sortDir={sortDir} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.fund}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.stage}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.sector}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{fmtDate(c.lastReported)}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusPill status={c.status} /></td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(c.arr)}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(c.cash)}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(c.burn)}/mo</td>
                  <td className="px-4 py-3 whitespace-nowrap"><RunwayCell value={c.runway} /></td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{c.headcount}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(c.valuation)}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-xs">{c.support || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {sorted.length} of {enriched.length} companies</span>
          <span className="text-xs text-gray-400 flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-red-500" /> &lt;6 mo runway</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-yellow-500" /> &lt;12 mo runway</span>
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Tab 2: Fund Overview ────────────────────────────────────────────────────

function FundTab() {
  const totalAUM     = FUNDS.reduce((s, f) => s + f.called, 0)
  const totalExits   = FUNDS.reduce((s, f) => s + f.exits, 0)
  const weightedTVPI = FUNDS.reduce((s, f) => s + f.tvpi * f.called, 0) / totalAUM

  const sectorData = useMemo(() => {
    const counts = {}
    COMPANIES.forEach(c => { counts[c.sector] = (counts[c.sector] || 0) + 1 })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [])

  const tvpiData = FUNDS.map(f => ({ name: f.name, TVPI: +f.tvpi.toFixed(2) }))

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Total AUM (Called)" value={fmt$(totalAUM)} sub={`of ${fmt$(FUNDS.reduce((s,f)=>s+f.committed,0))} committed`} />
        <SummaryCard label="Total Companies" value="20" />
        <SummaryCard label="Total Exits" value={totalExits} />
        <SummaryCard label="Weighted Avg TVPI" value={`${weightedTVPI.toFixed(2)}x`} />
      </div>

      {/* Fund Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Fund','Vintage','Committed','Called','Distributions','Residual NAV','TVPI','DPI','RVPI','Net IRR','Active','Exits'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FUNDS.map((f, i) => (
                <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{f.name}</td>
                  <td className="px-4 py-3 text-gray-600">{f.vintage}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(f.committed)}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(f.called)}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(f.distributions)}</td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{fmt$(f.nav)}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{f.tvpi.toFixed(2)}x</td>
                  <td className="px-4 py-3 text-gray-900">{f.dpi.toFixed(2)}x</td>
                  <td className="px-4 py-3 text-gray-900">{f.rvpi.toFixed(2)}x</td>
                  <td className="px-4 py-3 text-gray-900">{f.irr !== null ? `${f.irr}%` : '—'}</td>
                  <td className="px-4 py-3 text-gray-900">{f.active}</td>
                  <td className="px-4 py-3 text-gray-900">{f.exits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sector Concentration */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Sector Concentration</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
              >
                {sectorData.map((_, idx) => (
                  <Cell key={idx} fill={SECTOR_COLORS[idx % SECTOR_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} companies`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
            {sectorData.map((s, idx) => (
              <span key={s.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SECTOR_COLORS[idx % SECTOR_COLORS.length] }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>

        {/* TVPI by Fund — navy gradient */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Fund Performance — TVPI</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={tvpiData} layout="vertical" margin={{ left: 16, right: 24, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 'auto']} tickFormatter={v => `${v}x`} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={60} />
              <Tooltip formatter={(v) => [`${v}x`, 'TVPI']} />
              <Bar dataKey="TVPI" radius={[0, 4, 4, 0]}>
                {tvpiData.map((_, idx) => (
                  <Cell key={idx} fill={FUND_BAR_COLORS[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState('portfolio')

  const dateStr = TODAY.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header style={{ backgroundColor: '#0F1729' }} className="px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight">Neo</span>
          <span className="text-gray-400 text-sm">|</span>
          <span className="text-gray-300 text-sm font-medium">Portfolio Intelligence</span>
        </div>
        <span className="text-gray-400 text-xs">{dateStr}</span>
      </header>

      {/* Tabs */}
      <div style={{ backgroundColor: '#0F1729' }} className="px-4 md:px-8 flex gap-0 border-b border-gray-700">
        {[
          { id: 'portfolio', label: 'Portfolio Companies' },
          { id: 'fund',      label: 'Fund Overview' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? 'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="px-4 md:px-8 py-6 flex-1">
        {tab === 'portfolio' ? <PortfolioTab /> : <FundTab />}
      </main>

      {/* Footer */}
      <footer className="px-8 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
        <span className="text-xs text-gray-400">Neo Portfolio Intelligence</span>
        <span className="text-xs text-gray-400">Last updated: {LAST_UPDATED}</span>
      </footer>
    </div>
  )
}
