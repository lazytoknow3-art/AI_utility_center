const API_BASE = "https://ai-utility-center.onrender.com"; // Change to your deployed backend URL

/* ══════════════════════════════════════════
   TOOL DEFINITIONS  (with per-tool themeColor)
══════════════════════════════════════════ */
const TOOLS = [
  {
    title: "Resume Reviewer",
    icon: "📄",
    desc: "Get AI feedback on your resume",
    themeColor: { accent: "#0984e3", light: "#74b9ff", bg: "#e8f4fd", rgb: "9,132,227" },
    fields: [
      { name: "resume",     label: "Paste your Resume",        type: "textarea", placeholder: "Paste your resume text here..." },
      { name: "resumeFile", label: "Or Upload Resume File",    type: "file",     accept: ".pdf,.txt,.doc,.docx" }
    ],
    systemPrompt: "You are an expert resume reviewer. Analyze the resume and provide detailed, actionable feedback on formatting, content, impact, and improvements. Be specific and constructive. Structure your response with clear sections: Overall Impression, Strengths, Areas to Improve, Formatting Tips, and Quick Wins."
  },
  {
    title: "Email Generator",
    icon: "✉️",
    desc: "Draft professional emails instantly",
    themeColor: { accent: "#6C5CE7", light: "#a29bfe", bg: "#f0eeff", rgb: "108,92,231" },
    fields: [
      { name: "recipient", label: "Recipient",   type: "text",   placeholder: "e.g. Manager, Client" },
      { name: "subject",   label: "Subject",     type: "text",   placeholder: "e.g. Leave Request" },
      { name: "purpose",   label: "Purpose",     type: "text",   placeholder: "e.g. Requesting 3 days leave" },
      { name: "tone",      label: "Tone",        type: "select", options: ["Formal","Friendly","Persuasive","Apologetic"] }
    ],
    systemPrompt: "You are a professional email writer. Write a clear, well-structured email based on the details provided. Output only the email with subject line, greeting, body, and sign-off."
  },
  {
    title: "Travel Planner",
    icon: "✈️",
    desc: "Plan your perfect trip with AI",
    themeColor: { accent: "#00b894", light: "#55efc4", bg: "#e6faf5", rgb: "0,184,148" },
    fields: [
      { name: "destination", label: "Destination",      type: "text", placeholder: "e.g. Paris, France" },
      { name: "budget",      label: "Budget",           type: "text", placeholder: "e.g. $2000" },
      { name: "days",        label: "Number of Days",   type: "text", placeholder: "e.g. 5" }
    ],
    systemPrompt: "You are a travel planning expert. Create a detailed day-by-day travel itinerary including sightseeing, food recommendations, transport tips, and budget breakdown. Use clear Day headings."
  },
  {
    title: "Recipe Generator",
    icon: "🍳",
    desc: "Get recipes from ingredients you have",
    themeColor: { accent: "#e17055", light: "#fab1a0", bg: "#fef0ec", rgb: "225,112,85" },
    fields: [
      { name: "ingredients", label: "Available Ingredients",  type: "textarea", placeholder: "e.g. chicken, rice, garlic, onions" },
      { name: "cuisine",     label: "Cuisine Preference",     type: "select",   options: ["Any","Indian","Italian","Chinese","Mexican","American","Thai"] },
      { name: "dietary",     label: "Dietary Restriction",    type: "select",   options: ["None","Vegetarian","Vegan","Gluten-Free","Keto"] }
    ],
    systemPrompt: "You are a professional chef. Suggest a detailed recipe using the given ingredients. Include recipe name, prep time, cook time, step-by-step instructions, and serving suggestions."
  },
  {
    title: "Interview Coach",
    icon: "🎯",
    desc: "Practice interview questions with AI",
    themeColor: { accent: "#d63031", light: "#ff7675", bg: "#fff0f0", rgb: "214,48,49" },
    fields: [
      { name: "role",    label: "Job Role",          type: "text",   placeholder: "e.g. Frontend Developer" },
      { name: "company", label: "Company (optional)", type: "text",   placeholder: "e.g. Google" },
      { name: "level",   label: "Experience Level",  type: "select", options: ["Fresher","Junior","Mid-Level","Senior","Lead"] }
    ],
    systemPrompt: "You are an expert interview coach. Provide 10 likely interview questions for the given role and experience level with detailed sample answers and tips for each."
  },
  {
    title: "Story Generator",
    icon: "📖",
    desc: "Generate creative stories on any topic",
    themeColor: { accent: "#a29bfe", light: "#d4c9fe", bg: "#f4f0ff", rgb: "162,155,254" },
    fields: [
      { name: "genre",  label: "Genre",           type: "select", options: ["Fantasy","Sci-Fi","Romance","Horror","Mystery","Adventure","Comedy"] },
      { name: "theme",  label: "Theme or Prompt", type: "text",   placeholder: "e.g. A lost astronaut finds an ancient city" },
      { name: "length", label: "Length",          type: "select", options: ["Short (500 words)","Medium (1000 words)","Long (2000 words)"] }
    ],
    systemPrompt: "You are a creative fiction writer. Write an engaging, well-structured story based on the given genre and theme. Include vivid descriptions, dialogue, and a satisfying ending."
  },
  {
    title: "Grammar Checker",
    icon: "✏️",
    desc: "Fix grammar and improve writing",
    themeColor: { accent: "#2d3436", light: "#636e72", bg: "#f0f0f2", rgb: "45,52,54" },
    fields: [
      { name: "text", label: "Paste your Text", type: "textarea", placeholder: "Paste the text you want checked..." }
    ],
    systemPrompt: "You are an expert English editor. Correct all grammar, spelling, and punctuation errors. Then provide the corrected version followed by a list of changes made with explanations."
  },
  {
    title: "SQL Query Generator",
    icon: "🗃️",
    desc: "Generate SQL from plain English",
    themeColor: { accent: "#0984e3", light: "#74b9ff", bg: "#e8f4fd", rgb: "9,132,227" },
    fields: [
      { name: "description", label: "Describe what you need",          type: "textarea", placeholder: "e.g. Get all users who signed up in the last 30 days" },
      { name: "tables",      label: "Table/Column names (optional)",    type: "text",     placeholder: "e.g. users(id, name, email, created_at)" },
      { name: "dialect",     label: "SQL Dialect",                     type: "select",   options: ["MySQL","PostgreSQL","SQLite","SQL Server","Oracle"] }
    ],
    systemPrompt: "You are a database expert. Generate the correct SQL query for the given requirement. Provide the query, explain what it does, and suggest any indexes for optimization."
  },
  {
    title: "Quiz Generator",
    icon: "❓",
    desc: "Create quizzes on any topic",
    themeColor: { accent: "#fdcb6e", light: "#ffeaa7", bg: "#fffbee", rgb: "253,203,110" },
    fields: [
      { name: "topic",      label: "Topic",                type: "text",   placeholder: "e.g. World War II, JavaScript, Biology" },
      { name: "count",      label: "Number of Questions",  type: "select", options: ["5","10","15","20"] },
      { name: "difficulty", label: "Difficulty",           type: "select", options: ["Easy","Medium","Hard","Mixed"] }
    ],
    systemPrompt: "You are a quiz master. Generate multiple-choice questions on the given topic. Each question should have 4 options with the correct answer clearly marked. Add a brief explanation for each answer."
  },
  {
    title: "Meeting Minutes Generator",
    icon: "📋",
    desc: "Convert meeting notes to minutes",
    themeColor: { accent: "#636e72", light: "#b2bec3", bg: "#f4f5f7", rgb: "99,110,114" },
    fields: [
      { name: "notes",  label: "Paste Meeting Notes / Transcript", type: "textarea", placeholder: "Paste raw meeting notes here..." },
      { name: "format", label: "Format",                           type: "select",   options: ["Standard","Action-Item Focused","Brief Summary"] }
    ],
    systemPrompt: "You are a professional secretary. Convert the raw meeting notes into well-structured meeting minutes including: date, attendees (if mentioned), agenda items, discussion points, decisions made, and action items with owners."
  },
  {
    title: "Text Summarizer",
    icon: "📝",
    desc: "Summarize long text instantly",
    themeColor: { accent: "#00cec9", light: "#81ecec", bg: "#e6fafa", rgb: "0,206,201" },
    fields: [
      { name: "text",  label: "Paste Text to Summarize", type: "textarea", placeholder: "Paste your long article, document, or text here..." },
      { name: "style", label: "Summary Style",           type: "select",   options: ["Brief (2-3 sentences)","Detailed Paragraph","Bullet Points","Key Takeaways"] }
    ],
    systemPrompt: "You are an expert summarizer. Summarize the given text in the requested style. Capture all key points accurately without losing important information."
  },
  {
    title: "YouTube Script Writer",
    icon: "🎬",
    desc: "Write engaging YouTube scripts",
    themeColor: { accent: "#d63031", light: "#ff7675", bg: "#fff0f0", rgb: "214,48,49" },
    fields: [
      { name: "topic",    label: "Video Topic",     type: "text",   placeholder: "e.g. Top 10 AI Tools in 2025" },
      { name: "duration", label: "Video Duration",  type: "select", options: ["Short (3-5 min)","Medium (8-12 min)","Long (15-20 min)"] },
      { name: "style",    label: "Style",           type: "select", options: ["Educational","Entertainment","Review","Tutorial","Vlog"] }
    ],
    systemPrompt: "You are a YouTube content strategist. Write a complete video script with hook, intro, main content sections, transitions, and outro. Include suggestions for b-roll and on-screen text."
  },
  {
    title: "Social Media Caption Generator",
    icon: "📱",
    desc: "Create captions for social media",
    themeColor: { accent: "#e84393", light: "#fd79a8", bg: "#fff0f7", rgb: "232,67,147" },
    fields: [
      { name: "platform", label: "Platform",    type: "select", options: ["Instagram","Twitter/X","LinkedIn","Facebook","TikTok"] },
      { name: "topic",    label: "Post Topic",  type: "text",   placeholder: "e.g. Launching our new product" },
      { name: "mood",     label: "Mood",        type: "select", options: ["Professional","Casual","Funny","Inspirational","Promotional"] }
    ],
    systemPrompt: "You are a social media expert. Generate 5 creative caption options for the given platform and topic. Include relevant hashtags and emojis. Keep each caption optimized for the platform's best practices."
  },
  {
    title: "Study Assistant",
    icon: "🎓",
    desc: "Get explanations on any subject",
    themeColor: { accent: "#6C5CE7", light: "#a29bfe", bg: "#f0eeff", rgb: "108,92,231" },
    fields: [
      { name: "subject", label: "Subject",         type: "text",     placeholder: "e.g. Physics, History, Computer Science" },
      { name: "topic",   label: "Topic / Question", type: "textarea", placeholder: "e.g. Explain quantum entanglement" },
      { name: "level",   label: "Level",            type: "select",   options: ["High School","Undergraduate","Graduate","Simple Explanation"] }
    ],
    systemPrompt: "You are a knowledgeable tutor. Explain the given topic clearly at the specified level. Use examples, analogies, and break down complex concepts. Include key formulas or facts if relevant."
  },
  {
    title: "Code Explainer",
    icon: "💻",
    desc: "Understand any code snippet",
    themeColor: { accent: "#2d3436", light: "#636e72", bg: "#f0f0f2", rgb: "45,52,54" },
    fields: [
      { name: "code",     label: "Paste Code",            type: "textarea", placeholder: "Paste the code you want explained..." },
      { name: "language", label: "Programming Language",  type: "select",   options: ["JavaScript","Python","Java","C++","C#","Go","Rust","TypeScript","Other"] }
    ],
    systemPrompt: "You are a senior software engineer. Explain the given code line by line in simple terms. Cover what it does, how it works, any important patterns used, and potential improvements."
  },
  {
    title: "Business Name Generator",
    icon: "🏢",
    desc: "Generate creative business names",
    themeColor: { accent: "#0984e3", light: "#74b9ff", bg: "#e8f4fd", rgb: "9,132,227" },
    fields: [
      { name: "industry", label: "Industry",         type: "text",   placeholder: "e.g. Tech, Food, Fashion" },
      { name: "keywords", label: "Keywords / Theme", type: "text",   placeholder: "e.g. modern, eco-friendly, luxury" },
      { name: "style",    label: "Name Style",       type: "select", options: ["Modern","Classic","Playful","Professional","Abstract"] }
    ],
    systemPrompt: "You are a branding expert. Generate 15 creative, memorable business name ideas for the given industry and style. For each name, provide a brief explanation of why it works and check if the .com domain is likely available."
  },
  {
    title: "Movie Recommendation",
    icon: "🎥",
    desc: "Get personalized movie suggestions",
    themeColor: { accent: "#6c5ce7", light: "#a29bfe", bg: "#f0eeff", rgb: "108,92,231" },
    fields: [
      { name: "favorites", label: "Favourite Movies or Genres",   type: "text",   placeholder: "e.g. Inception, Interstellar, Sci-Fi" },
      { name: "mood",      label: "Current Mood",                 type: "select", options: ["Happy","Thoughtful","Adventurous","Romantic","Scared","Any"] },
      { name: "count",     label: "Number of Recommendations",    type: "select", options: ["5","10","15"] }
    ],
    systemPrompt: "You are a film critic and recommendation engine. Suggest movies based on the user's taste and mood. For each movie, provide: title, year, genre, a brief synopsis (no spoilers), and why they'd enjoy it."
  },
  {
    title: "Fitness Planner",
    icon: "💪",
    desc: "Get a personalized workout plan",
    themeColor: { accent: "#00b894", light: "#55efc4", bg: "#e6faf5", rgb: "0,184,148" },
    fields: [
      { name: "goal",      label: "Fitness Goal",        type: "select", options: ["Weight Loss","Muscle Gain","General Fitness","Flexibility","Endurance"] },
      { name: "level",     label: "Current Level",       type: "select", options: ["Beginner","Intermediate","Advanced"] },
      { name: "equipment", label: "Available Equipment", type: "text",   placeholder: "e.g. Dumbbells, Resistance Bands, or None" },
      { name: "days",      label: "Days per Week",       type: "select", options: ["3","4","5","6"] }
    ],
    systemPrompt: "You are a certified personal trainer. Create a detailed weekly workout plan based on the user's goal, level, and equipment. Include exercises, sets, reps, rest periods, and warm-up/cool-down routines."
  },
  {
    title: "Learning Roadmap Generator",
    icon: "🗺️",
    desc: "Get a structured learning path",
    themeColor: { accent: "#fdcb6e", light: "#ffeaa7", bg: "#fffbee", rgb: "253,203,110" },
    fields: [
      { name: "skill",      label: "Skill to Learn",       type: "text",   placeholder: "e.g. Machine Learning, Web Development" },
      { name: "timeframe",  label: "Timeframe",            type: "select", options: ["1 Month","3 Months","6 Months","1 Year"] },
      { name: "current",    label: "Current Knowledge",    type: "select", options: ["Complete Beginner","Some Basics","Intermediate","Advanced (upskilling)"] }
    ],
    systemPrompt: "You are a learning consultant. Create a detailed, week-by-week learning roadmap for the given skill. Include specific topics, recommended resources (free and paid), projects to build, and milestones to track progress."
  },
  {
    title: "Customer Support Chatbot",
    icon: "🤖",
    desc: "Generate customer support responses",
    themeColor: { accent: "#00cec9", light: "#81ecec", bg: "#e6fafa", rgb: "0,206,201" },
    fields: [
      { name: "business", label: "Business Type",              type: "text",     placeholder: "e.g. SaaS, E-commerce, Restaurant" },
      { name: "query",    label: "Customer Query / Complaint", type: "textarea", placeholder: "e.g. My order hasn't arrived in 5 days" },
      { name: "tone",     label: "Response Tone",             type: "select",   options: ["Professional","Empathetic","Friendly","Formal"] }
    ],
    systemPrompt: "You are a customer support specialist. Draft a helpful, empathetic response to the customer query. Address their concern directly, offer solutions, and maintain the specified tone. Include follow-up steps if needed."
  }
];

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentTool        = null;
let feedbackSubmitted  = false;
let feedbackDismissed  = false;
let currentStarRating  = 0;
let uploadedFileText   = "";

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
const DEFAULT_THEME = { accent: "#6C5CE7", light: "#a29bfe", bg: "#f0eeff", rgb: "108,92,231" };

