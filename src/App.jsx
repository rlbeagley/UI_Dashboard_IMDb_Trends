import DashboardNavbar from "./components/DashboardNav";
import PieChartWithCustomizedLabel from "./components/GenreDistributionPieChart";
import RatingPerGenreBarChart from "./components/RatingPerGenreBarChart";
import InfoCard from "./components/InfoCard";
import { useParseData } from './utils/parseData';
import { getGenreDistributionPerYear, getAverageRatingPerGenre, getNumGenres, getAverageRatingAcrossAllMedia } from "./utils/dataManipulation";
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


// TODO: Add Cards (Most popular genre rn, ensure visually good spaced out)
// TODO: Add containers for graphs, add titles
// TODO: Add interactions
// TODO: Add more translations 
function App() {
  const { t } = useTranslation()
  const { rows, loading, error } = useParseData('/title.basics.ratings.csv');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="visually-hidden">Loading...</span>
        <Spinner animation="border" variant="light"/>
      </div>
    )
  }

  if (error) {
    return (
    <div>
      <Container className="mt-5">
        <Alert variant="danger">Failed to load data: {String(error)}</Alert>
      </Container>
    </div>);
  }

  // Get data for charts
  const pieChartData = getGenreDistributionPerYear(rows, 2026); // Defaults to current year
  const barChartData = getAverageRatingPerGenre(rows);
  const numGenres = getNumGenres(rows);
  const avgRatingOverall = getAverageRatingAcrossAllMedia(rows);

return (
  <>
    <DashboardNavbar />
    <Container
      fluid
      className="d-flex flex-column"
      style={{ height: '100vh', overflow: 'hidden', paddingTop: '1rem', paddingBottom: '1rem' }}
    >
      <Row className="flex-grow-1" style={{ minHeight: 0 }}>

        <Col md={6} className="d-flex flex-column">
          <Row className="flex-grow-1 mb-3" style={{ minHeight: 0 }}>
            <Col className="d-flex flex-column">
              <Card className="flex-grow-1 p-3" style={{ backgroundColor: '#3a2647', minHeight: 0 }}>
                <Card.Title style={{ color: 'white' }}>{t("ratingPerGenreTitle")}</Card.Title>
                <div className="flex-grow-1" style={{ minHeight: 0 }}>
                  <RatingPerGenreBarChart data={barChartData} />
                </div>
              </Card>
            </Col>
          </Row>
          {/* Card section, significantly smaller than chart for balance */}
          <Row style={{ height: '25%' }}>
            <Col xs={6} className="d-flex">
              <InfoCard
                header={t("totalGenresHeader")}
                value={numGenres.length}
                subtitle={t("dataAcknowledgement")}
                style={{ backgroundColor: '#3a2647', aspectRatio: '1', width: '100%' }}
              />
            </Col>
            <Col xs={6} className="d-flex">
              <InfoCard 
              header={t('totalAvgRatingHeader')}
              value={avgRatingOverall}
              subtitle={t("dataAcknowledgement")}
              style={{ backgroundColor: '#3a2647', aspectRatio: '1', width: '100%' }} 
              />
            </Col>
          </Row>
        </Col>

        {/* Pie chart, full height for balance*/}
        <Col md={6} className="d-flex flex-column">
          <Card className="flex-grow-1 p-3" style={{ backgroundColor: '#3a2647', minHeight: 0 }}>
            <Card.Title style={{ color: 'white' }}>{t("genreDistributionTitle")}</Card.Title>
            <PieChartWithCustomizedLabel data={pieChartData} />
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);
}

export default App
