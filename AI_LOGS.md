problem.pdf
PDF
ROUND 2  ·  BUILD ROUND
The helpdesk is drowning
Priya runs a two-person IT helpdesk and the queue never stops. Some tickets are ‘my laptop won’t boot before a client demo’ emergencies; others are ‘can I get a bigger monitor.’ Each ticket has a priority and an agreed response time — urgent within 2 hours, normal within a day — and Priya wants to always pick the most pressing ticket next, with anything past its promised time jumping to the front. She’s forever answering ‘what’s overdue?’ and ‘what’s assigned to me?’, and looking up a specific customer’s ticket by name. The list is huge, so she pages through it.
Build Priya something so the right ticket is always on top.
(The way Priya talks about her queue tells you what it needs — the ordering rule is the heart of it. Build it for any helpdesk, not just Priya’s. Get tickets and the queue order right first, then filters and assignment.)


this the task that has been assigned to me, i need to make a working project as briefed on the github codespaces, tell me step by step, what should i do from the starting . you need to tell me every single thing
still cant find
this is how it looks

Great! 🎉 The frontend is running now.

Now we move from the static UI to making it a real working helpdesk application.

We will do this carefully, one step at a time.

PART 2 — Build the Backend

Our next goal is:

Frontend
   ↓
Backend API
   ↓
Database
   ↓
Tickets
   ↓
Queue ordering

But don't worry about MongoDB yet. First we'll get the backend running independently.

Step 9 — Create the backend folder

You currently have:

helpdesk-queue
└── frontend

We want:

helpdesk-queue
├── frontend
└── backend
In your Codespaces terminal

Your terminal is probably currently inside:

/workspaces/helpdesk-queue/frontend

Run:

cd ..

Now check:

pwd

It should say:

/workspaces/helpdesk-queue

Now create the backend:

mkdir backend

Then:

cd backend

Check:

pwd

It should say:

/workspaces/helpdesk-queue/backend
Step 10 — Initialize Node.js

Run:

npm init -y

You should see a new file appear in Explorer:

backend
└── package.json
Step 11 — Install backend packages

Run:

npm install express cors dotenv mongoose

Wait for it to finish.

Then install Nodemon:

npm install --save-dev nodemon

Your backend will now have:

backend
├── node_modules
├── package.json
└── package-lock.json
Step 12 — Create server.js

In the Explorer:

Right-click backend

Choose:

New File

Name it:

server.js

So you have:

backend
├── node_modules
├── package.json
├── package-lock.json
└── server.js
Step 13 — Add the server code

Open:

backend/server.js

Paste:

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "HelpDesk Queue API is running"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

Save:

Ctrl + S

Step 14 — Run the backend

Make sure your terminal says:

/workspaces/helpdesk-queue/backend

Then run:

node server.js

You should see:

Server running on port 5000
Don't close this terminal.

The backend needs to keep running.

Step 15 — Open port 5000

At the bottom of Codespaces, click:

PORTS

You already have:

5173

Now you should also see:

5000

It may automatically appear.

If it doesn't, click:

Add Port

and enter:

5000

Then open the forwarded address for port 5000.

You should see:

{
  "message": "HelpDesk Queue API is running"
}

🎉 That means your backend is working.

VERY IMPORTANT

At this point you will have two running servers:

Frontend
Port 5173
HelpDesk Queue UI
Backend
Port 5000
HelpDesk Queue API

Eventually:

Browser
   │
   │ HTTP requests
   ▼
Frontend :5173
   │
   │ API
   ▼
Backend :5000
   │
   ▼
MongoDB
Step 16 — Don't add MongoDB yet

We're going to do something important before connecting the database.

We need to properly define our Ticket structure and, more importantly, our queue ordering rules.

Remember the assignment's key requirement:

The ordering rule is the heart of it.

So our next steps will be:

1. Ticket model
        ↓
2. Sample ticket data
        ↓
3. Queue sorting algorithm ⭐
        ↓
4. API
        ↓
5. MongoDB

Actually, I'd like us to test the queue algorithm before we introduce database complexity. That way, if something goes wrong, we know the ordering logic itself works.

Your task right now

Do only Steps 9–15.

At the end, you should have:

helpdesk-queue
│
├── frontend
│   └── ...your working UI
│
├── backend
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── README.md

