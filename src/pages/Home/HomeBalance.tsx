import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { updateBalance } from "../../store/userActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HomeBalance() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value <= 0 && user.balance && user.balance > 0) return navigate("game");
    if (value <= 0) return alert("Adicione saldo para jogar");

    dispatch(updateBalance(value));
    navigate("game");
  };

  return (
    <div>
      <h1>Bem-vindo, {user.name}</h1>
      <p>Saldo atual: ${user.balance?.toFixed(2)}</p>
      <br />
      <p>Atualizar saldo</p>
      <form onSubmit={handleBalance}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
        <br />
        <br />
        <button type="submit">Atualizar e jogar</button>
      </form>
    </div>
  );
}
