import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import "/category/sliderCategoryCss";
import "/src/assets/css/sliderCategoryCss.css";
import categoryData from "../../data/category/category-data.json";
import CategorySingle from "../../components/shop/category/CategorySingle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { useEffect } from "react";
import { getAllCategories } from "../../api/categoriesApi";
import { useState } from "react";
import { Card } from "react-bootstrap";

const CategorySlider = () => {
    const [categoryData, setCategoryData] = useState([]);
    const swiperSettings = {
        modules: [Autoplay],
        slidesPerView: 4,
        autoplay: { delay: 5000, disableOnInteraction: false },
        loop: true,
        spaceBetween: 30,
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Assuming getAllCategories returns a response with the data property
                const response = await getAllCategories();
                setCategoryData(response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="collections-area pt-100 pb-95 ">
            <div className="container">
                <div className="collection-wrap">
                    <div className="collection-active">
                        <Swiper {...swiperSettings}>
                            {categoryData &&
                                categoryData.map((single) => (
                                    <SwiperSlide key={single._id}>
                                        {/* <CategorySingle data={single} /> */}
                                        <Card className="category-card">
                                            <Card.Img variant="top" src={single.image} />
                                            <Card.Body>
                                                <Card.Title>{single.category_name}</Card.Title>
                                                <Card.Text>
                                                    {single.subtitle}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySlider;
