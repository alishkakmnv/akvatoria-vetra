"use client";

import { useEffect } from "react";
import { captureTraffic } from "@/lib/traffic";

/** Захватывает ?traffer=/?src= при первом рендере. Ничего не рисует. */
export function TrafficCapture() {
  useEffect(() => {
    captureTraffic();
  }, []);
  return null;
}
