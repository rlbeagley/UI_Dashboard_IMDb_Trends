import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function YearSelector({ value, onChange, min = 2000, max = 2026 }) {
  const { t } = useTranslation();
  return (
    <Form.Group className="d-flex align-items-center" style={{ gap: '10px' }}>
      <Form.Label style={{ color: '#B5A1BB', fontSize: '0.8rem', margin: 0, whiteSpace: 'nowrap' }}>
        {t('selectYear')}
      </Form.Label>
      <Form.Range
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ maxWidth: '200px' }}
      />
      <span style={{ color: 'white', fontWeight: 600, minWidth: '3ch' }}>{value}</span>
    </Form.Group>
  );
}