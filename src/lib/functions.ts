export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const yesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const secondYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const detailedToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  const second = `0${date.getSeconds()}`.slice(-2);
  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  };
}

export const makeDetailedDate = (dateTime: string) => {
  const splittedDate = dateTime.split('T') || dateTime.split(' ');
  console.log(splittedDate[0], splittedDate[1])
  const date = splittedDate[0].split('-');
  const time = splittedDate[1].split(':');

  return {
    year : parseInt(date[0]),
    month : parseInt(date[1]),
    day : parseInt(date[2]),
    hour : parseInt(time[0]),
    minute : parseInt(time[1]),
    second : parseInt(time[2]) 
  }
}

export const encryptingText = (text: string, shift: string) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-./,;|:;<=>?@[]{}'
  let encryptedText = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const index = alphabet.indexOf(char)
    const shifter = parseInt(shift)
    if (index !== -1) {
      const shiftedIndex = (index + shifter) % alphabet.length
      encryptedText += alphabet[shiftedIndex]
    } else {
      encryptedText += char
    }
  }

  return encryptedText;
}

export const decryptingText = (text: string, shift: string) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-./,;|:;<=>?@[]{}'
  let decryptedText = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const index = alphabet.indexOf(char)
    const shifter = parseInt(shift)
    if (index !== -1) {
      const shiftedIndex = (index - shifter + alphabet.length) % alphabet.length
      decryptedText += alphabet[shiftedIndex]
    } else {
      decryptedText += char
    }
  }

  return decryptedText;
}

export const expiresMaker = () => {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const encodeBase64 = (text: string): string  => {
  return Buffer.from(text, 'utf8').toString('base64');
}

export const decodeBase64 = (base64Text: string): string => {
  return Buffer.from(base64Text, 'base64').toString('utf8');
}

