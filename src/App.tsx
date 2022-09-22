
import { useState } from 'react';
import styles from './App.module.css';
import logo from './assets/powered.png';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'
import {levels, calculateImc, Level} from './helpers/imc';

const App = ()=> {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if(heightField && weightField) {
            setToShow(calculateImc(heightField, weightField))
        } else {
            alert('digite os 2 campos')
        }
    }

    const handleBackButton = () => {
        setToShow(null);
        setHeightField(0)
        setWeightField(0)
    }

    return (
    <div className={styles.main}>
        <header>
            <div className={styles.headerContainer}>
                <img src={logo} width="150" alt="Calculadora IMC" />
            </div>
        </header>
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>Calcule seu IMC</h1>
                <p>O índice de massa corporal é uma medida internacional usada para calcular se uma pessoa está no peso ideal.</p>
                <input
                    type="number"
                    placeholder="Digite a sua altura. Ex 1.5"
                    value={heightField > 0 ? heightField : ''}
                    onChange={e => setHeightField(parseFloat(e.target.value))}
                    disabled={toShow ? true : false}
                />
                <input
                    type="number"
                    placeholder="Digite o seu peso. Ex 80"
                    value={weightField > 0 ? weightField : ''}
                    onChange={e => setWeightField(parseFloat(e.target.value))}
                    disabled={toShow ? true : false}
                />
                <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
            </div>
            <div className={styles.rightSide}>
                {!toShow &&
                <div className={styles.grid}>
                    {levels.map((item, key) => (
                        <GridItem key={key} item={item} />
                    ))}
                </div>
                }
                {toShow &&
                    <div className={styles.rightBig}>
                        <div className={styles.rightArrow} onClick={handleBackButton}>
                            <img src={leftArrowImage} alt="" width={25} />
                        </div>
                        <GridItem item={toShow} />
                    </div>
                }
            </div>
        </div>
    </div>
    );
}

export default App;
