import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./accounts.component";
import { NgModule } from "@angular/core";
import { TableComponent } from "@shared/components/table/table.component";
import { BalanceTemplateComponent } from "@shared/components/balance-template/balance-template.component";
import { CommonModule } from "@angular/common";
import { AccountRepositoryMock } from "../infraestructure/account-repository-mock";
import { AccountRepository } from "../domain/account-repository";
import { HighlightChangeDirective } from "@shared/directives/highlight-change-directive/highlight-change.directive";
const routes: Routes = [
    { path: '', component: AccountsComponent },
    { path: 'detail/:id', loadChildren: () => import('../../account-details/application/account-detail.module').then(m => m.AccountDetailsModule) },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        TableComponent,
        BalanceTemplateComponent,
        HighlightChangeDirective,
        RouterModule.forChild(routes),
    ],
    declarations: [AccountsComponent],
    providers: [{ provide: AccountRepository, useClass: AccountRepositoryMock }],
})
export class AccountsModule { }