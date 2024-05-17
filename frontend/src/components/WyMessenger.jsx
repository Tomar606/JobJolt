import React from "react";
import { useWeavy, WyMessenger } from "@weavy/uikit-react";

export function WeavyComponent() {
  useWeavy({
    url: "https://ec0233f4681040e6a0e5b1781baf756b.weavy.io",
    tokenFactory: async () => "wyu_0qHvWveKZl5X143joccn4At7yjdl7K0lz49m"
  });

  return <WyMessenger className="h-screen"></WyMessenger>;
}
