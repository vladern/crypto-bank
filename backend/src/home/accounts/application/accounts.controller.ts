import { Controller, Get } from '@nestjs/common';
import { AccountsService } from '../domain/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll() {
    return this.accountsService.findAll();
  }
}
