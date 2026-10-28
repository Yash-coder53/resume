* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: #eef2f7;
  color: #1f2937;
  padding: 20px;
}

.app-header {
  text-align: center;
  margin-bottom: 25px;
}

.app-header h1 {
  font-size: 2rem;
  color: #1e3a8a;
}

.container {
  display: flex;
  gap: 25px;
  max-width: 1350px;
  margin: 0 auto;
  align-items: flex-start;
}

/* ============ FORM PANEL ============ */
.form-panel {
  flex: 1;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  max-height: 90vh;
  overflow-y: auto;
  min-width: 350px;
}

.form-panel h2 { margin-bottom: 15px; color: #1e3a8a; }

fieldset {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 18px;
}

legend { font-weight: 600; padding: 0 8px; color: #374151; }

input[type="text"], input[type="email"], textarea, select {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
}

input:focus, textarea:focus { outline: none; border-color: #2563eb; }

/* Settings Box Specific */
.settings-box { background: #f0fdf4; border-color: #bbf7d0; }
.settings-box label { display: block; font-size: 0.85rem; font-weight: 600; margin-top: 8px; color: #166534; }
.settings-box input[type="color"] { width: 100%; height: 40px; cursor: pointer; border: 1px solid #ccc; border-radius: 6px; padding: 2px; margin-top: 4px; }

.download-btn {
  width: 100%;
  padding: 14px;
  background: #1e3a8a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.download-btn:hover { background: #1e40af; }

.page-warning {
  display: none;
  color: #dc2626;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}

/* ============ PREVIEW PANEL ============ */
.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-panel h2 { margin-bottom: 15px; color: #1e3a8a; align-self: flex-start;}

/* A4 Paper Style */
.a4-page {
  background: #fff;
  width: 210mm;
  min-height: 297mm;
  padding: 15mm;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
  color: #000;
  font-size: 11pt;
  line-height: 1.4;
}

/* App Document Header (RESUME) */
.app-doc-header {
  text-align: center;
  font-size: 18pt;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
  border-bottom: 2px dashed #ccc;
  padding-bottom: 10px;
}

/* Resume Top Section */
.resume-top h1 { font-size: 24pt; text-transform: uppercase; margin-bottom: 5px; }
.contact-line { font-size: 11pt; margin-bottom: 15px; word-spacing: 2px; }
.contact-line span { margin: 0 4px; }

/* Blue Highlight Sections */
.section-block { margin-bottom: 15px; display: none; }

.section-header {
  background-color: #0000cd; /* Default Blue */
  color: #ffffff;
  font-size: 12pt;
  font-weight: bold;
  padding: 3px 8px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Lists inside sections */
.section-block ul { padding-left: 20px; margin-top: 5px; }
.section-block ul li { margin-bottom: 3px; }

/* Text lines inside sections */
.section-block p, .section-block div { margin-bottom: 4px; }

/* ============ RESPONSIVE ============ */
@media (max-width: 1100px) {
  .container { flex-direction: column; }
  .a4-page { width: 100%; min-height: auto; padding: 20px; }
}
