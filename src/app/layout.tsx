import "@/styles/app.css";
import type { Metadata } from "next";
import Link from "next/link";

const SITE_TITLE = "Blog.minjong";
const SITE_DESCRIPTION = "민종의 기록을 위한 블로그입니다.";
const OPEN_GRAPH_IMAGE = "/open-graph-image.png";
const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://blog.minjong.dev"
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OPEN_GRAPH_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container mx-auto flex min-h-screen max-w-2xl flex-col px-4 pt-8">
          <header className="mb-8">
            <div className="flex items-baseline justify-between">
              <Link
                className="text-xl font-semibold text-black dark:text-white"
                href="/"
              >
                Blog.minjong
              </Link>
              <div className="flex gap-4">
                <Link href={"/article"}>글</Link>
                <Link href={"/note"}>메모</Link>
              </div>
            </div>
          </header>
          <main className="grow">{children}</main>
          <footer className="p-8">
            <div className="flex justify-center">
              <a
                href="https://github.com/minjongbaek"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-500 hover:underline dark:text-stone-300"
              >
                &copy; minjongbaek
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
