import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaRegFilePdf } from "react-icons/fa";
import {
  BsFiletypeDocx,
  BsFiletypeCsv,
  BsFiletypeTxt,
  BsFiletypeXlsx,
  BsFiletypeSvg,
  BsFilePlayFill,
  BsMusicNoteList,
  BsFiletypePsd,
  BsFileBarGraphFill,
} from "react-icons/bs";
import { SlDoc } from "react-icons/sl";
import { HiMiniDocumentText } from "react-icons/hi2";
interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    // Document
    case "pdf":
      return <FaRegFilePdf className="w-16 h-16" />;
    case "doc":
      return <BsFiletypeDocx className="w-16 h-16" />;
    case "docx":
      return <BsFiletypeDocx className="w-16 h-16" />;
    case "csv":
      return <BsFiletypeCsv className="w-16 h-16" />;
    case "txt":
      return <BsFiletypeTxt className="w-16 h-16" />;
    case "xls":
    case "xlsx":
      return <BsFiletypeXlsx className="w-16 h-16" />;
    // Image
    case "svg":
      return <BsFiletypeSvg className="w-16 h-16" />;
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return <BsFilePlayFill className="w-16 h-16" />;
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return <BsMusicNoteList className="w-16 h-16" />;
    case "psd":
      return <BsFiletypePsd className="w-16 h-16" />;

    default:
      switch (type) {
        case "image":
          return "/assets/icons/file-image.svg";
        case "document":
          return "/assets/icons/file-document.svg";
        case "video":
          return "/assets/icons/file-video.svg";
        case "audio":
          return "/assets/icons/file-audio.svg";
        default:
          return <BsFileBarGraphFill className="w-16 h-16" />;
      }
  }
};

export const Thumbnail = ({
  type,
  extension,
  url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure
      className={cn(
        "flex-center size-[50px] min-w-[50px] overflow-hidden rounded-xl ",
        className
      )}
    >
      {isImage ? (
        <Image
          src={isImage ? url : getFileIcon(extension, type)}
          alt="thumbnail"
          width={100}
          height={100}
          className={cn(
            "size-8 object-contain",
            imageClassName,
            isImage && "size-full object-cover object-center"
          )}
        />
      ) : (
        <>{getFileIcon(extension, type)}</>
      )}
    </figure>
  );
};
export default Thumbnail;
