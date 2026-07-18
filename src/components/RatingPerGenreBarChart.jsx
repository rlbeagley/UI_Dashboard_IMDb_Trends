import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next'

const RatingPerGenreBarChart = (props) => {
  const { t } = useTranslation()
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={props.data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        interval={0}
        angle={-45}
        textAnchor="end"
        height={80}
        tick={{ fill: '#B5A1BB' }}
        label={{ value: t('Genre'), angle: 0, position: 'bottom', style: { fill: '#FFA94D' } }}
      />
      <YAxis
        width="auto"
        domain={[3, 10]}
        tick={{ fill: 'white' }}
        label={{ value: 'Rating (Out Of 10)', angle: -90, position: 'insideLeft', style: { fill: '#B5A1BB' } }}
      />
      <Tooltip formatter={(value, name, props) => [`${value.toFixed(2)} (n=${props.payload.count})`, t('avgRating')]} />
      <Bar dataKey="value" fill="#FFA94D" activeBar={{ fill: '#FFCA3A', stroke: '#FFA94D' }} radius={[10, 10, 0, 0]} barSize={40} />
    </BarChart>
  );
};
export default RatingPerGenreBarChart;