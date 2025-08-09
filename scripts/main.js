
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));

// Return the most recent input element (active prompt)
function getCurrentInputElement() {
  const inputs = document.querySelectorAll(".type input");
  return inputs.length ? inputs[inputs.length - 1] : null;
}

// Error handling for missing elements
function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
  }
  return element;
}

// Command history
let commandHistory = [];
let historyIndex = -1;

// GitHub repositories data
const githubRepos = [
  { name: "verkkosivu", description: "Portfolio website", language: "CSS", url: "https://github.com/Teyo1/verkkosivu" },
  { name: "hash-type-aggregator", description: "Hash type identification tool", language: "Python", url: "https://github.com/Teyo1/hash-type-aggregator" },
  { name: "All-Scripts", description: "Personal scripts collection", language: "PowerShell", url: "https://github.com/Teyo1/All-Scripts" },
  { name: "RedTeamingStuff", description: "Red teaming portfolio", language: "Python", url: "https://github.com/Teyo1/RedTeamingStuff" },
  { name: "hammasStatus", description: "Dental status app", language: "JavaScript", url: "https://github.com/Teyo1/hammasStatus" },
  { name: "C--hommat", description: "C# projects", language: "C#", url: "https://github.com/Teyo1/C--hommat" },
  { name: "wazuh-SIEM", description: "Wazuh SIEM configuration", language: "Various", url: "https://github.com/Teyo1/wazuh-SIEM" }
];

