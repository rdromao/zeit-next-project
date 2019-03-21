import Head from 'next/head'
import { Navbar, NavbarBrand } from 'reactstrap'

const layoutStyle = {
  fontFamily: '"Nunito Sans", sans-serif',
  color: '#343434'
}

const Layout = props => (
  <div style={layoutStyle}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.0/css/bootstrap.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
    </Head>
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Quadminds Notes Test</NavbarBrand>
    </Navbar>
    {props.children}
  </div>
)

export default Layout