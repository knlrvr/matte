import { Button } from "@/components/ui/Button";
import type { ExportFormat } from "@/lib/types";

const FORMAT_LABEL: Record<ExportFormat, string> = { png: "PNG", jpeg: "JPEG", webp: "WebP" };

interface ToolbarProps {
  hasImage: boolean;
  canExport: boolean;
  isExporting: boolean;
  format: ExportFormat;
  onChooseImage: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export function Toolbar({
  hasImage,
  canExport,
  isExporting,
  format,
  onChooseImage,
  onCopy,
  onDownload,
}: ToolbarProps) {
  const disabled = !canExport || isExporting;
  return (
    <header className="flex h-13 shrink-0 items-center gap-1.5 border-b border-line bg-panel px-3 sm:gap-2 sm:px-4">
      <span className="mr-auto text-[15px] font-semibold tracking-tight">Matte</span>
      <Button variant="ghost" onClick={onChooseImage}>
        {hasImage ? "Replace" : "Choose"}
        {/* Trimmed on phones so all three actions fit on one row. */}
        <span className="max-sm:sr-only">image</span>
      </Button>
      <Button onClick={onCopy} disabled={disabled} title="Copy as PNG (Ctrl/⌘ + Shift + C)">
        Copy
      </Button>
      <Button variant="primary" onClick={onDownload} disabled={disabled} title="Download (Ctrl/⌘ + S)">
        {isExporting ? (
          "Exporting…"
        ) : (
          <>
            Download <span className="max-sm:sr-only">{FORMAT_LABEL[format]}</span>
          </>
        )}
      </Button>
    </header>
  );
}
