"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function SearchBlogBar() {
  const placeholders = [
    "C language",
    "React js",
    "Object Oriented Programming",
    "Data Structure and Algorithms",
    "Laravel",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[10rem] flex flex-col justify-center  items-center px-4 mt-10 mb-5">
      <h2 className="mb-2 sm:mb-5 text-xl text-center sm:text-5xl dark:text-white text-black">
        Bit2Byte Blogs
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}