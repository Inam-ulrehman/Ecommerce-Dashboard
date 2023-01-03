import React from 'react'
import { AllAboutUs, UploadAboutUs, UploadImage } from './aboutComponent'

const ContentAboutUs = () => {
  return (
    <div>
      <UploadImage />
      <UploadAboutUs />
      <AllAboutUs />
    </div>
  )
}

export default ContentAboutUs
