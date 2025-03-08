import { getResumeContents } from "@/utils/content";

const Resume = async () => {
  const careerContents = await getResumeContents("career");
  const projectContents = await getResumeContents("project");

  return (
    <div className="space-y">
      <div className="mb-4 space-y-4 border-b-2 border-slate-700 pb-4">
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

        <p>
          동료들과 협력하며 도움을 주고받는 것을 좋아하고, 팀의 생산성을 높여
          좋은 성과를 만들어내는 데에 늘 관심을 가지고 있습니다.
        </p>
        <p>
          특히 요즘에는 동료들과 유쾌하게 잡담하며 웃는 순간에 활력을 얻고, 일에
          몰입하며 의미 있는 결과를 만들어가는 과정에서 큰 만족을 느낍니다.
        </p>
        <p>
          백엔드 개발자로 커리어를 시작했지만, 복잡한 것을 단순하고 직관적으로
          만들어 사용자 경험을 향상시키는 프론트엔드 기술에 매력을 느껴 현재는
          프론트엔드 개발자로 커리어를 이어가고 있습니다.
        </p>
      </div>
      <div className="mb-4 space-y-4 border-b-2 border-slate-700 pb-4">
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
      <div className="mb-4 space-y-4 border-b-2 border-slate-700 pb-4">
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
      <div className="mb-4 space-y-4 border-b-2 border-slate-700 pb-4">
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
      <div className="mb-4 space-y-4">
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
