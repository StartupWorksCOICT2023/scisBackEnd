import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const GetUserprofile = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request : Express.Request = ctx
        .switchToHttp()
        .getRequest()
        return request.user

    },
)