import { Injectable } from '@angular/core';
import { Http, HttpResponse, HttpOptions} from '@capacitor-community/http';

import { IApiResponse } from '../interfaces/api-response';

import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private api_key = 'CC0BCCFC-02C7-4A4A-937B-0F68BDCA17AA';

  constructor(
    public _loaderService: LoaderService
  ) {}

  public async post(query: string): Promise<IApiResponse> {
    this.loader(true);

    const queryString = this.removeSpaces(query);
    console.log('queryString: ', queryString);
    const options: HttpOptions = {
      url: queryString,
      method: 'POST',
      headers: { api_key: this.api_key }
    };

    const response: HttpResponse = await Http.request(options);
    let data: IApiResponse;

    try {
      data = JSON.parse(response.data);
    }
    catch {
      data = undefined;
    }

    this.loader(false);

    console.log('RESPONSE CODE: ', data.info.code);
    console.log('RES DATA: ', JSON.stringify(data.data));
    return data;
  }

  public async assessmentPost<T>(queryString: string, payload: T): Promise<any> {
    this.loader(true);

    console.log('queryString: ', queryString);
    const options: HttpOptions = {
      url: queryString,
      data: payload,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    const response: HttpResponse = await Http.request(options);

    this.loader(false);

    console.log('response: ', JSON.stringify(response));
    return response;
  }

  private removeSpaces(query: string): string {
    return query.split(' ').join('%20');
  }

  private loader(action: boolean): void {
    if (action) {
      this._loaderService.presentLoading();
    } else {
      setTimeout(() => {
        this._loaderService.dismissLoading();
      }, 1000);
    }
  }

}
