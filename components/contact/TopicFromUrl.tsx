"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isTopic, type Topic } from "@/lib/contact/topics";

/**
 * Hands the form the topic in the page's link (`?topic=role`). The query string only exists in the
 * browser, so this reads it after the static page loads, inside its own Suspense boundary, and
 * renders nothing: the form itself stays in the static HTML and works without JavaScript.
 */
export function TopicFromUrl({ onTopic }: { onTopic: (topic: Topic | null) => void }) {
  const value = useSearchParams().get("topic");
  const topic = isTopic(value) ? value : null;
  useEffect(() => {
    onTopic(topic);
  }, [topic, onTopic]);
  return null;
}
