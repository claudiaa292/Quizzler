import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quiz } from 'src/app/models/quiz';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-adding-quizzes',
  templateUrl: './adding-quizzes.component.html',
  styleUrls: ['./adding-quizzes.component.scss'],
})
export class AddingQuizzesComponent implements OnInit {
  @ViewChild('nameInput', { static: true }) nameInputVariable!: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private quizzesService: QuizzesService
  ) {}

  quiz: Quiz = { name: '', timeoutSeconds: 15 };
  isTimeoutValueValidforAdding: boolean = true;
  isNameValueValidforAdding: boolean = true;
  maxChars = 30;
  role = '';
  chars = 0;

  ngOnInit(): void {
    console.log(this.nameInputVariable.nativeElement);
  }
  onAddQuiz() {
    this.addQuizzesToServer(this.quiz);
  }

  private addQuizzesToServer(quiz: Quiz) {
    this.quizzesService.addQuizzes(quiz).subscribe({
      next: (result) => {
        this.activeModal.close(this.quiz);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  log(...elements: any) {
    console.log(elements);
  }

  onValidateAddingName(event: any) {
    if (event.target.value.length <= 30) {
      this.isNameValueValidforAdding = true;
    } else {
      this.isNameValueValidforAdding = false;
    }
  }

  onValidateAddingTimeoutSeonds(event: any) {
    if (
      Number.isInteger(Number(event.target.value)) &&
      !isNaN(event.target.value) &&
      Number(event.target.value) >= 5 &&
      Number(event.target.value) < 120 &&
      !event.target.value.includes('e', '+', '-')
    ) {
      this.isTimeoutValueValidforAdding = true;
    } else {
      this.isTimeoutValueValidforAdding = false;
    }
  }

  onValidateWithKeyDown(event: any) {
    if (
      ['e', '.', '+', '-'].includes(event.key)
    ) {
      return false;
    }
    return true;
  }
}
