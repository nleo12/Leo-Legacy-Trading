// main.js - navigation toggle + quiz grading

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Quiz grading logic
  const ANSWERS = {
    q1: "momentum",
    q2: "B",
    q3: "B",
    q4: "B",
    q5: ["position", "stop", "journal"]
  };

  const form = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const resultsEl = document.getElementById("results");

  if (!form || !submitBtn || !resetBtn || !resultsEl) {
    return; // quiz not on this page
  }

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
    const total = 5;

    // Q1
    const q1Value = (document.getElementById("q1").value || "").trim().toLowerCase();
    const q1Correct = q1Value === ANSWERS.q1.toLowerCase();
    if (q1Correct) score++;
    const q1Div = document.createElement("div");
    q1Div.innerHTML = "<strong>Q1 – RSI purpose</strong>";
    q1Div.appendChild(createBadge(q1Correct ? "Correct" : "Incorrect", q1Correct ? "#7CE39A" : "#FF9B9B"));
    q1Div.innerHTML += `<div class="small">Your answer: ${q1Value || "<em>none</em>"}</div>`;
    q1Div.innerHTML += `<div class="small">Correct: <strong>${ANSWERS.q1}</strong></div>`;
    resultsEl.appendChild(q1Div);

    // Helper for radio questions
    function gradeRadio(name, label) {
      const nodes = document.getElementsByName(name);
      let selected = null;

      // forEach may not exist in some NodeList implementations
      if (nodes.forEach) {
        nodes.forEach(r => { if (r.checked) selected = r.value; });
      } else {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].checked) {
            selected = nodes[i].value;
            break;
          }
        }
      }

      const correct = selected === ANSWERS[name];
      if (correct) score++;
      const div = document.createElement("div");
      div.innerHTML = `<strong>${label}</strong>`;
      div.appendChild(createBadge(correct ? "Correct" : "Incorrect", correct ? "#7CE39A" : "#FF9B9B"));
      div.innerHTML += `<div class="small">Your answer: ${selected || "<em>none</em>"}</div>`;
      div.innerHTML += `<div class="small">Correct choice: <strong>${ANSWERS[name]}</strong></div>`;
      resultsEl.appendChild(div);
    }

    gradeRadio("q2", "Q2 – Moving average with more weight on recent prices");
    gradeRadio("q3", "Q3 – Bearish reversal candle at top of an uptrend");
    gradeRadio("q4", "Q4 – Conservative risk per trade");

    // Q5 multi-select
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

    summary.scrollIntoView({ behavior:"smooth", block:"center" });
  }

  function resetQuiz() {
    form.reset();
    resultsEl.innerHTML = "";
  }

  submitBtn.addEventListener("click", gradeQuiz);
  resetBtn.addEventListener("click", resetQuiz);
});
