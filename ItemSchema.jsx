import Realm, {BSON} from 'realm';

export class Item extends Realm.Object {
 
  static schema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      isComplete: {type: 'bool', default: false},
      summary: 'string',
      owner_id: 'string',
    },

  };
}