import { TestBed } from '@angular/core/testing';
import { LayoutRepositoryWebsocket } from './layout-repository-websocket';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

describe('LayoutRepositoryWebsocket', () => {
    let service: LayoutRepositoryWebsocket;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LayoutRepositoryWebsocket]
        });
        service = TestBed.inject(LayoutRepositoryWebsocket);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return exchange rate from WebSocket', (done) => {
        const mockWebSocket = {
            onmessage: null,
            close: jasmine.createSpy('close')
        };
        spyOn(window, 'WebSocket').and.returnValue(mockWebSocket as any);
        const mockData = { p: '123.45' };

        service.getExchangeRate().subscribe(rate => {
            expect(rate).toBe(123.45);
            done();
        });

        mockWebSocket.onmessage({ data: JSON.stringify(mockData) });
    });
});
