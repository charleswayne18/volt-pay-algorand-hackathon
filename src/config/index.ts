const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api-url.com',
  VTU_CONTRACT_ID: process.env.NEXT_PUBLIC_VTU_CONTRACT_ID,
  VTU_TX_NOTE_PREFIX: process.env.NEXT_PUBLIC_VTU_TX_NOTE_PREFIX,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`missing required ${key} env variable`);
  }
});

export default config;
