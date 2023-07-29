import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operation } from '../../models/Operation';
import { OperationService } from '../../services/operation.service';
import {JsonFormatPipe} from "../../json-format.pipe";


@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.css'],
  providers: [JsonFormatPipe]
})
export class OperationDetailsComponent implements OnInit {
  operationId!: number;
  operation!: Operation;

  constructor(
    private route: ActivatedRoute,
    private operationService: OperationService
  ) {}

  ngOnInit(): void {
    this.operationId = this.route.snapshot.params['id'];
    this.operationService.getOperationById(this.operationId).subscribe((operation) => {
      this.operation = operation;
    });
  }

}
