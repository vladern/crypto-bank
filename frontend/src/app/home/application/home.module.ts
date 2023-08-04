import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@shared/components/index';
import { HomeRepository } from '../domain/home-repository';
import { HomeRepositoryMock } from '../infraestructure/home-repository-mock';

const routes: Routes = [
  {
    path: 'accounts',
    component: HomeComponent,
    loadChildren: () =>
      import('../accounts/application/accounts.module').then((m) => m.AccountsModule),
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HeaderComponent,
  ],
  declarations: [HomeComponent],
  providers: [
    { provide: HomeRepository, useClass: HomeRepositoryMock},
  ],
})
export class HomeModule { }
