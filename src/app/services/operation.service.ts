import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Operation} from "../models/Operation";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private baseUrl = 'http://localhost:8080/operation';

  constructor(private http: HttpClient) { }

  getAllOperationsByProjectId(projectId: number): Observable<Operation[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Operation[]>(url);
  }
  addOperation(projectId: number, operation: Operation): Observable<number> {
    const url = `${this.baseUrl}?projectId=${projectId}`;
    return this.http.post<number>(url, operation);
  }
}
