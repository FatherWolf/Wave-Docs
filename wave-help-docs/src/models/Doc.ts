import { Document } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import Audience from "./Audience";
import { objectValidate } from "./Object";
import { stringValidate } from "./String";

export default interface Doc {
  title: string;
  subtitle?: string;
  body: Document;
  audience: Entry<Audience>;
  fields: {
    description: string;
  };
  contentTypeId: string;
}

export function docValidate(value: unknown): Doc {
  const object = objectValidate(value);
  stringValidate(object.title);
  stringValidate(object.subtitle);
  objectValidate(object.body);
  objectValidate(object.audience);
  return value as Doc;
}
