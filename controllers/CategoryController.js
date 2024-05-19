import CategoryModel from "../models/CateogyModel.js";
import slugify from "slugify";

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(401).send({message: "Name is Required"});
        }
        const existingCategory = await CategoryModel.findOne({name});
        if(existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            });
        }

        const categorynew = await new CategoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
           success: true,
           message: 'New Category Created Sucsess',
           categorynew
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Category"
        });
    }
};


// Update Category
export const updateCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const alreadycategory = await CategoryModel.findOne({name});
        if(alreadycategory){
            res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            })
        };

        const category = await CategoryModel.findByIdAndUpdate(id,{name,slug: slugify(name)},{new: true});
        res.status(201).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating',
            error,
        });
    }
};

// Get All Categories

export const getallCategoriesController = async(req,res) => {
    try {
        const categoryall = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Categories Listed',
            categoryall,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating',
            error,
        });
    }
};

// Get Single Category

export const getsingleCategoriesController = async(req,res) => {
    try{
        const category = await CategoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting single category',
            error,
        });
    }
};


// Delete Category
export const deleteCategoryController = async(req,res) => {
    try {
        const { id } = req.params;
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category Deleted SucessFully',
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while Deleting category',
            error,
        });
    }
};
