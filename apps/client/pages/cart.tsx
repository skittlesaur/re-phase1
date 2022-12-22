import Loader from '@components/loader'
import useUser from '@hooks/use-user'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from '@lib/api'
import { API_URL } from '@lib/constants'
import toast from 'react-hot-toast'
import AppLayout from '@layouts/app'
import React from 'react';

const Cart = ({ }: any) => {
    const { user } = useUser()
    const queryClient = useQueryClient()
    const addToCart = useMutation({
        mutationKey: 'addToCart',
        mutationFn: (productId: string) => api.post(`${API_URL}/user/customer/cart`, { productId }),
        onSuccess: () => {
            toast.success('Added to cart')
            queryClient.invalidateQueries('cart')
        },
        onError: (e: any) => {
            const data = e.response.data
            toast.error(data.error ?? data.message)
        },
        retryDelay: 1000,
        retry: 0,
    })
/*
    const removeFromCart = useMutation({
        mutationKey: 'removeFromCart',
        mutationFn: (productId: string) => api.post(`${API_URL}/user/customer/cart`, { productId }),
        onSuccess: () => {
            toast.success('Removed from cart')
            queryClient.invalidateQueries('cart')
        },
        onError: (e: any) => {
            const data = e.response.data
            toast.error(data.error ?? data.message)
        },
        retryDelay: 1000,
        retry: 0,
    })*/
    const query = useQuery({
        queryKey: 'cart',
        queryFn: () => api.get('/user/customer/cart').then((res) => res.data),
        retry: 0
    })

    if(query.isLoading)
    return <Loader/>

    const handleAddToCart = (id: string) => {
        if (addToCart.isLoading) return
        if (user) {
            addToCart.mutate(id)
        } else {
            toast.error('Please login to add to cart')
        }
    }
    
  /*  const handleRemoveFromCart = (id: string) => {
        if(removeFromCart.isLoading) return
        if(user) {
            removeFromCart.mutate(id)
        }
    }*/
    //Why wrapper..
    return (
        <AppLayout>
            
            <div className="flex flex-col gap-8">
            <h1 className="flex text-2xl">
                Cart view
            </h1>
            {query.data?.cartItems.map((item: any) => (
                <div key={item.id}>
                    {item.quantity}
                    <button name="add product"
                    disabled={addToCart.isLoading}
                    onClick={() => handleAddToCart(item.id)}
                    className="w-7 hover:scale-200 aspect-square self-end justify-self-end transition-all duration-200 ease-in-out">
                        add product
                    </button>
                    {item.product.name}
                </div>
            ))}

        </div>
        
        </AppLayout>
    )

}

export default Cart


/* ORIGINAL
const Cart = ({ }: any) => {
    const { user } = useUser()
    const queryClient = useQueryClient()
    const addToCart = useMutation({
        mutationKey: 'addToCart',
        mutationFn: (productId: string) => api.post(`${API_URL}/user/customer/cart`, { productId }),
        onSuccess: () => {
            toast.success('Added to cart')
            queryClient.invalidateQueries('cart')
        },
        onError: (e: any) => {
            const data = e.response.data
            toast.error(data.error ?? data.message)
        },
        retryDelay: 1000,
        retry: 0,
    })

    const query = useQuery({
        queryKey: 'cart',
        queryFn: () => api.get('/user/customer/cart').then((res) => res.data),
        retry: 0
    })

    if(query.isLoading)
    return <Loader/>

    const handleAddToCart = (id: string) => {
        if (addToCart.isLoading) return
        if (user) {
            addToCart.mutate(id)
        } else {
            toast.error('Please login to add to cart')
        }
    }
    return (
        <AppLayout>
            <div className="flex flex-col gap-8">
            <h1 className="flex text-2xl">
                Cart view
            </h1>
            {query.data?.cartItems.map((item: any) => (
                <div key={item.id}>
                    {item.quantity}
                    <button
                    disabled={addToCart.isLoading}
                    onClick={() => handleAddToCart(item.id)}
                    className="w-7 hover:scale-110 aspect-square self-end justify-self-end transition-all duration-200 ease-in-out">
                    </button>
                    {item.product.name}
                </div>
            ))}

        </div>

        </AppLayout>
    )

}

export default Cart
*/