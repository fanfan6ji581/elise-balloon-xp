// import Navigation from './Navigation'
// import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <h1> I m admin header </h1>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout