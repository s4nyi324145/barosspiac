import { useParams } from "react-router-dom"
import api from "../config/api";
import { useEffect, useState } from "react";
export default function ProductDetails(){

    const {product_id} = useParams()
    const [ProductDetails, setProductDetails] = useState([])
    
    const getProductDetails = async() => {
        try {
        
            const result = await api.get(`/product/${product_id}`)
            setProductDetails(result.data)
            
    
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {getProductDetails()}, [])

    return(<>

    
    </>)
}