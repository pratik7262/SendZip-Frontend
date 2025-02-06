import { Stack } from "@mui/material";
import ZipShare from "./components/ZipShare";
import { Route, Routes } from "react-router-dom";
import TextShare from "./components/TextShare";

function App() {
  return (
    <Stack
      sx={{
        // background: "Primary.main",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Routes>
        <Route path="/" element={<ZipShare />} />
        <Route path="/sendText" element={<TextShare />} />
      </Routes>
    </Stack>
  );
}

export default App;
