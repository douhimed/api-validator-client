import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Operation} from "../models/Operation";
import {Project} from "../models/project";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private baseUrl = 'http://localhost:8080/operation';
  private baseUrlV2 = 'http://localhost:8080/project';
  constructor(private http: HttpClient) {
  }

  getAllOperationsByProjectId(projectId: number): Observable<Project> {
    const url = `${this.baseUrlV2}/${projectId}`;
    return this.http.get<Project>(url);
  }

  addOperation(projectId: string, operation: Operation): Observable<number> {
    const url = `${this.baseUrl}?projectId=${projectId}`;
    return this.http.post<number>(url, operation);
  }

  public deleteOperation(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
