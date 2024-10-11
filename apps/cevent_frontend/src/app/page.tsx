"use client";

import { routes } from "@/utils/navigation/Routes";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const handleCreateEvent = () => {
    router.push(routes.createEvent);
  }
  return (
    <div>
      <Typography variant="h1" >
        Cevent App
        <Button variant="contained" color="primary" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </Typography>
    </div>
  );
}
