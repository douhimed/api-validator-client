import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';

const routes: Routes = [
  {path:"projects", component:ProjectsListComponent},
  {path:"" , redirectTo:"projects" , pathMatch : 'full'},
  {path: "new-project", component: NewProjectComponent},
  {path: "update-project/:id", component: UpdateProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
