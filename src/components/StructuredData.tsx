import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'LocalBusiness' | 'FAQPage' | 'Article';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrg)}
      </script>
    </Helmet>
  );
}
