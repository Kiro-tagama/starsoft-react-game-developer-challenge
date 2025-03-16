import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../store/userActions";
import { PropsUser } from "../../interfaces/interfaces";
import { AppDispatch } from "../../store/store";

export function HomeLogin() {
  const [isLogin] = useState(true);
  const [form, setForm] = useState<PropsUser>({
    name: "",
    password: "",
    balance: 0,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.password) return alert("Campos não preenchidos");

    try {
      if (isLogin) {
        await dispatch(loginUser({ name: form.name, password: form.password }));
      } else {
        await dispatch(registerUser(form));
        await dispatch(loginUser({ name: form.name, password: form.password }));
      }
    } catch (error) {
      alert(isLogin ? "Login failed!" : "Registration failed!");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <br />
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{isLogin ? "Logar" : "Registrar"}</button>
      </form>
      {/* <hr className="my-3" />
      <p className="text-center underline">
        {isLogin ? "Registre-se" : "Logar-se"}
      </p> */}
    </div>
  );
}
