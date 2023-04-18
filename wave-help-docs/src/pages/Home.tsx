import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { Asset } from 'contentful';

import { DocEntry } from '../models/Doc';

interface HomePageProps {
  selectedTitleId: string | null;
  docs: DocEntry[];
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p>{children}</p>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const asset = node.data.target as Asset;

      if (
        !asset ||
        !asset.fields ||
        !asset.fields.file ||
        !asset.fields.title
      ) {
        return null;
      }

      const file = asset.fields.file as Record<string, { url: string }>;
      const title = asset.fields.title as Record<string, string>;

      const url = file['en-US']?.url;
      const altText = title['en-US'];

      return (
        <img
          src={url}
          alt={altText}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      );
    },
  },
};

const Home: React.FC<HomePageProps> = ({ selectedTitleId, docs }) => {
  const [selectedContent, setSelectedContent] = useState<Document | null>(null);

  // Update the content when the selected title changes
  console.log('selectedTitleId', selectedTitleId);
  useEffect(() => {
    if (selectedTitleId) {
      const selected = docs.find((doc) => doc.sys.id === selectedTitleId);
      setSelectedContent(selected?.fields.body || null);
    } else {
      setSelectedContent(null);
    }
  }, [selectedTitleId, docs]);

  return (
    <div>
      {selectedContent ? (
        <Typography variant="body1">
          {selectedContent.content &&
            documentToReactComponents(selectedContent, richTextOptions)}
        </Typography>
      ) : (
        <Typography variant="h5">
          Select a title from the side navigation.
        </Typography>
      )}
    </div>
  );
};

export default Home;
