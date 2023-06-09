import { Document } from '@contentful/rich-text-types';
import { Entry, Asset } from 'contentful';
import Audience from './Audience';
import { objectValidate } from './Object';
import { stringValidate } from './String';

export interface Doc {
  title: string;
  subtitle?: string;
  body: Document;
  audience: Entry<Audience>;
  assets: Asset[]; // Update this line
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
  objectValidate(object.fields.audience);
  return value as DocEntry;
}
