export type InitialStateType = {
    value: number,
    maxValue: number,
    minValue: number,
    maxValueError: boolean,
    minValueError: boolean,
    setButtonDisabled: boolean,
    incButtonDisabled: boolean,
}

const initialState: InitialStateType = {
    value: 1,
    maxValue: 5,
    minValue: 1,
    maxValueError: false,
    minValueError: false,
    setButtonDisabled: false,
    incButtonDisabled: false,
}

export type ActionsType =
    IncrementActionType
    | ResetActionType
    | SetTheSettingsActionType
    | SetErrorMaxValueActionType
    | SetErrorMinValueActionType
    | DisableSubmitButtonActionType
    | DisableIncrementButtonActionType;

type IncrementActionType = {
    type: 'INCREMENT'
}

type ResetActionType = {
    type: 'RESET',
    maxValue: number,
    minValue: number,
}

type SetTheSettingsActionType = {
    type: 'SET THE SETTINGS',
    maxValue: number,
    minValue: number,
}

type SetErrorMaxValueActionType = {
    type: 'SET ERROR MAX VALUE',
    value: boolean,
}

type SetErrorMinValueActionType = {
    type: 'SET ERROR MIN VALUE',
    value: boolean,
}

type DisableSubmitButtonActionType = {
    type: 'DISABLE SUBMIT BUTTON',
    value: boolean,
}

type DisableIncrementButtonActionType = {
    type: 'DISABLE INCREMENT BUTTON',
    value: boolean,
}

export function counterReducer(state: InitialStateType = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case "INCREMENT": {
            const stateCopy = {...state};
            stateCopy.value = state.value + 1;
            return stateCopy;
        }
        case "RESET": {
            return {
                value: action.minValue,
                maxValue: action.maxValue,
                minValue: action.minValue,
                maxValueError: false,
                minValueError: false,
                setButtonDisabled: false,
                incButtonDisabled: false,
            };
        }
        case "SET THE SETTINGS": {
            return {...state, value: action.minValue, maxValue: action.maxValue, minValue: action.minValue}
        }
        case "SET ERROR MAX VALUE": {
            return {...state, maxValueError: action.value}
        }
        case "SET ERROR MIN VALUE":
            return {...state, minValueError: action.value}
        case "DISABLE SUBMIT BUTTON":
            return {...state, setButtonDisabled: action.value}
        case "DISABLE INCREMENT BUTTON":
            return {...state, incButtonDisabled: action.value}
        default:
            return state;
    }
}

export function incrementAC(): IncrementActionType {
    return {
        type: "INCREMENT"
    }
}

export function resetAC(maxValue: number, minValue: number) {
    return {
        type: "RESET",
        maxValue,
        minValue,
    }
}

export function setTheSettingsAC(maxValue: number, minValue: number): SetTheSettingsActionType {
    return {
        type: "SET THE SETTINGS",
        maxValue,
        minValue,
    }
}

export function setErrorMaxValueAC(value: boolean): SetErrorMaxValueActionType {
    return {
        type: "SET ERROR MAX VALUE",
        value
    }
}

export function setErrorMinValueAC(value: boolean): SetErrorMinValueActionType {
    return {
        type: "SET ERROR MIN VALUE",
        value
    }
}

export function disableSubmitButtonAC(value: boolean): DisableSubmitButtonActionType {
    return {
        type: "DISABLE SUBMIT BUTTON",
        value
    }
}

export function disableIncrementButtonAC(value: boolean): DisableIncrementButtonActionType {
    return {
        type: "DISABLE INCREMENT BUTTON",
        value
    }
}