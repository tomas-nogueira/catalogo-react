import React from 'react'
import Harry from './photos/Harry.png'
import Flash from './photos/FlashPOP.png'
import { Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Card, Grid, Link} from '@mui/material';


function CardF(props) {
  return (
    <div>
        <div>
        <Card sx={{
            maxWidth:260, 
        }}>
            <CardActionArea>
            <CardMedia 
            component="img"
            height="490"
            image={props.img}
            alt={props.titulo}
            sx={{
                backgroundColor: "#346BB2",
            }}
            />
            <CardContent sx={{
                backgroundColor:"#5374B3",
                color:"white"
            }}>
                <Typography variant='h5' component='div' sx={{
                    color:"white"
                }}>
                    {props.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    color:"white",
                }}>
                    {props.descricao}
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        {props.categoria}
                    </Grid>
                    <Grid item xs={4}>
                        {props.ano}
                    </Grid>
                    <Grid item >
                        {props.duracao}
                    </Grid>
                </Grid>
                <Button variant='text' color='error' onClick={props.excluir}>Excluir</Button>
                <Button variant='text' color='error'><Link sx={{
                    color:"white"
                }} href={"edita/" + props.id}>Editar</Link></Button>
            </CardContent>
      </CardActionArea>
    </Card>
        </div>
    </div>
  )
}

export default CardF
