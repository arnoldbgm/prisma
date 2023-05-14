import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos lso datos de los productos
export const product = async (req, res) => {
  const productsRes = await prisma.producto.findMany({
    include: {
      cantidad: true,
      distribuidor: {
        select: {
          nombre: true,
          direccion: true,
          telefono: true,
        },
      },
    },
  });
  res.json(productsRes);
};

export const createdistrib = async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const distrib = await prisma.distribuidor.create({
    data: {
      direccion,
      nombre,
      telefono,
    },
  });
  res.json({ res: "Distribuidor creado exitosamente", distrib });
};

export const getDistrib = async (req, res) => {
  const distrib = await prisma.distribuidor.findMany();
  res.status(201).json(distrib);
};

export const createProduct = async (req, res) => {
  try {
    // Obtenemos la informacion del body que enviamos
    const { nombre_producto, precio, cantidad, distribuidor } = req.body;

    // Buscamos el distribuidor y guardamos su id
    const findDistribuidor = await prisma.distribuidor.findUnique({
      where: {
        nombre: distribuidor,
      },
    });
    if (!findDistribuidor)
      return res.status(404).json({ msg: "Tu distribuidor no existe" });
    // Hasta aqui obtenemos el distribuidor de la bd

    // Creamos nuestro nuevo producto
    const product = await prisma.producto.create({
      data: {
        nombre_producto,
        precio,
        id_distribuidor: findDistribuidor.id_distribuidor,
      },
    });

    const cantid = await prisma.cantidad.create({
      data: {
        cantidad,
        id_producto: product.id_producto,
      },
    });

    res.json({
      msg: "Creado exitosamente",
      nombre_producto,
      precio,
      cantidad,
      distribuidor,
    });
  } catch (err) {
    console.log(`Error server ${err}`);
  }
};

export const ventProd = async (req, res) => {
  try {
    const { id_producto, id_consumidor, cantidad } = req.body;
  
    if(cantidad <=  0) return res.status(401).json({msg: "No seas don cangrejo debes de poner un numero valido 😎"})
    // Encontramos el id del consumidor
    const consum = await prisma.consumidor.findUnique({
      where: {
        id_consumidor,
      },
    });

    if (!consum)
      return res.status(404).json({ msg: "No se encontro el consumidor" });

    const product = await prisma.producto.findUnique({
      where: {
        id_producto,
      },
      select: {
        cantidad: true,
      },
    });

    if (!product)
      return res.status(404).json({ msg: "No se encontro el producto" });

    if (product.cantidad.cantidad < cantidad)
      return res
        .status(401)
        .json({ msg: "La cantidad excede al valor del inventario" });

    await prisma.cantidad.update({
      where: { id_producto },
      data: {
        cantidad: product.cantidad.cantidad - cantidad,
      },
    });
    res.status(201).json({
      msg: "Venta Exitosa",
      id_producto,
      id_consumidor,
      cantidad,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error server" });
  }
};
