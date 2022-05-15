//Criteria Prompts
window.addEventListener("load", function () {
  var passwordLength = prompt(
    "What length of characters do you want your password to be?"
  );

  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt(
      "The length must be 8-128 characters. What length of characters do so you want your password to be?"
    );
  }

  var uppercase = confirm("Would you like to use uppercase letters?");
  var lowercase = confirm("Would you like to use lowercase letters?");
  var numbers = confirm("would you like to use numbers?");
  var symbols = confirm("would you like to use special characters?");

  while (!(uppercase || lowercase || numbers || symbols)) {
    alert("You must select at least one character type!");

    uppercase = confirm("Would you like to use uppercase letters?");
    lowercase = confirm("Would you like to use lowercase letters?");
    numbers = confirm("would you like to use numbers?");
    symbols = confirm("would you like to use special characters?");
  }

  //DOM elements
  const resultEl = document.getElementById("password");

  document.getElementById("generate").addEventListener("click", () => {
    resultEl.value = generatePassword(
      lowercase,
      uppercase,
      numbers,
      symbols,
      passwordLength
    );
  });

  document.getElementById("clipboard").addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.value;

    if (!password) {
      return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
  });
});

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [
    {
      symbol,
    },
    {
      upper,
    },
    {
      number,
    },
    { lower },
  ].filter((item) => Object.values(item)[0]);

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator functions

function getRandomLower() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function getRandomUpper() {
  var text = "";
  var possible = "QWERTYUIOPASDFGHJKLZXCVBNM";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function getRandomNumber() {
  var text = "";
  var possible = "1234567890";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getRandomSymbol() {
  var text = "";
  var possible = "!@#$%^&*(){}[]=<>/,.";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
