//VARIÁVEIS

//textos
const languages = ["EN", "PT"];
let text = [["Speedrun <br> Mode", "Endless <br> Mode"] , ["Modo <br> Speedrun", "Modo <br> Sem <br> Fim"]];

//valores
let language;


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

function changeLanguage() {
    language++
    if (language >= languages.length) {
        language = 0;
    }
    localStorage.setItem("language", language);

    updateText(document.getElementById("languageButton"), languages[language]);
    updateText(document.getElementById("speedrunmode"), text[language][0]);
    updateText(document.getElementById("endlessmode"), text[language][1]);
}

function speedrunMode () {
    const menuscript = document.querySelector("script");
    document.getElementById("scene1").className = "";
    document.getElementById("mainmenu").className = "main disabled";
    const speedrunscript = document.createElement("script");
    speedrunscript.src = "JS/speedrun.js";
    document.querySelector("body").appendChild(speedrunscript);
    document.getElementById("mainmenu").remove();
    menuscript.remove();
}

function endlessMode () {
    const menuscript = document.querySelector("script");
    document.getElementById("scene1").className = "";
    document.getElementById("mainmenu").className = "main disabled";
    const endlessscript = document.createElement("script");
    endlessscript.src = "JS/endless.js";
    document.querySelector("body").appendChild(endlessscript);
    document.getElementById("mainmenu").remove();
    document.getElementById("scene2").remove();
    menuscript.remove();
}



//RUNTIME

//caso não tenha um idioma selecionado, seleciona inglês
if (language == null) {
    language = 0;
} else {
    updateText(document.getElementById("languageButton"), languages[language]);
    updateText(document.getElementById("speedrunmode"), text[language][0]);
    updateText(document.getElementById("endlessmode"), text[language][1]);
}

//adiciona eventos aos botões
document.getElementById("languageButton").addEventListener("click", () => { changeLanguage() });
document.getElementById("speedrunmode").addEventListener("click", () => { speedrunMode() });
document.getElementById("endlessmode").addEventListener("click", () => { endlessMode() });
