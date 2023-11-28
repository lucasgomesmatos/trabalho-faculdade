import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateStudentType } from '../types/CreateStudentType';
import { StudentType } from '../types/StudentType';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = environment.BASE_URL_API.concat('/students');

  constructor(private httpClient: HttpClient) {}

  findStudent() {
    return this.httpClient.get<StudentType[]>(this.url);
  }

  saveStudent(student: CreateStudentType) {
    return this.httpClient
      .post<CreateStudentType>(this.url, student)
      .pipe(take(1));
  }

  findStudentById(id: string) {
    return this.httpClient.get<StudentType>(`${this.url}/${id}`).pipe(take(1));
  }

  updateStudent(student: StudentType) {
    return this.httpClient
      .put<StudentType>(`${this.url}/${student.registration}`, student)
      .pipe(take(1));
  }

  deleteStudent(registration: string) {
    return this.httpClient.delete(`${this.url}/${registration}`).pipe(take(1));
  }
}
