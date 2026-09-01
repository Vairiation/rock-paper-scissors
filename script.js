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
    // const choices = ['rock', 'paper', 'scissors'];
    const computerContainer = document.querySelector('.computerContainer');
    const computerChoice = document.createElement('div');
    const img = document.createElement('img');
    
    if (computerContainer.firstChild) {
        computerContainer.removeChild(computerContainer.firstChild);
    }

    computerChoice.className = 'computerChoice';
    img.src = `images/${choice}.png`;
    img.alt = choice;
    img.title = `The computer chose ${choice}`;
    computerChoice.appendChild(img);
    computerContainer.appendChild(computerChoice);
}

function returnResult(status, userChoice, computerChoice) {
    const resultsContainer = document.querySelector('.resultsContainer');
    const result = document.createElement('h3');
    
    if (document.querySelector('.result')) {
        document.querySelector('.result').remove();
    }
    
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

    if (document.querySelector('.roundCount')) {
        document.querySelector('.roundCount').remove();
    }
    
    roundCount.className = 'roundCount';
    roundCount.innerText = `Round ${round}`;
    intro.appendChild(roundCount);
}

function playRound(userChoice) {
    const computerChoice = getComputerChoice();
    
    showRound();
    showComputerChoice(computerChoice);
    getWinner(userChoice, computerChoice);
    showScore(userScore, computerScore);
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
            round += 1;
        })

        selectionContainer.appendChild(btn);
    });
}

function showScore(userScore, computerScore) {
    const contentContainer = document.querySelector('.contentContainer');
    const score = document.createElement('h4');

    if (document.querySelector('.score')) {
        document.querySelector('.score').remove();
    }

    score.className = 'score';
    score.innerText = `User: ${userScore} | Computer: ${computerScore}`;
    contentContainer.appendChild(score);
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
    computerChoice.remove();
    roundCount.innerText = `Total Game Rounds: ${round}`;
    score.innerText = `Final Score: User: ${userScore} | Computer: ${computerScore}`;
    
    if (userScore > computerScore) {
        result.innerText = "You won! You're smarter than a computer!"
    } else if (computerScore > userScore) {
        result.innerText = 'You lost. You let a computer beat you....';
    } else result.innerText = "You tied with the computer. At least you didn't lose"

    resetBtn.className = '.resetBtn';
    resetBtn.innerText = 'Play Again';
    resetBtn.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        round = 1;
        resetBtn.remove();
        result.innerText = '';
        startGame()
    });
    resultsContainer.appendChild(resetBtn);
}

function startGame() {
    userScore = 0;
    computerScore = 0;
    round = 1;

    startBtn.remove();
    intro.remove();

    showRound();
    showScore(userScore, computerScore);
    createChoiceButtons();
}

startBtn.addEventListener('click', startGame);