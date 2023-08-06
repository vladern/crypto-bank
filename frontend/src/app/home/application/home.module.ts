import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@shared/components/index';
import { HomeRepository } from '../domain/home-repository';
import { HomeRepositorySocketIO } from '../infraestructure/home-repository-socket-io/home-repository-socket-io';

const routes: Routes = [
  {
    path: 'accounts',
    component: HomeComponent,
    loadChildren: () =>
      import('../accounts/application/accounts.module').then((m) => m.AccountsModule),
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
];

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HeaderComponent,
    SocketIoModule.forRoot(config),
  ],
  declarations: [HomeComponent],
  providers: [
    { provide: HomeRepository, useClass: HomeRepositorySocketIO},
  ],
})
export class HomeModule { }
