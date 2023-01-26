import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-results-container',
  templateUrl: './quiz-results-container.component.html',
  styleUrls: ['./quiz-results-container.component.scss'],
})
export class QuizResultsContainerComponent implements OnInit {
  @Output() onTryAgain: EventEmitter<void> = new EventEmitter<void>();
  @Input() numberOfQuestions!: Number;
  @Input() counter!: Number;

  constructor() {}

  ngOnInit(): void {}

  onClickTryAgain() {
    this.onTryAgain.emit();
  }
}
