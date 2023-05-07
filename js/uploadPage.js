function submitForm() {
    let x = document.getElementById("mapfile");
    const mapfile = document.getElementById("mapfile").files[0];
    const rbfile = document.getElementById("rbfile").files[0];
    const bbfile = document.getElementById("bbfile").files[0];
    var ifLog = document.getElementById("log");

    loadMap(mapfile);
    loadBugFile(rbfile, "redBug");
    loadBugFile(bbfile, "blackBug");
}

function loadBugFile(bugFile, bugName) {
    let filePromise = new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsText(bugFile);
        reader.onload = () => {
            resolve(reader.result);
        }
    });
    Promise.resolve(filePromise).then(bugContent => {
        // read contents of files and convert them into the machine code the engine understands
        let bug = assemble(bugContent);
        window.alert(bug)
        localStorage.setItem(bugName, JSON.stringify(bug));
    });
}

function loadMap(mapfile) {
    let filePromise = new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsText(mapfile);
        reader.onload = () => {
            resolve(reader.result);
        }
    });
    Promise.resolve(filePromise).then(mapContent => {
        localStorage.setItem("map", mapContent.toString());
    });
}

function displayFileContents(mapfileContent) {
    // Store file contents in localStorage
    let x = document.getElementById("iterations").value;
    // Redirect to main.html
}