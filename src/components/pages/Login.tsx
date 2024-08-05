/* Libraries */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

/* Types imports */
import { ClosedEye, OpenedEye } from "@components/icons/eye";

type LoginForm = {
  email: string;
  password: string;
};

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    // setError,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="flex h-full justify-center align-middle">
      <form
        className="relative top-[15%] flex h-max w-[300px] flex-col gap-6 p-6 shadow-2xl lg:w-[20%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-6 text-5xl">Sign In</h1>
        <input type="text" placeholder="email" {...register("email")} />
        <div className="relative">
          <input
            className="w-full"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <button
            type="button"
            className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500 opacity-50 hover:opacity-100"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        <button className="rounded-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Sign In"}
        </button>
        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-8 h-px w-full border-0 bg-gray-500" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-background-800 px-3 font-medium text-gray-500">
            or
          </span>
        </div>
        <Link to="/register">
          <button className="w-full rounded-full text-white">Create Account</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
