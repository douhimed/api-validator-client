import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private backendHost = "http://localhost:8086/project"

  constructor(private http: HttpClient) {
  }

  getProjectsList(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.backendHost}`)
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

  public deleteProject(id: number) {
    return this.http.delete(this.backendHost + "/project/" + id);
  }
}

