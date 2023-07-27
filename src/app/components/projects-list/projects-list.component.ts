import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  projects:Project[] = [];

  constructor(private projectService: ProjectService){}

  ngOnInit() : void{
    this.getProjects();
  }

  private getProjects(){
    this.projectService.getProjectsList().subscribe(data =>{
      this.projects = data;
    })
  }
}
