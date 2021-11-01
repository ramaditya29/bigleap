import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema()
export class UserProfile {
  
    @Prop()
    firstName: string;
    
    @Prop()
	lastName: string;

    @Prop()
	email: string;
	
    @Prop()
    role: string;

    @Prop()
	country?: string;

    @Prop()
	currentLocation?: string;

    @Prop()
	phoneNumber?: number;

    @Prop()
	alternatePhoneNumber?: number;

    @Prop()
	profileVisibility?: string;

    @Prop()
	profileSourcedFrom?: string;

    @Prop({})
	profileSourcedLink?: string;
	@Prop()	
    personalSummary?: string;
    
    @Prop()
	workExperience?: Array<Object>;
    
    @Prop()
	education?: Array<Object>;
	
    @Prop()
    skills?: Array<string>;
    
    @Prop()
	awards?: Array<Object>;

    @Prop()
	preferences?: Array<string>;

    @Prop()
	privacySettings?: string;

    @Prop()
	resumeLocation?: string;

    @Prop()
	profilePhotoLocation?: string;

    @Prop()
	currentOtp: number;
    
    @Prop()
	otpGeneratedTimestamp: Date;

    @Prop()
	profileActivatedTimestamp?:Date;

    @Prop()
    sessionId: string;

}



export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);