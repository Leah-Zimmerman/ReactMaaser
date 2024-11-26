import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {
    const [sources, setSources] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSource, setSelectedSource] = useState(null);
    const [amount, setAmount] = useState('');
    const nav = useNavigate();

    const getSources = async () => {
        const { data } = await axios.get('/api/money/getSources');
        setSources(data);
    };
    useEffect(() => {
        getSources();
    }, []);

    const addIncome=async()=>{
        await axios.post('/api/money/addIncome',{sourceId:selectedSource.id,amount:amount,date:selectedDate});
            //?sourceId=${selectedSource.id}&amount=${amount}&date=${dayjs(selectedDate).format('YYYY-MM-DD')}`);
        nav('/income');
    }
    
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name}
                value={selectedSource}
                onChange={(e,newValue)=>setSelectedSource(newValue)}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={()=>addIncome()}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
