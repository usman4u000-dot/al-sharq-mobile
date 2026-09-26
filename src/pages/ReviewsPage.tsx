import React from 'react';
import { Helmet } from 'react-helmet-async';
import Testimonials from '../components/Testimonials';
import ClientTestimonialShowcase from '../components/ClientTestimonialShowcase';

export default function ReviewsPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://allsharq.com/reviews" />
        <title>Customer Reviews & Flagship Testimonials | Al Sharq Mobile Phone & Computer Trading LLC</title>
        <meta name="description" content="Verified Google Maps reviews for iPhone 18, 16, Samsung Galaxy S26 and MacBook repairs in Muwaileh, Sharjah. Over 487 five-star customer ratings." />
      </Helmet>
      <Testimonials />
      <ClientTestimonialShowcase />
    </>
  );
}
