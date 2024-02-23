"use client"

import React from 'react'
import Header from '../components/Header'
import Cart from '../components/Cart'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

function page() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return (
    <div>
        <Header />
        <Cart />
    </div>
  )
}

export default page