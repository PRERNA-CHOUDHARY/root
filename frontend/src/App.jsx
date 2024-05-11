// Import Modules.
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

// Import layout.
import { Layout } from "./layout/Layout.jsx";

// Import CSS.
import "./App.css";

// Define the App component.
function App() {
  // Use the useEffect hook to run the code when the component mounts.
  useEffect(() => {
    alanBtn({
      key: "02b27ce51747cefbd610608f6aad42102e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command.
        }
      },
    });
  }, []);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
