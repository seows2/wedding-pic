"use client";

import { useCallback, useState } from "react";
import {
  DropEvent,
  DropzoneOptions,
  FileError,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { usePreservedCallback } from "@/hooks";
import * as S from "./FileUploader.css";

export type DropzoneFile = {
  file: File;
  id: string;
  error: DOMException | null;
  progress?: number;
};

export type FileUploaderProps = {
  children?: React.ReactNode;
  options?: DropzoneOptions;
  readAs?:
    | "readAsArrayBuffer"
    | "readAsText"
    | "readAsBinaryString"
    | "readAsDataURL";
  onLoad?: (result: string | ArrayBuffer | null) => void;
};

export const FileUploader = (props: FileUploaderProps) => {
  const { children, onLoad, options, readAs } = props;

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      rejectedFiles: FileRejection[],
      event: DropEvent,
    ) => {
      const customFiles = acceptedFiles.map(mapToCustomFile);

      if (options?.onDrop) {
        options.onDrop(acceptedFiles, rejectedFiles, event);
      } else {
        for (const customFile of customFiles) {
          const reader = new FileReader();

          const read = () => {
            if (readAs) {
              reader[readAs](customFile.file);
            } else {
              reader.readAsText(customFile.file);
            }
          };

          reader.onload = () => {
            onLoad?.(reader.result);
          };

          read();
        }
      }
    },
    [onLoad, options, readAs],
  );

  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      ...options,
      useFsAccessApi: false,
      onDrop,
    });

  return (
    <div
      {...getRootProps({
        className: S.FileUploaderContainer({ isDragAccept, isDragReject }),
      })}
    >
      <div>
        <input {...getInputProps()} />
        {children}
      </div>
    </div>
  );
};

let count = 1;
const mapToCustomFile = (file: File): DropzoneFile => {
  return {
    id: `${++count}`,
    file,
    error: null,
  };
};
