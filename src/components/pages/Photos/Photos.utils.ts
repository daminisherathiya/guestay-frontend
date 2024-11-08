export const urlToFile = async (
  url: string,
  filename: string,
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();

  const extension = filename.split(".").pop()?.toLowerCase();
  const mimeType = getMimeTypeFromExtension(extension);

  return new File([blob], filename, { type: mimeType || blob.type });
};

function getMimeTypeFromExtension(extension?: string): string | undefined {
  const mimeTypes: { [key: string]: string } = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
  };
  return extension ? mimeTypes[extension] : undefined;
}
