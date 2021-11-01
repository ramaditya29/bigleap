import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { UserProfile, UserProfileDocument } from './schema/UserProfile.schema';
import { ResponsePayload } from './utils/ResponsePayload';
import { addMinutesToDate, generateOtp, generateSessionId } from './utils/utils';

@Injectable()
export class DBService {
  constructor(@InjectModel(UserProfile.name) private userProfileModel: Model<UserProfileDocument>) {}
 
  async createUserProfile(userProfile : UserProfile){
    let userSearch = await this.findUserProfileByEmail(userProfile.email);
    if(userSearch.length > 0){
      return new ResponsePayload(
         "USER ALREADY EXISTS", "ERROR", null
      );
    } else {
      const up = new this.userProfileModel(userProfile);
      let data = await up.save();
      return new ResponsePayload(
        "USER REGISTRATION SUCCESSFUL", 
        "SUCCESS",
         data
      );
    }
    
  }

  async findUserByFilters(data){
    return this.userProfileModel.find({...data}).exec();
  }

  async findUserProfileByEmail(emailId: string){
    return this.userProfileModel.find({ email: emailId}).exec();
  }

  async updateUserProfile(payload){
    return this.userProfileModel.findByIdAndUpdate(payload._id, payload, { new: true});
  }

  async updateUser(_id, payload){
    console.log(_id , payload);
    return this.userProfileModel.findByIdAndUpdate(_id, payload, { new: true});
  }

  async loginUser(email: string){
    let userData = await this.findUserProfileByEmail(email);
    if(userData.length > 0){
      
      let sessionId = generateSessionId();
      let user = userData[0];
      user.sessionId = sessionId;
      let data = await this.updateUserProfile(user);
      return new ResponsePayload("LOGIN SUCCESS", "SUCCESS", data);
    } else {
      return new ResponsePayload(
        "USER NOT FOUND", "ERROR", null
     );
    }
  }

  async updateOtpTimestampForUser(id){
      const otp = generateOtp();
      const timestamp = addMinutesToDate(new Date() , 3);
      const payload = { _id: id, currentOtp: otp, otpGeneratedTimestamp: timestamp};
      let updatedProfile = await this.updateUserProfile(payload);
      return updatedProfile;

  }

  
}
