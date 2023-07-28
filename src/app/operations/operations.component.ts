import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Operation} from "../models/Operation";
import {OperationService} from "../services/operation.service";


@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  projectId!: number;
  operations: Operation[]=[];

  constructor(private operationService: OperationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.operationService.getAllOperationsByProjectId(this.projectId).subscribe(
        res => {
          this.operations = res?.operationDtos;
        },
        error => {
          console.error(error);
        }
      );
    });
  }
  onAddOperation() {
    this.router.navigate(['add-operation']);
  }
}
