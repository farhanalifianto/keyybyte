"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

type Props = {
  used: any;
};
const TotalStorage = (props: Props) => {
  const { used } = props;
  return (
    <div>
      <Progress value={calculatePercentage(used)} />
    </div>
  );
};

export default TotalStorage;
