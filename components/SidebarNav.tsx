"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa6";
import { TiMediaPlay } from "react-icons/ti";
import { PiChartPieDuotone } from "react-icons/pi";
import { avatarUrl } from "@/constant";

type propstypes = {
  fullName: string;
  avatar: string;
  email: string;
};

const Sidebar = (props: propstypes) => {
  const { fullName, avatar, email } = props;
  return (
    <aside className=" bg-black remove-scrollbar hidden h-screen w-[85px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[300px]">
      <Link href="/">
        <div className="flex items-center justify-center   text-white ">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={50}
            height={50}
            className="h-auto"
          />
          <h1 className="font-extralight  text-weight-tight hidden lg:block ">
            KeyyByte
          </h1>
        </div>
      </Link>
      <nav className="h5 mt-9 flex-1 gap-1 text-white text-xl">
        <ul className="flex flex-1 flex-col gap-6">
          <Link href="/dashboard" className="lg:full">
            <li className="flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full ">
              <MdDashboard className="w-6" />
              <p className="hidden lg:block">Dashboard</p>
            </li>
          </Link>
          <Link href="/documents" className="lg:full">
            <li className="flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full ">
              <IoDocument className="w-6" />
              <p className="hidden lg:block">Documents</p>
            </li>
          </Link>
          <Link href="/images" className="lg:full">
            <li className="flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full ">
              <FaRegImages className="w-6" />
              <p className="hidden lg:block">Images</p>
            </li>
          </Link>
          <Link href="/media" className="lg:full">
            <li className="flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full ">
              <TiMediaPlay className="w-6" />
              <p className="hidden lg:block">Media</p>
            </li>
          </Link>
          <Link href="/others" className="lg:full">
            <li className="flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full ">
              <PiChartPieDuotone className="w-6" />
              <p className="hidden lg:block">Others</p>
            </li>
          </Link>
        </ul>
      </nav>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-black/10 p-1 text-light-100 lg:justify-start lg:p-3">
        <Image
          src={avatarUrl}
          alt="avatar"
          width={44}
          height={44}
          className="aspect-square w-10 rounded-full object-cover"
        ></Image>
        <div className="hidden lg:block text-white w-full">
          <p className="text-[14px] leading-[20px] font-semibold capitalize truncate">
            {fullName}
          </p>
          <p className="text-[12px] leading-[16px] font-normal truncate ...">
            {email}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
