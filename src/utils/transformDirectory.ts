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
  const directory = tsConfig.compilerOptions.outDir
	readdirSync(directory).forEach(file => {
		const fullPath = join(directory, file)
		if (statSync(fullPath).isDirectory()) {
			transformDirectory({ tsConfig })
		} else if (fullPath.endsWith('.js')) {
			transformPaths({ file, tsConfig })
		}
	})
}