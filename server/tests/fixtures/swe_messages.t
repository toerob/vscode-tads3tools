


modify Thing
















    cannotPourIntoMsg = buildMessage('cannot pour into', nil,((libGlobal.curAction).curDobj).fluidName)
    cannotPourOntoMsg = buildMessage('cannot pour onto', nil,((libGlobal.curAction).curDobj).fluidName)


;

CustomMessages
    messages = [
        'north', 'nord',
        'arrive north', 'norrifrån',
        'depart north', 'till norr',
        'east', 'öst',
        'arrive east', 'österifrån',
        'depart east', 'till öst',
        'west', 'väst',
        'arrive west', 'västerifrån',
        'depart west', 'till väst',
        'south', 'syd',
        'arrive south', 'söderifrån',
        'depart south', 'till norr',
        'northeast', 'nordöst',
        'arrive northeast', 'nordösterifrån',
        'depart northeast', 'till nordöst',
        'northwest', 'nordväst',
        'arrive northwest', 'nordvästerifrån',
        'depart northwest', 'till nordväst',
        'southeast', 'sydöst',
        'arrive southeast', 'sydösterifrån',
        'depart southeast', 'till sydöst',
        'southwest', 'sydväst',
        'arrive southwest', 'sydvästerifrån',
        'depart southwest', 'till sydväst',
        'down', 'ner',
        'arrive down', 'nerifrån',
        'depart down', 'ner',
        'up', 'upp',
        'arrive up', 'uppifrån',
        'depart up', 'upp',
        'in', 'in',
        'arrive in', 'inifrån',
        'depart in', 'in',
        'out', 'ut',
        'arrive out', 'utifrån',
        'depart out', 'ut',
        'port', 'babord',
        'arrive port', 'från babordsidan',
        'depart port', 'längs babordssidan',
        'starboard', 'styrbord',
        'arrive starboard', 'från styrbordssidan',
        'depart starboard', 'längs styrbordssidan',
        'forward', 'föröver',
        'arrive forward', 'föröverut',
        'depart forward', 'mot fören',
        'aft', 'akterut',
        'arrive aft', 'akterut',
        'depart aft', 'mot aktern',
        'dummy object inaccessible', 'Dummy-objektet failVerifyObj är inte ett giltigt objekt ',
        'explain numbering', 'Uppräkning av ämnesförslag kan slås på och av med kommandot ENUM FÖRSLAG',
        'no suggestions present', 'Ämnesförslag är inte tillgängligt i detta spel',
        'misc list suffix', '{här}',
        'onset of darkness', '\n{Jag} {är} nedsänkt i mörker. ',
        'remap error', '<b>FEL!</b> Den långa formen av remap är inte längre tillgänglig; använd en Doer istället. ',
        'command not present', '<.parser>Det kommandot behövs inte i denna berättelse.<./parser> ',
        'all not allowed', 'Tyvärr; ALLA är inte tillåtna med detta kommando. ',
        'quit query', '<.p>Vill du verkligen avsluta? (j/n)?\n>',
        'undo okay', 'Ett drag ångrat: {1}',
        'undo failed', 'Ångra misslyckades. ',
        'restart query', 'Vill du verkligen börja om från början (j/n)?\n>',
        'exit color onoff', 'Okej, färgning av oöppnade utgångar är nu {1}.<.p>',
        'exit color change', 'Okej, oöppnade utgångar i statusraden kommer nu att visas i {1}. ',
        'no exit lister', 'Tyvärr, det kommandot är inte tillgängligt i detta spel, eftersom det inte f{i|a}nns någon utgångslista. ',
        'score not present', '<.parser>Denna berättelse använder inte poäng.<./parser> ',
        'hints not present', '<.parser>Tyvärr, denna berättelse har inga inbyggda ledtrådar.<./parser> ',
        'no hints to disable', '<.parser>Detta spel har inga ledtrådar att stänga av.<./parser> ',
        'no extra hints', 'Tyvärr, det f{i|a}nns inga extra ledtrådar i detta spel. ',
        'extra hints on or off', 'Okej; extra ledtrådar är nu {1}. ',
        'game now brief', 'Spelet är nu i KORT läge. <<first time>>Fullständiga rumsbeskrivningar kommer nu endast att visas vid första besöket i ett rum eller som svar på ett uttryckligt <<aHref('LOOK', 'LOOK', 'Titta runt')>> kommando.<<only>> ',
        'game already brief', 'Spelet är redan i KORT läge. ',
        'game already verbose', 'Spelet är redan i UTFÖRLIGT läge. ',
        'game now verbose', 'Spelet är nu i UTFÖRLIGT läge. <<first time>>Fullständiga rumsbeskrivningar kommer att visas varje gång ett rum besöks.<<only>> ',
        'wait', 'Tiden {dummy} går. ',
        'jump', '{Jag} hoppar på stället, fruktlöst. ',
        'leap in the dark', 'Det kan vara klokare att inte ta ett språng i mörkret {här}.',
        'yell', '{Jag} skriker mycket högt. ',
        'smell nothing intransitive', '{Jag} kän{ner|de} ingen ovanlig lukt.<.p>',
        'hear nothing listen', '{Jag} hör{|de} inget ovanligt.<.p>',
        'cant do special', '{Jag} {kaninte} {1} {ref dobj}. ',
        'no sleeping', 'Detta {dummy} {är} ingen tid för att sova. ',
        'already standing', '{Jag} står redan. ',
        'vague travel', 'Vilken väg vill du gå? ',
        'nowhere back', '{Jag} har ingenstans att gå tillbaka till. ',
        'no way back', 'Det f{i|a}nns ingen väg tillbaka. ',
        'already back there', '{Jag} {är} redan där. ',
        'going back dir', '(går {1})\n',
        'no journey', '{Jag} g{ick|år} ingenstans. ',
        'off route', '{Jag} {är} inte längre på {min} rutt. Använd kommandot GÅ TILL för att ställa in en ny rutt. ',
        'going dir', '(går {1})\n',
        'no interlocutor', '{Jag} pratar inte med någon. ',
        'nothing to take', 'Det f{i|a}nns inget att ta från {1}. ',
        'not on anything', '{Jag} {är} inte på något. ',
        'not talking', '{Jag} pratar inte med någon. ',
        'no one here', 'Det f{i|a}nns ingen här att prata med. ',
        'think', '{Jag} {tänker}, därför {är} {jag}. ',
        'scripting canceled', '<.parser>Avbruten.<./parser>',
        'scripting failed exception', '<.parser>Misslyckades',
        'scripting failed', '<.parser>Misslyckades; ett fel uppstod vid öppning av skriptfilen.<./parser> ',
        'script off ignored', '<.parser>Inget skript spelas in för närvarande.<./parser>',
        'script off okay', '<.parser>Skriptning avslutad.<./parser>',
        'recording canceled', '<.parser>Avbruten.<./parser> ',
        'recording failed exception', '<.parser>Misslyckades',
        'recording failed', '<.parser>Misslyckades; ett fel uppstod vid öppning av kommandoinspelningsfilen.<./parser>',
        'record off ignored', '<.parser>Ingen kommandoinspelning görs för närvarande.<./parser> ',
        'record off okay', '<.parser>Kommandoinspelning avslutad.<./parser> ',
        'replay canceled', '<.parser>Avbruten.<./parser> ',
        'input script failed exception', '<.parser>Misslyckades',
        'input script failed', '<.parser>Misslyckades; skriptinmatningsfilen kunde inte öppnas.<./parser>',
        'save cancelled', '<.parser>Avbruten.<./parser> ',
        'save failed', '<.parser>Misslyckades; din dator kan ha ont om diskutrymme, eller så kanske du inte har nödvändiga behörigheter för att skriva denna fil.<./parser>',
        'save okay', '<.parser>Sparad.<./parser> ',
        'restore canceled', '<.parser>Avbruten.<./parser> ',
        'restore invalid file', '<.parser>Misslyckades: detta är inte en giltig sparad positionsfil.<./parser> ',
        'restore invalid match', '<.parser>Misslyckades: filen sparades inte av denna berättelse (eller sparades av en inkompatibel version av berättelsen).<./parser> ',
        'restore corrupted file', '<.parser>Misslyckades: denna sparade tillståndsfil verkar vara korrupt. Detta kan inträffa om filen ändrades av ett annat program, eller om filen kopierades mellan datorer i ett icke-binärt överföringsläge, eller om det fysiska mediet som lagrar filen skadades.<./parser> ',
        'restore failed', '<.parser>Misslyckades: positionen kunde inte återställas.<./parser>',
        'restore okay', '<.parser>Återställd.<./parser> ',
        'file prompt failed', '<.parser>Ett systemfel inträffade vid begäran om ett filnamn. Din dator kan ha ont om minne, eller kan ha ett konfigurationsproblem.<./parser> ',
        'no repeat', 'Tyvärr, det f{i|a}nns ingen åtgärd att upprepa. ',
        'cannot command system action', 'Endast spelaren kan utföra den typen av kommando. ',
        'follow', '<.p>{ref follower} följer efter {ref pc}. ',
        'not interlocutor', '{I\'m} pratar inte med {1}. ',
        'catch okay', '{Ref subj iobj} {fångar} {ref obj}. ',
        'drop catch', '{Ref subj iobj} misslyckas med att fånga {ref obj}, så att {he obj} landar på marken istället. ',
        'say head after actor', '{Jag} g{ick|år} {1} efter {2}. ',
        'state follow', '{Ref follower} följer efter {ref pc}. ',
        'nothing to discuss on that topic', '{Jag} {har} inget att diskutera om det ämnet just nu. ',
        'waiting for follow', '{Ref subj myactor} väntar på {ref pc} {dummy} att följa {honom myactor} {1}. ',
        'suggestion list intro', '{Jag} skulle kunna ',
        'open suggestion list intro', 'Bland annat skulle {jag} kunna ',
        'nothing in mind', '{Jag} {har} inget i åtanke att diskutera med {1} just nu. ',
        'nothing specfic in mind', '{Jag} {har} vid det här laget inte bestämt {mig} för vad {jag} ska diskutera med {1}. ',
        'or', ' eller ',
        'cannot move while attached', '{Ref subj cobj} {kan} inte flyttas medan {he cobj} {är} fäst vid {ref other}. ',
        'okay plug in', '{Jag} kopplar in {1}. ',
        'debugger not present', 'Debugger inte närvarande. ',
        'fiat lux', '{Jag} {blir} plötsligt {1} lysande. ',
        'no test scripts', 'Det f{i|a}nns inga testskript definierade i detta spel. ',
        'test sequence not found', 'Testsekvensen hittades inte. ',
        'debug test now holding', '{Jag} {håller} nu {1}.\n',
        'no shipboard directions', 'Skeppsriktningar {plural} {har} inte definierats. ',
        'no compass directions', 'Kompassriktningar {plural} {har} inte definierats. ',
        'explain exits on off', '<.p>Utgångslistning kan justeras med följande kommandon:\n UTGÅNGAR PÅ -- visa utgångar både i statusraden och i rumsbeskrivningar.\n UTGÅNGAR AV -- visa utgångar varken i statusraden eller i rumsbeskrivningar.\n UTGÅNGAR STATUS -- visa utgångar endast i statusraden.\n UTGÅNGAR TITT -- visa utgångar endast i rumsbeskrivningar.\n UTGÅNGAR FÄRG PÅ -- visa oöppnade utgångar i en annan färg.\n UTGÅNGAR FÄRG AV -- visa inte oöppnade utgångar i en annan färg.\n UTGÅNGAR FÄRG RÖD / BLÅ / GRÖN / GUL -- visa oöppnade utgångar i den angivna färgen. <.p>',
        'no exits from here', 'Det f{i|a}nns inga utgångar härifrån. ',
        'no exits', 'Utgångar: inga. ',
        'no clear exits', 'Det är inte tydligt var {jag} {kan} gå härifrån. ',
        'exits from here', '{Här}ifrån {kan} {jag} gå ',
        'cmdhelp show options', 'Vad vill du göra?\b <<aHref('1','1')>>. Gå till en annan plats\n <<aHref('2','2')>>. Undersök dina omgivningar\n <<aHref('3','3')>>. Flytta något\n <<aHref('4','4')>>. Manipulera något\n',
        'cmdhelp talk to someone', '<<aHref('5','5')>>. Prata med någon\n',
        'cmdhelp where go', 'Vart vill du gå?\n De möjliga utgångarna är: ',
        'cmdhelp no exit', 'Inga ',
        'cmdhelp go to', 'Eller du skulle kunna: ',
        'cmdhelp investigate', 'Här är några förslag (andra åtgärder kan också vara möjliga):\n',
        'cmdhelp relocate', 'Här är några förslag (det kan finnas flera andra möjligheter):\n',
        'cmdhelp manipulate', 'Några saker du kan prova inkluderar (det kan finnas många andra möjligheter):\b',
        'cmdhelp no one to talk to', 'Tyvärr, men det f{i|a}nns ingen här att prata med just nu.\b',
        'say dispensed', '{Jag} {tar} {1} från {2}. ',
        'no such footnote', '<.parser>Berättelsen har aldrig hänvisat till någon sådan fotnot.<./parser> ',
        'first footnote', 'Ett nummer i [hakparenteser] som det ovan hänvisar till en fotnot, som du kan läsa genom att skriva FOTNOT följt av numret: <<aHref('footnote 1', 'FOTNOT 1', 'Visa fotnot [1]')>>, till exempel. Fotnoter innehåller vanligtvis ytterligare bakgrundsinformation som kan vara intressant men inte är nödvändig för berättelsen. Om du föredrar att inte se fotnoter alls, kan du kontrollera deras utseende genom att skriva <<aHref('footnotes', 'FOTNOTER', 'Kontrollera fotnoters utseende')>>.',
        'acknowledge footnote status', '<.parser>Inställningen är nu {1}. <./parser>',
        'show footnotes off', 'AV, vilket döljer alla fotnotsreferenser. Skriv <<aHref('footnotes medium', 'FOTNOTER MEDIUM', 'Ställ in fotnoter till Medium')>> för att visa referenser till fotnoter förutom de du redan har sett, eller <<aHref('footnotes full', 'FOTNOTER FULL', 'Ställ in fotnoter till Full')>> för att visa alla fotnotsreferenser. ',
        'show footnotes medium', 'MEDIUM, vilket visar referenser till olästa fotnoter, men döljer referenser till de du redan har läst. Skriv <<aHref('footnotes off', 'FOTNOTER AV', 'Stäng av fotnoter')>> för att dölja fotnotsreferenser helt, eller <<aHref( 'footnotes full', 'FOTNOTER FULL', 'Ställ in fotnoter till Full')>> för att visa varje referens, även till anteckningar du redan har läst. ',
        'show footnotes full', 'FULL, vilket visar varje fotnotsreferens, även till anteckningar du redan har läst. Skriv <<aHref('footnotes medium', 'FOTNOTER MEDIUM', 'Ställ in fotnoter till Medium')>> för att visa endast referenser till anteckningar du ännu inte har läst, eller << aHref('footnotes off', 'FOTNOTER AV', 'Stäng av fotnoter')>> för att dölja fotnotsreferenser helt. ',


        'okay get on posture', '{1} på {2}. ',
        'cannot board self', '{Jag} {kan} knappast borda {mig} själv. ',
        'cannot add to derived relation', 'FEL! Du kan inte explicit relatera objekt via en härledd relation (%1). ',
        'cannot remove from derived relation', 'FEL! Du kan inte explicit ta bort en härledd relation (%) mellan objekt. ',
        'no such relation', 'FEL, det f{i|a}nns ingen sådan relation som <q>{1}</q>. ',
        'no relations defined', 'Inga relationer är definierade i detta spel. ',
        'no such relation', 'Det f{i|a}nns ingen sådan relation i spelet som {1}. ',
        'cant list derived relation', '<i>Eftersom {1} {är} en DerivedRelation, kan inga objekt den relaterar listas.</i> ',
        'no relations defined', '<i>inga relationer definierade</i> ',
        'onset of darkness', '\n{Jag} {är} nedsänkt i mörker. ',
        'command prompt', '>',
        'too heavy', '{Ref subj obj} {är} för tung{t/a} för att gå {1} {2}. ',
        'cant bear more weight', '{Ref subj this} {kan} inte bära mer vikt. ',
        'too heavy to carry', '{Ref subj dobj} {är} för tung{t/a} för {mig} att bära. ',
        'cannot carry any more weight', '{Jag} {kan} inte bära så mycket mer vikt. ',
        'too heavy to hide', '{Ref sub obj} {är} för tung{t/a} för att gömma {1} {2}. ',
        'collective group empty', 'Det f{i|a}nns ingen {1} här. ',
        'carrying collective group', '{Jag} {bär} {1}. ',
        'collective group members', 'Det f{i|a}nns {1} här. ',
        'say departing up stairs', '{Ref subj traveler} {går} upp {1}. ',
        'say following up staircase', '{Ref subj follower} följer {ref leader} upp {1}. ',
        'say departing down stairs', '{Ref subj traveler} {går} ner {1}. ',
        'say following down staircase', '{Ref subj follower} följer {ref leader} ner {1}. ',
        'click', 'Klick!',
        'okay pulled', 'Gjort|{Jag} {drar} {1}',
        'okay pushed', 'Gjort|{Jag} {trycker} {1}',
        'hints disabled', '<.parser>Ledtrådar är nu inaktiverade.<./parser> ',
        'sorry hints disabled', '<.parser>Tyvärr, men ledtrådar har inaktiverats för denna session, som du begärde. Om du har ändrat dig, måste du spara din nuvarande position, avsluta TADS-tolken och starta en ny tolksession.<./parser> ',
        'currently no hints', '<.parser>Tyvärr, inga ledtrådar är för närvarande tillgängliga. Vänligen återkom senare.<./parser> ',
        'hints done', '<.parser>Gjort.<./parser> ',
        'showHintWarning', '<.notification>Varning: Vissa människor gillar inte inbyggda ledtrådar, eftersom frestelsen att be om hjälp för tidigt kan bli överväldigande när ledtrådar är så nära till hands. Om du är orolig för att din viljestyrka inte kommer att hålla, kan du inaktivera ledtrådar för resten av denna session genom att skriva <<aHref('hints off', 'LEDTRÅDAR AV')>>',
        'explain extra hints', 'Om du är ny på Interaktiv Fiktion och vill läsa några extra tips och råd som kommer att dyka upp här och där när du utforskar berättelsen, skriv <<cmdStr('PÅ')>>. Om du bestämmer dig för att du inte vill ha fler av dessa bonustips, skriv bara <<cmdStr('AV')>>. ',
        'note with script', 'Kommentar inspelad. ',
        'note without script warning', 'Kommentar INTE inspelad. ',
        'note without script', 'Kommentar INTE inspelad. ',
        'command prompt', '>',
        'note main restore', 'Spelet återställt.<.p>',
        'show finish msg', '\b*** {1} ***\b\b',
        'invalid finish option', '<q>{1}</q> var inte ett av alternativen.<.p>',
        'show version', '{1} version {2}',
        'token error', 'Jag förstår inte skiljetecknet {1}',
        'empty command line', 'Jag ber om ursäkt?',
        'not understood', 'Jag förstår inte det kommandot.',
        'unknown word', 'Jag kän{ner|de} inte till ordet ""{1}"".',
        'no oops now', 'Tyvärr, jag är inte säker på vad du rättar.',
        'unmatched actor', '{Jag} {ser} inte {1} här.',
        'unmatched noun', '{Jag} {ser} inte {2} här.',

        'undo tip', 'Om detta inte blev riktigt som det var avsett, är det bra att veta att du alltid kan återställa ett  eller flera kommandon genom att skriva << aHref('ångra', 'ÅNGRA', 'Ta tillbaka det senaste kommandot')>>.'
,

        'oops tip', 'Om detta var en oavsiktlig felstavning, så kan du rätta den genom att skriva OOPS följd av det rättade ordet nu. Varje gång spelet pekar ut ett okänt ord, kan du rätta det genom att använda OOPS som ditt nästa kommando.'
,
        'no antecedent', 'Jag är inte säker på vad du menar med ""{1}"".',
        'antecedent out of scope', '{Jag} {ser} inte längre det här.',
        'nothing suitable for all', 'Det f{i|a}nns inget lämpligt för ALLA att hänvisa till. ',
        'not enough nouns', '{Jag} {ser|såg} inte så många {2} här.',
        'none in owners', 'Jag förstår inte vem "{2}" syftar på.',
        'none in owner', '{Ref subj obj} verkar inte ha någon {2}.',
        'none in locations', '{Jag} {ser|såg} ingen {2} {3} någon {4}.',
        'none in location', '{Jag} {ser|såg} ingen {2} {3} {ref 4}.',
        'none with contents in list', '{Jag} {ser|såg} ingen {2} av {3}.',
        'none with contents', '{Jag} {ser|såg} ingen {2} av {3}.',
        'be more specific', 'Jag vet inte vilka du menar. Kan du vara mer specifik?',
        'ordinal out of range', 'Tyvärr, jag {ser} inte vad du hänvisar till.',
        'multi not allowed', 'Tyvärr; flera objekt är inte tillåtna med det kommandot.',
        'container needs to be open', '{Ref subj obj} måste vara öpp{en/et/na} för det. ',
        'object needs to be open', '{Ref subj obj} måste vara öpp{en/et/na} för det. ',
        'obj needs to be closed', '{Ref subj obj} måste vara stängd för det. ',
        'need to hold', '{Jag} måste hålla {ref obj} för att göra det. ',
        'cannot do that while wearing', '{Jag} {kan} inte göra det medan {he actor} bär {ref obj). ',
        'cannot do that while attached', '{Jag} {kan} inte göra det medan {ref subj obj} {är} fäst vid {ref att). ',
        'no staging loc', '{Ref subj obj} {kan} inte nås. ',
        'still in nested', '{Jag} {kan} inte göra det medan {he actor} {är} {i loc}.',
        'full score item points', '\n <<totalPoints>> poäng<<totalPoints == 1 ? '' : 's'>> för ',
        'full score prefix', 'Din poäng består av:',
        'show score rank', 'Detta gör dig {1}. ',
        'remote contents prefix', '<.p>\^{1} {ser} {jag} ',
        'remote contents suffix', '. ',
        'remote subcontents prefix', '<.p>\^{1} {är} ',
        'remote subcontents suffix', '. ',
        'implicit go', '(först g{ick|år} till {1})\n',
        'corrected spelling', '(<i>{1}</i>)<br>',
        'dark desc', 'Det {är} kolsvart; {jag} {kan} inte se något alls. ',
        'proxy room desc', '{Jag} {kan} inte se mycket av {ref dobj} härifrån. ',
        'list immediate container', '{Jag} {befinner|befann} {mig} {i loc}. <.p>',
        'too big', '{Ref subj obj} {är} för stor{t/a} för att passa {1} {2}. ',
        'no room', 'Det f{i|a}nns inte tillräckligt med utrymme {1} {2} för {ref obj}. ',
        'cannot command thing', 'Det f{i|a}nns ingen mening med att försöka ge order till {1}. ',
        'nothing special', '{Jag} {ser} inget speciellt med {ref 1}. ',
        'taste nothing', '{Jag} smaka{r|de} inget oväntat.<.p>',
        'feel nothing', '{Jag} kän{ner|de} inget oväntat.<.p>',
        'report take', 'Tag{en/et/na}. | {jag} {tar|tog} {1}. ',
        'too big to carry', '{Ref subj dobj} {är} för stor{t/a} för {mig} att bära. ',
        'cannot carry any more', '{Jag} {kan} inte bära mer än {jag} redan bär. ',
        'report drop', 'Släppt. |{Jag} släpper {1}. ',
        'throw dir', '{Jag} kastar {ref obj} {1} och {he obj} landar på marken. ',
        'okay open', 'Öppnad. |{Jag} {öppnar} {1}. ',
        'report close', 'Gjort. |{Jag} {stänger} {1}. ',
        'report put on', '{Jag} lägger {1} på {ref iobj}. ',
        'report put in', '{Jag} lägger {1} i {ref iobj}. ',
        'no room in', 'Det f{i|a}nns inte tillräckligt med utrymme för {ref dobj} i {ref iobj}. ',
        'report put under', '{Jag} lägger {1} under {ref iobj}. ',
        'no room under', 'Det f{i|a}nns inte tillräckligt med utrymme för {ref dobj} under {ref iobj}. ',
        'report put behind', '{Jag} lägger {1} bakom {ref iobj}. ',
        'no room behind', 'Det f{i|a}nns inte tillräckligt med utrymme för {ref dobj} bakom {ref iobj}. ',
        'report unlock', 'Upplåst{a}.|{Jag} {låser} upp {1}. ',
        'report lock', 'Låst{a}.|{Jag} {låser} {1}. ',
        'report turn on', 'Gjort.|{Jag} slår på {ref dobj}. ',
        'report turn off', 'Gjort.|{Jag} slår av {ref dobj}. ',
        'report switch', 'Okej, {jag} slår {1} {2}. ',
        'okay wear', 'Okej, {jag} har nu på {sig} {1}. ',
        'okay doff', 'Okej, {jag} har inte längre på {sig} {1}. ',
        'throw', '{Ref subj obj} seglar genom luften och landar på marken. ',
        'okay get on', '{Jag} g{ick|år} på {1}. ',
        'okay get in', '{Jag} g{ick|år} in i {1}. ',
        'okay move to', '{Jag} flyttar {1} {dummy} till {ref iobj}. ',
        'okay lit', 'Gjort.|{Jag} tänder {1}. ',
        'extinguish', '{Jag} släcker {1}. ',
        'eat', '{Jag} äter {1}. ',
        'okay clean', 'Rengjord|{Jag} rengör {1}. ',
        'throw at', '{Ref subj obj} träffar {ref iobj} och landar på marken. ',
        'okay turn to', 'Okej, {jag} vrider {1} till {2}',
        'okay set to', '{Jag} ställ{er|de} in {1} till {2}. ',
        'route unknown', '{Jag} vet inte hur man kommer dit. ',
        'destination unknown', '{Jag} vet inte hur man når {honom dobj}.',
        'okay fasten', 'Gjort|{Jag} fäster {1}. ',
        'report kiss', 'Att kyssa {1} {dummy} {visar} sig vara märkbart otillfredsställande. ',
        'jump off', '{Jag} hoppar av {1} och landar på marken',
        'before push travel dir', '{Jag} tryck{er|te} {ref dobj} {1}. ',
        'describe move pushable', '{Ref subj obj} stannar. ',
        'push travel traversal', '{Jag} <<if matchPullOnly>> drar {ref dobj} {1}. ',
        'push travel somewhere', '{Jag} <<if matchPullOnly>> drar {ref dobj} {1}. ',
        'purloin', '{Jag} plötsligt {hittar} {mig själv} hållande {1}. ',
        'gonear', '{Jag} {är} översatt i ett ögonblick...<.p>',
        'okay unlock with', '{Jag} {låser} upp {ref dobj} med {ref iobj}. ',
        'okay lock with', '{Jag} {låser} {ref dobj} med {ref iobj}. ',
        'npc opens door', '{Ref subj traveler} {öppnar} {ref obj}. ',
        'door opens', '{Ref subj obj} {öppnas}. ',
        'say departing through door', '{Ref subj traveler} {lämnar} genom {1}. ',
        'say following through door', '{Ref subj follower} följer {ref leader} genom {1}. ',
        'no destination', 'Det {dummy} leder ingenstans. ',
        'say departing vague', '<.p>{ref subj traveler} {lämnar} området. ',
        'say departing dir', '<.p>{ref subj traveler} {går} {1}. ',
        'say following vague', '<.p>{ref subj follower} följer {ref leader}. ',
        'say following dir', '<.p>{ref subj follower} följer {ref leader} {1}. ',
        'fail check', '{Jag} {kan} inte göra det (men författaren till detta spel misslyckades med att specificera varför).',
        'mention full score', 'För att se din kompletta lista över prestationer, använd kommandot <<aHref('full score', 'FULL POÄNG', 'visa full poäng')>>. ',
        'extra hints off', 'av',
        'extra hints on', 'på',
        'extra hints command', 'EXTRA ',
        'explain continue', 'För att fortsätta resan använd kommandot <<aHref('Continue','FORTSÄTT','Fortsätt')>> eller C. ',
        'get scripting prompt', 'Vänligen välj ett namn för den nya skriptfilen',
        'cannot take actor', '{Ref subj dobj} {vill} inte låta {mig} {dummy} plocka upp {honom dobj}. ',
        'no response', '{Ref subj cobj} {svarar} inte. ',
        'refuse command', '{Jag} {har} bättre saker att göra. ',
        'follow actor', '{Jag} följer {1}. ',
        'actor stays put', '{Jag} väntar förgäves på att {1} ska gå någonstans. ',
        'no hello response', '{Jag} {har} nu {1} uppmärksamhet. ',
        'already talking', '{Jag} {pratar} redan med {1}. ',
        'no goodbye response', 'Samtalet {dummy} fortsätter. ',
        'cannot take from actor', '{Ref subj this} {vill} inte låta {mig} ta {ref obj} från {honom dobj}. ',
        'should not kiss', 'Det verkar knappast vara en bra idé att kyssa {ref dobj}. ',
        'kiss response', '{Ref subj dobj} {gillar} inte att bli kysst. ',
        'cannot attack actor', 'Det verkar knappast vara en bra idé att attackera {ref dobj}. ',
        'should not touch actor', '{Ref subj dobj} {gillar} inte att bli rörd. ',
        'wait to see', '{Jag} väntar för att se var {he dobj} går. ',
        'dont know where gone', '{Jag} vet inte var {ref subj dobj} har gått. ',
        'cannot start from here', '{Jag}{\'m} inte där {jag} {kan} börja. ',
        'cannot follow from here', '{Jag} {kan} inte följa {honom dobj} härifrån. ',
        'say yes', 'säg ja',
        'say no', 'säg nej',
        'say yes or no', 'säg ja eller nej',
        'say prefix', 'säg ',
        'ask query', 'fråga {honom interlocutor} ',
        'ask about', 'fråga {honom interlocutor} om ',
        'tell about', 'berätta {honom interlocutor} om ',
        'talk about', 'prata om ' ,
        'give', 'ge {honom interlocutor} ',
        'show', 'visa {honom interlocutor} ',
        'ask for', 'be {honom interlocutor} om ',
        'tell to', 'berätta {honom interlocutor} att ',
        'or list separator', '; eller ',
        'okay attach', '{Jag} fäster {1} till {ref iobj}. ' ,
        'already attached', '{Ref subj dobj} {är} redan fäst vid {1}. ',
        'not attached', '{Ref subj dobj} {är} inte fäst vid något. ',
        'okay detach', '{Jag} lossar {1}. ',
        'okay detach from', '{Jag} lossar {1} från {ref iobj}. ',
        'cannot detach from', 'Det f{i|a}nns ingenting som {kan} lösgöras från {ref iobj}.',
        'cannot detach this', '{Ref subj dobj} {kan} inte lossas från {1}. ',
        'cannot detach from self', '{Ref subj dobj} {kaninte} tas loss från {sigsjälv dobj}. ',
        'not attached to that', '{Ref subj dobj} {är} inte fäst vid det. ',
        'nothing attached', 'Det f{i|a}nns inget fäst vid {ref iobj}. ',
        'cannot be attached', '{Ref subj dobj} {kan} inte fästas vid {ref iobj}. ',
        'cannot attach to more', '{Jag} {kan} inte fästa {ref dobj} vid något annat medan {he dobj} {är} fäst vid {1}. ',
        'okay plug', '{Jag} kopplar in {1} i {ref iobj}. ' ,
        'already plugged in', '{Ref subj dobj} {är} redan inkopplad i {1}. ',
        'already plugged in vague', '{Ref subj dobj} {är} redan inkopplad. ',
        'cannot plug in any more', '{Jag} {kan} inte koppla in mer i {ref iobj}. ',
        'cannot be plugged in', '{Ref subj dobj} {kan} inte plugga in i {ref iobj}. ',
        'okay unplug from', '{Jag} drar ur {1} från {ref iobj}. ',
        'not plugged in', '{Ref subj dobj} {är} inte inkopplad i något. ',
        'not plugged into that', '{Ref subj dobj} {är} inte inkopplad i {ref iobj}. ',
        'being worn', ' (buren)',
        'implicit action report start', '(',
        'implicit action report separator', ' sedan ',
        'implicit action report terminator', ' först)\n',
        'implicit action report failure', 'försöker ',
        'exits', 'Utgångar:',
        'cant take from dispenser', '{Jag} {kan} inte ta {a dobj} från {ref iobj}. ',
        'cannot dispense', '{Jag} {kan} inte ta mer från {ref dobj}. ',
        'not that many left', 'Det f{i|a}nns inte så många kvar att ta. ',
        'footnote ref', '<sup>[<<aHref('footnote ' + num, toString(num))>>]</sup>',
        'footnotes', 'FOTNOTER ',
        'footnote off', 'AV',
        'footnote medium', 'MEDIUM',
        'footnote full', 'FULL',
        'say burned out', '{Ref subj obj} slocknar',
        'plunged into darkness', ', nedsänker {1} i mörker',
        'wont light', '\^{1} {dummy} vill inte tändas. ',
        'stands', 'står',
        'standing', 'stående',
        'i stand', '{Jag} står',
        'sits', 'sitter',
        'sitting', 'sittande',
        'i sit', '{Jag} sitter',
        'lies', 'ligger',
        'lying', 'liggande',
        'i lie', '{Jag} ligger',
        'okay stand on', '{Jag} står på {1}. ',
        'okay sit on', '{Jag} {sätter} {mig} på {1}. ',
        'okay lie on', '{Jag} {lägger} {mig} på {1}. ',
        'cannot stand in', '{Jag} {kan} inte stå i {ref dobj}. ',
        'okay stand in', '{Jag} står i {1}. ',
        'okay sit in', '{Jag} {sitter} i {1}. ',
        'cannot sit in', '{Jag} {kan} inte sitta i {ref dobj}. ',
        'okay lie in', '{Jag} ligger i {1}. ',
        'cannot lie in', '{Jag} {kan} inte ligga i {ref dobj}. ',
        'sky beyond reach', '{Ref subj cobj} {är} långt bortom {min} räckvidd. ',
        'cannot do to sensory', '{Jag} {kan} inte göra det mot {a cobj}. ',
        'only smell', '{Jag} {kan} inte göra det mot en lukt. ',
        'only listen', '{Jag} {kan} inte göra det mot ett ljud. ',
        'nothing on', '{Jag} hitta{r|de} inget av intresse på {ref dobj}. ',
        'cannot take component', '{Jag} {kan} inte ta {detta cobj}, {he dobj} {är} en del av {1}. ',
        'distant', '{Ref subj cobj} {är} för långt borta. ',
        'unthing absent', '{Ref subj cobj} {är} inte här. ',
        'too heavy', '{Ref subj cobj} {är} för tung{t/a} för att flytta. ',
        'cannot take immovable', '{Jag} {kan} inte ta {ref cobj). ',
        'traverse stairway up', 'upp {1}',
        'traverse stairway down', 'ner {1}',
        'cannot climb stairway down', '{Jag} {kan} inte klättra {ref dobj}, men {jag} {kan} gå ner {honom dobj}. ',
        'traverse path passage', 'ner {1}',
        'cannot take container door', '{Jag} {kan} inte ta {ref cobj}; {he dobj} {är} en del av {1}. ',
        'already pulled', '{Ref subj dobj} {är} redan i draget läge. ',
        'already pushed', '{Ref subj dobj} {är} redan i tryckt läge. ',
        'invalid setting', 'Det är inte en giltig inställning för {ref dobj}. ',
        'okay set', '{Jag} ställer in {ref dobj} till {1}. ',
        'already set', '{Ref subj dobj} {är} redan inställd på {1}. ',
        'finish death', 'DU HAR DÖTT',
        'finish victory', 'DU HAR VUNNIT',
        'finish failure', 'DU HAR MISSLYCKATS',
        'finish game over', 'SPELET ÄR SLUT',
        'first person pronoun', 'Jag',
        'command results prefix', '<.p0>',
        'command interuption prefix', '<.p>',
        'command results separator', '<.p>',
        'command results empty', 'Inget uppenbart {dummy}{händer}.<.p>',
        'command results suffix', '',
        'cannot see obj', '{Jag} {kan} inte se {1}. ',
        'too far away to hear obj', '{Ref subj obj} {är} för långt borta för att höra. ',
        'cannot hear', '{Jag} {kan} inte höra {1} genom {2}. ',
        'too far away to smell obj', '{Ref subj obj} {är} för långt borta för att lukta. ',
        'cannot smell through', '{Jag} {kan} inte lukta {1} genom {2}. ',
        'in room name', 'i {1}',
        'too far away to see detail', '{Ref subj dobj} {är} för långt borta för att se några detaljer. ',
        'too far away to hear', '{Ref subj dobj} {är} för långt borta för att höra tydligt. ',
        'too far away to read', '{Ref subj dobj} {är} för långt borta för att läsa. ',
        'too far away to smell', '{Ref subj dobj} {är} för långt borta för att lukta tydligt. ',
        'command look around', 'titta runt',
        'command full score', 'full poäng',
        'dark name', 'I mörkret',
        'cannot reach', '{Jag} {kan} inte nå {ref target} genom {ref obj}. ',
        'too far away', '{Ref subj obj} {är} för långt borta. ',
        'cannot reach out', '{Jag} {kan} inte nå {ref target} från {ref loc}. ',
        'not important', '{Ref subj cobj} {är} inte viktig{t/a}. ',
        'too dark to see', 'Det {är} för mörkt för att se något. ',
        'cannot smell', '{Jag} {kan} inte lukta på {ref dobj}. ',
        'smell nothing', '{Jag} {känner} ingen ovanlig lukt.<.p>',
        'hear nothing listen to', '{Jag} hör{|de} inget ovanligt.<.p>',
        'cannot taste', '{Ref subj dobj} {är} inte lämplig{t/a} att smaka på. ',
        'cannot feel', 'Det {är} knappast en bra idé att försöka känna på {ref dobj}. ',
        'cannot take', '{Ref subj dobj} {sitter} fast på plats. ',
        'already holding', '{Jag} {håller} i {ref dobj} redan. ',
        'already holding objects', '{Jag} {håller} redan i {1}.\n',
        'too big for me to hold', '{1} för {mig} att hålla i. ',
        'hands too full to hold', 'Mina händer är för fulla för att hålla i {1}.\n ',
        'cannot take my container', '{Jag} {kan} inte ta {ref dobj} medan {jag} {befinner} {mig} {1} {honom dobj}. ',
        'cannot take self', '{Jag} {kan} knappast ta {mig} själv. ',
        'reveal move under', 'Flyttar {1} {dummy} avslöja{r/de} {2} tidigare dold under {3}. ',
        'reveal move behind', 'Flyttar {1} {dummy} avslöja{r/de} {2} tidigare dold bakom {3}. ',
        'cannot drop', '{Jag} {kan} inte släppa {ref subj dobj}. ',
        'not holding', '{Jag} {håller} inte i {ref dobj}. ',
        'not holding any', '{Jag} {håller} inte i något av dem. ',
        'part of me', '{Ref subj dobj} {är} en del av {mig}. ',
        'cannot read', 'Det f{i|a}nns inget att läsa på {ref dobj}. ',
        'cannot follow', '{Ref subj dobj} {går} ingenstans. ',
        'cannot follow self', '{Jag} {kan} inte följa {mig} själv. ',
        'cannot attack', 'Bäst att undvika meningslöst våld. ',
        'futile attack', 'Att attackera {1} {visar} sig vara meningslöst. ',
        'cannot attack with self', '{Jag} {kan} inte attackera något med {mig} själv. ',
        'cannot attack with', '{Jag} {kan} inte attackera någonting alls med {detta iobj}. ',
        'cannot break', '{Ref subj dobj} {är} inte något {jag} {kan} ta sönder. ',
        'dont break', '{Jag} {ser} ingen mening med att ta sönder {detta dobj}. ',
        'cannot throw', '{Jag} {kan} inte kasta {ref dobj} någonstans. ',
        'cannot open', '{Ref subj dobj} {är} inte något {jag} {kan} öppna. ',
        'already open', '{Ref subj dobj} {är} redan öpp{en/et/na}. ',
        'locked', '{Ref subj dobj} {är} låst{a}. ',
        'not closeable', '{Ref subj dobj} {är} inte något som {kan} stängas. ',
        'already closed', '{Ref subj dobj} {är} inte öpp{en/et/na}. ',
        'cannot turn', '{Ref subj dobj} {kan} inte vridas. ',
        'turn useless', 'Att vrida på {1} {dummy} {gör} ingen nytta. ',
        'cannot turn with', '{Jag} {kan} inte vrida någonting med {detta iobj}. ',
        'turn self', '{Jag} {kan} inte vrida någonting med {sig} själv. ',
        'cannot cut', '{Jag} {kan} inte skära {ref dobj}. ',
        'cannot cut with', '{Jag} {kan} inte skära något med {detta iobj}. ',
        'cannot cut with self', '{Jag} {kan} inte skära något med {sig} själv. ',
        'look in', '{Jag} {ser} inget intressant i {ref dobj}. ',
        'cannot look under', '{Jag} {kan} inte titta under {detta dobj}. ',
        'look under', '{Jag} hitta{r|de} inget av intresse under {ref dobj}. ',
        'cannot look behind', '{Jag} {kan} inte titta bakom {detta dobj}. ',
        'look behind', '{Jag} hitta{r|de} inget intressant bakom {ref subj dobj}. ',
        'cannot look through', '{Jag} {kan} inte titta genom {detta dobj}. ',
        'look through', '{Jag} {ser} inget genom {ref dobj}. ',
        'cannot go through', '{Jag} {kan} inte gå genom {detta dobj}. ',
        'cannot push', 'Det f{i|a}nns ingen mening med att försöka trycka på {detta dobj}. ',
        'push no effect', 'Att trycka på {1} {dummy} {har} ingen effekt. ',
        'cannot pull', 'Det f{i|a}nns ingen mening med att försöka dra {detta dobj}. ',
        'pull no effect', 'Att dra {1} {dummy} {har} ingen effekt. ',
        'already in', '{Ref subj dobj} {är} redan {1}. ',
        'circularly in', '{Jag} {kan} inte lägga {ref dobj} {1} medan {ref subj iobj} {är} {i dobj}. ',
        'cannot put in self', '{Jag} {kan} inte lägga {ref dobj} {1} {sigsjälv dobj}. ',
        'cannot put on', '{Jag} {kan} inte lägga något på {ref iobj}. ',
        'cannot put in', '{Jag} {kan} inte lägga något i {ref iobj}. ',
        'cannot put under', '{Jag} {kan} inte lägga något under {ref iobj}. ',
        'cannot put behind', '{Jag} {kan} inte lägga något bakom {ref iobj}. ',
        'not lockable', '{Ref subj dobj} {är} inte låsbar{t/a}. ',
        'key not needed', '{Jag} behöver inte en nyckel för att låsa och låsa upp {ref dobj}. ',
        'indirect lockable', '{ref dobj} verkar använda någon annan typ av låsmekanism. ',
        'not locked', '{Ref subj dobj} {är} inte låst{a}. ',
        'cannot unlock with', '{Jag} {kan} inte låsa upp något med {detta dobj}. ',
        'cannot unlock with self', '{Jag} {kan} inte låsa upp något med {sigsjälv dobj}. ',
        'already locked', '{Ref subj dobj} {är} redan låst{a}. ',
        'cannot lock with', '{Jag} {kan} inte låsa något med {detta dobj}. ',
        'cannot lock with self', '{Jag} {kan} inte låsa något med {sigsjälv dobj}. ',
        'with key', '<.assume>med {1}<./assume>\n',
        'key doesnt work', 'Tyvärr fungerar inte {1} {dummy} på {ref dobj}. ',
        'not switchable', '{Ref subj dobj} {kan} inte slås på och av. ',
        'already switched on', '{Ref subj dobj} {är} redan påslag{en/et/na}. ',
        'not switched on', '{Ref subj dobj} {är} inte påslag{en/et/na}. ',
        'cannot flip', '{Jag} {kan} inte använda {ref dobj}. ',
        'cannot burn', '{Jag} {kan} inte bränna {ref dobj}. ',
        'cannot burn with', '{Jag} {kan} inte bränna {ref dobj} med {detta iobj}. ',
        'cannot wear', '{Ref subj dobj} {går} inte att bära. ',
        'already worn', '{Jag} {har} redan på {sig} {ref dobj}. ',
        'not worn', '{Jag} {har} inte på {sig} {ref dobj}. ',
        'cannot climb', '{Ref subj dobj} {är} inte något som {jag} {kan} klättra på. ',
        'cannot climb down', '{Ref subj dobj} {är} inte något som {jag} {kan} klättra ner för. ',
        'cannot board', '{Ref subj dobj} {är} inte något {jag} {kan} gå på. ',
        'already on', '{Jag} {är} redan {i dobj}. ',
        'cannot board carried', '{Jag} {kan} inte gå på {ref dobj} medan {jag} bär {honom dobj}. ',
        'cannot stand on', '{Ref subj dobj} {är} inte något {jag} {kan} stå på. ',
        'cannot sit on', '{Ref subj dobj} {är} inte något {jag} {kan} sitta på. ',
        'cannot lie on', '{Ref subj dobj} {är} inte något {jag} {kan} ligga på. ',
        'cannot enter', '{Ref subj dobj} {är} inte något {jag} {kan} gå in i. ',
        'actor already in', '{Jag} {är} redan {i dobj}. ',
        'cannot enter carried', '{Jag} {kan} inte gå in i {ref dobj} medan {jag} bär på {dem dobj}. ',
        'okay get outof', 'Okej, {jag} {kliver} {utur dobj}. ',
        'actor not in', '{Jag} {är} inte i {ref dobj}. ',
        'actor not on', '{Jag} {är} inte på {ref dobj}. ',
        'cannot remove', '{Ref subj dobj} {kan} inte tas bort. ',
        'cannot move', '{Ref subj dobj} {rör} {obj dobj} inte. ',
        'move no effect', 'Det ger ingenting att flytta på {1}{dummy}. ',
        'cannot move with', '{Jag} {kan} inte flytta {ref dobj} med {ref iobj}. ',
        'not by obj', '{Ref subj dobj} {är} inte vid {ref iobj}. ',
        'cannot move with self', '{Ref subj dobj} {kan} inte användas för att flytta {sigsjälv dobj}. ',
        'cannot move to', '{Ref subj dobj} {kan} inte flyttas till {ref iobj}. ',
        'cannot move to self', '{Ref subj dobj} {kan} inte flyttas till {sigsjälv dobj}. ',
        'already moved to', '{Ref subj dobj} {har} redan flyttats till {ref iobj}. ',
        'cant move away from self', '{Jag} {kan} inte flytta bort {ref dobj} från {sigsjälv dobj}. ',
        'cannot light', '{Ref subj dobj} {är} inte något {jag} {kan} tända. ',
        'already lit', '{Ref subj dobj} {är} redan tän{d/t/da}. ',
        'not lit', '{Ref subj dobj} {är} inte tän{d/t/da}. ',
        'cannot extinguish', '{Ref dobj} {kan} inte släckas. ',
        'cannot eat', '{Ref subj dobj} {är} uppenbarligen oätlig{t/a}. ',
        'not potable', '{Jag} {kan} inte dricka {1}. ',
        'cannot clean', '{Ref subj dobj} {är} inte något {jag} {kan} rengöra. ',
        'already clean', '{Ref subj dobj} {är} redan tillräckligt ren. ',
        'no clean', '{Ref subj dobj} behöver inte rengöras. ',
        'dont need cleaning obj', '{Jag} behöver inte rengöra {ref dobj}. ',
        'cannot clean with', '{Jag} {kan} inte rengöra {ref dobj} med {ref iobj}. ',
        'cannot dig', '{Jag} {kan} inte gräva där. ',
        'cannot dig with', '{Jag} {kan} inte gräva något med {detta iobj}. ',
        'cannot dig with self', '{Jag} {kan} inte gräva {ref dobj} med {sig} själv{t/a}. ',
        'not inside', '{Ref dobj} {är} inte {i iobj}. ',
        'cannot take from self', '{Jag} {kan} inte ta {ref subj dobj} från {ref dobj}. ',
        'cannot throw at', '{Jag} {kan} inte kasta något på {ref iobj}. ',
        'cannot throw at self', '{Ref subj dobj} {kan} inte kastas på {sig} själv{t/a}. ',
        'cannot throw to', '{Ref subj dobj} {kan} inte fånga något. ',
        'cannot throw to self', '{Ref subj dobj} {kan} inte fånga {sig} själv{t/a}. ',
        'throw falls short', '{Ref subj dobj} landar långt ifrån {ref iobj}. ',
        'cannot turn to', '{Jag} {kan} inte vrida {detta dobj} till något. ',
        'cannot set to', '{Jag} {kan} inte ställa in {detta dobj} till något. ',
        'already there', '{Jag} {är} redan där. ',
        'already present', '{Ref subj dobj} {är} redan här. ',
        'cannot attach', '{Jag} {kan} inte fästa {ref dobj} till något. ',
        'cannot attach to', '{Jag} {kan} inte fästa något till {ref iobj}. ',
        'cannot attach to self', '{Jag} {kan} inte fästa {ref iobj} till {sig} själv{t/a}. ',
        'cannot detach', 'Det f{i|a}nns inget från vilket {ref subj dobj} {kan} lossas. ',
        'cannot detach from', 'Det f{i|a}nns inget som {kan} lossas från {ref iobj}. ',
        'cannot detach from self', '{Ref subj dobj} {kan} inte lossas från {sig} själv{t/a}. ',
        'cannot fasten', '{Ref subj dobj} {är} inte något {jag} {kan} fästa. ',
        'already fastened', '{Ref subj dobj} {är} redan fäst. ',
        'cannot fasten to', '{Jag} {kan} inte fästa något till {detta iobj}. ',
        'cannot fasten to self', '{Ref subj iobj} {kan} inte fästas till {sig} själv{t/a}. ',
        'cannot unfasten', '{Ref subj dobj} {kan} inte lossas. ',
        'cannot unfasten from', '{Jag} {kan} inte lossa något från {detta iobj}. ',
        'cannot unfasten from self', '{Jag} {kan} inte lossa {ref dobj} från {sig} själv{t/a}. ',
        'not fastened', '{Ref subj dobj} {är} inte fäst. ',
        'cannot plug', '{Ref subj dobj} {kan} inte kopplas in i något. ',
        'cannot plug into self', '{Jag} {kan} inte koppla in {ref dobj} i {sig} själv{t/a}. ',
        'cannot plug into', '{Jag} {kan} inte koppla in något i {ref iobj}. ',
        'cannot unplug', '{Ref subj dobj} {kan} inte kopplas ur. ',
        'cannot unplug from self', '{Jag} {kan} inte koppla ur {ref dobj} från {sig} själv{t/a}. ',
        'cannot unplug from', '{Jag} {kan} inte koppla ur något från {ref iobj}. ',
        'cannot kiss', '{Jag} {kan} verkligen inte kyssa {detta dobj}. ',
        'cannot jump off', '{Jag} {är} inte på {ref dobj}. ',
        'cannot jump over self', '{Jag} {kan} knappast hoppa över {sigsjälv dobj}. ',
        'pointless to jump over', 'Det {är} meningslöst att hoppa över {ref dobj}. ',
        'cannot set', '{Ref subj dobj} {är} inte något {jag} {kan} ställa in. ',
        'cannot type on', '{Jag} {kan} inte skriva något på {ref dobj}. ',
        'cannot enter on', '{Jag} {kan} inte ange något på {ref dobj}. ',
        'cannot write on', '{Jag} {kan} inte skriva något på {ref dobj}. ',
        'cannot consult', '{Ref subj dobj} {är} inte en informationskälla. ',
        'cannot pour', '{Jag} {kan} inte hälla {1} någonstans. ',
        'cannot pour on self', '{Jag} {kan} inte hälla {ref dobj} på {sigsjälv dobj}. ',
        'cannot pour in self', '{Jag} {kan} inte hälla {ref dobj} i {sigsjälv dobj}. ',
        'cannot pour into', '{Jag} {kan} inte hälla {1} i {ref iobj}. ',
        'cannot pour onto', '{Jag} {kan} inte hälla {1} på {ref iobj}. ',
        'should not pour into', 'Det {är} nog bäst att inte hälla {1} i {ref iobj}. ',
        'should not pour onto', 'Det {är} nog bäst att inte hälla {1} på {ref iobj}. ',
        'cannot screw', '{Jag} {kan} inte skruva {ref dobj}. ',
        'cannot screw with', '{Jag} {kan} inte skruva något med {detta iobj}. ',
        'cannot screw with self', '{Jag} {kan} inte skruva {ref iobj} med {sig} själv{t/a}. ',
        'cannot unscrew', '{Jag} {kan} inte skruva loss {ref dobj}. ',
        'cannot unscrew with', '{Jag} {kan} inte skruva loss något med {detta iobj}. ',
        'cannot unscrew with self', '{Jag} {kan} inte skruva loss {ref iobj} med {sig} själv{t/a}. ',
        'cannot push own container', '{Jag} {kan} inte trycka {ref dobj} medan {jag} {är} {1} {honom dobj}. ',
        'cannot push via self', '{Jag} {kan} inte {1} {ref dobj} {2} {sigsjälv dobj}. ',
        'cannot push travel', 'Det f{i|a}nns ingen mening med att försöka {1} {detta dobj} någonstans. ',
        'cannot push through', '{Jag} {kan} inte {1} {ref dobj} genom {ref iobj}. ',
        'cannot push into', '{Jag} {kan} inte {1} in något i {ref iobj}. ',
        'cannot push up', '{Jag} {kan} inte {1} upp något i {ref dobj}. ',
        'cannot push down', '{Jag} {kan} inte {1} ner något i {ref dobj}. ',
        'cannot talk', 'Det f{i|a}nns ingen mening med att försöka prata med {ref cobj}. ',
        'cannot talk to self', 'Att prata med {sig} själv {är} meningslöst. ',
        'already has', '{Ref subj iobj} {har} redan {ref dobj}. ',
        'cannot give to', '{Jag} {kan} inte ge något till {detta iobj}. ',
        'cannot give to self', '{Jag} {kan} inte ge något till {sig} själv{t/a}. ',
        'cannot show to', '{Jag} {kan} inte visa något för {detta iobj}. ',
        'cannot show to self', '{Jag} {kan} inte visa något för {sig} själv{t/a}. ',
        'not talking to anyone', '{Jag} pratar inte med någon. ',
        'no longer talking to anyone', '{Jag} pratar inte längre med någon. ',
        'cannot purloin self', '{Jag} {kan} inte stjäla {mig} själv. ',
        'cannot purloin room', '{Jag} {kan} inte stjäla ett rum. ',
        'cannot purloin container', '{Jag} {kan} inte stjäla en behållare. ',
        'cannot go there', '{Jag} {kan} inte gå dit just nu. ',
        'thoughts prefix', '{Jag} kommer ihåg ',
        'fact intro', 'att',
        'no thoughts', '{Jag} har inga tankar om det specifika ämnet.',
        'told me that', ' berättade för {mig} ',
        'knew fact already', ' (men det visste {jag} redan)',
        'consult prefix', '{Ref subj dobj} informera{r/de} {mig}',
        'no consult', '{Ref subj dobj} {har} ingenting användbart att tillföra i ämnet. ',
        'no matched topic', '{Ref subj dobj} har inget att säga om det. ',
        'cannot go', '{Jag} {kan} inte gå den vägen. ',
        'cannot go in dark', 'Det {är} för mörkt för att se vart {jag} går. ',
        'no thought comes to mind', '{Du} kommer inte på något. ',

        'scripting okay web temp', '<.parser>Transkriberingen kommer att sparas. Skriv << aHref('skript av', 'SKRIPT AV','Stäng av skript')>> för att avbryta skriptet och ladda ner det sparade transkriptet.<./parser><.p> '
,
        'scripting okay', '<.parser>Transkriberingen kommer att sparas i filen. Skriv <<aHref('skript av',                                      'SKRIPT AV', 'Stäng av skript')>> för att avbryta transkriberingen.<./parser><.p> '
,
        'get recording prompt', 'Välj ett namn för den nya kommandologgfilen',


        'recording okay', '<.parser>Kommandon kommer nu att spelas in. Skriv << aHref('spela in av', 'SPELA IN AV', 'avsluta kommandoinspelning')>> för att stoppa inspelningen av kommandon.<./parser><.p> '
,
        'get replay prompt', 'Välj kommandologgfil att spela upp',
        'get save prompt', 'Spara spel till fil',
        'get restore prompt', 'Återställ spel från fil',
        'no need to refer', 'Det är inget du behöver hänvisa till.',
        'cannot go through closed door', '{Ref subj obj} {är} i vägen. ',
        'traverse door', 'genom {1}',
        'traverse connector', '{1}',
        'north', 'norr',
        'depart north', 'till norr',
        'east', 'öster',
        'depart east', 'till öster',
        'south', 'söder',
        'depart south', 'till söder',
        'west', 'väster',
        'depart west', 'till väster',
        'northeast', 'nordost',
        'depart northeast', 'till nordost',
        'northwest', 'nordväst',
        'depart northwest', 'till nordväst',
        'southeast', 'sydost',
        'depart southeast', 'till sydost',
        'southwest', 'sydväst',
        'depart southwest', 'till sydväst',
        'down', 'ner',
        'depart down', 'ner',
        'up', 'upp',
        'depart up', 'upp',
        'in', 'in',
        'depart in', 'inuti',
        'out', 'ut',
        'depart out', 'ut',
        'port', 'babord',
        'depart port', 'till babord',
        'starboard', 'styrbord',
        'depart starboard', 'till styrbord',
        'forward', 'framåt',
        'depart forward', 'framåt',
        'aft', 'akterut',
        'depart aft', 'akterut',
        'no thought in mind', '{Jag} {har} inget att prata om just {nu|då}. ',
        'enterable with door', '\^{1} {ser} {jag} {2} nåbar via {3}.',
        'passage that way', '\^{1} {jag} {ser} {2}. ',
        'ask connector options', '\^{1} {jag} {ser} {2}. ',
        'room that way', '\^{1} {dummy}{ligger} {2}. ',
        'could go that way', 'Det {dummy} {ser} ut som att {jag} möjligen kan ta mig den vägen. ',
        'intro look dirdesc', '\^{1} {jag} {ser} ',
        'nothing unexpected that way', '{Jag} {ser} inget oväntat åt det hållet. ',
        'too dark to look that way', 'Det{dummy} {är} för mörkt för att kunna se något åt det hållet. ',
        'doorway desc', 'En dörröppning är bara en vanlig dörröppning. ',
        'passageway desc', 'En passage är bara en vanlig passage. ',
        'pathway desc', 'En stig är bara en vanlig stig.',
        'archway desc', 'En valvport är bara en vanlig valvport.',
        'multi door', 'Mer än en dörröppning leder ut härifrån; du behöver säga åt vilket håll du vill gå.',
        'multi passage', 'Mer än en gång leder härifrån; du måste ange vilken väg du vill gå.',
        'multi path', 'Mer än en stig leder härifrån; du måste säga vilken väg du vill gå.',
        'multi arch', 'Mer än en valvgång leder ut härifrån; du måste säga åt vilket håll du vill gå.',
        'not in posture to travel', '{Jag} behöv{er/de} vara {1} först. ',
        'contradiction', '<.p>Det verkar finnas en viss motsägelse {här}.<.p>',
        'list and', ' och ',
        'list tall prefix', '\n{Jag} {bär} på:\n ',
        'list tall empty', '\n{Jag} {är} tomhänt. ',
        'first score change', '<.p><.parser>Om du föredrar att inte få poängnotifikationer framöver, skriv NOTIFIERA AV.<./parser>',
        'cant see in from here', '{Jag} {kan} inte se in i {ref dobj} {här}ifrån.',
        'multi destination', 'Åt det hållet {plural}{ligger} {1}. ',
        'no facts defined', 'Inga fakta har definierats i det här spelet.',
        'no such fact', '''Ingen fakta med namnet '<<literal>>' har definieras i spelet. ''',
        'not out of subnested', '{Jag} behöv{er/de} vara {1} före {jag} {kan} ta {mig} {2}. ',
        'not held', '{Jag} håller inte i {ref obj}. ',
        'nothing more to discuss on that topic', '{Jag} {har} ingenting mer att diskutera i ämnet. ',
        'non conv response', 'Det är bäst att jag håller mig fokuserad på konversationen.',
        'explain enumerating and hyperlinking', 'Uppräkning och/eller hyperlänkning av ämnesförslag kan  slås på och av med kommandona ENUM SUGGS respektive HYPER SUGGS.'
,
        'no enumerations', 'Uppräknade förslag är inte tillgängliga just nu. ',
        'enmeration out of range', 'För att välja ett uppräknat förslag, vänligen ange ett nummer mellan 1 och {1}.',
        'okay move from', '{Jag} flytta{r/de} bort {1} {dummy} från {ref iobj}. ',
        'needs html terp', 'Denna feature kräver en HTML interpreter. ',
        'inventory tall', 'Inventarielisting har nu satts till LÅNG',
        'no need to lookdir', '<.parser>Det {finns} ingen anledning att titta åt något specifikt håll {här}.<./parser>',
        'not a bird', '{Jag} {är} inte en fågel. ',
        'consult about vague', 'Var mer specifik, t.ex. KONSULTERA SVART BOK OM MAGI eller LÄS OM MAGI I SVART BOK.',
        'doorway vocab', 'dörr|öppning+en;vanlig+a;dörr+en',
        'open doorway', 'Inget behov i det här fallet',
        'close doorway', 'Inget behov i det här fallet.',
        'door not important', 'There\'s no need to fiddle with such an ordinary door.',
        'passageway vocab', 'passageway;ordinary wide long short narrow straight;passage',
        'passage not important', 'There\'s no need to fiddle with such an ordinary passage. ',
        'pathway vocab', 'pathway;ordinary narrow wide broad long short straight windy crooked;path',
        'path not important', 'There\'s no need to fiddle with such an ordinary path. ',
        'archway vocab', 'archway;ordinary; large small big arch',
        'arch not important', 'There\'s no need to fiddle with such an ordinary archway. ',
        'think about', 'tänka på ',
        'too dark to read', 'Det är inte tillräckligt ljust {här} för att läsa {ref dobj}. ',
        'look up', 'slå upp ',
        'verbose consult prefix', 'konsultera ' + theName + ' om',
        'status line noexits', '<i>Inga</i>',
        'which do you mean', 'Vilken menar du',
        'cant climb from here', '{Jag} {kan} inte klättra upp för {ref dobj} {här}ifrån. ',
        'cannot push climb here', '{Jag} {kan} inte gå upp för {ref iobj} {här}ifrån.',
        'cannot push climb down here', '{Jag} {kan} inte gå nerför {ref iobj} {här}ifrån.',
        'too far away to talk', '{Ref subj obj} {är} för långt borta för att prata med. ',
        'cannot talk to obj', '{Jag} {kan} inte prata med {ref obj} just {nu}. ',
        'cannot reach inside from', '{Jag} {kan} inte nå {1} från utsidan av {2}. ',
        'cannot talk basicactor', '{Ref subj cobj} {verkar} inte intresserad. ',

        'okay push into', '{Jag} <<if matchPullOnly>> drar {ref dobj} {1} {2}. ',
        'okay push into', '{Jag} <<if matchPullOnly>>dr{ar|og} <<else>>tryck{er|te}<<end>> in {ref dobj} i {ref iobj}. ',
        'okay push out of', '{Jag} <<if matchPullOnly>>dr{ar|og} <<else>>tryck{er|te}<<end>> ut {ref dobj} ur {ref iobj}. ',




        'tips on', 'Tips are now on. ',
        'tips off', 'Tips are now off. ',
        'disambig enum on', 'Enumeration of disambiguation choices is now on. ',
        'disambig enum off', 'Enumeration of disambiguation choices is now off. ',
        'brief goto', 'Goto mode is now brief (no room descriptions or stopping to CONTINUE)',
        'brief goto', 'Goto mode is now fast (no stopping to CONTINUE)',
        'brief goto', 'Goto mode is now normal (explicit CONTINUE needed for each step)',


        'cant climb doen from here', '{Jag} {kan} inte klättra ner för {ref dobj} {här}ifrån. ',
        'alreadt attached to iobj', '{The subj dobj} {is} already attachd to {1}. ',




























































        'explain goto options', '<.p><.parser>För att aktivera snabb GÅ TILL utan FORTSÄTT, använd GÅ TILL LÄGE SNABB eller  GÅ TILL KORT (det senare undertrycker rumsbeskrivningarna för rummen längs vägen).  För att återuppta användningen av FORTSÄTT, använd GÅ TILL LÄGE FORTSÄTT. Alla lägesändringar träder i kraft vid nästa GÅ TILL-kommando.<./parser> '





    ]
