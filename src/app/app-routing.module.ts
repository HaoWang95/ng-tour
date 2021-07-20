import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HerosComponent } from './heros/heros.component';

const routes: Routes = [
  {path:"", redirectTo:"/dashboard", pathMatch: 'full'},
  {path:"dashboard", component: DashboardComponent},
  {path: 'heroes', component: HerosComponent},
  {path:"heroes/:id", component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
