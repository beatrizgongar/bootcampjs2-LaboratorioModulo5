import "./style.css";

/*-----VARIABLES------*/

let listaMezclada: number[] = [];
let listaPuntuacion: number[] = [];
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

/*-----FUNCION barajas INICIAL------*/
function barajar() {
  let listaOriginal: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
const calculaPuntuacion = () => {
  puntuacion = puntuacion + listaPuntuacion[numeroCarta];
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

/*-----FUNCION MUESTRA CARTA------*/
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

/*-----FUNCION DAME CARTA------*/
function dameCarta() {
  if (nuevaPartida == true) {
    iniciarNuevaPartida();
  } else if (numeroCarta < 11) {
    const carta = listaMezclada[numeroCarta];
    muestraCarta(carta);
    jugada(numeroCarta + 1, carta);
    calculaPuntuacion();
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
      const cartaPlantarse = listaMezclada[numeroCarta];
      muestraCarta(cartaPlantarse);
      jugada(numeroCarta + 1, cartaPlantarse);
      calculaPuntuacion();
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

barajar();
console.log("Array cartas : " + listaMezclada);
console.log("Array puntuacion : " + listaPuntuacion);

/*-----VALIDA SI ESTÁ EL DOM cargado------*/
document.addEventListener("DOMContentLoaded", muestraPuntuacion);
