
export const isGoodPassword = password => {
   //Entre 6 y 12 caracteres, minimo un numero, una letra mayuscula y una minuscula.
   const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
   return regex.test(password);
}