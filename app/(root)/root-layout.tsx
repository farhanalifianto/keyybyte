import React from "react";
import Sidebar from "@/components/SidebarNav";
import MobileNav from "@/components/MobileNav";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

type propstypes = {
  children: React.ReactNode;
};

const Layout = async (props: propstypes) => {
  const { children } = props;
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <Header />
        <div className="no-scrollbar h-full flex-1 overflow-auto bg-light-400 ">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
