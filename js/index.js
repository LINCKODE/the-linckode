let navigationMap = new Map()

let animationMap = new Map

function addToNavMap(index, contentTitle, file, navName) {
    navigationMap.set(index, {
        contentTitle: contentTitle,
        file: file,
        navName: navName
    })
}

const mainPage = "Home"

let currentPage = ""

addToNavMap("Home", "Welcome to my blog! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "main-content.html", "Home Page")
addToNavMap("Page1", "First page?!", "page1.html", "First Page")
addToNavMap("Form", "Form Page test", "form.html", "Form Page")

//Util
async function readFileContents(filePath) {
    return (await fetch(filePath)).text()
}

//Content
function setContent(content) {
    document.getElementById("content").innerHTML = content
}

//Text animation
function animatedText(elementId, finalString, ms, caretAnimation) {

    let randomId = Math.floor(Math.random() * 10000)

    animationMap.set(elementId, finalString + randomId)

    let caret = "_"
    let tempString = ""

    for (let i = 0; i < finalString.length; i++) {
        setTimeout(() => {

            tempString += finalString[i];
            if (animationMap.get(elementId) !== finalString + randomId) return
            document.getElementById(elementId).innerHTML = tempString + caret;

            if (i === finalString.length - 1) {

                setTimeout(() => {
                    document.getElementById(elementId).innerHTML = finalString + (caretAnimation? '<span class="caret_animation">_</span>': '')
                }, 100)

            }
        }, ms * i);
    }
}

//Navigation
function setupNavigationBar() {

    let content = ""

    navigationMap.forEach((value, key, map) => {

        const flag = (key === currentPage)

        content = content.concat(`
             <div class="nav-link">
                <a onclick="setPage('` + key + `')"> - ` + (flag ? ` * ` : ``) + value.navName + `</a>
                <br>
            </div>
        `)

    })
    document.getElementById("navigation").innerHTML = content
}

async function setPage(page) {

    if (currentPage === page) return
    currentPage = page

    setupNavigationBar()

    const def = navigationMap.get(page);

    await animatedText("content-title", def.contentTitle, 50)

    setContent(await readFileContents("content/" + def.file))
}

//On page load
window.onload = async function () {

    //Load theme
    loadSwitch()

    //Main title
    animatedText("main-title", "# The [LincKode]", 200, true)

    //Setup initial page
    await setPage(mainPage)

    //setup navbar
    setupNavigationBar()
};
