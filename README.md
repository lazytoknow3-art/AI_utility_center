# AI Utility Hub

A single-page AI dashboard with 20 tools powered by Groq API.

## Run Locally

```bash
npm install
```

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
node server.js
```

Open `index.html` in your browser. Done.

## Deploy

### Backend (Render / Railway)

1. Push this repo
2. Set start command: `node server.js`
3. Add environment variable: `GROQ_API_KEY=your_key`
4. Copy the deployed URL

### Frontend (GitHub Pages / Netlify / Vercel)

1. Open `script.js`
2. Change `API_BASE` to your deployed backend URL
3. Deploy the frontend files

Done.
