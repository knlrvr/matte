import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onChooseImage: () => void;
  onUseSample: () => void;
}

export function EmptyState({ onChooseImage, onUseSample }: EmptyStateProps) {
  return (
    <div className="flex w-[calc(100%-2rem)] max-w-md flex-col items-center rounded-xl border border-dashed border-muted/50 bg-panel/70 px-5 py-6 text-center backdrop-blur-sm sm:px-8 sm:py-12">
      <h1 className="text-[18px] leading-tight sm:text-[22px] font-semibold tracking-tight">Drop a screenshot here</h1>
      <p className="mt-1.5 max-w-[34ch] text-muted sm:mt-2">
        Or paste one from your clipboard. Your image stays in this browser tab and is never uploaded.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6">
        <Button variant="primary" onClick={onChooseImage}>
          Choose image
        </Button>
        <Button onClick={onUseSample}>Use the sample</Button>
      </div>
    </div>
  );
}
