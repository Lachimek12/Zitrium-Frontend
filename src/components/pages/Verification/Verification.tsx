/* Libraries */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import VerificationInput from "react-verification-input";
import { useTimer } from "react-timer-hook";
import { useSessionStorage } from "usehooks-ts";

/* App modules imports */
import styles from "./Verification.module.css";
import { getNextDate } from "@utils/time";
import { getSessionStorageItem, SIGN_UP_INFO } from "@/services/SessionStorage";
import { VERIFICATION_CODE_EXPIRATION_TIMEOUTE } from "@utils/constants";
import { useEffect } from "react";

interface Test extends FieldValues {
  num: number;
}

function Verification() {
  const {
    handleSubmit,
    // setError,
    formState: { isSubmitting },
  } = useForm();

  const initTimeoutEndDate = getSessionStorageItem<Date>("timeout");
  const [timeoutEndDate, setTimeoutEndDate] = useSessionStorage<Date>(
    "timeout",
    initTimeoutEndDate === null ? getNextDate(new Date(), VERIFICATION_CODE_EXPIRATION_TIMEOUTE) : initTimeoutEndDate,
  );
  const signUpInfo = getSessionStorageItem<string>(SIGN_UP_INFO);
  const { seconds, minutes, restart } = useTimer({ expiryTimestamp: timeoutEndDate });

  useEffect(() => {
    setTimeoutEndDate(timeoutEndDate);
  }, []);

  const onSubmit: SubmitHandler<Test> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const resendCode = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimeoutEndDate(getNextDate(new Date(), VERIFICATION_CODE_EXPIRATION_TIMEOUTE));
    restart(timeoutEndDate);
  };

  return (
    <div className="flex h-full justify-center align-middle">
      <form
        className="relative top-[25%] flex h-max w-[20%] flex-col gap-6 p-6 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="mb-6 text-5xl">Sign Up</h1>
          <p className="text-gray-500">Step 2/2</p>
        </div>
        <div>
          Please enter the verification code sent to your email address <strong>{signUpInfo}</strong>
        </div>
        <div className="mt-5 flex flex-col gap-2 p-4">
          <div className="flex justify-center">
            <VerificationInput
              classNames={{
                character: styles.character,
                characterSelected: styles.characterSelected,
              }}
            />
          </div>
          <div className="self-end">
            {minutes == 0 && seconds == 0 ? (
              <div className="flex gap-2">
                <span>Code expired.</span>
                <span className="cursor-pointer text-blue-400 hover:underline" onClick={resendCode}>
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
        <button className="mt-6" disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default Verification;
