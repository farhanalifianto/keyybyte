"use client";
import FormInput from "./ui/forminput";
import Button from "./ui/button";
import { useState, useRef, FormEvent } from "react";
import { createAccount, signInUser } from "@/lib/actions/user.action";
import OTPModal from "./OTPModal";
type SignType = {
  type: string;
};
const AuthForm = (props: SignType) => {
  const [loginFailed, setLoginFailed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [emailotp, setEmailOtp] = useState(null);
  const { type } = props;
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: form.fullname.value || "",
              email: form.email.value,
            })
          : await signInUser({ email: form.email.value });

      setAccountId(user.accountId);
      setEmailOtp(form.email.value);
    } catch {
      setErrorMessage;
    }
  };
  const usernameRef = useRef(null);

  return (
    <>
      <form onSubmit={handleLogin} className="auth-form">
        <p className="text-3xl font-bold">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </p>
        {type === "sign-up" ? (
          <FormInput
            text="Full Name"
            name="fullname"
            type="text"
            placeholder="John Doe"
            ref={usernameRef}
          />
        ) : (
          <></>
        )}

        <FormInput
          text="Email"
          name="email"
          type="text"
          placeholder="Email@email.com"
        />
        <Button
          onClick={() => {
            handleLogin;
          }}
          type="submit"
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>
        {type === "sign-up" ? (
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a href="/sign-in" className="font-bold">
                Sign In
              </a>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <a href="/sign-up" className="font-bold">
                Sign Up
              </a>
            </p>
          </div>
        )}
        {loginFailed && (
          <p className="text-red-500 text-center">{loginFailed}</p>
        )}
      </form>
      {accountId && <OTPModal email={emailotp} accountId={accountId} />}
    </>
  );
};

export default AuthForm;
