const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Congratulations",
];

const levels = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
  Insane: 1,
};

let startButton = document.querySelector(".start");
let levelSelect = document.querySelector(".message #level");
let LevelDuration = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Add Levels to Select
for (const key in levels) {
  let option = document.createElement("option");
  option.setAttribute("value", key);
  option.textContent = key;
  levelSelect.appendChild(option);
}

window.onload = function () {
  if (window.localStorage.getItem("Difficulity")) {
    levelSelect.value = window.localStorage.getItem("Difficulity");
    if (window.localStorage.getItem("Difficulity") == "Easy") {
      LevelDuration.innerHTML = levels.Easy;
      timeLeft.innerHTML = levels.Easy;
    } else if (window.localStorage.getItem("Difficulity") == "Normal") {
      LevelDuration.innerHTML = levels.Normal;
      timeLeft.innerHTML = levels.Normal;
    } else if (window.localStorage.getItem("Difficulity") == "Hard") {
      LevelDuration.innerHTML = levels.Hard;
      timeLeft.innerHTML = levels.Hard;
    } else if (window.localStorage.getItem("Difficulity") == "Insane") {
      LevelDuration.innerHTML = levels.Insane;
      timeLeft.innerHTML = levels.Insane;
    }
  }
};

levelSelect.value = "Normal";
LevelDuration.innerHTML = levels.Normal;
timeLeft.innerHTML = levels.Normal;

levelSelect.addEventListener("change", () => {
  if (levelSelect.value == "Easy") {
    LevelDuration.innerHTML = levels.Easy;
    timeLeft.innerHTML = levels.Easy;
  } else if (levelSelect.value == "Normal") {
    LevelDuration.innerHTML = levels.Normal;
    timeLeft.innerHTML = levels.Normal;
  } else if (levelSelect.value == "Hard") {
    LevelDuration.innerHTML = levels.Hard;
    timeLeft.innerHTML = levels.Hard;
  } else if (levelSelect.value == "Insane") {
    LevelDuration.innerHTML = levels.Insane;
    timeLeft.innerHTML = levels.Insane;
  }
  window.localStorage.setItem("Difficulity", levelSelect.value);
});

scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.addEventListener("click", () => {
  startButton.remove();
  input.focus();

  // Generate Words
  window.setTimeout(() => {
    generateRandomWord();
  }, 2000);
});

function generateRandomWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let randomWordIndex = words.indexOf(randomWord);

  // Remove word From Array
  words.splice(randomWordIndex, 1);

  // Show the Random Word
  theWord.style.display = "block";
  theWord.innerHTML = randomWord;

  // Upcoming Words
  upcomingWords.innerHTML = "";
  for (i = 0; i < words.length; i++) {
    let word = document.createElement("span");
    word.textContent = words[i];
    upcomingWords.append(word);
  }
  // Call Start Time function
  startTime();
}

function startTime() {
  if (levelSelect.value == "Easy") {
    timeLeft.innerHTML = levels.Easy;
  } else if (levelSelect.value == "Normal") {
    timeLeft.innerHTML = levels.Normal;
  } else if (levelSelect.value == "Hard") {
    timeLeft.innerHTML = levels.Hard;
  } else if (levelSelect.value == "Insane") {
    timeLeft.innerHTML = levels.Insane;
  }
  let selectedLevel = document.createElement("span");
  selectedLevel.textContent = levelSelect.value;
  levelSelect.replaceWith(selectedLevel);
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == 0) {
      clearInterval(start);
      // Compare Word
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        input.value = "";

        scoreGot.innerHTML++;

        if (words.length > 0) {
          generateRandomWord();
        } else {
          finishMessage.style.display = "flex";
          let wonGame = document.createElement("span");
          wonGame.classList.add("won");
          wonGame.textContent = "Congratulations";
          let playAgain = document.createElement("button");
          playAgain.textContent = "Play Again";
          finishMessage.append(wonGame);
          finishMessage.append(playAgain);
          playAgain.addEventListener("click", () => window.location.reload());
          input.blur();
          theWord.remove();
          upcomingWords.remove();
        }
      } else {
        theWord.remove();
        finishMessage.style.display = "flex";
        let endGame = document.createElement("span");
        endGame.classList.add("lost");
        endGame.textContent = "Game Over";
        let tryAgain = document.createElement("button");
        tryAgain.textContent = "Try Again";
        finishMessage.append(endGame);
        finishMessage.append(tryAgain);
        tryAgain.addEventListener("click", () => window.location.reload());
      }
    }
  }, 1000);
}
