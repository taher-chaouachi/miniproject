let allPokemondata = window.sessionStorage.getItem('allPokemon');
let jsondatapokemondata = JSON.parse(allPokemondata)

const dati = document.querySelector('#data-poke')

async function pastePokemonAllData() {

    jsondatapokemondata.map((pokemonname) => {
        console.log(pokemonname)
        const listaNomiPokemonName = document.createElement("p");
        listaNomiPokemonName.id = "formatter";
        listaNomiPokemonName.innerHTML = pokemonname;
        dati.appendChild(listaNomiPokemonName);

    });
}

function modificadati() {
    window.location.replace("/src/pages/dashboard.html");
}

pastePokemonAllData()
let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

let x = "black",
    y = 2;

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let slider1 = document.getElementById("head");
output.innerHTML = slider.value;

slider.oninput = function () {
    y = this.value
    output.innerHTML = this.value;
}

slider1.oninput = function () {
    x = this.value
}

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function draw() {

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    let m = confirm("Vuoi riprovare la firma?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

// Define the function 
// to screenshot the div
// csnvastoimage
// csnvastoimage
// csnvastoimage

function takeshot() {
    let screenShotTarget = document.getElementById('constainerfilename');

    html2canvas(screenShotTarget).then((canvas) => {
        var canvas = canvas
        image = canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    })
}

// csnvastoimage
// csnvastoimage
// csnvastoimage
function save() {

    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

init();