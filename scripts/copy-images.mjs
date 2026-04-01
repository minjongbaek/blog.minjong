import fs from "fs";
import path from "path";
import sharp from "sharp";

const CONTENTS_DIRECTORY = path.join(process.cwd(), "src/contents");
const PUBLIC_CONTENT_IMAGES_DIRECTORY = path.join(
  process.cwd(),
  "public/images/content",
);

const MAX_WIDTH = 1344;
const WEBP_QUALITY = 80;

const optimizeImages = async () => {
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

  const tasks = [];

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
        contentDirectory,
      );

      const targetDirectory = path.join(
        PUBLIC_CONTENT_IMAGES_DIRECTORY,
        contentType,
        contentDirectory,
      );

      const imageFiles = fs
        .readdirSync(sourceDirectory)
        .filter((fileName) => /\.(png|gif)$/.test(fileName));

      imageFiles.forEach((imageFile) => {
        const sourcePath = path.join(sourceDirectory, imageFile);

        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory, { recursive: true });
        }

        const isGif = imageFile.endsWith(".gif");

        if (isGif) {
          tasks.push(
            fs.promises.copyFile(
              sourcePath,
              path.join(targetDirectory, imageFile),
            ),
          );
        } else {
          const webpFileName = imageFile.replace(/\.png$/, ".webp");
          const targetPath = path.join(targetDirectory, webpFileName);

          tasks.push(
            sharp(sourcePath)
              .resize({ width: MAX_WIDTH, withoutEnlargement: true })
              .webp({ quality: WEBP_QUALITY })
              .toFile(targetPath),
          );
        }
      });
    });
  });

  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected");

  if (failed.length > 0) {
    failed.forEach((r) => console.error(r.reason));
    process.exit(1);
  }

  console.log(`Optimized ${results.length} images.`);
};

optimizeImages();
