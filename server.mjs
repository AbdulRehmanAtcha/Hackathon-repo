import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import multer from "multer";
import bucket from "./firebaseAdmin/index.mjs";
// import fs from 'fs'
const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
const MongoDBURI =
  process.env.MongoDBURI ||
  "mongodb+srv://abdul:abdulpassword@cluster0.zcczzqa.mongodb.net/test?retryWrites=true&w=majority";
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
    origin: true,
  })
);

app.use(express.json());
app.use(cookieParser());
const storageConfig = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    console.log("mul-file: ", file);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});
var uploadMiddleware = multer({ storage: storageConfig });

const SaylaniLogsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});
const logsModel = new mongoose.model("UserData", SaylaniLogsSchema);

let itemsSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now },
  pictureURL: { type: String },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  unitName: { type: String, required: true },
  unitPrice: { type: String, required: true },
});
const itemsModel = mongoose.model("Items", itemsSchema);

const OrderSchema = new mongoose.Schema({
  orderName: { type: String },
  orderPhone: { type: Number },
  orderEmail: { type: String },
  orderPrice: { type: String },
//   owner: { type: mongoose.ObjectId, required: true },
});
const orderModel = new mongoose.model("UserOrder", OrderSchema);

app.post("/api/v1/register", async (req, res) => {
  const body = req.body;
  const registerEmployee = new stringToHash(body.password).then(
    (hashString) => {
      logsModel.create(
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          password: hashString,
        },
        (err, data) => {
          if (!err) {
            res.send({
              message: "Signup Successfull",
            });
            res.status(200);
          } else {
            res.send(err);
          }
        }
      );
    }
  );
});

app.post("/api/v1/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const UserData = await logsModel.findOne({ email: email });
  if (UserData) {
    // console.log(UserData);
    varifyHash(password, UserData.password).then((isMatched) => {
      if (isMatched) {
        const token = jwt.sign(
          {
            _id: UserData._id,
            name: UserData.name,
            email: UserData.email,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          },
          SECRET
        );

        // console.log("token: ", token);

        res.cookie("Token", token, {
          maxAge: 86_400_000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        if (UserData.isAdmin === true) {
          res.send({
            message: "Admin login successful",
            profile: {
              email: UserData.email,
              name: UserData.name,
              _id: UserData._id,
            },
          });
        } else {
          res.send({
            message: "User login successful",
            profile: {
              email: UserData.email,
              name: UserData.name,
              _id: UserData._id,
            },
          });
        }
      } else {
        res.send("Invalid Email Or Password");
      }
    });
  } else {
    res.send("Invalid Email Or Password");
  }
});

app.use("/api/v1", (req, res, next) => {
  console.log("req.cookies: ", req.cookies);

  if (!req?.cookies?.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }

  jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401);
        res.cookie("Token", "", {
          maxAge: 1,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.send({ message: "token expired" });
      } else {
        console.log("token approved");

        req.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

const gettingUser = async (req, res) => {
  let _id = "";
  if (req.params.id) {
    _id = req.params.id;
  } else {
    _id = req.token._id;
  }

  try {
    const user = await logsModel
      .findOne({ _id: _id }, "name email -_id")
      .exec();
    if (!user) {
      res.status(404);
      res.send(user);
      return;
    } else {
      res.status(200);
      res.send({ user });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500);
    res.send({
      message: "Error",
    });
  }
};

app.get("/api/v1/profile", gettingUser);

app.post("/api/v1/product", uploadMiddleware.any(), (req, res) => {
  const body = req.body;

  if (!body.description) {
    res.status(404);
    res.send({
      message: "All Inputs Are Required",
    });
    return;
  }
  // products.push(
  //     {
  //         id: new Date().getTime(),
  //         name: body.name,
  //         price: body.price,
  //         description: body.description

  //     }
  // )
  const token = jwt.decode(req.cookies.Token);
  console.log("Token", token);

  console.log("req.body: ", req.body);
  //   console.log("req.body: ", JSON.parse(req.body.myDetails));
  console.log("req.files: ", req.files);

  console.log("uploaded file name: ", req.files[0].originalname);
  console.log("file type: ", req.files[0].mimetype);
  console.log("file name in server folders: ", req.files[0].filename);
  console.log("file path in server folders: ", req.files[0].path);

  bucket.upload(
    req.files[0].path,
    {
      destination: `PostPictures/${req.files[0].filename}`,
    },
    function (err, file, apiResponse) {
      if (!err) {
        file
          .getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          })
          .then((urlData, err) => {
            if (!err) {
              console.log("public downloadable url: ", urlData[0]);
              // res.send("Ok");
              itemsModel.create(
                {
                  description: body.description,
                  pictureURL: urlData[0],
                  name: body.name,
                  category: body.category,
                  unitName: body.unitName,
                  unitPrice: body.unitPrice,
                },
                (err, saved) => {
                  if (!err) {
                    console.log(saved);

                    res.send({
                      message: "your product is saved",
                    });
                  } else {
                    console.log("Not Gone");
                    res.status(500).send({
                      message: "server error",
                    });
                  }
                }
              );
            }
          });
      } else {
        console.log("err: ", err);
        res.status(500).send();
      }
    }
  );

  // res.send({
  //     message: "Product Added Successfully!",
  //     data: products
  // });
});

app.get("/api/v1/products", (req, res) => {
  itemsModel.find({}, (err, data) => {
    if (!err) {
      res.send({
        data: data,
        message: "Got All products Successfully",
      });
    } else {
      res.send({
        message: "Server Error",
      });
      res.status(500);
    }
  });
});

app.get("/api/v1/products", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.token._id);
  try {
    const data = await orderModel
      .find({ owner: userId })
      // .select({description: 0, name: 0}) // projection
      .sort({ _id: -1 })
      .exec();

    res.send({
      message: "Got All Products",
      data: data,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "server error",
    });
  }
});
app.post("/api/v1/order", async (req, res) => {
  const body = req.body;
  if (!body.orderName || !body.orderEmail || !body.orderPhone) {
    res.status(400);
    res.send({
      message: "All Inputs Are Required",
    });
    return;
  }
  const addingOrder = await orderModel.create(
    {
      orderName: body.orderName,
      orderEmail: body.orderEmail,
      orderPhone: body.orderPhone,
      orderPrice: body.orderPrice,
    //   owner: new mongoose.Types.ObjectId(token._id),
    },
    (err, saved) => {
      if (!err) {
        // console.log("Employee Saved");
        res.send({
          message: "Order Confirmed",
        });
        return;
      } else {
        res.send({
          message: "Not Confirmed",
        });
        res.status(500);
        console.log(err);
        // console.log(err);
      }
    }
  );
  // console.log(adding);
});

app.get("/api/v1/allOrderAdmin", (req, res) => {
    orderModel.find({}, (err, data) => {
      if (!err) {
        res.send({
          data: data,
          message: "Got All products Successfully",
        });
      } else {
        res.send({
          message: "Server Error",
        });
        res.status(500);
      }
    });
  });



app.use("/", express.static(path.join(path.resolve(__dirname), "./web/build")));
app.use("*", express.static(path.join(path.resolve(__dirname), "./web/build")));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(MongoDBURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
