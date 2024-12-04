"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { CiInboxOut } from "react-icons/ci";
import { getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MAX_FILE_SIZE } from "@/constant";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}
const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== file.name)
          );
          return toast({
            description: (
              <p className="text-sm text-white ">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file is 50MB
              </p>
            ),
            className: "bg-red rounded-lg",
          });
        }
        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadFile) => {
            if (uploadFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((file) => file.name !== file.name)
              );
            }
          }
        );
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({
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
          "bg-white text-black p-2 rounded-lg flex justify-center items-center",
          className
        )}
      >
        <CiInboxOut size={35} />
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
    </div>
  );
};

export default FileUploader;
