const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
//Button
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randfunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomsymbol,
};

clipboardEl.addEventListener("click", () => {});

generateEl.addEventListener("click", () => {
  const lenght = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasupper = uppercaseEl.checked;
  const hasnumbers = numbersEl.checked;
  const hassymbols = symbolsEl.checked;
  resultEl.innerHTML = generatePassword(
    hasLower,
    hasupper,
    hasnumbers,
    hassymbols,
    lenght
  );
});

//copy Password to Clipboard
clipboardEl.addEventListener("click", () => {
  let Password = resultEl.innerHTML;
  if (Password === "") {
    console.log(Password, "hello");
    return;
    alert("Please Generate Password First");
  }
  navigator.clipboard.writeText(resultEl.innerHTML);
  alert("copied the Text:" + resultEl.innerHTML);
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;

  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typeArr.forEach((e) => {
      const funcname = Object.keys(e)[0];

      generatedPassword += randfunc[funcname]();
    });
  }

  const finnalPassword = generatedPassword.slice(0, length);
  return finnalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomsymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.'";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
