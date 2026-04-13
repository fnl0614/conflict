import { Stack, Typography } from '@mui/material';
import type { ElementType } from 'react';

interface SettingProps {
    Icon:  ElementType;
    content: string;
    onClick: () => void;
}

export default function SettingButton({Icon, content, onClick}: SettingProps) {
  return (
    <Stack 
      onClick={onClick}
      spacing={2} 
      direction='row'
      sx={{ bgcolor: 'primary_1.main', p: 2, cursor:'pointer'}}
      alignItems={'center'}
    >
      <Icon/>
      <Typography color='primary_2.main'>{content}</Typography>
    </Stack>
  )
}
