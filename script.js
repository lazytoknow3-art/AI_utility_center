const API_BASE = "http://localhost:3000"; // Change to your deployed backend URL

const TOOLS = [
  {
    title: "Resume Reviewer",
    icon: "📄",
    desc: "Get AI feedback on your resume",
    fields: [
      { name: "resume", label: "Paste your Resume", type: "textarea" }
    ],
    systemPrompt: "You are an expert resume reviewer. Analyze the resume and provide detailed, actionable feedback on formatting, content, impact, and improvements. Be specific and constructive."
  },
  {
    title: "Email Generator",
    icon: "✉️",
    desc: "Draft professional emails instantly",
    fields: [
      { name: "recipient", label: "Recipient", type: "text", placeholder: "e.g. Manager, Client" },
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Leave Request" },
      { name: "purpose", label: "Purpose", type: "text", placeholder: "e.g. Requesting 3 days leave" },
      { name: "tone", label: "Tone", type: "select", options: ["Formal", "Friendly", "Persuasive", "Apologetic"] }
    ],
    systemPrompt: "You are a professional email writer. Write a clear, well-structured email based on the details provided. Output only the email with subject line, greeting, body, and sign-off."
  },
  {
    title: "Travel Planner",
    icon: "✈️",
    desc: "Plan your perfect trip with AI",
    fields: [
      { name: "destination", label: "Destination", type: "text", placeholder: "e.g. Paris, France" },
      { name: "budget", label: "Budget", type: "text", placeholder: "e.g. $2000" },
      { name: "days", label: "Number of Days", type: "text", placeholder: "e.g. 5" }
    ],
    systemPrompt: "You are a travel planning expert. Create a detailed day-by-day travel itinerary including sightseeing, food recommendations, transport tips, and budget breakdown."
  },
  {
    title: "Recipe Generator",
    icon: "🍳",
    desc: "Get recipes from ingredients you have",
    fields: [
      { name: "ingredients", label: "Available Ingredients", type: "textarea", placeholder: "e.g. chicken, rice, garlic, onions" },
      { name: "cuisine", label: "Cuisine Preference", type: "select", options: ["Any", "Indian", "Italian", "Chinese", "Mexican", "American", "Thai"] },
      { name: "dietary", label: "Dietary Restriction", type: "select", options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Keto"] }
    ],
    systemPrompt: "You are a professional chef. Suggest a detailed recipe using the given ingredients. Include recipe name, prep time, cook time, step-by-step instructions, and serving suggestions."
  },
  {
    title: "Interview Coach",
    icon: "🎯",
    desc: "Practice interview questions with AI",
    fields: [
      { name: "role", label: "Job Role", type: "text", placeholder: "e.g. Frontend Developer" },
      { name: "company", label: "Company (optional)", type: "text", placeholder: "e.g. Google" },
      { name: "level", label: "Experience Level", type: "select", options: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead"] }
    ],
    systemPrompt: "You are an expert interview coach. Provide 10 likely interview questions for the given role and experience level with detailed sample answers and tips for each."
  },
  {
    title: "Story Generator",
    icon: "📖",
    desc: "Generate creative stories on any topic",
    fields: [
      { name: "genre", label: "Genre", type: "select", options: ["Fantasy", "Sci-Fi", "Romance", "Horror", "Mystery", "Adventure", "Comedy"] },
      { name: "theme", label: "Theme or Prompt", type: "text", placeholder: "e.g. A lost astronaut finds an ancient city" },
      { name: "length", label: "Length", type: "select", options: ["Short (500 words)", "Medium (1000 words)", "Long (2000 words)"] }
    ],
    systemPrompt: "You are a creative fiction writer. Write an engaging, well-structured story based on the given genre and theme. Include vivid descriptions, dialogue, and a satisfying ending."
  },
  {
    title: "Grammar Checker",
    icon: "✏️",
    desc: "Fix grammar and improve writing",
    fields: [
      { name: "text", label: "Paste your Text", type: "textarea", placeholder: "Paste the text you want checked..." }
    ],
    systemPrompt: "You are an expert English editor. Correct all grammar, spelling, and punctuation errors. Then provide the corrected version followed by a list of changes made with explanations."
  },
  {
    title: "SQL Query Generator",
    icon: "🗃️",
    desc: "Generate SQL from plain English",
    fields: [
      { name: "description", label: "Describe what you need", type: "textarea", placeholder: "e.g. Get all users who signed up in the last 30 days" },
      { name: "tables", label: "Table/Column names (optional)", type: "text", placeholder: "e.g. users(id, name, email, created_at)" },
      { name: "dialect", label: "SQL Dialect", type: "select", options: ["MySQL", "PostgreSQL", "SQLite", "SQL Server", "Oracle"] }
    ],
    systemPrompt: "You are a database expert. Generate the correct SQL query for the given requirement. Provide the query, explain what it does, and suggest any indexes for optimization."
  },
  {
    title: "Quiz Generator",
    icon: "❓",
    desc: "Create quizzes on any topic",
    fields: [
      { name: "topic", label: "Topic", type: "text", placeholder: "e.g. World War II, JavaScript, Biology" },
      { name: "count", label: "Number of Questions", type: "select", options: ["5", "10", "15", "20"] },
      { name: "difficulty", label: "Difficulty", type: "select", options: ["Easy", "Medium", "Hard", "Mixed"] }
    ],
    systemPrompt: "You are a quiz master. Generate multiple-choice questions on the given topic. Each question should have 4 options with the correct answer clearly marked. Add a brief explanation for each answer."
  },
  {
    title: "Meeting Minutes Generator",
    icon: "📋",
    desc: "Convert meeting notes to minutes",
    fields: [
      { name: "notes", label: "Paste Meeting Notes / Transcript", type: "textarea", placeholder: "Paste raw meeting notes here..." },
      { name: "format", label: "Format", type: "select", options: ["Standard", "Action-Item Focused", "Brief Summary"] }
    ],
    systemPrompt: "You are a professional secretary. Convert the raw meeting notes into well-structured meeting minutes including: date, attendees (if mentioned), agenda items, discussion points, decisions made, and action items with owners."
  },
  {
    title: "Text Summarizer",
    icon: "📝",
    desc: "Summarize long text instantly",
    fields: [
      { name: "text", label: "Paste Text to Summarize", type: "textarea", placeholder: "Paste your long article, document, or text here..." },
      { name: "style", label: "Summary Style", type: "select", options: ["Brief (2-3 sentences)", "Detailed Paragraph", "Bullet Points", "Key Takeaways"] }
    ],
    systemPrompt: "You are an expert summarizer. Summarize the given text in the requested style. Capture all key points accurately without losing important information."
  },
  {
    title: "YouTube Script Writer",
    icon: "🎬",
    desc: "Write engaging YouTube scripts",
    fields: [
      { name: "topic", label: "Video Topic", type: "text", placeholder: "e.g. Top 10 AI Tools in 2025" },
      { name: "duration", label: "Video Duration", type: "select", options: ["Short (3-5 min)", "Medium (8-12 min)", "Long (15-20 min)"] },
      { name: "style", label: "Style", type: "select", options: ["Educational", "Entertainment", "Review", "Tutorial", "Vlog"] }
    ],
    systemPrompt: "You are a YouTube content strategist. Write a complete video script with hook, intro, main content sections, transitions, and outro. Include suggestions for b-roll and on-screen text."
  },
  {
    title: "Social Media Caption Generator",
    icon: "📱",
    desc: "Create captions for social media",
    fields: [
      { name: "platform", label: "Platform", type: "select", options: ["Instagram", "Twitter/X", "LinkedIn", "Facebook", "TikTok"] },
      { name: "topic", label: "Post Topic", type: "text", placeholder: "e.g. Launching our new product" },
      { name: "mood", label: "Mood", type: "select", options: ["Professional", "Casual", "Funny", "Inspirational", "Promotional"] }
    ],
    systemPrompt: "You are a social media expert. Generate 5 creative caption options for the given platform and topic. Include relevant hashtags and emojis. Keep each caption optimized for the platform's best practices."
  },
  {
    title: "Study Assistant",
    icon: "🎓",
    desc: "Get explanations on any subject",
    fields: [
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Physics, History, Computer Science" },
      { name: "topic", label: "Topic / Question", type: "textarea", placeholder: "e.g. Explain quantum entanglement" },
      { name: "level", label: "Level", type: "select", options: ["High School", "Undergraduate", "Graduate", "Simple Explanation"] }
    ],
    systemPrompt: "You are a knowledgeable tutor. Explain the given topic clearly at the specified level. Use examples, analogies, and break down complex concepts. Include key formulas or facts if relevant."
  },
  {
    title: "Code Explainer",
    icon: "💻",
    desc: "Understand any code snippet",
    fields: [
      { name: "code", label: "Paste Code", type: "textarea", placeholder: "Paste the code you want explained..." },
      { name: "language", label: "Programming Language", type: "select", options: ["JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust", "TypeScript", "Other"] }
    ],
    systemPrompt: "You are a senior software engineer. Explain the given code line by line in simple terms. Cover what it does, how it works, any important patterns used, and potential improvements."
  },
  {
    title: "Business Name Generator",
    icon: "🏢",
    desc: "Generate creative business names",
    fields: [
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Tech, Food, Fashion" },
      { name: "keywords", label: "Keywords / Theme", type: "text", placeholder: "e.g. modern, eco-friendly, luxury" },
      { name: "style", label: "Name Style", type: "select", options: ["Modern", "Classic", "Playful", "Professional", "Abstract"] }
    ],
    systemPrompt: "You are a branding expert. Generate 15 creative, memorable business name ideas for the given industry and style. For each name, provide a brief explanation of why it works and check if the .com domain is likely available."
  },
  {
    title: "Movie Recommendation",
    icon: "🎥",
    desc: "Get personalized movie suggestions",
    fields: [
      { name: "favorites", label: "Favourite Movies or Genres", type: "text", placeholder: "e.g. Inception, Interstellar, Sci-Fi" },
      { name: "mood", label: "Current Mood", type: "select", options: ["Happy", "Thoughtful", "Adventurous", "Romantic", "Scared", "Any"] },
      { name: "count", label: "Number of Recommendations", type: "select", options: ["5", "10", "15"] }
    ],
    systemPrompt: "You are a film critic and recommendation engine. Suggest movies based on the user's taste and mood. For each movie, provide: title, year, genre, a brief synopsis (no spoilers), and why they'd enjoy it."
  },
  {
    title: "Fitness Planner",
    icon: "💪",
    desc: "Get a personalized workout plan",
    fields: [
      { name: "goal", label: "Fitness Goal", type: "select", options: ["Weight Loss", "Muscle Gain", "General Fitness", "Flexibility", "Endurance"] },
      { name: "level", label: "Current Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
      { name: "equipment", label: "Available Equipment", type: "text", placeholder: "e.g. Dumbbells, Resistance Bands, or None" },
      { name: "days", label: "Days per Week", type: "select", options: ["3", "4", "5", "6"] }
    ],
    systemPrompt: "You are a certified personal trainer. Create a detailed weekly workout plan based on the user's goal, level, and equipment. Include exercises, sets, reps, rest periods, and warm-up/cool-down routines."
  },
  {
    title: "Learning Roadmap Generator",
    icon: "🗺️",
    desc: "Get a structured learning path",
    fields: [
      { name: "skill", label: "Skill to Learn", type: "text", placeholder: "e.g. Machine Learning, Web Development" },
      { name: "timeframe", label: "Timeframe", type: "select", options: ["1 Month", "3 Months", "6 Months", "1 Year"] },
      { name: "current", label: "Current Knowledge", type: "select", options: ["Complete Beginner", "Some Basics", "Intermediate", "Advanced (upskilling)"] }
    ],
    systemPrompt: "You are a learning consultant. Create a detailed, week-by-week learning roadmap for the given skill. Include specific topics, recommended resources (free and paid), projects to build, and milestones to track progress."
  },
  {
    title: "Customer Support Chatbot",
    icon: "🤖",
    desc: "Generate customer support responses",
    fields: [
      { name: "business", label: "Business Type", type: "text", placeholder: "e.g. SaaS, E-commerce, Restaurant" },
      { name: "query", label: "Customer Query / Complaint", type: "textarea", placeholder: "e.g. My order hasn't arrived in 5 days" },
      { name: "tone", label: "Response Tone", type: "select", options: ["Professional", "Empathetic", "Friendly", "Formal"] }
    ],
    systemPrompt: "You are a customer support specialist. Draft a helpful, empathetic response to the customer query. Address their concern directly, offer solutions, and maintain the specified tone. Include follow-up steps if needed."
  }
];

let currentTool = null;

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = TOOLS.map((tool, i) =>
    `<div class="tool-card" onclick="openTool(${i})">
      <div class="card-icon">${tool.icon}</div>
      <div class="card-info">
        <h3>${tool.title}</h3>
        <p>${tool.desc}</p>
      </div>
    </div>`
  ).join("");
}

function openTool(index) {
  currentTool = TOOLS[index];
  document.getElementById("homeView").style.display = "none";
  document.getElementById("toolView").classList.add("active");
  document.getElementById("toolIcon").textContent = currentTool.icon;
  document.getElementById("toolTitle").textContent = currentTool.title;
  document.getElementById("resultCard").classList.remove("active");
  document.getElementById("errorMsg").classList.remove("active");
  document.getElementById("loading").style.display = "none";

  const form = document.getElementById("toolForm");
  form.innerHTML = currentTool.fields.map(field => {
    let input;
    if (field.type === "textarea") {
      input = `<textarea name="${field.name}" placeholder="${field.placeholder || ''}" required></textarea>`;
    } else if (field.type === "select") {
      input = `<select name="${field.name}">${field.options.map(o => `<option value="${o}">${o}</option>`).join("")}</select>`;
    } else {
      input = `<input type="text" name="${field.name}" placeholder="${field.placeholder || ''}" required>`;
    }
    return `<div class="form-group"><label>${field.label}</label>${input}</div>`;
  }).join("");
}

function showHome() {
  document.getElementById("homeView").style.display = "block";
  document.getElementById("toolView").classList.remove("active");
  currentTool = null;
}

async function generate() {
  if (!currentTool) return;

  const form = document.getElementById("toolForm");
  const formData = new FormData(form);
  const btn = document.getElementById("generateBtn");
  const loading = document.getElementById("loading");
  const resultCard = document.getElementById("resultCard");
  const errorMsg = document.getElementById("errorMsg");

  // Validate required fields
  const inputs = form.querySelectorAll("input, textarea");
  for (const inp of inputs) {
    if (inp.required && !inp.value.trim()) {
      inp.focus();
      return;
    }
  }

  // Build user message from form
  let userMessage = "";
  for (const field of currentTool.fields) {
    const value = formData.get(field.name);
    userMessage += `${field.label}: ${value}\n`;
  }

  btn.disabled = true;
  loading.style.display = "flex";
  resultCard.classList.remove("active");
  errorMsg.classList.remove("active");

  try {
    const response = await fetch(API_BASE + "/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: currentTool.systemPrompt },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    document.getElementById("resultContent").textContent = result;
    resultCard.classList.add("active");
  } catch (err) {
    errorMsg.textContent = "⚠️ " + err.message;
    errorMsg.classList.add("active");
  } finally {
    btn.disabled = false;
    loading.style.display = "none";
  }
}

function copyResult() {
  const text = document.getElementById("resultContent").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => btn.textContent = "📋 Copy", 2000);
  });
}

renderCards();
