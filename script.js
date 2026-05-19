document.addEventListener("DOMContentLoaded", () => {
  const cli = document.getElementById("cli");
  const toggle = document.getElementById("cliToggle");
  const input = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const heroSection = document.querySelector(".hero");

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

  if (aboutSection && typingElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAboutAnimation();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(aboutSection);
  }

  /* CLI SAFETY CHECK */
  if (!cli || !toggle || !input || !output) {
    console.error("CLI elements missing in HTML");
    return;
  }

  output.innerHTML = `
Welcome to CLI Portfolio 

Type 'help' to see available commands
`;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    cli.classList.toggle("hidden");

    if (!cli.classList.contains("hidden")) {
      input.focus();
    }
  });

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

    output.innerHTML += `\n> ${cmd}\n`;

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
      (commands[cmd] || "Command not found. Type 'help'") + "\n";

    output.scrollTop = output.scrollHeight;

    input.value = "";
  });
});
