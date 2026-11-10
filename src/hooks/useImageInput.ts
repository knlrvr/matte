import { type ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { firstImageFile, loadImage, loadImageFile } from "@/lib/image";
import { useEditorStore } from "@/store/editor";
import { useNoticeStore } from "@/store/notice";

const hasFiles = (event: DragEvent) => event.dataTransfer?.types.includes("Files") ?? false;

/**
 * Every way an image gets into the editor: the file picker, paste, drag and
 * drop anywhere on the page, and the bundled sample.
 */
export function useImageInput() {
  const setImage = useEditorStore((state) => state.setImage);
  const notify = useNoticeStore((state) => state.notify);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);

  const addFile = useCallback(
    async (file: File | null) => {
      if (!file) return notify("That isn't an image. Try a PNG, JPEG, WebP, GIF or SVG.", "error");
      try {
        setImage(await loadImageFile(file));
      } catch (error) {
        notify(error instanceof Error ? error.message : "Couldn't open that image.", "error");
      }
    },
    [notify, setImage],
  );

  const loadSample = useCallback(async () => {
    try {
      setImage(await loadImage("/sample.png", "sample.png"));
    } catch {
      notify("Couldn't load the sample image.", "error");
    }
  }, [notify, setImage]);

  const openPicker = useCallback(() => inputRef.current?.click(), []);

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = firstImageFile(event.target.files);
      event.target.value = ""; // lets the same file be picked twice in a row
      void addFile(file);
    },
    [addFile],
  );

  useEffect(() => {
    let depth = 0;

    const onPaste = (event: ClipboardEvent) => {
      const file = firstImageFile(event.clipboardData?.files);
      if (!file) return; // leave ordinary text pastes alone
      event.preventDefault();
      void addFile(file);
    };
    const onDragEnter = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth += 1;
      setDragging(true);
    };
    const onDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth = Math.max(0, depth - 1);
      if (depth === 0) setDragging(false);
    };
    const onDragOver = (event: DragEvent) => {
      if (hasFiles(event)) event.preventDefault();
    };
    const onDrop = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      depth = 0;
      setDragging(false);
      void addFile(firstImageFile(event.dataTransfer?.files));
    };

    window.addEventListener("paste", onPaste);
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("paste", onPaste);
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, [addFile]);

  return { inputRef, onInputChange, openPicker, loadSample, isDragging };
}
