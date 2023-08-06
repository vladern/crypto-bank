import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Account } from '../domain/account.model';
import { AccountsService } from '../domain/accounts.service';

@WebSocketGateway(81)
export class AccountsGateway implements OnGatewayInit {
  timeout = 20000;
  timeInterval;
  @WebSocketServer() server: Server;

  constructor(private accountsService: AccountsService) {}

  afterInit() {
    this.initOnSomeAccountChangedEmitter();
  }

  private initOnSomeAccountChangedEmitter() {
    this.timeInterval = setInterval(() => {
      this.accountsService.findAll().then((accounts) => {
        const randomAccount = this.getRandomAccount(accounts);
        this.emitThatAccountChanged(randomAccount);
      });
    }, Math.floor(Math.random() * this.timeout) + this.timeout);
  }

  private emitThatAccountChanged(accountThatChanged: Account): void {
    this.server.emit('on_some_account_changed', accountThatChanged);
  }

  private getRandomAccount(accounts: Account[]): Account {
    const ramdomAccount = {
      ...accounts[Math.floor(Math.random() * accounts.length)],
    };
    if (Math.floor(Math.random() * 2) === 0) {
      ramdomAccount.balance = Math.floor(Math.random() * 10000);
    }
    if (Math.floor(Math.random() * 2) === 0) {
      ramdomAccount.availableBalance = Math.floor(Math.random() * 10000);
    }
    return ramdomAccount;
  }
}
