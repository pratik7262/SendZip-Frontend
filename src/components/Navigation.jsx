import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { textPrimary } from "../theme";

const Navigation = ({ prev, prevPath, next, nextPath, ...props }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ width: "100%" }}
      {...props}
    >
      <Link
        to={prevPath}
        style={{
          color: textPrimary[500],
          fontSize: isSmallScreen ? "0.9rem" : "1.1rem",
          textAlign: "center",
          marginTop: isSmallScreen ? "10px" : "15px",
          textDecoration: "none",
        }}
      >
        ⟵ {prev}
      </Link>
      <Link
        to={nextPath}
        style={{
          color: textPrimary[500],
          fontSize: isSmallScreen ? "0.9rem" : "1.1rem",
          textAlign: "center",
          marginTop: isSmallScreen ? "10px" : "15px",
          textDecoration: "none",
        }}
      >
        {next} ⟶
      </Link>
    </Stack>
  );
};

export default Navigation;
