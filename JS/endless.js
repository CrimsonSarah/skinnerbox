//VARIÁVEIS

//valores
let ascensionbonus;
let gnomelost = 0;
let gnomewin = 0;
let passivevalue;
let passivefees;
let totalscore;
let clickvalue;
let clickfees;
let timermin;
let timersec;

//custos
let passivecost;
let clickcost;

//booleans
let ascensionspawned;
let gnomespawned;
let forcespawn;

//intervalos
let ascensionspawninterval;
let gnomespawninterval;

//elementos HTML
const languagebutton = document.getElementById("languageButton");
const passivecosttext = document.getElementById("passiveCost");
const passiveupgrade = document.getElementById("passiveUp");
const clickcosttext = document.getElementById("clickCost");
const clickupgrade = document.getElementById("clickUp");
const timertext = document.getElementById("timerText");
const main = document.getElementById("mainButton");
let ascensionbutton;
let ascensiontext;
let gnomebutton;
let gnome;

//audios
const clickerrorsound = new Audio("SFX/clickerror.mp3");
const ascensionsound = new Audio("SFX/ascension.mp3");
const clicksound = new Audio("SFX/click.mp3");
const gnomed = new Audio("SFX/gnomed.mp3");

//textos
text = [["Upgrade Click", "Cost: ", "Upgrade Income", "Gamble with the Gnome", "Cost: EVERYTHING", "Ascend", "Descend"] , ["Melhorar Clique", "Custo: ", "Melhorar Renda", "Apostar com o Gnomo", "Custo: TUDO", "Ascender", "Descender"]]


//RETORNAR VARIÁVEIS DO CACHE

//valores
if (!localStorage.getItem("ascensionbonus")) {
    ascensionbonus = 1;
} else {
    ascensionbonus = parseFloat(localStorage.getItem("ascensionbonus"));
}

if (!localStorage.getItem("passivevalue")) {
    passivevalue = 0;
} else {
    passivevalue = parseFloat(localStorage.getItem("passivevalue"));
}

if (!localStorage.getItem("passivefees")) {
    passivefees = 1.11;
} else {
    passivefees = parseFloat(localStorage.getItem("passivefees"));
}

if (!localStorage.getItem("clickvalue")) {
    clickvalue = 1;
} else {
    clickvalue = parseFloat(localStorage.getItem("clickvalue"));
}

if (!localStorage.getItem("clickfees")) {
    clickfees = 1.16;
} else {
    clickfees = parseFloat(localStorage.getItem("passivefees"));
}

if (!localStorage.getItem("totalscore")) {
    totalscore = 0;
} else {
    totalscore = parseFloat(localStorage.getItem("totalscore"))
}

if (!localStorage.getItem("timermin")) {
    timermin = 0;
} else {
    timermin = parseInt(localStorage.getItem("timermin"));
}

if (!localStorage.getItem("timersec")) {
    timersec = 0;
} else {
    timersec = parseInt(localStorage.getItem("timersec"))
}

if (!localStorage.getItem("language")) {
    language = 0;
} else {
    language = parseInt(localStorage.getItem("language"))
}

//custos
if (!localStorage.getItem("passivecost")) {
    passivecost = 10;
} else {
    passivecost = parseFloat(localStorage.getItem("passivecost"))
}

if (!localStorage.getItem("clickcost")) {
    clickcost = 15;
} else {
    clickcost = parseFloat(localStorage.getItem("clickcost"))
}

//booleans
if (!localStorage.getItem("gnomespawned")) {
    gnomespawned = false;
} else {
    gnomespawned = (localStorage.getItem("gnomespawned") === "true");
}

if (gnomespawned == true) {
    gnome = document.createElement("div");
    gnome.id = "gnome";
    document.getElementById("scene1").appendChild(gnome);
    gnomeClick();
}

if (!localStorage.getItem("ascensionspawned")) {
    ascensionspawned = false;
} else {
    ascensionspawned = (localStorage.getItem("ascensionspawned") === "true");
}

if (ascensionspawned == true) {
    forcespawn = true;
    spawnAscension();
    forcespawn = false;
}



//FUNÇÕES
function updateText(element, text) {
    element.innerHTML = text;
}

function timer() {
    if (timersec >= 59) {
        timermin += 1;
        timersec = 0;
    } else {
        timersec += 1;
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

    localStorage.setItem("timersec", timersec);
    localStorage.setItem("timermin", timermin);
}

function click() {
    clicksound.play();
    totalscore += clickvalue;
    updateText(main, totalscore.toFixed(2));
}

function income() {
    totalscore += passivevalue;
    updateText(main, totalscore.toFixed(2));

    localStorage.setItem("totalscore", totalscore);
}

function upgradeClick() {
    if (totalscore >= clickcost) {
        clicksound.play();
        totalscore -= clickcost;
        clickcost = clickcost * clickfees;
        clickvalue = clickvalue * 1.067 * ascensionbonus;
        updateText(main, totalscore.toFixed(2));
        updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue.toFixed(2));
        updateText(clickcosttext, text[language][1] + clickcost.toFixed(2));

        localStorage.setItem("clickcost", clickcost);
        localStorage.setItem("clickvalue", clickvalue);
    } else {
        clickerrorsound.play();
    }
}

function upgradePassive() {
    if (totalscore >= passivecost) {
        clicksound.play();
        if (passivevalue == 0) {
            totalscore -= passivecost;
            passivecost = passivecost * passivefees;
            passivevalue = 1 * ascensionbonus;
            updateText(main, totalscore.toFixed(2));
            updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
            updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));

            localStorage.setItem("passivecost", passivecost);
            localStorage.setItem("passivevalue", passivevalue);
        } else {
            totalscore -= passivecost;
            passivecost = passivecost * passivefees;
            passivevalue = passivevalue * 1.084 * ascensionbonus;
            updateText(main, totalscore.toFixed(2));
            updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
            updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));

            localStorage.setItem("passivecost", passivecost);
            localStorage.setItem("passivevalue", passivevalue);
        }
    } else {
        clickerrorsound.play();
    }
}

