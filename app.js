const sliderLength = document.querySelector('.pass-length input'),
  options = document.querySelectorAll('.options .option input'),
  generateBtn = document.querySelector('.generate-btn'),
  passwordInput = document.querySelector('.input-box input'),
  passwordIndicator = document.querySelector('.pass-indicator'),
  copyIcon = document.querySelector('.input-box span')

const characters = {
  lowercase: 'abcdefghiklmnopqrstvxyz',
  uppercase: 'ABCDEFGHIKLMNOPQRSTVXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*{}[]()_-+~<>:;.,|',
}

let generatePassword = () => {
  let staticPassword = ""
  let randomPassword = ""
  excludeDuplicate = false
  let passLength = sliderLength.value

  options.forEach(option => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id]
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `
      } else {
        excludeDuplicate = true
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--
    } else {
      randomPassword += randomChar
    }
  }

  passwordInput.value = randomPassword
}

const updatePasswordIndicator = () => {
  passwordIndicator.id = sliderLength.value <= 8 ? "weak" : sliderLength.value <= 16 ? "medium" : "strong"
}

const updateSlider = () => {
  document.querySelector('.pass-length .details span').innerText = sliderLength.value
  generatePassword()
  updatePasswordIndicator()
}
updateSlider()

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value)
  copyIcon.innerText = "check"
  setTimeout(() => {
    copyIcon.innerText = "copy_all"
  }, 1500)
}
sliderLength.addEventListener('input', updateSlider)
generateBtn.addEventListener('click', generatePassword)
copyIcon.addEventListener('click', copyPassword)