import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { LayoutRepositorySocketIO } from './layout-repository-socket-io';
import { Observable } from 'rxjs';

const socketMock = jasmine.createSpyObj('Socket', ['fromEvent']);

describe('HomeRepositorySocketIO', () => {
  let repository: LayoutRepositorySocketIO;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutRepositorySocketIO,
        { provide: Socket, useValue: socketMock }
      ]
    });
    repository = TestBed.inject(LayoutRepositorySocketIO);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

    it('should get exchange rate from socket event', () => {
    const mockObservable = new Observable<number>((observer) => {
      observer.next(1.23);
      observer.complete();
    });

    socketMock.fromEvent.and.returnValue(mockObservable);

    repository.getExchangeRate().subscribe((rate) => {
      expect(rate).toEqual(1.23);
      expect(socketMock.fromEvent).toHaveBeenCalledWith('exchange_rate_changed');
    });
  });
});
