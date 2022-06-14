import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'LebowskiDude', strength: 16},
      {id:2, name: 'LebowskiRich', strength: 5},
      {id:3, name: 'SobchakAmateur', strength: 19}
    ]

    // Unit Testing 3.4: We're getting the squiggles because HeroesComponent
    // requires an additional method that we're not testing right now. Next up,
    // we'll look at how mocking works to resolve this error.
    component = new HeroesComponent({});
  })
})
