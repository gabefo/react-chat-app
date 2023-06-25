import Head from 'next/head'

interface TitleAndMetaTagsProps {
  title?: string
}

export default function TitleAndMetaTags({ title = 'Messenger' }: TitleAndMetaTagsProps) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
