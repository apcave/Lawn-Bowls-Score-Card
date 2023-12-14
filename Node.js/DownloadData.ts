import { Divider } from "@rneui/base";


interface Competition {
  name: string;
  id: string;
}

interface Division {
  competition : Competition;
  id: string;
  name: string;
  sections: Section[];
}

interface Club {
  id: string;
  name: string;
}

// A player can be in multiple divisions/sections and have played multiple games.
interface Player {
  id: string;
  firstName: string;
  lastName: string;
  matchesPlayer: RinkPlayer[];
}

interface RinkPlayer {
  id: string;
  match_id: string;
  side_id: string;
  position: string;
  firstName: string;
  lastName: string;
}

interface SideTeam {
  id: string;
  name: string;
  club_id: string;
  club: Club | {};
  players: RinkPlayer[];
}

interface Section {
  name: string;
  number: number;
  matches: Match[][];
  sides: SideTeam[];
  currentRound: number;
  numberOfRounds: number;
}

// This is not really used venue should be a club id.
interface Venue {
  venue_id: string;
  club_id: string;
}

interface RinkMatch {
  id: string;
  format: string;
  side_1_Shots: number;
  side_2_Shots: number;
  side_1_Players: RinkPlayer[];
  side_2_Players: RinkPlayer[];
}

interface Match {
  id: string;
  round: number;
  section: number;
  roundLabel: string;
  sectionLabel: string;
  matchState: string;
  side_1_id: string;
  side_2_id: string;
  venue_id: string;
  results_id: string;
  rinkMatches: RinkMatch[];
}

class BowlsLinkAPI {
  API_URL = 'https://api.bowlslink.com.au';
  APP = {
    PERSONAL_URL: '/app/club-members/',
    COMPETITIONS_URL: '/competitions/entered',
  }

 RES = {
  PUBLIC: '/results-api',
  CLUB_GROUP: '/club-group',
  VIC_GROUP: '/CLUB_GROUP_VIC'
 }

 
 
  async getActiveCompetitions(stateAUS : string): Promise<Competition[]>
  {
    let url = this.API_URL + this.RES.PUBLIC + this.RES.CLUB_GROUP
    let eventsURL = '/events?filter[state]=active'

    if (stateAUS === 'VIC')
    {
      url += this.RES.VIC_GROUP        
    }
    url += eventsURL
    let comps : Competition[] = []
    const data = await this.getJsonFromUrl(url)
    for (let i = 0; i < data.include.length; i++)
    {
    
      let event = data.include[i]
      if (event.id !== 'CLUB_GROUP_VIC' && typeof event.attributes.name !== 'undefined') {
        let comp = {
          name: event.attributes.name,
          id: event.id
        }
        comps.push(comp)
      }
    }
    console.log(comps)    
    return comps
  }

  async getDivisionsComps(comp : Competition): Promise<Division[]> 
  {
    let url = this.API_URL + this.RES.PUBLIC + '/event/' + comp.id + '/competitions?filter[state]=active'
    const data = await this.getJsonFromUrl(url)

    let divisions : Division[] = []
    for (let i = 0; i < data.include.length; i++)
    {
      let event = data.include[i]
      if (event.id !== 'CLUB_GROUP_VIC' && event.id !== comp.id && typeof event.attributes.name !== 'undefined') {
        let sects = event.attributes.pools
        let sects_t : Section[] = []
        for (const sec of sects)
        {
          let section : Section = {
            name: sec.name,
            number: parseInt(sec.number),
            matches: [[]],
            sides: [],
            numberOfRounds: sec.rounds.length,
            currentRound: parseInt(event.attributes.currentSectionRounds[sec.number])
          }
          sects_t.push(section)
        }

        let div : Division = {
          competition: comp,
          name: event.attributes.name,
          id: event.id,
          sections: sects_t
        }
        divisions.push(div)
      }
    }
    console.log(divisions)    
    return divisions
  }

