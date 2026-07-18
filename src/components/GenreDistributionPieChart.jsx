import { useTranslation } from 'react-i18next';
import {
  Pie,
  PieChart,
  Sector,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from 'recharts';


// #endregion
const RADIAN = Math.PI / 180;
const COLORS = [
  '#FF6B6B',
  '#FF8C5A',
  '#FFA94D',
  '#FFCA3A',
  '#E9E24D',
  '#B0DB43',
  '#6BCB77',
  '#4DCCAB',
  '#38B6D9',
  '#4D96FF',
  '#6C7CE0',
  '#8464E0',
  '#A45DE0',
  '#C45DD9', 
  '#E05DC4', 
  '#F2588C',
];


// TODO: figure out how to implement translation with these labels 
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;

  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  if ((percent ?? 0) < 0.02) return null; // hide only the truly tiny slices

  const ncx = Number(cx);
  const ncy = Number(cy);
  const isSmall = (percent ?? 0) < 0.08;

  if (isSmall) {
    // Leader line for small slices
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const sx = ncx + outerRadius * cos;         // point right at the slice edge
    const sy = ncy + outerRadius * sin;
    const mx = ncx + (outerRadius + 20) * cos;  // a bit further out (elbow point)
    const my = ncy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 20;   // horizontal segment out to the label
    const ey = my;
    const anchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="white" fill="none" />
        <text x={ex + (cos >= 0 ? 4 : -4)} y={ey} fill="white" textAnchor={anchor} dominantBaseline="central">
          {`${name} ${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  }

  // Inside-slice label for bigger slices (unchanged from before)
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = ncx + radius * Math.cos(-midAngle * RADIAN);
  const y = ncy + radius * Math.sin(-midAngle * RADIAN);
  const anchor = x > ncx ? 'start' : 'end';

  return (
    <g>
      <text x={x+6} y={y+1} dy="0em" fill="white" textAnchor={anchor} dominantBaseline="central">
        {name}
      </text>
      <text x={x} y={y} dy="1em" fill="white" textAnchor={anchor} dominantBaseline="central">
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  let fillOpacity;
  if (isAnyPieActive && !isThisPieActive) {
    fillOpacity = 0.5;
  } else {
    fillOpacity = 1;
  }
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

export default function PieChartWithCustomizedLabel({ data, isAnimationActive = true }) {
  return (
    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
      />
    </PieChart>
  );
}