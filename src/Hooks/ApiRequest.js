import  { useEffect, useState } from 'react'
import axiosRequest from "../AxiosRequest/axiosRequest"
import { baseURL } from '../PageData/PageData'
import { useData } from '../Context/useDataProvider'


const useAxiosData = (reqPath) => {
    const [apiResponse , setApiResponse] = useState([])
    const [fetchError , setFetchError] = useState(null)
    const [isLoading , setIsLoading] = useState(null)

 

    useEffect(() =>{
        
        const fetchData = async (URL) =>{
            try{
                setIsLoading(true)
                const response = await axiosRequest.get(URL)
                setApiResponse(response.data)
            }catch(err){
                setFetchError(err.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData(URL)
       
        
    },[])
    
  return ({ apiResponse , fetchError , isLoading })
}

export default useAxiosData