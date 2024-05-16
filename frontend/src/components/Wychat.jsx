import React from "react";
import { useWeavy, WyChat } from "@weavy/uikit-react";

export function WeavyComponent() {
  useWeavy({
    url: "https://916aeb85c00e4c4d999e21df89997884.weavy.io",
    tokenFactory: async () => "wyu_Y3CTwU3ODJZhr9mytyxmEH2Kmy0AVW489zi9"
  });

  return <WyChat uid="wyuidchat"></WyChat>;
}
