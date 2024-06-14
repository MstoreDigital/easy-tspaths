export const toOutDirPath = ({ filePath, outDir }: { filePath: string; outDir: string; }) => {
	return filePath.replace('src', outDir)
}
