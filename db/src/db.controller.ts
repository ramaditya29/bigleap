import { Body, Controller, Get, Logger, Post, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DBService } from './db.service';
import { UserProfile } from './dto/UserProfile.dto';
import { TransformInterceptor } from './interceptors/Transformer.interceptor';
import { ResponsePayload } from './utils/ResponsePayload';

@Controller()
export class DBController {
  constructor(private readonly dbService: DBService) {}

  @MessagePattern({ cmd: 'create_user' })
  async registerUser(userProfile: UserProfile){
    try{
      if(userProfile.email && userProfile.role)
        return await this.dbService.createUserProfile(userProfile);
      else {
        return new ResponsePayload(
          "REQUIRED FIELDS ARE MISSING", "ERROR", null
        ); 
      }
    } catch(err){
        return new ResponsePayload(
          "INTERNAL ERROR", "ERROR", err
        ); 
    }
    
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUserDetails(userDetails){
    try{
      let userInfo = await this.dbService.findUserByFilters(userDetails);
      if(userInfo.length > 0){
        return new ResponsePayload(
          "USER DETAILS MATCH", "SUCCESS", userInfo[0]
        );
      } else {
        return new ResponsePayload(
          "USER NOT FOUND", "ERROR", null
        );
      }
      return userInfo;
    } catch(err){
      return new ResponsePayload(
        "INTERNAL ERROR", "ERROR", null
      );
    }
  }

  @MessagePattern({ cmd: 'get_otp' })
  async getOtp(userDetails){
    try{
      let userInfo = await this.dbService.findUserByFilters(userDetails);
      if(userInfo.length > 0){
        let { _id } = userInfo[0];
        let userProfile = await this.dbService.updateOtpTimestampForUser(_id);
        return new ResponsePayload(
          "USER DETAILS MATCH", "SUCCESS", userProfile
        );
      } else {
        return new ResponsePayload(
          "USER NOT FOUND", "ERROR", null
        );
      }
      
    } catch(err){
      return new ResponsePayload(
        "INTERNAL ERROR", "ERROR", null
      );
    }
  }

  @MessagePattern({ cmd: 'login_user'})
  async loginUser(email: string){
    try{
      return await this.dbService.loginUser(email);
    } catch(err){
      return new ResponsePayload(
        "INTERNAL ERROR", "ERROR", err
      ); 
    }
  }

  /**
   * 
   * @param payload 
   * {
   *   email : <emailId>
   *   payload: {
   *     currentOtp: "",
   *     workExperience: [],
   *     resume: ""
   *   }
   * }
   * @returns 
   */
  @MessagePattern({ cmd: 'update_user' })
  async updateUserDetails(reqPayload){
    try{
      console.log('test is:' ,'test');
     let userInfo = await this.dbService.findUserByFilters({email: reqPayload.email});
      if(userInfo.length > 0){
        let { _id } = userInfo[0];
        let userUpdate = await this.dbService.updateUser(_id, reqPayload.payload);
        //console.log('the user details is:' , userUpdate);
        return new ResponsePayload(
          "UPDATE SUCCESS", "SUCCESS", {}
        );
      } else {
          return new ResponsePayload(
            "UPDATE FAILED.USER NOT FOUND", "ERROR", null
          );
      }
    } catch(err){
      console.log(err);
      Logger.log(err)
      //throw err;
      return new ResponsePayload(
        "INTERNAL ERROR", "ERROR",  null
      );
    }
  }

  
  
 
}
