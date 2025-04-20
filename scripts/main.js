
const app = document.querySelector("#app");
const delay = ms => new Promise(res => setTimeout(res, ms));
    
    
app.addEventListener("keypress", async function(event){
  if(event.key === "Enter"){
    await delay(150);
   getInputValue();
   
    removeInput();
    await delay(150);
    new_line();
  }
});

app.addEventListener("click", function(event){
  const input = document.querySelector("input");
  input.focus();
})


async function open_terminal(){
  createText("Welcome");
  await delay(700);
  createText("Starting the server...");
  await delay(1500);
  createText("Valmis...");
 
  createCode("whois -t", "kenestä on kyse");
  createCode("project -a", "linkkaa projekteja");
  createCode("social -a", "linkkaa LinkedIn-profiilin ja GitHubin");
  createCode("PGP", "julkinen avain");
  createCode("clear", "tyhjentää terminaalin");
  createCode("help", "näyttää komennot");
  await delay(500);
  new_line();
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
  
}

function removeInput(){
  const div = document.querySelector(".type");
  app.removeChild(div);
}

async function getInputValue(){
  
  const value = document.querySelector("input").value;
  if(value === "help"){
    trueValue(value);
    
    createCode("project -a", "täällä on kaikenlaisia projekteja ja kyberjuttuja");
    createCode("whois -t", "kerron itsestäni");
    createCode("social -a", "sosiaaliset verkostot yms");
    createCode("clear", "Tyhjennä terminaali");
    createCode("PGP", "julkinen avain");
    
  }
  else if(value === "project -a"){
    trueValue(value);
    createText("<a href='https://github.com/teyo1' target='_blank'><i class='fab fa-github white'></i> github.com/teyo1</a>")
    createText("<a href='/project/hammasstatus/hammas.html' target='_blank'><i class='fab fa-github white'></i> hammasprojekti</a>")
    createText("<a href='/project/redteaming/index.html' target='_blank'><i class='fab fa-github white'></i> Redteaming-juttuja</a>")
    createText("<a href='/project/blueteaming/index.html' target='_blank'><i class='fab fa-github white'></i> Blueteaming-juttuja</a>")
    createText("<a href='https://github.com/Teyo1/RedTeamingStuff/tree/main/Social-Engineering/Phishing-Server' target='_blank'><i class='fab fa-github white'></i> Tietojenkalastelu-harjoite (Oulun yliopiston kurssi)</a>")

  }
  else if(value === "whois -t"){
    trueValue(value);
    createText("Hei, olen nimeltäni Teijo")
    createText("Olen tietoturvaan suuntautunut IT-alan opiskelija, jolla on jo vankka perusosaaminen ja intohimo käytännön tekemiseen. Etsin harjoittelupaikkaa, jossa pääsen syventämään osaamistani ja kehittymään entistä paremmaksi kyberosaajaksi. <span class='blue'>SIEM, lokianalyysi, Shodan, Wazuh </span>mainitakseni muutamia osaamisalueita.")
  }
  else if(value === "social -a"){
    trueValue(value);
    createText("<a href='https://github.com/teyo1' target='_blank'><i class='fab fa-github white'></i> github.com/teyo1</a>")
    createText("<a href='https://www.linkedin.com/in/teijoraiskio/' target='_blank'><i class='fab fa-linkedin-in white'></i> linkedin.com/in/teijoraiskio</a>")
  }
  else if(value === "social"){
    trueValue(value);
    createText("Ethän vain tarkoittanut: social -a?")
  }
  else if(value === "PGP"){ 
    trueValue(value);
    createText('Siitä linkkiä: <a href="/PGP/index.html" target="_blank">PGP Key</a>');
  }
  else if(value === "pgp"){
    trueValue(value);
    createText("Tarkoititko: PGP?")
}
  else if(value === "clear"){
    document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
    document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
  }
  else{
    falseValue(value);
    createErrorText(`en ymmärrä: ${value}`)
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
  
  p.innerHTML =
  text
  ;
  app.appendChild(p);
}

function createCode(code, text){
  const p = document.createElement("p");
  p.setAttribute("class", "code");
  p.innerHTML =
 `${code} <br/><span class='text'> ${text} </span>`;
  app.appendChild(p);
}

function createErrorText(text) {
  const p = document.createElement("p");
  p.innerText = text;
  app.appendChild(p);
}

open_terminal();
