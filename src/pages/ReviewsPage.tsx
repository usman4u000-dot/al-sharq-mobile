import React from 'react';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../components/Testimonials';

export default function ReviewsPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/reviews" />
        <title>Customer Reviews | Al Sharq Mobile Phone & Computer Trading LLC</title>
        <meta name="description" content="Read what our customers have to say about our mobile and computer repair services in Sharjah." />
      </Helmet>
      <Testimonials />
    </>
  );
}
