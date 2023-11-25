export const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
};

export const validateNumber = (number: string) => {
    const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
    return numberRegex.test(number);
};

export const inputMask = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
      const formattedInput = input
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3");
      return formattedInput
}

export const formatNumber = (number:number) =>{
    const numberStr = number.toString();
    return numberStr.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3");
}