import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { TestResult } from '../models/testResult';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private backendHost = "http://localhost:8080/project"

  constructor(private http : HttpClient) { }

  getProjectsList(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.backendHost}`)
  }

  runProjectTest(id : number): Observable<TestResult>{
    return this.http.get<TestResult>(`${this.backendHost}/${id}/tests`)
  }

  public saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.backendHost}`, project);
  }
  public updateProject(project: Project): Observable<Project> {
    const url = `${this.backendHost}/${project.id}`;
    return this.http.put<Project>(url, project);
  }
  getProjectById(id: number): Observable<Project> {
    const url = `${this.backendHost}/${id}`;
    return this.http.get<Project>(url);
  }
}
