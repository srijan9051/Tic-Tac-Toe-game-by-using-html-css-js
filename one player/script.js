const selectBox = document.querySelector(".select-box");
let selectxBtn = selectBox.querySelector(".playerx");
let selectoBtn = selectBox.querySelector(".playero");
let playBoard = document.querySelector(".play-board");
let allBox=document.querySelectorAll("section span");
let players = document.querySelector(".players");
let resultBox = document.querySelector(".result-box");
let wontext = resultBox.querySelector(".won-text");
let replayBtn = resultBox.querySelector("button");
let draw =new Audio("draw.mp3");
let ting =new Audio("ting.mp3");
let win =new Audio("win.mp3");

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectxBtn.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectoBtn.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign="X";
let runBot=true;


function clickedBox(element){
        if(players.classList.contains("player")){
             element.innerHTML=`<i class="${playerOIcon}"></i>`;
             players.classList.add("active");
             playerSign="O";
             element.setAttribute("id",playerSign);
        }
        else{
            element.innerHTML=`<i class="${playerXIcon}"></i>`;
            players.classList.add("active");
            element.setAttribute("id",playerSign)
        }
        selectWinner(); 
        playBoard.style.pointerEvents="none";
        element.style.pointerEvents="none";
        let randomDelayTime=((Math.random()*1000)+200).toFixed();
        setTimeout(()=>{
            bot(runBot);
        },randomDelayTime);
       
    }

//click function
function bot(runBot){
     if(runBot){
        playerSign="O";
        let array=[];
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount==0){
                array.push(i);
            }
        }
        let randomBox=array[Math.floor(Math.random()*array.length)];
        if(array.length>0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML=`<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSign="X";
                allBox[randomBox].setAttribute("id",playerSign);
           }
           else{
               allBox[randomBox].innerHTML=`<i class="${playerOIcon}"></i>`;
               players.classList.remove("active");
               allBox[randomBox].setAttribute("id",playerSign);
           }
           selectWinner();
        }
        allBox[randomBox].style.pointerEvents="none";
        playBoard.style.pointerEvents="auto";
        playerSign="X";
     }
}

//Check winner
function getClass(idname){
    return document.querySelector(".box"+idname).id;
}
function checkClassSign(val1, val2, val3, sign){ 
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkClassSign(1,2,3,playerSign) || checkClassSign(4,5,6, playerSign) || checkClassSign(7,8,9, playerSign) || checkClassSign(1,4,7, playerSign) || checkClassSign(2,5,8, playerSign) || checkClassSign(3,6,9, playerSign) || checkClassSign(1,5,9, playerSign) || checkClassSign(3,5,7, playerSign)){
        console.log(playerSign+" "+"is the winner");
        win.play();
        runBot=false;
        bot(runBot);
        setTimeout(()=>{
           playBoard.classList.remove("show");
           resultBox.classList.add("show");
        },700)

        wontext.innerHTML=`player <p> ${playerSign}</p> won the game!`;
    }else{
        if( getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot=false;
            bot(runBot);
            setTimeout(()=>{
               playBoard.classList.remove("show");
               resultBox.classList.add("show");
            },700)

            wontext.textContent =`Match has been drawn!`;
            draw.play();
    }
} 
}

replayBtn.onclick=()=>{
    window.location.reload();
}
