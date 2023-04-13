/// <reference types="react-scripts" />
export const CONTENTFUL_ENVIRONMENT_ID = "master";
export const CONTENTFUL_SPACE_ID = "p4y8ned8ech5";
export const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN as string;
export const CONTENTFUL_BASE_URL = process.env.CONTENTFUL_BASE_URL as string;
export const APPLICATION_TYPE = process.env.APPLICATION_TYPE as "ADMIN" | "RESTAURANT" | "CUSTOMER";