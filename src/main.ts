import "./style.css";

/*-----VARIABLES------*/

let numeroCarta: number = 0;
let puntuacion: number = 0;
let nuevaPartida: boolean = false;
let plantado: boolean = false;

/*-----BOTONES------*/
const btDameCarta = document.getElementById("bt-dame-carta");
const btPlantarse = document.getElementById("bt-plantarse");

if (btDameCarta instanceof HTMLButtonElement) {
  btDameCarta.addEventListener("click", dameCarta);
}

if (btPlantarse instanceof HTMLButtonElement) {
  btPlantarse.addEventListener("click", plantarse);
}

/*-----FUNCION MUESTRA PUNTUACION------*/
function muestraPuntuacion() {
  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML =
      "Puntuación: " + puntuacion.toString() + " puntos";
  } else {
    console.error(
      "muestraPuntuacion: no se ha encontrado el elemento con id puntuacion"
    );
  }
}

/*-----FUNCION CALCULA PUNTUACION------*/
const calculaPuntuacion = (valorCarta: number) => {
  if (valorCarta > 7) {
    puntuacion += 0.5;
  } else puntuacion += valorCarta;
};

/*-----FUNCION MUESTRA MENSAJE------*/
function muestraMensaje(texto: string) {
  const elementoMensaje = document.getElementById("mensaje");
  if (elementoMensaje) {
    elementoMensaje.innerHTML = texto;
  } else {
    console.error(
      "muestraMensaje: no se ha encontrado el elemento con id mensaje"
    );
  }
}

/*-----FUNCION MUESTRA CARTA ARRIBA------*/
function muestraCarta(carta: number) {
  const cartaNew = document.getElementById("carta-back");
  const url = "/imagenes/";
  const url2 = "_copas.jpg";
  if (cartaNew instanceof HTMLImageElement) {
    cartaNew.src = url + carta + url2;
  }
}

/*-----FUNCION CONTROL GAME OVER------*/
function controlGameover() {
  if (puntuacion > 7.5) {
    muestraMensaje("TE PASASTE 😁");
  }
  if (puntuacion == 7.5) {
    muestraMensaje("¡Lo has clavado!¡Enhorabuena!🥳");
  }
  if (puntuacion >= 7.5) {
    deshabilitarBtPlantarse();
    textoBtDameCarta("Nueva partida");
    nuevaPartida = true;
  }
}
/*-----FUNCION INICIO DE NUEVA PARTIDA------*/
function iniciarNuevaPartida() {
  location.reload();
}

/*-----FUNCION ACTUALIZAR CARTA------*/
function actualizarCarta() {
  numeroCarta = numeroCarta + 1;
}

/*----FUNCION GENERAR NUMERO ALEATORIO ---*/
/* Math.floor(Math.random() * (max - min + 1) + 1)*/

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (10 - 1 + 1) + 1);
}
/*-----FUNCION DAME CARTA------*/
function dameCarta() {
  if (nuevaPartida == true) {
    iniciarNuevaPartida();
  } else if (numeroCarta < 11) {
    const carta = generarNumeroAleatorio();
    muestraCarta(carta);
    jugada(numeroCarta + 1, carta);
    calculaPuntuacion(carta);
    muestraPuntuacion();
    controlGameover();
    actualizarCarta();
  }
}

/*-----FUNCION MENSAJE QUE HABRIA PASADO------*/
function mensajeQueHabriaPasado() {
  if (puntuacion > 7.5) {
    muestraMensaje("Te habrías pasado 😁");
  }
  if (puntuacion == 7.5) {
    muestraMensaje("¡La habrías clavado!🙄");
  }
  if (puntuacion < 7.5) {
    muestraMensaje("¡No habrías llegado a  7 y media!🙄");
  }
}

/*-----FUNCION MENSAJE PLANTARSE------*/
function mensajePlantarse() {
  if (puntuacion < 4) {
    muestraMensaje("Has sido muy conservador 🙄");
  }
  if (puntuacion >= 4 && puntuacion < 6) {
    muestraMensaje("Te ha entrado el canguelo eh?🤭");
  }
  if (puntuacion >= 6 && puntuacion <= 7) {
    muestraMensaje("Casi casi....🫣");
  }
  if (puntuacion == 7.5) {
    muestraMensaje("¡Lo has clavado!¡Enhorabuena!🥳");
  }
}
/*-----FUNCION DESHABILITAR BOTON PLANTARSE------*/
function deshabilitarBtPlantarse() {
  if (btPlantarse instanceof HTMLButtonElement) {
    btPlantarse.disabled = true;
  }
}

/*-----FUNCION TEXTO BOTON PLANTARSE------*/
function textoBtPlantarse(texto: string) {
  if (btPlantarse instanceof HTMLButtonElement) {
    btPlantarse.textContent = texto;
  }
}

/*-----FUNCION TEXTO BOTON DAME CARTA------*/
function textoBtDameCarta(texto: string) {
  if (btDameCarta instanceof HTMLButtonElement) {
    btDameCarta.textContent = texto;
  }
}
/*-----FUNCION QUE HUBIERA PASADO------*/
function QueHubieraPasado() {
  textoBtDameCarta("Nueva partida");
  nuevaPartida = true;
  if (puntuacion == 7.5) {
    deshabilitarBtPlantarse();
  } else {
    textoBtPlantarse("Qué hubiera pasado?");
    plantado = true;
  }
}

/*-----FUNCION PLANTARSE------*/
function plantarse() {
  if (plantado == true) {
    if (numeroCarta < 11) {
      const cartaPlantarse = generarNumeroAleatorio();
      muestraCarta(cartaPlantarse);
      jugada(numeroCarta + 1, cartaPlantarse);
      calculaPuntuacion(cartaPlantarse);
      muestraPuntuacion();
      mensajeQueHabriaPasado();
      numeroCarta = 12;
    }
    deshabilitarBtPlantarse();
  } else {
    mensajePlantarse();
    QueHubieraPasado();
  }
}

/*-----FUNCION JUGADA------*/
function jugada(carta: number, valor: number) {
  const idCarta = "carta" + carta;
  const cartaJugada = document.getElementById(idCarta);
  const url = "/imagenes/";
  const url2 = "_copas.jpg";
  if (cartaJugada instanceof HTMLImageElement) {
    cartaJugada.src = url + valor + url2;
  }
}

/*-----VALIDA SI ESTÁ EL DOM cargado------*/
document.addEventListener("DOMContentLoaded", muestraPuntuacion);
