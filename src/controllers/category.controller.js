import Category from '../models/category.model.js';
import mongoose from 'mongoose';

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).send(category)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getCategoryById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        const category = await Category.findById(req.params.id)
        res.send(category)
    } catch (error) {
        res.send(404).json(error)
    }
}

export const createCategory = async (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    });
    try {
        const result = await newCategory.save()
        res.status(201).json({
            success: true,
            message: 'Created Category unsuccessful!'
        });
    } catch (error) {
        res.status(400).send('Created Category unsuccessful!')
    }
}

export const updateCategory = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Category Id');
    }
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, { new: true })
        
        res.status(200).json({
            success: true,
            message: 'Updated Category successfully!'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

export const deleteCategory = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        await Category.findByIdAndRemove(req.params.id)
        res.status(200).json({
            success: true,
            message : 'The category is deleted!'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error:error
        })
    }
}

