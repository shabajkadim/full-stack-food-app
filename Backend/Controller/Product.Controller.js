
import ProdutSchema from "../Modal/Produt.Schema.js";

export const AddProduct = async (req, res) => {
    try {
        // const { name, category, image, price, description } = req.body; 
        const { name, category, image, price, description } = req.body.uploadedData

        if (!name || !category || !image || !price || !description) {
            return res.status(400).send("All fields are required"); 
        }
    
        const product = new ProdutSchema({
            name: name,
            category: category,
            image: image,
            price: price,
            description: description
        });
        await product.save();
        return res.status(200).json({ success: true, message: "uploaded successfully" }); 
    } catch (error) {
        return res.status(500).json({ error:error, success:false });
    }
};


export const getProduct=async(req,res)=>{
    try{
        const getAllData=await ProdutSchema.find({})
    res.status(200).json({getAllData:getAllData,success:true})
    }catch(error){
        console.log(error);
        return res.status(500).json({error:error})
    }
}