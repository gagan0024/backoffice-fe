import { Suspense } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const token = useSelector((state: any) => {
    return state?.adminLoginSlice?.accessToken;
  });
  return (
    <>
      <Suspense fallback="Loading...">
        {!token ? <PrivateRoutes /> : <PublicRoutes />}
        <ToastContainer />
      </Suspense>
    </>
  );
}

export default App;
