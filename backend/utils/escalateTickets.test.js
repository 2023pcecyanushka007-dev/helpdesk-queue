const assert = require("node:assert/strict");
const escalateTickets = require("./escalateTickets");

const now = "2026-09-16T12:00:00Z";
const tickets = [
    { id: 1, priority: "LOW", responseDueAt: "2026-09-16T11:00:00Z" },
    { id: 2, priority: "NORMAL", responseDueAt: "2026-09-16T11:00:00Z" },
    { id: 3, priority: "HIGH", responseDueAt: "2026-09-16T11:00:00Z" },
    { id: 4, priority: "URGENT", responseDueAt: "2026-09-16T11:00:00Z" },
    { id: 5, priority: "NORMAL", responseDueAt: "2026-09-16T13:00:00Z" }
];

escalateTickets(tickets, now);

assert.deepEqual(
    tickets.map(ticket => ticket.priority),
    ["NORMAL", "HIGH", "URGENT", "URGENT", "NORMAL"]
);

escalateTickets(tickets, now);

assert.deepEqual(
    tickets.map(ticket => ticket.priority),
    ["HIGH", "URGENT", "URGENT", "URGENT", "NORMAL"]
);

console.log("Escalation checks passed");