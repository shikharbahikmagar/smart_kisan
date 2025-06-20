import {verify} from 'jsonwebtoken';
import { UserRole } from 'src/constants/enum/user-role.enum';

export type authPayload = {
  userId: number;
  email: string;
  role: UserRole;
}



 export const decodeToken = (token: string): { isValid: true, data: authPayload} | {isValid: false, data: null} => {
  
  try {
    
    // console.log("Decoding token:", token);
    
  const decodedToken = verify(token, process.env.JWT_SECRET_KEY!) as authPayload;

    return { isValid: true, data: decodedToken };

  } catch (error) {

    console.log(error);
    return { isValid: false, data: null };
    

  }

}