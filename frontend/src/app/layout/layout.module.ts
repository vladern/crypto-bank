import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '@shared/components/index';
import { LayoutRepository } from './domain/layout-repository';
import { LayoutRepositoryMock } from './infrastructure/layout-repository-mock';
import { LayoutComponent } from './application/layout.component';

const routes: Routes = [
  {
    path: 'account',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountModule),
  },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
];

const config: SocketIoConfig = { url: 'http://localhost:81', options: {} };

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HeaderComponent,
    SocketIoModule.forRoot(config),
  ],
  declarations: [LayoutComponent],
  providers: [
    { provide: LayoutRepository, useClass: LayoutRepositoryMock },
  ],
})
export class LayoutModule { }
