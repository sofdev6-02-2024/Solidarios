import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Avatar, Box, Typography } from '@mui/material';
import { styleEventOrganizer } from '@/styles/components/EventPageStyles';
interface OrganizerInfoProps {
  organizerType: 'Event Organizer' | 'Collaborator';
  user: UserInterface;
}

const OrganizerInfo = ({ organizerType, user }: OrganizerInfoProps) => {
  return (
    <Box sx={styleEventOrganizer.container}>
      <Box sx={styleEventOrganizer.infoUser}>
        <Avatar
          sx={styleEventOrganizer.avatar}
          src={user?.photoUrl}
          alt={user?.name}
        />
        <Box sx={styleEventOrganizer.containerName}>
          <Typography
            sx={{ ...styleEventOrganizer.grayText, minWidth: 120 }}
            variant="body"
          >
            {organizerType}
          </Typography>
          <Typography fontWeight="bold" variant="bodyLarge">
            {user?.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={styleEventOrganizer.containerName}>
        <Typography sx={styleEventOrganizer.grayText} variant="caption">
          Email
        </Typography>
        <Typography variant="body">{user.email}</Typography>
      </Box>
    </Box>
  );
};

export default OrganizerInfo;
