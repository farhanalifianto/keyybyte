"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { sortTypes } from "@/constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sort = () => {
  const router = useRouter();
  const path = usePathname();
  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };
  return (
    <>
      <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={sortTypes[0].value} />
        </SelectTrigger>
        <SelectContent>
          {sortTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default Sort;
