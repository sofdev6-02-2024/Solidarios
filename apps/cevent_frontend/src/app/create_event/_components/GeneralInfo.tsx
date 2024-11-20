import React, { useEffect, useState } from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import {
  OnCompleteCallback,
  FieldsGeneralInfo,
} from '@/utils/interfaces/CreateEvent';
import '../_styles/GeneralInfo.css';

const categories = [
  { value: 'Conference', label: 'Conference' },
  { value: 'Workshop', label: 'Workshop' },
  { value: 'Networking', label: 'Networking' },
  { value: 'Music', label: 'Music' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Art', label: 'Art' },
  { value: 'Social', label: 'Social' },
];

const GeneralInfo = ({ onComplete }: { onComplete: OnCompleteCallback }) => {
  const [fields, setFields] = useState<FieldsGeneralInfo>({
    title: '',
    shortDescription: '',
    description: '',
    category: '',
  });

  const handleFieldChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prevFields) => ({
        ...prevFields,
        [field]: e.target.value,
      }));
    };

  const checkCompletion = () => {
    const { title, shortDescription, description, category } = fields;
    return !!(title && shortDescription && description && category);
  };

  useEffect(() => {
    const isComplete = checkCompletion();
    onComplete(fields, isComplete);
  }, [fields, onComplete]);

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        General event information
      </Typography>

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Be clear and descriptive with a title that explains what your event is
        about.
      </FormHelperText>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={fields.title}
        onChange={handleFieldChange('title')}
        aria-label="Title"
        InputProps={{
          className: 'text-field-outline',
        }}
      />

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Set a short description for your event to give a brief summary of the
        event.
      </FormHelperText>

      <TextField
        label="Short Description"
        fullWidth
        margin="normal"
        value={fields.shortDescription}
        onChange={handleFieldChange('shortDescription')}
        aria-label="Short Description"
        InputProps={{
          className: 'text-field-outline',
        }}
      />

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Grab people's attention with a brief description of your event.
        Attendees will see it at the top of your event page.
      </FormHelperText>

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={fields.description}
        onChange={handleFieldChange('description')}
        aria-label="Description"
        InputProps={{
          className: 'text-field-outline',
        }}
      />

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Correctly categorize the type of event you are organizing.
      </FormHelperText>

      <TextField
        label="Category"
        fullWidth
        margin="normal"
        select
        value={fields.category}
        onChange={handleFieldChange('category')}
        aria-label="Category"
        InputProps={{
          className: 'text-field-outline',
        }}
        SelectProps={{
          native: true,
        }}
      >
        <option value="" disabled></option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

export default GeneralInfo;
