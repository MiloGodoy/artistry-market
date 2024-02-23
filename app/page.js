import React from 'react'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import { getUserByEmail, createUser, getProducts } from '@/sanity/sanity-utils'
import { currentUser } from '@clerk/nextjs'
import product from '@/sanity/schemas/product-schema'

export default async function page() {
  const user = await currentUser();

  if(!user) return <div>You are not logged in</div>

  const existingUser = await getUserByEmail(user?.emailAddresses[0]?.emailAddress);

  if(existingUser.lenght === 0){
    await createUser({
      name:user?.firstName,
      email:user?.emailAddresses[0]?.emailAddress
    })
  }

  const products = await getProducts()

  return (
    <>
    <div>
      <Header />
    </div>

    <div className='flex flex-col items-center justify-center mt-10 space-y-4'>
      <h1 className='text-4xl font-bold text-[#5B20B6] text-center'>Get Artistic Prints</h1>
      <p className='text-center text-xl text-gray-500'>Elevate Your Space with stunning art prints. Transform your Sorroundings</p>
    </div>

    <div className='flex p-10'>
      <div className='mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16'>
        {
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        }
        
        
      </div>
    </div>

    <Footer />
    </>
  )
}

