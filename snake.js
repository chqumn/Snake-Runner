// Khai bao hang so
const Width = 20;
const Height = 20;
const Area = Height*Width;
const Up = -Width;
const Down = Width;
const Left = -1;
const Right = 1;

// Khai bao bien giao dien
let scoreDisplay = document.getElementById("score");
let board = document.getElementById("board");
let newGameButton = document.getElementById("newGame");
let upButton = document.getElementById("up");
let downButton = document.getElementById("down");
let leftButton = document.getElementById("left");
let rightButton = document.getElementById("right");
let keys = document.getElementById("keys");
let score_panel = document.getElementById("score_panel");

// Bien tro choi
let foodID;
let snake;
let score;
let currentMove;

// thoi gian nghi
// ~ 1:snake's speed
let interval = 150;

let runner;



// Cac ham cua game

// Hàm reset
function reset() {
    foodID = 0;
    snake = [202, 203, 204, 205, 206];
    score = 0;
    currentMove = Right;
}

// Ham hien diem
function displayScore() {
    scoreDisplay.innerHTML = score;

    console.log("Display scored!");
}

// Ham tao bang
function createBoard() {
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    for (let index = 0; index < Area; index++) {
        let square = document.createElement("div");
        square.className = "square";
        square.id = index;

        //square.innerHTML = index;

        board.appendChild(square);
    }
    console.log("Game started!");
}

// Ham new game
function newGame() {
    newGameButton.style.display = "none";
    score_panel.style.display = "block";
    showControlButtons();
    reset();
    createBoard();
    displayScore();
    createFood();
    FullSnakeDisplay();

    runner = setInterval(run, interval);
}

// Hàm ẩn nút điều khiển
function hideControlButtons() {
    upButton.style.display = "none";
    downButton.style.display = "none";
    leftButton.style.display = "none";
    rightButton.style.display = "none";
}

// Hàm hiện nút điều khiển
function showControlButtons() {
    upButton.style.display = "block";
    downButton.style.display = "block";
    leftButton.style.display = "block";
    rightButton.style.display = "block";
}

newGameButton.onclick = function() {
    newGame();
}

// Hàm GameOver
function gameOver() {
    clearInterval(runner);
    newGameButton.style.display = "block";
    showControlButtons();
}

//Hiển thị toàn bộ con rắn
//Dành cho lúc mới khởi tạo
function FullSnakeDisplay() {
    snake.forEach(chunk =>
        {
            document.getElementById(chunk).classList.add("snakeChunk");
        })
    //Phần đầu vẫn chưa được hiển thị đặc biệt
    let headValue = snake[snake.length - 1];
    document.getElementById(headValue).classList.remove("snakeChunk");
    //In đầu
    document.getElementById(headValue).classList.add("snakeHead");
}

// Tao do an
function createFood() {
    //xóa đồ ăn cũ đã ăn
    document.getElementById(foodID).classList.remove("food");

    //Random vị trí mới
    foodID = Math.floor(Math.random() * Area);
    //Kiểm tra vị trí có trùng thân rắn không
    while (snake.includes(foodID)) {
        foodID = Math.floor(Math.random() * Area);
    }
    
    document.getElementById(foodID).classList.add("food");

    console.log("Created food! ID: " + foodID);
}

// Snake display
function snakeDisplay() {
    //tìm đầu cũ
    let oldHeadValue = snake[snake.length - 2];
    //xóa đầu cũ
    document.getElementById(oldHeadValue).classList.remove("snakeHead");
    //thay đầu cũ bằng thân
    document.getElementById(oldHeadValue).classList.add("snakeChunk");

    //tìm đầu mới
    let headValue = snake[snake.length - 1];
    //hiện đầu
    document.getElementById(headValue).classList.add("snakeHead");
    switch (currentMove) {
        case Up:
            document.getElementById(headValue).style.transform = "rotate(270deg)";
            console.log("North facing!");
            break;
        case Down:
            document.getElementById(headValue).style.transform = "rotate(90deg)";
            console.log("South facing!");
            break;
        case Left:
            document.getElementById(headValue).style.transform = "rotate(180deg)";
            console.log("West facing!");
            break;
        case Right:
            document.getElementById(headValue).style.transform = "rotate(0deg)";
            console.log("East facing!");
            break;

        default:
            break;
    }

    console.log("Snake: " + snake);
}


// Move functions
function move() {
    let headValue = snake[snake.length - 1];

    //Up
    if ((headValue < Width) && (currentMove == Up))
    {
        headValue += Area - Width;
    }
    //Down
    else if ((headValue >= Area - Width) && (currentMove == Down)) {
        headValue -= Area - Width;
    }
    //Left
    else if ((headValue%Width == 0) && (currentMove == Left)) {
        headValue += Width - 1;
    }
    //Right
    else if (((headValue + 1)%Width == 0) && (currentMove == Right)) {
        headValue -= Width - 1;
    }
    //Trường hợp bình thường
    else {
        headValue += currentMove;
    }

    if (headValue == foodID) {
        eat();
    } else {
        //tìm đuôi
        let tailValue = snake[0];
        //xóa đuôi
        document.getElementById(tailValue).classList.remove('snakeChunk');
        snake.shift();
    }
    if (snake.includes(headValue)) {
        gameOver();
    }
    snake.push(headValue);
}

function run() {
    move();
    snakeDisplay();
}

function left(){
    if (currentMove == Right) {
        console.log("Can't move that way!");
    } else {
        currentMove = Left;

        console.log("Left moved!");
    }
}

leftButton.onclick = function() {
    left();
}

const right = function() {
    if (currentMove == Left) {
        console.log("Can't move that way!");
    } else {
        currentMove = Right;

        console.log("Right moved!");
    }
}

rightButton.onclick = function() {
    right();
}

function up() {
    if (currentMove == Down) {
        console.log("Can't move that way!");
    } else {
        currentMove = Up;

        console.log("Up moved!");

    }
}

upButton.onclick = function() {
    up();
}

function down() {
    if (currentMove == Up) {
        console.log("Can't move that way!");
    } else {
        currentMove = Down;

        console.log("Down moved!");
    }
}

downButton.onclick = function() {
    down();
}

function eat() {
    score++;
    displayScore();
    createFood();
}

//Nhận tín hiệu từ bàn phím
document.onkeydown = function (event) {
    switch (event.keyCode) {
       case 37:
          console.log("Left key is pressed.");
          left();
          break;
       case 38:
          console.log("Up key is pressed.");
          up();
          break;
       case 39:
          console.log("Right key is pressed.");
          right();
          break;
       case 40:
          console.log("Down key is pressed.");
          down();
          break;
    }
 };