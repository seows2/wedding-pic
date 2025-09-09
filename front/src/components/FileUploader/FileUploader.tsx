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
import { FileListItem } from "./FileListItem";

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
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  const [fileErrors, setErrorMessages] = useState<FileError[]>([]);

  const setFileProperty = usePreservedCallback(
    (
      customFile: DropzoneFile,
      action: (customFileToModify: DropzoneFile) => void
    ) => {
      setFiles((oldFiles) => {
        return oldFiles.map((oldFile) => {
          if (oldFile.id === customFile.id) {
            action(oldFile);
            return oldFile;
          }
          return oldFile;
        });
      });
    }
  );

  const setErrors = (rejectedFiles: FileRejection[]) => {
    let errors: FileError[] = [];
    rejectedFiles.map((rejectedFile) => {
      rejectedFile.errors.map((newError) => {
        if (
          errors.findIndex((presentError) => {
            return (
              presentError.code === newError.code &&
              presentError.message === newError.message
            );
          }) === -1
        ) {
          errors.push(newError);
        }
      });
    });

    setErrorMessages(errors);
  };

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      rejectedFiles: FileRejection[],
      event: DropEvent
    ) => {
      let customFiles = acceptedFiles.map(mapToCustomFile);
      if (options?.multiple === false) {
        setFiles(customFiles);
      } else {
        setFiles((oldFiles) => [...oldFiles, ...customFiles]);
      }

      setErrors(rejectedFiles);

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

          reader.onabort = () => {
            setFileProperty(customFile, (fileToModify) => {
              fileToModify.error = new DOMException("Aborted");
            });
          };

          reader.onprogress = (event) => {
            setFileProperty(customFile, (fileToModify) => {
              fileToModify.progress = event.loaded;
            });
          };

          reader.onload = () => {
            onLoad?.(reader.result);
          };

          reader.onerror = () => {
            setFileProperty(customFile, (fileToModify) => {
              fileToModify.error = reader.error;
            });
          };

          read();
        }
      }
    },
    [onLoad, options, readAs, setFileProperty]
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