;




modify explicitExitLister
    showListItem(obj, options, pov, infoTab)
    {
        htmlSay('<<aHref(obj.dir_.name, obj.dir_.name, 'Gå ' + obj.dir_.name, 0)>>');
        if(showDestNames && obj.dest_ && (obj.dest_.visited || obj.dest_.familiar))
            message('exit lister dest name', nil);

    }
;

modify Action
    acknowledgeNotifyStatus(stat) {

        message('acknowledge notify status', nil)
;
    }
;

modify FactHelper
    doubtFactMsg(beliefVal) {
        return buildMessage('doubt fact', nil)
;
    }
;

modify Actor
    pcDefaultSayQuip =
        bmsg('<q><<(((libGlobal.curAction).curTopic).getTopicText).substr(1,1).toUpper()>><<(((libGlobal.curAction).curTopic).getTopicText).substr(2).toLower()>>,</q> {säger} {jag}. ')

    postureDesc = 'är'

    actorSpecialDesc() {
        if(isPlayerChar) {
            return;
        }
        local descName = proper ? theName : aName;

        if(location == getOutermostRoom)
            dmsg('\^<<descName>> <<postureDesc>> {här|där}. ');
        else
            dmsg('\^<<descName>> <<postureDesc>> <<location.objInName>>. ');
    }

    sayActorArriving(fromLoc)
    {
        local traveler = self;
        ((libGlobal.curAction).setMessageParams('traveler', traveler));
        local dir = getOutermostRoom.getDirectionTo(fromLoc);
        if(dir) {

            dmsg('{Ref subj traveler} {anländer} från <<dir.arrivalName>>. ');
        } else {

            dmsg('{Ref subj traveler} {anländer} till platsen. ');
        }
    }


    actorRemoteSpecialDesc(pov)
    {
        if(fDaemon == nil) {



            if(location != getOutermostRoom) {
                dmsg('\^<<theNameIs>> <<location.remoteObjInName(pov)>> <<getOutermostRoom.inRoomName(pov)>>. ');
            } else {
                dmsg('\^<<theNameIs>> <<getOutermostRoom.inRoomName(pov)>>. ');
            }
        }
    }



