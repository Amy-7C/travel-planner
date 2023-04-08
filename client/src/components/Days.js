import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export function Days({days}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteDay = () => {
    console.log("delete")
  }

  return(
    <div style={{marginTop: '20px', width: '60%'}}>
      {days.map((day, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{display: 'flex', width: '25%'}}>
                <Typography sx={{ width: '33%', flexShrink: 0}}>
                  Day {index + 1}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{dayjs(day.date).format('M/D/YY ddd')}</Typography>
              </div>
              <Typography sx={{ color: 'text.secondary' }}><DeleteIcon /></Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Button variant="outlined" type="submit" value="submit" onClick={deleteDay}>
                Add Location
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}