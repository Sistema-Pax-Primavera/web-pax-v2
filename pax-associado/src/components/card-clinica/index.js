import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const CardeClinica = ({ nome, datanascimento, procedimento, dataprocedimento, status, imagem }) => {
    return (
        <div className='todos-cards'>
            <Card sx={{ maxWidth: 345, height: 250 }}>
                <CardMedia>
                    <div className='luto-img'>
                        <img src={imagem} alt={procedimento} />
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div className='informacoes-funeraria'>
                            <label>Data de Nascimento: {datanascimento}</label>
                            <label>Procedimento: {procedimento}</label>
                            <label>Data Procedimento: {dataprocedimento}</label>
                            <label>Status: {status}</label>
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default CardeClinica;
