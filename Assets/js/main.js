const colorPickerBtn = document.querySelector("#color-picker")
const colorList = document.querySelector(".all-colors")
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const clearAll = document.querySelector(".clear-all")

const copyColor = elem =>{
    navigator.clipboard.writeText(elem.dataset.color)
    elem.innerText = "Copiado";
    setTimeout(() => elem.innerText = elem.dataset.color, 1000)
}

const showColors = ()=>{

    if(!pickedColors.length) return //retorna se n tem cores selecionadas
    colorList.innerHTML = pickedColors.map(color => `
    <li class="color">
    <span
     class="rect" 
     style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"> <!-- adiciona borda caso a cor seja branca -->
    </span> 
    <div class="value" data-color="${color}">${color}</div>
    </li>
    `).join("") // gera o li pra cor escolhida e adiciona a Colorlist na tela
    document.querySelector(".picked-colors").classList.remove("hide")

    // quando clicar na cor escolhida ela sera copiada para o teclado
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild ));
    })

}
showColors()

const activeEyeDropper = () =>{
    document.body.style.display = "none" // esconde a div enquanto o Eyedropper estiver em uso
  
    setTimeout(async() =>{
        try{
            const eyeDropper = new EyeDropper() // pega o Eyedropper (função do google que usa lupa para pegar cor)
            const {sRGBHex} = await eyeDropper.open()
            navigator.clipboard.writeText(sRGBHex) // copia no teclado
    
    
            //adicionar a cor na lista caso ja n tivesse sido inserida
            if(!pickedColors.includes(sRGBHex)){
                pickedColors.push(sRGBHex)
                localStorage.setItem("picked-colors", JSON.stringify(pickedColors))
                showColors()
            }else{
                Swal.fire({
                confirmButtonText: 'Cor ja Selecionada',
                confirmButtonColor: '#3085d6'
            })
            }
    
        }catch(error){
            Swal.fire('Essa versão funciona apenas em Navegadores Google')
        }
    }, 10)

    document.body.style.display = "block"
}

// limpando todas as cores, atualizando o armazenamento local, e esconde o elemento do PickedColors
const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors))
    document.querySelector(".picked-colors").classList.add("hide")
}  

clearAll.addEventListener("click", clearAllColors)
colorPickerBtn.addEventListener("click", activeEyeDropper)
