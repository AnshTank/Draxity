"use client";

import { useState } from "react";
import { CodingEnvironment } from "@/components/practice/coding-environment";
import { Navigation } from "@/components/navigation";

export default function PracticePage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {!isFullscreen && <Navigation />}
      <CodingEnvironment onFullscreenChange={setIsFullscreen} />
    </>
  );
}
