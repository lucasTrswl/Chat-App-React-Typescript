import { useForm } from "react-hook-form";
import { AuthService } from "../Services/AuthService"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm<Inputs>();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (values: Inputs) => {
    const { success, message } = await AuthService.Login(values.username, values.password);

    if (success) {
      console.log("Login successful!");
      //navigate to dashboard
      navigate("/chat");
    } else {
      setLoginMessage(message);
    }
  };


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Se connecter</h2>

        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
             
            })}
            className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginMessage && (
          <p className="mt-2 text-sm text-red-500 text-center">{loginMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          Se connecter
        </button>

        <p>Pas encore de compte ?</p>
            <button 
            onClick={() => navigate("/register")}
            className="w-48 bg-blue-500 text-white py-2 rounded-lg ">Créer un compte</button>
      </form>
    </div>
  );
}
