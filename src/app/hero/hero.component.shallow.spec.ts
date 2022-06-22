import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
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
})
