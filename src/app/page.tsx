import ContentCard from "@/components/ContentCard";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/constatns/Project";
import { getPages } from "@/notion";

const HomePage = async () => {
  const posts = await getPages({ type: "post" });
  const notes = await getPages({ type: "note" });

  return (
    <div className="space-y-8 mt-4 leading-6 w-full">
      <hr />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          안녕하세요, 저는 <span className="text-orange-500">백민종</span>
          이에요. 👋
        </h1>
        <p>
          동료와 도움을 주고 받는 것을 좋아해요. 제 도움으로 인해 팀의 생산성이
          향샹되거나 좋은 성과를 만들어 냈을 때 큰 성취감을 느껴요.
        </p>
        <p>
          사용자와 서비스를 연결하기 위한 모든 것을 구현하는 프론트엔드 개발에
          매력을 느껴 프론트엔드 개발을 시작했어요.
        </p>
      </div>
      <hr />
      <div>
        <h2 className="py-2 text-lg font-semibold">최근 작성한 메모</h2>
        <div className="flex flex-col gap-y-6">
          {notes.map((note) => (
            <ContentCard key={note.id} {...note} />
          ))}
        </div>
      </div>
      <hr />
      <div>
        <h2 className="py-2 text-lg font-semibold">최근 작성한 글</h2>
        <div className="flex flex-col gap-y-6">
          {posts.map((post) => (
            <ContentCard key={post.id} {...post} />
          ))}
        </div>
      </div>
      <hr />
      <div>
        <h2 className="py-2 text-lg font-semibold">프로젝트</h2>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
