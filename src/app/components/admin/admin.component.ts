import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions.service';
import { Quiz } from '../../models/quiz';
import { QuizzesService } from '../../services/quizzes.service';
import { ActionsButtons } from '../actions-buttons/actions-buttons.component';
import { AddingQuizzesComponent } from '../adding-quizzes/adding-quizzes.component';
import { UpdateQuizzesComponent } from '../update-quizzes/update-quizzes.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  quizzes = new Array<Quiz>();
  subjectBehavior$ = new BehaviorSubject<string>("initialValue");
  subject$ = new ReplaySubject<string>();

  myString = '';
  public columnDefs;

  constructor(
    private quizzesService: QuizzesService,
    private questionService: QuestionsService,
    private modalService: NgbModal
  ) {

    this.columnDefs = [
      { headerName: 'Quiz name', field: 'name' },
      {
        headerName: 'Question timeout (seconds)',
        field: 'timeoutSeconds',
        resizable: true,
        width: 300,
      },
      { headerName: 'Questions count', field: 'questionsCount' },
      {
        headerName: 'Actions',
        cellRenderer: ActionsButtons,
        cellRendererParams: {
          refreshData: this.handleQuizzes.bind(this),
          openEditModal: (quizObject: Quiz) => {
            let modalUpdateQuiz = this.modalService.open(
              UpdateQuizzesComponent
            );
            modalUpdateQuiz.componentInstance.quiz = quizObject;
            modalUpdateQuiz.closed.subscribe((result) => {
              this.editQuizzesFromServer(result);
            });
          },
        },
      },
    ];
  }
  ngOnInit(): void {}

  log(abc: any) {
    console.log(abc);
  }

  registerListener() {
    this.subject$.subscribe((result) => {
      console.log(result + ' registerListener');
    });
  }

  onGridReady(params: any) {
    this.handleQuizzes();
    params.api.sizeColumnsToFit();
  }

  private editQuizzesFromServer(quiz: Quiz) {
    this.quizzesService.editQuizzes(quiz.id!, quiz).subscribe(() => {
      this.handleQuizzes();
    });
  }

  private handleQuizzes() {
    this.quizzesService.getQuizzes().subscribe((result) => {
      this.quizzes = result;
      this.getQuestionsCount();
    });
  }

  getQuestionsCount() {
    this.quizzes.forEach((quiz) => {
      this.questionService.getQuestions(quiz.id!).subscribe((result) => {
        quiz.questionsCount = result.length;
        this.quizzes = [...this.quizzes];
      });
    });
  }

  openAddingQuizzesModal() {
    let modalAddingQuiz = this.modalService.open(AddingQuizzesComponent);
    modalAddingQuiz.closed.subscribe(() => {
      this.handleQuizzes();
    });
  }
}
