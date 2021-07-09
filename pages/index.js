import Head from 'next/head'

const Home = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>
      <meta name="description" content="url shortener online" />
      <meta name="keywords" content="url shortener shrink" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="EN"></meta>
      <title>url shortener</title>
    </Head>
  )
}

export default Home
