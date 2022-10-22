//VARIÁVEIS

//valores
let passivevalue = 0;
let clickvalue = 1;
let totalscore = 0;
let timermin = 15;
let timersec = 0;

//custos
let passivecost = 15;
let clickcost = 20;

//elementos HTML
const passivecosttext = document.getElementById("passiveCost");
const passiveupgrade = document.getElementById("passiveUp");
const clickcosttext = document.getElementById("clickCost");
const clickupgrade = document.getElementById("clickUp");
const timertext = document.getElementById("timerText");
const main = document.getElementById("mainButton");
let gnomebutton;
let gnome;

//audio
const gnomed = new Audio("SFX/gnomed.mp3");
const clicksound = new Audio("SFX/click.mp3");
const clickerrorsound = new Audio("SFX/clickerror.mp3");

//intervalos
let gnomespawninterval;

//textos
text = [["Upgrade Click", "Cost: ", "Upgrade Income", "Gamble with Gnome", "Cost: EVERYTHING", "Ascend"], ["Melhorar Clique", "Custo: ", "Melhorar Renda", "Apostar com Gnomo", "Custo: TUDO", "Ascender"]];



//RETORNAR VARIÁVEIS DO CACHE

//valores
if (!localStorage.getItem("language")) {
    language = 0;
} else {
    language = parseInt(localStorage.getItem("language"))
}



//FUNÇÕES
function updateText(element, text) {
    element.innerHTML = text.toString();
}

function timer() {
    if (timersec <= 0) {
        timermin -= 1;
        timersec = 59;
    } else {
        timersec -= 1;
    }

    if (timermin < 10) {
        if (timersec < 10) {
            updateText(timertext, "0" + timermin + ":" + "0" + timersec);
        } else {
            updateText(timertext, "0" + timermin + ":" + timersec);
        }
    } else {
        if (timersec < 10) {
            updateText(timertext, timermin + ":" + "0" + timersec);
        } else {
            updateText(timertext, timermin + ":" + timersec);
        }
    }

    if (timermin == 0 && timersec == 0) {
        document.getElementById("scene1").className = "disabled";
        document.getElementById("finalscore").innerText = totalscore;
        document.getElementById("scene2").className = "main crimsontext";
        document.getElementById("scene1").remove();
        document.querySelector("script").remove();
    }
}

function click() {
    clicksound.play();
    totalscore += clickvalue;
    updateText(main, totalscore);
}

function income() {
    totalscore += passivevalue;
    updateText(main, totalscore);
}

function upgradeClick() {
    if (totalscore >= clickcost) {
        clicksound.play();
        totalscore -= clickcost;
        clickcost = Math.ceil(clickcost * 1.241);
        clickvalue = Math.ceil(clickvalue * 1.19);
        updateText(main, totalscore);
        updateText(clickupgrade, "Upgrade Click" + "<br>" + "+" + clickvalue);
        updateText(clickcosttext, "Cost: " + clickcost);
    } else {
        clickerrorsound.play();
    }
}

function upgradePassive() {
    if (totalscore >= passivecost) {
        clicksound.play();
        if (passivevalue == 0) {
            totalscore -= passivecost;
            passivecost = Math.ceil(passivecost * 1.23);
            passivevalue = 1;
            updateText(main, totalscore);
            updateText(passiveupgrade, "Upgrade Income" + "<br>" + "+" + passivevalue);
            updateText(passivecosttext, "Cost: " + passivecost);
        } else {
            totalscore -= passivecost;
            passivecost = Math.ceil(passivecost * 1.23);
            passivevalue = Math.ceil(passivevalue * 1.242);
            updateText(main, totalscore);
            updateText(passiveupgrade, "Upgrade Income" + "<br>" + "+" + passivevalue);
            updateText(passivecosttext, "Cost: " + passivecost);
        }
    } else {
        clickerrorsound.play();
    }
}

function gnomeButtonClick() {
    if (Math.ceil(Math.random() * 100) >= 67) {
        clicksound.play();
        totalscore += Math.ceil(totalscore / 3);
    } else {
        gnomed.play();
        totalscore -= Math.ceil(totalscore / 3);
    }
    updateText(main, totalscore);
}

function gnomeClick() {
    const newsubpanel = document.createElement("div");
    newsubpanel.className = "subpanel crimsontext";
    document.querySelector(".buttons").appendChild(newsubpanel);

    document.getElementById("gnome").remove();
    const gnometext = document.createElement("p")
    gnometext.innerText = ".";
    gnometext.style.color = "black";
    newsubpanel.appendChild(gnometext);

    gnomebutton = document.createElement("button");
    gnomebutton.id = "gnomeButton";
    newsubpanel.appendChild(gnomebutton);
    gnomebutton.addEventListener("click", () => { gnomeButtonClick() });

    setInterval("updateText(gnomebutton, text[language][3] + '<br>' + '±' + Math.ceil(totalscore/3))", 16.66);
    localStorage.setItem("gnomespawned", true);
}

function spawnGnome() {
    if (Math.ceil(Math.random() * 100) >= 67) {
        if (!document.getElementById("gnome") && !document.getElementById("gnomeButton")) {
            gnome = document.createElement("div");
            gnome.id = "gnome";
            document.getElementById("scene1").appendChild(gnome);
            gnome.addEventListener("click", () => { gnomeClick() });
        } else {
            clearInterval(gnomespawninterval);
        }
    } else {
        return;
    }
}

function changeLanguage() {
    language++
    if (language >= languages.length) {
        language = 0;
    }
    localStorage.setItem("language", language);

    updateText(languagebutton, languages[language]);
    updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue);
    updateText(clickcosttext, text[language][1] + clickcost);
    updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue);
    updateText(passivecosttext, text[language][1] + passivecost);
}



//RUNTIME

//caso não tenha um idioma selecionado, seleciona inglês
if (language == null) {
    language = 0;
}

//adiciona eventos aos botões
main.addEventListener("click", () => { click() });
clickupgrade.addEventListener("click", () => { upgradeClick() });
passiveupgrade.addEventListener("click", () => { upgradePassive() });

//atualiza os textos pra ficar compatível com as variaveis do local storage
updateText(main, totalscore);
updateText(passivecosttext, text[language][1] + passivecost);
updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue);
updateText(clickcosttext, text[language][1] + clickcost);
updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue);

//aciona os intervalos
setInterval("timer()", 1000);
setInterval("income()", 1000);
gnomespawninterval = setInterval("spawnGnome()", 15000);
