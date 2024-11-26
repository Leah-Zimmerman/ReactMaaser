import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {

  const [totalIncome,setTotalIncome] = useState(0);
  const [totalMaaser,setTotalMaaser] = useState(0);

  useEffect(() => {
    const getTotalIncome = async()=>{
      const {data} = await axios.get('/api/income/getTotalIncome');
      setTotalIncome(data.totalIncome);
    }
    const getTotalMaaser = async()=>{
      const {data} = await axios.get('/api/maaser/getTotalMaaser');
      setTotalMaaser(data.totalMaaser);
    }
    getTotalIncome();
    getTotalMaaser();
  },[])

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income: ${totalIncome.toFixed(2)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: ${totalMaaser.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: ${(totalIncome*.10).toFixed(2)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation: ${Math.max(0,((totalIncome*.10)-(totalMaaser))).toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
