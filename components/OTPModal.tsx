"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "./ui/input";
import Button from "./ui/button";
import { verifySecret } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { sendOTP } from "@/lib/actions/user.action";
type Proptypes = {
  email: any;
  accountId: string;
};
const OTPModal = (props: Proptypes) => {
  const router = useRouter();
  const { email, accountId } = props;
  const [isOpen, setIsOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;

    try {
      const password = form.password.value;
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
      console.log();
    } catch (error) {
      console.log("failed to verfy OTP", error);
    }

    setIsLoading(false);
  };
  const handleResendOtp = async () => {
    await sendOTP(email);
  };
  return (
    <div>
      <Modal onClose={() => setIsOpen(false)}>
        <div className="">
          <div className="flex items-center justify-center mb-3">
            <h1 className="text-2xl font-bold">Enter OTP</h1>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm">
              We've send a code to <span className="font-bold">{email}</span>
            </p>
          </div>
          <div className="mt-4 p-5">
            <form onSubmit={handleSubmit}>
              <Input type="text" name="password" placeholder="Enter OTP" />
              <div
                className="items-center justify-center mt-6 gap-2
              "
              >
                <button
                  className="w-full bg-white rounded-lg text-black py-2 px-4 border border-black "
                  type="submit"
                >
                  <p>Cancel</p>
                </button>
                <button
                  className="w-full bg-black rounded-lg text-white font-bold py-2 px-4  mt-1 "
                  type="submit"
                >
                  <p>Verify</p>
                </button>
              </div>
              <div className="flex items-center justify-center mt-6 gap-2 text-light-100">
                <p className="text-sm">
                  Didn't get a code?
                  <button
                    type="button"
                    className="pl-1"
                    onClick={handleResendOtp}
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OTPModal;
