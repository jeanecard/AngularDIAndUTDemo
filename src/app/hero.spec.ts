import { Hero } from './hero';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';


HttpClientModule


describe('Hero', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        // AppComponent,
        // HeroesComponent,
        // HeroDetailComponent,
        // MessageComponent
      ],
    }).compileComponents();
  }));


  it('should create an instance', () => {
    expect(new Hero()).toBeTruthy();
  });
});
