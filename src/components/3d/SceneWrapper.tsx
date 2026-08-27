"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/useMediaQuery";

const NodeGraphScene = dynamic(() => import("./NodeGraphScene"), {
  ssr: false,
  loading: () => null,
});

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

interface SceneWrapperProps {
  nodeCount?: number;
  interactive?: boolean;
  onNodeClick?: (index: number) => void;
  activeIndex?: number | null;
  fallbackLabel?: string;
  className?: string;
}

export default function SceneWrapper({
  nodeCount = 5,
  interactive = false,
  onNodeClick,
  activeIndex,
  fallbackLabel = "Software → Data → AI → Agents → Applications",
  className,
}: SceneWrapperProps) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  // Disable the heavier ambient 3D on small screens to preserve performance,
  // but keep the interactive version (used in the dedicated visualization
  // section) available since it's a deliberate, requested interaction.
  const shouldRender3D = supported && !reducedMotion && !(isSmallScreen && !interactive);

  if (!shouldRender3D) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-line-strong bg-paper-dim/60 p-8 text-center font-mono text-xs text-muted ${className ?? ""}`}
        role="img"
        aria-label={fallbackLabel}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <div className={className}>
      <NodeGraphScene
        nodeCount={nodeCount}
        interactive={interactive}
        onNodeClick={onNodeClick}
        activeIndex={activeIndex}
      />
    </div>
  );
}
