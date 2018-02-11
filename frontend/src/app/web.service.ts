import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/RX';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:52835/api';
  private messageStore = [];
    private messageSubject = new Subject();
    messages = this.messageSubject.asObservable();
    constructor(private http: Http, private sb: MatSnackBar) {
        //this.getMessages();
    }

     getMessages(user) {
            user = (user) ? '/' + user : '';
             this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
            this.messages = response.json();
            this.messageSubject.next(this.messages);
             }, error => {
                this.handleError("Unable to get messages")
             }); 
       
    }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
            this.messageStore.push(response.json()); 
            this.messageSubject.next(this.messageStore);  
        } catch (error) {
            this.handleError("Unable to Post message");  
        }
        
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', {duration: 2000});
    }
}