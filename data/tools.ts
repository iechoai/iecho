export interface Tool {
  id: string;
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  url: string;
  icon?: string;
  audience: string[];
  tier: 'free' | 'freemium' | 'paid';
  isPopular?: boolean;
  upvotes: number;
}

export const tools: Tool[] = [
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "description": "Advanced AI chatbot for conversations, writing, and problem-solving",
    "tags": [
      "AI",
      "Free",
      "Writing"
    ],
    "url": "https://chat.openai.com",
    "icon": "GPT",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "chatbots"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "google-gemini",
    "name": "Google Gemini",
    "description": "Google's AI assistant for creative and analytical tasks",
    "tags": [
      "AI",
      "Free",
      "Research"
    ],
    "url": "https://gemini.google.com",
    "icon": "GM",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "claude",
    "name": "Claude",
    "description": "Anthropic's AI assistant for analysis and creative tasks",
    "tags": [
      "AI",
      "Free",
      "Analysis"
    ],
    "url": "https://claude.ai",
    "icon": "CL",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "microsoft-copilot",
    "name": "Microsoft Copilot",
    "description": "An AI assistant integrated with Microsoft Office products, offering unique functionalities for streamlining workflows.",
    "tags": [
      "AI",
      "Freemium"
    ],
    "url": "https://copilot.microsoft.com/",
    "icon": "C",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "perplexity-ai",
    "name": "Perplexity AI",
    "description": "An AI-powered search engine that provides answers to questions using large language models.",
    "tags": [
      "AI",
      "Freemium"
    ],
    "url": "https://www.perplexity.ai/",
    "icon": "P",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "jasper-chat",
    "name": "Jasper Chat",
    "description": "A chatbot for businesses and marketers that can be trained on a brand's voice to create personalized and on-brand content.",
    "tags": [
      "AI",
      "Paid"
    ],
    "url": "https://www.jasper.ai/chat",
    "icon": "J",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "poe-ai",
    "name": "Poe AI",
    "description": "A fast, helpful AI chat that lets you ask questions, get instant answers, and have back-and-forth conversations.",
    "tags": [
      "AI",
      "Freemium"
    ],
    "url": "https://poe.com/",
    "icon": "Poe",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "chatbots"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "notion-ai",
    "name": "NotionAI",
    "description": "All-in-one workspace with AI-powered writing and organization",
    "tags": [
      "AI",
      "Productivity",
      "Organization"
    ],
    "url": "https://www.notion.so",
    "icon": "NT",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "note-taking"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "obsidian",
    "name": "Obsidian",
    "description": "Powerful knowledge base that works on top of local folder of plain text files",
    "tags": [
      "Knowledge Management",
      "Free",
      "Local"
    ],
    "url": "https://obsidian.md",
    "icon": "OB",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "note-taking"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "evernote",
    "name": "Evernote",
    "description": "A popular app for note-taking, organizing, task management, and archiving.",
    "tags": [
      "Productivity",
      "Freemium"
    ],
    "url": "https://evernote.com/",
    "icon": "E",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "note-taking"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "onenote",
    "name": "OneNote",
    "description": "A digital note-taking app that provides a single place for keeping all of your notes, research, plans, and information.",
    "tags": [
      "Productivity",
      "Free"
    ],
    "url": "https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app",
    "icon": "O",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "note-taking"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-keep",
    "name": "Google Keep",
    "description": "A note-taking service included as part of the free, web-based Google Docs Editors suite offered by Google.",
    "tags": [
      "Productivity",
      "Free"
    ],
    "url": "https://keep.google.com/",
    "icon": "K",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "note-taking"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "notebooklm",
    "name": "NotebookLM",
    "description": "AI-powered research assistant that helps you understand complex topics",
    "tags": [
      "AI",
      "Education",
      "Research"
    ],
    "url": "https://notebooklm.google.com",
    "icon": "NLM",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "anki",
    "name": "Anki",
    "description": "Intelligent flashcards for effective memorization",
    "tags": [
      "Flashcards",
      "Free",
      "Memory"
    ],
    "url": "https://apps.ankiweb.net",
    "icon": "ANK",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "wolframalpha",
    "name": "WolframAlpha",
    "description": "A computational knowledge engine or answer engine developed by Wolfram Research.",
    "tags": [
      "Education",
      "Freemium"
    ],
    "url": "https://www.wolframalpha.com/",
    "icon": "WA",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "quizlet",
    "name": "Quizlet",
    "description": "A mobile and web-based study application that allows users to study information via learning tools and games.",
    "tags": [
      "Students",
      "Freemium"
    ],
    "url": "https://quizlet.com/",
    "icon": "Q",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "khan-academy",
    "name": "Khan Academy",
    "description": "An American non-profit educational organization created in 2006 by Sal Khan, with the goal of creating a set of online tools that help educate students.",
    "tags": [
      "Students",
      "Free",
      "Education"
    ],
    "url": "https://www.khanacademy.org/",
    "icon": "KA",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-tasks",
    "name": "Google Tasks",
    "description": "Simple task management integrated with Google Workspace",
    "tags": [
      "Tasks",
      "Free",
      "Google"
    ],
    "url": "https://tasks.google.com",
    "icon": "GT",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "microsoft-todo",
    "name": "Microsoft To Do",
    "description": "Smart task management app with collaboration features",
    "tags": [
      "Tasks",
      "Free",
      "Microsoft"
    ],
    "url": "https://to-do.office.com",
    "icon": "MTD",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-calendar",
    "name": "Google Calendar",
    "description": "Organize your schedule and share events with others. Simple and effective.",
    "tags": [
      "Productivity",
      "Free"
    ],
    "url": "https://calendar.google.com/",
    "icon": "GC",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "calendly",
    "name": "Calendly",
    "description": "A hub for scheduling meetings professionally and efficiently, eliminating the hassle of back-and-forth emails so you can get back to work.",
    "tags": [
      "Productivity",
      "Freemium"
    ],
    "url": "https://calendly.com/",
    "icon": "C",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "doodle",
    "name": "Doodle",
    "description": "The simplest way to schedule meetings with clients, colleagues, or friends.",
    "tags": [
      "Productivity",
      "Freemium"
    ],
    "url": "https://doodle.com/",
    "icon": "D",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "zoho-bookings",
    "name": "Zoho Bookings",
    "description": "Appointment scheduling software for small businesses.",
    "tags": [
      "Productivity",
      "Freemium"
    ],
    "url": "https://www.zoho.com/bookings/",
    "icon": "ZB",
    "audience": [],
    "tier": "freemium",
    "categories": [
      "scheduling"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "github",
    "name": "GitHub",
    "description": "Code hosting platform with version control and collaboration",
    "tags": [
      "Git",
      "Free",
      "Collaboration"
    ],
    "url": "https://github.com",
    "icon": "GH",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "vscode",
    "name": "VS Code",
    "description": "Lightweight but powerful code editor with extensive extensions",
    "tags": [
      "Editor",
      "Free",
      "Extensions"
    ],
    "url": "https://code.visualstudio.com",
    "icon": "VSC",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "figma",
    "name": "Figma",
    "description": "Collaborative design tool for UI/UX design and prototyping",
    "tags": [
      "Design",
      "Free",
      "Collaboration"
    ],
    "url": "https://www.figma.com",
    "icon": "FIG",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "deepseek",
    "name": "DeepSeek",
    "description": "An AI language model that is specialized in coding and can be used as a powerful code assistant.",
    "tags": [
      "AI",
      "Developers",
      "Free"
    ],
    "url": "https://www.deepseek.com/en/coder",
    "icon": "DS",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "tabnine",
    "name": "Tabnine",
    "description": "An AI code completion assistant that helps developers write better code faster.",
    "tags": [
      "AI",
      "Developers",
      "Freemium"
    ],
    "url": "https://www.tabnine.com/",
    "icon": "T9",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "snyk",
    "name": "Snyk",
    "description": "A developer security platform that helps you find and fix vulnerabilities in your code, open source dependencies, containers, and infrastructure as code.",
    "tags": [
      "Security",
      "Developers",
      "Freemium"
    ],
    "url": "https://snyk.io/",
    "icon": "Snyk",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "loom",
    "name": "Loom",
    "description": "A video messaging tool that helps you get your message across through instantly shareable videos.",
    "tags": [
      "Video",
      "Freemium"
    ],
    "url": "https://www.loom.com/",
    "icon": "L",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "miro",
    "name": "Miro",
    "description": "The online collaborative whiteboard platform to bring teams together, anytime, anywhere.",
    "tags": [
      "Collaboration",
      "Freemium"
    ],
    "url": "https://miro.com/",
    "icon": "M",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "trello",
    "name": "Trello",
    "description": "A collaboration tool that organizes your projects into boards. In one glance, Trello tells you what's being worked on, who's working on what, and where something is in a process.",
    "tags": [
      "Project Management",
      "Freemium"
    ],
    "url": "https://trello.com/",
    "icon": "T",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "asana",
    "name": "Asana",
    "description": "A web and mobile application designed to help teams organize, track, and manage their work.",
    "tags": [
      "Project Management",
      "Freemium"
    ],
    "url": "https://asana.com/",
    "icon": "A",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "clickup",
    "name": "ClickUp",
    "description": "A cloud-based collaboration and project management tool suitable for businesses of all sizes and industries.",
    "tags": [
      "Project Management",
      "Freemium"
    ],
    "url": "https://clickup.com/",
    "icon": "CU",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "todoist",
    "name": "Todoist",
    "description": "A cloud-based task management application that allows users to manage their tasks from a smartphone, tablet and computer.",
    "tags": [
      "Task Management",
      "Freemium"
    ],
    "url": "https://todoist.com/",
    "icon": "T",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "productivity-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "quillbot",
    "name": "QuillBot",
    "description": "A paraphrasing and summarizing tool that helps millions of students and professionals cut their writing time by more than half.",
    "tags": [
      "Writing",
      "Freemium"
    ],
    "url": "https://quillbot.com/",
    "icon": "Q",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "languagetool",
    "name": "LanguageTool",
    "description": "A free and open-source grammar, style, and spell checker.",
    "tags": [
      "Writing",
      "Freemium"
    ],
    "url": "https://languagetool.org/",
    "icon": "LT",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "deepl",
    "name": "DeepL",
    "description": "A neural machine translation service that is able to translate text and entire documents.",
    "tags": [
      "Translation",
      "Freemium"
    ],
    "url": "https://www.deepl.com/translator",
    "icon": "DL",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "photopea",
    "name": "Photopea",
    "description": "A web-based photo and graphics editor which can work with raster and vector graphics.",
    "tags": [
      "Design",
      "Free"
    ],
    "url": "https://www.photopea.com/",
    "icon": "P",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "canva",
    "name": "Canva",
    "description": "A graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content.",
    "tags": [
      "Design",
      "Freemium"
    ],
    "url": "https://www.canva.com/",
    "icon": "C",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "slidesgo",
    "name": "Slidesgo",
    "description": "An online platform that offers a wide variety of free Google Slides themes and PowerPoint templates.",
    "tags": [
      "Presentation",
      "Freemium"
    ],
    "url": "https://slidesgo.com/",
    "icon": "S",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "prezi",
    "name": "Prezi",
    "description": "A presentation software that uses motion, zoom, and spatial relationships to bring your ideas to life and make you a great presenter.",
    "tags": [
      "Presentation",
      "Freemium"
    ],
    "url": "https://prezi.com/",
    "icon": "P",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gimp",
    "name": "GIMP",
    "description": "A free and open-source raster graphics editor used for image retouching and editing, free-form drawing, converting between different image formats, and more specialized tasks.",
    "tags": [
      "Design",
      "Free",
      "Open Source"
    ],
    "url": "https://www.gimp.org/",
    "icon": "G",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "github-copilot",
    "name": "GitHub Copilot",
    "description": "Your AI pair programmer that helps you write code faster and with less work.",
    "tags": [
      "Developers",
      "AI",
      "Paid"
    ],
    "url": "https://github.com/features/copilot",
    "icon": "Cop",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "postman",
    "name": "Postman",
    "description": "An API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.",
    "tags": [
      "Developers",
      "Freemium"
    ],
    "url": "https://www.postman.com/",
    "icon": "P",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "docker",
    "name": "Docker",
    "description": "A set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
    "tags": [
      "Developers",
      "Freemium",
      "Open Source"
    ],
    "url": "https://www.docker.com/",
    "icon": "D",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "mdn",
    "name": "MDN Web Docs",
    "description": "Comprehensive resource for web developers",
    "tags": [
      "Web",
      "Free",
      "Reference"
    ],
    "url": "https://developer.mozilla.org",
    "icon": "MDN",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "stackoverflow",
    "name": "Stack Overflow",
    "description": "Q&A platform for programmers and developers",
    "tags": [
      "Q&A",
      "Free",
      "Community"
    ],
    "url": "https://stackoverflow.com",
    "icon": "SO",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": true,
    "upvotes": 0
  },
  {
    "id": "devdocs",
    "name": "DevDocs",
    "description": "An open source web app that combines multiple developer documentations in a single searchable interface.",
    "tags": [
      "Web Dev",
      "Free",
      "Open Source"
    ],
    "url": "https://devdocs.io/",
    "icon": "DD",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "w3schools",
    "name": "W3Schools",
    "description": "A freemium educational website for learning coding online.",
    "tags": [
      "Web Dev",
      "Free"
    ],
    "url": "https://www.w3schools.com/",
    "icon": "W3S",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "freecodecamp",
    "name": "freeCodeCamp",
    "description": "Learn to code with free online courses and projects",
    "tags": [
      "Coding",
      "Free",
      "Certification"
    ],
    "url": "https://www.freecodecamp.org",
    "icon": "FCC",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "coursera",
    "name": "Coursera",
    "description": "Online courses from top universities and companies",
    "tags": [
      "Courses",
      "Paid",
      "Certification"
    ],
    "url": "https://www.coursera.org",
    "icon": "CRS",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "udemy",
    "name": "Udemy",
    "description": "A global destination for online learning, with a massive library of courses on a wide range of topics.",
    "tags": [
      "Education",
      "Paid"
    ],
    "url": "https://www.udemy.com/",
    "icon": "U",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "codecademy",
    "name": "Codecademy",
    "description": "An online interactive platform that offers free coding classes in 12 different programming languages.",
    "tags": [
      "Education",
      "Freemium"
    ],
    "url": "https://www.codecademy.com/",
    "icon": "C",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "zapier",
    "name": "Zapier",
    "description": "Automate workflows between different apps without coding",
    "tags": [
      "Automation",
      "Integration"
    ],
    "url": "https://zapier.com",
    "icon": "ZAP",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "no-code-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "airtable",
    "name": "Airtable",
    "description": "Spreadsheet-database hybrid with powerful organization features",
    "tags": [
      "Database",
      "Organization"
    ],
    "url": "https://airtable.com",
    "icon": "AT",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "no-code-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "webflow",
    "name": "Webflow",
    "description": "A visual web development platform that allows users to design, build, and launch responsive websites without writing code.",
    "tags": [
      "Design",
      "Web Dev",
      "Freemium"
    ],
    "url": "https://webflow.com/",
    "icon": "W",
    "audience": [
      "developers",
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "no-code-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "bubble",
    "name": "Bubble",
    "description": "A no-code platform that lets you build and launch web applications without writing any code.",
    "tags": [
      "Web Dev",
      "Freemium"
    ],
    "url": "https://bubble.io/",
    "icon": "B",
    "audience": [
      "developers",
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "no-code-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "adalo",
    "name": "Adalo",
    "description": "A no-code platform for building powerful web and mobile apps.",
    "tags": [
      "Web Dev",
      "Mobile Dev",
      "Freemium"
    ],
    "url": "https://www.adalo.com/",
    "icon": "A",
    "audience": [
      "developers",
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "no-code-tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "grammarly",
    "name": "Grammarly",
    "description": "An AI-powered writing assistant that helps improve grammar, spelling, punctuation, and style in real-time.",
    "tags": [
      "Writing",
      "Productivity",
      "Freemium"
    ],
    "url": "https://www.grammarly.com/",
    "icon": "G",
    "audience": [
      "students"
    ],
    "tier": "freemium",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "react-developer-tools",
    "name": "React Developer Tools",
    "description": "A browser extension that allows you to inspect the React component hierarchies in the Chrome and Firefox developer tools.",
    "tags": [
      "Developers",
      "Free",
      "Open Source"
    ],
    "url": "https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en",
    "icon": "RD",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "vue.js-devtools",
    "name": "Vue.js devtools",
    "description": "A browser extension for debugging Vue.js applications.",
    "tags": [
      "Developers",
      "Free",
      "Open Source"
    ],
    "url": "https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en",
    "icon": "V",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "json-formatter",
    "name": "JSON Formatter",
    "description": "A browser extension to make JSON easy to read.",
    "tags": [
      "Developers",
      "Free",
      "Open Source"
    ],
    "url": "https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en",
    "icon": "JF",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "extensions"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-books",
    "name": "Google Books",
    "description": "Search the world's most comprehensive index of full-text books.",
    "tags": [
      "Reading",
      "Free"
    ],
    "url": "https://books.google.com/",
    "icon": "GB",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "goodreads",
    "name": "Goodreads",
    "description": "Discover and share books you love. Track the books you're reading, have read, and want to read.",
    "tags": [
      "Reading",
      "Community"
    ],
    "url": "https://www.goodreads.com/",
    "icon": "GR",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "open-library",
    "name": "Open Library",
    "description": "An open, editable library catalog, building towards a web page for every book ever published.",
    "tags": [
      "Reading",
      "Free",
      "Community"
    ],
    "url": "https://openlibrary.org/",
    "icon": "OL",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "project-gutenberg",
    "name": "Project Gutenberg",
    "description": "A library of over 60,000 free eBooks.",
    "tags": [
      "Reading",
      "Free"
    ],
    "url": "https://www.gutenberg.org/",
    "icon": "PG",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "manybooks",
    "name": "ManyBooks",
    "description": "An extensive library of books in a digital format, available for free on the Internet.",
    "tags": [
      "Reading",
      "Free"
    ],
    "url": "https://manybooks.net/",
    "icon": "MB",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "librivox",
    "name": "LibriVox",
    "description": "A group of worldwide volunteers who read and record public domain texts creating free public domain audiobooks for download from their website and other digital library hosting sites on the internet.",
    "tags": [
      "Audiobooks",
      "Free"
    ],
    "url": "https://librivox.org/",
    "icon": "LV",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "welib",
    "name": "WeLib",
    "description": "A digital library offering access to 43 million books and 98 million academic articles.",
    "tags": [
      "Reading",
      "Free"
    ],
    "url": "https://welib.org/",
    "icon": "WL",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "book-resources"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "unity",
    "name": "Unity",
    "description": "A real-time 3D development platform for creating 2D, 3D, VR, and AR games and experiences.",
    "tags": [
      "Game Dev",
      "3D",
      "Freemium"
    ],
    "url": "https://unity.com/",
    "icon": "U",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "game-development"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "unreal-engine",
    "name": "Unreal Engine",
    "description": "The world’s most open and advanced real-time 3D creation tool for photorealistic visuals and immersive experiences.",
    "tags": [
      "Game Dev",
      "3D",
      "Free"
    ],
    "url": "https://www.unrealengine.com/",
    "icon": "UE",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "game-development"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "godot-engine",
    "name": "Godot Engine",
    "description": "A free and open-source game engine that provides a huge set of common tools, so you can just focus on making your game without reinventing the wheel.",
    "tags": [
      "Game Dev",
      "2D",
      "3D",
      "Free",
      "Open Source"
    ],
    "url": "https://godotengine.org/",
    "icon": "G",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "game-development"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gamemaker-studio",
    "name": "GameMaker Studio",
    "description": "The ultimate 2D game engine.",
    "tags": [
      "Game Dev",
      "2D",
      "Freemium"
    ],
    "url": "https://gamemaker.io/en",
    "icon": "GM",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "game-development"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "blender",
    "name": "Blender",
    "description": "A free and open source 3D creation suite. It supports the entirety of the 3D pipeline—modeling, rigging, animation, simulation, rendering, compositing and motion tracking, even video editing and game creation.",
    "tags": [
      "3D",
      "Animation",
      "Free",
      "Open Source"
    ],
    "url": "https://www.blender.org/",
    "icon": "B",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "game-development"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "itch.io",
    "name": "itch.io",
    "description": "An online marketplace for independent digital creators with a focus on independent video games.",
    "tags": [
      "Marketplace",
      "Free",
      "Community"
    ],
    "url": "https://itch.io/",
    "icon": "itch",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "game-assets"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "unity-asset-store",
    "name": "Unity Asset Store",
    "description": "A marketplace for developers to find and sell assets for the Unity game engine.",
    "tags": [
      "Marketplace",
      "Freemium"
    ],
    "url": "https://assetstore.unity.com/",
    "icon": "UAS",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "game-assets"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "unreal-engine-marketplace",
    "name": "Unreal Engine Marketplace",
    "description": "A marketplace for developers to find and sell assets for the Unreal Engine.",
    "tags": [
      "Marketplace",
      "Freemium"
    ],
    "url": "https://www.unrealengine.com/marketplace/en-US/store",
    "icon": "UEM",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "game-assets"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "craftpix.net",
    "name": "CraftPix.net",
    "description": "A marketplace for high-quality 2D game assets.",
    "tags": [
      "Marketplace",
      "Freemium"
    ],
    "url": "https://craftpix.net/",
    "icon": "CP",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "game-assets"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "steam",
    "name": "Steam",
    "description": "The ultimate destination for playing, discussing, and creating games.",
    "tags": [
      "Gaming",
      "Community"
    ],
    "url": "https://store.steampowered.com/",
    "icon": "S",
    "audience": [],
    "tier": "free",
    "categories": [
      "gaming-platforms"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gog",
    "name": "GOG",
    "description": "A digital distribution platform for video games and films.",
    "tags": [
      "Gaming",
      "DRM-Free"
    ],
    "url": "https://www.gog.com/",
    "icon": "GOG",
    "audience": [],
    "tier": "free",
    "categories": [
      "gaming-platforms"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "epic-games-store",
    "name": "Epic Games Store",
    "description": "A digital PC game storefront for Windows and macOS, operated by Epic Games.",
    "tags": [
      "Gaming"
    ],
    "url": "https://www.epicgames.com/store/en-US/",
    "icon": "EGS",
    "audience": [],
    "tier": "free",
    "categories": [
      "gaming-platforms"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "battle.net",
    "name": "Battle.net",
    "description": "An online gaming platform operated by Blizzard Entertainment.",
    "tags": [
      "Gaming"
    ],
    "url": "https://www.blizzard.com/en-us/apps/battle.net/desktop",
    "icon": "B",
    "audience": [],
    "tier": "free",
    "categories": [
      "gaming-platforms"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "hydrogen",
    "name": "Hydrogen",
    "description": "Shopify’s headless commerce framework for building custom storefronts.",
    "tags": [
      "Web Dev",
      "Free",
      "Open Source"
    ],
    "url": "https://shopify.dev/docs/custom-storefronts/hydrogen",
    "icon": "H",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "react",
    "name": "React",
    "description": "A JavaScript library for building user interfaces.",
    "tags": [
      "Web Dev",
      "Free",
      "Open Source"
    ],
    "url": "https://react.dev/",
    "icon": "R",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "react-three-fiber",
    "name": "React Three Fiber",
    "description": "A React renderer for Three.js.",
    "tags": [
      "Web Dev",
      "3D",
      "Free",
      "Open Source"
    ],
    "url": "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction",
    "icon": "R3F",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gsap",
    "name": "GSAP",
    "description": "A JavaScript animation library from GreenSock.",
    "tags": [
      "Web Dev",
      "Animation",
      "Freemium"
    ],
    "url": "https://gsap.com/docs/v3/",
    "icon": "G",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "tailwind-css",
    "name": "Tailwind CSS",
    "description": "A utility-first CSS framework for rapid UI development.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free",
      "Open Source"
    ],
    "url": "https://tailwindcss.com/docs/installation",
    "icon": "T",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "whatsapp-web.js",
    "name": "whatsapp-web.js",
    "description": "A WhatsApp client library for NodeJS that connects through the WhatsApp Web browser app.",
    "tags": [
      "Web Dev",
      "API",
      "Free",
      "Open Source"
    ],
    "url": "https://wwebjs.dev/",
    "icon": "W",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "json",
    "name": "JSON",
    "description": "A lightweight data-interchange format.",
    "tags": [
      "Web Dev",
      "Data",
      "Free"
    ],
    "url": "https://www.json.org/json-en.html",
    "icon": "J",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "nextauth.js",
    "name": "NextAuth.js",
    "description": "Authentication for Next.js.",
    "tags": [
      "Web Dev",
      "Auth",
      "Free",
      "Open Source"
    ],
    "url": "https://next-auth.js.org/",
    "icon": "NA",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "tailwind-css-cheatsheet",
    "name": "Tailwind CSS Cheatsheet",
    "description": "A quick reference for Tailwind CSS classes.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://tailwindcomponents.com/cheatsheet/",
    "icon": "T",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gemini-api",
    "name": "Gemini API",
    "description": "Google's API for their Gemini models.",
    "tags": [
      "AI",
      "API",
      "Free"
    ],
    "url": "https://ai.google.dev/docs",
    "icon": "G",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "public-apis",
    "name": "Public APIs",
    "description": "A collective list of free APIs for use in software and web development.",
    "tags": [
      "Web Dev",
      "API",
      "Free"
    ],
    "url": "https://github.com/public-apis/public-apis",
    "icon": "API",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "github-copilot-cheat-sheet",
    "name": "GitHub Copilot Cheat Sheet",
    "description": "A quick reference for GitHub Copilot commands.",
    "tags": [
      "AI",
      "Developers",
      "Free"
    ],
    "url": "https://github.com/github/copilot-cheat-sheet",
    "icon": "Cop",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "prompts-ai",
    "name": "Prompts.ai",
    "description": "A marketplace for AI prompts and prompt engineering tools.",
    "tags": [
      "AI",
      "Prompts",
      "Freemium"
    ],
    "url": "https://prompts.ai/",
    "icon": "PAI",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "flowgpt",
    "name": "FlowGPT",
    "description": "A platform for creating, sharing, and discovering AI prompts.",
    "tags": [
      "AI",
      "Prompts",
      "Free"
    ],
    "url": "https://flowgpt.com/",
    "icon": "FG",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "promptbase",
    "name": "PromptBase",
    "description": "Buy and sell high-quality AI prompts for various use cases.",
    "tags": [
      "AI",
      "Prompts",
      "Freemium"
    ],
    "url": "https://promptbase.com/",
    "icon": "PB",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "learnprompting",
    "name": "Learn Prompting",
    "description": "An educational resource for learning prompt engineering techniques.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://learnprompting.org/",
    "icon": "LP",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "appwrite",
    "name": "Appwrite",
    "description": "An open-source backend-as-a-service platform.",
    "tags": [
      "Web Dev",
      "Backend",
      "Free",
      "Open Source"
    ],
    "url": "https://appwrite.io/docs",
    "icon": "A",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "prompt-engineering-guide",
    "name": "Prompt Engineering Guide",
    "description": "A guide to prompt engineering.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://www.promptingguide.ai/",
    "icon": "PG",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "prompting"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "zod",
    "name": "Zod",
    "description": "A TypeScript-first schema declaration and validation library.",
    "tags": [
      "Web Dev",
      "Library",
      "Free",
      "Open Source"
    ],
    "url": "https://zod.dev/",
    "icon": "Z",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "@google/genai",
    "name": "@google/genai",
    "description": "Google's generative AI SDK for Node.js.",
    "tags": [
      "AI",
      "API",
      "Free",
      "Open Source"
    ],
    "url": "https://www.npmjs.com/package/@google/genai",
    "icon": "G",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "relay",
    "name": "Relay",
    "description": "A JavaScript framework for building data-driven React applications.",
    "tags": [
      "Web Dev",
      "Framework",
      "Free",
      "Open Source"
    ],
    "url": "https://relay.dev/",
    "icon": "R",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "css-shape",
    "name": "CSS Shape",
    "description": "A tool for creating complex CSS shapes.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://css-shape.com/",
    "icon": "CSS",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "font-awesome",
    "name": "Font Awesome",
    "description": "A huge library of icons.",
    "tags": [
      "Web Dev",
      "Icons",
      "Freemium"
    ],
    "url": "https://fontawesome.com/",
    "icon": "FA",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "get-waves",
    "name": "Get Waves",
    "description": "Create SVG waves for your next design.",
    "tags": [
      "Web Dev",
      "SVG",
      "Free"
    ],
    "url": "https://getwaves.io/",
    "icon": "W",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "coolors",
    "name": "Coolors",
    "description": "Create a palette.",
    "tags": [
      "Web Dev",
      "Color",
      "Freemium"
    ],
    "url": "https://coolors.co/",
    "icon": "C",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "clippy",
    "name": "Clippy",
    "description": "CSS clip-path maker.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://bennettfeely.com/clippy/",
    "icon": "C",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "css-grid-generator",
    "name": "CSS Grid Generator",
    "description": "A tool for generating CSS grids.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://cssgrid-generator.netlify.app/",
    "icon": "CSS",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "overapi.com",
    "name": "OverAPI.com",
    "description": "A collection of cheat sheets for various technologies.",
    "tags": [
      "Web Dev",
      "Free"
    ],
    "url": "https://overapi.com/",
    "icon": "OAPI",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "leetcode",
    "name": "LeetCode",
    "description": "A platform for practicing coding problems.",
    "tags": [
      "Education",
      "Freemium"
    ],
    "url": "https://leetcode.com/",
    "icon": "L",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "react-bits",
    "name": "React Bits",
    "description": "Animated UI Components For React.",
    "tags": [
      "Web Dev",
      "React",
      "Free"
    ],
    "url": "https://react-bits.github.io/react-animated-components/",
    "icon": "RB",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "fancy-border-radius-generator",
    "name": "Fancy Border Radius Generator",
    "description": "A tool for creating fancy border radiuses.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://9elements.github.io/fancy-border-radius/",
    "icon": "FBR",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "neumorphism/soft-ui-css-shadow-generator",
    "name": "Neumorphism/Soft UI CSS shadow generator",
    "description": "A tool for generating Neumorphism/Soft UI CSS shadows.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://neumorphism.io/",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "math-encrypt",
    "name": "Math Encrypt",
    "description": "Convert Any Number to a Hard Math Equation.",
    "tags": [
      "Math",
      "Free"
    ],
    "url": "https://www.mathencrypt.com/",
    "icon": "ME",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "free-online-certificate-maker",
    "name": "Free Online Certificate Maker",
    "description": "A tool for creating certificates.",
    "tags": [
      "Design",
      "Free"
    ],
    "url": "https://www.certificatemagic.com/",
    "icon": "CM",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "advanced-search-for-youtube",
    "name": "Advanced Search for YouTube",
    "description": "An advanced search tool for YouTube.",
    "tags": [
      "Search",
      "Free"
    ],
    "url": "https://filmot.com/",
    "icon": "YT",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "css-gradient-generator",
    "name": "CSS Gradient Generator",
    "description": "A tool for generating CSS gradients.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://cssgradient.io/",
    "icon": "CSS",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "animista",
    "name": "Animista",
    "description": "On-Demand CSS Animations Library.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://animista.net/",
    "icon": "A",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "mockoops",
    "name": "Mockoops",
    "description": "A tool for creating mockups.",
    "tags": [
      "Design",
      "Freemium"
    ],
    "url": "https://mockoops.com/",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "linkvertise",
    "name": "Linkvertise",
    "description": "Earn Money with Links | Monetization done right.",
    "tags": [
      "Monetization",
      "Freemium"
    ],
    "url": "https://linkvertise.com/",
    "icon": "L",
    "audience": [],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "front-end-mentors",
    "name": "Front-end mentors",
    "description": "A platform for front-end developers to practice their skills.",
    "tags": [
      "Education",
      "Freemium"
    ],
    "url": "https://www.frontendmentor.io/",
    "icon": "FM",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "3dicons",
    "name": "3dicons",
    "description": "Open source 3D icon library.",
    "tags": [
      "Design",
      "3D",
      "Free",
      "Open Source"
    ],
    "url": "https://3dicons.co/",
    "icon": "3D",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "programmable-search-engine",
    "name": "Programmable Search Engine",
    "description": "A tool for creating a programmable search engine.",
    "tags": [
      "Search",
      "Free"
    ],
    "url": "https://programmablesearchengine.google.com/",
    "icon": "PSE",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "datepicker-–-react-aria",
    "name": "DatePicker – React Aria",
    "description": "A date picker component for React.",
    "tags": [
      "Web Dev",
      "React",
      "Free",
      "Open Source"
    ],
    "url": "https://react-spectrum.adobe.com/react-aria/DatePicker.html",
    "icon": "RA",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "free-html-website-templates-on-htmlrev",
    "name": "Free HTML Website Templates on HTMLrev",
    "description": "A collection of free HTML website templates.",
    "tags": [
      "Web Dev",
      "HTML",
      "Free"
    ],
    "url": "https://htmlrev.com/",
    "icon": "HTML",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "mega",
    "name": "MEGA",
    "description": "A cloud storage service.",
    "tags": [
      "Storage",
      "Freemium"
    ],
    "url": "https://mega.io/",
    "icon": "M",
    "audience": [],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "tailwind-skeleton-generator",
    "name": "Tailwind Skeleton Generator",
    "description": "A tool for generating Tailwind CSS skeletons.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://tailwindskeleton.com/",
    "icon": "TSG",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "flexbox-labs",
    "name": "Flexbox Labs",
    "description": "A tool for learning and experimenting with CSS Flexbox.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://flexboxlabs.com/",
    "icon": "FL",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "supahero",
    "name": "Supahero",
    "description": "Website hero section library.",
    "tags": [
      "Web Dev",
      "Design",
      "Free"
    ],
    "url": "https://supahero.dev/",
    "icon": "S",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "shadcn-editor",
    "name": "Shadcn Editor",
    "description": "A WYSIWYG editor for shadcn/ui.",
    "tags": [
      "Web Dev",
      "React",
      "Free",
      "Open Source"
    ],
    "url": "https://shadcn-editor.vercel.app/",
    "icon": "SE",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "is-it-down?",
    "name": "Is it down?",
    "description": "Check if a website is down.",
    "tags": [
      "Web Dev",
      "Free"
    ],
    "url": "https://www.isitdownrightnow.com/",
    "icon": "?",
    "audience": [],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "regex-learn",
    "name": "Regex Learn",
    "description": "A tool for learning and testing regular expressions.",
    "tags": [
      "Web Dev",
      "Regex",
      "Free"
    ],
    "url": "https://regexlearn.com/",
    "icon": "R",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "spinners-rippleui",
    "name": "Spinners RippleUI",
    "description": "A collection of spinners for Tailwind CSS.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://www.ripple-ui.com/docs/components/spinner",
    "icon": "RUI",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "markmap",
    "name": "markmap",
    "description": "A tool for creating markmaps.",
    "tags": [
      "Web Dev",
      "Markdown",
      "Free"
    ],
    "url": "https://markmap.js.org/",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "heroui",
    "name": "HeroUI",
    "description": "A React UI library.",
    "tags": [
      "Web Dev",
      "React",
      "Free",
      "Open Source"
    ],
    "url": "https://heroui.net/",
    "icon": "HUI",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "animations-css-generator-|-web-code-tools",
    "name": "Animations CSS Generator | Web Code Tools",
    "description": "A tool for generating CSS animations.",
    "tags": [
      "Web Dev",
      "CSS",
      "Free"
    ],
    "url": "https://webcode.tools/css-generator/animation",
    "icon": "CSS",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "ngrok",
    "name": "ngrok",
    "description": "The documentation for ngrok.",
    "tags": [
      "Web Dev",
      "API",
      "Freemium"
    ],
    "url": "https://ngrok.com/docs",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "documentation"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "svgl",
    "name": "Svgl",
    "description": "A library of SVG logos.",
    "tags": [
      "Web Dev",
      "SVG",
      "Free"
    ],
    "url": "https://svgl.app/",
    "icon": "S",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "icoon.co",
    "name": "Icoon.co",
    "description": "A collection of 3D icons, illustrations, mockups and design assets.",
    "tags": [
      "Design",
      "3D",
      "Freemium"
    ],
    "url": "https://icoon.co/",
    "icon": "I",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "send.now",
    "name": "send.now",
    "description": "A tool for sending files.",
    "tags": [
      "File Sharing",
      "Free"
    ],
    "url": "https://send.vis.ee/",
    "icon": "SN",
    "audience": [],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "algorithm-visualizer",
    "name": "Algorithm Visualizer",
    "description": "A tool for visualizing algorithms.",
    "tags": [
      "Education",
      "Free"
    ],
    "url": "https://algorithm-visualizer.org/",
    "icon": "AV",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "neon-console",
    "name": "Neon Console",
    "description": "The console for Neon.",
    "tags": [
      "Database",
      "Free"
    ],
    "url": "https://console.neon.tech/",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "excalidraw-whiteboard",
    "name": "Excalidraw Whiteboard",
    "description": "A virtual whiteboard for sketching hand-drawn like diagrams.",
    "tags": [
      "Design",
      "Free",
      "Open Source"
    ],
    "url": "https://excalidraw.com/",
    "icon": "E",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "openai-academy",
    "name": "OpenAI Academy",
    "description": "A platform offering expert and community-led learning to help individuals acquire the knowledge and skills to effectively use artificial intelligence.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://openai.com/academy",
    "icon": "OAI",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "openai-residency",
    "name": "OpenAI Residency",
    "description": "A six-month program designed for researchers and engineers who may not have a direct AI background but are looking for a pathway to a full-time role at OpenAI.",
    "tags": [
      "AI",
      "Career",
      "Free"
    ],
    "url": "https://openai.com/careers/openai-residency/",
    "icon": "OAI",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "ai-learning-resources-&-guides-from-anthropic",
    "name": "AI Learning Resources & Guides from Anthropic",
    "description": "Tutorials for working with their AI models, such as Claude, to craft effective prompts and maximize AI interactions.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://www.anthropic.com/resources",
    "icon": "A",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-ai-essentials",
    "name": "Google AI Essentials",
    "description": "A beginner-friendly course on AI fundamentals.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://grow.google/intl/en_in/courses-and-tools/google-ai-essentials/",
    "icon": "G",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-career-certificates-with-ai-training",
    "name": "Google Career Certificates with AI Training",
    "description": "In-depth and job-focused certificates with AI training.",
    "tags": [
      "AI",
      "Career",
      "Paid"
    ],
    "url": "https://grow.google/intl/en_in/certificates/",
    "icon": "G",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "google-cloud-skills-boost",
    "name": "Google Cloud Skills Boost",
    "description": "A platform with a wide range of AI courses.",
    "tags": [
      "AI",
      "Cloud",
      "Freemium"
    ],
    "url": "https://www.cloudskillsboost.google/",
    "icon": "G",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "career-dreamer",
    "name": "Career Dreamer",
    "description": "An AI-powered tool for career exploration.",
    "tags": [
      "AI",
      "Career",
      "Free"
    ],
    "url": "https://grow.google/careerdreamer/",
    "icon": "G",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "tools"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "ai-literacy-hub",
    "name": "AI Literacy Hub",
    "description": "Resources for parents, students, and educators.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://edu.google.com/",
    "icon": "G",
    "audience": [
      "students"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "nvidia-deep-learning-institute-(dli)",
    "name": "NVIDIA Deep Learning Institute (DLI)",
    "description": "NVIDIA's main platform for learning AI, data science, and accelerated computing.",
    "tags": [
      "AI",
      "Education",
      "Freemium"
    ],
    "url": "https://www.nvidia.com/en-us/training/",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "nvidia-ai-certifications",
    "name": "NVIDIA AI Certifications",
    "description": "Industry-recognized certifications to validate and enhance the skills of data scientists and machine learning engineers.",
    "tags": [
      "AI",
      "Career",
      "Paid"
    ],
    "url": "https://www.nvidia.com/en-us/training/certification/",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "gtc-sessions-on-demand",
    "name": "GTC Sessions On-Demand",
    "description": "A great way tocategory learn about the latest advancements in AI from NVIDIA's GTC conference.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://www.nvidia.com/gtc/on-demand/",
    "icon": "N",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "microsoft-learn-for-ai-engineers",
    "name": "Microsoft Learn for AI Engineers",
    "description": "A learning path with guided training to become an AI Engineer.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://learn.microsoft.com/en-us/training/roles/ai-engineer",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "microsoft-ai-&-ml-engineering-professional-certificate",
    "name": "Microsoft AI & ML Engineering Professional Certificate",
    "description": "A 5-course series on Coursera for a career in AI & ML Engineering.",
    "tags": [
      "AI",
      "Career",
      "Paid"
    ],
    "url": "https://www.coursera.org/professional-certificates/microsoft-ai-ml-engineering",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "ai-102:-designing-and-implementing-a-microsoft-azure-ai-solution",
    "name": "AI-102: Designing and Implementing a Microsoft Azure AI Solution",
    "description": "A deep dive into Azure AI capabilities.",
    "tags": [
      "AI",
      "Cloud",
      "Paid"
    ],
    "url": "https://learn.microsoft.com/en-us/training/courses/ai-102t00",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "meta-ai-residency-program",
    "name": "Meta AI Residency Program",
    "description": "A one-year research training position at Meta.",
    "tags": [
      "AI",
      "Career",
      "Free"
    ],
    "url": "https://www.meta.com/careers/life/ai-residency-program/",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "meta-blueprint---ai-learning-alliance-(aila)",
    "name": "Meta Blueprint - AI Learning Alliance (AILA)",
    "description": "eLearning AI courses and more from Meta.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://www.facebook.com/business/learn/ai-learning-alliance",
    "icon": "M",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "machine-learning-to-product-video-series",
    "name": "Machine Learning to Product Video Series",
    "description": "A video series to help engineers and researchers apply machine learning skills to real-world problems.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://tech.fb.com/videos/machine-learning-to-product-video-series/",
    "icon": "M",
    "audience": [
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "ai-ready",
    "name": "AI Ready",
    "description": "A program from Amazon to provide free AI skills training.",
    "tags": [
      "AI",
      "Education",
      "Free"
    ],
    "url": "https://www.aboutamazon.com/news/workplace/free-ai-skills-training-amazon",
    "icon": "A",
    "audience": [
      "students",
      "developers"
    ],
    "tier": "free",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "aws-training-and-certification",
    "name": "AWS Training and Certification",
    "description": "Certification paths for AI and ML roles from Amazon Web Services.",
    "tags": [
      "AI",
      "Cloud",
      "Paid"
    ],
    "url": "https://aws.amazon.com/training/",
    "icon": "A",
    "audience": [
      "developers"
    ],
    "tier": "paid",
    "categories": [
      "studying"
    ],
    "isPopular": false,
    "upvotes": 0
  },
  {
    "id": "aws-skill-builder",
    "name": "AWS Skill Builder",
    "description": "A platform to build in-demand AI skills from Amazon Web Services.",
    "tags": [
      "AI",
      "Cloud",
      "Freemium"
    ],
    "url": "https://explore.skillbuilder.aws/lms/",
    "icon": "A",
    "audience": [
      "developers"
    ],
    "tier": "freemium",
    "categories": [
      "tutorials"
    ],
    "isPopular": false,
    "upvotes": 0
  }
];