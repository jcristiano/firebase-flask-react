import React from 'react';
import { Container, Grid } from '@mui/material';
import { Grafico, Tabela } from '../../components';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grafico />
        </Grid>
        <Grid item xs={12} md={6}>
          <Tabela />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
