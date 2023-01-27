const colorPickerBtn = document.querySelector("#color-picker")

const activeEyeDropper = async () =>{
    try{
        const eyeDropper = new EyeDropper()
        const {sRGBHex} = await eyeDropper.open()
        navigator.clipboard.writeText(sRGBHex)
        console.log( sRGBHex )
    }catch(error){
        console.log(error)
    }
}

colorPickerBtn.addEventListener("click", activeEyeDropper)

const eita = document.querySelector("#color-picker")
