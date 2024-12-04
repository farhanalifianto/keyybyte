import React from "react";
import Search from "./Search";
import FileUploader from "./FileUploader";
import Head from "next/head";
import { CiLogout } from "react-icons/ci";
import { signOut } from "@/lib/actions/user.action";
const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10">
        <Search />
        <div className="flex flex-center items-center min-w-fit gap-4">
          <FileUploader ownerId={userId} accountId={accountId} />{" "}
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex items-center justify-center gap-2 text-black bg-white rounded-lg px-3 py-1 font-semibold"
            >
              <h1 className="text-3xl">
                <CiLogout />
              </h1>
            </button>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
