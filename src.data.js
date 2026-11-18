export const GIRLS_DISTRICT=['Ainsley Beyer','Hailey Brown','Haylie Burke','Isabella Folsom','Hannah Jordan','Michaela Owen','Victoria Rogers','Gabrielle Romero','Stephanie Batti','Braelynn Burleson',"Baili' Green",'Kathryn Tate','Emma Wells','Emma Owen','Sarah Owen'];
export const BOYS_DISTRICT=['Cristian Aguilar','Austin Baron','Tyler Baron','Dillon Dishman','Luke Dishman','Jayden Mathewson','Tristan Mathewson','Colton Pratt','Jay Santos','Selvin Velasquez','Stephen Batti','Gavin Mount','Case Vercher','Daviell Wachira'];
export const GIRLS_EXTRA=['Nefertary Arreola','Sharon Chuye Nyeh','Madison Fraser','Malani Frias','Genevieve Gibson','Favour-Ruth Jitzi','Presley Lowery','Alexis Merchant','Alyson Rubio'];
export const BOYS_EXTRA=['Davi Fernandez','Kevin Lopez-Martinez','Tyler Baugh','Lane Brothers','Abdulrahman Derogongan','Jaxton Eddington','Justin Eduful','Joaquin Gonzalez','Marshall Guercia','John Himes','Justin Kamau','Vincent Romero','Samuel Ruest','Landon Schmidt','Jeremiah Williams'];
export const IND_EVENTS=['200 Free','200 IM','50 Free','1-meter Diving','100 Fly','100 Free','500 Free','100 Back','100 Breast'];
export const RELAY_EVENTS=['200 Medley','200 Free','400 Free'];
export const SQUADS=['A','B','C'];
export const relayKey=(gender,evt,squad)=>`${gender}|${evt}|${squad}`;
const safeId=(gender,name)=>`${gender[0].toLowerCase()}_${name.toLowerCase().replace(/[^a-z0-9]/g,'_')}`;
export function newState(){
 const athletes=[...GIRLS_DISTRICT.map(name=>({id:safeId('Girls',name),name,gender:'Girls',district:true,active:true,times:{}})),...GIRLS_EXTRA.map(name=>({id:safeId('Girls',name),name,gender:'Girls',district:false,active:true,times:{}})),...BOYS_DISTRICT.map(name=>({id:safeId('Boys',name),name,gender:'Boys',district:true,active:true,times:{}})),...BOYS_EXTRA.map(name=>({id:safeId('Boys',name),name,gender:'Boys',district:false,active:true,times:{}}))];
 // Blank championship roster spots, converted into athlete records when named.
 for(const gender of ['Girls','Boys'])for(let i=0;i<3;i++)athletes.push({id:`${gender.toLowerCase()}_open_${i+1}`,name:'',gender,district:true,active:true,open:true,times:{}});
 const relays={};for(const g of ['Girls','Boys'])for(const e of RELAY_EVENTS)for(const s of SQUADS)relays[relayKey(g,e,s)]={legs:['','','',''],splits:['','','',''],allowance:'0.00'};
 // Known recovery: editable starter assignments, not official submitted entries.
 const set=(g,e,s,names)=>{relays[relayKey(g,e,s)].legs=names.map(n=>athletes.find(a=>a.gender===g&&a.name===n)?.id||'');};
 set('Girls','200 Free','A',['Stephanie Batti','Ainsley Beyer','Michaela Owen','Hannah Jordan']);
 set('Girls','200 Free','B',['Hailey Brown','Victoria Rogers','Gabrielle Romero','Emma Owen']);
 set('Girls','200 Free','C',['Kathryn Tate','Sarah Owen','Emma Wells','Haylie Burke']);
 set('Girls','400 Free','A',['Stephanie Batti','Ainsley Beyer','Michaela Owen','Hannah Jordan']);
 set('Girls','200 Medley','A',['Hailey Brown','Michaela Owen','Gabrielle Romero','Ainsley Beyer']);
 set('Girls','200 Medley','B',['Haylie Burke','Victoria Rogers','Emma Wells','Emma Owen']);
 return {schema:1,athletes,districtEntries:{},relays,updatedAt:null};
}
export const formatTime = seconds=>{if(!Number.isFinite(seconds))return '—';let min=Math.floor(seconds/60);return `${min}:${(seconds-min*60).toFixed(2).padStart(5,'0')}`;};
export function parseTime(v){if(v==null||String(v).trim()==='')return null;const p=String(v).trim().split(':');const secs=p.length===2?Number(p[0])*60+Number(p[1]):p.length===1?Number(p[0]):NaN;return Number.isFinite(secs)&&secs>=0?secs:null;}
