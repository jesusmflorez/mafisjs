import React from 'react'

function ActivoCard(props) {
    const {activo} = props
  return (
    <div>
      <h3>{activo.nombreActivo}</h3>
      <p>{activo.ubicacion}</p>
    </div>
  )
}

export default ActivoCard
