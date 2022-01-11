import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import {
    resetAC, disableIncrementButtonAC, disableSubmitButtonAC,
    incrementAC,
    setErrorMaxValueAC,
    setErrorMinValueAC,
    setTheSettingsAC
} from './store/reducer';
import {AppRootStateType} from "./store/store";

function App() {
    const counter = useSelector<AppRootStateType, number>((state: AppRootStateType) => state.counter.value);
    const maxValue = useSelector<AppRootStateType, number>((state: AppRootStateType) => state.counter.maxValue);
    const minValue = useSelector<AppRootStateType, number>((state: AppRootStateType) => state.counter.minValue);
    const maxValueError = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.counter.maxValueError);
    const minValueError = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.counter.minValueError);
    const setButtonDisabled = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.counter.setButtonDisabled);
    const incButtonDisabled = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.counter.incButtonDisabled);
    const dispatch = useDispatch();
    const [maxInputValue, setMaxInputValue] = useState<number>(maxValue);
    const [minInputValue, setMinInputValue] = useState<number>(minValue);

    const increment = () => {
        dispatch(incrementAC())
    }

    const reset = () => {
        dispatch(resetAC(maxValue, minValue))
        setMaxInputValue(maxValue);
        setMinInputValue(minValue);
    }

    const setTheSettings = () => {
        dispatch(setTheSettingsAC(maxInputValue, minInputValue))
    }

    const changeMaxValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = + event.target.value;
        setMaxInputValue(value);
    }
    const changeMinValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = + event.target.value;
        setMinInputValue(value);
    }

    let errorMaxInput:boolean;
    let errorMinInput:boolean;
    let errorSubmitButton:boolean;

    if (maxInputValue > 0 && maxInputValue > minInputValue && maxInputValue % 1 === 0) {
        errorMaxInput = false;
    } else {
        errorMaxInput = true;
    }

    if (minInputValue >= 0 && minInputValue < maxInputValue && minInputValue % 1 === 0) {
        errorMinInput = false;
    } else {
        errorMinInput = true;
    }
    errorSubmitButton = errorMaxInput || errorMinInput;
    dispatch(setErrorMaxValueAC(errorMaxInput));
    dispatch(setErrorMinValueAC(errorMinInput));
    dispatch(disableSubmitButtonAC(errorSubmitButton));

    useEffect(() => {
        if(counter === maxValue) {
            dispatch(disableIncrementButtonAC(true));
        } else {
            dispatch(disableIncrementButtonAC(false));
        }
    }, [counter])


    return (<div className="App">
            <div className={'wrapper'}>
                <div className={'settings'}>
                    <div className={'settings__info'}>
                        <div className={'settings__item'}>
                            <span>max value: </span>
                            <input className={maxValueError ? 'settings__input_error' : 'settings__input'} onChange={changeMaxValueInput} value={maxInputValue} type='number'/>
                        </div>
                        <div className={'settings__item'}>
                            <span>min value: </span>
                            <input className={minValueError ? 'settings__input_error' : 'settings__input'} onChange={changeMinValueInput} value={minInputValue} type='number'/>
                        </div>
                    </div>
                    <div className={setButtonDisabled ? 'settings__button' : 'settings__button settings__button_disabled'}>
                        <button className={setButtonDisabled ? 'button__disabled' : 'button'} disabled={setButtonDisabled} onClick={setTheSettings}>set</button>
                    </div>
                </div>
                <div className={'counter'}>
                    <div className={'counter__info'}>
                        <h2>{counter}</h2>
                    </div>
                    <div className={'counter__buttons'}>
                        <button className={incButtonDisabled? 'button__disabled' : 'button'} disabled={incButtonDisabled} onClick={increment}>inc</button>
                        <button className={'button'} onClick={reset}>reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
