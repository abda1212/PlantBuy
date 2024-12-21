import React from 'react'

function Categories({title}) {
  return (
    <div className='category-container'>
    {/* <img /> */}
    <div className='category-body-container'>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </div>
  </div>
  )
}

export default Categories