;

modify EnumerateSuggestions
    execAction(cmd) {
        if(defined(suggestedTopicLister)) {
            suggestedTopicLister.enumerateSuggestions = !suggestedTopicLister.enumerateSuggestions;


            dmsg('Uppräkning av ämnesförslag är nu <b><<suggestedTopicLister.enumerateSuggestions ? 'påslaget' : 'avstängt'>></b>.<.p>');
        }
    }
;


modify SpecialVerb
    showFailureMsg(svPhrase) {
        message('cant do that special', nil);
    }
;


modify Thing
    revealOnMove()
    {
        local moveReport = '';
        local underLoc = location;
        local behindLoc = location;






        if(contType == Under && dropItemsUnder == nil)
            underLoc = self;
        else if(remapUnder != nil && dropItemsUnder == nil)
            underLoc = remapUnder;






        if(contType == Behind && dropItemsBehind == nil)
            behindLoc = self;
        else if(remapBehind != nil && dropItemsBehind == nil)
            behindLoc = remapBehind;







        if(hiddenUnder.length > 0)
        {
            moveReport += bmsg(

                 'När {1}{dummy} {flyttas} synlig{gör}s {2} tidigare dold under {3}. ',
                 theName, makeListStr(hiddenUnder), himName);




            moveHidden(&hiddenUnder, underLoc);

        }







        if(hiddenBehind.length > 0)
        {
            moveReport += bmsg(
                    'När {1}{dummy} {flyttas} synlig{gör}s {2} tidigare dold bakom {3}. ',
                     theName, makeListStr(hiddenBehind), himName);




            moveHidden(&hiddenBehind, behindLoc);
        }





        local lst = [];

        if(dropItemsUnder)
        {
            if(contType == Under)
                lst = contents;
            else if(remapUnder)
                lst = remapUnder.contents;
        }

        if(dropItemsBehind)
        {
            if(contType == Behind)
                lst += contents;
            else if(remapBehind)
                lst += remapBehind.contents;
        }

        lst = lst.subset({o: !o.isFixed});

        if(lst.length > 0)
        {
            foreach(local cur in lst)
                cur.moveInto(location);

            moveReport +=




                bmsg(
                '<<if moveReport == ''>>När {1}{dummy} {flyttas} {lämnas} {2} kvar. <<else>>Även <<end>>{dummy}{2} {lämnas} kvar. ',
                    theName, makeListStr(lst));

        }






        if(moveReport != '' )
            (libGlobal.curCommand).afterReports += moveReport;
    }

    sayFindHidden(prop, prep)
    {

        dmsg('\^{1} {ref dobj} hitta{r|de} {jag} {2}<<if findHiddenDest ==
            (libGlobal.curActor)>>, som {jag} tar<<end>>. ',
            prep.prep, makeListStr(self.(prop)));

    }
