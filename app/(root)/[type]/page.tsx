import React from "react";
import Layout from "../layout";
import Sort from "@/components/SortFile";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { getFileTypesParams } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/user.action";
const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const currentUser = await getCurrentUser();

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="mx-auto  max-w-7xl  md:grid-cols-3 md:px-9 xl:gap-10">
      <section>
        <h1 className="h1 capitalize">{type}</h1>
        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
          <p className="text-[16px] leading-[24px] font-normal">
            total:<span className="font-semibold">0 MB</span>
          </p>
          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <p className="font-normal hidden sm:block text-light-200">
              Sort by:
            </p>
            <Sort />
          </div>
        </div>
      </section>
      {/* render the files */}
      <section className="h-full rounded-[20px] bg-white p-5 xl:p-8">
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-5">
            {files.documents.map((file: Models.Document) => (
              <Card email={currentUser.email} key={file.$id} file={file} />
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default page;
