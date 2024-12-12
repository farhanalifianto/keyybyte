import React from "react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
const FormatedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-[16px] leading-[24px] font-normal text-light-200",
        className
      )}
    >
      {formatDateTime(date)}
    </p>
  );
};

export default FormatedDateTime;
