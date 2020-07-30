import React, { useState, useEffect } from "react";
import "./App.css";
import { getQuiz, getCategory } from "./Services/quiz_services";
import { QuestionType, CategoryType } from "./Types/quiz_types";
import QuestionCard from "./Components/QuestionCard";

function App() {
  let [quiz, setquiz] = useState<QuestionType[]>([]);
  const [start, setStart] = useState(false);
  let [currentQuestion, setcurrentQuestion] = useState(0);
  let [score, setScore] = useState(0);
  let [difficulty, setDifficulty] = useState("");
  let [typ, setTyp] = useState("multiple");
  const [gameOver, setGameOver] = useState(false);
  const [totalQ, setTotalQ] = useState(5);
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(false);

  let [categories, setCetogories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const cat: CategoryType[] = await getCategory();
      setCetogories(cat);
    };
    fetchCategory();
  }, []);

  const callQuiz = async () => {
    setStart(true);
    setLoading(true);
    const questions: QuestionType[] = await getQuiz(
      totalQ,
      category,
      difficulty,
      typ
    );

    setquiz(questions);
  };

  if (!categories.length)
    return (
      <div className="wrapper">
        <div className="loading">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
            alt=""
            height="100px"
          />
        </div>
      </div>
    );

  if (!quiz.length)
    return (
      <div className="wrapper">
        {!start && (
          <form className="initialForm" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="totalQ">Category: </label>
              <select
                required
                name="Category"
                onChange={(e) => setCategory(parseInt(e.target.value))}
              >
                {categories.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Type: </label>
              <select
                required
                name="type"
                onChange={(e) => setTyp(e.target.value)}
              >
                <option value="multiple">Multiple</option>
                <option value="boolean">True False</option>
              </select>
            </div>
            <div>
              <label>Difficulty: </label>
              <select
                required
                name="type"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label>Total Question: </label>
              <input
                type="number"
                value={totalQ}
                id="textField"
                onChange={(e) => setTotalQ(parseInt(e.target.value))}
              />
            </div>
            <button onClick={() => callQuiz()}>Start</button>
          </form>
        )}
        {loading && (
          <div className="loading">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
              alt=""
              height="100px"
            />
          </div>
        )}
      </div>
    );
  const submitHandler = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    if (userAns === quiz[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    if (currentQuestion !== quiz.length - 1)
      setcurrentQuestion(++currentQuestion);
    else {
      setGameOver(true);
      setcurrentQuestion(0);
    }
  };

  const handleFinish = () => {
    setScore(0);
    setStart(false);
    setGameOver(false);
    setquiz([]);
    setTyp("multiple");
    setLoading(false);
  };
  return (
    <>
      <div className="wrapper">
        {start && !gameOver ? (
          <div>
            <h4>
              Question: {currentQuestion + 1}/{totalQ}
            </h4>
          </div>
        ) : null}

        {!gameOver && (
          <QuestionCard
            option={quiz[currentQuestion].option}
            question={quiz[currentQuestion].question}
            callback={submitHandler}
          ></QuestionCard>
        )}
        {gameOver && start ? (
          <div className="scoreCard">
            <h5>Quiz completed.</h5>
            <h5>
              Your Final score is {score}/{totalQ}
            </h5>
            <button onClick={() => handleFinish()}>Try Again</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
