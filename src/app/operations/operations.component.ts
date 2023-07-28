import { Component, OnInit } from '@angular/core';
import {Operation} from "../models/Operation";
import {OperationService} from "../services/operation.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  projectId!: number;
  operations: Operation[]=[];

  constructor(private operationService: OperationService, private router: Router) { }
  ngOnInit() {
    this.projectId = 1;
    this.operationService.getAllOperationsByProjectId(this.projectId).subscribe(
      operations => {
        this.operations = operations;
        console.log(operations)
      },
      error => {
        console.error(error);
      }
    );
  }
  onAddOperation() {
    this.router.navigate(['add-operation'], { queryParams: { projectId: this.projectId } });
  }
}
