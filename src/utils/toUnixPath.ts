export const toUnixPath = ({ filePath }: { filePath: string; }) => {
	return filePath.replace(/\\/g, '/')
}