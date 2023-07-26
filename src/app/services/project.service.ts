import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseURL = "http://localhost:8080/project"

  constructor(private httpClient : HttpClient) { }

  getProjectsList(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.baseURL}`)
  }
}
