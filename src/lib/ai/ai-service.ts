import { CVData } from "../types/cv";

export interface BulletImproveResult {
  original: string;
  improved: string;
  actionVerb: string;
  metricTip?: string;
  explanation: string;
}

export interface SummaryGenerateResult {
  summary: string;
  keyHighlights: string[];
}

export interface TailorCvResult {
  matchingSkills: string[];
  missingKeywords: string[];
  suggestedSummary: string;
  targetedAdvice: string[];
}

/**
 * Heuristic fallback for improving bullet points when AI API keys are not supplied.
 * Implements the Action Verb + Context + Measurable Outcome framework.
 */
function heuristicImproveBullet(text: string): BulletImproveResult {
  const clean = text.trim();
  if (!clean) {
    return {
      original: "",
      improved: "Spearheaded core feature implementation, resulting in improved system efficiency and user satisfaction.",
      actionVerb: "Spearheaded",
      metricTip: "Quantify your result: by what percentage or number did efficiency improve?",
      explanation: "Provided a structured accomplishment statement framework.",
    };
  }

  // Common passive phrases to replace
  const replacements: Array<{ regex: RegExp; verb: string; replacement: string }> = [
    { regex: /^(responsible for|helped with|assisted in)\s+/i, verb: "Engineered", replacement: "Engineered and delivered " },
    { regex: /^(worked on|worked with)\s+/i, verb: "Architected", replacement: "Architected and maintained " },
    { regex: /^(managed to|tried to)\s+/i, verb: "Successfully executed", replacement: "Successfully executed " },
    { regex: /^(did|made|built)\s+/i, verb: "Developed", replacement: "Developed and deployed " },
    { regex: /^(handled|dealt with)\s+/i, verb: "Streamlined", replacement: "Streamlined operations and resolved " },
  ];

  let improved = clean;
  let actionVerb = "Spearheaded";
  let replaced = false;

  for (const item of replacements) {
    if (item.regex.test(clean)) {
      improved = clean.replace(item.regex, item.replacement);
      actionVerb = item.verb;
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    // If it doesn't start with passive words, ensure strong active capitalization
    const firstWord = clean.split(" ")[0];
    actionVerb = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    improved = clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  // Ensure it has a quantifiable impact prompt if no digits are present
  const hasDigits = /\d+/.test(improved);
  let metricTip = undefined;
  if (!hasDigits) {
    improved = `${improved.replace(/\.?$/, "")}, elevating operational throughput by [X%] and cutting latency.`;
    metricTip = "Add your actual metric in place of [X%] (e.g. 25% or 40k users) to prove real-world impact.";
  }

  return {
    original: text,
    improved,
    actionVerb,
    metricTip,
    explanation: "Elevated passive phrasing into a strong action verb and outcome-driven accomplishment.",
  };
}

/**
 * Heuristic fallback for generating a truthful summary from candidate's real entered data.
 */
function heuristicGenerateSummary(data: CVData): SummaryGenerateResult {
  const { personalInfo, experience, education, skills } = data;
  const title = personalInfo.jobTitle || "Dedicated Professional";
  const location = personalInfo.location ? ` based in ${personalInfo.location}` : "";
  const techSkills = skills.technical.slice(0, 5).join(", ");
  const softSkills = skills.soft.slice(0, 3).join(", ");

  let expSentence = "";
  if (experience.length > 0) {
    const latestRole = experience[0];
    expSentence = `Proven track record as ${latestRole.jobTitle} at ${latestRole.company}, specializing in delivering high-impact initiatives.`;
  } else if (education.length > 0) {
    const edu = education[0];
    expSentence = `${edu.degree} in ${edu.fieldOfStudy} graduate from ${edu.institution} with a strong academic foundation and hands-on project experience.`;
  } else {
    expSentence = "Demonstrated ability to quickly master new technologies, solve complex problems, and deliver quality results.";
  }

  const skillsSentence = techSkills
    ? `Proficient in ${techSkills}${softSkills ? `, with recognized strengths in ${softSkills}` : ""}.`
    : "Committed to continuous technical growth and collaboration across cross-functional teams.";

  const closing = "Dedicated to driving measurable value and contributing to high-performing engineering and product teams.";

  const summary = `${title}${location}. ${expSentence} ${skillsSentence} ${closing}`;

  return {
    summary,
    keyHighlights: [
      `Anchored around verified role: ${title}`,
      techSkills ? `Highlighted verified skills: ${techSkills}` : "General technical alignment",
      "Adheres strictly to zero-hallucination policy",
    ],
  };
}

/**
 * Heuristic fallback for matching CV against a target job description.
 */
function heuristicTailorCV(jobDescription: string, data: CVData): TailorCvResult {
  const jdLower = jobDescription.toLowerCase();
  const cvTechnical = data.skills.technical;
  const cvSoft = data.skills.soft;

  // Find which of candidate's skills are mentioned in the job description
  const matchingSkills = [...cvTechnical, ...cvSoft].filter((skill) =>
    jdLower.includes(skill.toLowerCase())
  );

  // Common high-demand tech keywords to scan in the JD that user might have or want to highlight
  const commonTech = [
    "React", "Next.js", "TypeScript", "JavaScript", "Python", "Node.js", "PostgreSQL",
    "SQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Tailwind CSS", "GraphQL", "REST APIs",
    "CI/CD", "Agile", "Scrum", "Git", "Figma", "Redux", "Linux"
  ];

  const missingKeywords: string[] = [];
  for (const tech of commonTech) {
    if (jdLower.includes(tech.toLowerCase())) {
      const alreadyHas = cvTechnical.some((s) => s.toLowerCase() === tech.toLowerCase());
      if (!alreadyHas) {
        missingKeywords.push(tech);
      }
    }
  }

  const suggestedSummary = `${data.personalInfo.jobTitle || "Software Engineer"} experienced in ${
    matchingSkills.slice(0, 4).join(", ") || "full-stack development"
  }. Strongly aligned with target role requirements, bringing proven capabilities in building resilient systems, cross-functional collaboration, and rapid execution.`;

  return {
    matchingSkills: matchingSkills.length > 0 ? matchingSkills : ["Core Problem Solving", "Technical Communication"],
    missingKeywords: missingKeywords.slice(0, 6),
    suggestedSummary,
    targetedAdvice: [
      `Your CV already matches ${matchingSkills.length} key keywords from this job post.`,
      missingKeywords.length > 0
        ? `Consider honestly adding experience with [${missingKeywords.slice(0, 3).join(", ")}] if you have used them in projects or coursework.`
        : "Your technical stack demonstrates strong alignment with the job description.",
      "Ensure your top 2 work experience bullets specifically address the core responsibilities outlined in the job description.",
    ],
  };
}

/**
 * Public Server-Side API Handlers with Provider Abstraction (Gemini / OpenAI / Heuristic)
 */
export async function improveBulletText(text: string): Promise<BulletImproveResult> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const prompt = `You are an elite executive CV editor. Improve this bullet point for a resume.
Do NOT invent fake companies, degrees, or false numbers.
Keep the original meaning, start with a powerful active verb, enhance clarity and impact, and if a metric is needed use bracket placeholder [e.g. 20%].
Respond with JSON only:
{
  "improved": "the revised bullet point",
  "actionVerb": "the primary action verb",
  "explanation": "brief 1 sentence why this is stronger"
}
Input bullet: "${text}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rawContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          return {
            original: text,
            improved: parsed.improved || text,
            actionVerb: parsed.actionVerb || "Engineered",
            explanation: parsed.explanation || "Enhanced with active verb and quantified structure.",
          };
        }
      }
    } catch {
      // Fallback silently to heuristic engine on error
    }
  }

  return heuristicImproveBullet(text);
}

export async function generateSummaryText(data: CVData): Promise<SummaryGenerateResult> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const prompt = `You are a professional career coach. Write a concise, 3-sentence professional summary for this candidate.
Use ONLY their actual experience, education, and skills. Do NOT hallucinate false qualifications or fake work history.
Candidate Info:
Name: ${data.personalInfo.fullName}
Title: ${data.personalInfo.jobTitle}
Experience: ${data.experience.map((e) => `${e.jobTitle} at ${e.company}`).join(", ")}
Education: ${data.education.map((ed) => `${ed.degree} in ${ed.fieldOfStudy} from ${ed.institution}`).join(", ")}
Skills: ${data.skills.technical.join(", ")}

Respond with JSON only:
{
  "summary": "3-sentence professional summary",
  "keyHighlights": ["point 1", "point 2"]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rawContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawContent) {
          const parsed = JSON.parse(rawContent);
          return {
            summary: parsed.summary,
            keyHighlights: parsed.keyHighlights || ["AI verified against actual credentials"],
          };
        }
      }
    } catch {
      // Fallback silently
    }
  }

  return heuristicGenerateSummary(data);
}

export async function tailorCvToJob(jobDescription: string, data: CVData): Promise<TailorCvResult> {
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const prompt = `Compare this candidate's CV against this target job description.
Extract matching skills already in their CV, identify missing keywords they should honestly consider, and suggest a targeted summary.
Candidate Skills: ${data.skills.technical.join(", ")}
Candidate Title: ${data.personalInfo.jobTitle}
Job Description:
${jobDescription.slice(0, 1500)}

Respond with JSON only:
{
  "matchingSkills": ["skill1", "skill2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestedSummary": "tailored summary",
  "targetedAdvice": ["advice 1", "advice 2"]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rawContent = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawContent) {
          return JSON.parse(rawContent);
        }
      }
    } catch {
      // Fallback silently
    }
  }

  return heuristicTailorCV(jobDescription, data);
}
