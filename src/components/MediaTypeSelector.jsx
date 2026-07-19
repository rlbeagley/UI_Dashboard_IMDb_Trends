import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MEDIA_TYPES = [
  'movie',
  'short',
  'tvSeries',
  'tvEpisode',
  'tvMovie',
  'tvMiniSeries',
  'tvSpecial',
  'tvShort',
  'video',
  'videoGame',
];

export default function MediaTypeSelector({ value, onChange }) {
    const { t } = useTranslation();
    return (
        <Form.Group style={{ maxWidth: '200px' }}>
        <Form.Label style={{ color: 'white', fontSize: '0.85rem' }}>
            {t('selectMediaType')}
        </Form.Label>
        <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
            {MEDIA_TYPES.map(type => (
            <option key={type} value={type}>{t(type)}</option>
            ))}
        </Form.Select>
        </Form.Group>
    );
}