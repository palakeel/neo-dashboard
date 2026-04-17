# Neo Portfolio Intelligence Dashboard — Build Spec

---

## Purpose

A clean, interactive portfolio monitoring dashboard built with dummy data to demonstrate
systems thinking, financial fluency, and builder instincts to Healy Jones at Neo.

Not a pitch. A conversation starter — held in reserve and shared only if the
conversation opens a natural door.

---

## Tech Stack

- React (single .jsx file)
- Tailwind for styling
- Recharts for any charts
- All data hardcoded as dummy data — no backend needed

---

## Layout

Two tabs across the top:
1. Portfolio Companies
2. Fund Overview

Clean header with "Neo Portfolio Intelligence" and current date.
Summary cards row below the header on both tabs.

---

## Tab 1: Portfolio Companies

### Summary Cards (top row, 4 cards)

- Total Portfolio Companies: 20
- Average Runway: X months (calculated from data)
- Submissions Overdue: X (red if > 0)
- Submissions Pending: X (yellow)

### Filter Bar

Dropdowns for:
- Fund (All, Fund I, Fund II, Fund III, Fund IV)
- Stage (All, Pre-Seed, Seed)
- Sector (All, AI/ML, Fintech, Infrastructure, Consumer, Dev Tools)
- Status (All, Submitted, Pending, Overdue)

### Main Table

Sortable columns:

| Column | Notes |
|---|---|
| Company | Name |
| Fund | Fund I / II / III / IV |
| Stage | Pre-Seed / Seed |
| Sector | AI/ML, Fintech, etc. |
| Last Reported | Date |
| Status | Color-coded pill: green=Submitted, yellow=Pending, red=Overdue |
| ARR/MRR | Monthly recurring revenue |
| Cash Balance | $ amount |
| Net Burn | Monthly burn rate |
| Runway | Calculated months remaining |
| Headcount | # employees |
| Last Valuation | $ amount from last round |
| Support Needed | Short text field — qualitative |

### Status Color Logic

- Submitted: reported within last 45 days — green pill
- Pending: 46-75 days since last report — yellow pill
- Overdue: 75+ days since last report — red pill

---

## Tab 2: Fund Overview

### Summary Cards (top row, 4 cards)

- Total AUM: sum of all called capital across funds
- Total Portfolio Companies: 20
- Total Exits: count from data
- Weighted Avg TVPI: calculated

### Fund Performance Table

One row per fund:

| Column | Notes |
|---|---|
| Fund | Fund I / II / III / IV |
| Vintage | Year fund was raised |
| Committed Capital | Total LP commitments |
| Called Capital | Capital deployed to date |
| Distributions | Capital returned to LPs |
| Residual NAV | Current fair value of unrealized holdings |
| TVPI | = DPI + RVPI |
| DPI | Distributions / Called Capital |
| RVPI | Residual NAV / Called Capital |
| Net IRR | Annualized net return |
| Active Investments | Count |
| Exits | Count |

### Charts (below table, side by side)

Left: Sector Concentration — pie or donut chart showing portfolio breakdown by sector
Right: Fund Performance — horizontal bar chart comparing TVPI across all four funds

---

## Dummy Data

### Four Funds

| Fund | Vintage | Committed | Called | Distributions | NAV |
|---|---|---|---|---|---|
| Fund I | 2018 | $80M | $75M | $42M | $180M |
| Fund II | 2021 | $130M | $110M | $8M | $195M |
| Fund III | 2023 | $235M | $140M | $2M | $168M |
| Fund IV | 2025 | $320M | $45M | $0 | $48M |

TVPI, DPI, RVPI should be auto-calculated from these numbers.
Net IRR: Fund I = 28%, Fund II = 19%, Fund III = 14%, Fund IV = n/a (too early)

### 20 Portfolio Companies

Mix of sectors, funds, stages, statuses. Include a realistic spread:
- 8 Submitted (reported recently)
- 7 Pending (getting close)
- 5 Overdue (need chasing)

Sample companies (fictional, plausible names):

