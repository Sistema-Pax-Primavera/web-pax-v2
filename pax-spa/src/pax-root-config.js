import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@pax/pax-login",
  app: () => import("@pax/pax-login"),
  activeWhen: (location) => {
    if (location.pathname === '/') {
      window.location.href = '/login';
      return false;
    }
    return location.pathname === '/login';
  }
});

registerApplication({
  name: "@pax/pax-home",
  app: () => import("@pax/pax-home"),
  activeWhen: ["/pax-primavera"],
});

registerApplication({
  name: "@pax/pax-associado",
  app: () => import("@pax/pax-associado"),
  //activeWhen: (location) => location.pathname === '/pax-primavera',
  activeWhen: ["/associado"],
});

registerApplication({
  name: "@pax/pax-venda",
  app: () => import("@pax/pax-venda"),
  activeWhen: ["/vendas"],
});

registerApplication({
  name: "@pax/pax-financeiro",
  app: () => import("@pax/pax-financeiro"),
  activeWhen: ["/financeiro"],
});

registerApplication({
  name: "@pax/pax-cobranca",
  app: () => import("@pax/pax-cobranca"),
  activeWhen: ["/cobranca"],
});

registerApplication({
  name: "@pax/pax-cadastro",
  app: () => import("@pax/pax-cadastro"),
  activeWhen: ["/cadastro"],
});

registerApplication({
  name: "@pax/pax-suporte",
  app: () => import("@pax/pax-suporte"),
  activeWhen: ["/suporte"],
});

registerApplication({
  name: "@pax/pax-boletos",
  app: () => import("@pax/pax-boletos"),
  activeWhen: ["/boletos"],
});

registerApplication({
  name: "@pax/pax-parcelas",
  app: () => import("@pax/pax-parcelas"),
  activeWhen: ["/parcelas"],
});

registerApplication({
  name: "@pax/pax-relatorio",
  app: () => import("@pax/pax-relatorio"),
  activeWhen: ["/relatorios"],
});


registerApplication({
  name: "@pax/pax-ranking",
  app: () => import("@pax/pax-ranking"),
  activeWhen: (location) => { return location.pathname === '/ranking-tv' }
});



start({
  urlRerouteOnly: true,
});