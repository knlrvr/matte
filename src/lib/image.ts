import type { SourceImage } from "./types";

export const isImageFile = (file: File) => file.type.startsWith("image/");

/** Loads an image URL far enough to know its pixel dimensions. */
export function loadImage(src: string, name: string): Promise<SourceImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({ src, name, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error(`Couldn't read ${name} as an image.`));
    img.src = src;
  });
}

export async function loadImageFile(file: File): Promise<SourceImage> {
  if (!isImageFile(file)) throw new Error(`${file.name} isn't an image.`);
  const src = URL.createObjectURL(file);
  try {
    return await loadImage(src, file.name || "pasted-image.png");
  } catch (error) {
    URL.revokeObjectURL(src);
    throw error;
  }
}

export const revokeIfObjectUrl = (url: string | null | undefined) => {
  if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
};

export const firstImageFile = (files: FileList | null | undefined) =>
  Array.from(files ?? []).find(isImageFile) ?? null;
