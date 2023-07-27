import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectTestsComponent } from './components/project-tests/project-tests.component';

const routes: Routes = [
  {path:"projects", component:ProjectsListComponent},
  {path:"" , redirectTo:"projects" , pathMatch : 'full'},
  {path:"project/:id/tests" , component : ProjectTestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
