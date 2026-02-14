"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function EmptyConversation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lottie/group.json",
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="h-[200px] w-[200px]" ref={containerRef} />
      <div className="text-sm text-slate">Start a conversation.</div>
    </div>
  );
}
