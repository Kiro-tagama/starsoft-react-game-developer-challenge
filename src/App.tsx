import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export function App() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isLoggedIn && <Route path="/game" element={<Game />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
