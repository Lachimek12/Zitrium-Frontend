import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import { SimpleLayout } from "../components/layout/SimpleLayout";
import { NotFound } from "../components/pages/404";
import Account from "../components/pages/Account";

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
