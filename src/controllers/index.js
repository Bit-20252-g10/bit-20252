import user from './user.js';

export const getAllusers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const newUser = new user({ email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const userFound = await user.findOne({ email });

    if (!userFound || userFound.password !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", user: userFound });
    const token = jwt.sign({ email, password });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}



