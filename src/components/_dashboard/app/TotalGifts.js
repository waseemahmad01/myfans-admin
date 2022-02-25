import { Icon } from '@iconify/react';
//import windowsFilled from '@iconify/icons-ant-design/windows-filled';
import wrappedGift from '@iconify/icons-emojione-monotone/wrapped-gift';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
//import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(4, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 172;

export default function TotalGifts() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={wrappedGift} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{TOTAL}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        GIFTS
      </Typography>
    </RootStyle>
  );
}
