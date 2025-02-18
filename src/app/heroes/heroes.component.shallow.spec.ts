import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'

  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonder Woman', strength: 24},
      {id:3, name: 'Superboy', strength: 55}
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should set heroes correctly from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  })

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })
})

// PS Unit Tests 4.7 - More Complex Shallow Integration
// PS Unit Tests 4.8 - Mocking an Injected Service
// PS Unit Tests 4.9 - Mocking Child Components
// PS Unit Tests 4.10 - Dealing w/ Lists of Elements
