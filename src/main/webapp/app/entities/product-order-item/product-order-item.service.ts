import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductOrderItem } from 'app/shared/model/product-order-item.model';

type EntityResponseType = HttpResponse<IProductOrderItem>;
type EntityArrayResponseType = HttpResponse<IProductOrderItem[]>;

@Injectable({ providedIn: 'root' })
export class ProductOrderItemService {
    private resourceUrl = SERVER_API_URL + 'api/product-order-items';

    constructor(private http: HttpClient) {}

    create(productOrderItem: IProductOrderItem): Observable<EntityResponseType> {
        return this.http.post<IProductOrderItem>(this.resourceUrl, productOrderItem, { observe: 'response' });
    }

    update(productOrderItem: IProductOrderItem): Observable<EntityResponseType> {
        return this.http.put<IProductOrderItem>(this.resourceUrl, productOrderItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductOrderItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductOrderItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
