let otpGenerator = require('otp-generator');
const generateSessionId = () => {
    return '_' + Math.random().toString(36).substr(2, 10);
}
const addMinutesToDate = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
}

const generateOtp = (size = 6) => {
    return otpGenerator.generate(size, { alphabets: false, upperCase: false, specialChars: false });
}
export {
    generateSessionId,
    addMinutesToDate,
    generateOtp
}