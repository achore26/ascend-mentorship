import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://ascendprogram.co.ke'
const SITE_NAME = 'Ascend Mentorship Program Kenya'
const DEFAULT_IMAGE = `${SITE_URL}/ascend-flyer.png`

export default function SEO({ title, description, path = '', image, noindex = false }) {
  const fullTitle = title ? `${title} | Ascend Mentorship Program Kenya` : 'Ascend Mentorship Program Kenya — Structured Career Mentorship Across Africa'
  const fullUrl = `${SITE_URL}${path}`
  const metaImage = image || DEFAULT_IMAGE

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="mentorship Kenya, mentorship program Kenya, career mentorship Africa, professional development Kenya, professional development academy Kenya, leadership academy Kenya, leadership development Kenya, mentorship for young professionals, career growth Kenya, Ascend mentorship, Ascend Programme Kenya, Ascend program Kenya, mentorship cohort Kenya, cohort 5 Kenya, career coaching Kenya, coaching circle Kenya, career building blocks Kenya, lead the talk series Kenya, business mentorship Nairobi, youth mentorship Africa, professional mentoring Kenya, career development Nairobi, structured mentorship program Africa, corporate training Kenya, mentorship for graduates Kenya, mentorship for students Kenya, Carolyne Mutambo, Ascend Mentorship Program Kenya" />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={metaImage} />

      {/* Geo targeting */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi, Kenya" />
      <meta name="language" content="English" />
    </Helmet>
  )
}
