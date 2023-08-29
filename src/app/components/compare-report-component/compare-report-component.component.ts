import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TestResult } from '../../models/testResult';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-compare-report-component',
  templateUrl: './compare-report-component.component.html',
  styleUrls: ['./compare-report-component.component.css'],
})
export class CompareReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  testResult!: TestResult;
  loading: boolean = true;
  error!: string;

  totalOperations!: number;
  validCount!: number;
  invalidCount!: number;
  otherCount = this.totalOperations - (this.validCount + this.invalidCount);

  constructor(
    private route: ActivatedRoute,
    private compareService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectIdParam = this.route.snapshot.paramMap.get('id');
    if (!projectIdParam) {
      this.error = 'Project ID is missing or invalid.';
      this.loading = false;
      return;
    }

    const projectId = +projectIdParam;
    this.compareService.compareJson(projectId).subscribe(
      (testResult: TestResult) => {
        for (let i = 0; i < testResult.responseDto.length; i++) {
          for (let j = 0; j < testResult.responseDto[i].messages.length; j++) {
            testResult.responseDto[i].messages[j].value = JSON.stringify(
              testResult.responseDto[i].messages[j].value
            );
          }
        }

        this.testResult = testResult;
        this.loading = false;
        this.totalOperations = testResult.responseDto.length;
        this.validCount = this.getCountByValidationStatus(testResult, 'VALID');
        this.invalidCount = this.getCountByValidationStatus(
          testResult,
          'INVALID'
        );
        this.otherCount =
          this.totalOperations - (this.validCount + this.invalidCount);

        // Update pie chart data
        this.updatePieChartData();
      },
      (error: any) => {
        this.error = 'Error fetching comparison report.';
        this.loading = false;
      }
    );
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

  toggleCollapse(responseDto: any) {
    responseDto.isCollapsed = !responseDto.isCollapsed;
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
