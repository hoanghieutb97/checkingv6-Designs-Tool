import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../constants';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Get all products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {

      const response = await axios.get(`${API_URL}/products`);

      return response.data;
    }
  });

  // Create product
  const createProduct = useMutation({
    mutationFn: async (newProduct) => {
      console.log("newProduct..........................", newProduct);
      console.log("API_URL:", API_URL);
      console.log("Sending request to:", `${API_URL}/products`);
      try {
        const response = await axios.post(`${API_URL}/products`, newProduct);
        console.log("Response received:", response.data);
        return response.data;
      } catch (error) {
        console.log("Error in createProduct:", error);
        console.log("Error response:", error.response?.data);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, product }) => {
      const response = await axios.put(`${API_URL}/products/${id}`, product);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}; 