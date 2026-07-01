import { BOOKING_CONFIG_SCRIPT, BOOKING_SRC } from "./config";

// Agenda: container + config + script oficial do CDN.
// Scripts no HTML (não via useEffect) para o main.js do Pagekraft registrar
// o listener de DOMContentLoaded corretamente.
export default function PagekraftBooking() {
  return (
    <>
      <div id="pagekraft-booking" className="pagekraft-booking min-h-[400px]" />
      <script
        id="pagekraft-booking-config"
        dangerouslySetInnerHTML={{ __html: BOOKING_CONFIG_SCRIPT }}
      />
      <script id="script-pagekraft-booking" type="module" src={BOOKING_SRC} async={false} />
    </>
  );
}
