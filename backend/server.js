const express = require("express");
const cors = require("cors");

const tickets = require("./data/tickets");
const sortTickets = require("./utils/queueOrder");
const escalateTickets = require("./utils/escalateTickets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "HelpDesk Queue API is running"
    });
});

app.get("/api/tickets", (req, res) => {
    escalateTickets(tickets);

    const { overdue, assignedTo, customerName } = req.query;
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 5, 1), 50);
    const normalizedCustomerName = String(customerName || "").trim().toLowerCase();

    const filteredTickets = tickets.filter(ticket => {
        const isOverdue = new Date(ticket.responseDueAt) < new Date();
        const matchesOverdue = overdue !== "true" || isOverdue;
        const matchesAssignee = !assignedTo || ticket.assignedTo.toLowerCase() === String(assignedTo).toLowerCase();
        const matchesCustomer = !normalizedCustomerName || ticket.customerName.toLowerCase().includes(normalizedCustomerName);

        return matchesOverdue && matchesAssignee && matchesCustomer;
    });

    const sortedTickets = sortTickets(filteredTickets);
    const start = (page - 1) * limit;

    res.json({
        success: true,
        count: sortedTickets.length,
        page,
        limit,
        totalPages: Math.max(Math.ceil(sortedTickets.length / limit), 1),
        tickets: sortedTickets.slice(start, start + limit)
    });
});

app.post("/api/escalate", (req, res) => {

    escalateTickets(tickets);

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        message: "Escalation check completed",
        tickets: sortedTickets
    });
});
setInterval(() => {

    escalateTickets(tickets);

    console.log("Automatic escalation check completed");

}, 60 * 1000);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});