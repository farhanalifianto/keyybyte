import React from "react";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormatedDateTime from "./FormatedDateTime";
import { Input } from "./ui/inputx";
import { CiCircleRemove } from "react-icons/ci";
import { convertFileSize, formatDateTime } from "@/lib/utils";
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3 truncate ">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col w-full gap-2">
      <p className="font-bold flex text-sm  line-clamp-1">{file.name}</p>
      <FormatedDateTime date={file.$createdAt} className="text-xs" />
    </div>
  </div>
);

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-center ">
    <p className="text-[14px] leading-[20px] font-normal flex w-[30%]  ml-4 ">
      {label}
    </p>
    <p className="text-[14px] leading-[20px] font-semibold flex-1 ">{value}</p>
  </div>
);

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="mt-2 space-y-2">
        <p>Share file other users</p>
        <Input
          type="email"
          placeholder="enter email"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
        />
        <div className="pt-4 ">
          <div className="flex justify-between">
            <p className="text-sm font-light">Shared with</p>
            <p>{file.users.length} users</p>
          </div>
          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2 mb-5"
              >
                <p className="text-sm font-bold ">{email}</p>
                <button onClick={() => onRemove(email)}>
                  <CiCircleRemove className="text-xl opacity-50" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

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
