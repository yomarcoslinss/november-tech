const iconMenu = document.querySelector("#i-menu");
const iconClose = document.querySelector("#i-close");
const backToTopButton = document.querySelector(".back-to-top");
const navMobile = document.querySelector("#nav-mobile");
const linksNav = document.querySelectorAll(".scroll-link");

const obterEstilo = (elemento) => {
  const style = window.getComputedStyle(elemento);
  return style;
};

const alterarIcone = (iconeVisivel, iconeOculto) => {
  if (obterEstilo(iconeVisivel).display == "flex") {
    iconeVisivel.style.display = "none";
    iconeOculto.style.display = "flex";
  }
};

const estadoNavMobile = (estado) => {
  if (obterEstilo(navMobile).display == "none" && estado == true) {
    navMobile.style.display = "flex";
  } else {
    navMobile.style.display = "none";
  }
};

iconMenu.onclick = function () {
  alterarIcone(iconMenu, iconClose);
  estadoNavMobile(true);
};

iconClose.onclick = function () {
  alterarIcone(iconClose, iconMenu);
  estadoNavMobile(false);
};

linksNav.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alterarIcone(iconClose, iconMenu);
    estadoNavMobile(false);

    const targetId = link.getAttribute("href").substring(1);

    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      if (targetSection.id == "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      const targetOffset = targetSection.offsetTop - 50;

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    }
  });
});

window.onresize = () => {
  if (window.innerWidth >= 1024) {
      alterarIcone(iconClose, iconMenu);
      estadoNavMobile(false);
  }
};

const teste = window.scrollY;


window.onscroll = () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.remove('hide');
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
    backToTopButton.classList.add('hide');
  }
}

/* Matheus */
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");
  const submitButton = document.getElementById("submitButton");
  const gif = document.querySelector(".form-modal");

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScrollToTop();
  });

  function smoothScrollToTop() {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
  




  submitButton.addEventListener("click", async function () {
    const form = document.querySelector(".form");
    if (!form.checkValidity()) {
      return;
    }

    const nome = document.querySelector('input[name="Nome"]').value;
    const telefone = document.querySelector('input[name="Telefone"]').value;
    const data = document.querySelector('input[name="Data"]').value;

    gif.style.visibility = "visible";

    try {
      const response = await axios.post(
        "https://api.sheetmonkey.io/form/fTYFcmDnwrRnajeJTcPMnh",
        {
          Nome: nome,
          Telefone: telefone,
          Data: data,
        }
      );

      response.data;

      setTimeout(function () {
        gif.style.visibility = "hidden";
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  });

  $(function () {
    $("#datepicker").datepicker({
      minDate: 0,
      dateFormat: "dd/mm/yy",
    });
  });
});

function formatarTelefone(input) {
  let numero = input.value.replace(/\D/g, "");

  if (numero.length > 2) {
    numero = "(" + numero.substring(0, 2) + ") " + numero.substring(2);
  }
  if (numero.length > 10) {
    numero = numero.substring(0, 10) + "-" + numero.substring(10);
  }

  input.value = numero;
}


const elementosClicaveis = document.querySelectorAll(".click");
let fotoClicada = null;

elementosClicaveis.forEach(elemento => {
  elemento.addEventListener("click", () => {
    if (fotoClicada !== null) {
      fotoClicada.classList.remove("verde");
      fotoClicada.querySelector(".texto-escondido").style.display = "none";
    }

    elemento.classList.add("verde");
    elemento.querySelector(".texto-escondido").style.display = "block";

    
    elemento.classList.remove("animacao-rapida");

 
    elemento.classList.add("animacao-lenta");

    fotoClicada = elemento;
  });
});