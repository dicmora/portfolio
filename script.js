document.addEventListener("DOMContentLoaded", () => {
  const cli = document.getElementById("cli");
  const toggle = document.getElementById("cliToggle");
  const input = document.getElementById("cmdInput");
  const output = document.getElementById("output");

  /* HERO TYPING ANIMATION */
  const heroTyping = document.getElementById("heroTyping");
  const statusLine = document.getElementById("statusLine");
  const loadedLine = document.getElementById("loadedLine");

  const heroText = ` 
  Building scalable applications with modern web technologies.
  Designing responsive user interfaces and scalable backend systems.
  Transforming ideas into real-world digital experiences.
  `;

  function typeHeroText() {
    let index = 0;

    setTimeout(() => {
      const typing = setInterval(() => {
        heroTyping.textContent += heroText.charAt(index);
        index++;

        if (index >= heroText.length) {
          clearInterval(typing);

          setTimeout(() => {
            statusLine.classList.remove("hidden-line");
          }, 500);

          setTimeout(() => {
            loadedLine.classList.remove("hidden-line");

            const loadingLines = document.getElementById("loadingLines");
            if (loadingLines) {
              loadingLines.remove();
            }
          }, 1000);
        }
      }, 45);
    }, 1600);
  }

  /* ABOUT SECTION TYPING */
  const aboutSection = document.querySelector(".about");

  const typingElements = document.querySelectorAll(
    ".about .terminal-title, .about .typing-line",
  );

  let hasTyped = false;

  function typeText(element, speed = 45) {
    return new Promise((resolve) => {
      const text = element.dataset.text;
      let index = 0;

      if (!text) {
        resolve();
        return;
      }

      element.textContent = "";
      element.classList.add("cursor-active");

      const typing = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;

        if (index >= text.length) {
          clearInterval(typing);
          element.classList.remove("cursor-active");
          resolve();
        }
      }, speed);
    });
  }

  async function startAboutAnimation() {
    if (hasTyped) return;

    hasTyped = true;
    aboutSection.classList.add("active");

    for (const element of typingElements) {
      await typeText(element, 45);
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    typingElements[typingElements.length - 1].classList.add("cursor-active");
  }

  async function initializePortfolio() {
    await runBootSequence();

    await startAboutAnimation();

    await wait(700);

    if (heroTyping && statusLine && loadedLine) {
      typeHeroText();
    }
  }

  /* CLI SAFETY CHECK */
  if (!cli || !toggle || !input || !output) {
    console.error("CLI elements missing in HTML");
    return;
  }

  output.innerHTML = `
Welcome to CLI Portfolio<br><br>
Type 'help' to see available commands<br><br>
`;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    cli.classList.toggle("hidden");

    if (!cli.classList.contains("hidden")) {
      input.focus();
    }
  });
  /* =====================================
     MATRIX LOADING SCREEN
  ===================================== */

  const matrixLoader = document.getElementById("matrixLoader");
  const matrixCanvas = document.getElementById("matrixCanvas");
  const matrixContext = matrixCanvas?.getContext("2d");

  document.body.classList.add("loading");

  let matrixAnimation;
  let matrixDrops = [];
  let matrixFontSize = 16;
  let matrixColumns = 0;

  const matrixCharacters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソ";

  function resizeMatrixCanvas() {
    if (!matrixCanvas || !matrixContext) return;

    const pixelRatio = window.devicePixelRatio || 1;

    matrixCanvas.width = window.innerWidth * pixelRatio;
    matrixCanvas.height = window.innerHeight * pixelRatio;

    matrixCanvas.style.width = `${window.innerWidth}px`;
    matrixCanvas.style.height = `${window.innerHeight}px`;

    matrixContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    matrixColumns = Math.floor(window.innerWidth / matrixFontSize);
    matrixDrops = Array(matrixColumns).fill(1);
  }

  function drawMatrixRain() {
    if (!matrixContext) return;

    matrixContext.fillStyle = "rgba(0, 0, 0, 0.08)";
    matrixContext.fillRect(0, 0, window.innerWidth, window.innerHeight);

    matrixContext.font = `${matrixFontSize}px "Courier New", monospace`;

    for (let column = 0; column < matrixDrops.length; column++) {
      const character =
        matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];

      const x = column * matrixFontSize;
      const y = matrixDrops[column] * matrixFontSize;

      // Occasional brighter leading character
      if (Math.random() > 0.96) {
        matrixContext.fillStyle = "#d5ffe5";
        matrixContext.shadowBlur = 12;
        matrixContext.shadowColor = "#00ff66";
      } else {
        matrixContext.fillStyle = "#00ff66";
        matrixContext.shadowBlur = 4;
        matrixContext.shadowColor = "#00ff66";
      }

      matrixContext.fillText(character, x, y);
      matrixContext.shadowBlur = 0;

      if (y > window.innerHeight && Math.random() > 0.975) {
        matrixDrops[column] = 0;
      }

      matrixDrops[column]++;
    }

    matrixAnimation = requestAnimationFrame(drawMatrixRain);
  }

  function wait(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  async function runBootSequence() {
    const bootLines = [
      document.getElementById("bootLine1"),
      document.getElementById("bootLine2"),
      document.getElementById("bootLine3"),
      document.getElementById("bootLine4"),
      document.getElementById("bootLine5"),
    ];

    const delays = [1000, 1500, 1500, 1200, 1200];

    for (let index = 0; index < bootLines.length; index++) {
      await wait(delays[index]);

      if (bootLines[index]) {
        bootLines[index].classList.add("visible");
      }
    }

    await wait(7000);

    matrixLoader?.classList.add("fade-out");
    document.body.classList.remove("loading");

    await wait(3000);

    cancelAnimationFrame(matrixAnimation);
    matrixLoader?.remove();
  }

  if (matrixCanvas && matrixContext) {
    resizeMatrixCanvas();
    drawMatrixRain();

    window.addEventListener("resize", resizeMatrixCanvas);
  }

  initializePortfolio();
  const commands = {
    help: `
Available commands:
- about
- skills
- projects
- contact
- clear
- exit
`,

    about: `
Dickson Morais
Full-Stack Software Engineer
React | Node.js | SQL | Oracle DBA
`,

    skills: `
JavaScript
React
Node.js
SQL
Oracle Database
`,

    projects: `
1. https://dailynews.myweeklynews.us/
2. https://wardrop.myweeklynews.us/
`,

    contact: `
Email: dicmora2@email.com
GitHub: github.com/dicmora
LinkedIn: linkedin.com/in/dicksonmorais
`,
  };

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const cmd = input.value.trim().toLowerCase();

    output.innerHTML += `<br>&gt; ${cmd}<br>`;

    if (cmd === "clear") {
      output.innerHTML = "";
      input.value = "";
      return;
    }

    if (cmd === "exit") {
      cli.classList.add("hidden");
      input.value = "";
      return;
    }

    output.innerHTML +=
      (commands[cmd] || "Command not found. Type 'help'").replace(
        /\n/g,
        "<br>",
      ) + "<br>";

    output.scrollTop = output.scrollHeight;

    input.value = "";
  });
});
