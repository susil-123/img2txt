const express = require("express");
const app = express();
const path = require("path");

const nodemailer = require("nodemailer");
// app.use('/public',express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index");
});
app.post("/sendMail", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "susilkumar.ct20@bitsathy.ac.in",
      pass: "stevejobs@2002A",
    },
  });
  var mailoptions = {
    from: "susilkumar.ct20@bitsathy.ac.in",
    to: `${req.body.email}`,
    subject: "mailtxt",
    text: `${req.body.msg}`,
    attachments:[
      {filename:`${req.body.file}`}
    ]
  };
  transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Emails sent:" + info.response);
    }
  });

  res.status(200).json({
    statua: "success",
    data: {
      name: req.body.name,
      mail: req.body.email,
      text: req.body.msg,
      file: req.body.file
    },
  });
});

app.listen(8000, () => {
  console.log("server is running on 4000");
});
