import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { HomeBalance } from "./HomeBalance";
import { HomeLogin } from "./HomeLogin";

export default function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <div className=" max-w-80">
      {isLoggedIn ? <HomeBalance /> : <HomeLogin />}
    </div>
  );
}
