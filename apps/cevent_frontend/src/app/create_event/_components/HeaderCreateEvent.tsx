import styles from "@/styles/create_event/HeaderCreateEvent.module.css";
import { Typography } from "@mui/material";

export default function HeaderCreateEvent() {
  return (
    <div>
      <Typography variant="h1" className={styles.header}>
        Create Event
      </Typography>
    </div>
  );
}
