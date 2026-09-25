// Simula a latência de rede para que as telas de carregamento apareçam como no app real
export function espera(ms = 400) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
