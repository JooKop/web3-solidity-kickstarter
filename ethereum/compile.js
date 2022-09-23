const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const compilerInput = {
  language: "Solidity",
  sources: {
    [campaignPath]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

console.log("Compiling Campaign.sol...");
const rawCompiled = solc.compile(JSON.stringify(compilerInput));
const compiled = JSON.parse(rawCompiled);

fs.ensureDirSync(buildPath);

for (let contract in compiled.contracts[campaignPath]) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    compiled.contracts[campaignPath][contract]
  );
}
