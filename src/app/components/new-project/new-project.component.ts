import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/project";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  newProjectFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
  }

  ngOnInit(): void {
    this.newProjectFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  handleSaveProject() {
    if (this.newProjectFormGroup.valid) {
      let project: Project = this.newProjectFormGroup.value;
      this.projectService.saveProject(project).subscribe({
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Project added',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            this.newProjectFormGroup.reset();
            this.router.navigateByUrl("/new-project");
          }, 1100);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
