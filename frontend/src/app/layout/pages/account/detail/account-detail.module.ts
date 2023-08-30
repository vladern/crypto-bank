import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "@shared/components/table/table.component";
import { BalanceTemplateComponent } from "@shared/components/balance-template/balance-template.component";
import { HighlightChangeDirective } from "@shared/directives/highlight-change-directive/highlight-change.directive";
import { AccountDetailsComponent } from "./application/account-detail.component";
import { AccountDetailsRepository } from "./domain/account-details-repository";
import { AccountDetailsRepositoryMock } from "./infrastructure/account-detail-repository-mock";

const routes: Routes = [
    { path: '', component: AccountDetailsComponent },
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
    declarations: [AccountDetailsComponent],
    providers: [{ provide: AccountDetailsRepository, useClass: AccountDetailsRepositoryMock }],
})
export class AccountDetailsModule { }