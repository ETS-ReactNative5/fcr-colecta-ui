export const validIdentifier = (value) => {
  // accept only digits
  if (/[^0-9]+/.test(value)) return false;
  // value should be 10 digits long
  if (value.length !== 10) return false;
  let nCheck = 0, bEven = false;

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) === 0;
}

export const validEmail = (value) => {
  const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(value);
}

export const validPhone = (value) => {
  const re = /^0[1-9]\d{7}$/
  return re.test(value);
}

export const validCellphone = (value) => {
  const re = /^0[1-9]\d{8}$/
  return re.test(value);
}

export const sameValue = (value, anotherValue) => {
  return value === anotherValue;
}