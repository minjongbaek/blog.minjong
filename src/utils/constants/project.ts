import { dadokProjectImage, digdigProjectImage, blogProjectImage } from "@assets/project";

export const PROJECTS = [
  {
    title: "다독다독",
    description: "책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼",
    tags: ["TypeScript", "Next.js", "React", "React-Query", "Chakra UI"],
    imageURL: dadokProjectImage,
    githubURL: "https://github.com/prgrms-web-devcourse/Team-Gaerval-Dadok-FE",
  },
  {
    title: "디그디그딥",
    description: "커뮤니케이션을 통한 학습을 제공하는 개발자 전용 플랫폼",
    tags: ["TypeScript", "React", "Recoil", "Styled-Components"],
    imageURL: digdigProjectImage,
    githubURL: "https://github.com/prgrms-fe-devcourse/FEDC3_DigDigDeep_Yuri",
  },
  {
    title: "Blog.minjong.codes",
    description: "기록을 위한 나만의 블로그",
    tags: ["TypeScript", "Astro", "Tailwind CSS"],
    imageURL: blogProjectImage,
    githubURL: "https://github.com/minjongbaek/blog.minjong",
  },
];
