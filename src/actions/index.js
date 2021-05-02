import axios from 'axios'

export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload,
})

export const dataToUpdate = payload => ({
    type: 'DATA_TO_UPDATE',
    payload
})

export const setError = payload => ({
    type: 'SET_ERROR',
    payload
})

export const setLogout = payload => ({
    type: 'DESTROY_SESSION',
    payload
})

export const onLogout = () => {
    return dispatch => {
        dispatch(setLogout({}))
        window.localStorage.removeItem('persist:root')
        window.location.href = '/login'
    }
}

export const setDataTable = payload => ({
    type: 'SET_DATA_TABLE',
    payload
})

export const getDataTable = payload => ({
    type: 'GET_ALL_FORMS',
    payload
})

export const handleDataSubmit = payload => ({
    type: 'HANDLE_DATA_SUBMIT',
    payload
})

export const setUpdateForm = payload => ({
    type: 'SET_UPDATE_DATA',
    payload
})

export const loginUser = ({ email, password }, redirectUrl) => {
    return async (dispatch) => {
        try {
            let response = await axios({
                url: 'https://evening-chamber-26239.herokuapp.com/api/auth/sign-in',
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                auth: {
                    username: email,
                    password,
                }
            })
            if(response.statusText){
                const { data } = response
                document.cookie = `email=${data.user.email}`
                document.cookie = `name=${data.user.name}`
                document.cookie = `id=${data.user.id}`
                document.cookie = `token=${data.token}`

                dispatch(loginRequest(data))
                window.location.href = redirectUrl
            }
        }
        catch (err) {
            dispatch(setError(err.message))
        }
    }
}


export const registerUser = (payload, redirectUrl) => {
    return async (dispatch) => {
        try{
            let response = await axios.post('https://evening-chamber-26239.herokuapp.com/api/auth/sign-up', payload)
            if(response.statusText) {
                dispatch(registerUser(response.data))
                window.location.href = redirectUrl
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

export const createOneForm = (payload, redirectUrl, token) => {
    return async (dispatch) => {
        try {
            let response = await axios('https://evening-chamber-26239.herokuapp.com/api/forms/createForm', {
                method: 'post',
                headers: {  
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: payload,
            })

            if(response.statusText){
                dispatch(setDataTable(response.data))
                setTimeout(() => {
                    window.location.href = redirectUrl
                }, 5000)
            }
        }
        catch(err){
            dispatch(onLogout())
        }
    }
}

export const getForms = (token, email) => {
    return async(dispatch) => {
        try{
            let response = await axios('https://evening-chamber-26239.herokuapp.com/api/forms', {
                method: 'get',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })

            if(response.statusText){
                const { data } = response
                dispatch(getDataTable(data))
                return data
            }
        }
        catch(err){
            let status = checkStaus(err)
            if(status === 401) {
                dispatch(onLogout())
            } 
            else {
                console.log(err)
            }
            // 
        }
    }
}

export const deleteForm = (token, id) => {
    return async (dispatch) => {
        try {
            let response = await axios(`https://evening-chamber-26239.herokuapp.com/api/forms/${id}`, {
                method: 'delete',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })

            if(response.statusText){
                window.location = '/myForms'
            }
        }
        catch(err){
            console.log(err)
            dispatch(onLogout())
        }
    }
}

export const updateOneForm = (payload, redirectUrl, token) => {
    return async (dispatch) => {
        try {
            let response = await axios('https://evening-chamber-26239.herokuapp.com/api/forms/updateForm', {
                method: 'put',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: payload
            })
            console.log(response)
            if(response.statusText) {
                dispatch(setUpdateForm(response.data))
                window.location.href = redirectUrl
            }
        }
        catch(err){
            console.log(err)
            dispatch(onLogout())
        }
    }
}

export const sendUserEmail = (email, token) => {
    return async(dispatch) => {
        try{
            let response = await axios('https://evening-chamber-26239.herokuapp.com/email/send', {
                method:  'GET',
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            console.log(response)
            if(response.statusText) {
                console.log('Email enviado')
            }
        }
        catch(error){
            console.log(error)
        }
    }
}


const checkStaus =  (err) => {
    let errArray = err.message.split(' ')[err.message.split(' ').length - 1]
    return parseInt(errArray)
}
   
