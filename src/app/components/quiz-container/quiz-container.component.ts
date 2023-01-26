import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-quiz-container',
  templateUrl: './quiz-container.component.html',
  styleUrls: ['./quiz-container.component.scss'],
})
export class QuizContainerComponent implements OnInit {
  @Output() onShowResults: EventEmitter<number> = new EventEmitter<number>();
  @Input() quiz!: Quiz;
  questionIndex: number = 0;
  counter = 0;
  time: number = 0;
  quizTimer!: number;
  interval!: any;
  clickedShowRessultsButton = false;
  pauseSeconds = false;
  hasAnswered = false;
  private questionsCopy!: Question[];

  @Input() set questions(value: Array<Question>) {
    this.questionsCopy = structuredClone(value);
  }

  get questions() {
    return this.questionsCopy;
  }

  constructor() {}

  ngOnInit(): void {
    this.quizTimer = this.quiz.timeoutSeconds;
    this.startTimer();
  }

  checkAnswer(answer: Answer) {
    this.hasAnswered = true;
    answer.isClicked = true;
    if (answer.isCorrect) {
      this.counter = this.counter + 1;
    }
    this.pauseTimer();
  }

  onClickNextButton() {
    this.hasAnswered = false;
    this.questionIndex = this.questionIndex + 1;
    this.quizTimer = this.quiz.timeoutSeconds;
    this.startTimer();
  }

  onClickShowResults() {
    this.onShowResults.emit(this.counter);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.quizTimer--;

      if (this.quizTimer <= 0) {
        this.pauseTimer();
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
}
