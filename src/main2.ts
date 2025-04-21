import "./style.css";

let listaOriginal: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let listaMezclada: number[] = [];
let listaPuntuacion: number[] = [];
let numeroCarta: number = 0;
let puntuacion: number = 0.0;
let nuevaPartida: boolean = false;
let plantado: boolean = false;

const btDameCarta = document.getElementById("bt-dame-carta");
const btPlantarse = document.getElementById("bt-plantarse");

if (btDameCarta instanceof HTMLButtonElement) {
  btDameCarta.addEventListener("click", dameCarta);
}

if (btPlantarse instanceof HTMLButtonElement) {
  btPlantarse.addEventListener("click", plantarse);
}

function muestraPuntuacion() {
  const resultadoElement = document.getElementById("puntuacion");
  if (resultadoElement !== null && resultadoElement !== undefined) {
    resultadoElement.innerHTML =
      "Puntuación: " + puntuacion.toString() + " puntos";
  }
}
function muestraMensaje(texto: string) {
  const resultadoElement = document.getElementById("mensaje");
  if (resultadoElement !== null && resultadoElement !== undefined) {
    resultadoElement.innerHTML = texto;
  }
}
function dameCarta() {
  if (nuevaPartida == true) {
    location.reload();
  } else if (numeroCarta < 11) {
    muestraCarta(listaMezclada[numeroCarta]);
    jugada(numeroCarta + 1, listaMezclada[numeroCarta]);
    puntuacion = puntuacion + listaPuntuacion[numeroCarta];
    muestraPuntuacion();
    if (puntuacion > 7.5) {
      muestraMensaje("TE PASASTE 😁");
      if (
        btDameCarta instanceof HTMLButtonElement &&
        btPlantarse instanceof HTMLButtonElement
      ) {
        btPlantarse.disabled = true;
        btDameCarta.textContent = "Nueva partida";
        nuevaPartida = true;
      }
    }
    numeroCarta = numeroCarta + 1;
  }
}

function plantarse() {
  if (plantado == true) {
    if (numeroCarta < 11) {
      muestraCarta(listaMezclada[numeroCarta]);
      jugada(numeroCarta + 1, listaMezclada[numeroCarta]);
      puntuacion = puntuacion + listaPuntuacion[numeroCarta];
      muestraPuntuacion();
      if (puntuacion > 7.5) {
        muestraMensaje("Te habrías pasado 😁");
      }
      if (puntuacion == 7.5) {
        muestraMensaje("¡La habrías clavado!🙄");
      }
      if (puntuacion < 7.5) {
        muestraMensaje("¡No habrías llegado a  7 y media!🙄");
      }
      numeroCarta = 12;
    }
    if (btPlantarse instanceof HTMLButtonElement) {
      btPlantarse.disabled = true;
    }
  } else {
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
    if (
      btDameCarta instanceof HTMLButtonElement &&
      btPlantarse instanceof HTMLButtonElement
    ) {
      btDameCarta.textContent = "Nueva partida";
      if (puntuacion == 7.5) {
        btPlantarse.disabled = true;
      } else {
        btPlantarse.textContent = "Qué hubiera pasado?";
        plantado = true;
      }
      nuevaPartida = true;
    }
  }
}

function muestraCarta(carta: number) {
  const cartaNew = document.getElementById("carta-back");
  const url = "/imagenes/";
  const url2 = "_copas.jpg";
  if (cartaNew instanceof HTMLImageElement) {
    cartaNew.src = url + carta + url2;
  }
}
function jugada(carta: number, valor: number) {
  const idCarta = "carta" + carta;
  const cartaJugada = document.getElementById(idCarta);
  const url = "/imagenes/";
  const url2 = "_copas.jpg";
  if (cartaJugada instanceof HTMLImageElement) {
    cartaJugada.src = url + valor + url2;
  }
}
function mezclar(lista: number[]) {
  // Copiamos la lista original para no modificarla
  let listaOriginal = lista.slice();

  while (listaOriginal.length > 0) {
    let posicion = Math.floor(Math.random() * listaOriginal.length);
    //Eliminamos el elemento de la listaOriginal
    let elemento = listaOriginal.splice(posicion, 1)[0];
    //Incluimos el elemento de la listaOriginal en la listaMezclada en la posicion[0]
    listaMezclada.unshift(elemento);
    //Cargamos la lista de puntuaciones
    if (listaMezclada[0] > 7 && listaMezclada[0] < 11) {
      listaPuntuacion.unshift(0.5);
    } else {
      listaPuntuacion.unshift(listaMezclada[0]);
    }
  }

  return listaMezclada;
}

mezclar(listaOriginal);
console.log("Array cartas : " + listaMezclada);
console.log("Array puntuacion : " + listaPuntuacion);
muestraPuntuacion();
