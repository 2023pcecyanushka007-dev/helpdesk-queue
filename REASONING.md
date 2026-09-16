# Solution Reasoning

## Interpreting the queue

The central requirement is that the next ticket must be unambiguous. The queue therefore sorts tickets using the agreed operational urgency:

1. Tickets past their response deadline come first.
2. Within each urgency group, higher priority comes first: urgent, high, normal, low.
3. Earlier response deadlines break ties.
4. Older tickets break any remaining ties.

Sorting returns a new array so callers can request a queue view without changing the source order.

## Escalation rule

The automated check runs when the backend starts its one-minute interval and before queue reads. It checks `responseDueAt` against the current time. An overdue ticket advances exactly one position in the priority list during a single run. Re-running the check can advance it again if it remains overdue, while urgent tickets remain urgent.

The escalation utility accepts an optional current time. This keeps the production default real-time while allowing the automated check to use fixed timestamps and verify the one-level-per-run rule reliably.

## Queue workflows

Filtering and pagination are performed by the backend so the behavior remains correct for large queues and all clients see the same result. The API supports overdue status, assignee, and case-insensitive partial customer-name search. Filters are applied before the canonical queue sort, and pagination is applied after sorting.

The frontend exposes the queue, overdue view, assigned-to-me view, assignee selection, customer lookup, pagination, and a manual escalation action. The API remains the source of truth for queue state.

## Tradeoffs

The current project uses an in-memory ticket collection because the assignment focuses on queue behavior. A production version would persist tickets and escalation history in a database, add authentication and authorization, and replace the interval with a durable scheduled job. The ordering and escalation utilities are isolated so those changes would not alter the core rules.
