import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuizContainerComponent } from '../quiz-container/quiz-container.component';
import { QuizResultsContainerComponent } from '../quiz-results-container/quiz-results-container.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @ViewChild('showResultsContainer') showResultsContainer!: QuizResultsContainerComponent ;
  @ViewChild('quizContainer') quizContainer!: QuizContainerComponent;

  isEnabled = false;
  isQuizStarted = false;
  showResults = false;
  quiz!: Quiz;
  questions = new Array<Question>();
  answers = new Array<Answer>();
  quizId: number;
  storeCounter!: number;


  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    
  ) {
    this.quizId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('idOfQuiz')!,
      10
    );
  }

  ngOnInit(): void {
    this.getQuestionsFromServer();
    this.getQuizByIdFromServer();
  }

  private getQuizByIdFromServer() {
    this.quizzesService.getQuizById(this.quizId).subscribe((result) => {
      this.quiz = result;
      
    });
  }

  private getQuestionsFromServer() {
    this.questionsService.getQuestions(this.quizId).subscribe((result) => {
      this.questions = result;
      this.questions.forEach((question) => this.getAnswersFromServer(question));
    });
  }

  private getAnswersFromServer(sentQuestion: Question) {
    this.questionsService.getAnswers(sentQuestion.id).subscribe((result) => {
      sentQuestion.answers = result;
    });
  }

  startQuiz() {
    this.isQuizStarted = true;
  }
 
}
