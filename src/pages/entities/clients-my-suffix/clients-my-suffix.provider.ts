import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { ClientsMySuffix } from './clients-my-suffix.model';

@Injectable()
export class ClientsMySuffixService {
    private resourceUrl = Api.API_URL + '/clients';

    constructor(private http: HttpClient) { }

    create(clients: ClientsMySuffix): Observable<ClientsMySuffix> {
        return this.http.post(this.resourceUrl, clients);
    }

    update(clients: ClientsMySuffix): Observable<ClientsMySuffix> {
        return this.http.put(this.resourceUrl, clients);
    }

    find(id: number): Observable<ClientsMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
