// HomePage.tsx

import React, { useState } from 'react';
import { Typography } from '@mui/material';

interface HomePageProps {
  selectedTitleId: string | null;
}

// Fake data with Lorem Ipsum content
const fakeData = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    title: 'Consectetur adipiscing elit',
    content: 'Vivamus lacinia odio vitae vestibulum.',
  },
  {
    id: '3',
    title: 'Integer nec odio',
    content: 'Sed non mauris vitae erat consequat auctor eu in elit.',
  },
  {
    id: '4',
    title: 'Praesent libero',
    content: 'Class aptent taciti sociosqu ad litora torquent.',
  },
  {
    id: '5',
    title: 'Sed cursus ante dapibus diam',
    content: 'Nam nec tellus a odio tincidunt auctor a ornare odio.',
  },
];

const Home: React.FC<HomePageProps> = ({ selectedTitleId }) => {
  const [selectedContent, setSelectedContent] = useState<string>('');

  // Update the content when the selected title changes
  React.useEffect(() => {
    if (selectedTitleId) {
      const selected = fakeData.find((item) => item.id === selectedTitleId);
      setSelectedContent(selected?.content || '');
    } else {
      setSelectedContent('');
    }
  }, [selectedTitleId]);

  return (
    <div>
      {selectedContent ? (
        <Typography variant="body1">{selectedContent}</Typography>
      ) : (
        <Typography variant="h5">
          Select a title from the side navigation.
        </Typography>
      )}
    </div>
  );
};

export default Home;
