import React from 'react'
import Harry from './photos/Harry.png'
import { Button, CardActionArea, CardActions, Typography, CardMedia, CardContent, Card} from '@mui/material';


function CardF() {
  return (
    <div>
        <div>
            <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                <CardMedia
                component="img"
                height="80"
                image={Harry}
                alt="Funko harry"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Funko Harry
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Adquira já seu funko pop e venha, colecione e aproveite!
                </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                <Button size="small" color="primary">
                Página de compra
                </Button>
                </CardActions>
            </Card>
        </div>
    </div>
  )
}

export default CardF
