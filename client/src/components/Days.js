export function Days({days}) {
  
  return(
    <div>
      <ul style={{listStyleType: 'none'}}>
        {days.map((day, index) => (
          <li key={index}>
            {day}
          </li>
        ))}
      </ul>

    </div>
  )
}