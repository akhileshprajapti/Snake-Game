// game constant and variable
let inputDir = { x: 0, y: 0};
const foodSound = new Audio("food.mp3");
const gameOver = new Audio("gameover.mp3");
const snakeMove  = new Audio("move.mp3");
const backgroundMusic = new Audio("music.mp3");
let speed = 5;
let lastPointTime = 0;
let score = 0;
let snakeArr = [
    {x: 13 , y: 13}
];
let food = { x: 6, y: 9}

// Game function
function main(cTime) {
    window.requestAnimationFrame(main);
    // console.log(cTime);
    if((cTime - lastPointTime)/1000 < 1/speed){
        return;
    }
    lastPointTime = cTime
    gameEngien();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



function gameEngien(){
    //UPDATE THE GAME AND VARIABLE
    
    if(isCollide(snakeArr)){
        gameOver.play();
        backgroundMusic.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        // backgroundMusic.play();
        score = 0; 
    }
    // if we have eaten the food, increment the score and regenrate the food
    if(snakeArr[0].y ===food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = 'score = ' + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    } 

    // snake move
    for (let i = snakeArr.length - 2; i >= 0; i--) {
       snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // DISPLAY THE SNAKE
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;
       if(index === 0) {
        snakeElement.classList.add('head');

        }else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    })
    // DISPLAY THE FOOD
   
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = food.y;
       snakeElement.style.gridColumnStart = food.x; 
        snakeElement.classList.add('food');
        board.appendChild(snakeElement);
}






// main logic is here
backgroundMusic.play();
// let hiScore = localStorage.getItem("hiScore");
// if(hiScore === null){
//     let hiScoreVal = 0;
//     localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
// }
// else {
//     hiScoreVal = JSON.parse(hiScore)
//     hiScoreBox.innerHTML = "HighScore = " + hiScore;
// }



window.requestAnimationFrame(main);
window.addEventListener('keydown' , e =>{
    inputDir = { x: 0, y:1 }; // start game
    snakeMove.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})