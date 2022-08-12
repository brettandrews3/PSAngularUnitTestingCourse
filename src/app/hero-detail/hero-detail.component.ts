import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  // 7.2: Adding in debounce fn described below; calling code for the save(),
  // instead of the usual callback fn. We tell save() to wait 250ms before
  // pinging the server. 'false' tells debounce() that we don't want to execute
  // immediately.
 /*
  save(): void {
  debounce(() => {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }, 250, false)();
}
*/

// 7.5: remove debounce
save(): void {
  someThirdPartyPromise().then(() => {
   this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  });
}

// 7.5: Adding in a function that makes a promise
function someThirdPartyPromise() {
  return new Promise((resolve) => {
    resolve(null);
  })
}

// PS Unit Tests 7.2 - Adding Async Code

// 7.2: Adding in a debounce fn to prevent bunch of server requests in case
// user spams the Save button
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  }
}
