"use strict";

// functions

class Person {
  constructor(...args) {
    args.forEach(({ name, value }) => (this[name] = value));
  }
}

function handleEvent(event) {
  event.preventDefault();

  const inputs = inputFlex.querySelectorAll("input");
  const data = new Person(...inputs);

  for (let index = 0; index < inputs.length; index++) {
    if (
      inputs[index].type === "password" ||
      inputs[index].type === "passwordConfirm"
    ) {
      continue;
    }
    data[inputs[index].name] = inputs[index].value;
  }

  localStorage.setItem(data.lastName, JSON.stringify(data));
}

function checkEmail(event) {
  const target = event.target;
  const email = target.value;
  const errorMsg = document.getElementById("email-error-text");

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.length === 0) {
    target.classList.remove("input-error");
    if (errorMsg) errorMsg.style.display = "none";
    return;
  }

  if (!emailRegex.test(email)) {
    target.classList.add("input-error");
    errorMsg.style.display = "block";
  } else {
    target.classList.remove("input-error");
    errorMsg.style.display = "none";
  }
}

function checkPassword(event) {
  const target =
    event.target.id === "password-origin"
      ? document.getElementById("password")
      : event.target;

  const psw = target.value;
  const errorMsg = document.getElementById("password-error-text");

  const pswOrigin =
    target.id === "password-origin"
      ? document.getElementById("password")
      : document.getElementById("password-origin");

  const pswOriginValue = pswOrigin.value;

  if (psw === "" && pswOriginValue === "") {
    target.classList.remove("input-error");
    if (errorMsg) errorMsg.style.display = "none";
    return;
  }

  if (psw !== pswOriginValue) {
    target.classList.add("input-error");
    errorMsg.style.display = "block";
  } else {
    target.classList.remove("input-error");
    errorMsg.style.display = "none";
  }
}

// form

const container = document.createElement("div");
container.classList.add("container");

const title = document.createElement("h1");
title.textContent = "CREATE AN ACCOUNT";

const subtitle = document.createElement("h2");
subtitle.textContent = "We always keep your name and email address private.";

const form = document.createElement("form");

const inputFlex = document.createElement("div");
inputFlex.classList.add("input-flex");

// fields

const fields = [
  { type: "text", placeholder: "First name", name: "firstName" },
  { type: "text", placeholder: "Last name", name: "lastName" },
  { type: "text", placeholder: "Display name", name: "displayName" },
  { type: "email", placeholder: "Email Address", name: "email" },
  { type: "password", placeholder: "Password", name: "password" },
  {
    type: "password",
    placeholder: "Password Confirmation",
    name: "passwordConfirm",
  },
];

fields.forEach((field) => {
  if (field.name === "email" || field.name === "passwordConfirm") {
    const wrapper = document.createElement("div");

    const input = document.createElement("input");
    input.type = field.type;
    input.placeholder = field.placeholder;
    input.name = field.name;

    const errorMsg = document.createElement("span");
    errorMsg.classList.add("error-msg");

    if (field.name === "passwordConfirm") {
      input.addEventListener("input", checkPassword);
      errorMsg.textContent = "Passwords do not match";
      errorMsg.id = "password-error-text";
      input.id = "password";
    } else {
      input.addEventListener("input", checkEmail);
      errorMsg.textContent = "Invalid email";
      errorMsg.id = "email-error-text";
    }

    wrapper.append(input, errorMsg);
    inputFlex.append(wrapper);
  } else {
    const input = document.createElement("input");
    input.type = field.type;
    input.placeholder = field.placeholder;
    input.name = field.name;

    if (field.name === "password") {
      input.id = "password-origin";
      input.addEventListener("input", checkPassword);
    }

    inputFlex.append(input);
  }
});

// buyer option

const optionBuyer = document.createElement("div");
optionBuyer.classList.add("options");

const buyerRadio = document.createElement("input");
buyerRadio.type = "radio";
buyerRadio.id = "Buyer";
buyerRadio.name = "type";
buyerRadio.classList.add("radio-button");

const buyerInfo = document.createElement("div");

const buyerLabel = document.createElement("label");
buyerLabel.setAttribute("for", "Buyer");
buyerLabel.textContent = "Join As a Buyer";

const buyerText = document.createElement("p");
buyerText.textContent =
  "I am looking for a Name, Logo or Tagline for my business, brand or product.";

buyerInfo.append(buyerLabel, buyerText);
optionBuyer.append(buyerRadio, buyerInfo);

// seller option

const optionSeller = document.createElement("div");
optionSeller.classList.add("options");

const sellerRadio = document.createElement("input");
sellerRadio.type = "radio";
sellerRadio.id = "Seller";
sellerRadio.name = "type";
sellerRadio.classList.add("radio-button");

const sellerInfo = document.createElement("div");

const sellerLabel = document.createElement("label");
sellerLabel.setAttribute("for", "Seller");
sellerLabel.textContent = "Join As a Creative or Marketplace seller";

const sellerText = document.createElement("p");
sellerText.textContent =
  "I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.";

sellerInfo.append(sellerLabel, sellerText);
optionSeller.append(sellerRadio, sellerInfo);

const marketing = document.createElement("div");
marketing.classList.add("marketing");

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "Marketing";

const checkboxLabel = document.createElement("label");
checkboxLabel.setAttribute("for", "Marketing");
checkboxLabel.textContent =
  "Allow Squadhelp to send marketing/promotional offers from time to time";

marketing.append(checkbox, checkboxLabel);

// button

const button = document.createElement("button");
button.classList.add("btn");
button.type = "submit";
button.textContent = "Create account";

form.append(inputFlex, optionBuyer, optionSeller, marketing, button);

// Collect props

container.append(title, subtitle, form);

document.body.append(container);

// Events

form.addEventListener("submit", handleEvent);
