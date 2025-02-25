import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-black">백민종</h1>
      <p>
        동료들과 협력하며 도움을 주고받는 것을 좋아하고, 팀의 생산성을 높여 좋은
        성과를 만들어내는 데에 늘 관심을 가지고 있습니다.
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
      <p>
        개발하면서 겪은 경험을 간단한 메모부터 자세한 글까지 다양한 형태로
        기록하고 있습니다.
      </p>
    </div>
  );
};

export default HomePage;
