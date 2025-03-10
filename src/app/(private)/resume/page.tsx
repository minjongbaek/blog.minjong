import { getResumeContents } from "@/utils/content";

const Resume = async () => {
  const { default: Skills } = await import("@/contents/resume/skills.mdx");
  const careerContents = await getResumeContents("career");
  const projectContents = await getResumeContents("project");

  return (
    <div className="space-y">
      <div className="mb-6 space-y-4 border-b-2 border-slate-500 pb-6">
        <div className="space-y-4">
          <h1>백민종</h1>
          <div className="flex flex-col text-sm *:text-slate-700">
            <div>
              <span className="inline-block w-20">이메일</span>
              <a href="mailto:https://github.com/minjongbaek">
                minjongbaek@gmail.com
              </a>
            </div>
            <div>
              <span className="inline-block w-20">블로그</span>
              <a href="https://blog.minjong.dev">blog.minjong.dev</a>
            </div>
            <div>
              <span className="inline-block w-20">GitHub</span>
              <a href="https://github.com/minjongbaek">
                github.com/minjongbaek
              </a>
            </div>
          </div>
        </div>
        <p className="border-b pb-4">
          프론트엔드 개발자로서 사용자 경험(UX) 최적화와 성능 개선을 목표로 하고
          있습니다. 유지보수하기 쉬운 코드를 작성하는 것에 관심이 많으며, 새로운
          기술을 적극적으로 학습하고 동료들과 협업하며 최적의 해결책을 찾아가는
          과정을 중요하게 생각합니다.
        </p>
        <Skills />
      </div>
      <div className="mb-6 space-y-4 border-b-2 border-slate-500 pb-6">
        <h2>경력</h2>
        {careerContents.map(
          ({
            Content,
            metadata: {
              title,
              position,
              team,
              description,
              startDate,
              endDate,
            },
          }) => (
            <div
              key={title}
              className="space-y-4 border-b pb-4 last:mb-0 last:border-none last:pb-0"
            >
              <h3>{title}</h3>
              <div>
                <div>
                  {position} | {team}
                </div>
                <div>{getDuration(startDate, endDate)}</div>
              </div>
              <p className="font-semibold">{description}</p>
              <Content />
            </div>
          ),
        )}
      </div>
      <div className="mb-6 space-y-4 border-b-2 border-slate-500 pb-6">
        <h2>프로젝트</h2>
        {projectContents.map(
          ({
            Content,
            metadata: { title, team, description, startDate, endDate },
          }) => (
            <div
              key={title}
              className="space-y-4 border-b pb-4 last:mb-0 last:border-none last:pb-0"
            >
              <h3>{title}</h3>
              <div>
                <div>{team}</div>
                <div>
                  {startDate} ~ {endDate ?? "진행중"}
                </div>
              </div>
              <p className="font-semibold">{description}</p>
              <Content />
            </div>
          ),
        )}
      </div>
      <div className="mb-6 space-y-4 border-b-2 border-slate-500 pb-6">
        <h2>교육</h2>
        <div className="space-y-4 border-b pb-4 last:mb-0 last:border-none last:pb-0">
          <h3>동양미래대학교</h3>
          <div>
            <div>대학교(학사) | 정보통신공학과 (전공심화)</div>
            <div>2019.03 ~ 2020.02 | 졸업</div>
          </div>
        </div>
        <div className="space-y-4 border-b pb-4 last:mb-0 last:border-none last:pb-0">
          <h3>동양미래대학교</h3>
          <div>
            <div>대학교(전문학사) | 정보통신공학과</div>
            <div>2014.03 ~ 2019.02 | 졸업</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2>자격증</h2>
        <div className="space-y-4 border-b pb-4 last:mb-0 last:border-none last:pb-0">
          <h3>정보처리기사</h3>
          <div>
            <div>한국산업인력공단</div>
            <div>2019.11</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;

const getDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startYear = start.getFullYear();
  const startMonth = (start.getMonth() + 1).toString().padStart(2, "0");
  const endYear = endDate ? end.getFullYear() : "재직중";
  const endMonth = endDate
    ? (end.getMonth() + 1).toString().padStart(2, "0")
    : "";

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const durationString = [
    years ? `${years}년` : "",
    months ? `${months}개월` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `${startYear}.${startMonth} ~ ${endYear}${endMonth ? "." + endMonth : ""} (${durationString})`;
};
