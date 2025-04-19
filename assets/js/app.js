const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'weather',
    'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'machine',
    'accurate', 'rainbow', 'bicycle', 'eclipse', 'trouble', 'developer',
    'database', 'periodic', 'fortune', 'phone', 'future', 'pasta', 'microwave',
    'jungle', 'wallet', 'canada', 'velvet', 'potion', 'treasure', 'beacon',
    'whisper', 'breeze', 'coffee', 'beauty', 'agency', 'chocolate', 'eleven',
    'alphabet', 'magician', 'triangle', 'baseball', 'beyond', 'banana', 'perfume',
    'computer', 'butterfly', 'music', 'eagle', 'crown', 'chess', 'laptop',
    'bedroom', 'enemy', 'button', 'door', 'bird', 'superman', 'library',
    'bookstore', 'language', 'homework', 'beach', 'economy', 'awesome',
    'science', 'mystery', 'famous', 'league', 'memory', 'leather', 'planet',
    'software', 'update', 'yellow', 'keyboard', 'window', 'beans', 'truck',
    'sheep', 'blossom', 'secret', 'wonder', 'destiny', 'quest', 'download',
    'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'audio', 'school',
    'detective', 'hero', 'progress', 'winter', 'passion', 'rebel', 'amber',
    'jacket', 'article', 'paradox', 'social', 'resort', 'mask', 'escape',
    'promise', 'band', 'level', 'hope', 'moonlight', 'media', 'orchestra',
    'volcano', 'guitar', 'raindrop', 'diamond', 'illusion', 'firefly', 'ocean',
    'cascade', 'journey', 'laughter', 'horizon', 'marvel', 'compiler', 'twilight',
    'harmony', 'symphony', 'solitude', 'essence', 'forest', 'melody',
    'vision', 'silence', 'eternity', 'embrace', 'poet', 'ricochet', 'mountain',
    'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo', 'fantasy',
    'radiant', 'mermaid', 'legend', 'monitor', 'plastic', 'pressure', 'bread',
    'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle', 'sunset',
    'farmer', 'garden', 'whistle', 'blanket', 'picnic', 'sweater', 'lantern',
    'theater', 'traffic', 'website', 'courage', 'shelter', 'painter', 'twinkle',
    'squeeze', 'forever', 'stadium', 'gourmet', 'flower', 'bravery', 'playful',
    'captain', 'vibrant', 'damage', 'outlet', 'general', 'batman', 'enigma',
    'storm', 'universe', 'engine', 'mistake', 'hurricane'
];

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const backgroundMusic = document.getElementById("background-music");
const scoreboardList = document.getElementById("scoreboard-list");

let time = 99;
let score = 0;
let currentWord = "";
let timer;
let wordsTyped = [];
let scores = [];

class Score {
    #date;
    #hits;
    #percentage;

    constructor(hits, percentage) {
        this.#date = new Date();
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date() { return this.#date; }
    get hits() { return this.#hits; }
    get percentage() { return this.#percentage; }
}

function getRandomWord() {
    let availableWords = words.filter(word => !wordsTyped.includes(word));
    if (availableWords.length === 0) {
        return null; 
    }
    return availableWords[Math.floor(Math.random() * availableWords.length)];
}

function startGame() {
    score = 0;
    time = 99;
    wordsTyped = [];
    scoreDisplay.textContent = "Score: 0";
    timeDisplay.textContent = "Time: 99s";
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();
    let newWord = getRandomWord();
    if (newWord) {
        wordDisplay.textContent = newWord;
        currentWord = newWord;
    } else {
        endGame();
    }
    timer = setInterval(updateTime, 1000);
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
}

function updateTime() {
    if (time > 0) {
        time--;
        timeDisplay.textContent = "Time: " + time + "s";
    } else {
        endGame();
    }
}


function endGame() {
    clearInterval(timer);
    wordInput.disabled = true;
    wordDisplay.textContent = "Game Over!";
    backgroundMusic.pause();
  
    const percentage = (score / words.length) * 100;
  
    const newScore = {
      hits: score,
      percentage: percentage.toFixed(2),
      date: new Date().toLocaleString()
    };
  
    let savedScores = JSON.parse(localStorage.getItem("scores")) || [];
  
     savedScores.push(newScore);
     savedScores.sort((a, b) => b.hits - a.hits);
  
     savedScores.splice(9);
  
     localStorage.setItem("scores", JSON.stringify(savedScores));
  
     showScoreboard(savedScores);

}
  
  function showScoreboard(scoresArray) {
    scoreboardList.innerHTML = "";
    scoresArray.forEach(score => {
      const li = document.createElement("li");
      li.textContent = `Hits: ${score.hits} | ${score.percentage}% | ${score.date}`;
      scoreboardList.appendChild(li);
    });
  }

  
wordInput.addEventListener("input", () => {
    if (wordInput.value.trim() === currentWord) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
        wordInput.value = "";
        let newWord = getRandomWord();
        if (newWord) {
            wordDisplay.textContent = newWord;
            currentWord = newWord;
        } else {
            endGame();
        }
    }
});

startBtn.addEventListener("click", () => {
    startGame();
    startBtn.style.display = "none";
    restartBtn.style.display = "block";
});

restartBtn.addEventListener("click", () => {
    startGame();
    restartBtn.style.display = "none";
    startBtn.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
    const stored = JSON.parse(localStorage.getItem("scores")) || [];
    showScoreboard(stored);
  });

  document.getElementById("clear-history-btn").addEventListener("click", () => {
    localStorage.removeItem("scores");
    scoreboardList.innerHTML = "";
});

