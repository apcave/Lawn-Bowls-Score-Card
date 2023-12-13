import Realm, {BSON} from 'realm';



export class PlayerData extends Realm.Object<PlayerData> {
  _id!: BSON.ObjectId;
  playerKey!: BSON.ObjectId;
  firstName!: string;
  lastName!: string;
  preferredName!: string;
  startedBowling!: Date;
  birthYear!: Date;
  gender!: string;
  phoneNumber!: string;
  emergencyContactName!: string;
  emergencyPhoneNumber!: string;
  sidesTeams!: Array<BSON.ObjectId>;

  static schema: Realm.ObjectSchema = {
    name: 'PlayerData',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      playerKey: {type: 'objectId'},
      firstName: {type: 'string', default: 'First Name'},
      lastName: {type:'string', default: 'Last Name'},
      preferredName: {type:'string', default: 'Preferred Name'},
      startedBowling: {type: 'date', default: new Date()},
      birthYear: {type: 'date', default: new Date()},
      gender: {type:'string', default: 'Gender'},
      phoneNumber: {type:'string', default: '-'},
      emergencyContactName: {type:'string', default: 'Emergency Contact Name'},
      emergencyPhoneNumber: {type:'string', default: '-'},
      sidesTeams: { type: 'list', objectType: 'objectId', default: [] },
    },
  };
}

export class Competitions extends Realm.Object<Competitions> {
    _id!: BSON.ObjectId;
    competitionName!: string;
    division!: 'string';
    section!: 'string';
 

    static schema: Realm.ObjectSchema = {
    name: 'Competitions',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      competitionName: { type: 'string', default: 'Competition Name' },
      division: { type:'string', default: 'Division' },
      section: { type:'string', default: 'Section' },
      region: { type:'string', default: 'Section' },
    }}
  }

  export class SidesTeams extends Realm.Object<SidesTeams> {
    _id!: BSON.ObjectId;
    clubKey!: BSON.ObjectId;
    competitionKey!: BSON.ObjectId;
    teamName!: string;
    selectors!: Array<BSON.ObjectId>;
    managers!: Array<BSON.ObjectId>;
    players!: Array<BSON.ObjectId>;
    matches!: Array<BSON.ObjectId>;

    static schema: Realm.ObjectSchema = {
      name: 'SidesTeams',
      primaryKey: '_id',
      properties: { 
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
        clubKey: {type: 'objectId'},
        competitionKey: {type: 'objectId'},
        teamName: { type:'string', default: 'Team Name' },
        selectors: { type: 'list', objectType: 'objectId', default: [] },
        // Maybe we should get players from query on matches instead?
        players: { type: 'list', objectType: 'objectId', default: [] },
        matches: { type: 'list', objectType: 'objectId', default: [] },
      }
    }  
  }

  export class Clubs extends Realm.Object<Clubs> {
    _id!: BSON.ObjectId;
    clubName!: string;
    clubAddress!: string;
    clubPhoneNumber!: string;
    competitions!: Array<BSON.ObjectId>;
    bowlers!: Array<BSON.ObjectId>;
    managers!: Array<BSON.ObjectId>;

    static schema: Realm.ObjectSchema = {
    name: 'Clubs',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      clubName: {type:'string', default: 'Club Name'},
      clubAddress: {type: 'string', default: 'Club Address'},
      clubPhoneNumber: {type:'string', default: 'Club Phone Number'},
      competitions: { type: 'list', objectType: 'objectId', default: [] },
      bowlers: { type: 'list', objectType: 'objectId', default: [] },
      managers: { type: 'list', objectType: 'objectId', default: [] },
    }}
  }

  export class Match extends Realm.Object<Match> {
    _id!: BSON.ObjectId;
    static schema: Realm.ObjectSchema = {
      name: 'Matches',
      primaryKey: '_id',
      properties: {
        _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      },
    }
  }