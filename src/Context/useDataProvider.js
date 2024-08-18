import { createContext,useState,useEffect, useContext } from "react";

import axiosRequest from "../AxiosRequest/axiosRequest"
import { baseURL } from '../PageData/PageData'
const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [apiResponse , setApiResponse] = useState([])
    const [fetchError , setFetchError] = useState(null)
    const [isLoading , setIsLoading] = useState(null)
    const [reqPath , setReqPath] = useState("inventoryData")
    const URL = `${baseURL}/${reqPath}`
    console.log(apiResponse)
   
    useEffect(() =>{
        const fetchData = async (URL) =>{
            try{
                setIsLoading(true)
                const response = await axiosRequest.get(URL)
                setApiResponse(response.data)
            }catch(err){
                setFetchError(err.message)
            }finally{
                setTimeout(() => {
                    setIsLoading(false)
                },1000) 
            }
        }
        fetchData(URL)
      },[reqPath])
    return (

    <DataContext.Provider value={{apiResponse , fetchError , isLoading , setReqPath}}>
        {children}
    </DataContext.Provider>

    )

}

export const useData = () => useContext(DataContext)