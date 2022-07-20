import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/VisbyRoundCF-Regular.woff";

import { ContextProvider } from "./functions/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
