import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ValidateOtp } from './dto/ValidateOtp.dto';
import { ResponsePayload } from './utils/ResponsePayload';
import { calculateMinsDifference } from './utils/utils';

@Injectable()
export class AuthService {
  constructor(@Inject('MONGO_SERVICE') private readonly dbService: ClientProxy,
  @Inject('EMAIL_SERVICE') private readonly emailService: ClientProxy){

  }
  getHello(): string {
    return 'Hello World!';

  }

  async sendEmail(emailId: string, status: string, message: string) {
    try{ 
      Logger.log('test');
      const data = await this.emailService.send({cmd: 'send_email'}, {  } );
      Logger.log(JSON.stringify(data),'finished');
      return data;
    } catch(error){
      return '';
    }
  }

  async validateOtp(otpDetails: ValidateOtp){
    let currentReqTimestamp = new Date();
    const getUserDetails$ = this.dbService.send({ cmd: 'get_user'} , {email : otpDetails.email, sessionId: otpDetails.sessionId, currentOtp: otpDetails.otp});
    let userInfo = await lastValueFrom(getUserDetails$);
    let { data } = userInfo;
    if(data){
      let { otpGeneratedTimestamp, currentOtp } = data;
      Logger.log(new Date(otpGeneratedTimestamp));
      let diff =  calculateMinsDifference( otpGeneratedTimestamp, currentReqTimestamp);
      if(diff >= 0){
        const payload =  { email: otpDetails.email, payload: { "currentOtp": -1}};
        Logger.debug(payload);
        let status$ = this.dbService.send({cmd: 'update_user'},payload);
        let test = await lastValueFrom(status$);
        return new ResponsePayload('OTP Success', 'SUCCESS', {});
      }  else {
        return new ResponsePayload('OTP Expired', 'ERROR', null);
      }
     // Logger.log(diff);
    } else {
      return new ResponsePayload('Invalid OTP', 'ERROR', null);
    }
    //return userInfo;
  }

}
