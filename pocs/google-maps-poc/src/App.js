import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import CustomMap from "./components/CustomMap";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      {/* Set custom map, requiring the APIprovider using our .env key */}
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <CustomMap />
      </APIProvider>
    </div>
  );
};

export default App;