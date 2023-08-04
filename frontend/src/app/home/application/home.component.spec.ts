import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRepository } from '../domain/home-repository';
import { HomeRepositoryMock } from '../infraestructure/home-repository-mock';
import { HeaderComponent } from '@shared/components';


describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        HeaderComponent
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: HomeRepository, useClass: HomeRepositoryMock},
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
