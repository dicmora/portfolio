document.addEventListener("DOMContentLoaded", () => {
  const cli = document.getElementById("cli");
  const toggle = document.getElementById("cliToggle");
  const input = document.getElementById("cmdInput");
  const output = document.getElementById("output");
  const cursorItems = document.querySelectorAll(
    ".terminal-title, .typing-line",
  );
  cursorItems.forEach((item) => {
    item.addEventListener("click", () => {
      cursorItems.forEach((el) => el.classList.remove("cursor-active"));
      item.classList.add("cursor-active");
    });
  });
  // Safety check (prevents silent crashes)
  if (!cli || !toggle || !input || !output) {
    console.error("CLI elements missing in HTML");
    return;
  }

  output.innerHTML = `
Welcome to CLI Portfolio 

Type 'help' to see available commands
`;

  // OPEN / CLOSE CLI
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    cli.classList.toggle("hidden");

    if (!cli.classList.contains("hidden")) {
      input.focus();
    }
  });

  // COMMANDS
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

  // INPUT HANDLER
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const cmd = input.value.trim().toLowerCase();

    // show typed command
    output.innerHTML += `\n> ${cmd}\n`;

    // clear screen command
    if (cmd === "clear") {
      output.innerHTML = "";
      input.value = "";
      return;
    }

    // exit CLI
    if (cmd === "exit") {
      cli.classList.add("hidden");
      input.value = "";
      return;
    }

    // print result
    output.innerHTML +=
      (commands[cmd] || "Command not found. Type 'help'") + "\n";

    // auto-scroll to bottom
    output.scrollTop = output.scrollHeight;

    input.value = "";
  });
});
