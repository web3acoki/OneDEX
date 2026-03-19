const crypto = globalThis.crypto;

export default crypto;
export const isCryptoKey = (key) => key instanceof CryptoKey;

