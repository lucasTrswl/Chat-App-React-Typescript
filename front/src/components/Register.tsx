import { useForm } from "react-hook-form";



type Inputs = {
  name: string;
  surname: string;
  email: string;
  phone_number: number;

}

export default function Register () {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = (values: any) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        {...register("email", {
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })}
      />

      <input
        {...register("username", {
          validate: value => value !== "admin" || "Nice try!"
        })}
      />

      <button type="submit">Submit</button>
    </form>
  );
};