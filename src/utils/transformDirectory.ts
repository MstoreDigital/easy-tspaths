import { readdirSync, statSync } from 'fs'
import { transformPaths } from './transformPaths'
import { join } from 'path'

export const transformDirectory = ({
  tsConfig
}: {
  tsConfig: {
    compilerOptions: {
      outDir: string;
      baseUrl: string;
      paths: {[key: string]: string[]}; 
    }
  };
}) => {
  const processDirectory = ({ directory }: { directory: string; }) => {
    const files = readdirSync(directory);
    
    files.forEach(file => {
      const fullPath = join(directory, file);
      if (statSync(fullPath).isDirectory()) {
        processDirectory({ directory: fullPath });
      } else if (fullPath.endsWith('.js')) {
        console.log(`> [easy-tspaths] Fixing imports of: ${fullPath}`)
        transformPaths({ file: fullPath, tsConfig });
      }
    });
  };

  processDirectory({ directory: tsConfig.compilerOptions.outDir });
}