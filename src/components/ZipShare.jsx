import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from "../urls";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import Toast from "./Toast";

const ZipShare = () => {
  const uploadRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Get the selected file
  };

  const handleClcik = () => {
    uploadRef.current.click();
  };

  const handleUpload = async () => {
    // Check if the file is a ZIP file
    // if (selectedFile.type !== "application/zip") {
    //   alert("Only Zip is allowed");
    //   console.log(selectedFile.type);
    //   return;
    // }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // Append the file to FormData

    try {
      await axios.post(`${BASE_URL}/api/zip/uploadZip`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
      setLoading(false);
    } catch (error) {
      toast.error("Error uploading file: " + error.message);
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/zip/downloadZip`, {
        responseType: "blob",
      });

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];

      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "") // Parse the filename
        : "downloaded-file.zip"; // Fallback filename

      const blob = new Blob([response.data], { type: "application/zip" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(link.href);

      toast.success("File downloaded successfully!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error downloading file: " + error.message);
    }
  };

  const paperStyle = {
    padding: 20,
    // height: "50vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = {
    margin: "8px 0",
    // backgroundColor: "#607d8b",
    width: "40%",
  };

  return (
    <Grid justifyContent="center" alignItems="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>SendZip</h2>
        </Grid>
        <input
          type="file"
          // fullWidth
          ref={uploadRef}
          // value={selectedFile}
          required
          style={{ my: 1, display: "none" }}
          name="zip"
          onChange={handleFileChange}
        />
        <Stack width="100%" justifyContent="center" alignItems="center">
          <IconButton onClick={handleClcik}>
            {selectedFile ? (
              <MdCloudUpload style={{ fontSize: 100, color: "#4caf50" }} />
            ) : (
              <MdCloudUpload style={{ fontSize: 100 }} />
            )}
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            onClick={handleUpload}
            color="warning"
            variant="contained"
            style={btnstyle}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              "Upload"
            )}
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={btnstyle}
            onClick={handleDownload}
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "white" }} size={24} />
            ) : (
              "Download"
            )}
          </Button>
        </Stack>
      </Paper>
      <Toast />
    </Grid>
  );
};

export default ZipShare;
