console.log("welcome!!");
let gameover =new Audio("win.mp3");
let playturn =new Audio("ting.mp3");
let draw =new Audio("draw.mp3");
let container=document.getElementsByClassName("container");
let turn = "X";
let isgameover=false;
let play=0;
let left=0;
let right=1;
let game=1;

//Fuction to change the turn
changeTurn = ()=>{
    return turn ==="X"?"0":"X"
}

//Fuction to check to win
const checkWin=()=>{
    let boxtexts=document.getElementsByClassName('boxtext');
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    wins.forEach(e =>{
        if((boxtexts[e[0]].innerText===boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText===boxtexts[e[1]].innerText) &&(boxtexts[e[0]].innerText!=="")){
            document.querySelector('.info').innerText=boxtexts[e[0]].innerText + " won match";
            document.querySelector('.info').style.backgroundColor= "rgb(185, 185, 238)";
            isgameover=true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="175px";
            gameover.play();
            Array.from(boxtexts).forEach(element=>{
                element.innerText="";
            })
            document.getElementById(`${right}`).style.display="none";
            document.getElementById(`${right}`).style.display="none";
            document.querySelector(".container").style.opacity=0;
            document.getElementById("reset").style.opacity=1;
            document.getElementById("new").style.opacity=1;
        }
    })
}
const checkDraw=()=>{
    let boxtexts=document.getElementsByClassName('boxtext');
    play++;
    console.log(play);
    if(play==9){
         document.querySelector('.info').innerText="Match Draw";
        isgameover=true;
        Array.from(boxtexts).forEach(element=>{
            element.innerText="";
        })
        document.getElementById('1').style.display="none";
        draw.play();
        document.getElementById("reset").style.opacity=1;
        document.getElementById("new").style.opacity=1;
        document.querySelector(".container").style.opacity=0;
        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="175px";
    }
    
}
//Game logic
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element=>{
    let boxtext=element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxtext.innerText===''){
            boxtext.innerText=turn;
            playturn.play();
            turn=changeTurn();
            checkWin();
            checkDraw();
            if(!isgameover){
                game++;
                if(game%2!=0){
                document.getElementById(`${left}`).style.backgroundColor="rgb(185, 185, 238)";
                document.getElementById(`${right}`).style.backgroundColor="white";
                }
                else{
                    document.getElementById(`${left}`).style.backgroundColor="white";
                document.getElementById(`${right}`).style.backgroundColor="rgb(185, 185, 238)";
                }
            }
            else{
                checkDraw();
            }
        }
    })
})

//btn coding
reset.addEventListener('click',()=>{
    let boxtexts=document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element=>{
        element.innerText="";
    });
    turn="X";
    isgameover=false;
    play=0;
    document.getElementsByClassName("info")[0].innerText="Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px";
    document.getElementById(`${left}`).style.display="inline";
    document.getElementById(`${right}`).style.display="inline";
    document.getElementById(`${left}`).style.background="rgb(185, 185, 238)";
    document.getElementById(`${right}`).style.background="white";
    document.querySelector(".container").classList.remove("hide");
    document.querySelector(".container").style.opacity=1;
    document.getElementById("reset").style.opacity=0;
    document.getElementById("new").style.opacity=0;
})