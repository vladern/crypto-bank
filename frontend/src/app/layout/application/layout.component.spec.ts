import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutRepository } from '../domain/layout-repository';
import { HeaderComponent } from '@shared/components';
import { LayoutComponent } from './layout.component';
import { LayoutRepositoryMock } from '../infrastructure/layout-repository-mock';


describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        HeaderComponent
      ],
      declarations: [LayoutComponent],
      providers: [
        { provide: LayoutRepository, useClass: LayoutRepositoryMock},
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
