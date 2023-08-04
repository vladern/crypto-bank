import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightChangeDirective } from './highlight-change.directive';
const lowerClassName = 'lower-value';
const higherClassName = 'higher-value';
@Component({
  template: `<div [appHighlightChange]="value">Test</div>`,
  styles: [`
    .lower-value {
      background-color: green;
    }

    .higher-value {
      background-color: red;
    }
  `]
})
class TestComponent {
  value = 0;
}

describe('HighlightChangeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: HighlightChangeDirective;
  let hostElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HighlightChangeDirective],
    }).createComponent(TestComponent);

    // get the directive instance
    directive = fixture.debugElement
      .childNodes[0].injector.get(HighlightChangeDirective);

    // get the host element
    hostElement = fixture.nativeElement.querySelector('div');

    fixture.detectChanges(); // initial binding
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have no background color initially', () => {
    expect(hostElement.style.backgroundColor).toBe('');
  });

  it('should have green background color when value increases', () => {
    fixture.componentInstance.value = 10; // change the input value
    fixture.detectChanges(); // update the binding
    expect(hostElement.classList.contains(higherClassName)).toBeTrue();
  });

  it('should have red background color when value decreases', () => {
    fixture.componentInstance.value = -10; // change the input value
    fixture.detectChanges(); // update the binding
    expect(hostElement.classList.contains(lowerClassName)).toBeTrue;
  });

  it('should remove background color after 1 second', (done) => {
    fixture.componentInstance.value = 10; // change the input value
    fixture.detectChanges(); // update the binding
    expect(hostElement.classList.contains(higherClassName)).toBeTrue();
    setTimeout(() => {
      expect(hostElement.classList.contains(higherClassName)).toBeFalse();
      expect(hostElement.classList.contains(lowerClassName)).toBeFalse();
      done();
    }, 1000);
  });
});
