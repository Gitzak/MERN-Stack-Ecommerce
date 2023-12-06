import { useFormik } from "formik";
import Swal from "sweetalert2";
import { updateProduct } from "../api/productsApi";

const formik = useFormik({
    initialValues: {
        sku: "",
        images: [],
        productName: "",
        categories: [],
        shortDescription: "",
        longDescription: "",
        price: 0,
        discountPrice: 0,
        quantity: 0,
        options: [],
        active: false,
    },
    onSubmit: async (values) => {
        if (values.categories.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "At least one category is required",
                confirmButtonText: "OK",
                customClass: {
                    container: "swal2-container",
                },
                didOpen: () => {
                    document.querySelector(".swal2-container").style.zIndex = 10000;
                },
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();

        const transformedOptions = values.options.map((item) => {
            return {
                label: item.label,
                option: item.option.map((optionItem) => optionItem),
            };
        });

        formData.append("sku", values.sku);
        formData.append("productName", values.productName);
        formData.append("active", values.active);
        formData.append("shortDescription", values.shortDescription);
        formData.append("longDescription", values.longDescription);
        formData.append("price", values.price);
        formData.append("discountPrice", values.discountPrice);
        formData.append("quantity", values.quantity);
        formData.append("options", JSON.stringify(transformedOptions));
        formData.append(
            "categories",
            values.categories.map((category) => category.value)
        );

        updateProduct(id, formData)
            .then((response) => {
                // console.log(response);
                setLoading(false);
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "success",
                        text: response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                }
            })
            .catch((error) => {
                // console.log(error.request.responseText);
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.response.data.message,
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to add product",
                        confirmButtonText: "OK",
                        customClass: {
                            container: "swal2-container",
                        },
                        didOpen: () => {
                            document.querySelector(".swal2-container").style.zIndex = 10000;
                        },
                    });
                }
            });
    },
});

export default formik;