import fs from "fs";
import ProductModel from "../models/ProductModel.js";
import Categorymodel from "../models/CateogyModel.js";
import OrderModel from "../models/OrderModel.js";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// Payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

// Create Product
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).send({error: "Photo is required and should be less than 1mb"});  
    }

    const products = new ProductModel({...req.fields, slug: slugify(name)});
    if(photo){
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    };

    await products.save();
    res.status(201).send({
        success: true,
        message: "Product Added Successfully",
        products,
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};


// Get All Products
export const getProductsController = async(req,res) => {
    try {
        const productsall = await ProductModel.find({}).populate("category").select(" -photo ").limit(12).sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            message: "All Products Fetched Successfully",
            countTotal : productsall.length,
            productsall,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in creating product",
          error,
        });
      }
};

export const getSingleProductsController = async(req,res) => {
    try {
        const product = await ProductModel.findOne({slug: req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched Successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error Getting Single Product",
          error,
        });
      }
};

export const productPhotoController = async(req,res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error Getting Product Image",
          error,
        });
      }
};

export const deleteProductController = async(req,res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Ddeleted SucessFully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error Getting Product Image",
          error,
        });
      }
};

export const updateProductController = async(req,res) => {
    try {
        const { name, slug, description, price, quantity, category, shipping } =
          req.fields;
        const { photo } = req.files;
    
        // Validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required" });
          case !description:
            return res.status(500).send({ error: "Description is Required" });
          case !price:
            return res.status(500).send({ error: "Price is Required" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required" });
          case !category:
            return res.status(500).send({ error: "Category is Required" });
          case photo && photo.size > 1000000:
            return res.status(500).send({error: "Photo is required and should be less than 1mb"});  
        }
    
        const products = await ProductModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug: slugify(name)}, {new: true});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        };
    
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        })
    
    
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in Updating product",
          error,
        });
      }
};

// Product Filter
export const productFiltersController = async(req,res) => {
  try {
    const {checked, radio} = req.query;
    let args = {};
    if (checked && checked.length > 0) args.category = checked;
    if (radio && radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    const lenghtfil = products.length;
    console.log("Lenght of filtered search",products.length); // Output length of products to console
    res.status(200).send({
      success: true,
      products,
      lenghtfil
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req,res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting product count",
      success: false,
      error
    });
  }
}

// Products per page
export const productListPageController = async (req,res) => {
  try {
    const perPage = 9;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({createdAt: -1});
    res.status(200).send({
      success: true,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting per page products",
      success: false,
      error
    });
  }
};

// search product controller
export const searchProductController = async (req,res) => {
  try {
    const {keyword} = req.params;
    const results = await ProductModel.find({
      $or: [
        {name: {$regex: keyword, $options: "i"}},
        {description: {$regex: keyword, $options: "i"}},
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting Searched products",
      success: false,
      error
    });
  }
};

// similar products
export const similarProductsController = async (req,res) => {
  try {
    const {pid,cid} = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: {$ne:pid},
    }).select("-photo").limit(4).populate("category");
    res.status(200).send({
      success: true,
      message: "Success in similar products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting Searched products",
      success: false,
      error
    });
  }
};


// Products as per category controller
export const productpercategoryController = async (req,res) => {
try{
  const category = await Categorymodel.findOne({ slug: req.params.slug });
  const products = await ProductModel.find({ category }).populate("category");
  res.status(200).send({
    success: true,
    category,
    products,
  })
} catch (error) {
  console.log(error);
  res.status(400).send({
    message: "Error in getting Searched products",
    success: false,
    error
  });
  }
};

// payment api get token from braintree
export const braintreeTokenController = async (req,res) => {
try {
  gateway.clientToken.generate({}, function(err,response){
    if(err){
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
} catch (error) {
  console.log(error);
}
};

// payment purpose
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};