/* Libraries */
import { SubmitHandler, useForm } from "react-hook-form";
import VerificationInput from "react-verification-input";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { useSessionStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

/* App modules imports */
import styles from "./Verification.module.css";
import { getNextDate } from "@utils/time";
import { removeSessionStorageItem, SIGN_UP_INFO, TIMEOUT } from "@/services/SessionStorage";
import { useAuth } from "@contexts/AuthContext";
import {
  VERIFICATION_CODE_EXPIRATION_TIMEOUT_SEC,
  VERIFY_EMAIL_ADDRESS,
  RESEND_VERIFICATION_ADDRESS,
  BASE_URL,
} from "@utils/constants";

/* Types imports */
import { VerificationForm } from "@customTypes/formSchemas";
import { SignUpInfo } from "@customTypes/authentication";

function Verification() {
  /* register */
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerificationForm>();
  const [signUpInfo] = useSessionStorage<SignUpInfo>(SIGN_UP_INFO, { email: "" });
  const [code, setCode] = useState("");

  /* timer */
  const [expirationTime, setExpirationTime] = useSessionStorage<number>(
    TIMEOUT,
    getNextDate(new Date(), VERIFICATION_CODE_EXPIRATION_TIMEOUT_SEC).getTime(),
  );
  const { seconds, minutes, restart } = useTimer({ expiryTimestamp: new Date(expirationTime) });

  /* other */
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    setExpirationTime(expirationTime);
  }, []);

  const onSubmit: SubmitHandler<VerificationForm> = async (data) => {
    /* Required due to input field inability to dynamicly modify verification code value with small concise code */
    data.code = code;
    axios
      .post(BASE_URL + VERIFY_EMAIL_ADDRESS, data)
      .then(() => {
        authContext.logout(); // Remove old user

        removeSessionStorageItem(SIGN_UP_INFO); // Value removed in order to make
        removeSessionStorageItem(TIMEOUT); // user unable to come back

        navigate("/login");
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          setError("root", { message: error.response.data as string });
        } else {
          setError("root", { message: "Unknown server error" });
        }
      });
  };

  const resendCode = async () => {
    setError("root", { message: "" });
    axios
      .post(BASE_URL + RESEND_VERIFICATION_ADDRESS, signUpInfo)
      .then(() => {
        const expireDate = getNextDate(new Date(), VERIFICATION_CODE_EXPIRATION_TIMEOUT_SEC);
        setExpirationTime(expireDate.getTime());
        restart(expireDate);
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
      <p>{code}</p>
      <form
        className="relative top-[25%] flex h-max w-[20%] flex-col gap-6 p-6 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="mb-6 text-5xl">Sign Up</h1>
          <p className="text-faint-500">Step 2/2</p>
        </div>
        <div>
          Please enter the verification code sent to your email address <strong>{signUpInfo.email}</strong>
        </div>
        <div className="mt-5 flex flex-col gap-2 p-4">
          <div className="flex justify-center">
            <VerificationInput
              onChange={(input: string) => {
                setCode(input);
              }}
              classNames={{
                character: styles.character,
                characterSelected: styles.characterSelected,
              }}
              validChars="0-9"
            />
          </div>
          <div className="self-end">
            {minutes == 0 && seconds == 0 ? (
              <div className="flex gap-2">
                <span>Code expired.</span>
                <span className="cursor-pointer text-highlight-400 hover:underline" onClick={resendCode}>
                  {" "}
                  Resend
                </span>
              </div>
            ) : (
              <span>
                {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`mt-6 ${(isSubmitting || code.length != 6) && "hover:cursor-not-allowed"} submit`}
            disabled={isSubmitting || code.length != 6}
            type="submit"
          >
            {isSubmitting ? "...Loading" : "Verify"}
          </button>
          <p className="self-center">
            Can't find the email? Click
            <span className="cursor-pointer text-highlight-400 hover:underline" onClick={resendCode}>
              {" here "}
            </span>
            to resend
          </p>
        </div>
        <input type="hidden" {...register("code")} />
        <input type="hidden" value={signUpInfo.email} {...register("email")} />
        {errors.root && <div className="text-error-500">{errors.root.message}</div>}
      </form>
    </div>
  );
}

export default Verification;
