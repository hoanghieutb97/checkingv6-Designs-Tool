import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../constants';

export const useProducts = () => {
  const queryClient = useQueryClient();

  // Get all products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('Fetching products from API...');
      const response = await axios.get(`${API_URL}/products`);
      console.log('API Response:', response.data);
      return response.data;
    }
  });

  // Create product
  const createProduct = useMutation({
    mutationFn: async (newProduct) => {
      const response = await axios.post(`${API_URL}/products`, newProduct);
      return response.data;
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