/* Libraries */
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

/* App modules imports */
import { ClosedEye, OpenedEye } from "@components/icons/Eye";
import { useAuth } from "@contexts/AuthContext";

/* Types imports */
import { LoginForm, loginSchema } from "@customTypes/formSchemas";
import { Auth } from "@customTypes/authentication";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const authContext: Auth = useAuth();

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
    authContext.login(data);
  };

  useEffect(() => {
    if (authContext.error) {
      const error = authContext.error as AxiosError;

      if (error.response) {
        setError("root", { message: error.response.data as string });
      } else {
        setError("root", { message: "Unknown server error" });
      }
    }
  }, [authContext.error, setError]);

  return (
    <div className="flex h-full justify-center align-middle">
      <form
        className="relative top-[15%] flex h-max w-[300px] flex-col gap-6 p-6 shadow-2xl lg:w-[20%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-6 text-5xl">Sign In</h1>
        <input type="text" maxLength={50} placeholder="email" {...register("email")} />
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            maxLength={30}
            placeholder="Password"
            className="w-full"
            {...register("password")}
          />
          <button
            type="button"
            className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500 opacity-50 hover:opacity-100"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {!isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        <button
          className={`submit ${isSubmitting && "hover:cursor-not-allowed"}`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "...Loading" : "Sign In"}
        </button>
        {errors.root && <div className="text-error-500">{errors.root.message}</div>}
        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-8 h-px w-full border-0 bg-faint-500" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-background-800 px-3 font-medium text-faint-500">
            or
          </span>
        </div>
        <Link to="/register">
          <button className="submit w-full rounded-full text-white">Create Account</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
