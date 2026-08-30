let userScore = 0;
let computerScore = 0;

const startBtn = document.querySelector('.startButton');

function getUserChoice() {
    const userChoice = prompt('Rock, Paper, or Scissors?')?.toLowerCase(); // ?. is Optional Chaining: If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.

    if (userChoice === 'rock' || userChoice === 'paper' || userChoice === 'scissors') {
        return userChoice;
    } else if (userChoice === undefined) {
        stop();
    } else {
        alert('Please choose a valid option');
        return getUserChoice(); //restarts prompt if invalid option is chosen
    }            
}

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random()*3 + 1); // computer chooses randomly
    
    if (randomNumber === 1) {
        return 'rock';
    } else if (randomNumber === 2) {
        return 'paper';
    } else if (randomNumber === 3) {
        return 'scissors'
    }
}

function returnTie(userChoice, computerChoice) {
    console.log(`Tie, you both chose ${userChoice}!`);
}

function returnWin(userChoice, computerChoice) {
    console.log(`You won, ${userChoice} beats ${computerChoice}!`);
    userScore += 1;
}

function returnLost(userChoice, computerChoice) {
    console.log(`You lost, ${userChoice} loses to ${computerChoice}...`);
    computerScore += 1;
}

function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        returnTie(userChoice, computerChoice);
    } else if (userChoice === 'rock' && computerChoice === 'scissors') {
        returnWin(userChoice, computerChoice);
    } else if (userChoice === 'paper' && computerChoice === 'rock') {
        returnWin(userChoice, computerChoice);
    } else if (userChoice === 'scissors' && computerChoice === 'paper') {
        returnWin(userChoice, computerChoice);
    } else if (userChoice === 'rock' && computerChoice === 'paper') {
        returnLost(userChoice, computerChoice);
    } else if (userChoice === 'paper' && computerChoice === 'scissors') {
        returnLost(userChoice, computerChoice);
    } else if (userChoice === 'scissors' && computerChoice === 'rock') {
        returnLost(userChoice, computerChoice);
    } else {
        alert('Invalid, please reload the page');
        console.log('Invalid, please reload the page');
    }
}

function playRound() {
    const userChoice = getUserChoice();
    const computerChoice = getComputerChoice();

    if (userChoice === undefined) {
        console.log("If you'd like to play again, please reload the page or call playRound()");
        alert("If you'd like to play again, please reload the page"); 
        return false;
    } else {        
    getWinner(userChoice, computerChoice);
        return true;
    }
}

function createChoiceButtons() {
    const selectionContainer = document.querySelector('.selectionContainer');
    const rockBtn = document.createElement('button');
    const paperBtn = document.createElement('button');
    const scissorsBtn = document.createElement('button'); 
    
    const rockImg = document.createElement('img');
    const paperImg = document.createElement('img');
    const scissorsImg = document.createElement('img');
    
    rockImg.src = 'images/rock.png';
    rockImg.alt = 'Rock';
    rockImg.title = 'Button for selecting Rock';
    
    paperImg.src = 'images/paper.png';
    paperImg.alt = 'Paper';
    paperImg.title = 'Button for selecting Paper';
    
    scissorsImg.src = 'images/scissors.png';
    scissorsImg.alt = 'Scissors';
    scissorsImg.title = 'Button for selecting Scissors';

    rockBtn.appendChild(rockImg);
    paperBtn.appendChild(paperImg);
    scissorsBtn.appendChild(scissorsImg);

    selectionContainer.appendChild(rockBtn);
    selectionContainer.appendChild(paperBtn);
    selectionContainer.appendChild(scissorsBtn);
}

createChoiceButtons();

function startGame() {
    userScore = 0;
    computerScore = 0;

    for (let i = 0; i <= 4; i++) {
        if (!playRound()) { //if user cancels (playRound() returns false), stops the loop
            return;
        } else {
            console.log(`User: ${userScore} | Computer: ${computerScore}`);
        }
    }
    console.log(`Final Score: User: ${userScore} | Computer: ${computerScore} | Ties: ${5 - userScore - computerScore}`);
    alert(`Final Score: User: ${userScore} | Computer: ${computerScore} | Ties: ${5 - userScore - computerScore}`);
    if (userScore > computerScore) {
        console.log('Congrats! You beat the computer!');
        alert('Congrats! You beat the computer!');
    } else if (userScore < computerScore) {
        console.log('Bummer! You lost to a computer...');
        alert('Bummer! You lost to a computer...');
    } else {
        console.log('Looks like you tied with the computer. Should that be a compliment?');
        alert('Looks like you tied with the computer. Should that be a compliment?');
    }
}

startBtn.addEventListener('click', startGame);