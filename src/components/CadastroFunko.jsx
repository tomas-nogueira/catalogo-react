import { Alert, Autocomplete, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import HeaderLC from './HeaderLC'

function CadastroFunko() {
  return (
    <div>
        <HeaderLC></HeaderLC>
       <Container component="section" maxWidth="xs">
        <Box sx={{mt: 10, borderRadius: "10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography component="h1" variant="h4">Cadastre um Funko</Typography>
            <Box component="form">
                <TextField 
                type="text"
                label="Nome" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                />
                <TextField 
                type="text" 
                label="Descrição" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                />
                <TextField 
                type="number" 
                label="Ano" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                />
                <TextField 
                type="number" 
                label="Duração" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                />
                <Autocomplete
                    disableCloseOnSelect
                    id="combo-box-demo"
                    renderInput={(params) => <TextField {...params} label="Categoria" />}
                    onChange={ (event, opcao ) => {
                      }}
                    sx={{ mt: 2, mb: 2 }}
                    fullWidth
                />
                <TextField 
                type="text" 
                label="Imagem" 
                variant="outlined" 
                margin="normal" 
                fullWidth
                />
                <Button variant="contained" type="submit" fullWidth sx={{mt: 2, mb: 2}}>Enviar</Button> 
                <Grid container>
                    <Grid item xs>
                        Esqueci a Senha
                    </Grid>
                    <Grid item>
                        Cadastrar
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  )
}

export default CadastroFunko
