import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent, children: [
  { path: '', redirectTo:'dashboard', pathMatch:'full' },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) }, { path: 'post/:id', loadChildren: () => import('./post/post.module').then(m => m.PostModule) }
] }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
