const colorPickerBtn = document.querySelector("#color-picker")
const colorList = document.querySelector(".all-colors")
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const showColors = ()=>{
    colorList.innerHTML = pickedColors.map(color => `
    <li class="color">
    <span class="rect" style="background: ${color}"></span>
    <div class="value">${color}</div>
    </li>
    `).join("") // gera o li pra cor escolhida e adiciona a Colorlist na tela
}

const activeEyeDropper = async () =>{
    try{
        const eyeDropper = new EyeDropper() // pega o Eyedropper (função do google que usa lupa para pegar cor)
        const {sRGBHex} = await eyeDropper.open()
        navigator.clipboard.writeText(sRGBHex) // copia no teclado

        pickedColors.push(sRGBHex)
        localStorage.setItem("picked-colors", JSON.stringify(pickedColors))
        showColors()
    }catch(error){
        console.log(error)
    }
}

colorPickerBtn.addEventListener("click", activeEyeDropper)

const eita = document.querySelector("#color-picker")
