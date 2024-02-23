// Importa los componentes necesarios de React y Stripe
import React from 'react';
import { FaTrash } from "react-icons/fa";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useCartStore from '../cartStore';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { createOrder } from '@/sanity/sanity-utils';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';


// Carga la clave pública de Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Definición del componente Cart
function Cart() {
    const cart = useCartStore(state => state.cart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const totalItems = useCartStore(state => state.totalItems);
    const cartTotal = useCartStore(state => state.cartTotal);
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useUser()
    const router = useRouter()

    const onsubmit = async () => {
        const CardElement = elements?.getElement("card")

        try {
            if(!stripe || !CardElement) return null;

            const data = await axios.post("/api/stripe",{
                data:{amount:cartTotal}
            })

            console.log(data)
            const res = await stripe.confirmCardPayment(data?.data?.intent,{
                payment_method:{
                    card:CardElement
                }
            })

            const status = res?.paymentIntent?.status;

            if(status === "succeeded") {
                const email = user?.emailAddresses[0]?.emailAddress

                if(!email) return null
                const res = await createOrder(email,cart)

                if(res){
                    router.push("/order")
                }
            }

            
        } catch(error) {
            console.log(error)
            alert("payment failed")
        }
    }

    // Manejador para eliminar un producto del carrito
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    }

    return (
        <div className='max-w-3xl mx-auto mt-20'>
            <h1 className='text-3xl text-center font-semibold text-[#5B20B6] mb-6'>Cart</h1>

            <table className='w-full border-collapse'>
                <thead>
                    <tr className='text-[#5B20B6] border-b border-gray-200'>
                        <th className='px-4 py-3'>Product</th>
                        <th className='px-4 py-3'>Price</th>
                        <th className='px-4 py-3'>Qty</th>
                        <th className='px-4 py-3'>Remove</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cart.map(product => (
                            <tr className='hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6]' key={product.id}>
                                <td className='py-2 px-4 flex items-center'>
                                    <img className='mr-2' src={product.image} width={50} height={40} alt='product image'/>
                                    {product.name}
                                </td>
                                <td className='py-2 px-4'>${product.price}</td>
                                <td className='py-2 px-4'>{product.quantity}</td>
                                <td className='py-2 px-4'>
                                    <FaTrash onClick={() => { handleRemoveFromCart(product?._id)}} className='text-[#5B20B6] mx-auto cursor-pointer'/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div>
                <div className='space-x-4 mt-10'>
                    <span className='text-md font-semibold text-[#5B20B6]'>Total</span>
                    <span className='text-md font-semibold text-[#5B20B6]'>${cartTotal}</span>
                </div>

                {/* Aquí se utiliza el componente CardElement dentro del proveedor Elements */}
                <div className='mt-6 mb-6'>
                    <label className='text-lg mb-2 font-semibold text-[#5B20B6]'>Card Details</label>
                    <CardElement className='border border-gray-200 rounded-md p-4'/>
                </div>

                <div className='mt-6 max-w-sm mx-auto space-y-4'>
                    <button onClick={onsubmit} className='bg-[#5B20B6] text-white py-3 px-6 rounded-md w-full text-lg font-semibold'>Checkout</button>
                </div>
            </div>
        </div>
    );
}

// Envuelve el componente Cart con el proveedor Elements de Stripe
function CartWithStripeElements() {
    return (
        <Elements stripe={stripePromise}>
            <Cart />
        </Elements>
    );
}

export default CartWithStripeElements;
