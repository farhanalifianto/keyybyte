"use client";
import FormInput from "./ui/forminput";
import Button from "./ui/button";
import { useState, useRef, FormEvent } from "react";
import { createAccount } from "@/lib/actions/user.action";
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
      const user = await createAccount({
        fullName: form.fullname.value || "",
        email: form.email.value,
      });
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
        <p className="text-red-500"></p>

        <FormInput
          text="Full Name"
          name="fullname"
          type="text"
          placeholder="John Doe"
          ref={usernameRef}
        />
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
          {type === "signin" ? "Sign In" : "Sign Up"}
        </Button>
        {loginFailed && (
          <p className="text-red-500 text-center">{loginFailed}</p>
        )}
      </form>
      {accountId && <OTPModal email={emailotp} accountId={accountId} />}
    </>
  );
};

export default AuthForm;
