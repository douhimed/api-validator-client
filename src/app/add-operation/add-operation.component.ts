import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Operation} from "../models/Operation";
import {OperationService} from "../services/operation.service";


@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent implements OnInit {
  projectId!: number;
  operation: Operation = {
    id: 0,
    url: '',
    type: '',
    body: '',
    expectedResponse: '',
    actualResponse: '',
    expectedType: ''
  };

  constructor(private operationService: OperationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];
    });
  }
  onSubmit() {
    this.operationService.addOperation(this.projectId, this.operation).subscribe(
      operationId => {
        this.router.navigate(['projects', this.projectId, 'operations']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