function applyTheme(theme) {
  const t = theme || DEFAULT_THEME;
  const root = document.documentElement;

  // Update CSS custom properties
  root.style.setProperty("--accent",       t.accent);
  root.style.setProperty("--accent-light", t.light);
  root.style.setProperty("--accent-bg",    t.bg);
  root.style.setProperty("--accent-rgb",   t.rgb);

  // Directly style elements that don't reliably inherit via CSS vars
  const logoIcon     = document.querySelector(".logo-icon");
  const logo         = document.querySelector(".logo");
  const backBtn      = document.querySelector(".back-btn");
  const generateBtn  = document.getElementById("generateBtn");
  const toolHeaderIc = document.getElementById("toolIcon");
  const resultCard   = document.getElementById("resultCard");
  const resultTitle  = document.getElementById("resultTitle");
  const spinner      = document.querySelector(".spinner");
  const loading      = document.querySelector(".loading");

  if (logoIcon)    { logoIcon.style.background = t.accent; }
  if (logo)        { logo.style.color = t.accent; }
  if (backBtn)     { backBtn.style.color = t.accent; }
  if (generateBtn) { generateBtn.style.background = t.accent; }
  if (toolHeaderIc){ toolHeaderIc.style.background = t.bg; toolHeaderIc.style.color = t.accent; }
  if (resultCard)  { resultCard.style.borderTop = `3px solid ${t.accent}`; }
  if (resultTitle) { resultTitle.style.color = t.accent; }
  if (spinner)     { spinner.style.borderTopColor = t.accent; spinner.style.borderColor = t.bg; spinner.style.borderTopColor = t.accent; }
  if (loading)     { loading.style.color = t.accent; }

  // Style copy/feedback buttons
  document.querySelectorAll(".copy-btn, .feedback-trigger-btn").forEach(btn => {
    btn.style.color = t.accent;
    btn.style.background = t.bg;
  });

  // Style result section left-borders and titles
  document.querySelectorAll(".result-section").forEach(sec => {
    sec.style.borderLeftColor = t.accent;
  });
  document.querySelectorAll(".result-section-title").forEach(el => {
    el.style.color = t.accent;
  });

  // Tint the tool view header area
  const toolHeader = document.querySelector(".tool-header");
  if (toolHeader) {
    toolHeader.style.borderBottom = `2px solid ${t.bg}`;
  }
}

