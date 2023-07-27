import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  projects:Project[] = [];

  constructor(private projectService: ProjectService,
    private router : Router){}

  ngOnInit() : void{
    this.getProjects();
  }

  private getProjects(){
    this.projectService.getProjectsList().subscribe(data =>{
      this.projects = data;
    })
  }

  runProjectTests(id : number | undefined){
    this.router.navigate(['/project',id,'tests'])
  }
}
