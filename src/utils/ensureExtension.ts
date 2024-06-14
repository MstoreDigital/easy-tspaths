export const ensureExtension = ({ filePath }: { filePath: string; }) => {
	const hasNoExtension = /^[^.]+$/.test(filePath);
	if (!filePath.includes('node_modules')) {
		if (filePath.endsWith('.ts')) {
			return filePath.replace(/\.ts$/, '.js')
		} else if (hasNoExtension) {
			return `${filePath}.js`
		}
	}
	return filePath
}