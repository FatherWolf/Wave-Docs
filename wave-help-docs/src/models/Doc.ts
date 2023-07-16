import { Document } from '@contentful/rich-text-types';
import { Entry, Asset } from 'contentful';
import { objectValidate } from './Object';
import { stringValidate } from './String';

export interface Doc {
  title: string;
  subtitle?: string;
  body: Document;
  assets: Asset[]; // Update this line
  isCustomerDoc: boolean;
  isRestaurantDoc: boolean;
  isAdminDoc: boolean;
}

export interface DocFields extends Doc {
  fields: {
    [key: string]: unknown;
  };
  contentTypeId: string;
}

export interface DocEntry extends Omit<Entry<DocFields>, 'fields'> {
  fields: DocFields;
}

export interface DocEntryCollection {
  total: number;
  skip: number;
  limit: number;
  items: DocEntry[];
}

export function docValidate(value: unknown): DocEntry {
  const object = objectValidate(value);
  stringValidate(object.fields.title);
  stringValidate(object.fields.subtitle);
  objectValidate(object.fields.body);
  return value as DocEntry;
}
