import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Context from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <App />
  </Context>
);
