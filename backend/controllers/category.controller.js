const Category = require('../models/category.model');

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
  }
};

// Obtener una categoría específica por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error: error.message });
  }
};

// Crear una nueva categoría (requiere autenticación y rol de administrador)
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la categoría', error: error.message });
  }
};

// Actualizar una categoría existente (requiere autenticación y rol de administrador)
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la categoría', error: error.message });
  }
};

// Eliminar una categoría (requiere autenticación y rol de administrador)
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
  }
};