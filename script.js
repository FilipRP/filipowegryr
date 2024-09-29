const gameBoard = document.getElementById("game-board");
const addBlockButton = document.getElementById("addBlock");
const clearBoardButton = document.getElementById("clearBoard");
const mineBlockButton = document.getElementById("mineBlock");
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const message = document.getElementById("message");
const inventoryText = document.getElementById("inventory-text");

let blocks = [];
let playerPosition = { x: 0, y: 0 };
let inventory = { grass: 0, dirt: 0, stone: 0 };

// Funkcja do tworzenia planszy
function createBoard() {
    for (let i = 0; i < 100; i++) { // 10x10 = 100 pól
        const block = document.createElement("div");
        block.classList.add("block");

        // Losowe przypisanie tekstury bloku
        const blockType = Math.floor(Math.random() * 3);
        switch (blockType) {
            case 0:
                block.style.backgroundImage = "url('images/grass.png')";
                block.dataset.type = 'grass';
                break;
            case 1:
                block.style.backgroundImage = "url('images/dirt.png')";
                block.dataset.type = 'dirt';
                break;
            case 2:
                block.style.backgroundImage = "url('images/stone.png')";
                block.dataset.type = 'stone';
                break;
        }

        block.addEventListener("click", () => {
            block.style.backgroundColor = getRandomColor();
        });
        gameBoard.appendChild(block);
        blocks.push(block);
    }
    placePlayer();
    updateInventory();
}

// Funkcja do umieszczania gracza
function placePlayer() {
    blocks[playerPosition.y * 10 + playerPosition.x].classList.add("player");
}

// Funkcja do usuwania gracza
function removePlayer() {
    blocks[playerPosition.y * 10 + playerPosition.x].classList.remove("player");
}

// Funkcja do dodawania bloku
addBlockButton.addEventListener("click", () => {
    const currentBlock = blocks[playerPosition.y * 10 + playerPosition.x];
    if (currentBlock.style.backgroundImage === '') {
        const blockType = prompt("Wybierz typ bloku: grass, dirt, stone");
        if (inventory[blockType] > 0) {
            currentBlock.style.backgroundImage = `url('images/${blockType}.png')`;
            inventory[blockType]--;
            updateInventory();
        } else {
            message.innerText = "Nie masz tego bloku w ekwipunku!";
        }
    } else {
        message.innerText = "Tutaj już jest blok!";
    }
});

// Funkcja do kopania bloku
mineBlockButton.addEventListener("click", () => {
    const currentBlock = blocks[playerPosition.y * 10 + playerPosition.x];
    if (currentBlock.style.backgroundImage) {
        const blockType = currentBlock.dataset.type;
        inventory[blockType]++;
        currentBlock.style.backgroundImage = '';
        updateInventory();
    } else {
        message.innerText = "Nie ma bloku do wykopania!";
    }
});

// Funkcja do czyszczenia planszy
clearBoardButton.addEventListener("click", () => {
    blocks.forEach(block => {
        block.style.backgroundImage = '';
    });
    inventory = { grass: 0, dirt: 0, stone: 0 }; // Resetuj ekwipunek
    updateInventory();
});

// Funkcja do generowania losowego koloru
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funkcja do aktualizacji ekwipunku
function updateInventory() {
    inventoryText.innerText = `Trawa: ${inventory.grass}, Ziemia: ${inventory.dirt}, Kamień: ${inventory.stone}`;
}

// Ruch gracza
upArrow.addEventListener("click", () => {
    if (playerPosition.y > 0) {
        removePlayer();
        playerPosition.y--;
        placePlayer();
    }
});

downArrow.addEventListener("click", () => {
    if (playerPosition.y < 9) {
        removePlayer();
        playerPosition.y++;
        placePlayer();
    }
});

leftArrow.addEventListener("click", () => {
    if (playerPosition.x > 0) {
        removePlayer();
        playerPosition.x--;
        placePlayer();
    }
});

rightArrow.addEventListener("click", () => {
    if (playerPosition.x < 9) {
        removePlayer();
        playerPosition.x++;
        placePlayer();
    }
});

// Inicjalizacja planszy
createBoard();
