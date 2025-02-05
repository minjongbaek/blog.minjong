import type { Metadata } from "next";
import "@/styles/globals.css";
import GithubIcon from "@/assets/icons/github.svg";
import Link from "next/link";

const SITE_TITLE = "Blog.minjong";
const SITE_DESCRIPTION = "민종의 기록을 위한 블로그입니다.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="container mx-auto px-4 max-w-2xl min-h-screen py-4">
          <header className="sticky top-0 bg-white z-20 dark:bg-stone-900">
            <div className="py-3 flex justify-between items-center">
              <a
                href="/"
                className="font-semibold text-xl select-none hover:text-orange-500 transition-colors duration-300"
              >
                Blog.minjong
              </a>
              <div className="flex font-semibold items-center gap-3">
                <Link
                  href="/article"
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  작성한 글
                </Link>
                <Link
                  href="/note"
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  작성한 메모
                </Link>
                <Link href="https://github.com/minjongbaek" target="_blank">
                  <GithubIcon
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
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
