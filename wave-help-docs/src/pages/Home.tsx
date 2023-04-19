// import React, { useState, useEffect } from 'react';
// import { Typography } from '@mui/material';
// import { Document } from '@contentful/rich-text-types';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { BLOCKS, MARKS } from '@contentful/rich-text-types';
// import { Asset, AssetFields } from 'contentful';
// import { getThePageForMe } from '../controllers/Doc';
// import { getAsset } from '../controllers/Asset';

// import { DocEntry } from '../models/Doc';

// //define interface with two optional properties, used as a prop type for the 'Home' component
// interface HomePageProps {
//   selectedTitleId: string | null;
//   docs: DocEntry[];
// }

// const richTextOptions = {
//   renderMark: {
//     [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
//     [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
//     [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
//   },
//   renderNode: {
//     [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
//       <p>{children}</p>
//     ),
//     [BLOCKS.EMBEDDED_ASSET]: async (node: any) => {
//       const { data } = node;
//       const { target } = data;
//       const { sys } = target;
//       const { id } = sys;
//       const asset = await getAsset(id);

//       return (
//         <img
//         src={asset.file}
//         alt={asset.title}
//          />
//       )
//     },
//   },
// };

// const Home: React.FC<HomePageProps> = ({ selectedTitleId, docs }) => {
//   const [selectedContent, setSelectedContent] = useState<Document | null>(null);

//   // Update the content when the selected title changes
//   // console.log('selectedTitleId', selectedTitleId);
//   useEffect(() => {
//     if (selectedTitleId) {
//       const selected = docs.find((doc) => doc.sys.id === selectedTitleId);
//       setSelectedContent(selected?.fields.body || null);
//     } else {
//       setSelectedContent(null);
//     }
//   }, [selectedTitleId, docs]);

//   return (
//     <div>
//       {selectedContent ? (
//         <Typography variant="body1">
//           {selectedContent.content &&
//             documentToReactComponents(selectedContent, richTextOptions)}
//         </Typography>
//       ) : (
//         <Typography variant="h5">
//           Select a title from the side navigation.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default Home;

//============================================

// import React, { useState, useEffect } from 'react';
// import { Typography } from '@mui/material';
// import { Document } from '@contentful/rich-text-types';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { BLOCKS, MARKS } from '@contentful/rich-text-types';
// import { Asset } from 'contentful';
// import { DocEntry } from '../models/Doc';
// import { getAsset } from '../controllers/Asset';

// interface HomePageProps {
//   selectedTitleId: string | null;
//   docs: DocEntry[];
// }

// const Home: React.FC<HomePageProps> = ({ selectedTitleId, docs }) => {
//   const [selectedContent, setSelectedContent] = useState<Document | null>(null);
//   const [assetData, setAssetData] = useState<Asset | null>(null);

//   useEffect(() => {
//     if (selectedTitleId) {
//       const selected = docs.find((doc) => doc.sys.id === selectedTitleId);
//       setSelectedContent(selected?.fields.body || null);
//     } else {
//       setSelectedContent(null);
//     }
//   }, [selectedTitleId, docs]);


//   const richTextOptions = {
//     renderMark: {
//       [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
//       [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
//       [MARKS.UNDERLINE]: (text: React.ReactNode) => <u>{text}</u>,
//     },
//     renderNode: {
//       [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
//         <p>{children}</p>
//       ),
//       [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
//         const assetId = node.data.target.sys.id;

//         if (!assetData) {
//           getAsset(assetId);
//           console.log("getAsset", getAsset)
//           return null;
//         }

//         const file = assetData.fields.file;
//         // const url = file?.url;
//         // const altText = assetData.fields.title;
//         const url = "https://images.ctfassets.net/p4y8ned8ech5/4zOrBQOpOES8mywBQgiggh/5c3d51155f0a8ed4f8446e312f1639e8/category.png"
//         const altText = "something"

//         return (
//           <img
//             src={url}
//             alt={altText}
//             style={{
//               maxWidth: '100%',
//               height: 'auto',
//             }}
//           />
//         );
//       },
//     },
//   };

//   return (
//     <div>
//       {selectedContent ? (
//         <Typography variant="body1">
//           {selectedContent.content &&
//             documentToReactComponents(selectedContent, richTextOptions)}
//         </Typography>
//       ) : (
//         <Typography variant="h5">
//           Select a title from the side navigation.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default Home;


//OG BELOW
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
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
        <Typography variant="h5">
          Select a title from the side navigation.
        </Typography>
      )}
    </div>
  );
};

export default Home;