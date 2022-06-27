import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    // Create a special module just for testing purposes.
    // configureTestingModule takes a single parameter that's an object;
    // That object exactly matches the layout of when we create an app.module.
    // NO_ERRORS_SCHEMA: don't try to validate the schema | template for components used
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    // This function tells TestBed to use the testing module above & construct HeroComponent
    // createComponent() returns a ComponentFixture--a wrapper for a component used in testing.
    fixture = TestBed.createComponent(HeroComponent)
  });

  // Test: check that HeroComponent gets the correct Hero:
  it('should have the correct hero', () => {
    // Act
    fixture.componentInstance.hero = {id: 1, name: 'SuperDave', strength: 3};
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.hero.name).toEqual('SuperDave');
  })

  // PS Unit Tests 4.5 - Testing Rendered HTML
  // PS Unit Tests 4.6 - nativeElement vs. debugElement
  it('should render the hero name in an anchor tag', () => {
    // Arrange
    // We can see the hero name anchored out in hero.component.html, line 2
    // detectChanges is a wrapper for the component & its template.
    // It tells component: run change detection, update any existing bindings on component
    // Here, it looks at id binding and name binding
    fixture.componentInstance.hero = {id: 1, name: 'SuperDave', strength: 3};
    fixture.detectChanges();

    // PS Unit Tests 4.6: debugElement is a wrapper w/ diff functionality vs nativeElement
    let deA = fixture.debugElement.query(By.css('a'));
    //expect(fixture.debugElement.query(By.css('a')));
    expect(deA.nativeElement.textContent).toContain('SuperDave');

    // Act

    // Assert: grab anchor tag and look at its contents
    // Using fixture.componentInstance gets a handle to the created instance tested
    // nativeElement gets handle to the DOM element representing the template's container,
    // connecting us to the line 1 anchor {hero.id} in hero.component.html
    // textContent takes the inner text, ignores HTML, & ties it all together.
    // Thus, everything inside the anchor tag is '{hero.id} {hero.name}'
    expect(fixture.nativeElement
                  .querySelector('a')
                  .textContent)
                  .toContain('SuperDave')
  })
})
