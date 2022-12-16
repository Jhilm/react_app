import { Fragment, useRef } from "react";
import useCanvasContext from "../hooks/useCanvasContext";

const Buffer = require("buffer").Buffer;
const BtnExtra = () => {
  const app_ctx = useCanvasContext();
  const button_download = useRef();
  const thickness_tool = useRef();
  function clear() {
    const canvas = document.getElementById(app_ctx.ID_CANVAS);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvas_backing = document.getElementById(app_ctx.ID_CANVAS_AUX);
    var ctx2 = canvas_backing.getContext("2d");
    ctx2.clearRect(0, 0, canvas_backing.width, canvas_backing.height);
  }

  const download = () => {
    const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
    button_download.current.setAttribute(
      "href",
      mainCanvas.toDataURL(app_ctx.IMAGE_FORMAT)
    );
  };
  function save() {
    const mainCanvas = document.getElementById(app_ctx.ID_CANVAS);
    let images = app_ctx.IMAGES;
    let imageDataUrl = mainCanvas.toDataURL(app_ctx.IMAGE_FORMAT);
    //let imageDataUrl = mainCanvas.toDataURL();
    const imageBuffer = Buffer.from(
      imageDataUrl.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    let img_aux = {
      id: app_ctx.IMAGES.length + 1,
      name: "image_" + (app_ctx.IMAGES.length + 1),
      data: imageBuffer,
    };
    app_ctx.EVENT_SAVE.setValue(true);
    images.push(img_aux);
    app_ctx.setImage(images);
    api_save_image(img_aux);
  }
  function api_save_image(img) {
    const body = JSON.stringify(img);
    const headers = { "Content-Type": "application/json" };

    fetch("http://127.0.0.1:3001/saveImage", {
      method: "POST",
      body,
      headers,
    });
    console.log(img.data);
    const dataString = img.data.toString("base64");
    const imageElement = document.createElement("img");
    imageElement.src = `data:image/png;base64,${dataString}`;
    document.body.appendChild(imageElement);
  }

  function setPencilThickness() {
    app_ctx.THICKNESS = thickness_tool.current.value;
  }
  return (
    <Fragment>
      <input
        defaultValue={1}
        type="range"
        id="thickness-tool"
        min={1}
        max={20}
        ref={thickness_tool}
        onChange={setPencilThickness}
      ></input>
      <button className="w3-button w3-pale-green " onClick={clear}>
        limpiar
      </button>
      <button className="w3-button w3-pale-blue " onClick={save}>
        guardar
      </button>

      <a
        ref={button_download}
        id="download"
        download="imagen.jpg"
        className="w3-button"
        onClick={download}
      >
        descargar
      </a>
    </Fragment>
  );
};

export default BtnExtra;