And PORTS should show:

5173  → Frontend
5000  → Backend

with the backend showing:

HelpDesk Queue API is running

Once that's working, tell me "backend working" and we'll build the Ticket model + actual queue-ordering logic next.

its showing like this, plus i have a query, why is it private, i need to submit this, will that affect?

Yes — what you're showing is correct. Your backend is running:

Port: 5000
Running Process: node server.js
Origin: Auto Forwarded

So we're good. ✅

About "Private" — this is important

Private does NOT mean your GitHub repository is private.

The Private shown in the PORTS tab means the temporary preview URL for your running server is accessible only to you (or people with access to your Codespace).

It does not affect the GitHub repository or your final submission.

For your assignment, what matters is:

GitHub repository
        ↓
Your source code
        ↓
README
        ↓
Evaluator can access the repository

The Codespaces port is just for you to run/test the application while developing.

For submission

If you're submitting the GitHub repository URL, the port being Private won't matter.

If the evaluator specifically asks for a live deployed website URL, then we'll deploy the application later. We won't use the temporary Codespaces port as the final production URL.

So leave 5000 as Private for now. 👍

Now, about your query

You said you have a query — ask me!

And don't worry about moving ahead yet. We'll resolve your question first, then continue building the project step-by-step.

what next?

Great. Your backend is running, so now we start implementing the actual assignment.

And this is where we should follow the brief carefully: tickets + queue ordering first, then filters, assignment, search, and pagination. The brief explicitly says the ordering rule is the heart of the project.

For now, we will NOT connect MongoDB yet. We'll first make the queue logic work with sample ticket data. Once that works, moving the same data into MongoDB will be much easier.

PART 3 — Build the Ticket Queue ⭐

Our next goal:

Sample Tickets
      ↓
Queue Algorithm
      ↓
GET /api/tickets
      ↓
Correctly ordered tickets
Step 17 — Create folders

Your Explorer currently has:

helpdesk-queue
├── backend
│   └── server.js
│
└── frontend

Inside backend, create a folder called:

data

So:

backend
├── data
└── server.js
How to do it

Right-click:

backend

→ New Folder

Name it:

data
Step 18 — Create tickets.js

Right-click:

backend/data

→ New File

Name it:

tickets.js

Open it and paste:

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

Save with:

Ctrl + S

Step 19 — Why we have these fields

Each ticket has:

id
customerName
title
description
priority
assignedTo
status
createdAt
responseDueAt

The two most important fields for the queue are:

priority
responseDueAt

Because we need to determine:

Is it overdue?
        ↓
What is its priority?
        ↓
When is its response due?
Step 20 — Create the queue algorithm

Now we're creating the heart of the application.

Inside backend, create a folder:

utils

So:

backend
├── data
│   └── tickets.js
├── utils
└── server.js

Inside utils, create:

queueOrder.js

Paste:

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

Save.

Step 21 — Understand what we just built

This is very important for your presentation/interview.

Suppose we have:

Ticket A
URGENT
OVERDUE

Ticket B
URGENT
NOT OVERDUE

Ticket C
HIGH
OVERDUE

Ticket D
NORMAL
NOT OVERDUE

Our queue becomes:

Ticket A
↓
Ticket C
↓
Ticket B
↓
Ticket D

Because:

First priority:
OVERDUE

Then:

URGENT
HIGH
NORMAL
LOW

Then:

Earlier response deadline

Then:

Older ticket

This directly addresses the central requirement of the assignment.

Step 22 — Connect this to the backend

Now open:

backend/server.js

Currently you have the simple server code.

Replace everything inside server.js with:

const express = require("express");
const cors = require("cors");

const tickets = require("./data/tickets");
const sortTickets = require("./utils/queueOrder");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "HelpDesk Queue API is running"
    });
});

