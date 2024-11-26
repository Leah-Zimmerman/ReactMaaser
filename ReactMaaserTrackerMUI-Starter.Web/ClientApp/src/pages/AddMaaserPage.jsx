import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const AddMaaserPage =() => {
    const [recipient, setRecipient] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const nav = useNavigate();

    const addMaaser=async()=>{
        await axios.post('/api/maaser/addMaaser', {recipient, amount, date:selectedDate});
        nav('/maaser');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" variant="outlined" fullWidth margin="normal" value={recipient} onChange={e=>setRecipient(e.target.value)}/>
            <TextField label="Amount" variant="outlined" fullWidth margin="normal" value={amount} onChange={e=>setAmount(e.target.value)}/>
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                fullWidth
                margin='normal'
                variant='outlined'
                // renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={()=>addMaaser()}>Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
