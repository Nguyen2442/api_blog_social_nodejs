import Tag from '../models/tag.model.js';
import mongoose from 'mongoose';

export const getAllTag = async (req, res) => {
    try {
        const tag = await Tag.find()
        res.send(tag)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        res.send(tag) 
    } catch (error) {
        res.send(404).json(error)
    }
}

export const createTag = async (req, res) => {
    const newTag = new Tag({
        name: req.body.name
    });
    try {
        const result = await newTag.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send('Create tag unsuccessful!')
    }
}

export const updateTag = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        const updateTag = await Tag.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        },
            {new:true}
        )
        res.status(200).json({
            success: true,
            message: 'The tag is updated!'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

export const deleteTag = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Tag Id');
    }
    try {
        await Tag.findByIdAndRemove(req.params.id);
        res.status(200).json({ success: true, message: 'The tag is deleted' })
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}
