import { APPLICATION_TYPE } from '../../environment';
import { DocEntry, DocEntryCollection } from '../models/Doc';

export async function docsListForAudience(): Promise<DocEntryCollection> {
  let url = `https://${process.env.REACT_APP_CONTENTFUL_BASE_URL}/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}&content_type=doc&`;

  switch (APPLICATION_TYPE) {
    case 'ADMIN':
      url = url + 'fields.isAdminDoc=true';
      break;
    case 'CUSTOMER':
      url = url + 'fields.isCustomerDoc=true';
      break;
    case 'RESTAURANT':
      url = url + 'fields.isRestaurant=true';
      break;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();

  return json as DocEntryCollection;
}

export async function getThePageForMe(id: string): Promise<DocEntry> {
  const url = `https://${process.env.REACT_APP_CONTENTFUL_BASE_URL}/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID}/entries/${id}?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}&include=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  return json as DocEntry;
}
