import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/useDataProvider'
import api from "../../AxiosRequest/axiosRequest"
import { baseURL } from '../../PageData/PageData'
import "./homepage.css"
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
    const {apiResponse,isLoading} = useData()
    const [inventoryData , setInventoryData] = useState([])
    const [allProducts,setAllProducts] = useState([])
    const [setFetchError] = useState(null); 
    const [eachProductDetails,setEachProductDetails] = useState([])
    const [totalCount , setTotalCount] = useState(null)
    const [fetchAgain , setFetchAgain] = useState(null)
    const navigator = useNavigate()
    const URL = `${baseURL}/productList`
    let productsList =[]
    useEffect(() =>{
        setInventoryData(apiResponse)
        setTotalCount(apiResponse.length)
        const getProductList = async() =>{
            try{
                const response = await api.get(URL)
                const [responseData] = response.data
                setAllProducts(responseData)
                productsList = response.data
                console.log(productsList)
            }catch(err){
                setFetchError(err.message)
            }
        }
        getProductList(URL)
        const getEachProductCount = async () =>{
        if(!isLoading){
            let countOfEachProduct =  allProducts.map(eachItem =>{
                let eachCount =  inventoryData.filter(each => each.category === eachItem)
                if(eachCount.length === 0){
                    setFetchAgain(true)
                }
                return {[eachItem] : eachCount.length}
             }) 
            setEachProductDetails(countOfEachProduct)
        }
        }
        getEachProductCount()
        console.log(isLoading)
    },[isLoading,fetchAgain])
    const handleRefreshBtn = () =>{
      navigator(0)
    }
  return (
    <div className='mt-16 p-5'>
        <div className='flex'>
            <button className='button-element refresh-button ml-auto' onClick={handleRefreshBtn}>Refresh</button>
        </div>
        {!isLoading ?
            <div>
                 <div className='pt-5'>
            <p className='text-center text-2xl font-black tracking-widest'>SUPER MARKET</p>
        </div>
        <div className=' mt-5 h-32 flex flex-col items-center bg-white shadow shadow-gray-600'>
            <p className='text-center text-lg font-bold underline'>AVAILABLE PRODUCTS</p>
            <div className='flex flex-col  '>
                <p className='text-lg font-semibold tracking-wider text-center text-gray-700'>{`Cloths`}</p>
                <p className='text-lg font-semibold tracking-wider text-center text-gray-700'>{`Grocery`}</p>
                <p className='text-lg font-semibold tracking-wider text-center text-gray-700'>{`Electronics`}</p>
             </div>
        </div>
        <div className='border-2 mt-5 h-32 flex flex-col items-center bg-white shadow shadow-gray-600'>
            <p className='text-center text-lg font-bold underline'>TOTAL COUNT OF ALL PRODUCTS</p>
            <p className='text-7xl font-semibold tracking-wider text-center text-gray-700 '>{totalCount}</p>
        </div>
        <div className='border-2 mt-5 h-32 flex flex-col items-center bg-white shadow shadow-gray-600'>
            <p className='text-center text-lg font-bold underline'>SEPERATE COUNT</p>
            {eachProductDetails.length !== 0 &&
             <div className='flex flex-col '>
             <p className='text-lg font-semibold tracking-wider  text-gray-700'>{`Cloths = ${eachProductDetails[0].cloths}`}</p>
                 <p className='text-lg font-semibold tracking-wider  text-gray-700'>{`Grocery = ${eachProductDetails[1].grocery}`}</p>
                 <p className='text-lg font-semibold tracking-wider  text-gray-700'>{`Electronics = ${eachProductDetails[2].electronics}`}</p>
              </div>
            }
        </div>
            </div>:<div className='h-32 w-100 flex justify-center items-end text-2xl text-gray-700 font-bold'>Loading....</div> 
            }
    </div>
  )
}
export default HomePage