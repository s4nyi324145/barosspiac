import { useParams } from "react-router-dom"
import api from "../config/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import ProductImages from "../components/ProductImages";
import ProductDesc from "../components/ProductDesc";
import SimilarProducts from "../components/SimilarProducts";
import ProductDescButton from "../components/ProductDescButtons";
import ProductUserInfo from "../components/ProductUserInfo";
import ReportModal from "../components/reportModal";
export default function ProductDetails(){

    const {product_id} = useParams()
    const [productDetail, setProductDetail] = useState([])
    const [openReportModal, setOpenReportModal] = useState(false)
    
    const getProductDetails = async() => {
        try {
        
            const result = await api.get(`/product/${product_id}`)
            setProductDetail(result.data)
            
    
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {getProductDetails()}, [product_id])
    useEffect(() => console.log(productDetail));

    return(<>
        <div className="bg-slate-950 relative text-white">

            {openReportModal && <ReportModal type={"product"} reported_id={productDetail[0].user_id} product_id={product_id} openReportModal={openReportModal} setOpenReportModal={setOpenReportModal}/>}

            <Navbar/>
            <div className="flex  p-5  bg-slate-950 flex-1">
                <ProductImages product_img={productDetail.product_img} />
                <ProductDesc product_id={product_id} productDetail={productDetail[0]}/>
            </div>
            <div className="p-5 flex justify-between">
                <ProductUserInfo productDetail={productDetail[0]}/>
                <ProductDescButton productDetail={productDetail[0]} openReportModal={openReportModal} setOpenReportModal={setOpenReportModal}/>
            </div>
            
            <SimilarProducts  productDetail={productDetail[0]}/>

            

        </div>
    
    </>)
}