/* ══════════════════════════════════════════
   RENDER HOME CARDS
══════════════════════════════════════════ */
function renderCards() {
  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = TOOLS.map((tool, i) => {
    const tc = tool.themeColor;
    return `<div class="tool-card" onclick="openTool(${i})" id="tool-card-${i}"
      style="--card-accent:${tc.accent}; --card-accent-bg:${tc.bg}; --card-accent-light:${tc.light};"
      onmouseenter="this.style.borderColor='${tc.light}'; this.style.boxShadow='0 6px 24px rgba(${tc.rgb},0.18)'"
      onmouseleave="this.style.borderColor=''; this.style.boxShadow=''">
      <div class="card-icon"
        style="background:${tc.bg}; color:${tc.accent}; font-size:22px">
        ${tool.icon}
      </div>
      <div class="card-info">
        <h3 style="color:#2d3436">${tool.title}</h3>
        <p style="color:#636e72">${tool.desc}</p>
        <span class="card-theme-dot" style="background:${tc.accent}"></span>
      </div>
    </div>`;
  }).join("");
}

/* ══════════════════════════════════════════
   OPEN TOOL
══════════════════════════════════════════ */
function openTool(index) {
  currentTool    = TOOLS[index];
  uploadedFileText = "";

  // Apply theme
  applyTheme(currentTool.themeColor);

  // Switch view
  document.getElementById("homeView").style.display = "none";
  document.getElementById("toolView").classList.add("active");
  document.getElementById("toolIcon").textContent   = currentTool.icon;
  document.getElementById("toolTitle").textContent  = currentTool.title;
  document.getElementById("resultTitle").textContent = `${currentTool.icon} Result`;
  document.getElementById("resultCard").classList.remove("active");
  document.getElementById("errorMsg").classList.remove("active");
  document.getElementById("loading").style.display  = "none";

  // Build form fields
  const form = document.getElementById("toolForm");
  form.innerHTML = currentTool.fields.map(field => {
    let input;

    if (field.type === "file") {
      input = `
        <div class="file-upload-wrapper">
          <label class="file-upload-label" for="fileInput_${field.name}">
            <span class="upload-icon">📁</span>
            <span>Click to upload or drag & drop</span>
            <span class="upload-hint">Accepts: ${field.accept || ".pdf,.txt,.doc,.docx"}</span>
          </label>
          <input
            type="file"
            id="fileInput_${field.name}"
            name="${field.name}"
            accept="${field.accept || ''}"
            class="file-upload-input"
            onchange="handleFileUpload(this)"
          >
        </div>
        <div class="file-chosen" id="fileChosen_${field.name}" style="display:none">
          <span>📄</span>
          <span class="file-name" id="fileName_${field.name}"></span>
          <span style="color:#e74c3c; cursor:pointer; font-size:11px" onclick="clearFile('${field.name}')">✕ Remove</span>
        </div>`;
    } else if (field.type === "textarea") {
      input = `<textarea name="${field.name}" placeholder="${field.placeholder || ''}" ${field.name === 'resume' ? '' : 'required'}></textarea>`;
    } else if (field.type === "select") {
      input = `<select name="${field.name}">${field.options.map(o => `<option value="${o}">${o}</option>`).join("")}</select>`;
    } else {
      input = `<input type="text" name="${field.name}" placeholder="${field.placeholder || ''}" required>`;
    }

    return `<div class="form-group"><label>${field.label}</label>${input}</div>`;
  }).join("");
}

