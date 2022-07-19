import { useContext } from "react";

import { Context } from "./hooks/context";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";

function App() {
  const { user } = useContext(Context);

  if (user) {
    return <ChatsPage />;
  } else {
    return <AuthPage />;
  }
}

export default App;
