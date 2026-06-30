import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </SocketProvider>
  </AuthProvider>
);

export default App;
