# Sistema Pax Primavera

O sistema pax primavera foi desenvolvido em microfrontends usando React.JS em seus modulos e para gerenciar Single-SPA.

## Getting Started

Para testar o sistema localmente certifique-se que as portas configuradas no 'executar_pax.bat' estão disponiveis.

Para cada modulo a pasta leva o nome de pax-'nome-do-modulo'. Exceto o modulo pax-spa, que o gerenciador dos modulos.

Em cada modulo é necessário rodar o comando _npm install_.

Este repositorio conta a pasta _api-teste_ que é serve para logar e carregar dados ficticios para associados, venda e cobrança

## npm start

Para cada modulo (inclusive api e spa) é necessário rodar este comando. O arquivo executar_pax.bat já faz isso pra você.

## npm run build

Para gerar a pasta build é necessário rodar o comando em todos os modulos, inclusive em pax-spa.

## deploy

Uma vez com a pasta build de todos os modulos, basta juntar todos os arquivos dentro de uma única pasta considerando que os modulos da aplicação ficará todos no mesmo servidor. Caso seja um módulo por servidor, é necessário indicar a URL do servidor no arquivo index.ejs dentro de pax-spa e configurar sua rota.
