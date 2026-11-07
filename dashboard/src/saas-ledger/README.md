# SaaS Operating Ledger

This module is the production application layer for the SaaS Operating Ledger prototype. It uses Supabase for live relational data and exposes the dashboard at `/` and `/ledger`.

## Data
- 10 build phases
- work items with phase/status/priority/due date
- live dashboard aggregates
- quick capture for issues, learnings, decisions, experiments, snapshots and invoices
- phase drill-down and completion toggles
- finance/customer/subscription tables are prepared in Supabase for the next operating modules
