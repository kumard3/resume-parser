import natural from "natural";
import nlp from "node-nlp";

// Sample resume text (replace this with your parsed resume text)
const resumeText = `
John Doe
johndoe@email.com | (123) 456-7890
123 Main St, Anytown, USA

**Experience**
- **Software Engineer** at XYZ Corp, 2018 - Present
  - Developed and maintained web applications
  - Led a team of 5 developers

**Education**
- **Bachelor's in Computer Science** from State University, 2014 - 2018

**Skills**
- Python, JavaScript, SQL, Machine Learning

**Projects**
- **Open Source Contribution** - Contributed to popular open-source projects
`;

// Basic NLP with Natural
const tokenizer = new natural.WordTokenizer();
const tokens = tokenizer.tokenize(resumeText.toLowerCase());

console.log("Tokens:", tokens);

// Using node-nlp for NLP tasks (assuming basic functionality)
async function processResume() {
  // Note: node-nlp might not have the same functionality as nlp.js or other advanced NLP libraries.
  // Here's a placeholder for how you might use it for basic tasks:
  const sentences = nlp.sentences(resumeText);
  console.log("Sentences:", sentences);

  // Custom function to segment resume into sections
  function segmentResume(text) {
    const sections = {
      Experience: [],
      Education: [],
      Skills: [],
      Projects: [],
    };

    const lines = text.split("\n");
    let currentSection = null;

    for (let line of lines) {
      if (line.startsWith("**")) {
        const sectionName = line.slice(2, -2).trim();
        currentSection = sectionName in sections ? sectionName : null;
      } else if (currentSection) {
        sections[currentSection].push(line.trim());
      }
    }

    return sections;
  }

  const segmentedResume = segmentResume(resumeText);
  console.log("Segmented Resume:", segmentedResume);
}
