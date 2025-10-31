export const fallbackImages = [
  "/abstract/thai-an-4zq29Io2kcM-unsplash.jpg",
  "/abstract/juairia-islam-shefa-oSuArenPc3E-unsplash.jpg",
  "/abstract/pawel-czerwinski-sC05mkDUs1k-unsplash.jpg",
  "/abstract/simone-hutsch-8SBH0dIQ4LU-unsplash.jpg",
  "/abstract/elliott-2VSerbX-qPk-unsplash.jpg",
  "/abstract/creatvise-9tx1nx8BwQ8-unsplash.jpg",
  "/abstract/melyna-valle-oFYBzMh9qt0-unsplash.jpg",
  "/abstract/pascal-brandle-drpKF5m-6MQ-unsplash.jpg",
  "/abstract/pawel-czerwinski-R_ibevUfKUM-unsplash.jpg",
  "/abstract/sufyan-_Mpa9FoBAKU-unsplash.jpg",
  "/abstract/planet-volumes-U6L-Ls4N8Rk-unsplash.jpg",
  "/abstract/pawel-czerwinski-Slf8QxaFIWw-unsplash.jpg",
  "/abstract/jason-leung-HH25xjKeqxM-unsplash.jpg",
  "/abstract/alexander-andrews-cU2lda3kbls-unsplash.jpg",
  "/abstract/valentin-lacoste-6OiHO4CnSgI-unsplash.jpg",
  "/abstract/monisha-selvakumar-S7Iv4cDWsKo-unsplash.jpg",
  "/abstract/paris-bilal-_l6BI_nQN-M-unsplash.jpg",
  "/abstract/milada-vigerova-YthSSBtPDX0-unsplash.jpg",
  "/abstract/thanos-pal-9OZfTe-y5T4-unsplash.jpg",
  "/abstract/thanos-pal-OZ7fsxfO14A-unsplash.jpg",
  "/abstract/thanos-pal-7zZptfcap4s-unsplash.jpg",
  "/abstract/tengyart-Mjq3GJtVXJ0-unsplash.jpg",
  "/abstract/jess-bailey-q10VITrVYUM-unsplash.jpg",
  "/abstract/retrosupply-jLwVAUtLOAQ-unsplash.jpg",
  "/abstract/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
]

export function getRandomFallbackImage() {
  const index = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[index];
}