  async getSectionsData(division : Division): Promise<Division> 
  {
    let url = this.API_URL + this.RES.PUBLIC + '/competition/' + division.id + '/matches?filter[state]=active'
    const data = await this.getJsonFromUrl(url)

    let matches_t : Match[] = []
    let sides_t : SideTeam[] = []
    let venues_t : Venue[] = []
    let clubs_t : Club[] = []
    for (let i = 0; i < data.include.length; i++)
    {
      let ob = data.include[i]

      if (ob.type ==='match')
      {
        let results_id = "unknown"
        if (ob.includes.result !== null)
          results_id = ob.includes.result.id

        let venue_id = "unknown"
        if ( typeof ob.includes.fieldOfPlay !== 'undefined')
          venue_id = ob.includes.fieldOfPlay.id

        let match : Match = {
          id: ob.id,
          round: ob.attributes.round,
          section: ob.attributes.pool,
          roundLabel: ob.attributes.roundLabel,
          sectionLabel: ob.attributes.sectionLabel,
          matchState: ob.attributes.matchState,
          side_1_id: ob.includes.competitorOne.id,
          side_2_id: ob.includes.competitorTwo.id,
          venue_id: venue_id,
          results_id: results_id,
          rinkMatches: []
        }
        matches_t.push(match)
      }
      else if (ob.type ==='competitor')
      {
        if (typeof ob.includes?.owner?.id !== 'undefined')
        {
          // Can happen when the competitor is a bye.
          let side : SideTeam = {
            id: ob.id,
            name: ob.attributes.name,
            club_id: ob.includes.owner.id,
            club: {},
            players: []
          }
          sides_t.push(side)
        }
      }
      else if (ob.type === 'CompetitorFieldOfPlay')
      {
        let venue : Venue = {
          venue_id: ob.id,
          club_id: ob.includes.owner.id
        }
        venues_t.push(venue)
      }
      else if (ob.type === 'multiFormatResult')
      {
        // This is the outcome of the match in terms of which side won.
        // Can be a place holder for a match that hasn't been played yet.
        console.log('show results')
      }
      else if (ob.type === 'competition')
      {
        // holds the information already known about the division.
      }
      else if (ob.type === 'CompetitionEvent')
      {
        // holds the information already known about the competition.
      }      
      else if (ob.type === 'FinalsSeries')
      {
        // This could be important later. Don't know why it has it's own id.
      }
      else if (ob.type === 'owner')
      {
        // All clubs in the division.
        let club : Club = {
          // Other information available.
          id: ob.id,
          name: ob.attributes.name
        }
        clubs_t.push(club)
      }
    }
    
    for (const match of matches_t)
    {
      const i = match.section - 1
      let sect = division.sections[i]
      sect.name = match.sectionLabel

      let foundSide = false
      for (const side of sect.sides)
      {
        if (side.id === match.side_1_id)
        {
          foundSide = true
          break
        }
      }
      if (!foundSide)
      {
        for(const side of sides_t)
        {
          if (side.id === match.side_1_id)
          {
            sect.sides.push(side)
            break
          }
        }
      }

      foundSide = false
      for (const side of sect.sides)
      {
        if (side.id === match.side_2_id)
        {
          foundSide = true
          break
        }
      }
      if (!foundSide)
      {
        for(const side of sides_t)
        {
          if (side.id === match.side_2_id)
          {
            sect.sides.push(side)
            break
          }
        }
      }
    } 
    // Sides are now populated add the club data to the sides.
    for (const sect of division.sections)
    {
      for (let i = 0; i < sect.numberOfRounds; i++)
        sect.matches.push([])

      for (const match of matches_t)
      {
        if (match.section === sect.number)
          sect.matches[match.round - 1].push(match)
      }

      for (const side of sect.sides)
      {
        for (const club of clubs_t)
        {
          if (side.club_id === club.id)
          {
            side.club = club
            break
          }
        }
      }
    }
    return division
  }

