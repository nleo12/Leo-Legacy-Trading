/* ==========================================================
   LegacyTrades Academy — JavaScript Logic
   Nubia Leo
   IT 3203 Web Development — Prof. Tucker
   12/08/2025

   Purpose:
   This script handles quiz functionality, scoring logic,
   answer validation, feedback display & DOM updates.

   Functionality:
   • Stores correct answers in constant key
   • Auto-grades fill-in and multiple-choice questions
   • Displays PASS or FAIL with score breakdown
   • Reset button clears form and results section

   Future Improvements:
   • Add animations when results generate
   • Add timed quiz or randomize questions
   • Store quiz results using localStorage
   • Add accessibility improvements for screen readers

   File is externally linked in quiz.html.
========================================================== */
// main.js - nav + quiz logic for Leo Legacy Trading
document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksList = document.querySelector(".nav-links");

  if (navToggle && navLinksList) {
    navToggle.addEventListener("click", () => {
      navLinksList.classList.toggle("open");
    });

    navLinksList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinksList.classList.contains("open")) {
          navLinksList.classList.remove("open");
        }
      });
    });
  }

  // Quiz grading (only on quiz page)
  const form = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const resultsEl = document.getElementById("results");

  if (!form || !submitBtn || !resetBtn || !resultsEl) return;

  const ANSWERS = {
  q1: "momentum",
  q2: "B",
  q3: "B",
  q4: "B",
  q5: ["position", "stop", "journal"],
  q6: "C", // FOMO emotional trading
  q7: "A"  // higher highs & higher lows = uptrend
};

  function createBadge(text, bg) {
    const span = document.createElement("span");
    span.textContent = text;
    span.style.padding = "0.2rem 0.6rem";
    span.style.marginLeft = "0.4rem";
    span.style.borderRadius = "999px";
    span.style.fontWeight = "700";
    span.style.background = bg;
    span.style.color = "#111";
    return span;
  }

  function gradeQuiz() {
    resultsEl.innerHTML = "";
    let score = 0;
    const total = 7;

    const q1Value = (document.getElementById("q1").value || "").trim().toLowerCase();
    const q1Correct = q1Value === ANSWERS.q1.toLowerCase();
    if (q1Correct) score++;

    const q1Div = document.createElement("div");
    q1Div.innerHTML = "<strong>Q1 – RSI purpose</strong>";
    q1Div.appendChild(createBadge(q1Correct ? "Correct" : "Incorrect", q1Correct ? "#7CE39A" : "#FF9B9B"));
    q1Div.innerHTML += `<div class="small">Your answer: ${q1Value || "<em>none</em>"}</div>`;
    q1Div.innerHTML += `<div class="small">Correct: <strong>${ANSWERS.q1}</strong></div>`;
    resultsEl.appendChild(q1Div);

    function gradeRadio(name, label) {
      const nodes = document.getElementsByName(name);
      let selected = null;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
          selected = nodes[i].value;
          break;
        }
      }
      const correct = selected === ANSWERS[name];
      if (correct) score++;

      const div = document.createElement("div");
      div.innerHTML = `<strong>{label}</strong>`.replace("{label}", label);
      div.appendChild(createBadge(correct ? "Correct" : "Incorrect", correct ? "#7CE39A" : "#FF9B9B"));
      div.innerHTML += `<div class="small">Your answer: ${selected || "<em>none</em>"}</div>`;
      div.innerHTML += `<div class="small">Correct choice: <strong>${ANSWERS[name]}</strong></div>`;
      resultsEl.appendChild(div);
    }

    gradeRadio("q2", "Q2 – Moving average that weights recent prices more");
    gradeRadio("q3", "Q3 – Bearish reversal pattern at top of an uptrend");
    gradeRadio("q4", "Q4 – Conservative risk-per-trade %");
    gradeRadio("q6", "Q6 – Example of emotional trading behavior");
    gradeRadio("q7", "Q7 – Pattern that best describes an uptrend");

    const checked = Array.prototype.slice
      .call(document.querySelectorAll('input[name="q5"]:checked'))
      .map(el => el.value)
      .sort();
    const correctQ5 = ANSWERS.q5.slice().sort();
    const q5Correct = JSON.stringify(checked) === JSON.stringify(correctQ5);
    if (q5Correct) score++;

    const q5Div = document.createElement("div");
    q5Div.innerHTML = "<strong>Q5 – Risk management components</strong>";
    q5Div.appendChild(createBadge(q5Correct ? "Correct" : "Incorrect", q5Correct ? "#7CE39A" : "#FF9B9B"));
    q5Div.innerHTML += `<div class="small">Your choices: ${checked.length ? checked.join(", ") : "<em>none</em>"}</div>`;
    q5Div.innerHTML += `<div class="small">Correct: <strong>${correctQ5.join(", ")}</strong></div>`;
    resultsEl.appendChild(q5Div);

    const percent = Math.round((score / total) * 100);
    const summary = document.createElement("div");
    summary.style.marginTop = "1rem";
    summary.style.padding = ".8rem";
    summary.style.borderRadius = "10px";
    summary.style.border = "1px solid rgba(255,255,255,.12)";
    summary.innerHTML = `<strong>Overall Score: ${score}/${total} (${percent}%)</strong>`;
    summary.appendChild(createBadge(percent === 100 ? "PASS" : "REVIEW MATERIAL", percent === 100 ? "#7CE39A" : "#FF9B9B"));
    resultsEl.appendChild(summary);

    summary.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function resetQuiz() {
    form.reset();
    resultsEl.innerHTML = "";
  }

  submitBtn.addEventListener("click", gradeQuiz);
  resetBtn.addEventListener("click", resetQuiz);
});
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    flex-direction: column;
    padding: .6rem 0 .4rem;
    border-radius: 0 0 14px 14px;
    background: #120325;
    max-height: 0;
    overflow: hidden;
    transition: max-height .3s ease;
  }

  .nav-links.open {
    max-height: 320px;
  }

  .nav-links li {
    text-align: center;
  }
}