// Available commands
const commands = {
  'help': {
    description: 'näyttää komennot',
    execute: () => {
      createCode("project -a", "täällä on kaikenlaisia projekteja ja kyberjuttuja");
      createCode("whois -t", "kerron itsestäni");
      createCode("social -a", "sosiaaliset verkostot yms");
      createCode("skills", "osaamiset ja teknologiat");
      createCode("ls", "listaa projektit");
      createCode("cat [file]", "näyttää tiedoston sisällön");
      createCode("date", "näyttää päivämäärän ja ajan");
      createCode("weather", "näyttää säätiedot");

      createCode("clear", "Tyhjennä terminaali");
      createCode("PGP", "julkinen avain");
      createCode("history", "komentohistoria");
    }
  },
  'project -a': {
    description: 'linkkaa projekteja',
    execute: () => {
      createText("<a href='https://github.com/teyo1' target='_blank' rel='noopener noreferrer'><i class='fab fa-github white'></i> github.com/teyo1</a>")
      createText("<a href='showcase/index.html' target='_blank'><i class='fas fa-star white'></i> Portfolio Showcase</a>")
      createText("<a href='secpriv/index.html' target='_blank'><i class='fas fa-shield-alt white'></i> Security & Privacy Projects</a>")
      createText("<a href='PGP/index.html' target='_blank'><i class='fas fa-key white'></i> PGP Public Key</a>")
      createText("<a href='project/hammasstatus/hammas.html' target='_blank'><i class='fab fa-github white'></i> hammasprojekti</a>")
    }
  },
  'whois -t': {
    description: 'kenestä on kyse',
    execute: () => {
      createText("Hei, olen Teijo")
      createText("Opiskelen Insinööriksi Metropolia AMK:ssa, suuntaudun tietoturvaan ja tietoverkkoihin. Olen kiinnostunut oppimaan uutta ja teen erilaisia projekteja vapaa-ajalla. Tällä hetkellä kehittelen transformer-mallia salasanalistojen tekoon, malli kehittää itseään jatkuvasti.")
    }
  },
  'social -a': {
    description: 'linkkaa LinkedIn-profiilin ja GitHubin',
    execute: () => {
      createText("<a href='https://github.com/teyo1' target='_blank' rel='noopener noreferrer'><i class='fab fa-github white'></i> github.com/teyo1</a>")
      createText("<a href='https://www.linkedin.com/in/teijoraiskio/' target='_blank' rel='noopener noreferrer'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/teijoraiskio</a>")
      createText("<a href='https://tryhackme.com/p/Tejjjo' target='_blank' rel='noopener noreferrer'><i class='fas fa-terminal white'></i> TryHackMe</a>")
      createText("<a href='https://play.316ctf.com/users/1127' target='_blank' rel='noopener noreferrer'><i class='fas fa-flag white'></i> 316CTF</a>")
    }
  },
  'PGP': {
    description: 'julkinen avain',
    execute: () => {
      createText('Siitä linkkiä: <a href="PGP/index.html" target="_blank">PGP Key</a>');
    }
  },
  'secpriv': {
    description: 'security & privacy projects',
    execute: () => {
      createText('🔐 Avaamassa Security & Privacy projekteja...');
      setTimeout(() => {
        window.open('secpriv/index.html', '_blank');
      }, 500);
    }
  },
  'clear': {
    description: 'tyhjentää terminaalin',
    execute: () => {
      document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
      document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
      document.querySelectorAll(".type").forEach(e => e.parentNode.removeChild(e));
    }
  },
  'ls': {
    description: 'listaa projektit',
    execute: () => {
      createText("📁 <span class='blue'>projects/</span>");
      createText("  ├── <a href='showcase/index.html' target='_blank'>showcase/</a>");
      createText("  ├── <a href='secpriv/index.html' target='_blank'>security-privacy/</a>");
      createText("  ├── <a href='PGP/index.html' target='_blank'>pgp-key/</a>");
      createText("  ├── <a href='project/hammasstatus/hammas.html' target='_blank'>hammasstatus/</a>");
      createText("  └── <a href='https://github.com/teyo1' target='_blank' rel='noopener noreferrer'>github/</a>");
    }
  },
  'repos': {
    description: 'listaa GitHub repositoryt',
    execute: () => {
      createText("🔗 <span class='blue'>GitHub Repositoryt:</span>");
      githubRepos.forEach(repo => {
        createText(`  📦 <a href='${repo.url}' target='_blank' rel='noopener noreferrer'>${repo.name}</a> (${repo.language})`);
        createText(`     └── ${repo.description}`);
        if (repo.name === 'All-Scripts') {
          createText("     └── <a href='https://teyo1.github.io/All-Scripts/docs/' target='_blank' rel='noopener noreferrer'>Docs (GitHub Pages)</a>");
          createText("     └── <a href='https://github.com/Teyo1/All-Scripts/tree/main/Decoding' target='_blank' rel='noopener noreferrer'>Decoding</a>");
          createText("     └── <a href='https://github.com/Teyo1/All-Scripts/tree/main/Wordlist-Scripts' target='_blank' rel='noopener noreferrer'>Wordlist-Expander</a>");
        }
      });
    }
  },
  'skills': {
    description: 'osaamiset ja teknologiat',
    execute: () => {
      createText("🔒 <span class='blue'>Tietoturva osaaminen:</span>");
      createText("  • SIEM (Wazuh)");
      createText("  • Verkkojen turvallisuus (FortiGate)");
      createText("  • Pentest/Redteaming (Metasploit, Port Scanning, OSINT)");
      createText("  • Social Engineering (SET, Google Dorking)");
      createText("");
      createText("💻 <span class='blue'>Tekninen osaaminen:</span>");
      createText("  • Bash, Zsh");
      createText("  • Linux-hallinta");
      createText("  • Laitteisto & Virtualisointi");
      createText("  • ML-koulutus (Transformer-mallit salasanan murtamiseen)");
    }
  },
  'date': {
    description: 'näyttää päivämäärän ja ajan',
    execute: () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      createText(`📅 ${now.toLocaleDateString('fi-FI', options)}`);
    }
  },
  'weather': {
    description: 'näyttää säätiedot',
    execute: async () => {
      createText("🌤️  <span class='blue'>Fetching weather data...</span>");
      try {
        // Try to get weather for Vaasa first, then Seinäjoki
        const cities = ['Vaasa', 'Seinäjoki'];
        let weatherData = null;
        
        for (const city of cities) {
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},FI&appid=8271593981cb11d7c9aa0c41f33248a2&units=metric`);
            if (response.ok) {
              weatherData = await response.json();
              break;
            }
          } catch (error) {
            continue;
          }
        }
        
        if (weatherData) {
          const city = weatherData.name;
          const temp = Math.round(weatherData.main.temp);
          const description = weatherData.weather[0].description;
          const humidity = weatherData.main.humidity;
          const windSpeed = Math.round(weatherData.wind.speed * 3.6); // Convert to km/h
          
          // Finnish weather descriptions
          const weatherTranslations = {
            'clear sky': 'selkeää',
            'few clouds': 'harvinaisia pilviä',
            'scattered clouds': 'hajanaisia pilviä',
            'broken clouds': 'puolipilvistä',
            'overcast clouds': 'pilvistä',
            'light rain': 'kevyttä sadetta',
            'moderate rain': 'kohtalaista sadetta',
            'heavy rain': 'voimakasta sadetta',
            'light snow': 'kevyttä lunta',
            'moderate snow': 'kohtalaista lunta',
            'heavy snow': 'voimakasta lunta',
            'mist': 'sumua',
            'fog': 'sumua',
            'haze': 'utua',
            'thunderstorm': 'ukkosta',
            'drizzle': 'tihkua'
          };
          
          const finnishDescription = weatherTranslations[description.toLowerCase()] || description;
          
          createText(`🌤️  <span class='blue'>${city} Sää:</span>`);
          createText(`  Lämpötila: ${temp}°C`);
          createText(`  Sää: ${finnishDescription}`);
          createText(`  Kosteus: ${humidity}%`);
          createText(`  Tuuli: ${windSpeed} km/h`);
        } else {
          createText("🌤️  <span class='blue'>Sääpalvelu ei saatavilla</span>");
          createText("  Säädataa ei saada haettua tällä hetkellä.");
          createText("  Yritä myöhemmin uudelleen.");
        }
      } catch (error) {
        createText("🌤️  <span class='blue'>Sääpalvelun virhe</span>");
        createText("  Verkkovirhe tai palvelu ei saatavilla.");
        createText("  Tarkista yhteys ja yritä uudelleen.");
      }
    }
  },

  'history': {
    description: 'komentohistoria',
    execute: () => {
      if (commandHistory.length === 0) {
        createText("Ei komentoja historiassa vielä.");
        return;
      }
      commandHistory.forEach((cmd, index) => {
        createText(`${index + 1}  ${cmd}`);
      });
    }
  },



  'showcase': {
    description: 'portfolio showcase',
    execute: () => {
      createText('🎯 Avaamassa portfolio showcasea...');
      setTimeout(() => {
        window.open('showcase/index.html', '_blank');
      }, 500);
    }
  },



  'exit': {
    description: 'sulkee terminaalin',
    execute: () => {
      createText('Suljetaan terminaali...');
      setTimeout(() => {
        window.close();
        // Fallback if window.close() doesn't work
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; color: #00ff00; font-family: monospace;">Terminaali suljettu. Sulje tämä välilehti manuaalisesti.</div>';
      }, 1500);
    }
  },


};

// Auto-completion function
function getAutoComplete(input) {
  const partial = input.toLowerCase();
  const matches = Object.keys(commands).filter(cmd => 
    cmd.toLowerCase().startsWith(partial)
  );
  return matches.length === 1 ? matches[0] : null;
}

app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
    getInputValue();
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("keydown", function(event) {
  const input = getCurrentInputElement();
  if (!input) return;

  // Handle arrow keys for command history
  if (event.key === "ArrowUp") {
    event.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[commandHistory.length - 1 - historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[commandHistory.length - 1 - historyIndex];
    } else if (historyIndex === 0) {
      historyIndex = -1;
      input.value = "";
    }
  } else if (event.key === "Tab") {
    event.preventDefault();
    const completion = getAutoComplete(input.value);
    if (completion) {
      input.value = completion;
    }
  }
});

app.addEventListener("click", function(event){
  const input = getCurrentInputElement();
  if (input) input.focus();
})

async function open_terminal(){
  await typeWriter("Welcome to Teijo's Terminal", 50);
  await delay(700);
  await typeWriter("Starting the server...", 50);
  await delay(1500);
  await typeWriter("Valmis...", 50);
 
  createCode("whois -t", "kenestä on kyse");
  createCode("showcase", "portfolio showcase");
  createCode("project -a", "linkkaa projekteja");
  createCode("social -a", "linkkaa LinkedIn-profiilin ja GitHubin");
  createCode("skills", "osaamiset ja teknologiat");
  createCode("repos", "GitHub repositoryt");

        createCode("PGP", "julkinen avain");
      createCode("clear", "tyhjentää terminaalin");
      createCode("help", "näyttää komennot");

  createCode("exit", "sulkee terminaalin");
  await delay(500);
  new_line();
}

async function typeWriter(text, speed = 50) {
  const p = document.createElement("p");
  p.style.color = "#5AD786";
  app.appendChild(p);
  
  for (let i = 0; i < text.length; i++) {
    p.textContent += text.charAt(i);
    await delay(speed);
  }
}

function new_line(){
  const p = document.createElement("p");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  p.setAttribute("class", "path")
  span2.textContent = " root@kompuutteri";
  p.appendChild(span1);
  p.appendChild(span2);
  app.appendChild(p);
  const div = document.createElement("div");
  div.setAttribute("class", "type")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const input = document.createElement("input");
  div.appendChild(i);
  div.appendChild(input);
  app.appendChild(div);
  input.focus();
  
  // Reset history index when new line is created
  historyIndex = -1;
}

function removeInput(){
  const types = document.querySelectorAll(".type");
  if (types.length) {
    const last = types[types.length - 1];
    last.parentNode.removeChild(last);
  }
}

async function getInputValue(){
  const inputEl = getCurrentInputElement();
  const value = inputEl ? inputEl.value.trim() : "";
  
  // Add to command history if not empty
  if (value && !commandHistory.includes(value)) {
    commandHistory.push(value);
  }
  
  if (value === "") {
    // Ignore empty input; no output section
    return;
  }
  
  // Check if command exists
  if (commands[value]) {
    trueValue(value);
    if (value === 'weather') {
      await commands[value].execute();
    } else {
      commands[value].execute();
    }
  } else if (value.startsWith("cat ")) {
    const filename = value.substring(4);
    trueValue(value);
    if (filename === "about.txt") {
      createText("Teijo Raiskio");
      createText("Cybersecurity Student");
      createText("Passionate about security and technology");
    } else if (filename === "skills.txt") {
      createText("Cybersecurity: SIEM, Network Security, Penetration Testing");
      createText("Programming: Python, JavaScript, Bash");
      createText("Tools: Wazuh, Splunk, Docker, Git");
    } else {
      createErrorText(`cat: ${filename}: No such file or directory`);
    }
  } else {
    falseValue(value);
    createErrorText(`Command not found: ${value}. Type 'help' for available commands.`);
  }
}

function trueValue(value){
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "sucess")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function falseValue(value){
  const div = document.createElement("section");
  div.setAttribute("class", "type2")
  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-angle-right icone error")
  const mensagem = document.createElement("h2");
  mensagem.setAttribute("class", "error")
  mensagem.textContent = `${value}`;
  div.appendChild(i);
  div.appendChild(mensagem);
  app.appendChild(div);
}

function createText(text, classname){
  const p = document.createElement("p");
  p.innerHTML = text;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML = `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerText = text;
  app.appendChild(p);
}

open_terminal();
