import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators'; Error process must be coded

//To get data from json server for exemple : 
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { HttpClientHeroesGetter } from './http-client-heroes-getter';
import { MessageServiceInterface } from './message-service-interface';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /**
   * Hard coded baseURl for demo. purpose
   */
  private _heroesUrl = "http://localhost:3000";
  /**
   * MessageService injected by property.
   * Good pratice : Never let default value, explicity set private if you want a property to be private and explicitly set to null.
   */
  private _messageService: MessageServiceInterface = null;

  /**
   * 
   * @param _http DI constructor glue to httpClient
   */
  constructor(private _http: HttpClient) { }
  /**
   * Set the base url of the Rest Server
   * @param url : no restriction
   */
  setBaseUrl(url: string): void {
    this._heroesUrl = url;
  }

  /**
   * DI by property
   * @param messService an Interface :-)
   */
  setMessageService(messService: MessageServiceInterface): void{
    this._messageService = messService;
  }
  /**
   * Set the ressource and get HttpResponse from httpClient
   * 1- Log a message and only one (test it !)
   * 2- return observable from httpClient.
   */
  getHeroes(): Observable<Hero[]> {
    //1-
    this.log('HeroService: Appel du serveur http.');
    //Form mock heroes
    //return of(HEROES_2018);
    //From json server
    //2-
    //Bad practice : Test _http before accessing and describe in you contract what you are going to do if service is null
    //To define : What is done on Time Out ? 404 ? etc .. Unit test it (not done for demo purpose)
    // UT are mandatory when entries come from external services (USer, WebService, file etc.)
    //Bad practice : Don't hard code "/heroes2018" prefer a constant or a specific service injected.
    return this._http.get<Hero[]>(this._heroesUrl + "/heroes2018") ; 
  }

  /**
   * Log a HeroService message with the MessageService. Short cut to avoid testing _messageService before each log.
   * @param message to display / log
   */
  private log(message: string) {
    if (this._messageService) {
      //Bad practice : Don't hard code.
      this._messageService.add(`HeroService: ${message}`);
    }
  }
}
