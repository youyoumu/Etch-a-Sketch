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
    this.style.backgroundColor = "#363636";
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
    let newSize = prompt("Enter the new size (max 100)");
    if (newSize>100) {changeSize(100);}
    else {changeSize(newSize);}
}




