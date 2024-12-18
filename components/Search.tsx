"use client";

import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Input } from "./ui/inputx";
import { useSearchParams } from "next/navigation";
import { set } from "react-hook-form";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormatedDateTime from "./FormatedDateTime";
import { usePathname, useRouter } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchFiles = async () => {
      if (!query) {
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }
      const files = await getFiles({ types: [], searchText: query });
      setResult(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`
    );
  };
  return (
    <div className="relative w-full md:max-w-[480px]">
      <div className="flex h-[52px] flex-1 items-center gap-3 rounded-lg px-4 shadow-drop-3">
        <IoSearchSharp className="w-[24] h-[24]" />
        <Input
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="font-normal"
        />
        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-lg bg-black p-4 text-white truncate">
            {result.length > 0 ? (
              result.map((file: any) => (
                <li
                  key={file.$id}
                  className="flex-col items-center justify-between"
                  onClick={() => handleClickItem(file)}
                >
                  <div className="cursor-pointer items-center gap-4 ">
                    <p className="font-base truncate">{file.name}</p>
                  </div>
                  <FormatedDateTime
                    date={file.$createdAt}
                    className="text-xs font-light truncate"
                  />
                </li>
              ))
            ) : (
              <p className="text-base text-center">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
