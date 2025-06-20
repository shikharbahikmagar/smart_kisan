import { SetMetadata } from "@nestjs/common"

export const PUBLIC_KEY = 'isPublic';

export const IsPublic = () => {
    return SetMetadata(PUBLIC_KEY, true);
}