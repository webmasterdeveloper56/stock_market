import axios from "./axios"

export const userRegister = async ({
    username,
    userEmail,
    password
}) => {
    return axios.get("/userRegister", {
        params : {
            username,
            userEmail,
            password
        }
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })    
}

export const userLogin = async ({
    email,
    password
}) => {
    return axios.get("/userLogin", {
        params:{
            email,
            password
        }
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const userStocks = async ({
    userId
}) => {
    return axios.get("/userStocks", {
        userId
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const userOrders = async ({
    userId
}) => {
    return axios.get("/userOrders", {
        userId
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const userHistory = async ({
    userId
}) => {
    return axios.get("/userHistory", {
        userId
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const userBalance = async ({
    userId
}) => {
    return axios.get("/userBalance", {
        userId
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const getSells = async () => {
    return axios.get("/getSells", {
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}


export const getBuys = async () => {
    return axios.get("/getBuys", {withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const getAllHistory = async () => {
    return axios.get("/getHistory", {
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const setOrders = async ({
    userId,
    type,
    stockId,
    amount,
    price
}) => {
    return axios.get("/setOrders", {
        params: {
            userId,
            type,
            stockId,
            amount,
            price
        }
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}

export const getAllStocks = () => {
    return axios.get("/getStocks", {
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}



export const deleteOrder = async ({
    orderId,
}) => {
    return axios.get("/deleteOrder", {
        params: {
            orderId
        }
    })
    .then((response) => response.data)
    .catch((error) => {
        throw error.response.data
    })
}
