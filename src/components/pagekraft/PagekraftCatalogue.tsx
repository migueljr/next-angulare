import { CATALOGUE_SRC } from "./config";

// Pacotes: container + script oficial do CDN (sem config inline, como no print original).
export default function PagekraftCatalogue() {
  return (
    <>
      <div id="pagekraft-catalogue" className="pagekraft-catalogue min-h-[400px]" />
      <script id="script-pagekraft-catalogue" type="module" src={CATALOGUE_SRC} async={false} />
    </>
  );
}
