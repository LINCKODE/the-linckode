
let toggle

function loadSwitch(){
    setupToggle()
    setTheme()
}

function setupToggle(){
    let val = localStorage.getItem("theme");
    if (val === null){
        toggle = true;
        saveToggle();
    }
    else {
        toggle = JSON.parse(val);
    }
}

function saveToggle() {
    localStorage.setItem("theme", toggle)
}

function setTheme(){

    let theme = document.getElementById('theme');
    theme.setAttribute('href', 'css/theme/' + (toggle ? 'light' : 'dark') + '-theme.css');
}

function handleThemeToggle(){
    toggle = !toggle
    saveToggle()
    setTheme()
}