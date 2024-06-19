import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

interface DataPoint {
  DATA: string;
  FECHAMENTO: number;
}

const Tabela: React.FC = () => {
  const [rows, setRows] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchDados = async () => {
    try {
      const response = await axios.get<DataPoint[]>("http://localhost:5000/list");
      setRows(response.data);
      setLoading(false);
    } catch (err) {
      setError("Houve um erro ao buscar os dados.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "DATA",
      headerName: "Data",
      width: 300,
    },
    {
      field: "FECHAMENTO",
      headerName: "Fechamento",
      width: 300,
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tabela de Fechamento
      </Typography>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row: DataPoint) => row.DATA + row.FECHAMENTO}
            pageSizeOptions={[10, 20, 50]}
            paginationModel={{ pageSize, page: 0 }}
            onPaginationModelChange={(newModel) => setPageSize(newModel.pageSize)}
          />
        </div>
      )}
    </Container>
  );
};

export default Tabela;
