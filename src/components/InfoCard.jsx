import { useTranslation } from 'react-i18next'
import { Card } from 'react-bootstrap'


// Style this later
export default function InfoCard({ header, value, subtitle, icon }) {
  return (
    <Card
      style={{
        backgroundColor: '#3a2647',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
        {icon && <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', opacity: 0.8 }}>{icon}</div>}
        <Card.Subtitle
          style={{
            color: '#B5A1BB',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.2rem',
          }}
        >
          {header}
        </Card.Subtitle>
        <Card.Title
          as="h2"
          style={{
            color: '#FFA94D',
            fontWeight: 700,
            fontSize: '2.5rem',
            marginBottom: '0.2rem',
            lineHeight: 1,
          }}
        >
          {value}
        </Card.Title>
        <Card.Text style={{ color: '#8B7A93', fontSize: '0.8rem', marginBottom: 0 }}>
          {subtitle}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}