import React, { useState } from 'react'

import "./additem.css"
import api from "../../AxiosRequest/axiosRequest"
import { baseURL } from '../../PageData/PageData'
import { useNavigate } from 'react-router-dom'

const AddItems = () => {
  const productList  = ["cloths","grocery","electronics"]

  const [product,setProduct] = useState(null)
  const [newItemName , setNewItemName] = useState(null)
  const [newItemPrice,setNewItemPrice] = useState(null)
  const [newItemCount,setNewItemCount] = useState(null)

  const navigator = useNavigate()

  const URL = `${baseURL}/inventoryData`

  const handleAddBtn = () =>{
    if(product === null  || newItemName ===null){
      alert("Choose / Enter All Values")
    }else if(typeof(parseInt(newItemPrice)) !== "number" || typeof(parseInt(newItemCount)) !== "number" ){
      alert("Enter Number for Price / Count ")
    }else{
      const newId = product[0].toLowerCase() + Math.ceil(Math.random()*100000)
      const newItem = {
        id: newId,
      name: newItemName,
      price: String(newItemPrice),
      count: String(newItemCount),
      added: "0",
      category: product.toLowerCase()
      }
      const AddNewItem = async(URL) =>{
        const response = await api.post(URL,newItem)
        console.log(response.data)
      }
      AddNewItem(URL)
     setTimeout(function(){
      navigator(0)
     },1000)
    }
 
  }


  return (
    <div className='mt-16 fixed h-full w-full p-10  md:pr-44 lg:pr-20 mr-10 flex justify-'>
      <div className='bg-white h-5/6 w-8/12  pt-5 md:w-5/6 flex flex-col items-center overflow-hidden'> 
      <div className='border-2 p-10'>
          <p className='text-2xl text-center font-bold underline'>ADD ITEMS</p>
          <div className='mt-10 flex flex-col'>
            <div className='flex flex-col mb-10 gap-1'>
              <label className=' lable-element '>Select Product</label>
              <select 
                className='w-56 h-10 border-2 border-gray-500'
                onChange={(e) => setProduct(e.target.value)}
              >
                
              {productList.map(each => 
                <option key={productList.indexOf(each)}>{each}</option>
              )}
              </select>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
              <label className='lable-element'>Enter the Item Name</label>
              <input placeholder='Enter'
                className='input-element h-10 border-2 pl-2 border-gray-600 rounded-sm'
                onChange={(e) => setNewItemName(e.target.value)}
              ></input>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
              <label className='lable-element'>Enter the Price</label>
              <input placeholder='Enter'
                className='input-element h-10 pl-2 border-2 rounded-sm border-gray-600 '
                onChange={(e) => setNewItemPrice(e.target.value)}
              ></input>
            </div>
            <div className='flex flex-col gap-1 mb-5'>
              <label className='lable-element'>Enter the Count</label>
              <input placeholder='Enter'
                className='input-element h-10 pl-2 border-2 rounded-sm border-gray-600 '
                onChange={(e) => setNewItemCount(e.target.value)}
              ></input>
            </div>
            <div className='flex justify-end'>
              <button 
                className='add-btn button-element'
                onClick={handleAddBtn}
              >Add</button>
            </div>
            </div>
          </div>
        </div></div>
  )
}

export default AddItems