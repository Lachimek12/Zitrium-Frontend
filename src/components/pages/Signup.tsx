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

function Signup() {
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
    <div className="flex h-full justify-center align-middle">
      <form
        className="relative top-[15%] flex h-max w-[300px] flex-col gap-6 p-6 shadow-2xl lg:w-[20%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="mb-6 text-5xl">Sign Up</h1>
          <p className="text-gray-500">Step 1/2</p>
        </div>
        <div className="flex flex-col gap-2">
          <input {...register("userName")} type="text" placeholder="User Name" />
          {errors.userName && <div className="text-red-500">{errors.userName.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <input {...register("email")} type="text" placeholder="Email" />
          {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <input
              className="w-full"
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
            </button>
          </div>
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <input
              className="w-full"
              {...register("confirmPassword")}
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="exclude absolute inset-y-0 right-0 flex items-center rounded-md bg-transparent px-4 text-primary-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? <OpenedEye /> : <ClosedEye />}
            </button>
          </div>
          {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword.message}</div>}
        </div>
        <button className="mt-6" disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
