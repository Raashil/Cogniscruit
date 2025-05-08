<p><h3 align="left">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&random=false&width=435&lines=Howdy+All!!!;Project+Under+Works 🚧 🚧 🚧" alt="Typing SVG" /></a>
</p></h3>

# Cogniscruit

**Generating Interview Questions for Candidates Using Large Language Models (LLMs)**

---

## Project Overview

Cogniscruit is an AI-powered tool designed to automate the process of generating personalized interview questions based on a candidate's resume, LinkedIn profile, and other relevant sources. The system leverages Large Language Models (LLMs) to extract insights and generate tailored questions, saving time and ensuring consistency in the interview process.

---

## Problem Statement

Interviewers often need to research a candidate’s background and formulate relevant questions, which can be time-consuming and inconsistent. Our solution automates this process by extracting key information from resumes, LinkedIn profiles, and other sources, and generating personalized interview questions.

---

## What It Does

- Generates tailored interview questions based on candidate profiles (e.g., resumes, LinkedIn URLs).
- Uses job descriptions or role requirements to generate relevant questions.
- Assesses specific topics or skills to provide a comprehensive interview experience.

---

## How It Works

1. **User Input:** Recruiters or interviewers input candidate details, job descriptions, or topics.
2. **Data Processing:** The system extracts key information (e.g., skills, experience) from resumes or URLs.
3. **AI Question Generation:** Uses Gemini to generate relevant, tailored interview questions.
4. **Output:** A list of tailored interview questions is generated for the user.

---

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:**  Python
- **Database:** MongoDB , Redis (Queue)
- **AI:** Google Gemini / Llama

---

## Team Roles

| Team Member           | Frontend | Backend | AI  | DevOps | Testing | Documentation | Scrum |
|-----------------------|----------|---------|-----|--------|---------|---------------|-------|
| Raashil Aadhyanth     | ✓        |         | ✓   |        |         |               | ✓     |
| Jonathan Guan         |          |         | ✓   |        | ✓       |               |       |
| Sujith Venkatesh      | ✓        |         |     | ✓      |         |               |       |
| Ross Carvalho         | ✓        | ✓       | ✓   | ✓      |         |               |       |
| Reshma Ramakumar      |          | ✓       |     | ✓      |         |               |       |
| Hui Zhang             |          |         | ✓   |        |         |               |       |
| Arun Chowdary         |          |         |     |        | ✓       |  ✓            |       |
| Mahalakshmi Nagineni  |          |         |     |        | ✓       |  ✓            |       |

---

## Getting Started

To get started with the Cogniscruit project, follow these steps:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/Raashil/Cogniscruit.git
   ```
2. Set up env files for backend , workers and frontend
   
   - Backend `.env` file
     
     ``` text
     SUPABASE_API_KEY=
     GITHUB_TOKEN=
     GOOGLE_CLIENT_ID=
     JWT_SECRET_KEY=
     ```
   - Worker `.env` file
     
     ``` text
     GEMINI_API_KEY=
     ```
   - Frontend `.env.local`
     
     ``` text
      NEXTAUTH_URL=http://localhost:3000 
      NEXT_PUBLIC_GOOGLE_CLIENT_ID=
      ```
3. Spin up containers using docker compose:
   
   ```bash
   docker-compose up --build
   ```
4. Check on `http://localhost:3000`
   

---

## Contributing

- We welcome contributions! Please read our Contributing Guidelines for more information on how to get involved.

---

## License

- This project is licensed under the MIT License. See the LICENSE file for details.
