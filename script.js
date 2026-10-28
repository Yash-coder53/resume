/* =========================================================
   RESUME BUILDER — script.js (Blank by Default)
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
  const nameValue = document.getElementById("name").value;
  document.getElementById("p-name").textContent = nameValue || "YOUR NAME";
  
  // Contact Info (Format: Mob: | Email | Location)
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("location").value;
  
  let contactHTML = [];
  if(phone) contactHTML.push(`Mob: ${escapeHTML(phone)}`);
  if(email) contactHTML.push(`<a href="mailto:${escapeHTML(email)}" style="color:blue; text-decoration:underline;">${escapeHTML(email)}</a>`);
  if(location) contactHTML.push(`${escapeHTML(location)}`);
  
  document.getElementById("p-contact").innerHTML = contactHTML.length > 0 ? contactHTML.join(" | ") : "Mob: [Phone] | Email | Location";

  // Career Objective
  const objValue = document.getElementById("objective").value;
  document.getElementById("p-objective").textContent = objValue || "Your career objective will appear here...";

  // Skills (Bullet Points)
  const skills = document.getElementById("skills").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-skills").innerHTML = skills.length > 0 ? skills.map(s => `<li>${escapeHTML(s)}</li>`).join('') : "<li>Your skills will appear here...</li>";

  // Education (Line by Line)
  const edu = document.getElementById("education").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-education").innerHTML = edu.length > 0 ? edu.map(s => `<div>${escapeHTML(s)}</div>`).join('') : "<div>Your education details will appear here...</div>";

  // Experience
  const exp = document.getElementById("experience").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-experience").innerHTML = exp.length > 0 ? exp.map(s => `<div>${escapeHTML(s)}</div>`).join('') : "<div>Your experience will appear here...</div>";

  // Languages
  const lang = document.getElementById("languages").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-languages").innerHTML = lang.length > 0 ? lang.map(s => `<div>${escapeHTML(s)}</div>`).join('') : "<div>Your languages will appear here...</div>";

  // Personal Details
  const details = document.getElementById("personal-details").value.split('\n').filter(s => s.trim() !== "");
  document.getElementById("p-personal").innerHTML = details.length > 0 ? details.map(s => `<div>${escapeHTML(s)}</div>`).join('') : "<div>Your personal details will appear here...</div>";

  // Declaration
  const decValue = document.getElementById("declaration").value;
  document.getElementById("p-declaration").textContent = decValue || "Your declaration will appear here...";

  // Show/Hide sections based on content
  // (Ab default me sabhi sections dikhenge taki user ko pata chale kya bharna hai)
  document.getElementById("sec-objective").style.display = "block";
  document.getElementById("sec-skills").style.display = "block";
  document.getElementById("sec-education").style.display = "block";
  document.getElementById("sec-experience").style.display = "block";
  document.getElementById("sec-languages").style.display = "block";
  document.getElementById("sec-personal").style.display = "block";
  document.getElementById("sec-declaration").style.display = "block";

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
  const nameInput = document.getElementById("name").value.trim();
  const fileName = nameInput ? `${nameInput}_Resume.pdf` : `My_Resume.pdf`;

  const options = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      scrollY: 0 
    },
    // A4 size in inches
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    
    // This ensures multi-page works correctly
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(options).from(element).save();
}

/* ---------- Initialize on Load ---------- */
window.addEventListener("DOMContentLoaded", () => {
  // Apply default settings
  applyTheme();
  applyFont();
  updatePreview(); // Ye blank placeholders load karega
});
