import axios from "axios";
const API_URL = "http://localhost:8081/api/employees";

export const listEmployees = () => {
    return axios.get(API_URL);
}
export const createEmployee = (employee) => {
    return axios.post(API_URL, employee);
}
export const getEmployee = (id) => {
    return axios.get(API_URL + "/" + id);
}
export const updateEmployee = (id, employee) => {
    return axios.put(API_URL + "/" + id, employee);
}
export const deleteEmployee = (id) => {
    return axios.delete(API_URL + "/" + id);
}


