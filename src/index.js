import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./Modal/Modal";
// import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ModalProvider>
      {/* <Provider store={store}>   
</Provider>    */}
      <App />
    </ModalProvider>
  </StrictMode>,
);
