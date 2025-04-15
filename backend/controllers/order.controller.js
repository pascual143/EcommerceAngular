const Order = require('../models/order.model');
const Product = require('../models/product.model'); // Necesitamos el modelo de Producto para verificar el stock

// Crear un nuevo pedido (requiere autenticación de cliente)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    const userId = req.user._id; // El ID del usuario autenticado está en req.user

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No hay productos en el pedido' });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: 'La dirección de envío es requerida' });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Verificar el stock y calcular el total
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Producto no encontrado con ID: ${item.productId}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price // Guardar el precio al momento de la compra
      });
    }

    // Crear el nuevo pedido
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    // Guardar el pedido en la base de datos
    const savedOrder = await newOrder.save();

    // Actualizar el stock de los productos comprados
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

// Obtener los pedidos de un usuario (requiere autenticación de cliente)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.productId', 'name image'); // Populate para mostrar información del producto
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos del usuario', error: error.message });
  }
};

// Obtener un pedido específico por ID (requiere autenticación de cliente o administrador)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email').populate('items.productId', 'name image');
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    // Verificar si el usuario actual tiene permiso para ver este pedido (es el dueño o es administrador)
    if (req.user.role !== 'admin' && order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para ver este pedido' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

// Listar todos los pedidos (solo para administradores)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email').populate('items.productId', 'name image');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todos los pedidos', error: error.message });
  }
};

// Actualizar el estado de un pedido (requiere autenticación y rol de administrador)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('userId', 'username email').populate('items.productId', 'name image');
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
  }
};