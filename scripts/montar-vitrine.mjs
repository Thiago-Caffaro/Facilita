// Monta o site do GitHub Pages em site/:
//   site/          vitrine (aviso, moldura de celular e caixa de entrada)
//   site/app/      app exportado pelo Expo (gerado antes por `npm run build:pages`)
import { copyFileSync, cpSync, existsSync, writeFileSync } from 'node:fs';

const SITE = 'site';

if (!existsSync(`${SITE}/app/index.html`)) {
  console.error('Rode "npx expo export --platform web --output-dir site/app" antes (com EXPO_BASE_URL=/Facilita/app).');
  process.exit(1);
}

cpSync('vitrine', SITE, { recursive: true });
copyFileSync('components/logoFacilita/assets/logoAppWhite.png', `${SITE}/logo.png`);
copyFileSync('assets/images/favicon.png', `${SITE}/favicon.png`);

// O GitHub Pages devolve o 404.html para qualquer caminho que não existe. Usando o
// index.html do app, recarregar o iframe numa rota interna (/app/rede, por exemplo) funciona.
copyFileSync(`${SITE}/app/index.html`, `${SITE}/404.html`);

// Sem isso o GitHub Pages (Jekyll) ignora a pasta _expo, onde fica o JavaScript do app
writeFileSync(`${SITE}/.nojekyll`, '');

console.log('Site montado em site/');
