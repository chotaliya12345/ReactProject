import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContext";
import { CrudProvider } from "./context/ContextCrud";
import { ContactProvider } from "./context/ContactContext";

function App() {
  const { store, persistor } = configureStore();
  return (
    <ContactProvider>
      <CrudProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes>
                <Route exact path="/*" element={<UserRoutes />} />
                <Route element={<PrivateRoutes />}>
                  <Route exact path="/admin/*" element={<AdminRoutes />} />
                </Route>
              </Routes>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </CrudProvider>
    </ContactProvider>
  );
}

export default App;
