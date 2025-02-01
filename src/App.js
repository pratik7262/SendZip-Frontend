import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from "./urls";
import { MdCloudUpload } from "react-icons/md";

function App() {
  const uploadRef = useRef();

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

    const formData = new FormData();
    formData.append("file", selectedFile); // Append the file to FormData

    try {
      await axios.post(`${BASE_URL}/api/zip/uploadZip`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      alert("Error uploading file: " + error.message);
    }
  };

  const handleDownload = async () => {
    try {
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

      alert("File downloaded successfully!");
    } catch (error) {
      alert("Error downloading file: " + error.message);
    }
  };

  const paperStyle = {
    padding: 20,
    // height: "50vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0", backgroundColor: "#607d8b" };

  return (
    <Grid mt={4} justifyContent="center" alignItems="center">
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
            Upload
          </Button>
          <Button
            type="submit"
            // color="#9e9e9e"
            variant="contained"
            style={btnstyle}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default App;
