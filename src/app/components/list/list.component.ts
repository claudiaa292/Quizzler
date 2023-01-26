import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../models/quiz';
import { QuizzesService } from '../../services/quizzes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  quizzes = new Array<Quiz>();

  constructor(
    private quizzesService: QuizzesService,
    private routerService: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.handleQuizzes();
  }

  private handleQuizzes() {
    this.quizzesService.getQuizzes().subscribe((result) => {
      this.quizzes = result;
    });
  }
}
