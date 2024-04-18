import path from "path";

const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: "backend/templates/emails",
    defaultLayout: false,
    partialsDir: "backend/templates/emails",
  },
  viewPath: path.resolve("backend/templates/emails"),
  extName: ".hbs",
};
module.exports = handlebarOptions;
