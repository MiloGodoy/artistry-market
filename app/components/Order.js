import { getOrdersByEmail } from "@/sanity/sanity-utils"
import { currentUser } from "@clerk/nextjs"


export default async function Order() {
    const user = await currentUser()

    if(!user) return <div>not found</div>

    const orders = await getOrdersByEmail(user.emailAddresses[0].emailAddress)

  return (
    <div className='max-w-3xl mx-auto mt-20'>
        <h1 className='text-3xl text-center font-semibold text-[#5B20B6] mb-6'>Order Page</h1>

        <table className='w-full border-collapse'>
            <thead>
                <tr className='text-[#5B20B6] border-b border-gray-200'>
                    <th className='px-4 py-3'>Product</th>
                    <th className='px-4 py-3'>Qty</th>
                    <th className='px-4 py-3'>Price</th>
                    <th className='px-4 py-3'>Paid</th>
                    <th className='px-4 py-3'>Status</th>
                </tr>
            </thead>

            <tbody>
                {
                    orders.map(product => (
                        <tr className='hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6]' key={product.  _id}>
                            <td className='py-2 px-4 flex items-center'>
                                
                                {product.name}
                            </td>
                            <td className='py-2 px-4'>{product.qty}</td>
                            <td className='py-2 px-4'>${product.price}</td>
                            <td className='py-2 px-4'>
                                {
                                    product.paid ? <span className="text-green-500">Paid</span> : <span className="text-red-500">Not paid</span>
                                }
                            </td>
                            <td className='py-2 px-4'>
                                {
                                    product.delivered? <span className="text-green-500">Delivered</span> : <span className="text-red-500">Not delivered</span>
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

