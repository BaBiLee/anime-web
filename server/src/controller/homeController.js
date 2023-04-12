import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM bookingticketmovie.tbl_registration"
  );
  return res.render("index.ejs", { dataUser: rows });
};

let getDetailPage = async (req, res) => {
  let userId = req.params.userId;
  let user = await pool.execute(
    "SELECT * FROM bookingticketmovie.tbl_registration WHERE user_id= ?",
    [userId]
  );

  return res.send(JSON.stringify(user[0]));
};

let createNewUser = async (req, res) => {
  let { name, email, phone, age, gender } = req.body;
  await pool.execute(
    "INSERT INTO bookingticketmovie.tbl_registration(name, email, phone, age, gender) values (?, ?, ?, ?, ?)",
    [name, email, phone, age, gender]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(
    "DELETE FROM bookingticketmovie.tbl_registration WHERE user_id = ?",
    [userId]
  );
  return res.redirect("/");
};

let getEditPage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute(
    "SELECT * FROM bookingticketmovie.tbl_registration WHERE user_id= ?",
    [userId]
  );
  return res.render("update.ejs", { dataUser: user[0] });
};

let postUpdateUser = async (req, res) => {
  let { user_id, name, email, phone, age } = req.body;
  console.log(req.body);
  console.log(email);
  console.log(user_id);
  await pool.execute(
    "UPDATE bookingticketmovie.tbl_registration SET name = ?, email = ?, phone = ?, age = ? WHERE user_id = ?",
    [name, email, phone, age, user_id]
  );
  return res.redirect("/");
};

let getUploadFilePage = async (req, res) => {
  return res.render("uploadFile.ejs");
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.filename + "-" + Data.now() + path.extname(file.originalname)
    );
  },
});



let postUploadFilePage = async (req, res) => {
  let upload = multer({
    storage: storage,
    fileFilter: helplers.imageFilter,
  }).single("profile_pic");
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    res.send(
      'You have upload this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./"> Upload another image </a>'
    );
  });
};

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage,
  postUploadFilePage,
};
