import { readFileSync, writeFileSync } from 'fs'
import { relative, dirname } from 'path'
import { createMatchPath } from 'tsconfig-paths'
import { toOutDirPath } from "./toOutDirPath"
import { toUnixPath } from "./toUnixPath"
import { ensureExtension } from './ensureExtension'


export const transformPaths = ({
  file, tsConfig
}: {
  file: string;
  tsConfig: {
    compilerOptions: {
      outDir: string;
      baseUrl: string;
      paths: {[key: string]: string[]}; 
    }
  };
}) => {
	const { outDir, baseUrl, paths } = tsConfig.compilerOptions
  const matchPath = createMatchPath(baseUrl, paths)
	let content = readFileSync(file, 'utf-8')

	for (const alias in paths) {
		const aliasPattern = new RegExp(`require\\(['"](${alias.replace('*', '.*')})['"]\\)`, 'g')
		content = content.replace(aliasPattern, (match, p1) => {
			const resolvedPath = matchPath(p1, undefined, undefined, ['.js'])
			if (resolvedPath) {
				let filePath = toUnixPath({ filePath: relative(dirname(file), resolvedPath) })
				filePath = toOutDirPath({ filePath, outDir })
				filePath = ensureExtension({ filePath })
				return `require('${filePath}')`
			}
			return match
		})
	}

	writeFileSync(file, content, 'utf-8')
}