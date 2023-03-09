// import BubbleChart from "./BubbleChart";
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
      <div style={{
        height: '500px',
        width: '420px',
        margin: 'auto',
        border: '2px solid #000',
        borderTop: 'none',
        display: 'flex',
        alignItems: 'end',
      }}>
        <div style={{
          height: '480px',
          width: '420px',
          display: 'flex',
          padding: '8px',
          flexWrap: 'wrap-reverse',
          flexDirection: 'row',
          alignItems: 'end',
          justifyContent: 'center'
        }}>
          {data.map((ball, i) => {
            return <div
              key={i}
              style={{
                width: '36px',
                height: '36px',
                margin: '1px 2px',
                borderRadius: '50%',
                backgroundColor: ball.type === 'a' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
                position: 'relative',
                top: `${Math.round(Math.random() * 4) - 2}px`,
                bottom: `${Math.round(Math.random() * 4) - 2}px`,
                left: `${Math.round(Math.random() * 4) - 2}px`,
                right: `${Math.round(Math.random() * 4) - 2}px`,
              }}></div>
          })}
        </div>
      </div>

      {/* <BubbleChart data={JSON.parse(JSON.stringify(data))} height={450} width={600} /> */}
    </>
  );
}
