/* Libraries */
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

/* App modules imports */
// import { SERVER_ADDRESS } from "@utils/constants";
// import { usePostFetch } from "@/hooks/useFetch";
// import { DataTransfer } from "../../types/ApiResponse";
import { ClosedEye, OpenedEye } from "@components/icons/eye";

/* Types imports */
import { RegisterFormFields, registerSchema } from "@/types/FormSchemas";

function Register() {
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    console.log(data);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="border-8 border-primary-500 rounded-2xl p-2 flex flex-col w-[20%] h-[60%] gap-3 px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="self-center text-[4vmin]">Register</h1>
        <input {...register("userName")} type="text" placeholder="User Name" />
        {errors.userName && <div className="text-red-500">{errors.userName.message}</div>}
        <input {...register("email")} type="text" placeholder="Email" />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <div className="relative w-full">
          <input
            className="w-full"
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute bg-background-700 rounded-md inset-y-0 right-0 flex items-center px-4 text-primary-500"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        <div className="relative w-full">
          <input
            className="w-full"
            {...register("confirmPassword")}
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
          />
          <button
            type="button"
            className="absolute bg-background-700 rounded-md inset-y-0 right-0 flex items-center px-4 text-primary-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? <OpenedEye /> : <ClosedEye />}
          </button>
        </div>
        {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Register;
