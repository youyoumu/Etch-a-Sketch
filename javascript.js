let gridSize = 16;
let gridContainter = document.querySelector('#gridContainer');
let sizeButton = document.querySelector('#sizeButton');


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
    let R = getRandomNumber0255();
    let G = getRandomNumber0255();
    let B = getRandomNumber0255();
    //this.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    //this.style.backgroundColor = `rgba(0, 0, 0, 0.3)`;
    addOpacity(this);
}

function runRemoveGrid() {
    everyGrid.forEach(removeGrid);
}

function removeGrid(grid) {
    grid.remove();
}

sizeButton.addEventListener('click', changeSizeButton);

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

function getRandomNumber0255() {
    let number = Math.floor(Math.random() * 256);
    return number;
}

function addOpacity(grid) {
    let newOpacity = 0.3;
    let currentOpacity = grid.style.backgroundColor;
    if (currentOpacity === "") {
        grid.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
    }
    else {
        newOpacity = grid.style.backgroundColor;
        newOpacity = newOpacity.slice(14,17);
        newOpacity = parseFloat(newOpacity);
        if (newOpacity < 1.0) {newOpacity = newOpacity + 0.1}
        grid.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
    }
}



