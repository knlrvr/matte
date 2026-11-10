import { toCanvas } from "html-to-image";
import type { ExportFormat } from "./types";

const MIME: Record<ExportFormat, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

interface RenderOptions {
  format: ExportFormat;
  pixelRatio: number;
  /** Painted behind everything. JPEG has no alpha, so it always needs one. */
  backgroundColor?: string;
}

const isSafari = () =>
  typeof navigator !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/** Rasterises the canvas DOM node to an image blob. */
export async function renderNode(
  node: HTMLElement,
  { format, pixelRatio, backgroundColor }: RenderOptions,
): Promise<Blob> {
  const options = {
    pixelRatio,
    backgroundColor: backgroundColor ?? (format === "jpeg" ? "#ffffff" : undefined),
    // The node sits inside a scaled preview wrapper; render it at its own size.
    width: node.offsetWidth,
    height: node.offsetHeight,
  };

  // Safari paints embedded images a frame late, so its first pass comes out
  // without them. A throwaway render warms the cache.
  if (isSafari()) await toCanvas(node, options);
  const canvas = await toCanvas(node, options);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("The browser couldn't encode the image."))),
      MIME[format],
      0.94,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Takes a promise rather than a blob so the clipboard write starts inside the
 * click handler — Safari rejects writes that begin after an await.
 */
export async function copyBlobToClipboard(blob: Promise<Blob>) {
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    throw new Error("This browser can't copy images. Download it instead.");
  }
  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}

export function exportFilename(sourceName: string, format: ExportFormat) {
  const base = sourceName.replace(/\.[^.]+$/, "") || "image";
  return `${base}-matte.${format === "jpeg" ? "jpg" : format}`;
}
