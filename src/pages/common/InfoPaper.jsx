import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    background: `linear-gradient(145deg, ${theme.palette.action.hover}, ${theme.palette.background.paper})`,
  },
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

const InfoPaper = ({ title, value, icon: Icon }) => {
  const theme = useTheme();

  return (
    <StyledPaper elevation={0}>
      {Icon && (
        <Icon
          sx={{
            color: theme.palette.primary.main,
            fontSize: '1.5rem',
            mb: 1,
          }}
        />
      )}
      <Typography
        variant="subtitle2"
        color="text.secondary"
        gutterBottom
        sx={{
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          wordBreak: 'break-word',
        }}
      >
        {value || '-'}
      </Typography>
    </StyledPaper>
  );
};

export default InfoPaper;