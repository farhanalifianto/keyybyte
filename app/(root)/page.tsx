import Image from "next/image";
import Layout from "./layout";
import Card from "@/components/Card";
import Sort from "@/components/SortFile";
import { Models } from "node-appwrite";
import { getCurrentUser } from "@/lib/actions/user.action";
import Head from "next/head";
import { AiFillCaretUp } from "react-icons/ai";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import TotalStorage from "@/components/TotalStorage";
import { Progress } from "@/components/ui/progress";
import { calculatePercentage, convertFileSize } from "@/lib/utils";
const dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);
  const currentUser = await getCurrentUser();
  console.log();
  return (
    <>
      <div className="mx-auto  max-w-7xl p-4  md:grid-cols-3 md:px-9 xl:gap-10">
        <section>
          <h1 className="h1 capitalize mb-5">Recently Uploaded</h1>
          <div className="block w-full p-4 rounded-xl mt-2  bg-black text-white  sm:flex-row sm:items-center">
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-3xl font-light text-light">
                Available Storage: {convertFileSize(totalSpace.used)} / 2 GB
              </h1>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Progress value={Number(calculatePercentage(totalSpace.used))} />
            </div>
          </div>
        </section>
        {/* render the files */}
        <section className="h-full rounded-xl bg-white p-4 xl:p-8">
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
    </>
  );
};

export default dashboard;