  async getMatchData(division : Division): Promise<Division> {
    for (const sec of division.sections)
    {
      let side_1_Players_t : RinkPlayer[] = []
      let side_2_Players_t : RinkPlayer[] = []
      for (const match of sec.matches[sec.currentRound - 1])
      {
        let url = this.API_URL + this.RES.PUBLIC + '/match/' + match.id
        console.log(url)
        console.log('match: ',match)
        const data = await this.getJsonFromUrl(url)
        for (const ob of data.include) {
          if (ob.type === 'competitorPlayer') {

            let side_id = 'unknown'
            if (typeof ob.includes?.competitor?.id !== 'undefined')
              side_id = ob.includes.competitor.id

            let player : RinkPlayer = {
              id: ob.id,
              match_id: match.id,
              position: ob.attributes.assignedPosition,
              firstName: ob.attributes.firstName,
              lastName: ob.attributes.lastName,
              side_id: side_id
            }

            if (side_id !== 'unknown') {
              if (ob.includes.competitor.id === match.side_1_id)
                side_1_Players_t.push(player)
              else
                side_2_Players_t.push(player)
            }
          }
        }
        for (const ob of data.include) {
          if (ob.type === 'rinkMatchResult') {
            let side_1_Players : RinkPlayer[] = []
            for (const playerOb of ob.includes.competitorOnePlayers) {
              for (const player of side_1_Players_t) {
                if (player.id === playerOb.id) {
                  side_1_Players.push(player)
                  break
                }
              }
            }
            let side_2_Players : RinkPlayer[] = []
            for (const playerOb of ob.includes.competitorTwoPlayers) {
              for (const player of side_2_Players_t) {
                if (player.id === playerOb.id) {
                  side_2_Players.push(player)
                  break
                }
              }
            }
            let rink : RinkMatch = { 
              id: ob.id,
              format: ob.attributes.name,
              side_1_Shots: ob.attributes.competitorOneShots,
              side_2_Shots: ob.attributes.competitorTwoShots,
              side_1_Players: side_1_Players,
              side_2_Players: side_2_Players
            }
            match.rinkMatches.push(rink)
          }
        }
      }
    }
    return division
  }

  async getJsonFromUrl(url: string): Promise<any> {
    //console.log('URL: ' + url)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }    
    const data = await response.json();
    return data;
  }  

  async getClubs(): Promise<Club[]> 
  {
    return []
  }

  async getPlayers(club : Club): Promise<RinkPlayer[]> 
  { 
    return []
  }

  async getTeams(player : RinkPlayer): Promise<SideTeam[]> 
  {
    return []
  }

  async currentMatch(player : RinkPlayer, side : SideTeam): Promise<Match[]> 
  {
    // This will return a match for the generation of a card in the app.
    // The match id is generated at the start of the season but the data can change.
    return []
  }

  async DownloadData(): Promise<void> {
    //Things web want our app to extract.
    let clubs: Club[] = [];


    
    let vicComps : Competition[] = []
    vicComps = await this.getActiveCompetitions('VIC')

    console.log('vicComps : ', vicComps)
    let allDivisions : Division[] = []
    for (const comp of vicComps) {
      console.log(comp.name)
      let division = await this.getDivisionsComps(comp)
      allDivisions = allDivisions.concat(division)
    }

    // Add matches, sections and sides to the division.
    for (const division of allDivisions) {
      console.log(division.name)
      await this.getSectionsData(division)
      await this.getMatchData(division)
      console.log('Muppet section')
    }
  }
}

function TestCode() {
  let bowlsLink = new BowlsLinkAPI()
  bowlsLink.DownloadData().then()
}
TestCode()

