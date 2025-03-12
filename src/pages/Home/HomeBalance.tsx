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

  const handleBalance = () => {
    dispatch(updateBalance(value));

    if (value <= 0 || user.balance == 0)
      return alert("Adicione saldo para jogar");

    navigate("game");
  };

  return (
    <div>
      <h1>Bem-vindo, {user.name}</h1>
      <p>Saldo atual: ${user.balance}</p>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
      <br />
      <br />
      <button onClick={handleBalance}>Atualizar e jogar</button>
    </div>
  );
}
