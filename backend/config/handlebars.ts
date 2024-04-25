import path from "path";

export const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: "backend/templates/emails",
    partialsDir: "backend/templates/emails",
  },
  viewPath: path.resolve("backend/templates/emails"),
  extName: ".hbs",
};
