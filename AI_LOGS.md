# AI Conversation Log

This file records the AI conversation available in this workspace for the implementation.

---

User:

> i have done the project till here, as you can see, now according to the updated twist in the problem statement, make changes

Assistant:

> You need to trust this workspace to use Chat.

User:

> **ROUND 2  ·  BUILD ROUND
>
> The helpdesk is drowning
>
> Priya runs a two-person IT helpdesk and the queue never stops. Some tickets are ‘my laptop won’t boot before a client demo’ emergencies; others are ‘can I get a bigger monitor.’ Each ticket has a priority and an agreed response time — urgent within 2 hours, normal within a day — and Priya wants to always pick the most pressing ticket next, with anything past its promised time jumping to the front. She’s forever answering ‘what’s overdue?’ and ‘what’s assigned to me?’, and looking up a specific customer’s ticket by name. The list is huge, so she pages through it.
>
> Build Priya something so the right ticket is always on top.
>
> (The way Priya talks about her queue tells you what it needs — the ordering rule is the heart of it. Build it for any helpdesk, not just Priya’s. Get tickets and the queue order right first, then filters and assignment.)
>
> The Twist
>
> Your solution must also include an automated check that escalates any ticket which has breached its agreed response time — raising its priority by one level (normal → high → urgent), at most one level per run.

Assistant:

> Implemented Round 2:
>
> - Added deterministic automated escalation checks.
> - Overdue tickets escalate only one priority level per run.
> - Queue reads automatically run escalation first.
> - Added server-side overdue, assignee, customer-name filtering, sorting, and pagination.
> - Updated the frontend with customer search, assignee filters, overdue/my-ticket views, pagination, and a manual escalation button.
>
> Validation passed:
>
> - `npm test`
> - `cd frontend && npm run build`
> - API smoke tests for pagination, overdue, customer, and assignee filters

User:

> is everything done as per the assigned tasks?
>
> **Round 2 is a hands-on "Builder" round** that assesses how candidates approach an open-ended, real-world problem.
> ...
> The final solution must be a **public** **GitHub repository**, and its root folder must contain the following three files, which are required for evaluation:
> - README.md — instructions for project setup, running, and debugging.
> - REASONING.md — an explanation of the thought process behind the solution.
> - AI_LOGS.md — a complete copy of the candidate's conversation with the AI tool (Copilot or any other). This log must be pasted as-is and not modified in any way; any alteration will lead to a deduction of marks.

---

Note: This log contains the conversation visible to this coding session. Any AI conversations conducted outside this session must be appended from their original source without rewriting them before submission.
