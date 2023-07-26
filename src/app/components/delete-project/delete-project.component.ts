import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Project} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {
  projectId!: number;
  project!: Project;
  deleteProjectFormGroup: FormGroup;
  projects!: Observable<Array<Project>>;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.deleteProjectFormGroup = this.formBuilder.group({
      confirmation: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.project = project;
    });
  }

  handleDeleteProject(project: Project) {
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
        this.projectService.deleteProject(project.id).subscribe({
          next: (resp) => {
            this.projects = this.projects.pipe(
              map((data) => {
                let index = data.indexOf(project);
                data.slice(index, 1);
                return data;
              })
            );
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
            console.log(err);
          },
        });
      } else if (result.isDismissed) {
      }
    });
  }

}
