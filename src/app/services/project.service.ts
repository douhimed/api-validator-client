import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  backendHost: string = 'http://localhost:8086';

  constructor(private http: HttpClient) {}

  public saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.backendHost}/project`, project);
  }
  public updateProject(project: Project): Observable<Project> {
    const url = `${this.backendHost}/project/${project.id}`;
    return this.http.put<Project>(url, project);
  }
  getProjectById(id: number): Observable<Project> {
    const url = `${this.backendHost}/project/${id}`;
    return this.http.get<Project>(url);
  }


}
