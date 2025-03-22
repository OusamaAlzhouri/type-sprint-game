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

let time = 99;
let score = 0;
let currentWord = "";
let timer;
let wordsTyped = [];
let scores = [];

// So, for the Score class, I wanted to make sure it kept track of each game's results.
// I figured a class would be perfect for this, since it's like a blueprint for each score.
// I looked up some class examples on MDN to refresh my memory on the syntax, and that helped a lot.
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
    // Okay, so the tricky part was making sure the same word didn't show up twice in a row.
    // I remembered seeing something about filtering arrays on MDN, so I checked that out.
    // I ended up using array.filter() to create a list of words that hadn't been typed yet.
    // Then I just picked a random word from that list.
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
    // For the percentage, I just used the basic formula: (score / total words) * 100.
    // I used Chatgpt to help me figure it out, but I double-checked some examples online just to be sure.
    const percentage = (score / words.length) * 100;
    scores.push(new Score(score, percentage));
}

wordInput.addEventListener("input", () => {
    // Here, I wanted to check if what the player typed matched the word on the screen.
    // I used the trim() method to ignore any extra spaces, just to make it more user-friendly.
    // If they match, we bump up the score and grab a new word. ( I also used Google to help me figure it out)
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

