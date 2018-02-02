import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebService {
    BASE_URL = 'http://localhost:52835/api';
    messages = [];
    constructor(private http: Http) {
        this.getMessages();
    }

    async getMessages() {
       var response =  await this.http.get(this.BASE_URL + '/messages').toPromise();
       this.messages = response.json();
    }

    postMessage(message) {
        return this.http.post(this.BASE_URL + '/messages', message).toPromise();
    }
}