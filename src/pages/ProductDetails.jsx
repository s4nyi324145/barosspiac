import { useParams } from "react-router-dom";
import api from "../config/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductImages from "../components/ProductImages";
import ProductDesc from "../components/ProductDesc";
import SimilarProducts from "../components/SimilarProducts";
import ProductDescButton from "../components/ProductDescButtons";
import ProductUserInfo from "../components/ProductUserInfo";
import ReportModal from "../components/reportModal";
import Footer from "../components/Footer";
export default function ProductDetails() {
  const { product_id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [openReportModal, setOpenReportModal] = useState(false);


  {/* Get product details by product_id */}
  const getProductDetails = async () => {
    try {
      const result = await api.get(`/product/${product_id}`);
      setProductDetail(result.data.product_details);
      setProductImages(result.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [product_id]);
  useEffect(() => console.log(productDetail), [productDetail]);

  return (
    <>
      <div className="bg-slate-950 text-white min-h-screen">
        {openReportModal && (
          <ReportModal
            type="product"
            reported_id={productDetail[0]?.user_id}
            product_id={product_id}
            openReportModal={openReportModal}
            setOpenReportModal={setOpenReportModal}
          />
        )}

        <Navbar />

        {!productDetail[0] ? (
            // Skeleton loader for product details
          <div className="flex flex-col md:flex-row gap-6 p-5 max-w-6xl mx-auto">
            <div className="flex-[0.6] h-96 bg-slate-800 rounded-2xl animate-pulse" />
            <div className="flex-[0.4] flex flex-col gap-4">
              <div className="h-8 bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-6 w-32 bg-slate-800 rounded-xl animate-pulse" />
              <div className="h-24 bg-slate-800 rounded-xl animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {/* Content */}
            <div className="flex flex-col lg:flex-row gap-6 md:p-5 p-0  ">
              <ProductImages
                is_sold={productDetail[0].is_sold}
                product_img={productImages}
              />
              <ProductDesc
                getProductDetails={getProductDetails}
                is_sold={productDetail[0].is_sold}
                product_id={product_id}
                productDetail={productDetail[0]}
              />
            </div>

            {/* User info and action buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:justify-between md:px-4 pb-5">
              <ProductUserInfo productDetail={productDetail[0]} />
              <ProductDescButton
                productDetail={productDetail[0]}
                openReportModal={openReportModal}
                setOpenReportModal={setOpenReportModal}
              />
            </div>

            {/* Similar products */}
            <SimilarProducts productDetail={productDetail[0]} />
          </>
        )}

        <Footer />
      </div>
    </>
  );
}
