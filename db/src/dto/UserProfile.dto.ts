export class UserProfile{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
	country: string;
    currentLocation?: string;
    phoneNumber?: number;
    alternatePhoneNumber?: number;
    profileVisibility?: string;
    profileSourcedFrom?: string;
    profileSourcedLink?: string;
    personalSummary?: string;
    sessionId: string;
    currentOtp: number;
    otpGeneratedTimestamp: Date;
    workExperience: Array<Object>;
	education: Array<Object>;
    skills: Array<string>;
    awards: Array<Object>;
    preferences: Array<string>;
    privacySettings: string;
    resumeLocation: string;
    profilePhotoLocation: string;
    profileActivatedTimestamp:Date;
}