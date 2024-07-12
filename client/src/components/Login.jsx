import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-20">
      <div>
        <h1 className="text-center font-bold text-2xl mb-2">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="w-72 flex flex-col items-center justify-center"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-zinc-100 my-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-zinc-100 my-2 rounded-md"
          />
          <button
            type="submit"
            className=" bg-blue-500 w-full text-white font-bold py-2 rounded-md mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
