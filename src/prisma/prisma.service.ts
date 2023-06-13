import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgresql:postgresql@localhost:5434/scis-db?schema=public'
                }
            }
        })
    }
}
