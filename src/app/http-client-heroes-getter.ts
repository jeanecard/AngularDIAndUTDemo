import { HeroesGetterInterface } from './heroes-getter';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MessageServiceInterface } from './message-service-interface';

export class HttpClientHeroesGetter implements HeroesGetterInterface {

    private _messageService: MessageServiceInterface = null;
    constructor(private _http: HttpClient/* private _messageService?: MessageService*/) { }

    public get<T>(url: string): Observable<T> {
        if (this._messageService) {
            this._messageService.add('HttpClientHeroesGetter: Les heros viennent d\'être chargés.');
        }
        //Form mock heroes
        //return of(HEROES_2018);
        //From json server : 
        return this._http.get<T>(url);
    }
    /**
     * 
     * @param messageService set service for messaging
     */
    setMessageService(messageService: MessageServiceInterface): void {
        this._messageService = messageService;
    }
}