| Company | Fund | Stage | Sector | ARR | Cash | Burn | Headcount | Valuation | Status |
|---|---|---|---|---|---|---|---|---|---|
| Arclight AI | Fund III | Seed | AI/ML | $1.2M | $4.8M | $380K | 18 | $28M | Submitted |
| Meridian Finance | Fund II | Seed | Fintech | $3.4M | $7.2M | $290K | 31 | $45M | Submitted |
| Stackform | Fund III | Pre-Seed | Dev Tools | $180K | $2.1M | $95K | 7 | $8M | Submitted |
| Crestline Health | Fund II | Seed | Healthcare | $2.1M | $5.5M | $420K | 24 | $32M | Submitted |
| Dawnlight | Fund IV | Pre-Seed | AI/ML | $0 | $3.8M | $120K | 5 | $12M | Submitted |
| Irongate Security | Fund III | Seed | Infrastructure | $890K | $3.1M | $210K | 14 | $18M | Submitted |
| Fable Data | Fund II | Seed | AI/ML | $4.8M | $9.2M | $510K | 42 | $68M | Submitted |
| Palisade Bio | Fund I | Seed | Healthcare | $8.2M | $12M | $680K | 67 | $120M | Submitted |
| Relay Commerce | Fund III | Seed | Consumer | $1.6M | $4.2M | $340K | 21 | $24M | Pending |
| Northstar Maps | Fund II | Seed | Infrastructure | $2.8M | $3.8M | $295K | 19 | $38M | Pending |
| Cipher Labs | Fund III | Pre-Seed | Dev Tools | $90K | $1.8M | $75K | 6 | $7M | Pending |
| Cloudspan | Fund II | Seed | Infrastructure | $5.1M | $6.8M | $445K | 38 | $55M | Pending |
| Wavefront AI | Fund III | Seed | AI/ML | $2.2M | $4.1M | $380K | 22 | $30M | Pending |
| Brasa Payments | Fund I | Seed | Fintech | $11.4M | $18M | $820K | 89 | $160M | Pending |
| Openframe | Fund IV | Pre-Seed | Dev Tools | $0 | $2.9M | $105K | 4 | $9M | Pending |
| Apex Carbon | Fund II | Seed | Infrastructure | $1.9M | $2.2M | $310K | 17 | $22M | Overdue |
| Luminos Vision | Fund III | Seed | AI/ML | $720K | $1.4M | $290K | 11 | $14M | Overdue |
| Tidal Finance | Fund I | Seed | Fintech | $6.8M | $4.1M | $590K | 54 | $85M | Overdue |
| Groundwork AI | Fund III | Pre-Seed | AI/ML | $150K | $1.1M | $88K | 5 | $6M | Overdue |
| Harborview Health | Fund II | Seed | Healthcare | $3.2M | $2.8M | $460K | 28 | $40M | Overdue |

Support needed text — add short qualitative notes to 8-10 companies:
- "Intro to enterprise sales talent"
- "Help with Series A deck"
- "Legal intro for international expansion"
- "CFO recruiting support"
- "None this quarter"
- "Customer reference connections"
- "PR / media intro"

---

## Design Principles

- White background, clean and minimal
- Neo brand color: use a dark navy (#0F1729) for header and accents
- Status pills: green (#16A34A), yellow (#CA8A04), red (#DC2626)
- Font: system default, no custom imports needed
- Table rows: light gray alternating rows for readability
- No flashy animations
- Numbers formatted: $ amounts with commas, percentages with one decimal, runway as integer

---

## What NOT to Build

- No cap table modeling
- No waterfall / carried interest calculations
- No deal flow pipeline
- No user authentication
- No backend or API calls
- No editing / form inputs (read-only dashboard only)

Staying focused is what makes it credible.

---

## How to Use in Conversation

Do NOT lead with this on the intro call.

If Healy mentions portfolio data collection, reporting overhead, or data quality as
a pain point — that is the opening:

"I actually spent some time thinking through that problem and put together a quick
prototype of how I would approach it. Happy to share it after the call if that would
be useful."

Let him ask for it. That framing makes it a gift, not a pitch.
