# BlockMEDC
Blockchain smart-contract system for securing Moroccan higher-education digital certificates.

## Architecture
| Actor | Role | Can |
|---|---|---|
| Ministry (MESRSI) | `MINISTRY_ROLE` | register / deactivate institutions, revoke any certificate, pause the system |
| Institution | `INSTITUTION_ROLE` | issue (single or batch) and revoke its own certificates |
| Anyone | none | verify a certificate by the hash of its file |

Only hashes are stored on-chain (the diploma file hash and a salted student-ID hash), so no personal data is public.

## Project structure
- `contracts/BlockMEDC.sol` - smart contract (Solidity, OpenZeppelin AccessControl + Pausable)
- `test/BlockMEDC.test.js` - 12 automated tests
- `scripts/deploy.js` - deploys the contract and registers 2 demo universities
- `scripts/verify.js` - a university issues a certificate for a file, then it is verified
- `scripts/revoke.js` - the university revokes a certificate
- `verify.html` - web page where a verifier drops a diploma file and sees Authentic / Revoked / Not found

## How to run
Requires Node.js 20 or 22 LTS.

1. `npm install`
2. `npx hardhat test` (expect 12 passing)
3. `npx hardhat node` (terminal 1, keep it running)
4. `npm run deploy:local` (terminal 2; note the printed contract address)
5. Open `verify.html` in Chrome or Edge, open "Connection settings" and paste the contract address

## Demo
Windows Command Prompt, in terminal 2:

```
set PDF=C:\path\to\any\file.pdf
npm run verify:cert
npx hardhat run scripts/revoke.js --network localhost
```

1. Drop the file on `verify.html` before issuing: **Not found**
2. Run `verify:cert` and drop the file again: **Authentic**
3. Drop a modified copy of the file: **Not found** (tamper detected)
4. Run `revoke.js` and drop the file again: **Revoked**
