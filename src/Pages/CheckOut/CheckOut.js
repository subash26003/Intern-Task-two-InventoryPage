import React, { useEffect, useState } from 'react'
import { useLocation ,Link} from 'react-router-dom'
import "./checkout.css"
import { useData } from '../../Context/useDataProvider'

import api from "../../AxiosRequest/axiosRequest"
import { baseURL } from '../../PageData/PageData'


const CheckOut = () => {
  const location = useLocation()
  const {checkOutObject} = location.state
  const [inventoryData,setInventoryData] = useState([])
  const {apiResponse} = useData()
 
  let totalBillAmount = 0
  checkOutObject.forEach((each) => totalBillAmount += (parseInt(each.price)*(parseInt(each.count))))
  const URL = `${baseURL}/inventoryData`

  useEffect(() =>{
    setInventoryData(apiResponse)
  })
  const handlePayButton = () =>{
    let updatedData =[]
    checkOutObject.map(eachItem => {
          updatedData = inventoryData.map(each =>{
          if(eachItem.id === each.id){
            return {...each , count:String(parseInt(each.count) - parseInt(eachItem.count))}
          }else{
            return each
          }
         })
      })
      console.log(updatedData)
      const postRequest =async (URL) =>{
        try{
          // const requestTodelete = await api.delete("http://localhost:3500/inventoryData")
          const response = await api.put("http://localhost:3500/inventoryData",updatedData)
          console.log(response.data)
        }catch(err){
          console.log(err)

        }
      }
      postRequest(URL)
     
  }
 
  return (
    <div className='checkout-page h-screen flex flex-col  justify-center items-center '>
      <div className='absolute top-10 right-10'>
      <Link to="/home" ><button className='button-element home-button text-white   '>Home</button></Link>
      <Link to="/products" state={{islogged:true}} ><button className='button-element home-button text-white ml-2'>Back</button></Link>
      </div>
      <div className='border-2 w-100 p-3 min-h-96 flex flex-col items-center bg-white shadow-lg shadow-gray-600'>
      <p className='text-2xl  font-black'>Bill Details</p>
        <div className='table-container h-56 overflow-auto border-2 mt-4'>
          <table className='h-100'>
            <thead>
            <tr className=''>
              <th className='product-name-cell'>Product Name</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            { 
            checkOutObject.map(each => 
              <tr key={each.id} >
                <td>{each.name}</td>
                <td>{each.count}</td>
                <td>{each.price}</td>
              </tr>
            )
            }
            </tbody>
          </table>
        </div>
        <div className=' w-96 h-20 flex flex-col justify-end items-end pr-4 gap-2'>
        <p className='text-right text-lg font-bold bottom-0  '>{`Total Bill = `}<span className='ml-1 font-bold text-xl'>{`$${totalBillAmount}`}</span></p>
        <button 
          className='button-element bill-button'
          onClick={handlePayButton}
        >Pay Bill</button>
        </div>
        
      </div>
    </div>
  )
}

export default CheckOut