import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Days({days}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return(
    <div>
      {/* <ul style={{listStyleType: 'none'}}>
        {days.map((day, index) => (
          <li key={index}>
            {day}
          </li>
        ))}
      </ul> */}
      {days.map((day, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {day}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      )).sort((a,b) => a-b)}
    </div>
  )
}