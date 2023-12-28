let score = 0;
let timerInterval;

function startTest() {
    document.getElementById('entryForm').style.display = 'none';
    document.getElementById('test').style.display = 'block';
    generateGrids();
    startTimer();
}

function generateGrids() {
    for (let i = 1; i <= 9; i++) {
        const gridContainer = document.getElementById('grid' + i);
        gridContainer.innerHTML = '';
        let sum = 0;

        for (let j = 0; j < 25; j++) { // 5x5 grid
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            const digit = Math.floor(Math.random() * 9) + 1;
            cell.textContent = digit;
            sum += digit;
            gridContainer.appendChild(cell);
        }

        gridContainer.dataset.sum = sum;
    }
}

function selectGrid(gridNumber) {
    document.querySelectorAll('.grid').forEach(grid => grid.classList.remove('selected'));
    document.getElementById('grid' + gridNumber).classList.add('selected');
}

function makeGuess(guess) {
    const selectedGrid = document.querySelector('.grid.selected');
    if (!selectedGrid) {
        alert("Please select a grid first.");
        return;
    }

    const sum = parseInt(selectedGrid.dataset.sum);
    const isCorrect = (guess === 'more' && sum >= 125) || (guess === 'less' && sum < 125);

    if (isCorrect) {
        score += 1;
    } else {
        score -= 3;
    }
    updateScore();
    generateGrids();
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

function startTimer() {
    let timeLeft = 180; // 3 minutes in seconds
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById('timer').textContent = 
            minutes.toString().padStart(2, '0') + ':' + 
            seconds.toString().padStart(2, '0');

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
            return;
        }
        timeLeft--;
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('test').style.display = 'none';
    document.getElementById('finalScore').style.display = 'block';
    document.getElementById('finalScoreValue').textContent = score;
}
