import { Stack } from "@mui/material";
import ZipShare from "./components/ZipShare";

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
      <ZipShare />
    </Stack>
  );
}

export default App;
