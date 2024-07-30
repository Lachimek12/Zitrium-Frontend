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
    handleSubmit,
    // setError,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="h-full flex justify-center align-middle">
      <form className="relative w-[20%] top-[15%] h-max p-6 gap-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-6 text-5xl">Sign In</h1>
        <input type="text" placeholder="email" className="" />
        <div className="relative">
          <input className="w-full" type={isPasswordVisible ? "text" : "password"} placeholder="Password" />
          <button
            type="button"
            className="exclude absolute bg-transparent rounded-md inset-y-0 right-0 flex items-center px-4 text-primary-500 opacity-50 hover:opacity-100"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        <button className="rounded-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Sign In"}
        </button>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-8 border-0 bg-gray-500" />
          <span className="absolute px-3 font-medium text-gray-500 bg-background-800  -translate-x-1/2 left-1/2">
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
