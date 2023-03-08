import BubbleChart from "./BubbleChart";
import * as _ from "lodash";
import { useEffect, useState } from "react";

export default function Jar({ ballAQty, totalQty }) {
  const getData = () => _.shuffle([
    ...Array.from({ length: ballAQty }).fill({
      rad: 0.2,
      type: 'a',
    }),
    ...Array.from({ length: totalQty - ballAQty }).fill({
      rad: 0.2,
      type: 'b',
    }),
  ]);

  const [data, setData] = useState(getData());

  useEffect(() => {
    setData(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ballAQty])

  return (
    <>
      <BubbleChart data={JSON.parse(JSON.stringify(data))} height={500} width={700} />
    </>
  );
}
