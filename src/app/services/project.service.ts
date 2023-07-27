import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { TestResult } from '../models/testResult';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseURL = "http://localhost:8080/project"

  constructor(private httpClient : HttpClient) { }

  getProjectsList(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.baseURL}`)
  }

  runProjectTest(id : number): Observable<TestResult>{
    return this.httpClient.get<TestResult>(`${this.baseURL}/${id}/tests`)
  }
}
