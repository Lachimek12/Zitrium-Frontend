/* Libraries */
import { Navigate, Route, Routes } from "react-router-dom";

/* App modules imports */
import HomePage from "@pages/HomePage";
import NotFound from "@pages/404";
import Account from "@pages/Account";
//import { SimpleLayout } from "@layout/SimpleLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/app" />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
}

export default App;

/*
        <Route path="*" element={<SimpleLayout />}>
          <Route index element={<Navigate to="/404" />} />
        </Route>
        */
