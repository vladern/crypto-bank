import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'list',
        loadChildren: () => import('./list/accounts.module').then(m => m.AccountsModule),
    },
    {
        path: 'detail/:id',
        loadChildren: () => import('./detail/account-detail.module').then(m => m.AccountDetailsModule),
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class AccountModule { }
