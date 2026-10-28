/* =========================================================
   RESUME BUILDER — script.js
   ========================================================= */

const inputIds = [
  "name", "phone", "email", "location", "objective", 
  "skills", "education", "experience", "languages", 
  "personal-details", "declaration"
];

// Bind input events to update preview
inputIds.forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

/* ---------- Update Live Preview ---------- */
function updatePreview() {
  // Personal Info
  document.getElementById("p-name").textContent = document.getElementById("name").value || "YOUR NAME";
  
  // Contact Info (Format: Mob: | Email | Location)
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  
  let contactHTML = [];
  if(phone) contactHTML.push(`Mob: ${escapeHTML(phone)}`);
  if(email) contactHTML.push(`<a href="mailto:${escapeHTML(email)}" style="color:blue; text-decoration:underline;">${escapeHTML(email)}</a>`);
  if(location) contactHTML.push(`${escapeHTML(location)}`);
  
  document.getElementById("p-contact").innerHTML = contactHTML.join(" | ");

  // Career Objective
  document.getElementById("p-objective").textContent = document.getElementById("objective").value;

  // Skills (Bullet Points)
  const skills = document.getElementById("skills").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-skills").innerHTML = skills.map(s => `<li>${escapeHTML(s)}</li>`).join('');

  // Education (Line by Line)
  const edu = document.getElementById("education").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-education").innerHTML = edu.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // Experience
  const exp = document.getElementById("experience").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-experience").innerHTML = exp.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // Languages
  const lang = document.getElementById("languages").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-languages").innerHTML = lang.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // Personal Details
  const details = document.getElementById("personal-details").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-personal").innerHTML = details.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // Declaration
  document.getElementById("p-declaration").textContent = document.getElementById("declaration").value;

  // Show/Hide sections based on content
  toggleSection("sec-objective", "objective");
  toggleSection("sec-skills", "skills");
  toggleSection("sec-education", "education");
  toggleSection("sec-experience", "experience");
  toggleSection("sec-languages", "languages");
  toggleSection("sec-personal", "personal-details");
  toggleSection("sec-declaration", "declaration");

  checkPageLength();
}

/* ---------- Theme Color ---------- */
function applyTheme() {
  const color = document.getElementById("theme-color").value;
  document.querySelectorAll(".section-header").forEach(header => {
    header.style.backgroundColor = color;
  });
  // Optional: Make the "RESUME" text match the theme color slightly
  document.getElementById("p-doc-header").style.color = color;
}

/* ---------- Font Style ---------- */
function applyFont() {
  const font = document.getElementById("font-family").value;
  document.getElementById("resume-preview").style.fontFamily = font;
}

/* ---------- Helpers ---------- */
function toggleSection(sectionId, inputId) {
  const val = document.getElementById(inputId).value.trim();
  const section = document.getElementById(sectionId);
  section.style.display = val !== "" ? "block" : "none";
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Multi-Page Warning ---------- */
function checkPageLength() {
  const preview = document.getElementById("resume-preview");
  const warning = document.getElementById("page-warning");
  
  // A4 height is roughly 1122px (at 96 DPI). If content exceeds this, warn the user.
  if (preview.scrollHeight > 1122) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
  }
}

/* ---------- PDF Download ---------- */
function downloadPDF() {
  const element = document.getElementById("resume-preview");
  const name = document.getElementById("name").value.trim() || "My";
  const themeColor = document.getElementById("theme-color").value;

  const options = {
    margin: 0,
    filename: `${name}_Resume.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      scrollY: 0 
    },
    // A4 size in inches
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    
    // This ensures multi-page works correctly by adding a background color
    // and making sure text doesn't break weirdly.
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(options).from(element).save();
}

/* ---------- Initialize on Load ---------- */
window.addEventListener("DOMContentLoaded", () => {
  // Add sample data to match your image exactly for first load
  document.getElementById("name").value = "ROHIT";
  document.getElementById("phone").value = "+91-9812152324";
  document.getElementById("email").value = "Rohitmalk981215232@gmail.com";
  document.getElementById("location").value = "Paju Kalan Dist. Jind, Haryana, India";
  
  document.getElementById("objective").value = "To secure a position as a Tally Operator / Accountant where I can utilize my accounting knowledge, computer skills, and contribute to organizational growth.";
  
  document.getElementById("skills").value = "Tally (ERP)\nAccounting (Debit & Credit)\nMS Excel\nData Entry\nInvoice & Billing\nGST (Knowledge)\nHindi & English Typing\nCorelDRAW (Basic)";
  
  document.getElementById("education").value = "10th Pass (HBSE Board)\n12th Pass (HBSE Board)\nBA Final";
  
  document.getElementById("experience").value = "2 Years Experience in CA Office";
  
  document.getElementById("languages").value = "Hindi (Fluent)\nEnglish (Basic)";
  
  document.getElementById("personal-details").value = "Date of Birth: 10-07-2003\nNationality: Indian";
  
  document.getElementById("declaration").value = "I hereby declare that the information provided above is true and correct to the best of my knowledge.";

  // Apply default settings
  applyTheme();
  applyFont();
  updatePreview();
});
