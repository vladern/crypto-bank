import { RouterModule, Routes } from "@angular/router";
import { AccountsComponent } from "./application/accounts.component";
import { NgModule } from "@angular/core";
import { TableComponent } from "@shared/components/table/table.component";
import { BalanceTemplateComponent } from "@shared/components/balance-template/balance-template.component";
import { CommonModule } from "@angular/common";
import { HighlightChangeDirective } from "@shared/directives/highlight-change-directive/highlight-change.directive";
import { AccountsRepository } from "./domain/account-repository";
import { AccountRepositoryMock } from "./infraestructure/account-repository-mock";
const routes: Routes = [
    { path: '', component: AccountsComponent },
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
    providers: [{ provide: AccountsRepository, useClass: AccountRepositoryMock }],
})
export class AccountsModule { }