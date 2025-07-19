const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")

let gameover=false
let foodX,foodY;
let snakeX=5,snakeY=10;
let snakebody=[];
let velocityX=0,velocityY=0;
let setIntervalId;
let score=0;

let highscore=Number(localStorage.getItem("high-score"))||0;
highScoreElement.innerText=`High Score: ${highscore}`;

const changeFoodPosition = () => {
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay....");
    location.reload();
}

const changeDirection =(e)=> {
    if(e.key==="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key==="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key==="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key==="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}

const initGame=()=>{
    if(gameover) return handleGameOver();
    let htmlMArkup=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    
    if(snakeX===foodX&&snakeY===foodY)
    {
        changeFoodPosition();
        snakebody.push([foodX,foodY]);
        console.log(snakebody);
        score++;

        if(score>highscore){
            highscore=score;
        localStorage.setItem("high-score",highscore);
        highScoreElement.innerText=`High Score: ${highscore}`;
        }
        scoreElement.innerText=`Score: ${score}`;
    }

    for(let i=snakebody.length-1;i>0;i--){
        snakebody[i]=snakebody[i-1];
    }

    snakebody[0]=[snakeX,snakeY];

    snakeX+=velocityX;
    snakeY+=velocityY;

    if(snakeX<=0||snakeX>30||snakeY<=0||snakeY>30){
        gameover=true;
    }

    for(let i=0;i<snakebody.length;i++)
    {
        htmlMArkup+=`<div class="head" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]}"></div>`;
        if(i!==0 && snakebody[0][1]===snakebody[i][1]&&snakebody[0][0]===snakebody[i][0]){
            gameover=true;
        }
    }
    
    playBoard.innerHTML=htmlMArkup;

}
document.getElementById("reset-btn").addEventListener("click", () => {
  localStorage.removeItem("high-score");
  highscore = 0;
  highScoreElement.innerText = `High Score: ${highscore}`;
});
changeFoodPosition();
setIntervalId= setInterval(initGame,125);
document.addEventListener("keydown",changeDirection);