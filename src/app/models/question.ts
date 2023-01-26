import { Answer } from './answer';

export interface Question {
  text: string;
  id: number;
  quizId: number;
  answers: Answer[];
}
