const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Ensure conditional exports resolve to browser/react-native builds (e.g. "jose"),
// avoiding Node.js builds that depend on core modules like "crypto".
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ["react-native", "browser", "default", "require"];

const joseWebcryptoPath = path.join(__dirname, "node_modules", "jose", "dist", "browser", "runtime", "webcrypto.js");
const joseWebcryptoShim = path.join(__dirname, "polyfills", "jose-webcrypto-shim.js");

const prevResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (context.originModulePath === joseWebcryptoPath) return { type: "sourceFile", filePath: joseWebcryptoShim };
  if (prevResolveRequest) return prevResolveRequest(context, moduleName, platform);
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

