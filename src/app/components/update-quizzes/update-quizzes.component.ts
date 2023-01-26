import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-update-quizzes',
  templateUrl: './update-quizzes.component.html',
  styleUrls: ['./update-quizzes.component.scss'],
})
export class UpdateQuizzesComponent implements OnInit {
  isTimeoutValueforUpdatingValid: boolean = true;

  @Input() quiz! : Quiz;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
  onSave() {
    this.activeModal.close(this.quiz);
  }
  onValidateUpdatingQuiz(event: any){
    if ((event.target.value > 0 && !isNaN(event.target.value))) {
      this.isTimeoutValueforUpdatingValid = true;
    } else {
      this.isTimeoutValueforUpdatingValid = false;
    }
  }
  }

