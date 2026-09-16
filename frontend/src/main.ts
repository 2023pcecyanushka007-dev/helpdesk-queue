import "./style.css";

interface Ticket {
    id: number;
    customerName: string;
    title: string;
    description: string;
    priority: string;
    assignedTo: string;
    status: string;
    createdAt: string;
    responseDueAt: string;
}

const API_URL = "/api/tickets";

let currentFilter = "all";
let searchTerm = "";
let assignedTo = "";
let currentPage = 1;
let totalPages = 1;
let totalCount = 0;
let visibleTickets: Ticket[] = [];

async function loadTickets() {
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
        <div class="loading">
            Loading tickets...
        </div>
    `;

    try {
        const params = new URLSearchParams({
            page: String(currentPage),
            limit: "5"
        });

        if (currentFilter === "overdue") params.set("overdue", "true");
        if (currentFilter === "my") params.set("assignedTo", "Priya");
        if (assignedTo) params.set("assignedTo", assignedTo);
        if (searchTerm.trim()) params.set("customerName", searchTerm.trim());

        const response = await fetch(`${API_URL}?${params}`);

        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();

        visibleTickets = data.tickets;
        totalPages = data.totalPages;
        totalCount = data.count;

        displayTickets();
    } catch (error) {
        app.innerHTML = `
            <div class="error">
                Unable to load tickets.
            </div>
        `;
    }
}

function displayTickets() {
    const app = document.querySelector<HTMLDivElement>("#app")!;

    app.innerHTML = `
        <div class="container">

            <header>
                <div>
                    <h1>HelpDesk Queue</h1>
                    <p>Manage and prioritize support tickets</p>
                </div>

                <button class="refresh" id="refresh">Run escalation check</button>
            </header>

            <div class="stats">

                <div class="stat-card">
                    <span>Total Tickets</span>
                    <strong>${totalCount}</strong>
                </div>

                <div class="stat-card">
                    <span>Urgent</span>
                    <strong>
                        ${visibleTickets.filter(t => t.priority === "URGENT").length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Open</span>
                    <strong>
                        ${visibleTickets.filter(t => t.status === "OPEN").length}
                    </strong>
                </div>

                <div class="stat-card">
                    <span>Assigned to Me</span>
                    <strong>
                        ${visibleTickets.filter(t => t.assignedTo === "Priya").length}
                    </strong>
                </div>

            </div>

            <div class="queue-header">

                <h2>Ticket Queue</h2>

                <div class="filters">

                    <button
                        class="filter ${currentFilter === "all" ? "active" : ""}"
                        data-filter="all">
                        All
                    </button>

                    <button
                        class="filter ${currentFilter === "overdue" ? "active" : ""}"
                        data-filter="overdue">
                        Overdue
                    </button>

                    <button
                        class="filter ${currentFilter === "my" ? "active" : ""}"
                        data-filter="my">
                        My Tickets
                    </button>

                    <label class="search-label">
                        Customer
                        <input id="customer-search" value="${searchTerm}" placeholder="Search by name" />
                    </label>

                    <label class="search-label">
                        Assignee
                        <select id="assignee">
                            <option value="">Everyone</option>
                            <option value="Priya" ${assignedTo === "Priya" ? "selected" : ""}>Priya</option>
                            <option value="Rahul" ${assignedTo === "Rahul" ? "selected" : ""}>Rahul</option>
                        </select>
                    </label>

                </div>

            </div>

            <div class="tickets">

                ${
                    visibleTickets.length > 0
                        ? visibleTickets
                              .map(ticket => createTicketCard(ticket))
                              .join("")
                        : `
                            <div class="empty">
                                No tickets found.
                            </div>
                          `
                }

            </div>

            <div class="pagination">
                <span>Showing ${visibleTickets.length} of ${totalCount}</span>
                <button id="previous" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
                <span>Page ${currentPage} of ${totalPages}</span>
                <button id="next" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
            </div>

        </div>
    `;

    document.querySelectorAll<HTMLButtonElement>(".filter").forEach(button => {

        button.addEventListener("click", () => {

            currentFilter = button.dataset.filter || "all";
            currentPage = 1;
            loadTickets();
        });

    });

    document.querySelector<HTMLInputElement>("#customer-search")?.addEventListener("input", event => {
        searchTerm = (event.target as HTMLInputElement).value;
        currentPage = 1;
        loadTickets();
    });

    document.querySelector<HTMLSelectElement>("#assignee")?.addEventListener("change", event => {
        assignedTo = (event.target as HTMLSelectElement).value;
        currentPage = 1;
        loadTickets();
    });

    document.querySelector<HTMLButtonElement>("#refresh")?.addEventListener("click", async () => {
        await fetch("/api/escalate", { method: "POST" });
        loadTickets();
    });

    document.querySelector<HTMLButtonElement>("#previous")?.addEventListener("click", () => {
        currentPage -= 1;
        loadTickets();
    });

    document.querySelector<HTMLButtonElement>("#next")?.addEventListener("click", () => {
        currentPage += 1;
        loadTickets();
    });
}

function createTicketCard(ticket: Ticket) {

    const overdue = new Date(ticket.responseDueAt) < new Date();

    return `
        <div class="ticket-card">

            <div class="ticket-top">

                <div>

                    <span class="ticket-id">
                        #${ticket.id}
                    </span>

                    <span class="priority ${ticket.priority.toLowerCase()}">
                        ${ticket.priority}
                    </span>

                    ${
                        overdue
                            ? `<span class="overdue">OVERDUE</span>`
                            : ""
                    }

                </div>

                <span class="status">
                    ${ticket.status}
                </span>

            </div>

            <h3>${ticket.title}</h3>

            <p>${ticket.description}</p>

            <div class="ticket-info">

                <span>
                    👤 ${ticket.customerName}
                </span>

                <span>
                    🧑‍💻 ${ticket.assignedTo}
                </span>

                <span>
                    ⏰ Due: ${formatDate(ticket.responseDueAt)}
                </span>

            </div>

        </div>
    `;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString();
}

loadTickets();