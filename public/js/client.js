document.addEventListener("DOMContentLoaded", () => {
    let error = document.querySelector(".error")
    let info = document.querySelector(".info")
    let success = document.querySelector(".success")

    if(![error,info,success].includes(null)){
        if(error.innerHTML !== "" || info.innerHTML !== "" || success.innerHTML !== ""){
            setTimeout(() => {
               error.innerHTML = ""
               info.innerHTML = ""
               success.innerHTML = ""
            }, 3000)
        }
    }
})