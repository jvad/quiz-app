import { QuestionType, QuizType, CategoryType } from "../Types/quiz_types";

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
export const getQuiz = async (
  totalQ: number,
  cat: number,
  dif: string,
  type: string
): Promise<QuestionType[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQ}&category=${cat}&difficulty=${dif}&type=${type}`
  );

  let { results } = await res.json();
  const quiz: QuestionType[] = results.map((questionObj: QuizType) => {
    return {
      question: questionObj.question,
      correct_answer: questionObj.correct_answer,
      option: shuffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });

  return quiz;
};

export const getCategory = async (): Promise<CategoryType[]> => {
  const res = await fetch("https://opentdb.com/api_category.php");
  let { trivia_categories } = await res.json();
  return trivia_categories;
};
