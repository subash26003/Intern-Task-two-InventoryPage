import React, { useEffect, useState } from 'react'
import { useData } from '../../Context/useDataProvider'
import "./productpage.css"
import {  useNavigate } from 'react-router-dom'
import electronicsImage from "../../assests/images/electronics.jpg"
import clothsImage from "../../assests/images/cloths.jpg"
import groceryImage from "../../assests/images/grocery.jpg"
const Products = () => {
  const { apiResponse  , isLoading , setReqPath } = useData()
  const [invertoryData, setInventoryData] = useState([])
  const [currentProduct , setCurrentProduct] = useState([])
  const productList  = ["cloths","grocery","electronics"]
  const navigate = useNavigate()
  const [checkOutObject , setCheckOutObject]= useState([])
  let [currentImage,setCurrentImage] = useState(clothsImage)
  useEffect(() =>{
    const setValues =()=>{
      setReqPath("inventoryData")
      let selectedProduct = apiResponse.filter( each => each.category === "cloths")
      setInventoryData(apiResponse)
      setCurrentProduct(selectedProduct)
      console.log("inside")
    }
    setValues()
    console.log("logged")
  },[isLoading])
  const handleAddItem =(id, addOrMinus) => {
    let selectedItem = []
     let UpdatedInventory = invertoryData.map(each => {
        if(each.id === id){
          if(parseInt(each.added) > 0 && parseInt(each.added) < parseInt(each.count) ){
            let count = parseInt(each.added) + addOrMinus
             selectedItem = [{
              id:each.id,
              name : each.name,
              count : count,
              price:each.price
            }]
            each.added = count
          }else if(parseInt(each.added) === 0 && addOrMinus === 1 ){
            let count = parseInt(each.added) + addOrMinus
            selectedItem = [{
              id:each.id,
              name : each.name,
              count : count,
              price:each.price
            }]
            each.added = count
          }else{
            each.added = 0
          }
          if(selectedItem.length !== 0){
            if(checkOutObject.length === 0){
              setCheckOutObject(previuosObject => [...previuosObject , ...selectedItem])
            }else{
              let present = checkOutObject.some(each => each.id === selectedItem[0].id)
              if(present){
                let updatedObject = checkOutObject.map(each => {
                  if(each.id === selectedItem[0].id){
                  
                    each.count = parseInt(each.count) + addOrMinus
                    return each
                  }else{
                    return each
                  }
                  
                })
                setCheckOutObject(updatedObject)
              }else{
                setCheckOutObject(previuosObject => [...previuosObject ,...selectedItem])
              }
            }
          } 
        }
        return each
     })
     setInventoryData(UpdatedInventory)
  }
  const handleProductSectionButton= (productName) =>{
        const currentItems =  invertoryData.filter(each => each.category === productName)
        setCurrentProduct(currentItems)
        let  image
        switch (productName){
          case "cloths":
            image = clothsImage
            break
          case "grocery":
            image = groceryImage
            break
          case "electronics":
            image = electronicsImage
            break 
          default:
            image = clothsImage
            break
        }
        setCurrentImage(image)     
  }
  const handleCheckOut = () =>{
    const updatedData = currentProduct.map(each => {
      let updatedItems = {...each,added : 0}
      return updatedItems
    } )
    setCurrentProduct(updatedData)
    console.log(updatedData)
    if(checkOutObject.length === 0){
      alert("Please Select some Items")
      navigate(0)
    }else{
      navigate("/check",{state:{checkOutObject}})
    }
  }
  return (
    <div className=' flex flex-col mt-14 '>
      {/* <button onClick={handleOnclick} className='ml-auto  button-element refresh-button mr-1 mt-3 mb-3'>refresh</button> */}
      <div className={`'product-list-section w-100 h-14 mt-3 border-y-2 border-black grid grid-cols-3 items-center'`}>
        {productList.map(each => 
        <button key={productList.indexOf(each)} 
          className='product-list-button border-x border-black bg-white'
          onClick={() => handleProductSectionButton(each)}
        ><p className='tracking-wider'>{each.toLocaleUpperCase()}</p></button>)}
      </div>
      <div className='flex justify-end mt-3 mr-3'>
       <button 
          className=' checkout-btn button-element'
          onClick={() => handleCheckOut()}
       >Checkout</button> 
      </div>
      <div className='p-1 md:p-3'>
        {!isLoading  ?  currentProduct.map(eachProduct => 
        <div key ={eachProduct.id} className='item-cards mt-3 p-2 shadow-xl h-28 md:h-36 md:p-4   flex '>
          <div className='h-100 border product-image-card'>
            <img src={currentImage}  alt='product_image' className='product-image '></img>
          </div>
          <div className='ml-4'>
            <p className=' md:text-2xl font-bold'>{`${eachProduct.name}`}</p>
            <p className='mt-2 md:mt-5'>{`Available: ${eachProduct.count}`}</p>
            <p className=' md:mt-3'>{`$ ${eachProduct.price}`}</p>
          </div>
          <div className='ml-auto w-32 flex flex-col items-center justify-center'>
            <p  className='text-center' >{eachProduct.added}</p>
            <div className=''>
            <button className='text-2xl m-1 border-2 font-bold rounded-md arithmetic-button w-12' onClick={() => handleAddItem(eachProduct.id  , -1)}>-</button>
              <button className='text-2xl m-1 border-2 font-bold rounded-md arithmetic-button w-12' onClick={() => handleAddItem(eachProduct.id , 1)}>+</button>
            </div>
           
          </div>
        </div>
      ) :
      <div className='h-32 w-100 flex justify-center items-end text-2xl text-gray-700 font-bold'>Loading....</div> }
      </div>
    </div>
  )
}
export default Products