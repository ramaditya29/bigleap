const otpGenerator = require('otp-generator');
const addMinutesToDate = (date, minutes) : Date => {
    return new Date(date.getTime() + minutes*60000);
}

const generateOtp = (size) : number => {
    return otpGenerator.generate(size, { alphabets: false, upperCase: false, specialChars: false });
}

const calculateMinsDifference = (date1, date2) : number => {
    let diff = new Date(date1).getTime() - new Date(date2).getTime();
    let diffInMins = Math.floor((diff/1000)/60);
    return diffInMins;
}

export {
    addMinutesToDate,
    generateOtp,
    calculateMinsDifference
}