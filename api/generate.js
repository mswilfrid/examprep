export default async function handler(req, res) {
  try {
    const { subject, numQuestions } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert Rwanda National Examination (REB) examiner.
TASK: Generate a ${numQuestions}-question practice test for Senior 6 PCM ${subject}.
STYLE: Official Competence-Based Curriculum (CBC) format.

OUTPUT: ONLY clean HTML using Tailwind CSS classes.
- Use 'text-slate-900' for text.
- Use 'border-slate-200' for table borders or lines.
- Include sections for "Student Name" and "Index Number".
- DO NOT include markdown code blocks (\`\`\`html).`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(500).json({ error: err.error?.message || "API failed" });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
