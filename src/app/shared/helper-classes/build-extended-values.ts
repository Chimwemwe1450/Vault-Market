import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConvertToBase64 } from './convert-to-base64';

import { ExtendedFields } from '../models/extended-fields.model';

import { environment } from 'src/environments/environment';

@Injectable()
export class BuildExtendedValues {

  static extendedLabels = ['id', 'tel2', 'value', 'tel3'];
  static apiBaseUrl = environment.baseUrl;

  constructor() {}

  static buildExtendedValues(formValues: FormGroup): {normal: object; extended: string} {
    const fields = {};
    const extendedFields: ExtendedFields = new ExtendedFields();

    Object.keys(formValues.value).forEach(key => {
      if (this.extendedLabels.includes(key)) {
        extendedFields[key] = formValues.get(key).value;
      } else {
        fields[key] = formValues.get(key).value;
      }
    });

    let base64: string;
    if (Object.keys(extendedFields).length) {
      base64 = ConvertToBase64.convert(extendedFields);
    }
    console.log('base64: ', base64, 'fields: ', extendedFields);

    return {
      normal: fields,
      extended: base64,
    };
  }

  static queryStringBuilder(data: any, method: string, extended?: string): string {
    let query = `${this.apiBaseUrl}method=${method}`;

    for (const prop in data) {
      if (data) {
        query = `${query}&${prop}=${data[prop]}`;
      }
    }

    if (extended) {
      query = `${query}&extended_fields=${extended}`;
    }

    return query;
  }

}
