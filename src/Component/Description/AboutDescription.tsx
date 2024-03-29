import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const About = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            【仮】Database Infomation
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display database infomation.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            There will be filled in with DB name, IP, instances, number of tables.
          </Typography>
      </CardContent>
    </Card>

  );
}

export default About;