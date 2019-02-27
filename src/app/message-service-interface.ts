import { Injectable } from '@angular/core';
 

export interface MessageServiceInterface {
    /**
     * Add a message to the service.
     *
     * @return nothing.
     */
    add(message: string) : void;
     /**
      * 
      */
    clear() : void;
    /**
     * 
     */
   
}