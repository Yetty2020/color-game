//to create audio elements
const correctSound = new Audio('./assests/mixkit-retro-game-notification-212.wav');
const incorrectSound = new Audio('./assests/mixkit-cartoon-toy-whistle-616.wav');
const clickSound = new Audio('./assests/mixkit-air-woosh-1489.wav');

const message = document.querySelector('.message');
const messageDiv = document.querySelector('.message-div');
const newGame = document.querySelector('.NewGame');
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

//create score display
const gameCountDiv = document.querySelector('.gameCountDiv');
const scoreDisplay = document.createElement('p')
scoreDisplay.innerHTML = `Score:<br>${score}`;


gameCountDiv.appendChild(scoreDisplay);

//Create highscore display
const highScoreDisplay = document.createElement('p');
const highScoreDiv = document.querySelector('.highScoreDiv');
highScoreDisplay.innerHTML = `High Score:<br>${highScore}`;

highScoreDiv.appendChild(highScoreDisplay);





const getRandomColor = () => {
    const r = Math.floor(Math.random() * 4) * 64;
    const g = Math.floor(Math.random() * 4) * 64;
    const b = Math.floor(Math.random() * 4) * 64;
    
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
}

let mainColor = getRandomColor();

document.addEventListener('DOMContentLoaded', () => {
    const colorDiv = document.querySelector(".color-div");
    colorDiv.style.backgroundColor = mainColor;
    
   
    
    createColorButtons();
});

function createColorButtons() {
    const colorOptions = document.querySelector('.color-options');
    const matchingPosition = Math.floor(Math.random() * 6);//generates no btwn 0 to 5
    const colorDiv = document.querySelector('.color-div');
    
    // Clear existing buttons
    colorOptions.innerHTML = '';
    
    // Create all 6 buttons
    for (let i = 0; i < 6; i++) {
        const button = document.createElement('button');
        button.classList.add('color-button');
        button.style.width = "100px";
        button.style.height = "100px";
       
        button.style.cursor = "pointer";
        
        // Set color based on position
        if (i === matchingPosition) {
            button.style.backgroundColor = mainColor;
        } else {
            let newColor;
            //creates a new variavle to check if the color is the same as the main color
            do {
                newColor = getRandomColor();
            } while (newColor === mainColor);
            //if it matches it loops again to get a differnet color
            button.style.backgroundColor = newColor;
        }
        
        // Add click event listener
        button.addEventListener('click', () => {
            
            if (button.style.backgroundColor === colorDiv.style.backgroundColor) {
                message.textContent = "Correct! You found the matching color!";
                console.log("Correct! You found the matching color!");
                colorDiv.style.backgroundColor = mainColor;
                correctSound.play();
                score++;
                scoreDisplay.innerHTML = `Score:<br> ${score}`;
                scoreDisplay.classList.add('.shake')

                // Check if it's a new high score
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('highScore', highScore);
                    highScoreDisplay.innerHTML = `High Score:<br>${highScore}`;
                }

                // Clear message div
                setTimeout(() =>{
                   
                    // Generate new main color
    mainColor = getRandomColor();
    
    // Update the main color div
    const colorDiv = document.querySelector(".color-div");
    colorDiv.style.backgroundColor = mainColor;
    
    // Clear existing buttons
    const colorOptions = document.querySelector('.color-options');
    colorOptions.innerHTML = '';
    
    // Create new set of buttons
    createColorButtons();

    //clear message div
    message.textContent = "";

   


                }, 2000)
               
                
            } else {
                message.textContent = "Oops! Colors don't match. Try again!";
                incorrectSound.play();
                console.log("Oops! Colors don't match. Try again!");
            }
        });
        
        colorOptions.appendChild(button);
        messageDiv.appendChild(message);
    }
}


function resetGame() {

    setTimeout(() => {
        clickSound.play();

        // Generate new main color
    mainColor = getRandomColor();
    
    // Update the main color div
    const colorDiv = document.querySelector(".color-div");
    colorDiv.style.backgroundColor = mainColor;
    
    // Clear existing buttons
    const colorOptions = document.querySelector('.color-options');
    colorOptions.innerHTML = '';
    
    // Create new set of buttons
    createColorButtons();

    //clear message div
    message.textContent = "";

    //reset score
    score = 0;
    scoreDisplay.innerHTML = `Score:<br> ${score}`;

    
    }, 1100);
    
}

// Add a reset button to your HTML
newGame.addEventListener('click', ()=>{
    resetGame();
    clickSound.play();
});

