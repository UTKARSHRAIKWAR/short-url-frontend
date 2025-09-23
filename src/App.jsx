import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { Toaster } from "sonner";
import URLpage from "./Pages/URLpage";

function App() {
  return (
    <>
      <h1 className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/home" Component={URLpage} />
        </Routes>

        <Toaster richColors />
      </h1>
    </>
  );
}

export default App;
