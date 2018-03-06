
var numberOfColors = 6;
var colors=addColors(numberOfColors);

var squares=document.querySelectorAll(".squares");
var colorDisplay=document.querySelector("#color-display");
var message=document.querySelector(".message-notif");
var header=document.querySelector("#header");
var resetGame=document.querySelector("#reset");
var modeButton=document.querySelectorAll(".buttonMode");
var score= document.querySelector(".score-text");
var messageBox=document.querySelector("#message-box");
var messageBoxText=document.querySelector(".message-text");
var selectedMode=document.querySelector(".selected");


var scoreResult=0;
colorDisplay.textContent=generateRandomRGB(colors);

messageBox.style.display="none";

for(var x=0;x<modeButton.length;x++){
    var easyBtn=modeButton[0];
    var hardBtn=modeButton[1];
   easyBtn.addEventListener("click",function(){
       easyMode();
       
   });

   hardBtn.addEventListener("click",function(){
        hardMode();

    });
}

//identify if theres a colors
function changeNumberOfColors(colors){

    for(var x=0;x<squares.length;x++){
        if(colors[x]){
                squares[x].style.display="block";
                squares[x].style.backgroundColor=colors[x];
        }else{
                squares[x].style.display="none";
        }
        
        }
}

//displaying colors
function displayColors(numberOfColors){
    colors=addColors(numberOfColors);
    colorDisplay.textContent=generateRandomRGB(colors);
    header.style.backgroundColor="steelblue";
}

function hardMode(){
    numberOfColors=6;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    message.textContent="";
    displayColors(numberOfColors);
    changeNumberOfColors(colors); 

}

function easyMode(){
    numberOfColors=3;
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    message.textContent="";
    displayColors(numberOfColors);
    changeNumberOfColors(colors);   
}

function compareColors(colorToGuess,pickedColor){
    if(pickedColor===colorToGuess){

        messageBoxText.textContent="CORRECT !"
        messageBox.style.display="block";
        header.style.backgroundColor=pickedColor;

        if(colors.length===3){
            scoreResult+=50;
        }else{
            scoreResult+=100;
        }

        removeMessageBox();
        score.textContent=scoreResult;
        resetColors(pickedColor);
        resetGame.textContent="Play Again?";

    }else{
       
        messageBoxText.textContent="WRONG !"
        messageBox.style.display="block";
        removeMessageBox();
        scoreResult=0;
        score.textContent=scoreResult;
    }
}

function removeMessageBox(){
    setTimeout(function(){
        messageBox.style.display="none";
        reset();
    },1000);
}

function reset(){
    colors=addColors(numberOfColors);      
    colorDisplay.textContent=generateRandomRGB(colors);
    header.style.backgroundColor="steelblue";
    message.textContent="";
    resetGame.textContent="NEW GAME";
        for(var x=0;x<squares.length;x++){
            squares[x].style.backgroundColor=colors[x];
        }   
}

resetGame.addEventListener("click",function(){
    reset();
});

for(var x=0;x<squares.length;x++){
    squares[x].addEventListener("click",function(){
        var pickedColor=this.style.backgroundColor;
        var colorToGuess=colorDisplay.textContent;
        compareColors(colorToGuess, pickedColor);
    });
}


function resetColors(color){
    for(var x=0;x<squares.length;x++){
        squares[x].style.backgroundColor=color;
    }
}
//changing the backgroundcolors
for(var x=0;x<squares.length;x++){
    squares[x].style.backgroundColor=colors[x];
}

function generateRandomRGB(colorsLength){
    
    var randomNumber = Math.floor(Math.random()*colorsLength.length);

    return colors[randomNumber];
}

function generateRandomColors(){

    var redColor=Math.floor(Math.random()*256);
    var greenColor=Math.floor(Math.random()*256);
    var blueColor=Math.floor(Math.random()*256);
    var rgbCode = "rgb("+redColor+", "+greenColor+", "+blueColor+")";

    return rgbCode;

}

function addColors(numOfColors){
    var arrOfColors=[];
    for(var x=0;x<numOfColors;x++){
        arrOfColors.push(generateRandomColors());
    }
    return arrOfColors;
}