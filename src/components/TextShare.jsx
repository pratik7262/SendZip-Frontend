import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Toast from "./Toast";
import {
  BASE_URL,
  GET_TEXT,
  SEND_TEXT,
  sendTextWithoutCode,
  sendZip,
} from "../urls";
import {
  background,
  borders,
  cardBackground,
  primary,
  secondary,
  textPrimary,
} from "../theme";
import { CheckCircle, ContentCopy } from "@mui/icons-material";
import Navigation from "./Navigation";

const INITIAL_DATA = { text: "", code: "" };

const TextShare = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState("");

  const handleCopy = (text, btn) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(btn);
    // toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(""), 2000);
  };

  function isSixDigitNumber(str) {
    return /^\d{6}$/.test(str);
  }

  const getText = async () => {
    try {
      if (!isSixDigitNumber(code)) {
        toast.warning("Please enter a valid 6-digit code.");
        return;
      }
      const response = await axios.get(`${BASE_URL}${GET_TEXT}${code}`);
      if (response.data.success) {
        setCode(response.data.text);
        toast.success("Text fetched successfully!");
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendText = async () => {
    try {
      if (!data.text.trim()) {
        toast.warn("Error: Text cannot be empty!");
        return;
      }

      console.log(`${BASE_URL}${SEND_TEXT}`);
      const response = await axios.post(`${BASE_URL}${SEND_TEXT}`, {
        text: data.text,
      });
      setData({ text: "", code: response.data.code });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
        <Grid container spacing={3} sx={{ maxWidth: "900px", width: "100%" }}>
          {/* Send Text Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: 3,
                backgroundColor: background[500],
                borderRadius: 3,
                boxShadow: `0px 0px 10px ${borders[500]}`,
              }}
            >
              <Typography
                variant="h6"
                color={textPrimary[500]}
                fontWeight="bold"
              >
                Send Text
              </Typography>

              <TextField
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={data.text}
                onChange={(e) => setData({ ...data, text: e.target.value })}
                placeholder="Enter your text here..."
                sx={{
                  backgroundColor: cardBackground[500],
                  borderRadius: 1,
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: borders[500] },
                    "&:hover fieldset": { borderColor: primary[500] },
                    "&.Mui-focused fieldset": { borderColor: primary[500] },
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: secondary[500],
                  mt: 2,
                  "&:hover": { backgroundColor: secondary[600] },
                }}
                onClick={sendText}
              >
                Send
              </Button>

              <Box
                sx={{
                  mt: 2,
                  p: 1,
                  textAlign: "center",
                  backgroundColor: cardBackground[500],
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body1">
                  {data.code ? data.code : "Code"}
                </Typography>
                {data.code && (
                  <IconButton onClick={() => handleCopy(data.code, "code")}>
                    {copied === "code" ? (
                      <CheckCircle sx={{ fontSize: "20px" }} color="success" />
                    ) : (
                      <ContentCopy sx={{ fontSize: "20px" }} />
                    )}
                  </IconButton>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Get Text Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: 3,
                backgroundColor: background[500],
                borderRadius: 3,
                boxShadow: `0px 0px 10px ${borders[500]}`,
              }}
            >
              <Typography
                variant="h6"
                color={textPrimary[500]}
                fontWeight="bold"
              >
                Get Text
              </Typography>

              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code here..."
                sx={{
                  backgroundColor: cardBackground[500],
                  borderRadius: 1,
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: borders[500] },
                    "&:hover fieldset": { borderColor: primary[500] },
                    "&.Mui-focused fieldset": { borderColor: primary[500] },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleCopy(code, "text")}>
                        {copied === "text" ? (
                          <CheckCircle color="success" />
                        ) : (
                          <ContentCopy />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={getText}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: primary[500],
                  mt: 2,
                  "&:hover": { backgroundColor: primary[700] },
                }}
              >
                Get
              </Button>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  p: 1,
                  textAlign: "center",
                  backgroundColor: cardBackground[500],
                  borderRadius: 1,
                }}
              >
                Enter a code to retrieve text.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Toast />
      </Box>
      <Navigation
        maxWidth="690px"
        mt={2}
        prev="sendZip"
        prevPath={sendZip}
        next="SendText Without Code"
        nextPath={sendTextWithoutCode}
      />
    </>
  );
};

export default TextShare;