;

modify actorInStagingLocation
    checkPreCondition(obj, allowImplicit)
    {
        local loc = (libGlobal.curActor).location;
        local stagingLoc = obj.stagingLocation;
        local action;


        if(loc == stagingLoc)
            return true;

        if(stagingLoc == nil) {
            ((libGlobal.curAction).setMessageParams('obj', obj));

            dmsg('{Ref subj obj} {kaninte} nås. ');
            return nil;
        }

        if(allowImplicit) {
            local tried = nil;
            while(!stagingLoc.isOrIsIn(loc)) {
                action = loc.contType == In ? GetOutOf : GetOff;
                tried = tryImplicitAction(action, loc);
                if((libGlobal.curActor).location == loc)
                    break;

                loc = (libGlobal.curActor).location;
            }

            if(stagingLoc == loc) return true;

            local path = [];
            local step = stagingLoc;

            while(step && step != loc) {
                path = [step] + path;
                step = step.stagingLocation;
            }

            foreach(step in path) {
                action = step.contType == In ? Enter : Board;
                tried = tryImplicitAction(action, step);
                if((libGlobal.curActor).location != step)
                    break;
            }
            if(stagingLoc == (libGlobal.curActor).location) return true;
            if(tried) return nil;
        }
        ((libGlobal.curAction).setMessageParams('stagingLoc', stagingLoc));

        dmsg('{Jag} måste vara <<if stagingLoc.ofKind(Room)>>direkt<<end>> {i stagingloc} för att göra det. ');

        return nil;
    }
;

modify scoreNotifier
    firstScoreChange(delta) {
        scoreChange(delta);

        dmsg('<.p><.parser>Om du föredrar att inte få poängnotifikationer framöver, skriv NOTIFIERA AV.<./parser>');
    }

    basicScoreChange(delta) {
        cquoteOutputFilter.deactivate();

        dmsg('''Din <<aHref('full score', 'poäng',
                        'Visa fullständig poäng')>>  har just <<
delta > 0 ? 'ökat' : 'minskat'>> med  <<
spellNumber(delta > 0 ? delta : -delta)>>  poäng<<
delta is in (1, -1) ? '' : 's'>>.''');
        cquoteOutputFilter.activate();
    }
;

modify libScore
    showScoreMessage(points, maxPoints, turns) {

        dmsg('På {1} drag<<turns == 1 ? '' : 's'>> har du fått  {2} av totalt {3} poäng<<
maxPoints == 1 ? '' : 's'>>. ',
            turns, points, maxPoints);
    }
    showScoreNoMaxMessage(points, turns) {

        dmsg('På {1} drag<<turns == 1 ? '' : 's'>> har du fått  {2} poäng<<
points == 1 ? '' : 's'>>. ',
             turns, points);
    }
;





































