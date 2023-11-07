import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ROUTE = 'isPublicRoute';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_ROUTE, true);
