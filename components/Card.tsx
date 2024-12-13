import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormatedDateTime from "./FormatedDateTime";
import ActionDropDown from "./ActionDropDown";
type CardProps = {
  file: Models.Document;
};
const Card = (props: CardProps) => {
  const { file } = props;
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6  bg-black w-64 h-50 p-5 shadow-sm transition-all hover:shadow-drop-3 text-white rounded-xl"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="w-20 h-20"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropDown file={file} />
          <p className="text-sm">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <p className=" truncate ...">{file.name}</p>
        <FormatedDateTime date={file.$createdAt} className="text-xs" />
      </div>
    </Link>
  );
};

export default Card;
