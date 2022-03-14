import { React, useEffect, useState } from 'react';
import { Box, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { getResultsAction, postResultAction } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable/CustomTable';

const useStyles = makeStyles({
    button: {
        backgroundColor: 'black',
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginTop: '10px',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    },
    container: {
        display: 'flex',
    },
    column: {
        margin: '10px',
        display: 'flex', flexDirection: 'column',
    },
    result: {
        display: 'flex',
        marginTop: '30px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '50px',
        color: 'white',
    },
    input: {
        color: '#fff',
    },
    inputAdornment: {
        color: '#fff',
    },
    warning: {
        color: 'red',
    }
});

const columns = [{ headerText: 'Resultado', key: 'id' }, { headerText: 'IMC', key: 'result' }];

const Calculator = () => {
    const classes = useStyles();
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [resultado, setResultado] = useState('');
    const resultados = useSelector((state) => state.results);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getResultsAction());
    }, [resultado]);

    const handleCalcular = async () => { //Calcula o IMC
        const resultado = peso / (altura * altura); //O Cálculo do IMC é feito pela divisão do peso pela altura ao quadrado.
        setResultado(resultado);
        dispatch(postResultAction(resultado));
    };

    const handleLimpar = () => {  //Limpa os textfields, setando uma string vazia para os campos Altura e Peso.
        setAltura("");
        setPeso("");
        setResultado("");
    };

    return (
        <Box className={classes.root}>

            <Box className={classes.column}>
                <Typography className={classes.title}>Calculadora IMC</Typography>
                <Box className={classes.container}>
                    <Box className={classes.column}>
                        <TextField
                            InputLabelProps={{
                                className: classes.input,
                            }}
                            value={altura}
                            onChange={e => setAltura(e.target.value)}
                            label="Altura"
                            type="number"
                            placeholder="Exemplo: 1,63"
                            variant="outlined"
                            id="outlined-start-adornment"
                            onKeyDown={(evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '-') && evt.preventDefault()}
                            style={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment className={classes.inputAdornment} position="start">m</InputAdornment>,
                                className: classes.input,
                            }}
                        />
                        <Button className={classes.button}
                            onClick={handleCalcular}
                        >
                            Calcular
                        </Button>
                    </Box>
                    <Box className={classes.column}>
                        <TextField
                            InputLabelProps={{
                                className: classes.input,
                            }}
                            value={peso}
                            onChange={(e) => { setPeso(e.target.value) }}
                            label="Peso"
                            type="number"
                            placeholder="Exemplo: 56,2"
                            variant="outlined"
                            id="outlined-start-adornment"
                            onKeyDown={(evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '-') && evt.preventDefault()}
                            style={{ m: 1, width: '25ch' }}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                className: classes.input,
                            }}
                        />
                        <Button
                            onClick={handleLimpar}
                            className={classes.button}
                        >
                            Limpar
                        </Button>
                    </Box>
                </Box>
                <Box className={classes.result}>
                    {resultado ? (
                        <Box className={classes.column}>

                            <Typography>O seu IMC é: {resultado < 0 ? ("Impossível calcular! Verifique os valores de entrada.") : resultado}</Typography>
                            {
                                resultado <= 0 ? null :
                                    resultado < 18.5 ? (<Typography>Classificação: <Typography className={classes.warning}>Magreza</Typography></Typography>) :
                                        resultado >= 18.5 && resultado <= 24.9 ? (<Typography>Classificação: Normal</Typography>) :
                                            resultado >= 25.0 && resultado <= 29.9 ? (<Typography>Classificação: Sobrepeso</Typography>) :
                                                resultado >= 30.0 && resultado <= 39.9 ? (<Typography>Classificação: Obesidade</Typography>) :
                                                    resultado >= 40.0 ? (<Typography>Classificação: Obesidade <Typography className={classes.warning}>Grave</Typography></Typography>) : null
                            }
                        </Box>
                    ) : null}
                </Box>
                <Box>
                    <Typography className={classes.title}>Últimos resultados</Typography>
                    <CustomTable data={resultados} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}

export default Calculator;