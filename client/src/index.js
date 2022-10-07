import React from "react";
import ReactDOM, { hydrateRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//     <RecoilRoot>
//         <HelmetProvider>
//             <App />
//         </HelmetProvider>
//     </RecoilRoot>
// );

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrateRoot(
        rootElement,
        <RecoilRoot>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </RecoilRoot>
    );
} else {
    root.render(
        <RecoilRoot>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </RecoilRoot>
    );
}
