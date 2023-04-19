import { useState, useEffect } from "react";
import { getAsset } from "../controllers/Asset";
import { Asset } from "contentful";

interface EmbeddedAssetProps {
  assetId: string;
}

const EmbeddedAsset: React.FC<EmbeddedAssetProps> = ({ assetId }) => {
  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const fetchedAsset = await getAsset(assetId);
      setAsset(fetchedAsset);
    };

    fetchAsset();
  }, [assetId]);

  if (!asset || !asset.fields || !asset.fields.file || !asset.fields.title) {
    return null;
  }

  const file = asset.fields.file as Record<string, { url: string }>;
  const title = asset.fields.title as Record<string, string>;

  let url = "";
  if ("url" in file) {
    url = `https:${file.url}`;
  }
  
  const altText = title["en-US"];

  return (
    <img
      src={url}
      alt={altText}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
};

export default EmbeddedAsset;
