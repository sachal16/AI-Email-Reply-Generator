Project: Email Reply Generator (Spring Boot + React)

Generates first-draft replies in ~2–3 minutes by sending the pasted email + selected tone (formal/friendly/brief) to a Spring Boot endpoint that composes a prompt and calls an LLM (OpenAI/Gemini) via HTTP.

Built a React/MUI UI with fields for tone, key points, and “paste original email,” plus subject/body outputs and one-click copy; saved recent drafts in localStorage for quick reuse.

Created lightweight templates for common cases (follow-up, thanks, scheduling) with simple placeholder variables (recipient, date/time, ask).

Hardened the API with input length checks, basic rate-limit, and server-side API key usage; added CORS rules for the deployed front end.

Tested the prompt builder (JUnit for tone/length rules) and set up a basic CI to run tests on PRs and auto-deploy to Render/Vercel on main.

Result: used on ~20 real emails (class/TA and freelance leads); cut my time to a usable draft from ~10–15 min to ~3–5 min on average.
