import "./css/style.css";
import yatoImage from "./yato-noragami.jpg";
import { greeting } from "./greeting";

const image = document.createElement("img");
image.src = yatoImage;

document.body.appendChild(image);
console.log(greeting);
