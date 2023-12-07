let navigationMap = new Map()

function addToNavMap(index, contentTitle, file, navName){
    navigationMap.set(index, {
        contentTitle: contentTitle,
        file: file,
        navName: navName
    })
}

const mainPage = "Home"

let currentPage = ""

addToNavMap("Home", "Welcome to my blog! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "main-content.html", "Home Page")
addToNavMap("Page 1", "First page?!", "page1.html", "First Page")
addToNavMap("Form", "Form Page test", "form.html", "Form Page")

//Util
async function readFileContents(filePath) {
    return (await fetch(filePath)).text()
}

//Content
function setContentTitle(title){
    document.getElementById("content-title").innerHTML = title
}

function setContent(content){
    document.getElementById("content").innerHTML = content
}

async function setupMainTitle(){
    let caret = "_"
    let finalTitle = "# The [LincKode]"
    let tempString = ""

    for (let i = 0; i < finalTitle.length; i++) {
        setTimeout(() => {
            tempString += finalTitle[i];
            document.getElementById("main-title").innerHTML = tempString + caret;

            if (i === finalTitle.length - 1){
                setTimeout(() => {
                    document.getElementById("main-title").innerHTML = "# The [LincKode]<span class=\"caret_animation\">_</span>"
                }, 100)
            }

        }, 200 * i);
    }
}

//Navigation
function setupNavigationBar() {

    let content = ""

    navigationMap.forEach((value, key, map) => {

        const flag = (key === currentPage)

        content = content.concat(`
             <div class="nav-link">
                <a onclick="setPage('` + key + `')"> - ` + (flag? ` * `:``) + value.navName + `</a>
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

    setContentTitle(def.contentTitle)
    setContent(await readFileContents("content/" + def.file))


}

//On page load
window.onload = async function () {
    await setupMainTitle()
    await setPage(mainPage)
    setupNavigationBar()
    loadSwitch()
};




