import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_BASE_URL,
  CONTENTFUL_ENVIRONMENT_ID,
  CONTENTFUL_SPACE_ID,
} from "@/environment";
import { Asset } from "contentful";

export async function getAsset(id: string) {
  const url = `https://${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/assets/${id}?access_token=${CONTENTFUL_ACCESS_TOKEN}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Bad response: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  return json as Asset;
}
