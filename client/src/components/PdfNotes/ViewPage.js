import React from 'react'
import { useParams } from 'react-router-dom'
import PdfViewer from './PdfViewer'

function ViewPage() {
    const { id } = useParams();
  return (
    <div className='viewpage'>
      <PdfViewer id={id} />
    </div>
  )
}

export default ViewPage
