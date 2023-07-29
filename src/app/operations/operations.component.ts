import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Operation} from "../models/Operation";
import {OperationService} from "../services/operation.service";
import Swal from "sweetalert2";


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

  handleDeleteOperation(operationId: number) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#109406',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.deleteOperation(operationId).subscribe({
          next: (resp) => {
            this.operations = this.operations.filter((op) =>op.id !== operationId);
            Swal.fire({
              icon: 'success',
              title: 'Operation deleted',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              this.router.navigate(['/projects/:projectId/operations']);
            }, 1500);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (result.isDismissed) {
      }
    });
  }
  goToEditForm(operationId: number): void {
    this.router.navigate(['/update-operation', operationId]);
  }
}
