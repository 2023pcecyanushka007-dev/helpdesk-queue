const priorityLevels = ["LOW", "NORMAL", "HIGH", "URGENT"];

function escalateTickets(tickets, now = new Date()) {
    const currentTime = new Date(now).getTime();

    tickets.forEach(ticket => {
        const dueTime = new Date(ticket.responseDueAt).getTime();
        const currentIndex = priorityLevels.indexOf(ticket.priority);

        if (dueTime < currentTime && currentIndex >= 0 && currentIndex < priorityLevels.length - 1) {
            ticket.priority = priorityLevels[currentIndex + 1];
        }
    });

    return tickets;
}

module.exports = escalateTickets;