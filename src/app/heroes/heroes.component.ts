import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
/**
 * Heroes list angular Component.
 */
export class HeroesComponent implements OnInit {
  heroes: any[];
  selectedHero: Hero = null;

  /**
   * Constructor used for DI
   * @param heroService : A Hero Service (concrete dependency as Angular Framework does not support Interface (TypeScript))
   * @param _messageService : A Message service (concrete dependency as Angular Framework does not support Interface (TypeScript))
   */
  constructor(private heroService: HeroService, private _messageService:MessageService) { 
    this.heroService.setMessageService(this._messageService)
  } 

  /**
   * Init process in Angular Frmaework.
   * Describe here what tyou are going to do..
   */
  ngOnInit() {
    // this.heroes = this.heroService.getHeroes();
    //Not a good practice, always test a property before accessing even if in this case it comes from DI and OnInit is the first to be called after constructor.
    //Define what happens in case of null service (Log, Rethrow etc..) and test it (UT)
    this.heroService.getHeroes().subscribe(heroesFromService => this.heroes = heroesFromService);
  }

  /**
   * Assign a hero as selected hero. No restriction.
   * Send a message to message Service : Here you could test this point with a UT if it's important.
   * @param hero : a Hero Model
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  //Not a good practice, always test a property (_messageService) before accessing even if in this case it comes from DI. NgInit or other method could have  "null" it.
  //Define what happens in case of null service (Log, Rethrow etc..) and test it (UT)
  //Another bad pratice : Don't hard code "Hero selectionné : ", rely on a constant or event better a service (could be internationalized)
    this._messageService.add("Hero selectionné : " + hero.name + '( ' + hero.id + ' )');
  }
}
