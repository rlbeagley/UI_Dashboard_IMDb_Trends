import DashboardNavbar from "./components/DashboardNav";
import PieChartWithCustomizedLabel from "./components/GenreDistributionPieChart";
import RatingPerGenreBarChart from "./components/RatingPerGenreBarChart";
import { useParseData } from './utils/parseData';
import { getGenreDistributionPerYear, getAverageRatingPerGenre } from "./utils/dataManipulation";
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

  return (
    <>
      <DashboardNavbar/>
      <PieChartWithCustomizedLabel data={pieChartData}/>
      <RatingPerGenreBarChart data={barChartData} />
    </>
  )
}

export default App
