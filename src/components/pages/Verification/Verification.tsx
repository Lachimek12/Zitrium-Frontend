/* Libraries */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import VerificationInput from "react-verification-input";

/* App modules imports */
import styles from "./Verification.module.css";

interface Test {
  num: number;
}

function Verification() {
  const {
    handleSubmit,
    // setError,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<Test> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
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
        <div className="flex justify-center">
          <VerificationInput
            classNames={{
              character: styles.character,
            }}
          />
        </div>
        <button className="mt-6" disabled={isSubmitting} type="submit">
          {isSubmitting ? "...Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Verification;
