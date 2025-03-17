import { ContentType } from "@/types/content";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const BACKGROUND_IMAGE_PATH = join(
  process.cwd(),
  "public",
  "images",
  "empty-opengraph-image.png",
);

// Image generation
const OpengraphImage = async ({
  params,
}: {
  params: Promise<{ type: ContentType; slug: string }>;
}) => {
  const { type, slug } = await params;
  const { metadata } = await import(`@/contents/${type}/${slug}/index.mdx`);

  const backgroundImage = await readFile(BACKGROUND_IMAGE_PATH);
  // https://github.com/vercel/next.js/issues/75625#issuecomment-2632274206
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const src = Uint8Array.from(backgroundImage).buffer as any;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={src}
          alt={metadata.title}
          style={{ position: "absolute", top: 0, left: 0 }}
          width={1200}
          height={630}
        />
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            marginTop: "260px",
            textAlign: "center",
            wordBreak: "keep-all",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: "72px",
          }}
        >
          <div style={{ fontSize: 48 }}>{metadata.title}</div>
          <div style={{ fontSize: 24 }}>{metadata.description}</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
};

export default OpengraphImage;
