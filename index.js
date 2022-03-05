const gridEl=document.querySelector(".grid")
const btnEl=document.getElementById("btn-start")
const scoreEl=document.getElementById("score")
const messageEl=document.querySelector(".gameover")

const gameoverEl=document.createElement("h3")
gameoverEl.classList.add("gameover")
gridEl.appendChild(gameoverEl)
gameoverEl.textContent="Game over!"

let squares=[]
let theSnake=[2,1,0]
// let gameMessage=[44,45]
let direction= 1
const width=10
let appleIndex=0
let score=0
let speed= 0.9
let interval= 500
let timer= 0
let sq=0//display grid num

const grid=()=>{
    for (let i=0; i<width*width; i++){
        const square=document.createElement("div")
        square.classList.add("square")
        // square.textContent=sq++ //for grid num
        // square.style.color="white" //for grid num
        gridEl.appendChild(square)
        squares.push(square)
    }
}

grid()

theSnake.forEach(i=>squares[i].classList.add("snake"))

const startGame=()=>{
    theSnake.forEach(i=>squares[i].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(timer)
    theSnake=[2,1,0]
    gameoverEl.style.visibility="hidden"
    score=0
    scoreEl.textContent=score
    direction=1
    interval=500
    generateApple()
    theSnake.forEach(i=>squares[i].classList.add("snake"))
    timer= setInterval(draw,interval)
}

const draw=()=>{
    if (
        (theSnake[0] + width >= width*width && direction === 10) || //if snake has hit bottom
        (theSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (theSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (theSnake[0] - width < 0 && direction === -10) || //if snake has hit top
        squares[theSnake[0] + direction].classList.contains("snake")
    ){
    

    gameoverEl.style.visibility="visible"
    return clearInterval(timer)}



    const tail=theSnake.pop()
    squares[tail].classList.remove("snake")
    theSnake.unshift(theSnake[0]+direction)


    if(squares[theSnake[0]].classList.contains("apple")){
        squares[theSnake[0]].classList.remove("apple")

        squares[tail].classList.add("snake")
        theSnake.push(tail)
        generateApple()
        score++
        scoreEl.textContent=score

        clearInterval(timer)
        interval= interval*speed
        console.log(interval)
        timer= setInterval(draw, interval)

    }
    squares[theSnake[0]].classList.add("snake")
}






const generateApple=()=>{
    do{
        appleIndex=Math.floor(Math.random()*squares.length)
    }while(squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

generateApple()


const control=(e)=>{
    if(e.key==="ArrowLeft"){
        console.log("Left")
        direction = -1

    }else if(e.key==="ArrowUp"){
        console.log("Up")
        direction =-width
    }else if(e.key==="ArrowRight"){
        console.log("Right")
        direction= 1
        
    }else if(e.key==="ArrowDown"){
        console.log("Down")
        direction =+width
        
    }
}

document.addEventListener("keydown", control)
btnEl.addEventListener("click", startGame)