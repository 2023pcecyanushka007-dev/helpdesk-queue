const priorityValue = {
    URGENT: 1,
    HIGH: 2,
    NORMAL: 3,
    LOW: 4
};

function sortTickets(tickets) {
    const now = new Date();

    return [...tickets].sort((a, b) => {

        const aOverdue = new Date(a.responseDueAt) < now;
        const bOverdue = new Date(b.responseDueAt) < now;

        // Overdue tickets always come first
        if (aOverdue !== bOverdue) {
            return aOverdue ? -1 : 1;
        }

        // Higher priority comes first
        if (priorityValue[a.priority] !== priorityValue[b.priority]) {
            return priorityValue[a.priority] - priorityValue[b.priority];
        }

        // Earlier response deadline comes first
        const aDue = new Date(a.responseDueAt).getTime();
        const bDue = new Date(b.responseDueAt).getTime();

        if (aDue !== bDue) {
            return aDue - bDue;
        }

        // Older ticket comes first
        return new Date(a.createdAt).getTime() -
               new Date(b.createdAt).getTime();
    });
}

module.exports = sortTickets;