import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResult } from 'src/app/models/testResult';
import { ProjectService } from 'src/app/services/project.service';
import { ResponseDto } from './../../models/ResponseDto';

@Component({
  selector: 'app-project-tests',
  templateUrl: './project-tests.component.html',
  styleUrls: ['./project-tests.component.css'],
})
export class ProjectTestsComponent implements OnInit {
  id!: number;
  testResult!: TestResult;

  isCollapsed = true;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProjectTestResults();
  }

  loadProjectTestResults(): void {
    this.projectService.runProjectTest(this.id).subscribe((data) => {
      console.log(data);
      this.testResult = data
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
