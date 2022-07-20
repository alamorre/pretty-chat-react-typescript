import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";
import "./index.css";

import { ContextProvider } from "./hooks/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
