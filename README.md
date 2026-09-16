# HelpDesk Queue

A helpdesk ticket queue that always surfaces the most pressing work first.

## Features

- Queue ordering: overdue tickets first, then priority (`URGENT`, `HIGH`, `NORMAL`, `LOW`), earliest response deadline, and oldest creation time.
- Automatic escalation: overdue tickets increase by one priority level per check (`LOW -> NORMAL -> HIGH -> URGENT`). `URGENT` tickets do not escalate further.
- Server-side filters for overdue tickets, assignee, and customer name.
- Pagination for large queues.
- Manual escalation check from the web UI.

## Setup

Requirements: Node.js 18 or newer and npm.

```bash
npm install
cd frontend && npm install
```

## Run

Start the API in one terminal:

```bash
node backend/server.js
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Test and build

Run the automated escalation check from the repository root:

```bash
npm test
```

Build the frontend:

```bash
cd frontend
npm run build
```

## API

`GET /api/tickets` supports these query parameters:

- `page`: 1-based page number, default `1`
- `limit`: page size, default `5`, maximum `50`
- `overdue=true`: return only tickets past `responseDueAt`
- `assignedTo=Priya`: filter by assignee
- `customerName=ABC`: case-insensitive partial customer-name search

`POST /api/escalate` runs one escalation pass and returns the updated sorted queue.

## Debugging

If the UI shows an API error, confirm that the backend is running on port `5000`. The frontend Vite proxy forwards `/api` requests to `http://localhost:5000`.
