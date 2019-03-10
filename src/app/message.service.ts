import { Injectable } from '@angular/core';
import { MessageServiceInterface } from './message-service-interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements MessageServiceInterface {
  private _messages: string[] = [];
  /**
   * Default constructor : Log a message (UT it)
   */
  public constructor() {
    //Bad practice : Hard code !
    this._messages.push("Construction de MessageService implémentant MessageServiceInterface");
  }

  /**
   * Public Get accessor for messages property.
   * Watch out, return your reference or a copy ?
   * reference allow to add message without call Add
   * Old Fashion way : copy force to call Add but "observers" (not implemented here) have to be notified that content have changed ?
   * Think about it : Why do not use a IEnumerable (IIterable) that add abstraction on the way your content manage data ? This way you 
   * declare yout data as read only :-)
   */
  public get messages(): string[] {
    return this._messages;
  }

  /**
   * Push messages in registry.
   * @param message : No restriction
   */
  public add(message: string): void {
    this._messages.push(message);
  }

  /**
   * Clear registry.
   */
  public clear(): void {
    this._messages = [];
  }
}
