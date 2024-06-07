import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Luto from '../../../assets/luto.jpg'
import './card.css'

const Carde = ({ nome, datanascimento, plano, datafalecimento, parentesco, datacremacao, icone }) => {
    return (
        <div className='todos-cards'>
            <Card sx={{ maxWidth: 345, height: 270 }}>
                <CardMedia>
                    <div className='luto-img'>
                        <img src={Luto}></img>
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div className='informacoes-funeraria'>
                           <label>Data de Nascimento: {datanascimento}</label>
                            <label>Data de Falecimento: {datafalecimento}</label>
                            <label>Plano: {plano}</label>
                            <label>Parentesco: {parentesco}</label>
                            <label>{datacremacao && <span>Data de Cremação: {datacremacao}</span>}</label>
                        </div>

                    </Typography>
                </CardContent>
            </Card>
        </div>

    );
}

export default Carde;
