import axiosInstance from "../utils/axiosInstance";

export async function fetchTransactions(params) {
    const response = await axiosInstance.get('/transactions', { params });
    return response.data.transactions;
}
export async function createTransaction(transactionData) {
    const response = await axiosInstance.post('/transactions', transactionData);
    return response.data.transaction;
}
export async function updateTransaction(transactionId, transactionData) {
    const response = await axiosInstance.put(`/transactions/${transactionId}`, transactionData);
    return response.data.transaction;
}
export async function deleteTransaction(transactionId) {
    const response = await axiosInstance.delete(`/transactions/${transactionId}`);
    return response.data;
}
