import {Component} from '@angular/core';
import {Project} from 'src/app/models/project';
import {ProjectService} from 'src/app/services/project.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";
import {ToastrService} from 'ngx-toastr';
import {ResponseDto} from "../../models/ResponseDto";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  projects: Project[] = [];
  responseDto!: ResponseDto;
  request: any = {};
  comparisonResult: string = '';

  constructor(private http: HttpClient, private projectService: ProjectService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  private getProjects() {
    this.projectService.getProjectsList().subscribe(data => {
      this.projects = data;
    })
  }

  runProjectTests(id: number | undefined) {
    this.router.navigate(['/project', id, 'tests'])
  }

  updateProject(id: number): void {
    this.router.navigate(['update-project', id]);
  }

  handleDeleteProject(projectId: number) {
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
        this.projectService.deleteProject(projectId).subscribe({
          next: (resp) => {
            this.projects = this.projects.filter((p) => p.id !== projectId);
            Swal.fire({
              icon: 'success',
              title: 'Project deleted',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
          },
          error: (err) => {
            this.toastr.error('Error: ' + err.error.message, 'Error');
          },
        });
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          title: 'Project deletion canceled',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  handleCompare(id: number | undefined) {
    this.router.navigate(['/projects', id, 'rapport'])
  }
}
