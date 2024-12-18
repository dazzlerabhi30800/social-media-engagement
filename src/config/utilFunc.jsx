export const checkFiles = (files) => {
  let newFiles = [...files];
  let videoFiles = newFiles.filter((file) => file.type.includes("video/"));
  return videoFiles.length > 1 ? false : true;
};
