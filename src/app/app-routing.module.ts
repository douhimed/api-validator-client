import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {UpdateProjectComponent} from "./components/update-project/update-project.component";
import {DeleteProjectComponent} from "./components/delete-project/delete-project.component";
import {ProjectsListComponent} from "./components/projects-list/projects-list.component";

const routes: Routes = [
  {path:"projects", component:ProjectsListComponent},
  {path:"" , redirectTo:"projects" , pathMatch : 'full'},
  {path: "new-project", component: NewProjectComponent},
  {path: "update-project/:id", component: UpdateProjectComponent},
  {path: "delete-project/:id", component: DeleteProjectComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
