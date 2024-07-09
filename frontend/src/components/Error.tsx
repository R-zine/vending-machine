import { useEffect } from "react";
import { useStore } from "../store";
import { Alert } from "@mui/material";

export const Error = () => {
  const error = useStore((state) => state.error);
  const setError = useStore((state) => state.setError);

  useEffect(() => {
    // clear the error after 5 seconds
    if (error) setTimeout(() => setError(""), 5000);
  }, [error]);

  if (!error) return null;

  return (
    <Alert
      sx={{ position: "fixed", left: 36, bottom: 36, zIndex: 1000 }}
      severity="error"
    >
      {error}
    </Alert>
  );
};
