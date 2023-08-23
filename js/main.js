let letters="abcdefghigklmnopqrstuvwxyz";
let lettersArray=Array.from(letters);
let letterContainer=document.querySelector(".theLetters")
lettersArray.forEach((letter)=>{
    // create span for letter
    let span=document.createElement("span")
    // create textNode.
    let theLetter=document.createTextNode(letter)
    span.appendChild(theLetter);
    span.className="letterBox";
    letterContainer.appendChild(span)
    // console.log(letterContainer)

})

// objects of words + categories
const words={
    programming:["php","javascript","css","html","c++","python","java","c#"],
    movies:["Spider Man","Monkey King","Interstellar","Whiplash","Coco","Up"],
    people:["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatam Ghandi"],
    countries:["yemen","Qatar","Egypt","Bahrain","Syria","Palestine"]
}
// get random property 
let allKeys=Object.keys(words);

//random keys
let randomPropNumber=Math.floor(Math.random()*allKeys.length);
// category Num
let randomPropName=allKeys[randomPropNumber];
// category Word
let randomPropValues=words[randomPropName];
console.log(randomPropValues)
//random word Num
let randomWordNumber=Math.floor(Math.random()*randomPropValues.length);
//random word Value
let randomWordValue=randomPropValues[randomWordNumber]
console.log(randomWordValue)


// =============category info========
let categoryInfo=document.querySelector(".category span")
categoryInfo.innerText=`${randomPropName}${"    "}`;


// ===============================Select letterGuess===========

let lettersGuessContainer=document.querySelector(".lettersGuess");
// convert Chossen Word To Array========
let letterAndSapce=Array.from(randomWordValue);
console.log(letterAndSapce)
// =====create spans depend on word======
letterAndSapce.forEach((letter)=>{
    let span=document.createElement("span");
    // if letter is space
    if(letter === " "){
        span.className="hasSapce"
    }
    lettersGuessContainer.appendChild(span)
})
// ===Handle clicking on element=======

// ====Select All spans from letterGuess
let guessSpans=document.querySelectorAll(".lettersGuess span");
// set Wrong Attemps.
let wrongAttemps=0;
let theDraw=document.querySelector(".hangmanDraw")
document.addEventListener("click",(e)=>{
    //  set the status
    let theStatus=false;
    if(e.target.className=="letterBox"){
        e.target.classList.add("clicked")
        // get letter clicked
        let letterClicked=e.target.innerText.toLowerCase();
        let choosenWord=Array.from(randomWordValue);
        choosenWord.forEach((wordLetter,letterIndex)=>{
            if(letterClicked==wordLetter.toLowerCase()){
                theStatus=true;
                guessSpans.forEach((span,spanIndex)=>{
                    if(letterIndex==spanIndex){
                        span.innerText=wordLetter;

                    }
                })
            }
        })

        if(theStatus !== true){
            wrongAttemps++;
            // Add class worng on draw element
            theDraw.classList.add(`wrong-${wrongAttemps}`);
            // play fail sound
            document.getElementById("fail").play();
            if(wrongAttemps === 8){
                endGame();
                letterContainer.classList.add("finished")
            }
        }
        else{
            // play sucess sound
            document.getElementById("success").play();

        }

    }

})

// endGame function
function endGame(){
    // Create Popup
    let div=document.createElement("div")
    div.className="popup"
    // create text
    let text=document.createTextNode(`Game Over , The Word is "${randomWordValue}"`)
    div.appendChild(text);
    // Append to the body=========
    document.body.appendChild(div)
}