import React, { useEffect, useState } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';

// const incomes = [
//   { id: 1, source: 'Job', amount: 5000, date: '2023-06-13' },
//   { id: 2, source: 'Gift', amount: 300, date: '2023-06-11' },
//   { id: 3, source: 'Job', amount: 2500, date: '2023-06-11' },
//   { id: 4, source: 'Investments', amount: 1000, date: '2023-06-10' }
// ]

// const groupedIncomes = [
//   {
//     source: "Job",
//     incomes:
//       [
//         { id: 1, source: "Job", amount: 5000, date: "2023-06-13" },
//         { id: 3, source: "Job", amount: 2500, date: "2023-06-11" }
//       ]
//   },
//   {
//     source: "Gift",
//     incomes:
//       [
//         { id: 2, source: "Gift", amount: 300, date: "2023-06-11" }
//       ]
//   },
//   {
//     source: "Investments",
//     incomes:
//       [
//         { id: 4, source: "Investments", amount: 1000, date: "2023-06-10" }
//       ]
//   }
// ]

const IncomePage = () => {

  const [groupBySource, setGroupBySource] = useState(false);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [groupedIncomeTransactions, setGroupedIncomeTransactions] = useState([]);

  const getIncomeTransactions = async () => {
    const { data } = await axios.get('/api/money/getIncomeTransactions');
    setIncomeTransactions(data);
  }

  const getIncomeTransactionsGroupedBySource = async () => {
    const { data } = await axios.get('/api/money/getGroupedIncomeTransactions');
    setGroupedIncomeTransactions(data);
  }

  useEffect(() => {
    getIncomeTransactions();
    getIncomeTransactionsGroupedBySource();
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomeTransactions.map((it) => (
                <TableRow key={it.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {it.source.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${it.amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(it.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        groupedIncomeTransactions.map(({ source, incomes }) => (
          <Box key={source.id} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {source.name}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                        <Typography variant="body1" color="text.secondary">
                          No income transactions found for {source.name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    incomes.map((income) => (
                      <TableRow key={income.id}>
                        <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                          {income.source.name}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount.toFixed(2)}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '18px' }}>{new Date(income.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
