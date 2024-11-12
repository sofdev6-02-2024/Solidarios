// EventStyles.ts
import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  cardStyles: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '800px',
  },
  titleStyles: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
  chipCategoryStyles: {
    color: '#035ae1',
    fontSize: '14px',
  },
  infoSection: {
    marginTop: '16px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  iconStyles: {
    color: '#035AE1',
  },
  labelStyles: {
    color: 'lightBlack.main',
    fontSize: '14px',
    marginRight: '4px',
  },
  timeStyles: {
    color: '#000',
    fontWeight: 'bold',
  },
  linkStyles: {
    color: '#035AE1',
    textDecoration: 'none',
  },
  shareTextStyles: {
    marginTop: '16px',
    color: '#616161',
  },
  iconGroup: {
    display: 'flex',
    gap: '8px',
  },
  iconShareStyles: {
    color: '#616161',
  },
  subscribeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderLeft: '1px solid #e0e0e0',
    paddingLeft: '16px',
  },
  subscribeTitleStyles: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '16px',
  },
  calendarButtonStyles: {
    backgroundColor: '#f5f5f5',
    color: '#616161',
    marginBottom: '12px',
  },
  ticketButtonStyles: {
    backgroundColor: '#035ae1',
    color: '#fff',
    width: '100%',
    fontWeight: 'bold',
  },
};

export default styles;
