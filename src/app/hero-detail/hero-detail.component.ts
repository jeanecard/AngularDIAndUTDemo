import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

  //Angular dependency.
  @Input() hero: Hero;
  
  /**
   * Default constructor
   */
  constructor() { }

  /**
   * Dummy on init
   */
  ngOnInit() {
  }
  
  /**
   * 1- Assign name to the input hero
   * 2- Assign now to the updateDate of hero input
   * Could be unit tested
   * @param value key pressed
   */
  onKey(value: string) {
    //1-
    this.hero.name = value;
    //2-
    this.hero.updateDate = new Date(Date.now());
  }
}
