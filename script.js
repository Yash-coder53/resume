/* =========================================================
   RESUME BUILDER — script.js
   ========================================================= */

/* ---------- Live preview binding (simple fields) ---------- */
const simpleFields = [
  { input: "name",      target: "p-name"      },
  { input: "title",     target: "p-title"     },
  { input: "summary",   target: "p-summary"   },
  { input: "skills",    target: "p-skills"    },
];

simpleFields.forEach(({ input, target }) => {
  document.getElementById(input).addEventListener("input", updateSimple);
});

function updateSimple() {
  simpleFields.forEach(({ input, target }) => {
    document.getElementById(target).textContent =
      document.getElementById(input).value;
  });
  updateContact();
  hideEmptySections();
}

/* ---------- Contact line (email | phone | location | website) ---------- */
["email", "phone", "location", "website"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateContact);
});

function updateContact() {
  const parts = [
    document.getElementById("email").value,
    document.getElementById("phone").value,
    document.getElementById("location").value,
    document.getElementById("website").value,
  ].filter((p) => p.trim() !== "");

  document.getElementById("p-contact").textContent = parts.join("  |  ");
}

/* =========================================================
   EXPERIENCE
   ========================================================= */
let expCount = 0;

function addExperience() {
  expCount++;
  const id = expCount;

  const card = document.createElement("div");
  card.className = "entry-card";
  card.id = `exp-card-${id}`;
  card.innerHTML = `
    <button type="button" class="remove-btn" onclick="removeExperience(${id})">✕</button>
    <input type="text" placeholder="Job Title" oninput="renderExperience()" data-field="jobtitle" data-exp="${id}">
    <input type="text" placeholder="Company" oninput="renderExperience()" data-field="company" data-exp="${id}">
    <input type="text" placeholder="Start – End (e.g. Jan 2022 – Present)" oninput="renderExperience()" data-field="dates" data-exp="${id}">
    <textarea rows="3" placeholder="Description / Achievements" oninput="renderExperience()" data-field="desc" data-exp="${id}"></textarea>
  `;

  document.getElementById("experience-list").appendChild(card);
  renderExperience();
}

function removeExperience(id) {
  document.getElementById(`exp-card-${id}`).remove();
  renderExperience();
}

function renderExperience() {
  const list = document.getElementById("p-experience");
  list.innerHTML = "";

  document.querySelectorAll('[data-field][data-exp]').forEach(() => {}); // no-op safety
  const ids = [...new Set(
    [...document.querySelectorAll("[data-exp]")].map((el) => el.dataset.exp)
  )];

  ids.forEach((id) => {
    const get = (field) =>
      document.querySelector(`[data-exp="${id}"][data-field="${field}"]`)?.value || "";

    const jobtitle = get("jobtitle");
    const company  = get("company");
    const dates    = get("dates");
    const desc     = get("desc");

    if (!jobtitle && !company && !desc) return; // skip empty

    const entry = document.createElement("div");
    entry.className = "preview-entry";
    entry.innerHTML = `
      <div class="entry-title">${escapeHTML(jobtitle)}</div>
      <div class="entry-sub">${escapeHTML(company)}</div>
      <div class="entry-date">${escapeHTML(dates)}</div>
      <div class="entry-desc">${escapeHTML(desc)}</div>
    `;
    list.appendChild(entry);
  });

  hideEmptySections();
}

/* =========================================================
   EDUCATION
   ========================================================= */
let eduCount = 0;

function addEducation() {
  eduCount++;
  const id = eduCount;

  const card = document.createElement("div");
  card.className = "entry-card";
  card.id = `edu-card-${id}`;
  card.innerHTML = `
    <button type="button" class="remove-btn" onclick="removeEducation(${id})">✕</button>
    <input type="text" placeholder="Degree / Course" oninput="renderEducation()" data-field="degree" data-edu="${id}">
    <input type="text" placeholder="Institution" oninput="renderEducation()" data-field="school" data-edu="${id}">
    <input type="text" placeholder="Year (e.g. 2019 – 2023)" oninput="renderEducation()" data-field="year" data-edu="${id}">
  `;

  document.getElementById("education-list").appendChild(card);
  renderEducation();
}

function removeEducation(id) {
  document.getElementById(`edu-card-${id}`).remove();
  renderEducation();
}

function renderEducation() {
  const list = document.getElementById("p-education");
  list.innerHTML = "";

  const ids = [...new Set(
    [...document.querySelectorAll("[data-edu]")].map((el) => el.dataset.edu)
  )];

  ids.forEach((id) => {
    const get = (field) =>
      document.querySelector(`[data-edu="${id}"][data-field="${field}"]`)?.value || "";

    const degree = get("degree");
    const school = get("school");
    const year   = get("year");

    if (!degree && !school) return;

    const entry = document.createElement("div");
    entry.className = "preview-entry";
    entry.innerHTML = `
      <div class="entry-title">${escapeHTML(degree)}</div>
      <div class="entry-sub">${escapeHTML(school)}</div>
      <div class="entry-date">${escapeHTML(year)}</div>
    `;
    list.appendChild(entry);
  });

  hideEmptySections();
}

/* =========================================================
   HIDE EMPTY SECTIONS
   ========================================================= */
function hideEmptySections() {
  const toggle = (sectionId, hasContent) => {
    document.getElementById(sectionId).style.display = hasContent ? "block" : "none";
  };

  toggle("summary-section",    document.getElementById("summary").value.trim() !== "");
  toggle("skills-section",     document.getElementById("skills").value.trim() !== "");
  toggle("experience-section", document.getElementById("p-experience").children.length > 0);
  toggle("education-section",  document.getElementById("p-education").children.length > 0);
}

/* =========================================================
   PDF DOWNLOAD
   ========================================================= */
function downloadPDF() {
  const element = document.getElementById("preview");
  const name = document.getElementById("name").value.trim() || "resume";

  const options = {
    margin: 0.5,
    filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(options).from(element).save();
}

/* =========================================================
   HELPERS
   ========================================================= */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Initialize ---------- */
window.addEventListener("DOMContentLoaded", () => {
  updateSimple();
  updateContact();
  hideEmptySections();
});
