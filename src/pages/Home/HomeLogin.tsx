import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../store/userActions";
import { PropsUser } from "../../interfaces/interfaces";
import { AppDispatch } from "../../store/store";

export function HomeLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<PropsUser>({
    name: "",
    password: "",
    balance: 0,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (!form.name || !form.password) return alert("Compos não preenchidos");

    try {
      await dispatch(loginUser({ name: form.name, password: form.password }));
    } catch (error) {
      alert("Login failed!");
      console.log(error);
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.password) return alert("Compos não preenchidos");

    try {
      await dispatch(registerUser(form));
      await handleLogin();
    } catch (error) {
      alert("Registration failed!");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <br />
      <label>
        Name:
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </label>
      <br />
      <br />
      <button onClick={isLogin ? handleLogin : handleRegister}>
        {isLogin ? "Logar" : "Registrar"}
      </button>
      <hr className="my-3" />
      <p className="text-center underline" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Registre-se" : "Logar-se"}
      </p>
    </div>
  );
}
