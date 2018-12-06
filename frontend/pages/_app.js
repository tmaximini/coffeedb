import App, { Container } from 'next/app'
import Page from '../components/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    // this exposes the query to the user
    pageProps.query = ctx.query

    // returning anything in next.js from getInitialProps will expose it to this.props in render()
    // getInitialProps is always executed before first render of component
    return { pageProps }
  }

  render() {
    const { Component, apollo, pageProps } = this.props

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