/* ══════════════════════════════════════════
   FILE UPLOAD HANDLING
══════════════════════════════════════════ */
function handleFileUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const fieldName  = input.name;
  const fileChosen = document.getElementById(`fileChosen_${fieldName}`);
  const fileNameEl = document.getElementById(`fileName_${fieldName}`);

  fileNameEl.textContent = file.name;
  fileChosen.style.display = "flex";

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedFileText = e.target.result;
  };

  // For text-based files, read as text; for PDFs attempt text too
  if (file.type === "application/pdf") {
    // Try reading PDF as text (works for text-based PDFs)
    reader.readAsText(file);
  } else {
    reader.readAsText(file);
  }
}

function clearFile(fieldName) {
  const input    = document.getElementById(`fileInput_${fieldName}`);
  const chosen   = document.getElementById(`fileChosen_${fieldName}`);
  const nameEl   = document.getElementById(`fileName_${fieldName}`);
  if (input)  input.value = "";
  if (chosen) chosen.style.display = "none";
  if (nameEl) nameEl.textContent   = "";
  uploadedFileText = "";
}

/* ══════════════════════════════════════════
   SHOW HOME
══════════════════════════════════════════ */
function showHome() {
  // Show feedback before going home if result was generated and feedback not yet submitted
  if (!feedbackSubmitted && document.getElementById("resultCard").classList.contains("active")) {
    showFeedback();
    return; // Don't navigate home yet — wait for submit or dismiss
  }
  document.getElementById("homeView").style.display = "block";
  document.getElementById("toolView").classList.remove("active");
  applyTheme(DEFAULT_THEME);
  currentTool = null;
}

/* ══════════════════════════════════════════
   STRUCTURED RESULT RENDERER
══════════════════════════════════════════ */
function renderStructuredResult(rawText) {
  const container = document.getElementById("resultContent");
  container.innerHTML = "";

  // Split into logical blocks separated by blank lines or markdown headers
  const lines   = rawText.split("\n");
  const sections = [];
  let current   = { title: "", lines: [] };

  for (const line of lines) {
    const stripped = line.trim();

    // Detect markdown headings (##, ###) or ALL-CAPS labels ending with :
    const isHeading = /^#{1,4}\s+(.+)/.test(stripped) ||
                      /^[A-Z][A-Z\s\-\/]{2,}:$/.test(stripped) ||
                      /^\*\*([^*]+)\*\*:?\s*$/.test(stripped);

    if (isHeading) {
      if (current.lines.some(l => l.trim())) sections.push(current);
      const title = stripped
        .replace(/^#{1,4}\s+/, "")
        .replace(/^\*\*|\*\*$/g, "")
        .replace(/:$/, "");
      current = { title, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.some(l => l.trim())) sections.push(current);

  // If we got only one section (no headings detected), do a smarter split
  if (sections.length <= 1) {
    renderFallbackResult(rawText, container);
    return;
  }

  sections.forEach(sec => {
    if (!sec.lines.some(l => l.trim())) return;

    const sectionEl = document.createElement("div");
    sectionEl.className = "result-section";

    if (sec.title) {
      const titleEl = document.createElement("div");
      titleEl.className = "result-section-title";
      titleEl.innerHTML = `<span>${sec.title}</span>`;
      sectionEl.appendChild(titleEl);
    }

    const bodyEl = document.createElement("div");
    bodyEl.className = "result-section-body";
    bodyEl.innerHTML = renderSectionBody(sec.lines.join("\n"));
    sectionEl.appendChild(bodyEl);

    container.appendChild(sectionEl);
  });
}

function renderSectionBody(text) {
  const lines = text.split("\n");
  let html    = "";
  let inList  = false;
  let listType = "";  // "bullet" | "numbered"
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    if (listType === "bullet") {
      html += `<ul class="result-list">${listItems.map(item =>
        `<li class="result-list-item"><span class="item-bullet">▸</span><span>${applyInlineFormatting(item)}</span></li>`
      ).join("")}</ul>`;
    } else {
      html += `<ol style="list-style:none;padding:0;margin:0">${listItems.map((item, idx) =>
        `<li class="result-numbered-item"><span class="item-num">${idx + 1}</span><span>${applyInlineFormatting(item)}</span></li>`
      ).join("")}</ol>`;
    }
    listItems = [];
    inList = false;
  };

  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (inList) flushList();
      continue;
    }

    // Code block start (``` ... ```)
    if (/^```/.test(t)) {
      if (inList) flushList();
      html += `<pre class="result-code-block">`;
      continue;
    }

    // Numbered list item: "1." or "1)"
    const numMatch = t.match(/^(\d+)[.)]\s+(.+)/);
    if (numMatch) {
      if (inList && listType !== "numbered") flushList();
      inList = true; listType = "numbered";
      listItems.push(numMatch[2]);
      continue;
    }

    // Bullet item: "- ", "* ", "• "
    const bulletMatch = t.match(/^[-*•]\s+(.+)/);
    if (bulletMatch) {
      if (inList && listType !== "bullet") flushList();
      inList = true; listType = "bullet";
      listItems.push(bulletMatch[1]);
      continue;
    }

    // Plain paragraph
    if (inList) flushList();
    html += `<p style="margin:0 0 8px">${applyInlineFormatting(t)}</p>`;
  }

  if (inList) flushList();
  return html;
}

function applyInlineFormatting(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g,  '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g,       '<em>$1</em>')
    .replace(/`([^`]+)`/g,         '<code style="background:var(--accent-bg);color:var(--accent);padding:1px 5px;border-radius:4px;font-size:12px">$1</code>');
}

function renderFallbackResult(rawText, container) {
  // No clear headings — render as intelligently formatted paragraphs/lists
  const sectionEl  = document.createElement("div");
  sectionEl.className = "result-section";
  const bodyEl = document.createElement("div");
  bodyEl.className = "result-section-body";
  bodyEl.innerHTML  = renderSectionBody(rawText);
  sectionEl.appendChild(bodyEl);
  container.appendChild(sectionEl);
}

/* ══════════════════════════════════════════
   GENERATE
══════════════════════════════════════════ */
async function generate() {
  if (!currentTool) return;

  const form      = document.getElementById("toolForm");
  const formData  = new FormData(form);
  const btn       = document.getElementById("generateBtn");
  const loading   = document.getElementById("loading");
  const resultCard = document.getElementById("resultCard");
  const errorMsg  = document.getElementById("errorMsg");

  // Validate required fields
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  for (const inp of inputs) {
    if (!inp.value.trim()) {
      inp.focus();
      inp.style.borderColor = "#e74c3c";
      setTimeout(() => inp.style.borderColor = "", 1500);
      return;
    }
  }

  // Build user message from form data
  let userMessage = "";
  for (const field of currentTool.fields) {
    if (field.type === "file") continue;
    const value = formData.get(field.name);
    if (value) userMessage += `${field.label}: ${value}\n`;
  }

  // Append file content if uploaded
  if (uploadedFileText.trim()) {
    userMessage += `\n\nUploaded Resume Content:\n${uploadedFileText}`;
  }

  btn.disabled = true;
  loading.style.display = "flex";
  resultCard.classList.remove("active");
  errorMsg.classList.remove("active");

  try {
    const response = await fetch(API_BASE + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system",  content: currentTool.systemPrompt },
          { role: "user",    content: userMessage }
        ],
        temperature: 0.7,
        max_tokens:  2048
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data   = await response.json();
    const result = data.choices[0].message.content;

    renderStructuredResult(result);
    resultCard.classList.add("active");

  } catch (err) {
    errorMsg.textContent = "⚠️ " + err.message;
    errorMsg.classList.add("active");
  } finally {
    btn.disabled = false;
    loading.style.display = "none";
  }
}

/* ══════════════════════════════════════════
   COPY RESULT
══════════════════════════════════════════ */
function copyResult() {
  const content = document.getElementById("resultContent");
  const text    = content.innerText || content.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => btn.textContent = "📋 Copy", 2000);
  });
}

