import { of } from "rxjs/internal/observable/of";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;    // mock service to call in component below

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'LebowskiDude', strength: 16},
      {id:2, name: 'LebowskiRich', strength: 5},
      {id:3, name: 'SobchakAmateur', strength: 19}
    ]

    // Here, we pass in an array of methods that we'll need to fake:
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    // To make this component work, we need to pass in an object that looks
    // like HeroService, which we defined as 'mockHeroService':
    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {
    it('should remove indicated hero from heroes list', () => {
      // For this deleteHero below, review the PS Unit Tests 3.5 video,
      // starting around 3:50 mark******
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    })
  })
})
