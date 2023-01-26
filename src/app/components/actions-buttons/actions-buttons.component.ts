import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Quiz } from 'src/app/models/quiz';
import { QuizzesService } from 'src/app/services/quizzes.service';

type ActionButtonsParams = ICellRendererParams & { refreshData: () => void, openEditModal: (quiz: Quiz) => void };

interface Params {
  data: any;
}

let cellParams: Params = {
  data: { /* ...... */ }
};

let otherParams = {
  refreshData: () => {},
  openEditModal: () => {}
};

// let combinedParams: any = { ...cellParams, ...otherParams };
let combinedParams: any = 2;

function agInit(cellRendererParams: ICellRendererParams) {
  /* ... */
}

agInit(combinedParams);



@Component({
  selector: 'actions-buttons',
  templateUrl: './actions-buttons.component.html',
})
export class ActionsButtons implements ICellRendererAngularComp {
  private params!: any;
  ngOnInit(): void {}

  constructor(
    private quizzesService: QuizzesService,
    private http: HttpClient
  ) {}

  agInit(cellRendererParams: ICellRendererParams): void {
    this.params = cellRendererParams;
  }

  onDelete() {
    this.quizzesService.deleteQuizzes(this.params.data.id).subscribe(() => {
      this.params.refreshData();
    });

  }

  onEdit() {
    this.params.openEditModal(this.params.data);
  }

  refresh() {
    return false;
  }
}
