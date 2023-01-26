import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private httpClient: HttpClient) {}

  getQuizzes(): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>(`http://localhost:3000/quizzes`);
  }

  getQuizById(quizId: number): Observable<Quiz>{
    return this.httpClient.get<Quiz>(`http://localhost:3000/quizzes/${quizId}`);
  }

  deleteQuizzes(quizId: number): Observable<Quiz[]> {
    return this.httpClient.delete<any>(
      `http://localhost:3000/quizzes/${quizId}`
    );
  }

  editQuizzes(quizId: number, updatedQuiz: Quiz): Observable<Quiz> {
    return this.httpClient.put<Quiz>(
      `http://localhost:3000/quizzes/${quizId}`,
      updatedQuiz
    );
  }

  addQuizzes(newQuiz: Quiz):Observable<Quiz>{
    return this.httpClient.post<Quiz>(`http://localhost:3000/quizzes`,
    newQuiz);
  }

}
