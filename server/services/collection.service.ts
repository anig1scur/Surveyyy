import { Collection } from '../../src/common/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { Prisma, PrismaClient } from '@prisma/client';

export class CollectionService {
  constructor(private collection: PrismaClient['collection']) {}

  getCollectionById = (collectionId: string, opts: Omit<Prisma.CollectionFindUniqueArgs, 'where'> = {}) =>
    this.collection.findUnique({ where: { id: collectionId }, ...opts });

  queryCollections = (args?: Prisma.CollectionFindManyArgs) => {
    return this.collection.findMany(args);
  };

  countCollections = (args?: Prisma.CollectionCountArgs) => {
    return this.collection.count(args);
  };

  createCollection = async ({ ...props }: Collection) => {
    try {
      return await this.collection.create({
        // @ts-ignore
        data: { ...props },
        select: {
          id: true,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  deleteCollectionById = async (id: string) => {
    try {
      return await this.collection.delete({ where: { id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return null;
        }
      }

      throw e;
    }
  };
}

export default CollectionService;
