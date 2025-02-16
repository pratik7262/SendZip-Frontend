import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { background, borders, primary, secondary, textPrimary } from "../theme";
import { toast } from "react-toastify";
import {
  BASE_URL,
  GET_TEXT_WITHOUT_CODE,
  SEND_TEXT_WITHOUT_CODE,
  sendText as sendTextPath,
  sendZip,
} from "../urls";
import axios from "axios";
import Toast from "./Toast";
import Navigation from "./Navigation";

const TextShareWithoutCode = () => {
  const [text, setText] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const getText = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${GET_TEXT_WITHOUT_CODE}`);
      setText(response.data.text);
      toast.success("Text fetched successfully!");
    } catch (error) {
      toast.error("Error: Failed to fetch text!");
    }
  };

  const sendText = async () => {
    try {
      if (!text.trim()) {
        toast.error("Error: Text cannot be empty!");
        return;
      }
      const response = await axios.post(
        `${BASE_URL}${SEND_TEXT_WITHOUT_CODE}`,
        {
          text,
        }
      );
      setText("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
        maxWidth: isSmallScreen ? "90%" : "500px",
        margin: "auto",
        padding: isSmallScreen ? 2 : 4,
        backgroundColor: background[500],
        borderRadius: 3,
        boxShadow: `0px 0px 15px ${borders[500]}`,
      }}
    >
      <Typography
        variant={isSmallScreen ? "h6" : "h5"}
        color={textPrimary[500]}
        fontWeight="bold"
      >
        SendText Without Code
      </Typography>

      <TextField
        multiline
        rows={isSmallScreen ? 4 : 6}
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        sx={{
          backgroundColor: "#2a2a2a",
          borderRadius: 1,
          input: { color: "#f3f4f6" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: borders[500] },
            "&:hover fieldset": { borderColor: primary[500] },
            "&.Mui-focused fieldset": { borderColor: primary[500] },
          },
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: secondary[500],
              "&:hover": { backgroundColor: secondary[600] },
            }}
            onClick={sendText}
          >
            Send
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={getText}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: primary[500],
              "&:hover": { backgroundColor: primary[700] },
            }}
          >
            Get
          </Button>
        </Grid>
      </Grid>

      <Navigation
        prev="sendText"
        prevPath={sendTextPath}
        next="sendZip"
        nextPath={sendZip}
      />
      <Toast />
    </Box>
  );
};

export default TextShareWithoutCode;
