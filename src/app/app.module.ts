import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActionsButtons } from './components/actions-buttons/actions-buttons.component';
import { UpdateQuizzesComponent } from './components/update-quizzes/update-quizzes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AddingQuizzesComponent } from './components/adding-quizzes/adding-quizzes.component';
import { QuizContainerComponent } from './components/quiz-container/quiz-container.component';
import { QuizResultsContainerComponent } from './components/quiz-results-container/quiz-results-container.component';
import { QuestionsService } from './services/questions.service';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ListComponent,
    NavigationBarComponent,
    AdminComponent,
    ActionsButtons,
    UpdateQuizzesComponent,
    AddingQuizzesComponent,
    QuizContainerComponent,
    QuizResultsContainerComponent,
   
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AgGridModule, NgbModule, FormsModule],
  exports:[UpdateQuizzesComponent],
  providers: [QuestionsService, {
    provide: 'appName',
    useValue: 'Quizzler'
  }],
  bootstrap: [AppComponent],
  entryComponents: [ UpdateQuizzesComponent ],
})
export class AppModule {}