/* ══════════════════════════════════════════
   FEEDBACK MODAL
══════════════════════════════════════════ */
const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function showFeedback() {
  if (feedbackSubmitted) return;
  feedbackDismissed = false;

  // Reset form state
  document.getElementById("feedbackForm").style.display  = "";
  document.getElementById("feedbackSuccess").style.display = "none";
  clearFeedbackErrors();

  document.getElementById("feedbackOverlay").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function dismissFeedback() {
  feedbackDismissed = true;
  document.getElementById("feedbackOverlay").style.display = "none";
  document.body.style.overflow = "";
  // Allow navigation home after dismissing
  document.getElementById("homeView").style.display = "block";
  document.getElementById("toolView").classList.remove("active");
  applyTheme(DEFAULT_THEME);
  currentTool = null;
}

function closeFeedbackSuccess() {
  document.getElementById("feedbackOverlay").style.display = "none";
  document.body.style.overflow = "";
}

function clearFeedbackErrors() {
  ["emailError","starError","commentError"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
  const emailInput = document.getElementById("feedbackEmail");
  const commentEl  = document.getElementById("feedbackComment");
  if (emailInput) emailInput.classList.remove("field-invalid");
  if (commentEl)  commentEl.classList.remove("field-invalid");
}

function submitFeedback(e) {
  e.preventDefault();
  clearFeedbackErrors();

  const email   = document.getElementById("feedbackEmail").value.trim();
  const comment = document.getElementById("feedbackComment").value.trim();
  const words   = comment.split(/\s+/).filter(w => w).length;

  let valid = true;

  // Validate email — must be @gmail.com
  if (!email) {
    setError("emailError", "Gmail address is required.");
    document.getElementById("feedbackEmail").classList.add("field-invalid");
    valid = false;
  } else if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
    setError("emailError", "Please enter a valid @gmail.com address.");
    document.getElementById("feedbackEmail").classList.add("field-invalid");
    valid = false;
  }

  // Validate stars
  if (currentStarRating === 0) {
    setError("starError", "Please select a star rating.");
    valid = false;
  }

  // Validate comment word count
  if (!comment) {
    setError("commentError", "Comment is required.");
    document.getElementById("feedbackComment").classList.add("field-invalid");
    valid = false;
  } else if (words < 10) {
    setError("commentError", `Minimum 10 words required (you wrote ${words}).`);
    document.getElementById("feedbackComment").classList.add("field-invalid");
    valid = false;
  } else if (words > 1000) {
    setError("commentError", `Maximum 1000 words allowed (you wrote ${words}).`);
    document.getElementById("feedbackComment").classList.add("field-invalid");
    valid = false;
  }

  if (!valid) return;

  // Mark as submitted, show success
  feedbackSubmitted = true;
  document.getElementById("feedbackForm").style.display    = "none";
  document.getElementById("feedbackSuccess").style.display = "";

  console.log("Feedback submitted:", { email, rating: currentStarRating, comment });
}

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

/* ══════════════════════════════════════════
   STAR RATING INTERACTIONS
══════════════════════════════════════════ */
function initStarRating() {
  const stars     = document.querySelectorAll(".star");
  const labelEl   = document.getElementById("starLabel");

  stars.forEach(star => {
    const val = +star.dataset.value;

    star.addEventListener("mouseover", () => {
      stars.forEach(s => {
        s.classList.toggle("hovered", +s.dataset.value <= val);
        s.classList.remove("selected");
      });
      labelEl.textContent = STAR_LABELS[val];
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach(s => {
        s.classList.remove("hovered");
        s.classList.toggle("selected", +s.dataset.value <= currentStarRating);
      });
      labelEl.textContent = currentStarRating ? STAR_LABELS[currentStarRating] : "Select a rating";
    });

    star.addEventListener("click", () => {
      currentStarRating = val;
      stars.forEach(s => {
        s.classList.toggle("selected", +s.dataset.value <= val);
        s.classList.remove("hovered");
      });
      labelEl.textContent = STAR_LABELS[val];
      document.getElementById("starError").textContent = "";
    });
  });
}

/* ══════════════════════════════════════════
   WORD COUNT FOR FEEDBACK TEXTAREA
══════════════════════════════════════════ */
function initWordCount() {
  const textarea  = document.getElementById("feedbackComment");
  const counter   = document.getElementById("wordCount");
  if (!textarea || !counter) return;

  textarea.addEventListener("input", () => {
    const text  = textarea.value.trim();
    const count = text ? text.split(/\s+/).filter(w => w).length : 0;
    counter.textContent = `${count} / 1000 words`;
    counter.classList.toggle("over-limit", count > 1000);
  });
}



/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
renderCards();
initStarRating();
initWordCount();