app.get("/api/tickets", (req, res) => {

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        count: sortedTickets.length,
        tickets: sortedTickets
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

Save:

Ctrl + S

Step 23 — Restart the backend

Your old server is probably still running.

Go to the terminal where you ran:

node server.js

Press:

Ctrl + C

Then run:

node server.js

You should see:

Server running on port 5000
Step 24 — Test the API

Go to your PORTS tab.

Find:

5000

Open the forwarded URL.

Previously you saw:

{
    "message": "HelpDesk Queue API is running"
}

Now go to:

/api/tickets

So if your forwarded URL is something like:

https://xxxxx-5000.app.github.dev

the API address becomes:

https://xxxxx-5000.app.github.dev/api/tickets

Don't copy my example URL — use the URL shown in your PORTS tab.

Step 25 — What you should see

You should get JSON similar to:

{
  "success": true,
  "count": 7,
  "tickets": [
    {
      "id": 1,
      "customerName": "ABC Corporation",
      "title": "Laptop won't boot before client demo",
      "priority": "URGENT",
      ...
    },
    ...
  ]
}

The important thing is that the tickets are not necessarily in the same order as tickets.js.

The backend is now sorting them.

⚠️ One important point about our sample dates

The current date in our application environment is September 16, 2026, and we've deliberately created some deadlines that have already passed and some that haven't.

That lets us test the most important feature:

OVERDUE → FRONT

Later, when we create tickets through the UI, the SLA due time will be calculated automatically based on priority.

For example, eventually:

URGENT → response due within 2 hours
NORMAL → response due within 1 day

That is how we'll connect the "agreed response time" requirement to the actual application.

Where we are now

You have:

              HELPDESK QUEUE
                    │
                    ▼
             Sample Tickets
                    │
                    ▼
           Queue Ordering Logic ⭐
                    │
                    ▼
             GET /api/tickets
                    │
                    ▼
             Sorted JSON data

This is a major milestone.

What comes next

After you confirm this API is working, we'll do:

PART 4 — Make the queue actually visible

We'll connect:

Frontend
    ↓
fetch()
    ↓
GET /api/tickets
    ↓
Backend
    ↓
Sorted tickets
    ↓
Frontend ticket cards

So instead of the fake tickets currently hardcoded in your frontend, your page will display the real tickets coming from your backend.

Then we'll add, in this order:

✅ Ticket data
✅ Queue algorithm
⬜ Display real tickets
⬜ Overdue filter
⬜ Assigned-to-me filter
⬜ Customer search
⬜ Priority/status filters
⬜ Pagination
⬜ Create ticket
⬜ Automatic SLA calculation
⬜ Ticket details
⬜ MongoDB
⬜ Final testing
⬜ README
⬜ Deployment
For now, do only Steps 17–24.

Then open:

/api/tickets

If you get the JSON response, send me a screenshot of it. Then we'll connect it to your frontend.

why is it showing like this
now what next should i do according to the assignment

Now I can see the exact issue. 👍

Your TypeScript and CSS are using different class names.

For example, your main.ts creates:

class="filter"
class="new-ticket"
class="container"
class="ticket-info"
class="priority urgent"

but your CSS is looking for:

.filter-btn
.new-ticket-btn
main
.ticket-details
.urgent-badge

So the browser displays the elements, but most of the styling doesn't apply. That's why your screenshot looks like plain text.

Let's fix this properly

We will replace the entire style.css with CSS that matches the main.ts we just created.

Step 1 — Open
frontend/src/style.css
Step 2 — Select everything

Press:

Ctrl + A
Step 3 — Delete everything and paste this
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f5f7fb;
    color: #1f2937;
}

.container {
    max-width: 1200px;
    margin: auto;
    padding: 30px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

h1 {
    margin: 0;
    font-size: 32px;
}

header p {
    color: #6b7280;
    margin-top: 8px;
}

.new-ticket {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    font-size: 15px;
    cursor: pointer;
}

.new-ticket:hover {
    background: #1d4ed8;
}

.stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
}

.stat-card span {
    display: block;
    color: #6b7280;
    margin-bottom: 8px;
}

.stat-card strong {
    font-size: 28px;
}

.queue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.queue-header h2 {
    margin: 0;
}

.filters {
    display: flex;
    gap: 8px;
}

.filter {
    padding: 9px 16px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    border-radius: 7px;
    cursor: pointer;
    font-size: 14px;
}

.filter:hover {
    background: #f3f4f6;
}

.filter.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}

.tickets {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.ticket-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
}

.ticket-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ticket-id {
    color: #6b7280;
    margin-right: 10px;
}

.priority,
.overdue,
.status {
    padding: 5px 9px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    margin-right: 6px;
    display: inline-block;
}

