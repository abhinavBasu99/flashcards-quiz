import { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions?limit=6")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  return (
    <div className="App">
      <FlashCards questions={questions} />
    </div>
  );
}

function FlashCards({ questions }) {
  const [questionId, setQuestionId] = useState(null);

  function handleClick(id) {
    setQuestionId(id !== questionId ? id : null);
  }

  return (
    <div className="flashcards">
      {questions.map((ques) => (
        <div
          key={ques.id}
          className={ques.id === questionId ? "selected" : ""}
          onClick={() => handleClick(ques.id)}
        >
          <p>
            {ques.id === questionId ? ques.correctAnswer : ques.question.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
