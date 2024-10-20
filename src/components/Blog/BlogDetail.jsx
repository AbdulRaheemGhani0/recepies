import React from 'react'
import { useParams } from 'react-router-dom'

function BlogDetail() {
    const {id} = useParams()
  return (
    <div>
      <h1>blog detail {id}</h1>
    </div>
  )
}

export default BlogDetail
