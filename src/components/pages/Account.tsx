/* Libraries */
import React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

/* App modules imports */
import { SERVER_ADDRESS } from "@utils/constants";
import { usePostFetch } from "@/hooks/useFetch";
import { DataTransfer } from "../../types/ApiResponse";
import { ClosedEye, OpenedEye } from "@components/common/icons/eye";

/* Types imports */
import { RegisterFormFields, registerSchema } from "@types/FormSchemas";

function Account() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {};
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
        className="border-8 border-primary-500 rounded-md p-2 flex flex-col w-[20%] h-[60%] gap-3 px-3"
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

export default Account;

/*
      <div className="relative w-1/4 container mx-auto mt-20">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          className="w-full px-4 py-2 text-base focus:ring-1"
        />
        <button
          className="absolute bg-background-700 rounded-md inset-y-0 right-0 flex items-center px-4 text-primary-500"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <OpenedEye /> : <ClosedEye />}
        </button>
      </div>



const schema = z.object({
  userName: z.string(),
  email: z.string().email(),
});

type FormFields = z.infer<typeof schema>;

interface UserInfo {
  name: string;
  email: string;
}

function Account() {
  // State for form inputs
  const [userInfo, setUserInfo] = useState<FormFields>({} as FormFields);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const response: DataTransfer<UserInfo> = usePostFetch(
    userInfo,
    SERVER_ADDRESS
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Simple validation
    if (!userInfo.name || !userInfo.email) {
      setError("Both name and email are required.");
      return;
    }

    // Clear previous error messages
    setError("");
    response.error = null;

    await response.request();
    if (response.error == null) {
      setError("Problem connecting to server");
      return;
    } else if (response.data == null) {
      setError("Problem recieving data from server");
      return;
    }

    // Example request (you should replace this with your API endpoint)
    setUserInfo(response.data);
    setSuccess("Registration successful!");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Account;
*/
