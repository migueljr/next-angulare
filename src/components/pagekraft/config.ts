export const AUTH_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/auth-latest.js";

export const BOOKING_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/booking-latest.js";

export const CATALOGUE_SRC =
  "https://pagekraft.angulare.app/angulare/pagekraft/catalogue-latest.js";

// Config do auth — mesma estrutura que você passou originalmente.
export const AUTH_CONFIG_SCRIPT = `
const path = window.location.pathname;
const paths = ["/docs/politica-de-privacidade-app"];

if (!paths.includes(path)) {
  window.pagekraft = window.pagekraft || {};
  window.pagekraft.auth = {
    config: {
      domain: 'apexperformance.dev.angular-ecommerce.com',
      domain_dev: 'apexperformance.dev.angular-ecommerce.com',
      angulareVersion: 'latest-v4',
      config: {
        packagePageUrl: '/planos',
        myAccountPageUrl: '/my-account',
        useOTPInForgotPassword: true,
        newVersionMenu: true,
        useBookV2: true,
        allowSetPOSSelectInTerms: true,
        bookPageUrl: '/agenda',
        dataModalRefferal: {
          textBlock: [
            'Copie o seu código de indicação e envie para um amigo que ainda não nos conhece.',
            'No carrinho da primeira compra, seu amigo deverá inserir o seu código no campo "CUPOM".',
            'Ao finalizar a compra, um crédito cortesia será gerado para você (nada acontecerá na conta dele, este não é um cupom de desconto).',
            'O crédito bônus ficará disponível para a reserva de aula por 30 dias.',
            'A cada dois indicados que realizarem compra de crédito, o aluno que indicou ganha um crédito bônus.'
          ]
        },
        pages: [
          { icon: 'home-internal-icon', label: 'Inicio', page: '/' },
          { icon: 'plan-internal-icon', label: 'Planos', page: '/planos' },
          { icon: 'schedule-internal-icon', label: 'Agenda', page: '/agenda' }
        ]
      }
    }
  };
}
`.trim();

export const BOOKING_CONFIG_SCRIPT = `
window.pagekraft = window.pagekraft || {};
window.pagekraft.booking = {
  type: 'schedule-config',
  config: {
    isExternalFilters: true,
    dinamicFilters: true,
  }
};
`.trim();
