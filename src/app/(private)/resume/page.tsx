import { getResumeContents } from "@/utils/content";

const Resume = async () => {
  const careerContents = await getResumeContents("career");

  return (
    <div className="space-y">
      <div className="mb-4 space-y-4 border-b-2 border-slate-700 pb-4">
        <h1>백민종</h1>
        <span>프론트엔드 개발자</span>
        <div className="flex flex-col text-sm *:text-slate-700">
          <div>
            <span className="inline-block w-16">이메일</span>
            <a href="mailto:https://github.com/minjongbaek">
              minjongbaek@gmail.com
            </a>
          </div>
          <div>
            <span className="inline-block w-16">GitHub</span>
            <a href="https://github.com/minjongbaek">github.com/minjongbaek</a>
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
            CareerContent,
            metadata: {
              title,
              position,
              team,
              description,
              employmentStartDate,
              employmentEndDate,
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
                <div>
                  {getEmploymentDuration(
                    employmentStartDate,
                    employmentEndDate,
                  )}
                </div>
              </div>
              <p className="text-lg font-semibold">{description}</p>
              <CareerContent />
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Resume;

const getEmploymentDuration = (startDate: string, endDate?: string) => {
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
