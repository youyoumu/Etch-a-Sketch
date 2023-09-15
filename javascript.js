let gridSize = 16;
let gridContainter = document.querySelector('#gridContainer');
let sizeButton = document.querySelector('#sizeButton');
let clearButton = document.querySelector('#clearButton');
let modeNormal = document.querySelector('#modeNormal');
let modeRainbow = document.querySelector('#modeRainbow');
let modeEraser = document.querySelector('#modeEraser');
let mode = 1;
let opacity = 0.2;
let colorPicker = document.querySelector('#colorPicker');
let brushColor = "rgba(0, 0, 0,";


function createGrid(gridSize) {
    for (i = 0; i < gridSize*gridSize; i++) {
        let grid = document.createElement('div');
        grid.classList.add('grid');
        grid.style.width = `${600/gridSize}px`;
        grid.style.height = `${600/gridSize}px`;
        gridContainter.appendChild(grid);
    }
}

createGrid(gridSize);
let everyGrid = document.querySelectorAll('.grid');

everyGrid.forEach(detectHover); 

function detectHover(grid) {
    grid.addEventListener('mouseover', onClick)
}

function onClick() {
    if(mode === 1) {addOpacity(this);}
    else if (mode === 2) {addRainbow(this);}
    else {erase(this);};
}

function runRemoveGrid() {
    everyGrid.forEach(removeGrid);
}

function removeGrid(grid) {
    grid.remove();
}

sizeButton.addEventListener('click', changeSizeButton);
modeNormal.addEventListener('click', switchNormalMode);
modeRainbow.addEventListener('click', switchRainbowMode);
modeEraser.addEventListener('click', switchEraserMode);
clearButton.addEventListener('click', clear);
colorPicker.addEventListener('change', getColor);

function getColor(e) {
    let color = e.target.value;
    console.log(color);
    color = hexToRgbA(color);
    console.log(color);
    color = color.slice(0, color.length - 2);
    console.log(color);
    brushColor = color;
}



function changeSize(newSize) {
    runRemoveGrid();
    createGrid(newSize);
    everyGrid = document.querySelectorAll('.grid');
    everyGrid.forEach(detectHover); 
}

function changeSizeButton() {
    let newSize;
    newSize = prompt("Enter the new size (max 100)");
    newSize = parseInt(newSize);

    if(Number.isInteger(newSize)) {
        if(newSize > 0) {
            if (newSize>100) {changeSize(100);}
            else {changeSize(newSize);}
        }
        else {alert("not a valid number"); return;}
    }
    else {alert("not a valid number"); return;}
}

function switchNormalMode() {mode = 1;};
function switchRainbowMode() {mode = 2;};
function switchEraserMode() {mode = 0;};

function clear() {
    let everyGrid = document.querySelectorAll('.grid');
    everyGrid.forEach(grid => grid.style.backgroundColor = ""); 
}

function getRandomNumber0255() {
    let number = Math.floor(Math.random() * 256);
    return number;
}

function addOpacity(grid) {
    let newOpacity = opacity;
    let currentOpacity = grid.style.backgroundColor;
    if (currentOpacity === "") {
        grid.style.backgroundColor = `${brushColor} ${newOpacity})`;
    }
    else {
        newOpacity = grid.style.backgroundColor;
        console.log(newOpacity);
        newOpacity = newOpacity.slice(-3);
        newOpacity = parseFloat(newOpacity);
        console.log(newOpacity);
        if (newOpacity < 1.0) {newOpacity = newOpacity + opacity}
        grid.style.backgroundColor = `${brushColor} ${newOpacity})`;
    }
}

function addRainbow(grid) {
    let R = getRandomNumber0255();
    let G = getRandomNumber0255();
    let B = getRandomNumber0255();
    grid.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}

function erase(grid) {
    grid.style.backgroundColor = "";
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}
