import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'
import "../../App.css"
const columns: GridColDef[] = [
  { field: 'document_user_id', headerName: 'Document Id', width: 150 },
  {
    field: 'razaoSocial',
    headerName: 'Razão Social',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'fantasyName',
    headerName: 'Nome Fantasia',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'cnpj',
    headerName: 'CNPJ',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'cellPhone',
    headerName: 'Celular',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'cep',
    headerName: 'Cep',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'logradouro',
    headerName: 'Logradouro',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'bairro',
    headerName: 'Bairro',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'cidade',
    headerName: 'Cidade',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'latitude',
    headerName: 'Latitude',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'longitude',
    headerName: 'Longitude',
    width: 150,
    editable: true,
    headerClassName: 'bold-header',
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 160,
    headerClassName: 'bold-header',
  }
]

export default function PharmacyList () {
  const [rows, setRows] = useState([]);

  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("pharmacyData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const dataArray = Object.values(parsedData);

      const rowsWithIds = dataArray.map((entry, index) => {
        const address = entry.address || {};
        const geolocation = entry.geolocation || {};

        return {
          ...entry,
          document_user_id: entry.document_user_id || `temp-id-${index}`,
          logradouro: address.logradouro || "",
          bairro: address.bairro || "",
          cidade: address.cidade || "",
          estado: address.estado || "",
          latitude: geolocation.latitude || "", // Adiciona a latitude
          longitude: geolocation.longitude || "", // Adiciona a longitude
        };
      });

      setRows(rowsWithIds);
    } else {
      setRows([]);
    }
  };

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, []);

  var handleDelete = (params: GridValueGetterParams) => {
    const rowId = params.row.document_user_id;
    const storedData = localStorage.getItem("pharmacyData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const newData = { ...parsedData };
      
  

      console.log(rowId);
      delete newData[rowId];
  
      localStorage.setItem("pharmacyData", JSON.stringify(newData));
      toast.success("Pharmacy deleted from localStorage", {
        // ... toast configurations ...
      });
  
      fetchDataFromLocalStorage(); // Fetch updated data after deletion
    } else {
      toast.error("Pharmacy not found in localStorage", {
        // ... toast configurations ...
      });
    }
  };


  return (
    <>
      <ToastContainer />

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns.map(column => {
            if (column.field === 'action') {
              return {
                ...column,
              renderCell: (params: GridValueGetterParams) => (
                <DeleteIcon
                  sx={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => handleDelete(params)}
                >
                  Delete
                </DeleteIcon>
              )
            }
          }
          return column;
          })}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={row => row.document_user_id}
        />
      </Box>
    </>
  );
}