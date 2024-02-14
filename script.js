const linkInput = document.querySelector(".link-input");
const submit = document.querySelector(".submit");
const linkContainer = document.querySelector(".shortened-links");

const url = "https://cleanuri.com/api/v1/shorten";

const getData = async function (link) {
  const res = await fetch(
    `https://is.gd/create.php?format=json&url=https://${link}`
  );
  const data = await res.json();

  if (data.shorturl) {
    let html = `<div class="shortened-links--link">
    <p>https://www.${link}</p>
    <div class="clipboard">
      <p>${data.shorturl}</p>
      <a href="" class="copy">copy</a>
    </div>
  </div>`;
    // document.querySelector(".shortened-links").innerHTML += html;
    document
      .querySelector(".shortened-links")
      .insertAdjacentHTML("beforeend", html);
  }
};

linkInput.addEventListener("input", function () {
  document.querySelector(".err-msg").textContent = "";
  document.querySelector("input.link-input").style =
    "border: 1px solid transparent";
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (linkInput.value) {
    getData(linkInput.value);
  } else {
    document.querySelector(".err-msg").textContent = "please add a link";
    document.querySelector("input.link-input").style = "border: 1px solid red";
  }
});

linkContainer.addEventListener("click", function (e) {
  if (e.target.closest(".copy")) {
    e.preventDefault();
    const copyContent = async () => {
      try {
        const link = e.target.previousElementSibling.textContent;
        await navigator.clipboard.writeText(link);
        document.querySelectorAll(".copy").forEach((d) => {
          d.textContent = "copy";
          d.style.backgroundColor = "hsl(180, 66%, 49%)";
        });
        e.target.textContent = "copied!";
        e.target.style.backgroundColor = "hsl(255, 11%, 22%)";
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
    copyContent();
  }
});

let menu = document.querySelector(".menu");
let isOpen = false;
let navLinks = document.querySelector(".nav--links");
let navUser = document.querySelector(".nav--user");

menu.addEventListener("click", function () {
  if (isOpen) {
    navLinks.style.display = "none";
    navUser.style.display = "none";
    isOpen = !isOpen;
  } else {
    navLinks.style.display = "flex";
    navUser.style.display = "flex";
    isOpen = !isOpen;
  }
});
// https://is.gd/Pt2sET
