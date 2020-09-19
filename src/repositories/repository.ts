import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class Repository {

    constructor(protected http: HttpClient) { }

    get header() {
        return {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
        };
    }

    get(apiUrl: string) {
        return this.http.get(apiUrl)
            .pipe(
                map((response: any) => {
                    if (response.status === 'success') {
                        return response.data;
                    } else {
                        throw new HttpErrorResponse({ error: response });
                    }
                }));
    }

    post(apiUrl: string, params: any) {
        return this.http.post(apiUrl, params.toString(), this.header)
            .pipe(
                map((response: any) => {
                    if (response.status === 'success') {
                        return response.data;
                    } else {
                        throw new HttpErrorResponse({ error: response });
                    }
                }));
    }

    delete(apiUrl: string) {
        return this.http.delete(apiUrl, this.header)
            .pipe(
                map((response: any) => {
                    if (response.status === 'success') {
                        return response.data;
                    } else {
                        throw new HttpErrorResponse({ error: response });
                    }
                }));
    }
}
