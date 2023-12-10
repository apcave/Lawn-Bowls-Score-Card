import Realm, {BSON} from 'realm';

export class PlayerData extends Realm.Object<PlayerData> {
  _id!: BSON.ObjectId;
  PlayerKey!: BSON.ObjectId;
  FirstName!: string;
  /*
  LastName!: string;
  PreferredName!: string;
  StartedBowling!: Date;
  BirthYear!: Date;
  Gender!: string;
  PhoneNumber!: string;
  EmergencyContactName!: string;
  EmergencyPhoneNumber!: string;
  competitions!: Array<{competitionKey: BSON.ObjectId, clubKey: BSON.ObjectId}>;
    */
  static schema: Realm.ObjectSchema = {
    name: 'PlayerData',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      PlayerKey: 'objectId',
      FirstName: 'string',
      /*
      LastName: 'string',
      PreferredName: 'string',
      StartedBowling: 'Date',
      BirthYear: 'Date',
      Gender: 'string',
      PhoneNumber: 'string',
      EmergencyContactName: 'string',
      EmergencyPhoneNumber: 'string',
      competitions: Array<{competitionKey: 'objectId', clubKey: 'objectId'}>,
      */
    },
  };
}
