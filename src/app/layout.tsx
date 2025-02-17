import GithubIcon from "@/assets/icons/github.svg";
import "@/styles/globals.css";
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
        <div className="container mx-auto min-h-screen max-w-2xl px-4 py-4">
          <header className="sticky top-0 z-20 bg-white dark:bg-stone-900">
            <div className="flex items-center justify-between py-3">
              <a
                href="/"
                className="select-none text-xl font-semibold transition-colors duration-300 hover:text-orange-500"
              >
                {SITE_TITLE}
              </a>
              <div className="flex items-center gap-3 font-semibold">
                <Link
                  href="/article"
                  className="transition-colors duration-300 hover:text-orange-500"
                >
                  작성한 글
                </Link>
                <Link
                  href="/note"
                  className="transition-colors duration-300 hover:text-orange-500"
                >
                  작성한 메모
                </Link>
                <Link href="https://github.com/minjongbaek" target="_blank">
                  <GithubIcon
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 transition-colors duration-300 hover:fill-orange-500 dark:fill-gray-300"
                  />
                </Link>
              </div>
            </div>
          </header>
          {children}
          <footer className="mt-2 text-sm text-gray-500">
            <div className="flex justify-center p-4">
              <a
                href="https://github.com/minjongbaek"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
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