.urgent {
    background: #fee2e2;
    color: #b91c1c;
}

.high {
    background: #ffedd5;
    color: #c2410c;
}

.normal {
    background: #dbeafe;
    color: #1d4ed8;
}

.low {
    background: #dcfce7;
    color: #15803d;
}

.overdue {
    background: #7f1d1d;
    color: white;
}

.status {
    background: #f3f4f6;
    color: #374151;
}

.ticket-card h3 {
    margin: 15px 0 8px;
    font-size: 19px;
}

.ticket-card p {
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

.ticket-info {
    display: flex;
    gap: 25px;
    color: #6b7280;
    font-size: 14px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.empty {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    color: #6b7280;
}

.loading,
.error {
    text-align: center;
    padding: 100px;
    font-size: 20px;
}

.error {
    color: #dc2626;
}

@media (max-width: 800px) {

    .container {
        padding: 20px;
    }

    header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .queue-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .ticket-info {
        flex-direction: column;
        gap: 8px;
    }
}

@media (max-width: 500px) {

    .stats {
        grid-template-columns: 1fr;
    }

    .filters {
        width: 100%;
    }

    .filter {
        flex: 1;
    }
}
Step 4 — Save

Press:

Ctrl + S

Vite should automatically update the page.

Step 5 — Refresh the browser

Press:

Ctrl + R
What your dashboard should look like now

You should see proper buttons:

Ticket Queue

[ All ] [ Overdue ] [ My Tickets ]

and at the top:

[ + New Ticket ]

Your ticket cards should also have proper:

🔴 URGENT badge
🟠 HIGH badge
🔵 NORMAL badge
🟢 LOW badge
OVERDUE badge
OPEN / IN_PROGRESS status
customer
assignee
due date
Then test this

Click:

Overdue

and then:

My Tickets

The buttons should now actually look like buttons and work because we already added the functionality in main.ts.

Once you've refreshed it, send me the screenshot. Then we'll move to the next assignment requirement: customer-name search + pagination.

yes till now everything is done, till buttons, now the problem statements have been modified, i'm attaching that too, tell accordingly what to do next

The helpdesk is drowning
Priya runs a two-person IT helpdesk and the queue never stops. Some tickets are ‘my laptop won’t boot before a client demo’ emergencies; others are ‘can I get a bigger monitor.’ Each ticket has a priority and an agreed response time — urgent within 2 hours, normal within a day — and Priya wants to always pick the most pressing ticket next, with anything past its promised time jumping to the front. She’s forever answering ‘what’s overdue?’ and ‘what’s assigned to me?’, and looking up a specific customer’s ticket by name. The list is huge, so she pages through it.
Build Priya something so the right ticket is always on top.
(The way Priya talks about her queue tells you what it needs — the ordering rule is the heart of it. Build it for any helpdesk, not just Priya’s. Get tickets and the queue order right first, then filters and assignment.)
The Twist
Your solution must also include an automated check that escalates any ticket which has breached its agreed response time — raising its priority by one level (normal → high → urgent), at most one level per run.

Yes — this modified problem statement changes the next priority. The new Twist is now a required feature, so we should implement that before spending time on UI polishing.

Your current work is still valid. In fact, the current queue ordering and buttons give us a good base.

What is completed so far

From the modified requirements:

Requirement	Status
Tickets fetched from backend	✅
Generic ticket structure	✅
Priority-based queue	✅
Overdue tickets identified	✅
Overdue tickets placed first	✅
Due-time ordering	✅
All / Overdue / My Tickets filters	✅
Basic dashboard	✅
Automated escalation	❌ NEW — next
Customer-name search	❌
Pagination	❌
Ticket assignment/update	❌
Final testing + README	❌

The statement explicitly says the ordering rule is the heart of the task, and the new twist adds an automated escalation check.

The NEW feature we need to build

The system needs an automated check that says:

If a ticket has crossed its agreed response deadline, increase its priority by one level.

For example:

NORMAL → HIGH → URGENT

And importantly:

NORMAL overdue
       ↓
automated check
       ↓
HIGH

HIGH overdue
       ↓
next automated check
       ↓
URGENT

It must not do:

NORMAL → URGENT

in one run.

And:

URGENT → ??? 

Nothing. It stays URGENT.

One important design decision

Because the assignment says:

"at most one level per run"

I recommend that one escalation run checks all overdue tickets, but each individual ticket can move up only one priority level during that run.

For example, suppose we have:

Ticket 1 → NORMAL → overdue
Ticket 2 → HIGH → overdue
Ticket 3 → URGENT → overdue

After one run:

Ticket 1 → HIGH
Ticket 2 → URGENT
Ticket 3 → URGENT

Not:

Ticket 1 → URGENT

That gives us a very clear and testable implementation.

What we should build next

We'll do the backend in this order:

Step 1 — Escalation logic ⭐ NEXT

Create:

backend/utils/escalateTickets.js

This will contain the actual business logic.

Step 2 — Automated execution

Make the backend automatically run the escalation check periodically.

For example:

Server starts
     ↓
Check overdue tickets
     ↓
Escalate by ONE level
     ↓
Wait
     ↓
Check again

We can also expose a small endpoint for testing, so we don't have to wait for the timer every time.

Step 3 — Make queue ordering use the updated priority

This is already mostly done because your queueOrder.js reads:

ticket.priority

So when:

NORMAL → HIGH

the queue automatically reflects that new priority.

That's exactly what we want.

Then we'll implement the remaining requirements

After escalation:

Step 4 — Customer search

Add something like:

🔍 Search customer...

Searching:

ABC Corporation

will show that customer's tickets.

Step 5 — Pagination

For example:

Tickets 1–5 of 7

[ Previous ] [ 1 ] [ 2 ] [ Next ]

And importantly, pagination should happen after the queue has been correctly ordered.

So:

All tickets
     ↓
Escalation
     ↓
Queue ordering
     ↓
Filters/search
     ↓
Pagination
     ↓
Display

This is a much better architecture for this assignment than simply sorting whatever happens to be visible on the screen.

Step 6 — Assignment

Since the original statement mentions assignment, we'll add the ability to assign tickets between the two helpdesk members.

Step 7 — Final UI + testing

We'll test specific cases such as:

Overdue NORMAL → HIGH
Overdue HIGH → URGENT
Overdue URGENT → URGENT
Not overdue → unchanged

and verify the queue after every case.

So let's NOT touch the frontend right now

Your current dashboard is working.

The next thing we should work on is:

Automated ticket escalation in the backend.

This is also a good feature to be able to explain in an interview:

"I implemented an automated escalation check that scans overdue tickets and increases their priority by only one level per run. Since the queue ordering uses the ticket's current priority, the escalated ticket automatically moves to the appropriate position in the queue."

That's a strong explanation because it directly addresses the new twist.

Let's start with Step 1

Open:

backend

Then:

backend → utils

You currently have:

utils/
└── queueOrder.js

We are going to create one new file:

escalateTickets.js

Before I give you the code, don't modify anything yet. We'll build this carefully so the automated check and the "one level per run" rule are both correct.

tell elaborately step by step , what to do next

Absolutely. Since the problem statement has changed, let's continue from exactly where your project is now and build the remaining requirements one by one.

We will not restart the project and we will not change the working queue code unnecessarily.

The new requirement that we should implement first is the automated escalation.

Our plan from this point

Your project currently looks roughly like this:

helpdesk-queue/
│
├── frontend/
│   ├── src/
│   │   ├── main.ts        ✅
│   │   └── style.css      ✅
│   └── vite.config.js     ✅
│
└── backend/
    ├── data/
    │   └── tickets.js     ✅
    │
    ├── utils/
    │   └── queueOrder.js  ✅
    │
    └── server.js          ✅

We are going to reach this:

helpdesk-queue/
│
├── frontend/
│   ├── src/
│   │   ├── main.ts
│   │   └── style.css
│   └── vite.config.js
│
└── backend/
    ├── data/
    │   └── tickets.js
    │
    ├── utils/
    │   ├── queueOrder.js
    │   └── escalateTickets.js     ⭐ NEW
    │
    └── server.js

Then we'll build:

⭐ Automated escalation
Customer search
Pagination
Assignment/update functionality
New Ticket
Final testing
README and GitHub submission

The assignment specifically says the ordering rule is central, and the modified twist requires an automated check that escalates tickets that breach their response time by one priority level per run.

PART 1 — Build the escalation logic
Step 1: Open the backend folder

In the left side of Codespaces, find:

backend

Click the small arrow beside it.

You should see:

backend
├── data
├── utils
└── server.js
Step 2: Open the utils folder

Click:

backend
   ↓
utils

You currently have:

utils
└── queueOrder.js
Step 3: Create a new file

Right-click the utils folder.

Choose:

New File

Name it exactly:

escalateTickets.js

So now you should have:

utils
├── queueOrder.js
└── escalateTickets.js
Step 4: Open escalateTickets.js

Paste this code:

const priorityLevels = ["LOW", "NORMAL", "HIGH", "URGENT"];

function escalateTickets(tickets) {
    const now = new Date();

    tickets.forEach(ticket => {

        const dueTime = new Date(ticket.responseDueAt);

        if (dueTime < now) {

            const currentIndex = priorityLevels.indexOf(ticket.priority);

            if (currentIndex < priorityLevels.length - 1) {
                ticket.priority = priorityLevels[currentIndex + 1];
            }
        }
    });

    return tickets;
}

module.exports = escalateTickets;
Step 5: Save the file

Press:

Ctrl + S

That's it for this file.

But let's understand what this code is doing before we connect it.

How the escalation logic works

We have:

const priorityLevels = ["LOW", "NORMAL", "HIGH", "URGENT"];

Think of this as a ladder:

LOW
 ↓
NORMAL
 ↓
HIGH
 ↓
URGENT

If a ticket is overdue:

LOW → NORMAL

If it's run again later and is still overdue:

NORMAL → HIGH

Then:

HIGH → URGENT

And once it reaches:

URGENT

it stays:

URGENT

because there is no level above it.

Very important: "one level per run"

This part of the assignment is important.

Suppose we have:

Ticket:
Priority = NORMAL
Deadline = already passed

When the automated check runs:

NORMAL → HIGH

It does not become URGENT during that same run.

If another run happens later and the ticket is still overdue:

HIGH → URGENT

This satisfies:

at most one level per run.

PART 2 — Connect escalation to the backend

Now we need to tell server.js about this new function.

Step 6: Open
backend/server.js

Your current file looks like:

const express = require("express");
const cors = require("cors");

const tickets = require("./data/tickets");
const sortTickets = require("./utils/queueOrder");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "HelpDesk Queue API is running"
    });
});

