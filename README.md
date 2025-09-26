# Let's Prep — Onboarding Prototype (Depot demo)

A minimal Node.js + Express app that lets you click through a 3‑step onboarding flow and see a summary. There is **no database**. Data is stored in a session and discarded.

Use this app to test **Depot.dev** for fast Docker image builds and deployments.

## Local development (no Docker)

```bash
# Node 20+ required
npm install
npm start
# open http://localhost:3000
```

## Container build (local Docker)

```bash
docker build -t lets-prep-prototype:local .
docker run -p 3000:3000 lets-prep-prototype:local
# open http://localhost:3000
```

## Environment

- Node 20+
- Express + EJS
- Session storage (in-memory) for demo only
- Port: `3000` (configurable via `PORT` env var)
```
