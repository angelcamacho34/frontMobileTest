import { HttpErrorResponse } from '@angular/common/http';


export abstract class IWrapper {
    constructor() { }
    private readonly errorMessage = 'Algo salió mal favor de intentar mas tarde';

    public errorHandle(exception: HttpErrorResponse) {
        if (exception.error) {
            return new HttpErrorResponse({ error: this.errorMessage });
        }
    }
}
