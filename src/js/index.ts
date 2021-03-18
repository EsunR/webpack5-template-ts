import img from "@/img/webpack.png"
import "@/styles/index.scss"

const app = document.querySelector("#app")
app.innerHTML = "Hello webpack"

const imgDom = document.createElement("img")
imgDom.src = img
imgDom.style.display = "block"
app.appendChild(imgDom)
