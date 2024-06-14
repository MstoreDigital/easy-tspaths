const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'lib/cjs/index.js'),
  path.join(__dirname, 'lib/esm/index.mjs')
];

const shebang = '#!/usr/bin/env node\n';

files.forEach((file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erro ao ler o arquivo ${file}:`, err);
      process.exit(1);
    }

    if (!data.startsWith(shebang)) {
      const newData = shebang + data;
      fs.writeFile(file, newData, 'utf8', (err) => {
        if (err) {
          console.error(`Erro ao escrever no arquivo ${file}:`, err);
          process.exit(1);
        }
        fs.chmod(file, 0o755, (err) => {
          if (err) {
            console.error(`Erro ao modificar permissões do arquivo ${file}:`, err);
            process.exit(1);
          }
          console.log(`Shebang adicionada e permissões ajustadas para ${file}`);
        });
      });
    } else {
      console.log(`Shebang já está presente em ${file}`);
    }
  });
});
