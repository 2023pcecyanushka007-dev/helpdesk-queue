const tickets = [
    {
        id: 1,
        customerName: "ABC Corporation",
        title: "Laptop won't boot before client demo",
        description: "Laptop is not starting and the client demo is in a few hours.",
        priority: "URGENT",
        assignedTo: "Priya",
        status: "OPEN",
        createdAt: "2026-09-16T08:00:00",
        responseDueAt: "2026-09-16T10:00:00"
    },

    {
        id: 2,
        customerName: "XYZ Technologies",
        title: "VPN not working",
        description: "Unable to connect to the company VPN.",
        priority: "URGENT",
        assignedTo: "Rahul",
        status: "OPEN",
        createdAt: "2026-09-16T09:00:00",
        responseDueAt: "2026-09-16T17:00:00"
    },

    {
        id: 3,
        customerName: "PQR Industries",
        title: "Request for bigger monitor",
        description: "Customer requested a larger monitor for their workstation.",
        priority: "NORMAL",
        assignedTo: "Priya",
        status: "OPEN",
        createdAt: "2026-09-16T07:00:00",
        responseDueAt: "2026-09-17T10:00:00"
    },

    {
        id: 4,
        customerName: "Tech Solutions",
        title: "Email service is unavailable",
        description: "Employees are unable to send or receive emails.",
        priority: "HIGH",
        assignedTo: "Rahul",
        status: "IN_PROGRESS",
        createdAt: "2026-09-16T08:30:00",
        responseDueAt: "2026-09-16T18:00:00"
    },

    {
        id: 5,
        customerName: "DEF Limited",
        title: "Install VS Code",
        description: "Please install VS Code on the development machine.",
        priority: "LOW",
        assignedTo: "Priya",
        status: "OPEN",
        createdAt: "2026-09-16T10:00:00",
        responseDueAt: "2026-09-18T10:00:00"
    },

    {
        id: 6,
        customerName: "Global Systems",
        title: "Database connection issue",
        description: "Application cannot connect to the database.",
        priority: "HIGH",
        assignedTo: "Priya",
        status: "OPEN",
        createdAt: "2026-09-16T06:30:00",
        responseDueAt: "2026-09-16T11:00:00"
    },

    {
        id: 7,
        customerName: "ABC Corporation",
        title: "Password reset request",
        description: "Customer needs help resetting their password.",
        priority: "NORMAL",
        assignedTo: "Rahul",
        status: "OPEN",
        createdAt: "2026-09-16T11:00:00",
        responseDueAt: "2026-09-17T11:00:00"
    }
];

module.exports = tickets;