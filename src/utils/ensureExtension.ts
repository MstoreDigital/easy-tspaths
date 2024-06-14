export const ensureExtension = ({ filePath }: { filePath: string; }) => {
	return filePath.endsWith('.ts') && !filePath.includes('node_modules')
		? filePath.replace(/\.ts$/, '.js')
		: filePath
}