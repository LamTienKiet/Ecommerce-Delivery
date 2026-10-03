import "./App.css";
import AppRouters from "./routers/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRouters />
    </>
  );
}

export default App;
