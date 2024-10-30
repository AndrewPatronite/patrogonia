const fs = require('fs');

const envSource = fs.readFileSync(
  `.env.${process.env.NODE_ENV ?? 'production'}`
);
fs.writeFileSync(
  '.env.local',
  envSource + `NEXT_PUBLIC_BUILD_DATE=${new Date().toISOString()}`
);
