import { HttpClient, HttpHandler } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(
   
    private httpClient: HttpClient) {}

  getQuestions(quizId: number): Observable<Question[]> {
  

    return this.httpClient.get<Question[]>(`http://localhost:3000/questions`, {
      params: {
        quizId: quizId,
      
      },
    });
  }

  getAnswers(questionId: number): Observable<Answer[]> {
    return this.httpClient.get<Answer[]>(`http://localhost:3000/answers`, {
      params: {
        questionId: questionId,
      },
    });
  }
}
