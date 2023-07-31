import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResult } from 'src/app/models/testResult';
import { ProjectService } from 'src/app/services/project.service';
import { ResponseDto } from './../../models/ResponseDto';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-project-tests',
  templateUrl: './project-tests.component.html',
  styleUrls: ['./project-tests.component.css'],
})
export class ProjectTestsComponent implements OnInit {
  id!: number;
  testResult!: TestResult;

  isCollapsed = true;

  constructor(private projectService: ProjectService,private operationService: OperationService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProjectTestResults();
  }

  loadProjectTestResults(): void {
    this.projectService.runProjectTest(this.id).subscribe((data) => {
      this.testResult = data
    });
  }

  handleUpdateExpectedResponse(id: number, newExpectedResponse: string): void {
    this.operationService.updateExcpectedResponse(id, newExpectedResponse).subscribe(
      (data) => {
        console.log('Expected response updated successfully:', data);
        this.loadProjectTestResults();
      },
      (error) => {
        console.error('Failed to update expected response:', error);
      }
    );
  }

  toggleCollapse(responseDto: any) {
    responseDto.isCollapsed = !responseDto.isCollapsed;
  }
}
