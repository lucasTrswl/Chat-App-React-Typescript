import { useForm } from "react-hook-form";
import {AuthService} from "../Services/AuthService"
import { useState } from "react";

type Inputs = {
  username: string;
  password: string;
};

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (values: Inputs) => {
    const responseMessage = await AuthService.Register(values.username, values.password);
    setMessage(responseMessage);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">S'inscrire</h2>

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
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Must be at least 8 characters, with a letter, number, and special character",
              },
            })}
            className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          S'inscrire
        </button>

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

      </form>
    </div>
  );
}
