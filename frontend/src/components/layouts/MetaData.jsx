import React from 'react'
import { Helmet } from 'react-helmet-async';

function MetaData({ title, description, keywords }) {
  return (
    <div>
      <Helmet>
        <title>{` ${title} - MERN e-commerce`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  )
}

export default MetaData
