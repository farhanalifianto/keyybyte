import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormatedDateTime from "./FormatedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="!mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col truncate...">
      <p className="font-bold text-sm ">{file.name}</p>
      <FormatedDateTime date={file.$createdAt} className="text-xs" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-center ">
    <p className="text-[14px] leading-[20px] font-normal flex w-[30%]  ml-4 ">
      {label}
    </p>
    <p className="text-[14px] leading-[20px] font-semibold flex-1 ">{value}</p>
  </div>
);
export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <DetailRow label="Format:" value={file.extension} />
      <DetailRow label="Size:" value={convertFileSize(file.size)} />
      <DetailRow label="Owner:" value={file.owner.fullName} />
      <DetailRow label="Last Edit:" value={formatDateTime(file.$updatedAt)} />
    </>
  );
};
