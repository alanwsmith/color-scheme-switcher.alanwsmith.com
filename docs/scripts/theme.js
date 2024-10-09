const themes = ["dark", "light"]

function addThemeSwitchers() {
  const switchers = document.querySelectorAll(".theme-switcher")
  const currentTheme = localStorage.getItem("theme")
  switchers.forEach((switcher, num) => {
    themes.forEach((theme) => {
      const themeLabel = document.createElement("label")
      themeLabel.htmlFor = `theme-switcher-${theme}-${num}`
      themeLabel.innerHTML = `${theme} `
      const themeButton = document.createElement("input")
      themeButton.type = "radio"
      themeButton.name = `theme-switcher-${num}`
      themeButton.id = `theme-switcher-${theme}-${num}`
      themeButton.value = theme
      themeButton.dataset.num = num
      themeButton.setAttribute('aria-label', `switch to ${theme} mode`)
      if (currentTheme && currentTheme === theme) {
        themeButton.checked = true 
      } else if (!currentTheme && theme === "dark") {
        themeButton.checked = true 
      }
      themeLabel.appendChild(themeButton)
      switcher.appendChild(themeLabel)
      themeButton.addEventListener("input", switchTheme)
    })
  })
}

function finishLoadingStylesheets() {
  const currentTheme = localStorage.getItem("theme")
  const theBody = document.querySelector("body")
  if (currentTheme) {
    theBody.dataset.theme = currentTheme
  }
  const themeStyles = document.createElement( "link" )
  themeStyles.href = `/styles/theme.css`
  themeStyles.rel = "stylesheet"
  theBody.appendChild(themeStyles)
}

function switchTheme(event) {
  const newTheme = event.target.value
  const theBody = document.querySelector("body")
  console.log(`Switching theme to: ${newTheme}`)
  const switcherNum = parseInt(event.target.dataset.num, 10)
  localStorage.setItem("theme", newTheme)
  const switchers = document.querySelectorAll(".theme-switcher")
  switchers.forEach((switcher, num) => {
    themes.forEach((theme) => {
      if (switcherNum !== num) {
        const el = document.querySelector(`#theme-switcher-${theme}-${num}`)
        if (newTheme === theme) {
          el.checked = true
        } else {
          el.checked = false
        }
      }
    })
  })
  theBody.dataset.theme = newTheme
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded")
  addThemeSwitchers()
  finishLoadingStylesheets()
})
