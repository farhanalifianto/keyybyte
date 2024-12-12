import React from "react";
import Layout from "../layout";
import Sort from "@/components/SortFile";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
const page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
  console.log(files);
  return (
    <div className="mx-auto  max-w-7xl  md:grid-cols-2 xl:gap-10">
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
        <h2 className="text-xl font-bold text-light-100">
          Recent files uploaded
        </h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-5">
            {files.documents.map((file: Models.Document) => (
              <Card key={file.$id} file={file} />
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