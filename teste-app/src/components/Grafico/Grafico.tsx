import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

interface IDataInfo {
    DATA: string;
    FECHAMENTO: number;
}

const Grafico : React.FC = () => {
    const [ data, setData ] = useState<IDataInfo[]>([]);

    const fetchDados = async () => {
        try {
            const response = await axios.get<IDataInfo[]>("http://localhost:5000/list");
            const transformedData = response.data.map(item => ({
                ...item,
                DATA: new Date(item.DATA.split('/').reverse().join('-')).toLocaleDateString('pt-BR'),
            })).sort((a, b) => new Date(a.DATA).getTime() - new Date(b.DATA).getTime());
            setData(transformedData);
        } catch(error){
            console.error("Ocorreu um erro de request:", error);
        }
    }

    useEffect( () => {
        fetchDados();
    }, []);

    return(
        <Container>
        <Typography variant="h4" gutterBottom>
          Gráfico de Fechamento
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="DATA" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="FECHAMENTO" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Container>
    )
}

export default Grafico;