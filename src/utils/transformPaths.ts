import { existsSync, readFileSync, writeFileSync } from 'fs'
import { relative, dirname, resolve } from 'path'
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
	const { outDir, paths } = tsConfig.compilerOptions
	let content = readFileSync(file, 'utf-8')

	for (const alias in paths) {
		const aliasPattern = new RegExp(`require\\(['"](${alias.replace('*', '.*')})['"]\\)`, 'g')
		content = content.replace(aliasPattern, (match, p1) => {
			let resolvedAlias
			if (p1.includes('/')) {
				const prefix = p1.substring(0, p1.lastIndexOf('/'));
				const suffix = p1.substring(p1.lastIndexOf('/') + 1);
				resolvedAlias = paths[`${prefix}/*`][0].replace('*', suffix)
			} else {
				resolvedAlias = paths[p1 as keyof typeof paths][0]
			}
			let resolvedPath = resolve(process.cwd(), resolvedAlias)
			resolvedPath = toOutDirPath({ filePath: resolvedPath, outDir })
			resolvedPath = ensureExtension({ filePath: resolvedPath })
			if (existsSync(resolve(process.cwd(), file))) {
				const relPath = relative(dirname(file), resolvedPath)
				let filePath = toUnixPath({
					filePath: !relPath.startsWith('.') ? `.\\${relPath}` : relPath
				})
				return `require('${filePath}')`
			}
			return match
		})
	}

	writeFileSync(file, content, 'utf-8')
}