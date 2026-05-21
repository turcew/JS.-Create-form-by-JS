"use strict";

// functions

class Person {
  constructor(data) {
    this.firstName = data["First name"] || "";
    this.lastName = data["Last name"] || "";
    this.nickName = data["Display name"] || "";
    this.email = data["Email Address"] || "";

    Object.assign(this);
  }
}

class CollectProps {
  handleEvent() {
    event.preventDefault();

    const data = {};
    const inputs = inputFlex.querySelectorAll("input");

    for (let index = 0; index < inputs.length; index++) {
      if (inputs[index].type === "password") {
        continue;
      }
      data[inputs[index].placeholder] = inputs[index].value;
    }

    const person = new Person(data);

    if (/\w/.test(person["lastName"])) {
      localStorage.setItem(person.lastName, JSON.stringify(person));
    } else {
      throw new Error(
        "Last name input is missing, has restricted symbols or is empty",
      );
    }
    console.log(localStorage);
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
  { type: "text", placeholder: "First name" },
  { type: "text", placeholder: "Last name" },
  { type: "text", placeholder: "Display name" },
  { type: "email", placeholder: "Email Address" },
  { type: "password", placeholder: "Password" },
  { type: "password", placeholder: "Password Confirmation" },
];

fields.forEach((field) => {
  const input = document.createElement("input");
  input.type = field.type;
  input.placeholder = field.placeholder;

  inputFlex.append(input);
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

const collector = new CollectProps();
form.addEventListener("submit", collector);

container.append(title, subtitle, form);

document.body.append(container);
