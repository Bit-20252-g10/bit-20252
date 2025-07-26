import User from "../models/index.js";
import jwt from "jsonwebtoken";
import 'dotenv/config.js';

// Leer todos los usuarios
export const getAllusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un usuario
export const createUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                detail: "Los campos email y contraseña son requeridos"
            });
        }

        const userInDB = await User.findOne({ email: email });
        if (userInDB) {
            return res.status(400).json({
                detail: `El ${email} ya se encuentra en uso`
            });
        }

        const user = new User({
            email: email,
            password: password
        });

        await user.save();

        res.status(201).json({
            detail: `La cuenta con ${email} se creó satisfactoriamente`
        });

    } catch (error) {

        console.error("Error al crear usuario:", error);
        res.status(500).json({
            detail: "Ocurrió un error en esta solicitud"
        });
    }
};
// Iniciar un usuario (Ya existente, pero con nota de seguridad)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                detail: "Los campos email y contraseña son requeridos"
            });
        }

        const userInDB = await User.findOne({ email: email });
        if (!userInDB) {
            return res.status(404).json({ detail: `El email ${email} no se encuentra registrado` });
        }

        // --- IMPORTANTE: Aquí DEBES comparar la contraseña hasheada. ---
        // Tu código actual compara la contraseña en texto plano, lo cual es MUY INSEGURO.
        // Usa `bcrypt.compare(password, userInDB.password)` si hasheaste al guardar.
        const isCorrectPassword = userInDB.password === password; // ¡Cambia esto por bcrypt.compare!
        // Ejemplo: const isCorrectPassword = await bcrypt.compare(password, userInDB.password);
        // --- FIN IMPORTANTE ---

        if (!isCorrectPassword) {
            return res.status(400).json({ detail: `Contraseña incorrecta` });
        }

        const userData = { id: userInDB._id, email: userInDB.email }; // Envía el ID para el JWT
        res.status(200).json({
            detail: "Usuario logeado correctamente",
            jwt: generateAuthToken(userData) // Usa el helper definido arriba
        });

    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({
            detail: "Ocurrió un error en esta solicitud"
        });
    }
};

// Obtener un usuario por ID
export const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password'); // Excluye la contraseña

        if (!user) {
            return res.status(404).json({
                detail: 'Usuario no encontrado'
            });
        }

        res.status(200).json(user);
    } catch (error) {
       
        if (error.name === 'CastError') {
            return res.status(400).json({
                detail: 'Formato de ID de usuario inválido'
            });
        }
        console.error(error); // Para depuración
        res.status(500).json({
            detail: 'Ocurrió un error en esta solicitud'
        });
    }
};

// Actualizar un usuario por ID

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { email, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                detail: 'Usuario no encontrado'
            });
        }



        // Actualizar email si se proporciona
        if (email && email !== user.email) {
            const emailInUse = await User.findOne({ email: email });
            if (emailInUse && emailInUse._id.toString() !== userId) {
                return res.status(400).json({
                    detail: `El email ${email} ya se encuentra en uso por otra cuenta`
                });
            }
            user.email = email;
        }

        // Actualizar contraseña si se proporciona
        if (password) {

            user.password = password;

        }

        const updatedUser = await user.save();

        res.status(200).json({
            detail: `Usuario con ID ${userId} actualizado satisfactoriamente`,
            _id: updatedUser._id,
            email: updatedUser.email,

        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                detail: 'Formato de ID de usuario inválido'
            });
        }
        console.error(error); // Para depuración
        res.status(500).json({
            detail: 'Ocurrió un error en esta solicitud'
        });
    }
};

// Eliminar un usuario por ID

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                detail: 'Usuario no encontrado'
            });
        }



        await User.deleteOne({ _id: userId });

        res.status(200).json({
            detail: `Usuario con ID ${userId} eliminado satisfactoriamente`
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                detail: 'Formato de ID de usuario inválido'
            });
        }
        console.error(error); // Para depuración
        res.status(500).json({
            detail: 'Ocurrió un error en esta solicitud'
        });
    }
};