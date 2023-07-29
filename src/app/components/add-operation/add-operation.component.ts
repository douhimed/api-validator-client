import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from "../../models/Operation";
import { OperationService } from "../../services/operation.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent implements OnInit {
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

  onSubmit() {
    const projectId = this.route.snapshot.paramMap.get('projectId');
    if (projectId) {
      console.log(projectId, '==========')
      this.operationService.addOperation(projectId, this.operation).subscribe(
        operationId => {
          console.log("Operation added successfully with ID: ", operationId);
          Swal.fire({
            icon: 'success',
            title: 'Operation added',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['projects', projectId, 'operations']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ngOnInit(): void {
  }
}
