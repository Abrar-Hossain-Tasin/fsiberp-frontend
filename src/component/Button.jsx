import React from 'react'

const Button = ({color,onClick,text,bgcolor,className}) => {
  return (
    <>
        <button onClick={onClick} bgcolor={bgcolor} color={color} className={className}> {text} </button>
    </>
  )
}

export default Button
