import type { RouteHandler } from 'fastify';

import type { CollectionService } from '../services';
import { Collection } from '../../src/common/types';

export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  list: RouteHandler<{
    Reply: Array<Collection>;
  }> = async (req, rep) => {
    rep.header('X-Total-Count', await this.collectionService.countCollections());

    // TODO: FIXME
    // @ts-ignore
    rep.send(await this.collectionService.queryCollections());
  };

  create: RouteHandler<{
    Body: Collection;
  }> = async (req, rep) => {
    rep.send(
      await this.collectionService.createCollection({
        ...req.body,
      })
    );
  };

  get: RouteHandler<{
    Params: { collectionId: string };
    Reply: Collection;
  }> = async (req, rep) => {
    const { collectionId } = req.params;
    rep.send(await this.collectionService.getCollectionById(collectionId));
  };

  delete: RouteHandler<{
    Params: { collectionId: string };
    Reply: undefined; // 204
  }> = async (req, rep) => {
    const { collectionId } = req.params;
    await this.collectionService.deleteCollectionById(collectionId);

    rep.code(204);
  };
}

export default CollectionController;
