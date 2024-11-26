import { UploadWidgetResult } from '@/utils/interfaces/UploadImage';
import { UploadButton } from '@bytescale/upload-widget-react';
import { Button } from '@mui/material';

interface UploadImageProps {
  onComplete: (files: UploadWidgetResult) => void;
}

const UploadImage = ({ onComplete }: UploadImageProps) => {
  const options = {
    apiKey: 'public_12a1zCF5PqAQXVgqd8XCdbdp8aFV',
    maxFileCount: 1,
  };

  return (
    <UploadButton
      options={options}
      onComplete={(files) => {
        onComplete(files[0]);
      }}
    >
      {({ onClick }) => <Button onClick={onClick}>Upload a file...</Button>}
    </UploadButton>
  );
};

export default UploadImage;
