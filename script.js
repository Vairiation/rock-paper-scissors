let userScore = 0;
let computerScore = 0;

const startBtn = document.querySelector('.startButton');

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

function showComputerChoice(choice) {
    // const choices = ['rock', 'paper', 'scissors'];
    const computerContainer = document.querySelector('.computerContainer');
    const computerChoice = document.createElement('div');
    const img = document.createElement('img');
    
    if (computerContainer.hasChildNodes) {
        computerContainer.removeChild(computerContainer.firstChild);
    }

    computerChoice.className = 'computerChoice';
    img.src = `images/${choice}.png`;
    img.alt = choice;
    img.title = `The computer chose ${choice}`;
    computerChoice.appendChild(img);
    computerContainer.appendChild(computerChoice);
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
    }
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    
    showComputerChoice(computerChoice);
    getWinner(userChoice, computerChoice);
}

function createChoiceButtons() {
    const selectionContainer = document.querySelector('.selectionContainer');
    const choices = ['rock', 'paper', 'scissors'];

    choices.forEach((choice) => {
        const btn = document.createElement('button');
        const img = document.createElement('img');
        
        img.src = `images/${choice}.png`;
        img.alt = choice;
        img.title = `Button for selecting ${choice}`;

        btn.appendChild(img);
        
        btn.addEventListener('click', () => {
            playRound(choice);
        })

        selectionContainer.appendChild(btn);
    });
}


function startGame() {
    userScore = 0;
    computerScore = 0;

    startBtn.remove();

    createChoiceButtons();
}

startBtn.addEventListener('click', startGame);