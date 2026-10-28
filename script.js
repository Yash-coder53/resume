/* =========================================================
   RESUME BUILDER — script.js (100% Blank Start)
   ========================================================= */

const inputIds = [
  "name", "phone", "email", "location", "objective", 
  "skills", "education", "experience", "languages", 
  "personal-details", "declaration"
];

// Bind input events to update preview as user types
inputIds.forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

/* ---------- Update Live Preview ---------- */
function updatePreview() {
  // 1. Personal Info
  const nameValue = document.getElementById("name").value;
  document.getElementById("p-name").textContent = nameValue || "YOUR NAME";
  
  // 2. Contact Info (Format: Mob: | Email | Location)
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  
  let contactHTML = [];
  if(phone) contactHTML.push(`Mob: ${escapeHTML(phone)}`);
  if(email) contactHTML.push(`<a href="mailto:${escapeHTML(email)}" style="color:#0000cd;">${escapeHTML(email)}</a>`);
  if(location) contactHTML.push(`${escapeHTML(location)}`);
  
  document.getElementById("p-contact").innerHTML = contactHTML.length > 0 ? contactHTML.join(" | ") : "Mob: | Email | Location";

  // 3. Career Objective
  document.getElementById("p-objective").textContent = document.getElementById("objective").value;

  // 4. Skills (Bullet Points)
  const skills = document.getElementById("skills").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-skills").innerHTML = skills.map(s => `<li>${escapeHTML(s)}</li>`).join('');

  // 5. Education
  const edu = document.getElementById("education").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-education").innerHTML = edu.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // 6. Experience
  const exp = document.getElementById("experience").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-experience").innerHTML = exp.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // 7. Languages
  const lang = document.getElementById("languages").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-languages").innerHTML = lang.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // 8. Personal Details
  const details = document.getElementById("personal-details").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-personal").innerHTML = details.map(s => `<div>${escapeHTML(s)}</div>`).join('');

  // 9. Declaration
  document.getElementById("p-declaration").textContent = document.getElementById("declaration").value;

  // Hide sections if they are empty
  toggleSection("sec-objective", "objective");
  toggleSection("sec-skills", "skills");
  toggleSection("sec-education", "education");
  toggleSection("sec-experience", "experience");
  toggleSection("sec-languages", "languages");
  toggleSection("sec-personal", "personal-details");
  toggleSection("sec-declaration", "declaration");

  checkPageLength();
}

/* ---------- Hide Empty Sections ---------- */
function toggleSection(sectionId, inputId) {
  const val = document.getElementById(inputId).value.trim();
  const section = document.getElementById(sectionId);
  // Agar input khali hai, toh preview me wo section chhupa do
  section.style.display = val !== "" ? "block" : "none";
}

/* ---------- Theme Color ---------- */
function applyTheme() {
  const color = document.getElementById("theme-color").value;
  document.querySelectorAll(".section-header").forEach(header => {
    header.style.backgroundColor = color;
  });
  document.getElementById("p-doc-header").style.color = color;
}

/* ---------- Font Style ---------- */
function applyFont() {
  const font = document.getElementById("font-family").value;
  document.getElementById("resume-preview").style.fontFamily = font;
}

/* ---------- Helpers ---------- */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Multi-Page Warning ---------- */
function checkPageLength() {
  const preview = document.getElementById("resume-preview");
  const warning = document.getElementById("page-warning");
  
  if (preview.scrollHeight > 1122) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
  }
}

/* ---------- PDF Download ---------- */
function downloadPDF() {
  const element = document.getElementById("resume-preview");
  const nameInput = document.getElementById("name").value.trim();
  const fileName = nameInput ? `${nameInput}_Resume.pdf` : `My_Resume.pdf`;

  const options = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(options).from(element).save();
}

/* ---------- Initialize on Load ---------- */
window.addEventListener("DOMContentLoaded", () => {
  // Sirf theme aur font apply karo, koi data load mat karo
  applyTheme();
  applyFont();
  updatePreview(); 
});
