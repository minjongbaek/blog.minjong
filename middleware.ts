const previousUrls: { [index: string]: string } = {
  "/drag-and-drop-event": "20220826",
  "/imperative-and-declarative-programming": "20220913",
  "/how-browsers-work": "20220915",
  "/appearance-background-of-hoisting": "20220919",
  "/when-to-use-closures": "20221018",
  "/compare-map-and-object": "20221030",
  "/devcourse-5th-week-retrospect": "20221123",
  "/devcourse-middle-project-retrospect": "20230127",
  "/migrate-gatsby-to-astro": "20230130",
  "/devcourse-final-project-retrospect": "20230322",
  "/fetching-data-declartively": "20230419",
  "/image-optimization": "20230421",
};

export const config = {
  matcher: [
    "/drag-and-drop-event",
    "/imperative-and-declarative-programming",
    "/how-browsers-work",
    "/appearance-background-of-hoisting",
    "/when-to-use-closures",
    "/compare-map-and-object",
    "/devcourse-5th-week-retrospect",
    "/devcourse-middle-project-retrospect",
    "/migrate-gatsby-to-astro",
    "/devcourse-final-project-retrospect",
    "/fetching-data-declartively",
    "/image-optimization",
  ],
};

export default function middleware(request: Request): Response {
  const url = new URL(request.url);

  if (url.pathname in previousUrls) {
    url.pathname = `/post/${previousUrls[url.pathname]}-${url.pathname.slice(
      1
    )}`;
  }

  return Response.redirect(url);
}
