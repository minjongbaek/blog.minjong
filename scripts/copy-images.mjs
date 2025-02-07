import fs from "fs";
import path from "path";

const CONTENTS_DIRECTORY = path.join(process.cwd(), "src/contents");
const PUBLIC_CONTENT_IMAGES_DIRECTORY = path.join(
  process.cwd(),
  "public/images/content"
);

const copyImages = () => {
  const nodes = fs.readdirSync(CONTENTS_DIRECTORY, { withFileTypes: true });
  const contentTypes = nodes
    .filter((node) => node.isDirectory())
    .map((node) => node.name);

  if (fs.existsSync(PUBLIC_CONTENT_IMAGES_DIRECTORY)) {
    fs.rmSync(PUBLIC_CONTENT_IMAGES_DIRECTORY, {
      recursive: true,
      force: true,
    });
  }

  fs.mkdirSync(PUBLIC_CONTENT_IMAGES_DIRECTORY, { recursive: true });

  contentTypes.forEach((contentType) => {
    const contentDirectories = fs
      .readdirSync(path.join(CONTENTS_DIRECTORY, contentType), {
        withFileTypes: true,
      })
      .filter((node) => node.isDirectory())
      .map((node) => node.name);

    contentDirectories.forEach((contentDirectory) => {
      const sourceDirectory = path.join(
        CONTENTS_DIRECTORY,
        contentType,
        contentDirectory
      );

      const targetDirectory = path.join(
        PUBLIC_CONTENT_IMAGES_DIRECTORY,
        contentType,
        contentDirectory
      );

      const imageFiles = fs
        .readdirSync(sourceDirectory)
        .filter((fileName) => /.(png|gif)$/.test(fileName));

      imageFiles.forEach((imageFile) => {
        const sourcePath = path.join(sourceDirectory, imageFile);
        const targetPath = path.join(targetDirectory, imageFile);

        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory, { recursive: true });
        }

        fs.copyFile(sourcePath, targetPath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  });
};

copyImages();
