"use client";

import { DragEvent, useRef, useState } from "react";
import * as S from "./FileUploader.css";
import { useBooleanState } from "@/hooks";

export const FileUploader = () => {
  const [isOnDrop, _onDragOver, _onDragLeave] = useBooleanState();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("test");
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    _onDragOver();
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    _onDragLeave();
  };

  console.log(isOnDrop);

  return (
    <div
      className={S.FileUploaderContainer({ isOnDrop })}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <label htmlFor="test">test</label>
      <input id="test" type="file" multiple ref={inputRef} />
    </div>
  );
};
