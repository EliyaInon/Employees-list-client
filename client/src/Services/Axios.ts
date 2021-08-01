import axios from 'axios'
import React from 'react'

export const getAxios = (path: string) => {
    return axios.create({
        baseURL: `http://employeesmanager.eastus.azurecontainer.io/${path}`,
    })
}
