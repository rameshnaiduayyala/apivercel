import UserCredential from "../models/user/credential.model.js";
import User from "../models/user/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isUserExisted } from "../validations/validation.js";
import UserRole from "../models/user/user.role.model.js";
import Role from "../models/user/role.model.js";

const SECRET_KEY = 'MySecret@123';

const Login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({
      where: { "user_name": user_name }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userCredential = await UserCredential.findOne({ where: { "user_id": user.id } });
    const isValid = await bcrypt.compare(password, userCredential.password);
    if (!isValid) {
      res.status(404).json({ error: 'Invliad user name or password!' });
    }
    const userRoles = await UserRole.findAll({ where: { user_id: user.id }, include: Role });
    const roleIds = userRoles.map((userRole) => userRole.role_id);
    const roledata = await Role.findAll({ where: { id: roleIds } });
    const roleNames = roledata.map((role) => role.dataValues);
    const tokenData = {
      time: Date(),
      userdata: user,
      roles:roleNames,
      hospital: user.hospital
    };

    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: '1h' });


    res.status(200).header("auth-token", token).send(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const Register = async (req, res) => {
  try {
    const user = req.body;
    let hasUser = await isUserExisted(user);

    if (hasUser) {
      return res.status(409).json({ error: 'Username already in use' });
    }
    const newUser = await User.create(user);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const userCredential = await UserCredential.create({
      user_id: newUser.id,
      password: hashedPassword,
      hash_key: salt,
      last_login_date: "",
      created_by: 1,
      updated_by: 1,
      hospital_id: user.hospital_id,
      locked: false,
    });

    res.status(201).json({ message: 'User registered', result: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const userData = async (req, res) => {
  const token = req.header('auth_header');
  try {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send("token expired");
      } else {
        console.log(decoded);
        res.status(200).json({ user: decoded });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", data: "Internal Server Error" });
  }
};


export default { Register, Login,userData }