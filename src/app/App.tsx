/* Libraries */
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

/* App modules imports */
import HomePage from "@pages/HomePage";
import NotFound from "@pages/404";
import Signup from "@pages/Signup";
import Profile from "@pages/Profile";
import Test from "@pages/Test";
import Login from "@pages/Login";
import Verification from "@pages/Verification";
import ProtectedRoute from "@components/ProtectedRoute";
import VerificationRoute from "@components/VerificationRoute";
import MainLayout from "@layout/MainLayout";
import FormLayout from "@layout/FormLayout";
import { AuthProvider } from "@contexts/AuthContext";
import { SimulatorProvider } from "@contexts/SimulatorContext";

export function notify(message: string) {
  toast.error(message);
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect from root to /app */}
        <Route path="/" element={<Navigate to="/app" />} />

        {/* Routes with MainLayout */}
        <Route
          element={
            <SimulatorProvider>
              <MainLayout />
            </SimulatorProvider>
          }
        >
          <Route path="/app" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Routes with from FormLayout */}
        <Route element={<FormLayout />}>
          <Route path="/signin" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/verification"
            element={
              <VerificationRoute>
                <Verification />
              </VerificationRoute>
            }
          />
        </Route>

        {/* Routes without any layout */}
        <Route path="/404" element={<NotFound />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </AuthProvider>
  );
}

export default App;
