import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import EmbeddedAsset from '../components/EmbeddedAsset';

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
      const assetId = node.data.target.sys.id;
      // console.log("asset id", assetId);

      return <EmbeddedAsset assetId={assetId} />;
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
        <Box
          sx={{
            bgcolor: 'primary.light',
            borderRadius: 2,
            p: 3,
            color: 'white',
            mb: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Welcome to the Help Center!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our documents are categorized into three sections:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="span">Admin</Typography>
            </li>
            <li>
              <Typography variant="body1" component="span">Restaurant</Typography>
            </li>
            <li>
              <Typography variant="body1" component="span">End User</Typography>
            </li>
          </ul>
          <Typography variant="body1">
            Select a category from the side navigation, then click on the category title to expand and view the documents under that category. Click on any document title to view its contents.
          </Typography>
        </Box>

      )}
    </div>
  );
};

export default Home;