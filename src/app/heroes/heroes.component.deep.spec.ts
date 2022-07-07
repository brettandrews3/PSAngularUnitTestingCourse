import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs/internal/observable/of";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //fixture.detectChanges();
  });

  it('should render each hero as a HeroComponent', () => {
    // Arrange: in the BeforeEach() as fixture and mockHeroService

    // Act: triggers detectChanges, which triggers ngOnInit()
    fixture.detectChanges();

    // Assert: find child elements through a directive
    // debugElement gets list of all app-hero elements created in the
    // <ul> on heroes.component.html
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    for(let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  })

});

// PS Unit Tests 5.2 - Creating a Deep Integration Test
// PS Unit Tests 5.3 - Finding Elements by Directive
