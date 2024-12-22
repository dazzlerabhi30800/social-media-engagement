import Compressor from "compressorjs";

export const checkFiles = (files) => {
  let newFiles = [...files];
  let videoFiles = newFiles.filter((file) => file.type.includes("video/"));
  return videoFiles.length > 1
    ? false
    : videoFiles.length === 1 && files.length > 1
    ? false
    : true;
};

export async function compressFile(file, width) {
  return await new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      maxWidth: width ? width : 500,
      success: (result) => {
        // console.log(`file:`);
        // console.log(file);
        // console.log(`result:`);
        // console.log(result);
        resolve(result);
      },
      error(err) {
        console.log(err.message);
        reject(err);
      },
    });
  });
}
