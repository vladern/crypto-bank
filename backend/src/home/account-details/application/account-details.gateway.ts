import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AccountDetailsService } from '../domain/account-detail.service';

@WebSocketGateway(81)
export class AccountDetailsGateway implements OnGatewayInit {
  maxTimeout = 20000;
  minTimeout = 15000;
  timeInterval;
  @WebSocketServer() server: Server;

  constructor(private accountDetailService: AccountDetailsService) {}

  afterInit() {}

  @SubscribeMessage('on_some_transaction_changed')
  handleTransactionChange(client: Socket, accountID: number) {
    const room = `transaction-${accountID}`;
    client.join(room);
    setInterval(() => {
      this.accountDetailService
        .getAccountDetailsTransactions(Number(accountID))
        .then((transactionsMocks) => {
          const randomAccount =
            transactionsMocks[
              Math.floor(Math.random() * transactionsMocks.length)
            ];
          if (Math.floor(Math.random() * 2) === 0) {
            randomAccount.balance = Math.floor(Math.random() * 10000);
          }
          if (Math.floor(Math.random() * 2) === 0) {
            randomAccount.credit = Math.floor(Math.random() * 10000);
          }
          this.server.to(room).emit('transaction', randomAccount);
        });
    }, Math.floor(Math.random() * (this.maxTimeout - this.minTimeout + 1) + this.minTimeout));
  }
}