function gnomeButtonClick() {
    let chance = Math.ceil(Math.random() * 10 * ascensionbonus);

    if (chance >= (7 + gnomewin - gnomelost)) {
        clicksound.play();
        totalscore += totalscore / 3;
        gnomewin++;
    } else {
        gnomed.play();
        totalscore -= totalscore / 3;
        gnomelost++;
    }

    updateText(main, totalscore.toFixed(2));
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

    setInterval("updateText(gnomebutton, text[language][3] + '<br>' + '±' + (totalscore/3).toFixed(2))", 16.66);
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

function ascend() {
    ascensionsound.play();

    ascensionbonus += 0.01;
    passivevalue = 0;
    passivecost = 15;
    clickvalue = 1 * ascensionbonus;
    clickcost = 20;
    totalscore = 0;

    localStorage.setItem("ascensionbonus", ascensionbonus);
    localStorage.setItem("passivevalue", passivevalue);
    localStorage.setItem("passivecost", passivecost);
    localStorage.setItem("ascensionspawned", false);
    localStorage.setItem("clickvalue", clickvalue);
    localStorage.setItem("clickcost", clickcost);
    localStorage.setItem("totalscore", totalscore);

    updateText(main, totalscore.toFixed(2));
    updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue.toFixed(2));
    updateText(clickcosttext, text[language][1] + clickcost.toFixed(2));
    updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
    updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));

    document.querySelector(".descentpanel").remove();
    document.querySelector(".ascensionpanel").remove();
    ascensionspawninterval = setInterval("spawnAscension()", 1000);
}

function descend () {
    if (ascensionbonus > 0.01) {
        ascensionbonus -= 0.01;
        passivefees -= 0.01
        clickfees -= 0.01
    }

    passivevalue = 0;
    passivecost = 15;
    clickvalue = 1 * ascensionbonus;
    clickcost = 20;
    totalscore = 0;

    localStorage.setItem("ascensionbonus", ascensionbonus);
    localStorage.setItem("passivevalue", passivevalue);
    localStorage.setItem("passivefees", passivefees);
    localStorage.setItem("passivecost", passivecost);
    localStorage.setItem("ascensionspawned", false);
    localStorage.setItem("totalscore", totalscore);
    localStorage.setItem("clickvalue", clickvalue);
    localStorage.setItem("clickfees", clickfees);
    localStorage.setItem("clickcost", clickcost);

    updateText(main, totalscore.toFixed(2));
    updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue.toFixed(2));
    updateText(clickcosttext, text[language][1] + clickcost.toFixed(2));
    updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
    updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));

    document.querySelector(".descentpanel").remove();
    document.querySelector(".ascensionpanel").remove();
    ascensionspawninterval = setInterval("spawnAscension()", 1000);
}

function spawnAscension () {
    if (!document.getElementById("ascensionButton")) {
        if (totalscore >= 1e4 * ascensionbonus || forcespawn == true) {
            if (ascensionspawninterval) {
                clearInterval(ascensionspawninterval);
            }

            const newsubpanel = document.createElement("div");
            newsubpanel.className = "subpanel crimsontext ascensionpanel";
            document.querySelector(".buttons").appendChild(newsubpanel);

            ascensiontext = document.createElement("p")
            ascensiontext.innerText = text[language][4];
            newsubpanel.appendChild(ascensiontext);

            ascensionbutton = document.createElement("button");
            ascensionbutton.id = "ascensionButton";
            newsubpanel.appendChild(ascensionbutton);
            ascensionbutton.addEventListener("click", () => { ascend() });

            updateText(ascensionbutton, text[language][5]);



            const newsubpanel2 = document.createElement("div");
            newsubpanel2.className = "subpanel crimsontext descentpanel";
            document.querySelector(".buttons").appendChild(newsubpanel2);

            descenttext = document.createElement("p")
            descenttext.innerText = text[language][4];
            newsubpanel2.appendChild(descenttext);

            descentbutton = document.createElement("button");
            descentbutton.id = "descentButton";
            newsubpanel2.appendChild(descentbutton);
            descentbutton.addEventListener("click", () => { descend() });

            updateText(descentbutton, text[language][6]);



            localStorage.setItem("ascensionspawned", true);
        }
    }
}

function changeLanguage () {
    language++
    if (language >= languages.length) {
        language = 0;
    }
    localStorage.setItem("language", language);

    updateText(languagebutton, languages[language]);
    updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue.toFixed(2));
    updateText(clickcosttext, text[language][1] + clickcost.toFixed(2));
    updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
    updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));
    if (ascensionbutton != null) {
        updateText(descenttext, text[language][4]);
        updateText(ascensiontext, text[language][4]);
        updateText(descentbutton, text[language][6]);
        updateText(ascensionbutton, text[language][5]);
    }
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
updateText(main, totalscore.toFixed(2));
updateText(passivecosttext, text[language][1] + passivecost.toFixed(2));
updateText(passiveupgrade, text[language][2] + "<br>" + "+" + passivevalue.toFixed(2));
updateText(clickcosttext, text[language][1] + clickcost.toFixed(2));
updateText(clickupgrade, text[language][0] + "<br>" + "+" + clickvalue.toFixed(2));

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


//aciona os intervalos
setInterval("timer()", 1000);
setInterval("income()", 1000);
gnomespawninterval = setInterval("spawnGnome()", 15000);
ascensionspawninterval = setInterval("spawnAscension()", 1000);

