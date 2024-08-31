/* Libraries */
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

/* App modules imports */
import { BASE_URL, REGISTER_ADDRESS } from "@utils/constants";
import { ClosedEye, OpenedEye } from "@components/icons/Eye";

/* Types imports */
import { RegisterFormFields, registerSchema } from "@customTypes/FormSchemas";
import { removeSessionStorageItem, SIGN_UP_INFO, TIMEOUT } from "@/services/SessionStorage";
import { SignUpInfo } from "@/types/Authentication";

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [, setSignUpInfo] = useSessionStorage(SIGN_UP_INFO, {});
  const navigate = useNavigate();

  // Value removed if comming back from verification in order to route user correctly
  removeSessionStorageItem(SIGN_UP_INFO);
  removeSessionStorageItem(TIMEOUT);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    axios
      .post(BASE_URL + REGISTER_ADDRESS, data)
      .then(() => {
        setSignUpInfo({
          email: data.email,
        } as SignUpInfo);

        navigate("/verification");
      })
      .catch((error: AxiosError) => {
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
        <div className="flex justify-between">
          <h1 className="mb-6 text-5xl">Sign Up</h1>
          <p className="text-faint-500">Step 1/2</p>
        </div>
        <div className="flex flex-col gap-2">
          <input {...register("username")} type="text" placeholder="User Name" maxLength={20} />
          {errors.username && <div className="text-error-500">{errors.username.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <input {...register("email")} type="text" placeholder="Email" maxLength={50} />
          {errors.email && <div className="text-error-500">{errors.email.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <input
              type={isPasswordVisible ? "text" : "password"}
              maxLength={30}
              placeholder="Password"
              className="w-full"
              {...register("password")}
            />
            <button
              type="button"
              className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
            </button>
          </div>
          {errors.password && <div className="text-error-500">{errors.password.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              maxLength={30}
              placeholder="Confirm password"
              className="w-full"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500"
              tabIndex={-1}
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? <OpenedEye /> : <ClosedEye />}
            </button>
          </div>
          {errors.confirmPassword && <div className="text-error-500">{errors.confirmPassword.message}</div>}
        </div>
        <button className={`mt-6 ${isSubmitting && "hover:cursor-not-allowed"}`} disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Submit"}
        </button>
        {errors.root && <div className="text-error-500">{errors.root.message}</div>}
      </form>
    </div>
  );
}

export default Signup;
