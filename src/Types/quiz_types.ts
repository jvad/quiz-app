export type QuizType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type CategoryType = {
  id: number;
  name: string;
};
export type QuestionType = {
  correct_answer: string;
  option: string[];
  question: string;
  category: string;
};
export type propTypes = {
  question: string;
  callback: (e: React.FormEvent<EventTarget>, selectedAns: string) => void;
  option: string[];
};
