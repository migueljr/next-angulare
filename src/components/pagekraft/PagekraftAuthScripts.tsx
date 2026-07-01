import { AUTH_CONFIG_SCRIPT, AUTH_SRC } from "./config";

// Auth global: config inline + script oficial do CDN (como no HTML original do Pagekraft).
export default function PagekraftAuthScripts() {
  return (
    <>
      <script
        id="pagekraft-auth-config"
        dangerouslySetInnerHTML={{ __html: AUTH_CONFIG_SCRIPT }}
      />
      <script id="script-pagekraft-auth" type="module" src={AUTH_SRC} async={false} />
    </>
  );
}
