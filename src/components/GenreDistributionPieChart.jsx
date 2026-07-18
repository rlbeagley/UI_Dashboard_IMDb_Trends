import { useTranslation } from 'react-i18next';
import {
  Pie,
  PieChart,
  Sector,
  Tooltip,
  Legend,
  useActiveTooltipDataPoints,
  useIsTooltipActive,
} from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = [
  '#FF6B6B', '#FF8C5A', '#FFA94D', '#FFCA3A', '#E9E24D', '#B0DB43',
  '#6BCB77', '#4DCCAB', '#38B6D9', '#4D96FF', '#6C7CE0', '#8464E0',
  '#A45DE0', '#C45DD9', '#E05DC4', '#F2588C',
];

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  if ((percent ?? 0) < 0.02) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props) => {
  const p = useActiveTooltipDataPoints();
  const isAnyPieActive = useIsTooltipActive();
  const isThisPieActive = isAnyPieActive && props.payload === p?.[0];
  const fillOpacity = isAnyPieActive && !isThisPieActive ? 0.5 : 1;
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      fillOpacity={fillOpacity}
      style={{ transition: 'fill-opacity 0.3s ease' }}
    />
  );
};

const CustomTooltip = ({ active, payload }) => {
  const { t } = useTranslation();
  if (!active || !payload?.length) return null;
  const { name, value, percent } = payload[0].payload;
  return (
    <div
      style={{
        backgroundColor: '#3a2647',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        padding: '8px 12px',
        color: 'white',
      }}
    >
      <strong>{t(name)}</strong>
      <div style={{ color: '#B5A1BB', fontSize: '0.85rem' }}>
        {value} {t("titlesLabel")} {percent != null ? `(${(percent * 100).toFixed(0)}%)` : ''}
      </div>
    </div>
  );
};

const CustomLegend = ({ data }) => {
  const { t } = useTranslation();
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 10px' }}>
      {data.map((entry, index) => (
        <li key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '2px',
              backgroundColor: COLORS[index % COLORS.length],
              marginRight: '6px',
            }}
          />
          <span style={{ color: 'white', fontSize: '1.2rem' }}>{t(entry.name)}</span>
        </li>
      ))}
    </ul>
  );
};

export default function PieChartWithCustomizedLabel({ data, isAnimationActive = true }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '650px' }}>
      <PieChart width={400} height={400} style={{ flex: 1, aspectRatio: 1 }} responsive>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          isAnimationActive={isAnimationActive}
          shape={MyCustomPie}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
      <CustomLegend data={data} />
    </div>
  );
}