import { Navbar, Container, Button, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function DashboardNavbar() {
  const { t, i18n } = useTranslation()

  const switchTo = (lng) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand>{t('appTitle')}</Navbar.Brand>
        <ButtonGroup>
          <Button
            variant={i18n.language === 'en' ? 'light' : 'outline-light'}
            size="sm"
            onClick={() => switchTo('en')}
          >
            EN
          </Button>
          <Button
            variant={i18n.language === 'fr' ? 'light' : 'outline-light'}
            size="sm"
            onClick={() => switchTo('fr')}
          >
            FR
          </Button>
        </ButtonGroup>
      </Container>
    </Navbar>
  )
}