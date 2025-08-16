import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CloudUpload, CloudDownload } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL, DOWNLOAD_ZIP, sendText, UPLOAD_ZIP } from "../urls";
import { toast } from "react-toastify";
import Toast from "./Toast";
import {
  accent,
  primary,
  secondary,
  textPrimary,
  background,
  borders,
  accentSecondary,
} from "../theme";
import Navigation from "./Navigation";

const ZipShare = () => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Responsive behavior
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = () => {
    uploadRef.current.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      await axios.post(`${BASE_URL}${UPLOAD_ZIP}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      toast.error("Error uploading file: " + error.message);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}${DOWNLOAD_ZIP}`, {
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : "downloaded-file.zip";

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(link.href);

      toast.success("File downloaded successfully!");
    } catch (error) {
      toast.error("Error downloading file: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: isSmallScreen ? "90%" : "500px",
        margin: "auto",
        padding: isSmallScreen ? 2 : 4,
        backgroundColor: background[500],
        borderRadius: 3,
        boxShadow: `0px 0px 15px ${borders[500]}`,
      }}
    >
      {/* Header */}
      <Typography variant="h5" color={textPrimary[500]} fontWeight="bold">
        SendZip
      </Typography>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={uploadRef}
        style={{ display: "none" }}
        name="zip"
        onChange={handleFileChange}
      />

      {/* Upload Icon with File Name */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            color: selectedFile ? accent[500] : accentSecondary[500],
          }}
        >
          <CloudUpload sx={{ fontSize: isSmallScreen ? 60 : 80 }} />
        </IconButton>
        <Typography
          variant="body2"
          color={textPrimary[500]}
          sx={{ opacity: selectedFile ? 1 : 0.5, textAlign: "center" }}
        >
          {selectedFile ? selectedFile.name : "No file selected"}
        </Typography>
      </Box>

      {/* Upload & Download Buttons */}
      <Grid container spacing={2} sx={{ width: "100%", my: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleUpload}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: secondary[500],
              "&:hover": { backgroundColor: secondary[600] },
              height: "45px",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              <>
                <CloudUpload sx={{ marginRight: 1, fontSize: 20 }} />
                Upload
              </>
            )}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={handleDownload}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: primary[500],
              "&:hover": { backgroundColor: primary[700] },
              height: "45px",
            }}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              <>
                <CloudDownload sx={{ marginRight: 1, fontSize: 20 }} />
                Download
              </>
            )}
          </Button>
        </Grid>
      </Grid>

      <Navigation next="sendText" nextPath={sendText} />

      <Toast />
    </Box>
  );
};

export default ZipShare;
