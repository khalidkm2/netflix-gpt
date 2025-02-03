
export const formValidate = (...all) => {
    console.log(all);
    const[email,password,fullName] = all

    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const isPasswordValid = password.length>=6?"valid":null
    if(fullName){
        const isFullName = /^[A-Za-z ]+$/.test(fullName)
        if(!isFullName) return "Enter a valid name"
        if(!isEmailValid) return "Email is not valid"
        if(!isPasswordValid) return "Password length must be atleast 6"

    }

    if(!isEmailValid) return "Email is not valid"
    if(!isPasswordValid) return "Password is not valid"

    return null


}