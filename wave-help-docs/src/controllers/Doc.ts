import {
  APPLICATION_TYPE,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_ENVIRONMENT_ID,
  CONTENTFUL_SPACE_ID,
} from "../react-app-env";
import Doc from "../models/Doc";
import { Entry, EntryCollection } from "contentful";

export async function docsListForAudience() {
  let url = `https://${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=doc&`;

  switch (APPLICATION_TYPE) {
    case "ADMIN":
      url = url + "fields.isAdminDoc=true";
      break;
    case "CUSTOMER":
      url = url + "fields.isCustomerDoc=true";
      break;
    case "RESTAURANT":
      url = url + "fields.isRestaurant=true";
      break;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();

  return json as EntryCollection<Doc>;
}

export async function getThePageForMe(id: string): Promise<Entry<Doc>> {
  const url = `https://${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries/${id}?access_token=${CONTENTFUL_ACCESS_TOKEN}&include=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  return json;
}
