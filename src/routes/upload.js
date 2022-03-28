import express from "express";
import {cloudinary} from '../utils/cloudinary.js';
const uploadRoutes = express.Router();
import fs from "fs";

uploadRoutes.post('',(req, res) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "blog_social" },(err,result) => {
            try {
                removeTmp(file.tempFilePath)
                res.status(201).json({ public_id: result.public_id, url: result.secure_url })
            } catch (err) {
                res.json({err:msg.err})
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

// Delete image 
uploadRoutes.post('/destroy', (req, res) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;
            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

export { uploadRoutes };