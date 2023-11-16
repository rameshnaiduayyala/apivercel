import sequelize from "./src/config/db.config.js";
import express from "express";
import roleRoute from "./src/routes/role.router.js";
import userRoleRoute from "./src/routes/user.role.router.js";
import imprestRoute from "./src/routes/imprest.router.js";
import userRoute from "./src/routes/user.router.js";
import productRoute from "./src/routes/product.router.js";
import genericRoute from "./src/routes/generic.router.js";
import brandRoute from "./src/routes/brand.router.js";
import packUomRoute from "./src/routes/pack.uom.router.js";
import uomRoute from "./src/routes/uom.router.js";
import hospital from "./src/routes/hospital.router.js";
import productFromRoute from "./src/routes/productform.router.js";
import authRoute from "./src/routes/auth.router.js";
import imprestProductRoute from "./src/routes/imprest.products.router.js";
import externalAuthRoute from "./src/routes/external.auth.router.js";
import db_sync from "./src/models/db.sync.js";
import cors from "cors";

const port = process.env.PORT || 2000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/role', roleRoute);
app.use('/api/userrole', userRoleRoute);
app.use('/api/imprest', imprestRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/generic', genericRoute);
app.use('/api/brand', brandRoute);
app.use('/api/packuom', packUomRoute);
app.use('/api/uom', uomRoute);
app.use('/api/productform', productFromRoute);
app.use('/api/hospital', hospital);
app.use('/api/auth', authRoute);
app.use('/api/imprestproduct', imprestProductRoute);
app.use('/api/role/check', externalAuthRoute);
db_sync();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});