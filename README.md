# Typedoc Frontend

`typedoc-frontend` converts Typedoc output into a React component.

---

# Installation

```
yarn add @apixelvisuals/typedoc-frontend
```

---

# Usage

## Docs

```jsx
import React from "react";
import { Docs } from "@apixelvisuals/typedoc-frontend";

const App = () => (
    <Docs
        url="https://example.com/docs.json"
        colors={{
            background: "#252550",
            backgroundDark: "#171731",
            primary: "#574ae2",
            accent: "#f63e70",
            text: "#7c72eb",
            textLight: "#978fee",
            textLighter: "#ada9e4"
        }}
    />
);

export default App;
```

## Guides

```jsx
import React from "react";
import { Guides } from "@apixelvisuals/typedoc-frontend";

const App = () => (
    <Guides
        icon="/assets/icon.svg"
        sections={[
            {
                name: String,
                className: String,
                guides: [
                    {
                        name: String,
                        description: String,
                        icon: "/assets/guides/icon.svg",
                        slug: String,
                        url: String,
                        className: "main" || "main-small" || "thin" || "other" || "other last" || String
                    }
                ]
            }
        ]}
        colors={{
            background: "#252550",
            backgroundDark: "#171731",
            primary: "#574ae2",
            accent: "#f63e70",
            text: "#7c72eb",
            textLight: "#978fee",
            textLighter: "#ada9e4"
        }}
    />
);

export default App;
```

---

# Development

- Clone the repo: `git clone https://github.com/APixelVisuals/typedoc-frontend.git`
- Enter the directory: `cd typedoc-frontend`
- Install packages: `yarn install-all`
- Start the development server: `yarn dev`

Use `testing/src/App.js` to test the components