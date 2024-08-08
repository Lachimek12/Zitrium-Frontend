/* Libraries */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

/* Types imports */
import { ClosedEye, OpenedEye } from "@components/icons/eye";
import { LoginForm, loginSchema } from "@customTypes/FormSchemas";
import { LOGIN_ADDRESS } from "@utils/constants";
import { useAuth } from "@contexts/AuthContext";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const navigate = useNavigate();
  const authContext = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    await axios
      .post(LOGIN_ADDRESS, data)
      .then((response) => {
        console.log("Response: ", response);
        authContext.login(data);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        console.error("Error: ", error);
        if (error.response) {
          setError("root", { message: error.response.data as string });
        } else {
          setError("root", { message: "Unknown server error" });
        }
      });
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
            tabIndex={-1}
            type="button"
            className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500 opacity-50 hover:opacity-100"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        <button className={`${isSubmitting && "hover:cursor-not-allowed"}`} disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Sign In"}
        </button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
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
