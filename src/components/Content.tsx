"use client";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

interface Props {
  recordMap: ExtendedRecordMap;
}

const Content = ({ recordMap }: Props) => {
  return <NotionRenderer recordMap={recordMap} fullPage={true} />;
};

export default Content;
