import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

// const maaserPayments = [
//     { id: 1, recipient: 'Charity A', amount: 500, date: '2023-06-10' },
//     { id: 2, recipient: 'Charity B', amount: 30, date: '2023-06-09' }
// ];

const MaaserPage = () => {

  const [maaserTransactions,setMaaserTransactions] = useState([]);

  const getMaaserTransactions = async()=>{
    const {data} = await axios.get('/api/maaser/getMaaserTransactions');
    setMaaserTransactions(data);
  }
  useEffect(() => {
    getMaaserTransactions();
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maaserTransactions.map((mt) => (
              <TableRow key={mt.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {mt.recipient}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>${mt.amount}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(mt.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
