"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { RiFolderUploadFill } from "react-icons/ri";
import { getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { IoMdRemoveCircleOutline } from "react-icons/io";
interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}
const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer flex gap-3 justify-center items-center"
    >
      <input {...getInputProps()} />
      <button
        type="button"
        className={cn(
          "bg-black text-white p-2 rounded-lg flex justify-center items-center",
          className
        )}
      >
        <RiFolderUploadFill size={45} />
        <p>Upload</p>
      </button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-[20px] bg-white p-7 shadow-drop-3 ">
          <h4 className="font-medium text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between  gap-3 rounded-xl p-3 shadow-drop-3"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="subtitle-2 mb-2 line-clamp-1 max-w-[300px]">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      width={80}
                      height={26}
                      alt="Loader"
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  alt="Remove"
                  width={20}
                  height={20}
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
      {isDragActive ? (
        <p className="text-black">Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
