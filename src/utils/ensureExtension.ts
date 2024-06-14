export const ensureExtension = ({ filePath }: { filePath: string; }) => {
	const hasNoExtension = /^[^.]+$/.test(filePath);

	return (filePath.endsWith('.ts') && !filePath.includes('node_modules'))
		? filePath.replace(/\.ts$/, '.js')
		: hasNoExtension ? `${filePath}.js` : filePath
}