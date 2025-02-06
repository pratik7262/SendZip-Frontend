import React, { useState } from "react";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";
import { background, borders, primary, secondary, textPrimary } from "../theme";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../urls";
import axios from "axios";
import Toast from "./Toast";

const TextShare = () => {
  const [text, setText] = useState("");

  const getText = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/text/getText`);
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

      const responce = await axios.post(`${BASE_URL}/api/text/sendText`, {
        text,
      });
      setText("");
      toast.success(responce.data.message);
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
        maxWidth: "500px",
        margin: "auto",
        padding: 4,
        backgroundColor: background[500],
        borderRadius: 3,
        boxShadow: `0px 0px 15px ${borders[500]}`,
      }}
    >
      <Typography variant="h5" color={textPrimary[500]} fontWeight="bold">
        SendText
      </Typography>

      {/* Large Text Area */}
      <TextField
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        sx={{
          backgroundColor: "#2a2a2a",
          borderRadius: 1,
          input: { color: "#f3f4f6" }, // Light text
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: borders[500] },
            "&:hover fieldset": { borderColor: primary[500] },
            "&.Mui-focused fieldset": { borderColor: primary[500] },
          },
        }}
      />

      {/* Buttons at the bottom */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      <Link
        to="/"
        style={{
          color: textPrimary[500],
          fontSize: "1.1rem",
          textAlign: "center",
          marginTop: "10px",
          textDecoration: "none",
        }}
      >
        ➝ SendZip
      </Link>
      <Toast />
    </Box>
  );
};

export default TextShare;
