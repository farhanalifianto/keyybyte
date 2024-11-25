import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen ">
      <section className="hidden w-1/2 items-center justify-center bg-black p-10 md:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-5  ">
          <div className="flex items-center text-white ">
            <Image
              src="/favicon.ico"
              alt="logo"
              width={50}
              height={50}
              className="h-auto"
            />
            <h1 className="font-extralight  text-weight-tight ">KeyyByte</h1>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="font-bold">The Best Cloud Storage Ever!</h1>
            <p className="text-xs">
              This is a place you cant privately store all your documents.
            </p>
          </div>
          {/* <Image
            src="/file.png"
            alt="file"
            width={345}
            height={345}
            className="transition-all hover:rotate-2 hover:scale-105"
          ></Image> */}
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-2 py-10 lg:justify-center lg:p-10 lg:py-0 text=xs">
        <div className="mg-16 md:hidden flex items-center gap-1 mb-5">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={50}
            height={50}
            className="h-auto"
          />
          <h1 className="font-extralight text-black text-weight-tight ">
            KeyyByte
          </h1>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
