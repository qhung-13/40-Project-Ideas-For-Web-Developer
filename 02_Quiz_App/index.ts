const quiz = document.querySelector(".quiz") as HTMLElement;
const contentQuestion = document.getElementById("question") as HTMLElement;
const contentAnswer = document.querySelectorAll(
  ".btn",
) as NodeListOf<HTMLButtonElement>;
const btnNextQuestion = document.getElementById(
  "next-btn",
) as HTMLButtonElement;
const btnBackQuestion = document.getElementById(
  "back-btn",
) as HTMLButtonElement;

interface IQuestion {
  key: number;
  question: string;
  answer: string[];
  trueAnswer: string;
  isTrue: boolean | null;
}

const questions: IQuestion[] = [
  {
    key: 1,
    question: "Question 1",
    answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
    trueAnswer: "A",
    isTrue: null,
  },
  {
    key: 2,
    question: "Question 2",
    answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
    trueAnswer: "B",
    isTrue: null,
  },
  {
    key: 3,
    question: "Question 3",
    answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
    trueAnswer: "C",
    isTrue: null,
  },
];

let currentIndex = 0;

const resetButtons = () => {
  contentAnswer.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.disabled = false;
  });
};

const selectAnswer = (e: Event, index: number) => {
  const selectedBtn = e.target as HTMLButtonElement;
  const currentQuestion = questions[currentIndex] as IQuestion;
  if (!currentQuestion) return;

  const selectedAnswerText = currentQuestion.answer[index];
  if (!selectedAnswerText) return;

  const isCorrect = selectedAnswerText.startsWith(currentQuestion.trueAnswer);

  if (isCorrect) {
    selectedBtn.style.backgroundColor = "#9aeabc";
    const quiz = document.querySelector(".quiz") as HTMLElement;
    const contentQuestion = document.getElementById("question") as HTMLElement;
    const contentAnswer = document.querySelectorAll(
      ".btn",
    ) as NodeListOf<HTMLButtonElement>;
    const btnNextQuestion = document.getElementById(
      "next-btn",
    ) as HTMLButtonElement;
    const btnBackQuestion = document.getElementById(
      "back-btn",
    ) as HTMLButtonElement;

    interface IQuestion {
      key: number;
      question: string;
      answer: string[];
      trueAnswer: string;
      isTrue: boolean | null;
    }

    const questions: IQuestion[] = [
      {
        key: 1,
        question: "Question 1",
        answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
        trueAnswer: "A",
        isTrue: null,
      },
      {
        key: 2,
        question: "Question 2",
        answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
        trueAnswer: "B",
        isTrue: null,
      },
      {
        key: 3,
        question: "Question 3",
        answer: ["A. Answer 1", "B. Answer 2", "C. Answer 3", "D. Answer 4"],
        trueAnswer: "C",
        isTrue: null,
      },
    ];

    let currentIndex = 0;

    const resetButtons = () => {
      contentAnswer.forEach((btn) => {
        btn.style.backgroundColor = "";
        btn.disabled = false;
      });
    };

    const selectAnswer = (e: Event, index: number) => {
      const selectedBtn = e.target as HTMLButtonElement;

      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      const selectedAnswerText = currentQuestion.answer[index];
      if (!selectedAnswerText) return;

      const isCorrect = selectedAnswerText.startsWith(
        currentQuestion.trueAnswer,
      );

      if (isCorrect) {
        selectedBtn.style.backgroundColor = "#9aeabc";
        currentQuestion.isTrue = true;
      } else {
        selectedBtn.style.backgroundColor = "#ff9393";
        currentQuestion.isTrue = false;

        contentAnswer.forEach((btn, i) => {
          if (!currentQuestion.answer[i]) return;
          if (
            currentQuestion.answer[i].startsWith(currentQuestion.trueAnswer)
          ) {
            btn.style.backgroundColor = "#9aeabc";
          }
        });
      }

      contentAnswer.forEach((btn) => {
        btn.disabled = true;
      });
    };

    const renderQuestion = () => {
      if (!contentQuestion || !contentAnswer || contentAnswer.length === 0)
        return;

      resetButtons();

      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      contentQuestion.innerHTML = currentQuestion.question;

      currentQuestion.answer.forEach((answerText, index) => {
        if (contentAnswer[index]) {
          contentAnswer[index].innerHTML = answerText;
          contentAnswer[index].onclick = (e) => selectAnswer(e, index);
        }
      });

      if (btnNextQuestion) {
        btnNextQuestion.disabled = currentIndex === questions.length - 1;
      }
      if (btnBackQuestion) {
        btnBackQuestion.disabled = currentIndex === 0;
      }
    };

    const handleNextQuestion = () => {
      if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
      }
    };

    const handleBackQuestion = () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
      }
    };

    if (btnNextQuestion) {
      btnNextQuestion.addEventListener("click", handleNextQuestion);
    }

    if (btnBackQuestion) {
      btnBackQuestion.addEventListener("click", handleBackQuestion);
    }

    if (quiz && contentAnswer && contentQuestion) {
      renderQuestion();
    }
    currentQuestion.isTrue = true;
  } else {
    selectedBtn.style.backgroundColor = "#ff9393";
    currentQuestion.isTrue = false;

    contentAnswer.forEach((btn, i) => {
      if (!currentQuestion.answer[i]) return;
      if (currentQuestion.answer[i].startsWith(currentQuestion.trueAnswer)) {
        btn.style.backgroundColor = "#9aeabc";
      }
    });
  }

  contentAnswer.forEach((btn) => {
    btn.disabled = true;
  });
};

const renderQuestion = () => {
  if (!contentQuestion || !contentAnswer || contentAnswer.length === 0) return;

  resetButtons(); // Clear colors from the previous question

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return;
  contentQuestion.innerHTML = currentQuestion.question;

  currentQuestion.answer.forEach((answerText, index) => {
    if (contentAnswer[index]) {
      contentAnswer[index].innerHTML = answerText;
      // Attach the selectAnswer function to each button's click event
      contentAnswer[index].onclick = (e) => selectAnswer(e, index);
    }
  });

  if (btnNextQuestion) {
    btnNextQuestion.disabled = currentIndex === questions.length - 1;
  }
  if (btnBackQuestion) {
    btnBackQuestion.disabled = currentIndex === 0;
  }
};

const handleNextQuestion = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
};

const handleBackQuestion = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
};

if (btnNextQuestion) {
  btnNextQuestion.addEventListener("click", handleNextQuestion);
}

if (btnBackQuestion) {
  btnBackQuestion.addEventListener("click", handleBackQuestion);
}

if (quiz && contentAnswer && contentQuestion) {
  renderQuestion();
}