app.get("/api/tickets", (req, res) => {

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        count: sortedTickets.length,
        tickets: sortedTickets
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
Step 7: Add the escalation import

At the top, you currently have:

const sortTickets = require("./utils/queueOrder");

Immediately below it add:

const escalateTickets = require("./utils/escalateTickets");

So the top should become:

const express = require("express");
const cors = require("cors");

const tickets = require("./data/tickets");
const sortTickets = require("./utils/queueOrder");
const escalateTickets = require("./utils/escalateTickets");

const app = express();

Save:

Ctrl + S
PART 3 — Create a manual test endpoint

Before we make the escalation automated, I want us to have a way to test it easily.

This is important because otherwise we'd have to wait for the automatic timer every time.

Step 8: Find this section

In server.js, find:

app.get("/api/tickets", (req, res) => {

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        count: sortedTickets.length,
        tickets: sortedTickets
    });
});

Immediately after that block, add:

app.post("/api/escalate", (req, res) => {

    escalateTickets(tickets);

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        message: "Escalation check completed",
        tickets: sortedTickets
    });
});

So that part of your server.js becomes:

app.get("/api/tickets", (req, res) => {

    const sortedTickets = sortTickets(tickets);

    res.json({
        success: true,
        count: sortedTickets.length,
        tickets: sortedTickets
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

Save the file.

PART 4 — Restart the backend

Your backend terminal currently has:

Server running on port 5000

Press:

Ctrl + C

You should return to:

/workspaces/helpdesk-queue/backend $

Now run:

node server.js

You should again see:

Server running on port 5000
PART 5 — Test the escalation

Now open a new terminal.

Do not stop the backend.

From any directory, run:

curl -X POST http://localhost:5000/api/escalate

You should receive something like:

{
    "success": true,
    "message": "Escalation check completed",
    "tickets": [...]
}
But there is something important about our current sample data

Our sample data currently has:

Ticket 1 → URGENT
Ticket 2 → URGENT
Ticket 6 → HIGH
...

Some of these may already be overdue based on the current time.

Therefore, after running the escalation endpoint, you may see something like:

HIGH → URGENT

for an overdue HIGH ticket.

That's correct.

PART 6 — Test the "one level only" rule properly

We should actually test the most important part of the new twist.

Let's temporarily reason through a ticket.

Suppose:

priority = NORMAL
responseDueAt = yesterday

First escalation run:

NORMAL → HIGH

Second escalation run:

HIGH → URGENT

Third escalation run:

URGENT → URGENT

This is exactly the behavior we want.

PART 7 — Make the escalation AUTOMATIC

The manual endpoint is useful for testing, but the assignment says:

automated check

So we now need the server to periodically run the check automatically.

Step 9: Add this below your routes

In server.js, before:

const PORT = 5000;

add:

setInterval(() => {

    escalateTickets(tickets);

    console.log("Automatic escalation check completed");

}, 60 * 1000);

Your bottom section should look like:

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

Save it.

What does 60 * 1000 mean?

It means:

60 seconds × 1000 milliseconds
= 60,000 milliseconds
= 1 minute

So the backend performs the escalation check every minute.

For our assignment/demo, that's perfectly reasonable.

The important thing is that each run only moves a ticket one level.

PART 8 — One improvement we should make

There's one subtle issue.

Currently:

escalateTickets(tickets);

changes the ticket's priority in memory.

That means:

NORMAL
 ↓
HIGH

will stay HIGH while the server is running.

But if you stop the server and restart it, the sample data is loaded again from:

data/tickets.js

and the priority goes back to its original value.

For a proper real-world application, we'd save the updated ticket to a database.

For this assignment/demo, we can use the current in-memory data first and then decide whether MongoDB persistence is necessary. The problem statement's key focus is queue behavior and escalation, so I wouldn't introduce a database until the core functionality is working.

PART 9 — Verify that the queue still works

This is important.

After escalation, the process should effectively be:

                  ┌──────────────┐
                  │   Tickets    │
                  └──────┬───────┘
                         ↓
                Check response time
                         ↓
                  Is ticket overdue?
                    ↙           ↘
                  YES            NO
                   ↓              ↓
             Increase         unchanged
             priority           priority
             ONE level
                   ↓
                   └──────┬───────┘
                          ↓
                    Queue ordering
                          ↓
                    Display tickets

So escalation and queue ordering work together.

For example:

NORMAL ticket
      ↓
response time breached
      ↓
HIGH
      ↓
queueOrder.js sees HIGH
      ↓
ticket moves appropriately in queue

That's exactly the architecture we want.

PART 10 — After escalation, our next feature is SEARCH

Once you've tested the above, we'll move to the next requirement:

Priya needs to look up a specific customer's ticket by name.

We'll add a search box near the filters:

🔍 Search customer...

For example:

Search: ABC Corporation

would return:

#1 Laptop won't boot before client demo
#7 Password reset request

And it should work together with:

All
Overdue
My Tickets

So we won't create a separate page just for search.

PART 11 — Then PAGINATION

After search, we'll implement pagination.

For example, if there are 100 tickets:

Showing 1–10 of 100

[Previous] [1] [2] [3] ... [10] [Next]

The important order will be:

Tickets
   ↓
Escalation
   ↓
Queue ordering
   ↓
Search / filters
   ↓
Pagination
   ↓
Display

That prevents pagination from breaking the "most pressing ticket first" rule.

Your immediate task — only these steps

Don't move to search yet.

Do these in order:

1.

Create:

backend/utils/escalateTickets.js
2.

Paste the escalation code I gave you.

3.

Add:

const escalateTickets = require("./utils/escalateTickets");

to server.js.

4.

Add the:

POST /api/escalate

endpoint.

5.

Add the automatic:

setInterval(...)

check.

6.

Restart:

node server.js
7.

Test manually:

curl -X POST http://localhost:5000/api/escalate
8.

Then check:

curl http://localhost:5000/api/tickets

and see whether the priority of an overdue ticket has moved up by exactly one level.

Stop there. Once you send me the output of the POST /api/escalate command, I'll check whether the escalation is behaving correctly before we move on to customer search.
