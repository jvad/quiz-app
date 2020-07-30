import React, { useState } from "react";
import { propTypes } from "../Types/quiz_types";

const QuestionCard: React.FC<propTypes> = ({ question, option, callback }) => {
  const [selectedAns, setSelectedAns] = useState("");
  const handleSelection = (ev: any) => {
    setSelectedAns(ev.target.value);
  };
  return (
    <div className="question-container">
      <div>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
      </div>
      <form
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
      >
        {option.map((opt: string, ind: number) => (
          <div key={ind}>
            <input
              type="radio"
              name="opt"
              value={opt}
              id={opt}
              required
              checked={selectedAns === opt}
              onChange={handleSelection}
            />
            <label
              htmlFor={opt}
              dangerouslySetInnerHTML={{ __html: opt }}
            ></label>
          </div>
        ))}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default QuestionCard;
