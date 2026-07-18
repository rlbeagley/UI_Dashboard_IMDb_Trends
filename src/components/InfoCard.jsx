import { useTranslation } from 'react-i18next'
import { Card } from 'react-bootstrap'


// Style this later
export default function InfoCard({header, value, subtitle}) {
    return(
        <Card>
            <Card.Body>
                <Card.Subtitle>{title}</Card.Subtitle>
                <Card.Title as="h2">{value}</Card.Title>
                <Card.Text>{subtitle}</Card.Text>
            </Card.Body>
        </Card>

    );
}
