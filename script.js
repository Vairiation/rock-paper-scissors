let userScore;
let computerScore;
let round;

const startBtn = document.querySelector('.startButton');
const intro = document.querySelector('.introMessage');

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
    const computerContainer = document.querySelector('.computerContainer');
    const computerChoice = document.createElement('div');
    const img = document.createElement('img');
    
    computerContainer.querySelector('.computerChoice')?.remove();

    computerChoice.className = 'computerChoice';
    img.src = `images/${choice}.png`;
    img.alt = choice;
    img.title = `The computer chose ${choice}`;
    computerChoice.appendChild(img);
    computerContainer.appendChild(computerChoice);
}

function returnResult(status, userChoice, computerChoice) {
    const resultsContainer = document.querySelector('.resultsContainer');
    const instructions = document.querySelector('.instructions');
    const result = document.createElement('h3');
    
    document.querySelector('.result')?.remove();
    instructions?.remove();
    
    result.className = 'result';

    if (status === 'win') {
        result.innerText = `You won, ${userChoice} beats ${computerChoice}!`;
        userScore += 1;
    } else if (status === 'lose') {
        result.innerText = `You lost, ${computerChoice} beats ${userChoice}.`
        computerScore += 1;
    } else result.innerText = 'Tie!';
    
    resultsContainer.appendChild(result);
}

function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        returnResult('tie', userChoice, computerChoice);
    } else if (userChoice === 'rock' && computerChoice === 'scissors') {
        returnResult('win', userChoice, computerChoice);
    } else if (userChoice === 'paper' && computerChoice === 'rock') {
        returnResult('win', userChoice, computerChoice);
    } else if (userChoice === 'scissors' && computerChoice === 'paper') {
        returnResult('win', userChoice, computerChoice);
    } else if (userChoice === 'rock' && computerChoice === 'paper') {
        returnResult('lose', userChoice, computerChoice);
    } else if (userChoice === 'paper' && computerChoice === 'scissors') {
        returnResult('lose', userChoice, computerChoice);
    } else if (userChoice === 'scissors' && computerChoice === 'rock') {
        returnResult('lose', userChoice, computerChoice);
    }
}

function showRound(){
    const intro = document.querySelector('.intro');
    const roundCount = document.createElement('h5');

    document.querySelector('.roundCount')?.remove();
    
    roundCount.className = 'roundCount';
    roundCount.innerText = `Round ${round + 1}`;
    intro.appendChild(roundCount);
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    
    showRound();
    showComputerChoice(computerChoice);
    getWinner(userChoice, computerChoice);
    showScore(userScore, computerScore);
    round += 1;
    checkGameOver();
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
    showInstructions();
}

function showScore(userScore, computerScore) {
    const contentContainer = document.querySelector('.contentContainer');
    const score = document.createElement('h4');

    document.querySelector('.score')?.remove();

    score.className = 'score';
    score.innerText = `User: ${userScore} | Computer: ${computerScore}`;
    contentContainer.appendChild(score);
}

function showInstructions() {
    const resultsContainer = document.querySelector('.resultsContainer');
    const instructions = document.createElement('h3');

    instructions.className = 'instructions';
    instructions.innerText = 'Please Choose Rock, Paper, or Scissors';
    resultsContainer.appendChild(instructions);
}

function checkGameOver() {
    if (userScore >= 3 || computerScore >= 3 || round >= 5) {
        stopGame()
    }
}

function stopGame() {
    const choiceButtons = document.querySelectorAll('button');
    const computerChoice = document.querySelector('.computerChoice');
    const roundCount = document.querySelector('.roundCount');
    const score = document.querySelector('.score');
    const resultsContainer = document.querySelector('.resultsContainer');
    const result = document.querySelector('.result');
    const resetBtn = document.createElement('button');

    choiceButtons.forEach((btn) => {
        btn.remove();
    });
    setTimeout(() => {
        computerChoice.remove();
        roundCount.innerText = `Total Game Rounds: ${round}`;
        score.innerText = `Final Score: User: ${userScore} | Computer: ${computerScore}`;
        
        if (userScore > computerScore) {
            result.innerText = "You won! You're smarter than a computer!"
        } else if (computerScore > userScore) {
            result.innerText = 'You lost. You let a computer beat you....';
        } else result.innerText = "You tied with the computer. At least you didn't lose"

        resetBtn.className = 'resetBtn';
        resetBtn.innerText = 'Play Again';
        resetBtn.addEventListener('click', () => {
            resetBtn.remove();
            result.remove();
            startGame()
        });
        resultsContainer.appendChild(resetBtn);
    }, 1500)
}

function startGame() {
    userScore = 0;
    computerScore = 0;
    round = 0;

    startBtn.remove();
    intro.remove();

    showRound();
    showScore(userScore, computerScore);
    createChoiceButtons();
}

startBtn.addEventListener('click', startGame);