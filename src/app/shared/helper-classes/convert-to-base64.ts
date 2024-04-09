import { Injectable } from '@angular/core';

import { ExtendedFields } from '../models/extended-fields.model';

@Injectable()
export class ConvertToBase64 {

  constructor() {}

  static convert(data: ExtendedFields): string {
    const stringify = JSON.stringify(data);
    const base64String = btoa(stringify);

    return base64String;
  }

}
