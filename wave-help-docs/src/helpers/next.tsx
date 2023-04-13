import { arrayFilterBoolean } from "../helpers/array";

export function createHead({ title, description }: { title?: string | string[]; description?: string } = {}) {
  return function Head() {
    return (
      <>
        <link rel="icon" href="/favicon.ico" />
        <title>{[...arrayFilterBoolean(Array.isArray(title) ? title : [title]), "Wavebites Help"].join(" | ")}</title>
        <meta name="description" content="Wavebites help site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
      </>
    );
  };
}
