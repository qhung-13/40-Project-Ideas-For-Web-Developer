let userScore = document.querySelector("#user-score") as HTMLElement;
let computerScore = document.querySelector("#computer-score") as HTMLElement;
const resultMessage = document.querySelector(".result p") as HTMLElement;

const rockButton = document.getElementById("rock") as HTMLElement;
const paperButton = document.getElementById("paper") as HTMLElement;
const scissorsButton = document.getElementById("scissors") as HTMLElement;

const choices: string[] = ["rock", "paper", "scissors"];

const computerRandom = (): string => {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex] as string;
};

const playGame = (userChoice: string) => {
  const compChoice = computerRandom();

  const userCapitalized =
    userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
  const compCapitalized =
    compChoice.charAt(0).toUpperCase() + compChoice.slice(1);

  if (compChoice === userChoice) {
    resultMessage.innerText = `Both chose ${userChoice}. It's a draw !!!`;
    return;
  }

  if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    resultMessage.innerHTML = `${userCapitalized} beats ${compCapitalized}. You win!`;
    let currentScore = parseInt(userScore.innerText);
    userScore.innerText = (currentScore + 1).toString();
  } else {
    resultMessage.innerHTML = `${compCapitalized} beats ${userCapitalized}. You lose!`;
    let currentScore = parseInt(computerScore.innerText);
    computerScore.innerText = (currentScore + 1).toString();
  }
};

rockButton.addEventListener("click", () => playGame("rock"));
paperButton.addEventListener("click", () => playGame("paper"));
scissorsButton.addEventListener("click", () => playGame("scissors"));
