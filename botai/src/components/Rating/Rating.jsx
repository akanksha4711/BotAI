import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({value=0, setValue, type="controlled"}) {
//   const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {type==="controlled"?
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      :
      <Rating size='small' name="read-only" value={value} readOnly />}
    </Box>
  );
}
