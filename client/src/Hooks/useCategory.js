import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    // get cat
    const getCategories = async ( ) => {
        try {
            const {data} = await axios.get("/api/v1/category/get-allcategories");
            setCategories(data?.categoryall);
            console.log(data?.categoryall);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return categories;
}