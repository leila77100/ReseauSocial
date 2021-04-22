import React from 'react';

export function Star({count, value, 
    inactiveColor='#ddd',
    size=40,
    activeColor='yellow', onChange, averageParent}) {

  // short trick 
  const stars = Array.from({length: count}, () => '🟊')

  // Internal handle change function
  const handleChange = (value, averagePost) => {
    onChange(value + 1);
    averageParent()
    console.log("test value", averagePost)
  }
 

  return (
    <div>
      {stars.map((star, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
          
        }
        return (
          <span className="star" 
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}
            > {star}</span>
        )
      })}
      {value}
    </div>
  )
}