/*
async function getDrawTemplates(): Promise<Competition[][]> {
  const urls = [
    'https://api.bowlslink.com.au/results-api/competition/fbfa446f-8986-479d-a196-543ec8849c97'
    'https://api.bowlslink.com.au/results-api/event/1506d71d-94d6-42eb-9d6f-ed0eb72ccd8b'

    // Shows the Weekend Division 4, entrants id for 'Aberfeldie CBC 2' so the code is for the side. Has all the names of the players in the side
    'https://api.bowlslink.com.au/results-api/entry/a26eedbf-a0ea-41b0-af37-476a7aa75030'

    // The high level like weekend pennant not competitions like divisions a navigation dead end
    //Steps go to 
    //'https://results.bowlslink.com.au/club-group/CLUB_GROUP_VIC#events'
    // Scrapes the uuid for the competitions like <a href="/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65" class> from HTML

    // Get the JSON on the event from the API
    //'https://api.bowlslink.com.au/results-api/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65'

    // Downloads CVS reports no UUID, dead end.
    //"https://api.bowlslink.com.au/results-api/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65/download/report/matches-played-count-per-member/init"
    //"https://api.bowlslink.com.au/results-api/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65/download/report/rounds-played-per-member/init"
    
    //General information about the division and the sections
    //https://api.bowlslink.com.au/results-api/competition/701a964e-233b-4d64-8ab7-d89e239a12b6

    // Information about clubs by UUID. (Fitzroy)
    'https://api.bowlslink.com.au/results-api/club/31823ed6-970e-48ee-b999-7ac763d47ad0'


    https://api.bowlslink.com.au/results-api/event/31823ed6-970e-48ee-b999-7ac763d47ad0

    // Shows more than the details of one person bowling, actually shows many entrants
    https://api.bowlslink.com.au/results-api/entrant/0531dd7f-516b-4dc5-8037-33ed61e7a2be



    // ---- 1. Get the events for victoria.
    // Get all active events in victoria. Like weekend pennant night pennant ect.
    'https://api.bowlslink.com.au/results-api/club-group/CLUB_GROUP_VIC/events?filter[state]=active'

    // UUID for metro pennant.
    //'https://api.bowlslink.com.au/results-api/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65'

    // ---- 2. Get the UUIDs for the competitions.
     // Get the competitions in the events like division 4. Has sections as well.
    'https://api.bowlslink.com.au/results-api/event/8a7f8d36-1c4d-40c5-9f05-804b79803e65/competitions?filter[state]=active'

    // ---- 3. Look up a competition by UUID. Shows all match information UUIDs. Also has the sides.
    'https://api.bowlslink.com.au/results-api/competition/701a964e-233b-4d64-8ab7-d89e239a12b6/matches'

    
    // -->> you can get owner (club) UUID from Matches API.
    'https://api.bowlslink.com.au/results-api/club/a91cfec8-78d0-483c-8f1c-bea3960aad73'

    // Includes the UUID for the sides and the players scores and other information.
    'https://api.bowlslink.com.au/results-api/match/f90fe803-8702-449c-83c2-a21bea27bab8'

    // If you look up a single entrant you get all other entrants in that side.
    'https://api.bowlslink.com.au/results-api/entrant/b73d881f-e414-4c7d-9b6a-e10e4fa5d6e8'

    https://api.bowlslink.com.au/results-api/entry/701a964e-233b-4d64-8ab7-d89e239a12b6

    

    //Trunk of the club group tree.
    'https://api.bowlslink.com.au/results-api/club-group/CLUB_GROUP_VIC'
    //Victoria bowling regions with UUIDs.
    'https://api.bowlslink.com.au/results-api/club-group/CLUB_GROUP_VIC/sub-groups'
    // Northern gateway UUID. Works but doesn't provide a list of clubs.
    'https://api.bowlslink.com.au/results-api/club-group/9519370e-86f6-46d4-8f90-def037da8a95'

  
 

    //Get all matches for a competition.
    'https://api.bowlslink.com.au/results-api/competition/701a964e-233b-4d64-8ab7-d89e239a12b6/matches'

    'https://www.bowlsvic.org.au/wp-content/uploads/2023/10/2023-24-Metro-Pennant-Draw-Template.xml',
    //'https://www.bowlsvic.org.au/wp-content/uploads/2023/10/2023-24-Weekend-Pennant-Draw-Template.xml',
    //'https://www.bowlsvic.org.au/wp-content/uploads/2023/10/2023-24-Midweek-Pennant-Draw-Template.xml',
    //'https://www.bowlsvic.org.au/wp-content/uploads/2023/10/2023-24-State-Pennant-Draw-Template.xml',
  ];
  const drawTemplates = await Promise.all(urls.map(getDrawTemplate));
  return drawTemplates;
}


(async () => {
  const drawTemplates = await getDrawTemplates();
  console.log(JSON.stringify(drawTemplates));
})();
*/
/*
  So to get the rating system working it is possible to get all the UUIDs for the entrants of Fitzroy 7 a Side.
  The user can log on anonymously an select who they are from the list from entrants. Once an entrant has been
  selected they are removed from the list. The UUID in bowls link is mapped to user.
  Maybe they user should login to the app by supplying their first and last name and password. I can manually reset if
  required.
*/