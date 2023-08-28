import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from 'src/app/models/testResult';
import { ProjectService } from 'src/app/services/project.service';
import { OperationService } from 'src/app/services/operation.service';
import { JiraTicketService } from 'src/app/services/jira-ticket.service';
import { Fields } from 'src/app/models/jira-models/fields';
import { Messages } from 'src/app/models/Messages';
import { jiraPayload } from 'src/app/models/jira-models/jiraPayload';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-project-tests',
  templateUrl: './project-tests.component.html',
  styleUrls: ['./project-tests.component.css'],
})
export class ProjectTestsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  id!: number;
  testResult!: TestResult;

  jiraModel: Fields = {
    summary: '',
    description: '',
    project: { key: '' },
    issuetype: { id: '' },
  };
  jiraPayload: jiraPayload = {
    fields: {
      summary: '',
      description: '',
      project: { key: '' },
      issuetype: { id: '' },
    },
  };

  isCollapsed = true;
  totalOperations!: number;
  validCount!: number;
  invalidCount!: number;
  otherCount = this.totalOperations - (this.validCount + this.invalidCount);

  //constructor
  constructor(
    private projectService: ProjectService,
    private operationService: OperationService,
    private toastr: ToastrService,
    private jiraTicketService: JiraTicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadProjectTestResults();
  }

  // Load project test results
  loadProjectTestResults(): void {
    this.projectService.runProjectTest(this.id).subscribe((data) => {
      for (let i = 0; i < data.responseDto.length; i++) {
        for (let j = 0; j < data.responseDto[i].messages.length; j++) {
          data.responseDto[i].messages[j].value = JSON.stringify(
            data.responseDto[i].messages[j].value
          );
        }
      }

      this.testResult = data;
      this.totalOperations = data.responseDto.length;
      this.validCount = this.getCountByValidationStatus(data, 'VALID');
      this.invalidCount = this.getCountByValidationStatus(data, 'INVALID');
      this.otherCount =
        this.totalOperations - (this.validCount + this.invalidCount);

      // Update pie chart data
      this.updatePieChartData();
    });
  }
  // Update pie chart data
  updatePieChartData(): void {
    this.pieChartData.datasets[0].data = [
      this.validCount,
      this.invalidCount,
      this.otherCount,
    ];
  }

  // ##########---PIE---##########
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['VALID'], ['INVALID'], ['BAD REQUEST']],
    datasets: [
      {
        data: [200, 10, 20],
        backgroundColor: ['#66BB6A', '#EF5350', '#ffcc00'],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }
  // ##########---PIE---##########

  // ##########---JIRA---##########
  sendJiraTicket(type: string, url: string, messages: Messages[]) {
    this.jiraModel.summary = `${type} : ${url}`;
    this.jiraModel.project.key = `AP`;

    let desc: string = '';
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      desc += `Rapport N°${i} :
              Operation : ${message.op ?? ''}
              Path : ${message.path ?? ''}
              Value : ${message.value ?? ''}
              -----------------------------\n`;
    }

    this.jiraModel.description = `${desc}`;
    this.jiraModel.issuetype.id = `10029`;

    this.jiraPayload.fields = this.jiraModel;

    this.jiraTicketService.sendJiraTicket(this.jiraPayload).subscribe(
      (response) => {
        this.showSuccessAlert();
        console.log('Jira ticket sent successfully!', response);
      },
      (error) => {
        this.showErrorAlert();
        console.error('Error sending Jira ticket:', error);
      }
    );
  }
  // ##########---JIRA---##########

  handleUpdateExpectedResponse(id: number, newExpectedResponse: string): void {
    this.operationService
      .updateExcpectedResponse(id, newExpectedResponse)
      .subscribe(
        (data) => {
          this.toastr.success(
            'Expected response updated successfully',
            'Success'
          );
          this.loadProjectTestResults();
        },
        (error) => {
          this.toastr.error(
            'Failed to update expected response: ' + error.error.message,
            'Error'
          );
        }
      );
  }

  toggleCollapse(responseDto: any) {
    responseDto.isCollapsed = !responseDto.isCollapsed;
  }

  showSuccessAlert() {
    this.toastr.success('Jira ticket sent successfully', '');
  }

  showErrorAlert() {
    this.toastr.error('Failed to send Jira ticket. Please try again later', '');
  }

  private getCountByValidationStatus(datas: any, status: string): number {
    let count = 0;
    for (const data of datas.responseDto) {
      if (data.validationStatus === status) {
        count++;
      }
    }
    return count;
  }
}
