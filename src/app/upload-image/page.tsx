"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

function MyDropzone(props: {
  children: React.ReactNode;
  onDrop: (acceptedFiles: File[]) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
    noClick: true,
  });

  return (
    <div {...getRootProps()} className="h-screen w-screen">
      <input {...getInputProps()} />
      {props.children}
    </div>
  );
}
export default function Page() {
  const [pickedFiles, setPickedFiles] = useState<File[]>([]);

  return (
    <>
      <MyDropzone
        onDrop={(newFiles) => {
          const newFls = newFiles.filter(
            (file) => !pickedFiles.some((f) => f.name === file.name),
          );
          return setPickedFiles([...pickedFiles, ...newFls]);
        }}
      >
        <div>
          {...pickedFiles.map((file) => {
            const pth = URL.createObjectURL(file);

            return (
              <Image
                src={pth}
                key={file.name}
                alt={file.name}
                width={200}
                height={200}
              />
            );
          })}
        </div>
      </MyDropzone>
    </>
  );
}
