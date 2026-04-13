import { Stack, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router"

function NotFound() {

  const navigate = useNavigate();

  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={4}
    >
      <Typography variant="h2" textAlign="center">
        404<br />Not Found
      </Typography>
      <Button variant="contained" size="large" onClick={() => { navigate(-1) }}>GO BACK</Button>
    </Stack>
  )
}

export default NotFound