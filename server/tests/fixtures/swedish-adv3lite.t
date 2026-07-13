


 














property pluralTokens; 

 
 


swedishOptions: object
     
    decimalPt = '.'

     
    numGroupMark = ','
;


 
 










class LMentionable: object
     




    aName = (ifPronoun(&name, aNameFrom(name)))

     




    theName = (ifPronoun(&name, theNameFrom(name)))

     
    theObjName = (ifPronoun(&objName, theNameFrom(name)))

     














    objName = (name)

     



    mentionName = (name)

     



    isNeuter = nil

     











    possAdj = ifPronoun(&possAdj, '<<theName>><<possEnding>>')

     
    possAdjT = (ifPronoun(&possAdjT, '<<theName>><<possEnding>>'))

     
    possAdjPl = (ifPronoun(&possAdjPl, '<<theName>><<possEnding>>'))

     












    possNoun = (ifPronoun(&possNoun, '<<theName>><<possEnding>>'))
    
     



    possEnding = (theName.endsWith('s') ? '' : 's')

     


    heName = (pronoun().name)

     




    himName = (pronoun().objName)

     





    herName = (pronoun().possAdj)

     




    hersName = (pronoun().possNoun)

     





    thatName = (pronoun().thatName)

     





    thatObjName = (pronoun().thatObjName)
    
     
    reflexiveName = (pronoun().reflexive.name)    

     





    reflexiveObjName {
        local base = pronoun().reflexive.name;
        if(plural) return base + ' själva';
        if(isNeuter) return base + ' självt';
        return base + ' själv';
    }


    
    
    
    getPronounForm(form) {
        if(form == &possNoun)
            return isNeuter ? 'mitt' : 'min';
        if(form == &objName)
            return 'dig';
        return nil;
    }

     




    ifPronoun(prop, str)
    {
         
        local p = LMentionable.pronounMap[name];
        if (p != nil)
        {
             
            return p.(prop);
        }
        else
        {
             
            return str;
        }
    }

     








    emptyVocabWords = static [new VocabWord('tom', 0x0002)]

    
     



    ownerNamed = nil
    
     







    theNameFrom(str)
    {
        if(ownerNamed && nominalOwner != nil) {
            local p = nominalOwner.pronoun();
            local poss = plural   ? p.possAdjPl
                       : isNeuter ? p.possAdjT
                       :            p.possAdj;
            return poss + ' ' + str;
        }
        if (qualified) {
            return str;
        }
        if(definiteForm) {
             



            if(shortNameAdjDef) {
                 




                if (massNoun)
                    return shortNameAdjDef + ' ' + definiteForm;
                if (plural)
                    return 'de ' + shortNameAdjDef + ' ' + definiteForm;
                local art = isNeuter ? 'det' : 'den';
                return art + ' ' + shortNameAdjDef + ' ' + definiteForm;
            }
            return definiteForm;
        }
        if(self.ofKind(Room)) {
            return name;
        }
        return 'den <<str>>';
    }

     
    isHim = nil
    isHer = nil
    isGenderNeutral = nil 
    
     




    isIt = (!(isHim || isHer))
    
    
     




    theNameIs()
    {
        local obj = self;
        
         







         
        return theName + ' ' + conjugateBe(object {subj = obj; }, nil);

    }
    
     













    classInit()
    {
         
        cmdDict.setComparator(Mentionable.dictComp);

         
        local plTab = irregularPlurals = new LookupTable(128, 256);
        local anTab = specialAOrAn = new LookupTable(128, 256);

         
        local aAnPat = R'^(ett|en)<space>+(.*)$';

         
        forEachInstance(CustomVocab, function(cv) {

             
            for (local lst = cv.irregularPlurals, local i = 1, 
                 local len = lst.length() ; i <= len ; i += 2)
            {
                 
                plTab[lst[i]] = lst[i+1];
                
                 



                plTab[lst[i+1][1]] = lst[i+1];
            }

             
            for (local lst = cv.specialAOrAn, local i = 1,
                 local len = lst.length() ; i <= len ; ++i)
            {
                 
                rexMatch(aAnPat, lst[i]);

                 








                anTab[rexGroup(2)[3]] = rexGroup(1)[3] == 'ett' ? 1 : 2;
            }

             
            cv.irregularPlurals = nil;
            cv.specialAOrAn = nil;
        });
    }

     





















    matchPronoun(p)
    {
         




        return (p == Them && (plural || ambiguouslyPlural)
                || p == Him && isHim
                || p == Her && isHer
                || p == ItNeuter && isIt && isNeuter && (!plural || ambiguouslyPlural)
                || p == It && isIt && !isNeuter && (!plural || ambiguouslyPlural));
    }

     






    pronoun()   
    {
        switch(person)
        {
        case 1:
            return (plural ? Us : Me);
        case 2:
            return (plural ? Yall : You);
        default:
            return ((plural || isGenderNeutral) 
            ? Them :
                isHim ? Him : isHer ? Her : isNeuter ? ItNeuter : It);    
        }
    }
    
     
    objOutOfPrep
    {
        switch(contType)
        {
        case On:
            return 'av';
        case Under:
            return 'ut från under';
        case Behind:
            return 'ut från bakom';
        default:
            return 'ut ur';
        }
    }
    
     



    objInName = (objInPrep + ' ' + theName)

    objInAName = (objInPrep + ' ' + aName)
    
     



    objIntoName = (objIntoPrep + ' ' + theName)
    
     



    objOutOfName = (objOutOfPrep + ' ' + theName)
    
    
    
    
     





























































































































    initVocab()
    {
         
        if(person == 1)
            name = plural ? 'vi' : 'jag';
        
         
        if(person == 2)
            name = 'du';
        
         
        if (vocab == nil || vocab == '') {
            return;
        }

         
        inheritVocab();

         
        vocabWords = new Vector(10);
         





        local str = vocab.findReplace(R'<lparen>.*?<rparen>', 
                                      {s: s.substr(2, s.length - 2) +
                                      (s == '()' ? '()' : '[weak]')});

         
        local parts = str.split(';').mapAll({x: x.trim()});
        
        


        if(parts.length > 4)
        {
            "<b><FONT COLOR=RED>VARNING!</b></FONT> ";
            "För många semikolon i vocab strängen '<<vocab>>'; det borde vara en maximalt tre som separerar fyra olika sektioner.\n"
;
        }


         
        local shortName = parts[1].trim();
 

         



        if ((propDefined(&proper, 4) == Mentionable || replacingVocab)
            && rexMatch(properNamePat, shortName) != nil)
            proper = true;

         
        local tentativeName = shortName;

         
        local wlst = shortName.split(' '), wlen = wlst.length();

         
        local i = 1;
        if (wlen > 0 && wlst[1] is in('en', 'ett', 'några', 'lite', 'den', 'det', '()'))
        {
             
            switch (wlst[1])
            {

            
            
            

            

            
            
            
            
            
            
            

            
            

            case 'ett':
                isNeuter = true;
                break;
            case 'en':
                isNeuter = nil;
                 



                 







            case 'lite':
            case 'några':
                 
                massNoun = true;
                break;
                
            case '()':            
                 
                qualified = true;
                break;               
            
            case 'den':
            case 'det':
                qualified = true;
                wlst[1] = '!!!&&&';
                break;
            }

             
            ++i;

             
            tentativeName = tentativeName.findReplace(
                wlst[1], '', 0x0010).trim();

        }

         








         

        local nameWasPreset = propDefined(&name, 2);

         




        local definiteFormWasPreset = propDefined(&definiteForm, 2);

         



        local adjStdParts = new Vector();
        local adjDefParts = new Vector();

        local firstPhrase = true;
        local pastNoun = nil;
        for ( ; i <= wlen ; ++i)
        {
             
            local w = wlst[i].trim();
            local wnxt = (i + 1 <= wlen ? wlst[i+1] : nil);

             









            local pos;
            if (rexMatch(prepWordPat, w) != nil)
            {
                 
                pos = 0x0001;

                 









                if (wnxt is in ('en', 'ett', 'den', 'det', 'några'))
                    ++i;
            }
            else if (rexMatch(weakWordPat, w) != nil)
            {
                 
                pos = 0x0001;
            }

            else if (firstPhrase
                     && (wnxt == nil || rexMatch(prepWordPat, wnxt) != nil))
            {
                 
                pos = 0x0004;

                 
                firstPhrase = nil;
                pastNoun = true;
            }
            else
            {
                 
                pos = 0x0002;
            }

             
            local wordForms = initVocabWord(w, pos);

             


            if(pos == 0x0002 && !pastNoun && wordForms != nil) {
                if(wordForms.standardForm != nil) adjStdParts.append(wordForms.standardForm);
                if(wordForms.definiteForm != nil) adjDefParts.append(wordForms.definiteForm);
            }
        }

         


        if(!nameWasPreset && adjStdParts.length() > 0 && name != nil)
            name = adjStdParts.join(' ') + ' ' + name;

         




        if(!definiteFormWasPreset && adjDefParts.length() > 0)
            shortNameAdjDef = adjDefParts.join(' ');

        
         
        if (parts.length() >= 2 && parts[2] != '') 
        {
            parts[2].split(' ').forEach(
                {x: initVocabWord(x.trim(), 0x0002)});
            

             







            parts[2].split(' ').forEach(function(x){
                if(ofKind(Thing) && x is in ('honom', 'det', 'dem', 'dem!'))
                {
                    "<b><FONT COLOR=RED>VARNING!</FONT></B> ";
                    "Pronomen '<<x>>' visas i adjektivsektionen (efter första semikolonet) av vocab strängen '<<
vocab>>'. Detta kan betyda att vocab strängen har för få semikolon.\n"
;
                }
                
            });

            
        }


         
        if (parts.length() >= 3 && parts[3] != '')
        {            
            parts[3].split(' ').forEach(
                {x: initVocabWord(x.trim(), 0x0004)});
            

             



            parts[3].split(' ').forEach(function(x){
                if(ofKind(Thing) && x is in ('honom', 'henne', 'det', 'dem', 'dem!'))
                {
                    "<b><FONT COLOR=RED>VARNING!</FONT></B> ";
                    "Pronomen '<<x>>' visas i substantivsektionen (efter andra semikolonet) av vocab strängen '<<
vocab>>'. Detta betyder förmodligen att denna vocab sträng har för få semikolon.\n"
;
                }
                
            });

        }


            
             
            if (parts.length() >= 4 && parts[4] != '')
            {
                local map = [
                    'det', &isIt,
                    'den', &isIt,
                    'honom', &isHim,
                    'henne', &isHer,
                    'dem', &plural,
                    'dem!', &isGenderNeutral ];
                
                local explicitlySingular = nil;
                
                               
                parts[4].split(' ').forEach(function(x) {
                    
                    local i = map.indexOf(x.trim());
                    if (i != nil)
                        self.(map[i+1]) = true;
                    
                    if(x.trim() != 'dem')                    
                        explicitlySingular = true;     
                                          
                });
                
                 




                
                if(explicitlySingular && plural)
                {
                    ambiguouslyPlural = true;
                    
                     




                    
                    if(!parts[4].trim().startsWith('dem'))
                        plural = nil;
                    
                }

             



            parts[4].split(' ').forEach(function(x){
                if(x not in ('honom', 'henne', 'den', 'det', 'dem', 'dem!'))
                {
                    "<b><FONT COLOR=RED>VARNING!</FONT></B> ";
                    "Icke-pronomen '<<x>>' visas i pronomen sektionen (efter tredje semikolonet) av vocab strängen '<<
vocab>>'. Kontrollera att denna vocab sträng inte har för många semikolon.\n"
;
                }
                
            });

            }
        
        

            
         
        vocabWords = vocabWords.toList();


         




        if (name == nil && tentativeName != '')
            name = tentativeName.findReplace(deannotatePat, '', 0x0001);


        local isNeuterDefinedAlready = propDefined(&isNeuter, 2);

        
        if(!isNeuterDefinedAlready && definiteForm) {
            
            
            
            
            
            local headWord = definiteForm.split(' ')[1];
            local isUterEnding = headWord.endsWith('n') || headWord.endsWith('na');
            isNeuter = !isUterEnding;
        }

         






    }

     



    properNamePat = R'(<upper><^space>*)(<space>+<upper><^space>*)*'

       
     









    inheritVocab()
    {
         


        if(vocab == nil || vocab == '')            
            return;
        
        
        foreach(local cls in getSuperclassList)
        {   
             



            if(cls.vocab is in (nil, ''))
                continue;
            
                            
            cls.inheritVocab();
        }
          
        
         




        if(!propDefined(&vocab, 2) 
           || getSuperclassList.indexWhich({c: c.vocab not in (nil, '')}) == nil)
            return;
        

        
         
        local vlist = vocab
            .split(';').mapAll({x: x.trim()});
        
         
        for(local i = vlist.length; i < 4; i++)
            vlist += '';
        
        foreach(local cls in getSuperclassList)
        {  
             



            if(cls.vocab is in (nil, ''))
                continue;
            
                            
            local ilist = cls.vocab
                .split(';').mapAll({x: x.trim()});
            
             
            for(local i = ilist.length; i < 4; i++)
                ilist += '';
        
             
            vlist[1] = vlist[1].findReplace('*', ilist[1]);
            
             



            
            for(local i in 2..3)
            {
                if(!vlist[i].startsWith('-'))
                    vlist[i] = vlist[i] + ' ' + ilist[i];
            }
            
             



            
            if((vlist[4] == '' || vlist[4].find('*') != nil) && ilist[4] != '')
                vlist[4] = vlist[4] + ' ' + ilist[4];
            
        }
        
         
        for(local i in 2..3)
        {
            if(vlist[i].startsWith('-'))
                vlist[i] = vlist[i].substr(2);
        }
        
         
        vlist[4] = vlist[4].findReplace('*', '');
            
         
        vocab = vlist.join(';');
    }
    
    
    
    
    
     














    



    
    
    
    
    
    

    
    
    
    combineVocabWords = true 

    
    
    enableShortenRepeatingCharacters = true 

    tripleLetterPat = static new RexPattern('.*?((<Alpha>)%2{2,}).*')
    wordPartDelPat = static new RexPattern('(.*?)(<vbar|plus>)')
    plusNotationPat = static new RexPattern('.+(<vbar|plus>.+)+')

    
    definiteForm = nil 

     


    shortNameAdjDef = nil
    
    
    initVocabWord(w, matchFlags)
    {
        
        local partOfSpeech = &noun;

         

        local resultForms = nil;


         



        if (w.find(posPat) != nil)
        {
             
            matchFlags &= ~(0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0001 
                             

                            );
            
            local ann = rexGroup(1)[3];
            
             
            switch (ann)
            {
            case 'n':
            case 'pn':
                matchFlags |= 0x0004;
                break;

            case 'adj':
                matchFlags |= 0x0002;
                break;
 
            case 'weak':    
                matchFlags |= 0x0001;
                break;
                
            case 'prep':                
                matchFlags |= 0x0001;
                break;

            case 'pl':
                matchFlags |= 0x0008;
                break;
            }

             
            w = w.findReplace(posPat, '', 0x0010);
            
             
            if(ann == 'pn')
                pluralTokens = valToList(pluralTokens).appendUnique([w]);
        }

        
        
        

        if(combineVocabWords) {
            local matchCombineVocabWordsNotation = rexMatch(plusNotationPat, w);
            
            if(!matchCombineVocabWordsNotation) {
                
                
                
                
                
                
                if((matchFlags & 0x0004) != 0 && !propDefined(&name, 2)) {
                    name = w;
                }
                addDictWord(w, partOfSpeech, matchFlags);
                resultForms = object { standardForm = w  definiteForm = nil };
            } else {
                local forms = createCompoundWordVariations(self, w, partOfSpeech, matchFlags, enableShortenRepeatingCharacters);
                w = forms.standardForm;

                 





                if((matchFlags & (0x0004 | 0x0008)) != 0) {
                    if(!propDefined(&name, 2)) {
                        name = forms.standardForm;
                    }
                    if(!propDefined(&definiteForm, 2)) {
                        definiteForm = forms.definiteForm;
                    }
                }
                resultForms = forms;
            }
        }

         





    else if(w.find(R'<lsquare>.*<rsquare>') != nil && !w.endsWith('s'))
    {
        "<B><FONT COLOR=RED>VARNING!</FONT></B> ";
        "Olaglig ordklassetikett för '<<w>>' i vocab strängen '<<vocab>>'\n";
    }
        

        

         





















        
        if (rexMatch(apostSPat, w))
        {
             
            partOfSpeech = &nounApostS;
            
             







            cmdDict.addWord(dictionaryPlaceholder, rexGroup(1)[3],
                            partOfSpeech);
        }
        
        
         
        if ((matchFlags & 0x0008) != 0
            || partOfSpeech == &nounApostS)
        {
             





        }
        else if (w.find(pluralPat) != nil)
        {
             
            local pl = rexGroup(1)[3];

             
            w = w.findReplace(pluralPat, '', 0x0010);

             
            pl = pl.split(',').mapAll({x: x.trim()});

             
            pl = pl.mapAll({x: x.startsWith('-') ? w + x.substr(2) : x});

             
            pl.forEach({x: initVocabWord(x, 0x0008 | 0x2000)});
        }

         







             



            

             



             




             




             




             




















            

             
            
        

         
        if (w.endsWith('='))
        {
            matchFlags |= 0x2000 | 0x1000;
            w = w.left(-1);
        }
        else if (w.endsWith('~'))
        {
            matchFlags &= ~(0x2000 | 0x1000);
            w = w.left(-1);
        }

        
        
        if(!combineVocabWords) {
             
            addDictWord(w, partOfSpeech, matchFlags);
        }

        return resultForms;
    }

    getNeuterForm(word) {
        local lastTwoChars = word.substr(word.length()-1);
        local isLastCharVocal = (word.lastChar().match(vocalPat) != nil);
        
        
        local form = (lastTwoChars == 'et' || lastTwoChars == 'at' )
            ? '' 
            : isLastCharVocal ? 't' : 'et';
        return '<<word>><<form>>';
    }
    
    getUterForm(word) {
        local lastTwoChars = word.substr(word.length()-1);
        local isLastCharVocal = (word.lastChar().match(vocalPat) != nil);

        
        
        
        local form = (lastTwoChars == 'en' || lastTwoChars == 'an' )
            ? '' 
            : isLastCharVocal ? 'n' : 'en';
        return '<<word>><<form>>';
    }

     
    apostSPat = R'^(.*)(\'|&rsquo;|\u2019)s$'

     



    addDictWord(w, partOfSpeech, matchFlags)
    {
         
        w = w.toLower();

         





        cmdDict.addWord(dictionaryPlaceholder, w, partOfSpeech);

         
        vocabWords = vocabWords.append(new VocabWord(w, matchFlags));
    }

     



    
    
    replaceVocab(voc)
    {
         
        name = nil;
        
         
        proper = nil;
        
         


        replacingVocab = true;
        
         
        plural = nil;
        ambiguouslyPlural = nil;
        isHim = nil;
        isHer = nil;
        isGenderNeutral = nil;
        massNoun = nil;
        isNeuter = nil;
        
         
        setMethod(&qualified, {: proper });
        
         
        setMethod(&isIt, { : !(isHim || isHer || isGenderNeutral)} );
        
        
         
        vocab = voc;
       
         
        vocabWords = [];
        
         
        initVocab();
    }
    
     



    replacingVocab = nil
                 
     




    addVocab(voc)
    {
         



        local parts = voc.split(';');
        if(parts[1] > '')
            name = nil;
        
         



        local vocWords = vocabWords;
        
         
        vocab = voc;
        
         
        initVocab();
        
         
        vocabWords = vocabWords.appendUnique(vocWords);
        
    }
    
    
     





    removeVocabWord(word, matchFlags?)
    {
        if(matchFlags)            
            vocabWords = vocabWords.subset({v: v.wordStr != word || v.posFlags !=
                                           matchFlags});
        else
            vocabWords = vocabWords.subset({v: v.wordStr != word});
    }
    
    addVocabWord(word, matchFlags)
    {
        initVocabWord(word, matchFlags);
    }
    
     




    prepWordPat = static new RexPattern(
        '^(<<prepList>>)$|.*<lsquare>prep<rsquare>$')
    
    weakWordPat = static new RexPattern(
        '.*<lsquare>weak<rsquare>$')

     
























    prepList = 'till|av|från|med'

     
    deannotatePat =
        R"<lsquare><alpha>+<rsquare>|<lbrace><alphanum|-|'|,|~|=>+<rbrace>"

     
    
    posPat = R'<lsquare>(nr|nt|n|pn|adj|pl|prep|weak)<rsquare>' 

    vocalPat = R'[aeiouy]' 

     
    pluralPat = R"<lbrace>(<alphanum|-|'|space|,|~|=>+)<rbrace>"

     



    properPat = R'^<upper>(.*<lower>.*)'

     













    distinguishedName(article, distinguishers)
    {
        
        local ret;

         
        local dis = distinguishers.indexOf(disambigNameDistinguisher) != nil;
        local poss = distinguishers.indexOf(ownerDistinguisher) != nil;
        local loc = distinguishers.indexOf(locationDistinguisher) != nil;
        local cont = distinguishers.indexOf(contentsDistinguisher) != nil;

         




        ret = (dis ? disambigName : name);

         
        foreach (local d in distinguishers)
        {
            if (d.ofKind(StateDistinguisher))
                ret = d.state.addToName(self, ret);
        }

               
        if (poss && !qualified)
        {
            local o = nominalOwner();
            if (o != nil)
                ret = nominalOwner().possessify(article, self, ret);
            
            
            else if (!loc && self.location == (libGlobal.curActor).getOutermostRoom())
            {
                ret = self.location.locify(self, ret);
            }
        }    

         
        if (cont)
        {
            local c = nominalContents();
            if (c != nil)
                ret = c.contify(self, ret);
            else
                ret = 'tom <<ret>>';
        }

         
        if (loc)
        {
            if (location != nil)
                ret = location.locify(self, ret);
        }

         




        if (article == Indefinite)
            ret = (poss ? aNameFromPoss(ret) : aNameFrom(ret));
        else if (article == Definite && !poss)
            ret = theNameFrom(ret);

         
        return ret;
    }

     



























    possessify(article, obj, str)
    {
         





        if (article is in (Definite, nil)
            || (article == Indefinite && obj.massNoun)) {
            local poss = obj.plural   ? possAdjPl
                       : obj.isNeuter ? possAdjT
                       :                possAdj;
            return '<<poss>> <<str>>';
        }
        else
            return '<<str>> av <<possNoun>>';
    }

     





    locify(obj, str)
    {        
        if (obj.location == (libGlobal.curActor).getOutermostRoom()
            && obj.location.floorObj != nil)
            return '<<str>> <<obj.location.floorObj.objInName>> ';
        else
            return '<<str>> <<obj.locType.prep>> <<theName>>';
    }

     





    contify(obj, str)
    {
        return '<<str>> med <<name>>';
    }

     































    aNameFrom(str)
    {
        if (qualified)
            return str;
        if (massNoun)
            return str;
        if (plural)
            return 'några <<str>>';
        return isNeuter ? 'ett <<str>>' : 'en <<str>>';
    }

     














    aNameFromPoss(str)
    {
         



        return (massNoun || plural ? 'några av <<str>>' : aNameFrom(str));
    }

     



    specialAOrAn = nil

     
    tagOrQuotePat = R'[<"\']'
    leadingTagOrQuotePat = R'(<langle><^rangle>+<rangle>|"|\')+'
    firstWordPat =
        R'(?:<langle><^rangle>+<rangle>|"|\'|<space>)*(<alphanum>+)%>'
    oneLetterWordPat = R'<alpha>(<^alpha>|$)'
    oneLetterAnWordPat = R'<nocase>[aefhilmnorsx]'
    alphaCharPat = R'<alpha>'
    elevenEighteenPat = R'1[18](<^digit>|$)'

     














    pluralNameFrom(str)
    {
        local str2;
        
         
        if (str.find(prepPhrasePat) != nil)
        {
             




            str = rexGroup(1)[3];
            str2 = rexGroup(2)[3];

             



            return pluralNameFrom(str) + str2;
        }

         
        rexMatch(lastWordPat, str);

         
        str = rexGroup(1)[3];
        str2 = rexGroup(2)[3];
        return str + pluralWordFrom(str2);
    }

     





    prepPhrasePat = static new RexPattern(
        '^(.+)(<space>+(<<prepList>>)<space>+.+)$')

     
    lastWordPat = R'^(.*?)(<^space>*)<space>*$'

     





     





    pluralWordFrom(str)
    {
        local irr;

         
        if ((irr = irregularPlurals[str]) != nil)
            return irr[1];

         
        if (rexMatch(menPluralPat, str))
            return '<<rexGroup(1)[3]>>män';

         
        if (str.length() == 0)
            return '';

         
        if (str.endsWith('a'))
            return str.substr(1, str.length() - 1) + 'or';

         
        if (str.endsWith('are'))
            return str;

         
        if (str.endsWith('ie'))
            return str + 'r';

         
        if (str.endsWith('e'))
            return str.substr(1, str.length() - 1) + 'ar';

         
        if (str.endsWith('s') && !str.endsWith('us'))
            return str + 'er';

         
        if (str.endsWith('ion'))
            return str + 'er';

         
        if (str.endsWith('het') || str.endsWith('tet'))
            return str + 'er';

         
        if (str.endsWith('ism'))
            return str + 'er';

         
        if (str.endsWith('el'))
            return str.substr(1, str.length() - 2) + 'lar';

         
        if (str.endsWith('eo'))
            return str + 'r';

         
        if (str.endsWith('io'))
            return str + 's';

         
        if (str.endsWith('mo'))
            return str + 's';

         
        if (str.endsWith('o'))
            return str + 'n';

         
        return str + 'ar';
    }

     
    irregularPlurals = nil

     
    trimPat = R'^<space>+|<space>+$'

     
    menPluralPat = R'^(.*)man$'

     
    dictComp = static new StringComparator(truncationLength, nil, nil)

     



    truncationLength = 8
    
    
     
    pronounMap = nil
 
    
     




    dummyName = ''
   
     





    
    
     


    usedPluralToken()
    {
        return propDefined(&pluralTokens) && 
            valToList(pluralTokens).overlapsWith((libGlobal.curCommand).verbProd.tokenList.mapAll({x:
                ((x)[1])}));
    } 
;


modify SubComponent
     





    nameAs(parent)
    {
         
        inherited(parent);
        
         
        aName = parent.aName;
        theName = parent.theName;
        theObjName = parent.theObjName;
        objName = parent.objName;
        possAdj = parent.possAdj;
        possNoun = parent.possNoun;



        
    }
    
;


 
 




class LState: object
     






    addToName(obj, str)
    {
         
        local st = obj.(stateProp);
        local adj = adjectives.valWhich({ ele: ele[1] == st });

         
        return '<<adj[2][1]>> <<str>>';
    }

     








    initWord(w)
    {
         
        cmdDict.addWord(dictionaryPlaceholder, w, &noun);
    }
    
     



    additionalInfo = []
    
     




    getAdditionalInfo(obj)
    {
         
        local st = obj.(stateProp);
        local info = additionalInfo.valWhich({ ele: ele[1] == st });
        
        return info != nil ? info[2] : '';
    }
;


 
 






 





LitUnlit: State
    stateProp = &isLit
    adjectives = [[nil, ['släckt']], [true, ['tänd']]]
    appliesTo(obj) { return obj.isLightable || obj.isLit; }
    
    additionalInfo = [[true, ' (som {avger} ljus)']]
    
;

 



OpenClosed: State
    stateProp = &isOpen
    adjectives = [[nil, ['stängd']], [true, ['öppen']]]
    appliesTo(obj) { return obj.isOpenable; }
;

 



DirState: State
    stateProp = &attachedDir

     



    vocabWords = [
        [&north, 'norr', 0x0001],
        [&north, 'n', 0x0001],
        [&south, 'söder', 0x0001],
        [&south, 's', 0x0001],
        [&east, 'öster', 0x0001],
        [&east, 'e', 0x0001],
        [&west, 'väster', 0x0001],
        [&west, 'w', 0x0001],
        [&southeast, 'sydost', 0x0001],
        [&southeast, 'se', 0x0001],
        [&southwest, 'sydväst', 0x0001],
        [&southwest, 'sw', 0x0001],
        [&northwest, 'nordväst', 0x0001],
        [&northwest, 'nw', 0x0001],
        [&southwest, 'sydväst', 0x0001],
        [&southwest, 'sw', 0x0001],
        [&port, 'babord', 0x0001],
        [&port, 'p', 0x0001],
        [&starboard, 'styrbord', 0x0001],
        [&starboard, 'sb', 0x0001],
        [&fore, 'för', 0x0001],
        [&fore, 'framåt', 0x0001],
        [&fore, 'f', 0x0001],
        [&aft, 'akter', 0x0001],
        [&up, 'upp', 0x0001],
        [&up, 'uppåt', 0x0001],
        [&down, 'ner', 0x0001],
        [&down, 'd', 0x0001],
        [&down, 'nedåt', 0x0001],
        [&in, 'in', 0x0001],
        [&in, 'inre', 0x0001],
        [&in, 'inåt', 0x0001],
        [&out, 'ut', 0x0001],
        [&out, 'yttre', 0x0001],
        [&out, 'utåt', 0x0001]        
    ]
    
        
    appliesTo(obj)
    {
         



        if(defined(DSStairway) && obj.ofKind(DSStairway))
            return nil;
        else
            return inherited(obj);
    }
;


 



modify TopicPhrase
    matchNameScope(cmd, scope)
    {
        
        local toks = tokens;
        local ret;
        
         


        
        tokens = tokens.subset({x: x != '\'s'});
        
         






        
        tokens = tokens.subset({x: x not in ('en', 'den', 'det', 'ett')});
        
        
        try
        {
             
            ret = inherited(cmd, scope);
        }
        finally
        {
             
            tokens = toks;
        }
        
         
        return ret;
    }
    
;

 



modify ResolvedTopic
    
     



    
    getTopicText()
    {
        local str = tokens.join(' ').trim();
        str = str.findReplace(' \'s', '\'s', 0x0001);
        return str;        
    }
    
;

 





modify Topic
    construct(name_)
    {
        name_ = name_.findReplace(' \'s', '\'s', 0x0001);
        inherited(name_);
    }
    
;

 






modify Command
    buildCommandString()
    {
         
        local toks = valToList(verbProd.tokenList).mapAll({x: ((x)[1])});

        
        
         






             
        local str = toks.join(' ');
        
                 
        local lst = str.split(R'<period>|;');
            
         
        lst = lst.subset({x: x.toLower().trim() not in ('g', 'igen')});
        
         
        str = lst.join('.');
        
         



        str = str.findReplace(' \'s', '\'s', 0x0001);
        
         
        return str;         
    }
;

 
 



modify Thing
     






    roomSubhead(pov)
    {
        " (<<childLocType(pov).prep>> <<theName>>)";
    }
    
     
    matchPushOnly = (((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])) == 'tryck')
    
     
    matchPullOnly = (((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])) is in ('dra', 'släpa'))
    
     



    makeLit(stat)
    {
        inherited(stat);
        
        if(LitUnlit.appliesTo(self))
            states = states.appendUnique([LitUnlit]);
        else
            states -= LitUnlit;
    }
    
     







    abcName(action, role)
    {
        return theName;
    }
    
     




    getMiscListSuffix(pov)
    {
        return miscListSuffix || location == nil ? miscListSuffix :
        location.getMiscListSuffix(pov);  
        
    }
    
     


    miscListSuffix = nil

     



    separateRemove = nil

;



 
 





modify Room
    initVocab()
    {
         



        if(vocab == nil && autoName && roomTitle)            
            vocab = proper ? roomTitle : roomTitle.toLower() ;
        
         
        inherited();
    }
    
     




    autoName = true
    
     


    
    miscListSuffix = bmsg('{här}')
;



 



modify Pronoun
    aName = (name)
    theName = (name)
    theObjName = (objName)   
;

 
ItNeuter: It;
MeAll: Pronoun
    resolve() { return Me.resolve(); }
    person = 1
;
UsAll: Us
     
    skipPronounMap = true
;

 
 






property prep;
pronounPreinit: PreinitObject
    execBeforeMe = []
    execute()
    {
         







        It.name = It.objName = 'den';
        It.possAdj = It.possNoun = 'dess';
        It.thatName = It.thatObjName = 'den';
	    It.reflexive = Itself;

        ItNeuter.name = ItNeuter.objName = 'det';
        ItNeuter.possAdj = ItNeuter.possNoun = 'dess';
        ItNeuter.thatName = ItNeuter.thatObjName = 'det';
        ItNeuter.reflexive = Itself;

        Her.name = 'hon';
        Her.objName = 'henne';
        Her.possAdj = Her.possNoun = 'hennes';
	    Her.reflexive = Herself;

        Him.name = 'han';
        Him.objName = 'honom';
        Him.possAdj = Him.possNoun = 'hans';
	    Him.reflexive = Himself;

        Them.name = 'de';
        Them.objName = 'dem';
        Them.possAdj = 'deras';
        Them.possNoun = 'deras';
        Them.thatName = Them.thatObjName = 'de';
	    Them.reflexive = Themselves;
        Them.plural = true;
        
        
        
        You.name = 'du';
        You.objName = 'dig';
        You.possAdj = 'din';
        You.possAdjT = 'ditt';
        You.possAdjPl = 'dina';
        You.possNoun = 'din';
	    You.reflexive = Yourself;

        Yall.name = Yall.objName = 'dina';
        Yall.possAdj = 'dina';
        Yall.possAdjT = 'ert';
        Yall.possAdjPl = 'era';
        Yall.possNoun = 'dina';
	    Yall.reflexive = Yourselves;
        Yall.plural = true;

        MeAll.name = MeAll.objName = 'mina';
        MeAll.possAdj = 'mina';
        MeAll.possNoun = 'mina';
	    MeAll.reflexive = Myself;
        MeAll.plural = true;

        Me.name = 'jag';
        Me.objName = 'mig';
        Me.possAdj = Me.possNoun = 'min';
        Me.possAdjT = 'mitt';
        Me.possAdjPl = 'mina';
    	Me.reflexive = Myself;

        Us.name = 'vi';
        Us.objName = 'oss';
        Us.possAdj = 'vår';
        Us.possAdjT = 'vårt';
        Us.possAdjPl = 'våra';
        Us.possNoun = 'vår';
	    Us.reflexive = Ourselves;
        Us.plural = true;

        UsAll.possAdj = 'våra';
        UsAll.possNoun = 'våra';
	    UsAll.reflexive = Ourselves;
        UsAll.plural = true;

         
        It.possAdjT = It.possAdjPl = It.possAdj;
        ItNeuter.possAdjT = ItNeuter.possAdjPl = ItNeuter.possAdj;
        Him.possAdjT = Him.possAdjPl = Him.possAdj;
        Her.possAdjT = Her.possAdjPl = Her.possAdj;
        Them.possAdjT = Them.possAdjPl = Them.possAdj;

        Myself.name = Myself.objName = 'mig';

         


        Yourself.objName = 'dig';
        Itself.objName = 'sig';
        Herself.objName = 'sig';
        Himself.objName = 'sig';
        Ourselves.objName = 'oss';
        Yourselves.objName = 'er';
        Themselves.objName = 'sig';


        Yourself.name = 'dig'; 
        Itself.name = 'sig';
        Herself.name = 'sig';
        Himself.name = 'sig';
        Ourselves.name = 'oss';
        Yourselves.name = 'er';
        Themselves.name = 'sig';

         




        foreach (local pro in Pronoun.all)
        {
            if (pro.thatName == nil)
                pro.thatName = pro.name;
            if (pro.thatObjName == nil)
                pro.thatObjName = pro.objName;
        }

         
        LMentionable.pronounMap = new LookupTable(16, 32);
        forEachInstance(Pronoun, function(p) {
             
            if (p.skipPronounMap) return;
            LMentionable.pronounMap[p.name] = p;
            if (p.objName != nil)
                LMentionable.pronounMap[p.objName] = p;
        });

         





        In.prep = 'i';
        Outside.prep = 'på';
        On.prep = 'på';
        Under.prep = 'under';
        Behind.prep = 'bakom';
        Held.prep = 'hållen av';
        Worn.prep = 'buren av';
        Attached.prep = 'fäst vid';
        PartOf.prep = 'del av';
    }
;
    

 
 









class CustomVocab: object
     

















    specialAOrAn = []

     







    irregularPlurals = []

     





















    verbParams = []
;

 








 
swedishCustomVocab: CustomVocab
    
    irregularPlurals = [
         
        'bok', ['böcker'],
        'bonde', ['bönder'],
        'brand', ['bränder'],
        'bror', ['bröder'],
        'dotter', ['döttrar'],
        'fot', ['fötter'],
        'gås', ['gäss'],
        'hand', ['händer'],
        'land', ['länder'],
        'lus', ['löss'],
        'mus', ['möss'],
        'natt', ['nätter'],
        'rand', ['ränder'],
        'rot', ['rötter'],
        'son', ['söner'],
        'stad', ['städer'],
        'strand', ['stränder'],
        'tand', ['tänder'],
        'tång', ['tänger'],

         
         
        'finger', ['fingrar'],
        'kamel', ['kameler'],    
        'muskel', ['muskler'],   
        'regel', ['regler'],     
        'sommar', ['sommrar'],
        'syster', ['systrar'],
        'vinter', ['vintrar'],
        'åker', ['åkrar'],

         
        'äpple', ['äpplen'],
        'byte', ['byten'],
        'läge', ['lägen'],
        'löfte', ['löften'],
        'märke', ['märken'],
        'minne', ['minnen'],
        'möte', ['möten'],
        'nöje', ['nöjen'],
        'öde', ['öden'],
        'rike', ['riken'],
        'stycke', ['stycken'],

         
        'hjärta', ['hjärtan'],
        'öga', ['ögon'],
        'öra', ['öron'],

         
        'kriterium', ['kriterier'],
        'memorandum', ['memorandum'],
        'schema', ['scheman'],
        'symposium', ['symposier'],

         
        'ägg', ['ägg'],
        'barn', ['barn'],
        'blad', ['blad'],
        'byxor', ['byxor'],
        'data', ['data'],
        'fel', ['fel'],
        'fenomen', ['fenomen'],
        'filter', ['filter'],
        'fönster', ['fönster'],
        'får', ['får'],
        'glasögon', ['glasögon'],
        'hammare', ['hammare'],
        'högkvarter', ['högkvarter'],
        'hus', ['hus'],
        'index', ['index'],
        'kläder', ['kläder'],
        'lager', ['lager'],
        'lejon', ['lejon'],
        'liv', ['liv'],
        'medel', ['medel'],
        'möbler', ['möbler'],
        'monster', ['monster'],
        'nummer', ['nummer'],
        'själv', ['själv'],
        'shorts', ['shorts'],
        'slut', ['slut'],
        'tecken', ['tecken'],
        'tillägg', ['tillägg'],
        'träd', ['träd'],
        'vapen', ['vapen'],
        'vatten', ['vatten'],

         
        'fisk', ['fisk', 'fiskar'],
        'hjort', ['hjort', 'hjortar'],
        'öring', ['öring', 'öringar'],
        'torsk', ['torsk', 'torskar'],

         
        'automat', ['automater'],

         
        'hare', ['harar'],

         
        'buss', ['bussar'],

         
        'alg', ['alger'],
        'art', ['arter'],
        'bacill', ['baciller'],
        'barack', ['baracker'],
        'kerub', ['keruber'],
        'larv', ['larver'],
        'läroplan', ['läroplaner'],
        'pincett', ['pincetter'],
        'ryggrad', ['ryggrader'],
        'seraf', ['serafer'],
        'sopran', ['sopraner']
    ]

    
    specialAOrAn = [
        
    ]

    
    verbParams = [ 
        'anlända/anländer/anlände/anlänt',
        'använda/använder/använde/använt',
        'attackera/attackerar/attackerade/atackerat',
        'avge/avger/avgav/avgett',
        'bära/bär/bar/burit',
        'bäras/bärs/bars/burits',
        'befinna/befinner/befann/befunnit',
        'befria/befriar/befriade',
        'berätta/berättar/berättade',
        'betala/betalar/betalade/betalat',        
        'betyda/betyder/betydde/betytt',
        'bevisa/bevisar/bevisade/bevisad',
        'binda/binder/band/bundit',
        'bita/biter/bet/bitit',
        'bjuda/bjuder/bjöd/bjudit',
        'blåsa/blåser/blåste/blåst',                
        'bli/blir/blev/blivit',
        'blöda/blöder/blödde/blött',
        'bo/bor/bodde/bott',
        'böja/böjer/böjde',
        'börja/börjar/började/börjat',
        'bränna/bränner/brände/bränt',
        'bryta/bryter/bröt/brutit',
        'bygga/bygger/byggde/byggt',
        'dela/delar/delade/delat',
        'döda/dödar/dödade/dödat',
        'dra/drar/drog/dragit',
        'dricka/dricker/drack/druckit',
        'drömma/drömmer/drömde/drömt',
        'dyka/dyker/dök/dykt',
        'få/får/fick/fått',
        'fälla/fäller/fällde/fällt',
        'falla/faller/föll/fallit',        
        'fånga/fångar/fångade/fångat',
        'flyga/flyger/flög/flugit',        
        'flytta/flyttar/flyttade/flyttat',        
        'flyttas/flyttas/flyttades/flyttats',       
        'förbjuda/förbjuder/förbjöd/förbjudit',
        'inställa/inställer/inställd/inställt',
        'förlora/förlorar/förlorade/förlorat',
        'förstöra/förstör/förstörde/förstört',
        'frysa/fryser/frös/frusit',
        'gå/går/gick/gått',
        'ge/ger/gav/givit',
        'glida/glider/glid',
        'gömma/gömmer/gömde/gömd',
        'göra/gör/gjorde/gjort',
        'gräva/gräver/grävde',
        'ha/har/hade/haft',
        'hålla/håller/höll/hållit',
        'hälsa/hälsar/hälsade/hälsat',
        'hänga/hänger/hängde/hängt',
        'hantera/hanterar/hanterade',        
        'hitta/hittar/hittade/hittat',
        'hoppa/hoppar/hoppade/hoppat',
        'hyra/hyr/hyrde/hyrt',
        'inlägga/inlägger/inlagd/inlagt',
        'känna/känner/kände/känt',
        'kasta/kastar/kastade/kastad',
        'klänga/klänger/klängde',        
        'klappa/klappar/klappade',        
        'klippa/klipper/klippte/klippt',
        'kliva/kliver/klev/klivit',
        'knäböja/knäböjer/knäböjde',
        'komma/kommer/kom/kommit',        
        'köpa/köper/köpte/köpt',
        'köra/kör/körde/kört',        
        'krympa/krymper/krympte/krympt',
        'krypa/kryper/krypte/krypit',
        'kunna/kan/kunde/kunnat',
        'lägga/lägger/lade/lagt',
        'låsa/låser/låste/låst',
        'lämna/lämnar/lämnade/lämnat',
        'låna/lånar/lånade/lånat',
        'lära/lär/lärde/lärt',
        'läsa/läser/läste/läst',
        'låsa/låser/låste/låst',                
        'låta/låter/lät/låtit',
        'leda/leder/ledde/lett',
        'ligga/ligger/låg/legat',
        'lukta/luktar/luktade/luktat',
        'luta/lutar/lutade/lutat',
        'lämnas/lämnas/lämnades/lämnats',       
        'mala/malar/malade/malat',
        'mata/matar/matade/matat',
        'missförstå/missförstår/missförstod/missförstått',
        'möta/möter/mötte/mötts',
        'plocka/plockar/plockade/plockat',
        'prata/pratar/pratade/pratat',
        'raka/rakar/rakade/rakad',
        'rida/rider/red/ridit',
        'ringa/ringer/ringde/ringt',
        'rita/ritar/ritade/ritad',
        'riva/river/rev/rivit',
        'röra/rör/rörde/rört',
        'så/sår/sådde/sått',
        'såga/sågar/sågade/sågat',
        'säga/säger/sade/sagt',
        'satsa/satsar/satsade',
        'sätta/sätter/satte/satt',
        'se/ser/såg/sett',
        'simma/simmar/simmade/simmat',
        'sitta/sitter/satt',
        'sjunga/sjunger/sjöng/sjungit',
        'skriva/skriver/skrev/skrivit',
        'skada/skadar/skadade/skadat',
        'skaka/skakar/skakade/skakad',
        'skära/skär/skar/skurit',
        'skina/skiner/sken/skinit',
        'skjuta/skjuter/sköt/skjutit',        
        'sko/skor/skodde/skott',
        'slå/slår/slog/slagit',
        'slåss/slåss/slogs/slagits',
        'slinka/slinker/slank/slinkit',
        'slita/sliter/slet/slitit',
        'slunga/slungar/slungade/slungat',
        'sluta/slutar/slutade/slutat',
        'smälta/smälter/smälte/smält',
        'smyga/smyger/smög/smugit',
        'snurra/snurrar/snurrade/snurrat',
        'sopa/sopar/sopade/sopat',
        'sova/sover/sov/sovit',
        'spå/spår/spådde/spått',
        'spendera/spenderar/spenderade/spenderat',
        'spilla/spiller/spillde/spillt',
        'spotta/spottar/spottade/spottat',
        'sprida/sprider/spred/spridit',
        'springa/springer/sprang/sprungit',
        'springa/springer/sprang/sprungit',        
        'stå/står/stod/stått',
        'stänga/stänger/stängde/stängt',
        'stava/stavar/stavade/stavat',
        'sticka/sticker/stack/stuckit',
        'stiga/stiger/steg/stigit',
        'stinka/stinker/stank/stunkit',
        'stjäla/stjäl/stal/stulit',
        'sträva/strävar/strävade/strävat',
        'svälla/sväller/svällde/svullnat',
        'svära/svär/svor/svurit',
        'svara/svarar/svarade/svarat',
        'svettas/svettas/svettades',
        'svinga/svingar/svingade/svingat',        
        'sy/syr/sydde/sydd',
        'ta/tar/tog/tagit',        
        'tala/talar/talade/talat',
        'tända/tänder/tände/tänt',        
        'tänka/tänker/tänkte/tänkt',
        'trivas/trivs/trivdes/trivts',
        'tro/tror/trodde/trott',
        'trycka/trycker/tryckte/tryckt',
        'uppstå/uppstår/uppstod/uppstått',        
        'vakna/vaknar/vaknade/vaknat',        
        'välja/väljer/valde/valt',
        'växa/växer/växte/vuxit',
        'veta/vet/visste/vetat',        
        'vilja/vill/ville/velat',
        'vilseleda/vilseleder/vilseledde/vilselett',
        'visa/visar/visade/visad',
        'visa/visar/visade/visat',    
        'äta/äter/åt/ätit',
        'öppna/öppnar/öppnade/öppnat',
        'överdriva/överdriver/överdrev/överdrivits',
        'överhöra/överhör/överhörde/överhörts',
        'överta/övertar/övertog/övertagit'        
    ]
;


 
 
















spellNumber(n)
{
     
    local dot = swedishOptions.decimalPt;
    local comma = swedishOptions.numGroupMark;
    
     
    if (dataType(n) == 5
        && n.ofKind(BigNumber)
        && n.getFraction() != 0)
    {
         



        return n.formatString(n.getPrecision(), 0x0020).findReplace(
            ['.', ','], [dot, comma]);
    }

     
    if (n < 0)
    {
         
        local s = spellNumber(-n);

         
        return (s.find(R'<alpha>') != nil ? 'minus ' : '-') + s;
    }

     
    if (n < 100)
    {
        if (n < 20)
            return ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex',
                    'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv',
                    'tretton', 'fjorton', 'femton', 'sexton',
                    'sjutton', 'arton', 'nitton'][n+1];
        else
            return ['tjugo', 'trettio', 'fyrtio', 'femtio', 'sextio',
                    'sjuttio', 'åttio', 'nittio'][n/10-1]
            + ['', '-ett', '-två', '-tre', '-fyra', '-fem', '-sex',
               '-sju', '-åtta', '-nio'][n%10 + 1];
    }

     
    if (n % 100 == 0 && n/100 < 10)
        return '<<spellNumber(n/100)>> hundra';
    
     



    if (n % 1000000000 == 0 && n/1000000000 < 10)
        return '<<spellNumber(n/1000000000)>> miljard';
    if ((n % 1000000 == 0 && n/1000000 < 10)
        || (n % 10000000 == 0 && n/10000000 < 10)
        || (n % 100000000 == 0 && n/100000000 < 10))
        return '<<spellNumber(n/1000000)>> miljon';
    if ((n % 1000 == 0 && n/1000 < 10)
        || (n % 10000 == 0 && n/10000 < 10)
        || (n % 100000 == 0 && n/100000 < 10))
        return '<<spellNumber(n/1000)>> tusen';

     




    if (n % 1000000 == 0 && n/1000000 < 1000)
        return '<<n/1000000>> miljon';
    if (n % 100000 == 0 && n/1000000 < 100)
        return '<<n/1000000>><<dot>><<n%1000000 / 100000>> miljon';
    if (n % 10000 == 0 && n/1000000 < 10)
        return '<<n/1000000>><<dot>><<n%1000000 / 10000>> miljon';
    if (n % 1000000000 == 0 && n/1000000000 < 1000)
        return '<<n/1000000000>> miljard';
    if (n % 100000000 == 0 && n/1000000000 < 100)
        return '<<n/1000000000>><<dot>><<n%1000000000 / 100000000>> miljard';
    if (n % 10000000 == 0 && n/1000000000 < 10)
        return '<<n/1000000000>><<dot>><<n%1000000000 / 10000000>> miljard';

     
    local s = toString(n);

     
    for (local i = s.length() - 2 ; i > 1 ; i -= 3)
        s = s.splice(i, 0, comma);

     
    return s;
}

 



spelledToInt(str)
{
     
    local toks = cmdTokenizer.tokenize(str);
    
     
    local lst = spelledNumber.parseTokens(toks, cmdDict);
    
     
    if(lst.length > 0)
        return lst[1].numval();
    
     
    return nil;
}

  
   


 
 


modify Lister
     




    showList(lst, pl, paraCnt)
    {        
        "<<andList(lst.mapAll({ o: o.aName }))>>";
    }
    
;

 



modify ItemLister    
    
    
    
    
    
    
    
    
    
    
    

     





    showSimpleList(lst)
    {
        "<<andList(lst.mapAll({ o: listName(o) }))>>";  
    }

     



    listName(o)
    {
         
        local lName = o.aName;
        
         



        if(showAdditionalInfo)
        {
            foreach(local state in o.states)
                lName += state.getAdditionalInfo(o);
        }            

         



        if(o.wornBy != nil && showWornInfo)
            
            lName += ' (buren)';
        
               
         



        if(o.movedTo != nil && showMovedToInfo)
        {
            local obj = o.movedTo;
            ((libGlobal.curAction).setMessageParams('obj', obj));
            
            lName += bmsg(' (vid {ref obj})');
        }
        
         



 
        if(showSubListing && o.(subContentsListedProp))
        {
            local lists = [o];
            
            if(o.remapIn)
                lists += o.remapIn;
            
            if(o.remapOn)                
                lists += o.remapOn;
            
            foreach(local s in lists)
            {
                if(s.contents != nil && s.contents.length > 0 && s.canSeeIn)          
                {
                    lName += subLister.buildList(s.contents);
                    s.contents.subset({ o: listed(o) }).forEach({x: x.mentioned = true});
                }
                
            }
        }     
        
               
         



        return lName;
    }
    
    
     




    showAdditionalInfo = true
    
    
     




    showWornInfo = (showAdditionalInfo)
    
     



    showMovedToInfo = true
    
     




    showSubListing = ((libGlobal.curActor) == (libGlobal.playerChar))
;

 
modify ListGroup
     



    showSimpleList(lister, lst)
    {
        "<<andList(lst.mapAll({ o: lister.listName(o) }))>>";
    }    
;


 



modify lookLister
    showListPrefix(lst, pl, paraCnt)
    {
        "{Jag} {kan} se ";
    }
    
    
     




    showListSuffix(lst, pl, paraCnt)    {
        
        " <<(libGlobal.curActor).location.getMiscListSuffix((libGlobal.curActor))>>.";
    }
    
    showSubListing = (gameMain.useParentheticalListing)
;

 



modify inventoryLister
    showListPrefix(lst, pl, paraCnt)
    {
        "<<if paraCnt == 0>>{Jag}<<else>>, och<<end>> bär på ";
    }
    
    showListSuffix(lst, pl, paraCnt)
    {
        ".";
    }
    
    showListEmpty(paraCnt)
    {
        "{Jag} {är} tomhänt. ";
    }    
;

 



modify wornLister
    showListPrefix(lst, pl, paraCnt)
    {
        "{Jag} bär ";
    }
    
    showListSuffix(lst, pl, paraCnt)
    {
        
    }
    
    showListEmpty(paraCnt)
    {
        
    }
     
     



    showWornInfo = nil
;


modify lookAroundExitLister
    showListSeparator(options, curItemNum, totalItems)
    {
        if(curItemNum == totalItems - 1)
            " och ";
        if(curItemNum < totalItems - 1)
            ", ";
    }
;

modify  lookAroundTerseExitLister
    showListItem(obj, options, pov, infoTab)
    {
         htmlSay('<<aHref(obj.dir_.name, obj.dir_.name, 'Gå ' + obj.dir_.name,
                 0)>>');
    }
    showListSeparator(options, curItemNum, totalItems)
    {
        if(curItemNum == totalItems - 1)
            " och ";
        if(curItemNum < totalItems - 1)
            ", ";
    }
;

modify explicitExitLister
    showListSeparator(options, curItemNum, totalItems)
    {
        if(curItemNum == totalItems - 1)
            " eller ";
        if(curItemNum < totalItems - 1)
            ", ";
    }
    showListItem(obj, options, pov, infoTab)
    {               
        htmlSay('<<aHref(obj.dir_.name, obj.dir_.name, 'Gå ' + obj.dir_.name,
                 0)>>');    
        if(showDestNames && obj.dest_ && (obj.dest_.visited || obj.dest_.familiar))
            dmsg(' till <<obj.dest_.destName>>');
            
    }    
;





function conjAdjObj(obj, stam, expansion) {
    return adjustAdjectiveAgreement(object {curObj = obj},  ['conjadj', stam, expansion]);
}

 





subLister: ItemLister
    showListPrefix(lst, pl, paraCnt)
    {
        local container = lst[1].location;
        ((libGlobal.curAction).setMessageParams('container', container));
        " (<<container.objInPrep>> {curobj container}{conjadj vilk en/et/a} {är} ";
    }
    
    showListSuffix(lst, pl, paraCnt) { ")"; }
    
    showListEmpty(paraCnt) { }
   
     
    buildList(lst)
    {
         
        nestingDepth++;
        
         



        if(nestingDepth > maxNestingDepth)
        {
             
            nestingDepth--;
            
             
            return '';
        }
    
         



        local str = inherited(lst);
        
         
        nestingDepth--;
        
         
        return str;
    }
    
    showList(lst, pl, paraCnt)
    {
        "<<andList(lst.mapAll({ o: listName(o) }))>>";
    }
    
     
    maxNestingDepth = 1
    
     
    nestingDepth = 0
    
    
    showSubListing = true 
    
    listed(o) { return o.lookListed; }
;


 



modify descContentsLister
    showListPrefix(lst, pl, parent)
    {
        ((libGlobal.curAction).setMessageParams('parent', parent));
        
         




        if(parent.openStatusReportable == 1)
            "{Han parent} {är} öppen och inne{håller} ";  
        
        else if(parent.openStatusReportable)
            "{Ref subj parent} {är} öppen och inne{håller} ";  
        
         






        else
            "{I parent} {ser|såg} {jag} ";               
        
    }

    showListSuffix(lst, pl, paraCnt)
    {
        ".";
    }
    
     




    showListEmpty(parent)  
    {
        ((libGlobal.curAction).setMessageParams('parent', parent));
        if(parent.openStatusReportable == 1)
            "{Han parent}{\'s} <<if parent.isOpen>>öppen<<end>>. ";
        
        else if(parent.openStatusReportable)
            "\^<<parent.theNameIs>> <<if parent.isOpen>>öppen<<end>>. ";
    }
    
     




    showSubListing = (gameMain.useParentheticalListing)
;

 



modify lookContentsLister
    showListPrefix(lst, pl, parent)
    {
        "\^<<parent.remoteObjInName((libGlobal.curActor))>> {kan} {jag} se ";   
    }

    showListSuffix(lst, pl, paraCnt)
    {
        ".";
    }    
    
     




    showSubListing = (gameMain.useParentheticalListing)
    
;

 



modify openingContentsLister
    showListPrefix(lst, pl, parent)
    {
        ((libGlobal.curAction).setMessageParams('parent', parent));
        "När {ref parent} öppna{s|des} {dummy}upptäck{er/te} {du} ";        
    }

    showListSuffix(lst, pl, paraCnt)
    {
        ".\n";
    }
    
    showListEmpty(parent)  
    {
        "{Jag} {öppnar} <<parent.theName>>. ";
    }
    
    showSubListing = (gameMain.useParentheticalListing)
;


 



modify lookInLister
    showListPrefix(lst, pl, parent)
    {
        ((libGlobal.curAction).setMessageParams('parent', parent));
        "{Jag parent} {ser} ";        
    }

    showListSuffix(lst, pl, paraCnt)
    {
        ".\n";
    }
    
    showListEmpty(parent)  
    {
       
    }
    
    showSubListing = (gameMain.useParentheticalListing)
; 
    
 



modify simpleAttachmentLister
    showListPrefix(lst, pl, parent)
    {
        "{Jag} {ser} ";        
    }

    showListSuffix(lst, pl, parent)
    {
        
        
        " fäst till <<parent.theName>>. ";
    }
     
    showSubListing = (gameMain.useParentheticalListing) 
;

 



modify plugAttachableLister
    showListSuffix(lst, pl, parent)
    {
        " ansluten till <<parent.theName>>. ";
    }    
;

 



finishOptionsLister: Lister
    showList(lst, pl, paraCnt)
    {
         



        "<<orList(lst.mapAll({ o: o.desc }))>>";
    }
    
    showListPrefix(lst, pl, parent)
    {
        cquoteOutputFilter.deactivate();
         "<.p>Vill du ";       
    }
    
    
    showListSuffix(lst, pl, paraCnt)
    {
         
        "?\b";
        cquoteOutputFilter.activate();
    }
    
    showSubListing = nil
    
    
;

 









 
makeListStr(objList, nameProp = &aName, conjunction = 'och', suppressStateInfo = nil)

{
    local lst = [];
    local i = 0;
    local obj;
    objList = valToList(objList);
    
     




       
    if(objList.length > 0 && objList[1].propDefined(&listOrder) &&
       objList.indexWhich({x: x.listOrder != objList[1].listOrder}))
        objList = objList.sort(nil, {a, b: a.listOrder - b.listOrder});
    
     
    for(i = 1, obj in objList ; ; ++i)
    {
         
        obj.mentioned = true;        
        
         
        local desc = obj.(nameProp);
        
         
        if(!suppressStateInfo)
        {
            foreach(local state in obj.states)
                desc += state.getAdditionalInfo(obj);
        }

         
        lst += desc;
    }
    
    
     


        
    if(objList.length > 1 || (objList.length > 0 && objList[1].plural))
        prevDummy_.plural = true;
    else
        prevDummy_.plural = nil;   
          
    
     




    return lst == [] ? 'ingenting' : genList(lst, conjunction);
       
}

 




mentionA(obj)
{
     
    obj.mentioned = true;
    
     
    obj.noteSeen();
    
     




    prevDummy_.plural = obj.plural;
    
     
    return obj.aName;    
}

mentionObj(obj)
{
     
    obj.mentioned = true;
    
     
    obj.noteSeen();
    
     




    prevDummy_.plural = obj.plural;
    
     
    return obj.mentionName;
}



 




mentionThe(obj)
{
     
    obj.mentioned = true;
    
     
    obj.noteSeen();
    
     




    prevDummy_.plural = obj.plural;
    
     
    return obj.theName;
}

 



makeListInStr(objList)
{   
     return makeListStr(objList);    
}

 



makeTheListStr(objList)
{    
    return makeListStr(objList, &theName);
}

 





isListStr(objList)
{
    return '{dummy} {är} ' + makeListStr(objList);
}
   
 




listStrIs(objList)
{    
    return makeListStr(objList) + ' {prev} {är}';
}


 


orList(lst)
{
    return genList(lst, 'eller');
}

 


andList(lst)
{
    return genList(lst, 'och');
}

 


genList(lst, conj)
{
     
    local ret = new StringBuffer();

     
    lst = mergeDuplicates(lst); 
   
     
    local i = 1, len = lst.length();
    foreach (local str in lst)
    {
         
        if (i > 1)
        {
            if (len == 2)
                ret.append(' <<conj>> ');
            else if (i == len)
                ret.append(' <<conj>> ');
            else
                ret.append(', ');
        }

         
        ret.append(str);

         
        ++i;
    }

     
    return toString(ret);
}

 


     
mergeDuplicates(lst)
{
     
    local dupVec = new Vector(10);
    
     
    local processedVec = new Vector(10);
    
     
    foreach(local cur in lst)
    {
         



        if(dupVec.indexOf(cur))
            continue;
        
         
        local num = lst.countWhich({x: x == cur});
        
         



        if(num < 2)
        {
            processedVec.append(cur);
            continue;
        }
        
         



        
        local pl = makeCountedPlural(cur, num);
        {
             





            if(pl == cur)
                processedVec.append(cur);
            else
            {
                processedVec.append(pl);
                dupVec.append(cur);                    
            }
        }
        
    }
    
     
    return processedVec.toList();
}

 






makeCountedPlural(str, num)
{
     
    local strList = str.split(' ');
    
     



    local idx = strList.indexWhich({s: s is in ('en', 'ett', 'den', 'det')});
    if(idx == nil)
        return str;

     
    strList[idx] = spellNumber(num);
    
    
     
    local idx1 = strList.indexWhich({x: x.startsWith('(')});
    local idx2 = strList.indexWhich({x: x.endsWith(')')});
    
     



    
    if(idx1 != nil && idx2 != nil && idx2 >= idx1 && idx2 == strList.length)
    {
        local plStr = strList.sublist(1, idx1 - 1).join(' ');
        local parStr = strList.sublist(idx1).join(' ');
        return LMentionable.pluralNameFrom(plStr) + ' ' + parStr;
    }
    
     
    return LMentionable.pluralNameFrom(strList.join(' '));
}

 



stripArticle(txt)
{
    txt = txt.toLower();
    
    txt = txt.findReplace(R'^(den|en|ett|några) ','');
    return txt;
}


 
 











modify finishOptionQuit
    desc = '<<aHrefAlt('quit', 'QUIT', '<b>Q</b>UIT', 'Lämna berättelsen')>>'
    responseKeyword = 'quit'
    responseChar = 'q'
;

modify finishOptionRestore
    desc = '''<<aHrefAlt('restore', 'RESTORE', '<b>R</b>ESTORE',
            'Återställ en sparad position')>> en sparad position'''
    responseKeyword = 'restore'
    responseChar = 'r'
;

modify finishOptionRestart
    desc = '''<<aHrefAlt('restart', 'RESTART', 'RE<b>S</b>TART',
            'Starta om berättelsen från början')>> berättelsen'''
    responseKeyword = 'restart'
    responseChar = 's'
;

modify finishOptionUndo
    desc = '''<<aHrefAlt('undo', 'UNDO', '<b>U</b>NDO',
            'Ångra det senaste draget')>> det senaste draget'''
    responseKeyword = 'undo'
    responseChar = 'u'
;

modify finishOptionCredits
    desc = '''se <<aHrefAlt('credits', 'CREDITS', '<b>C</b>REDITS',
            'Visa krediter')>>'''
    responseKeyword = 'credits'
    responseChar = 'c'
;

modify finishOptionFullScore
    desc = '''se din <<aHrefAlt('full score', 'FULL SCORE',
            '<b>F</b>ULL SCORE', 'Visa fullständig poäng')>>'''
    responseKeyword = 'full score'
    responseChar = 'f'
;

modify finishOptionAmusing
    desc = '''se några <<aHrefAlt('amusing', 'AMUSING', '<b>A</b>MUSING',
            'Visa några roliga saker att prova')>> saker att prova'''
    responseKeyword = 'amusing'
    responseChar = 'a'
;

modify restoreOptionStartOver
    desc = '''<<aHrefAlt('start', 'START', '<b>S</b>TART',
            'Starta från början')>> spelet från början'''
    responseKeyword = 'start'
    responseChar = 's'
;

modify restoreOptionRestoreAnother
    desc = '''<<aHrefAlt('restore', 'RESTORE', '<b>R</b>ESTORE',
            'Återställ en annan sparad position')>> en annan sparad position'''
;

 
 

modify defaultGround
    vocab = 'mark+en;;golv+et underlag+et'
;


 
 











askMissingNoun(cmd, role)
{
    "\^<<nounRoleQuestion(cmd, role)>>?\n";
}

 










askAmbiguous(cmd, role, names)
{
     








    
    
    

    local q;
    if (role is in (DirectObject, ActorRole))
        
        
        q = 'Menar du'; 
    else {
        
        q = nounRoleQuestion(cmd, role);
        
    }

    
    
     




    if(libGlobal.enumerateDisambigOptions && names.length < 20)
    {
         
        local numbered_names = [];
        
         
        local item;
        
         
        for(local i in 1 .. names.length)
        {
             



            item = '<b>(' + toString(i) + ')</b> ' + names[i];
            
             
            numbered_names += item;
        }
        
         
        names = numbered_names;
        
         
        libGlobal.disambigLen = names.length;
    }
    
     
    "\^<<q>>, <<orList(names)>>?\n";
}

 





 
nounRoleQuestion(cmd, role)
{
     
    local q = cmd.verbProd.missingQ.split(';');

     
    q = q[role == DirectObject ? 1 : role == IndirectObject ? 2 : 3];

     
    local others = [DirectObject, IndirectObject, AccessoryObject];
    local otheridx = 1;

     
    local f = function(match, idx, str) {

         
        local r;
        if (rexGroup(3) != nil)
        {
            r = rexGroup(3)[3];
            r = (r == 'dobj' ? DirectObject :
                 r == 'iobj' ? IndirectObject :
                 AccessoryObject);
        }
        else
        {
             



            while ((r = others[otheridx++]) == role) ;
        }

         
        local prep = (rexGroup(1) != nil ? rexGroup(1)[3].substr(2) : '');

         
        return npListPronoun(rexGroup(2)[3], cmd.(r.npListProp), prep);
    };

         
   return q.findReplace(
        R'(<lparen><alpha|space>+)?%<(det|detta)(-<alpha>+)?%><rparen>?',
        f).trim();   
   
}

 
askMissingLiteralQ(action, role)
{
    "\^<<literalRoleQuestion(action, role)>>?\n";
}

 





literalRoleQuestion(action, role)
{
     
    if(action.ofKind(Command))
        action = action.action;
    
     
    local q = action.verbRule.missingQ.split(';');

     
    q = q[role == DirectObject ? 1 : role == IndirectObject ? 2 : 3];

     
    return q;    
}



 





announceBestChoice(action, obj, role)
{    
     
    local ann;
    
     
    local vp = action.verbRule.verbPhrase;
    
     



    local pat = R'(<lparen>.*?<rparen>)';
    
     
    local rm = rexSearch(pat, vp);
    
     





    if(role == DirectObject && action.verbRule.rolesReversed)
        role = IndirectObject;        

     



    if(role == IndirectObject)
        rm = rexSearch(pat, vp, rm[1] + rm[2]);
    
     
    ann = rm[3].findReplace('vad', obj.abcName(action, role));
    
     




    ann = ann.findReplace('(', '<.assume>');
    ann = ann.findReplace(')', '<./assume>');
    
     
    "<<ann>>\n";
}

 



npListPronoun(pro, nplst, prep)
{
     



    if (prep.startsWith('('))
        return '';

     
    if (nplst.length() == 0)
        return '';

     
    if (nplst.length() > 1)
        return '<<prep>> dem';

     
    local np = nplst[1];

     
    if (np.matches.length() > 1 && np.isMultiple())
        return '<<prep>> dem';

     
    local him = true, her = true, them = true;
    foreach (local m in np.matches)
    {
        if (!m.obj.isHim)
            him = nil;
        if (!m.obj.isHer)
            her = nil;
        if (!m.obj.plural)
            them = nil;
    }

     
    if (them)
        return '<<prep>> dem';
    if (him)
        return '<<prep>> honom';
    if (her)
        return '<<prep>> henne';
    else
        return '<<prep>> <<pro>>';
}

 




libMessages: object
    
     










    menuKeyList = [
                   ['q'],
                   ['p', '[left]', '[bksp]', '[esc]'],
                   ['u', '[up]'],
                   ['d', '[down]'],
                   ['ENTER', '\n', '[right]', ' ']
                  ]

     
    prevMenuLink = '<font size=-1>Föregående</font>'

     
    nextMenuTopicLink = '<font size=-1>Nästa</font>'

     



    textMenuMainPrompt(keylist)
    {
        "\bVälj ett ämnesnummer eller tryck på &lsquo;<<
        keylist[2][1]>>&rsquo; för föregående meny eller &lsquo;<<
keylist[1][1]>>&rsquo; för att avsluta:\ ";
    }

     
    textMenuTopicPrompt()
    {
        "\bTryck på mellanslagstangenten för att visa nästa rad, &lsquo;<b>P</b>&rsquo; för att gå till föregående meny, eller &lsquo;<b>Q</b>&rsquo; för att avsluta.\b"

;
    }

     





    menuTopicProgress(cur, tot) { " [<<cur>>/<<tot>>]"; }

     





    menuTopicListEnd = '[Slutet]'

     




    menuLongTopicEnd = '[Slutet]'

     




    menuInstructions(keylist, prevLink)
    {
        "<tab align=right ><b>\^<<keylist[1][1]>></b>=Avsluta <b>\^<<
        keylist[2][1]>></b>=Föregående meny<br> <<
prevLink != nil ? aHrefAlt('previous', prevLink, '') : ''>> <tab align=right ><b>\^<<
keylist[3][1]>></b>=Upp <b>\^<<
        keylist[4][1]>></b>=Ner <b>\^<<
        keylist[5][1]>></b>=Välj<br>";
    }

     
    menuNextChapter(keylist, title, hrefNext, hrefUp)
    {
        "Nästa: <<aHref(hrefNext, title)>>; <b>\^<<
keylist[2][1]>></b>=<<aHref(hrefUp, 'Meny')>>";
    }

    
     






    dlgTitleNone = 'Notera'
    dlgTitleWarning = 'Varning'
    dlgTitleInfo = 'Notera'
    dlgTitleQuestion = 'Fråga'
    dlgTitleError = 'Fel'

     




    dlgButtonOk = 'OK'
    dlgButtonCancel = 'Avbryt'
    dlgButtonYes = 'Ja'
    dlgButtonNo = 'Nej'
    
       
    webNewUser(name) { "\b[<<name>> har gått med i sessionen.]\n"; }
    
    
     





    inputFileScriptWarning(warning, filename)
    {
         
        warning = warning.substr(3);

         
        return warning + ' Vill du fortsätta?';
    }
    inputFileScriptWarningButtons = [
        '&Ja, använd den här filen', '&Välj en annan fil', '&Stoppa skriptet']
    
     
    webUploadTooBig = 'Filen du valde är för stor för att ladda upp.'
   
 
;


 



makeSentence(msg)
{
    return rexReplace(
        ['^<space>*[a-z]', '(?<=[^.?! ])<space>*$'], msg,
        [{m: m.toUpper()}, '.']);
}

 





modify dummy_ 
    dummyName = ''
    name = ''
    noteName(src)
    {
        name = src;
    }
;

 



modify pluralDummy_ 
    dummyName = ''
    name = ''
    noteName(src)
    {
        name = src;
    }
    
    plural = true
;


 




prevDummy_: Mentionable
    dummyName = ''
    name = ''
    noteName(src)
    {
        name = src;
    }
    
    plural = true    
;

 



actorActionContinuer_: dummy_ {
    person = ((libGlobal.curActor) == nil ? 3 : (libGlobal.curActor).person)
    plural = ((libGlobal.curActor) == nil ? nil : (libGlobal.curActor).plural)
}



 
 






swedishMessageParams: MessageParams
     









    sentenceOrder = 'SVO'

     













    params = [

         












        ['curobj', function(ctx, params) {
            ctx.curObj = findStrParam(params[2], vObject);
            return '';
        }],

         
        [ 'lb', { ctx, params: '{' } ],

         
        [ 'rb', { ctx, params: '}' } ],

         
        [ 'bar', { ctx, params: '|' } ],

         








        
        [ 'er/te', { ctx, params: Narrator.tense == Present ? 'er' : 'te' } ],
        [ 'er/e', { ctx, params: Narrator.tense == Present ? 'er' : 'e' } ],
        

         


        [ 'den', { ctx, params: ctx.cmd.dobj.plural? 'de' : ctx.cmd.dobj.isNeuter? 'det' : 'den' } ],
        [ 'det', { ctx, params: ctx.cmd.dobj.plural? 'de' : ctx.cmd.dobj.isNeuter? 'det' : 'den' } ],

        [ 'detta', { ctx, params: ctx.cmd.dobj.plural? 'dessa' : ctx.cmd.dobj.isNeuter? 'detta' : 'denna' } ],
        [ 'dessa', { ctx, params: ctx.cmd.dobj.plural? 'dessa' : ctx.cmd.dobj.isNeuter? 'detta' : 'denna' } ],
        [ 'denna', { ctx, params: ctx.cmd.dobj.plural? 'dessa' : ctx.cmd.dobj.isNeuter? 'detta' : 'denna' } ],
        [ 'dehär', { ctx, params: ctx.cmd.dobj.plural? 'de här' : ctx.cmd.dobj.isNeuter? 'det här' : 'den här' } ],
        [ 'dethär', { ctx, params: ctx.cmd.dobj.plural? 'de här' : ctx.cmd.dobj.isNeuter? 'det här' : 'den här' } ],
        [ 'denhär', { ctx, params: ctx.cmd.dobj.plural? 'de här' : ctx.cmd.dobj.isNeuter? 'det här' : 'den här' } ],

         
        [ '1',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[1])) } ],
        [ '2',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[2])) } ],
        [ '3',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[3])) } ],
        [ '4',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[4])) } ],
        [ '5',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[5])) } ],
        [ '6',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[6])) } ],
        [ '7',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[7])) } ],
        [ '8',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[8])) } ],
        [ '9',
         { ctx, params: ctx.paramToString(ctx.noteParam(ctx.args[9])) } ],

         
        [ '#', { ctx, params:
         spellNumber(ctx.paramToNum(ctx.noteParam(
             ctx.args[toInteger(params[2])]))) } ],

         



        [ 'och', { ctx, params:
         andList(ctx.noteParam(ctx.args[toInteger(params[2])])
                 .mapAll({ x: ctx.paramToString(x) })) } ],

         



        [ 'eller', { ctx, params:
         orList(ctx.noteParam(ctx.args[toInteger(params[2])])
                .mapAll({ x: ctx.paramToString(x) })) } ],
        

         
        [ 'jag',  { ctx, params: cmdInfo(ctx, &actor, &theName, vSubject) } ],
        [ 'du',  { ctx, params: cmdInfo(ctx, &actor, &theName, vSubject) } ],

         
        
        
        [ 'mig', { ctx, params: cmdInfo(ctx, &actor, &theObjName, vObject) } ],
        [ 'dig', { ctx, params: cmdInfo(ctx, &actor, &theObjName, vObject) } ],
        [ 'sig', { ctx, params: cmdInfo(ctx, &actor, &theObjName, vObject) } ],
        
        [ 'obj', { ctx, params: cmdInfo(ctx, params[2], &theObjName, vObject) } ],

         








        [ 'min', { ctx, params: cmdInfo(ctx, &actor, &possAdj, vPossessive) } ],

         










        [ 'poss', function(ctx, params) {
            local ownedSrc = params[3];
            local ownedObj = nil;
            if (dataType(ownedSrc) == 8) {
                if (rexMatch(R'<digit>+', ownedSrc) != nil)
                    ownedObj = ctx.args[toInteger(ownedSrc)];
                else
                    ownedObj = findStrParam(ownedSrc, vObject);
            } else if (dataType(ownedSrc) == 5)
                ownedObj = ownedSrc;
            local prop = (ownedObj != nil && ownedObj.plural) ? &possAdjPl
                       : (ownedObj != nil && ownedObj.isNeuter) ? &possAdjT
                       : &possAdj;
            return cmdInfo(ctx, params[2], prop, vPossessive);
        } ],
        
         
        [ 'jagsjälv', { ctx, params: cmdInfo(ctx, &actor, &reflexiveName, vObject) } ],

         
        [ 'vi',  { ctx, params: cmdInfo(ctx, &actor, &theName, vSubject) } ],

         
        [ 'oss', { ctx, params: cmdInfo(ctx, &actor, &theObjName, vObject) } ],

         
        [ 'vår', { ctx, params: cmdInfo(ctx, &actor, &possAdj, vPossessive) } ],

         
        [ 'våran', { ctx, params: cmdInfo(ctx, &actor, &possAdj, vPossessive) } ],
        
         



        [ 'dummy', { ctx, params: cmdInfo(ctx, dummy_, &dummyName, vSubject) } ],
        
         



        [ 'sing', { ctx, params: cmdInfo(ctx, dummy_, &dummyName, vSubject) } ],
        
         



        [ 'plural', { ctx, params: cmdInfo(ctx, pluralDummy_, &dummyName, vSubject) } ],
        
         

















        
        

         






















        [ 'här',
         { ctx, params:
           ctx.actorIsPC() ? (Narrator.tense == Present ? 'här' : 'där') :
           '\010' } ],
        
         



         



        [ 'då',
         { ctx, params: Narrator.tense == Present ? 'nu' : 'då' } ],

         








        [ 'nu',
         { ctx, params: Narrator.tense == Present ? 'nu' : '\010' } ],

         











        [ 'ref', function(ctx, params) {
            if (params[2] == 'subj') {
                return cmdInfo(ctx, params[3], &theName, vSubject);
            } else if (params[2].endsWith('s')) {
                
                return cmdInfo(ctx, params[2].left(-1), &possAdj, vObject);
            } else {
                return cmdInfo(ctx, params[2], &theObjName, vAmbig);
            }
        }
        ],

         
        ['namn', function(ctx, params) {
        
        if (params[2] == 'subj')
           return cmdInfo(ctx, params[3], &name, vSubject);
        else if (params[2].endsWith('\'s'))
           return cmdInfo(ctx, params[2].left(-2), &possAdj, vObject);
        else
           return cmdInfo(ctx, params[2], &name, vAmbig);
        }
        ],

         



        [ 'ett', function(ctx, params) {
        
        if (params[2] == 'subj')
           return cmdInfo(ctx, params[3], &aName, vSubject);       
        else
           return cmdInfo(ctx, params[2], &aName, vAmbig);
        }
        ],
    
         



        [ 'en', function(ctx, params) {
            if (params[2] == 'subj') {
                return cmdInfo(ctx, params[3], &aName, vSubject);       
            } else {
                return cmdInfo(ctx, params[2], &aName, vAmbig);
            }
        
        }
        ],
    
         




        [ 'i', { ctx, params: cmdInfo(ctx, params[2], &objInName, vObject) } ],

         
        ['platsprep' , { ctx, params: cmdInfo(ctx, params[2], &objInPrep, vObject) } ], 

     



        [ 'inuti', { ctx, params: cmdInfo(ctx, params[2], &objIntoName, vObject) } ],

     


 
        ['utur', { ctx, params: cmdInfo(ctx, params[2], &objOutOfName, vObject) } ],

     
        [ 'han',
        { ctx, params: cmdInfo(ctx, params[2], &heName, vSubject) } ],

     
        [ 'hon',
        { ctx, params: cmdInfo(ctx, params[2], &heName, vSubject) } ],

     



















        [ 'de', function(ctx, params) {
            if (params.length >= 2)
                return cmdInfo(ctx, params[2], &heName, vSubject);
            else
                return ctx.cmd.dobj.plural? 'de'
                    : ctx.cmd.dobj.isNeuter? 'det' : 'den';
        } ],

    
         
        [ 'honom',
         { ctx, params: cmdInfo(ctx, params[2], &himName, vObject) } ],

      
        [ 'dem',
         { ctx, params: cmdInfo(ctx, params[2], &himName, vObject) } ],

         









        [ 'hans',  { ctx, params: cmdInfo(ctx, params[2], &herName, vPossessive) } ],
        [ 'hennes', { ctx, params: cmdInfo(ctx, params[2], &herName, vPossessive) } ],
        [ 'dess',  { ctx, params: cmdInfo(ctx, params[2], &herName, vPossessive) } ],
        [ 'deras', { ctx, params: cmdInfo(ctx, params[2], &herName, vPossessive) } ],
    
     

    [ 'sigsjälv',
      { ctx, params: cmdInfo(ctx, params[2], &reflexiveObjName, vObject) } ],
        

         



        [ 'pron', function(ctx, params) {
            if (params[2] == 'subj')
                return cmdInfo(ctx, params[3], &thatName, vSubject);
            else
                return cmdInfo(ctx, params[2], &thatObjName, vObject);
        } ],

         
        [ 'är', conjugateBe ],
        [ 'ärinte', conjugateIsnt ],

         
        [ 'var', conjugateWas ],
        [ 'varinte', conjugateWasnt ],

         
        [ 'harinte', conjugateHavnt ],

         
        [ 'kaninte', conjugateKanInte ],

         
        [ 'måste', { ctx, params: conjugateMust(ctx, params) } ],
        
        [ 'actionliststr', {ctx, params: makeListStr((libGlobal.curCommand).action.reportList, &theName) } ],

        ['conj', {ctx, params: conjugateSwedish(ctx, params) } ],

        ['conjadj', {ctx, params: adjustAdjectiveAgreement(ctx, params) } ],

        ['posture', {ctx, params: ctx.subj.postureDesc } ]

    ]

     







    cmdInfoReflexive(ctx, srcObj, objProp)
    {
         



        
         


        
        if (ctx.reflexiveAnte.indexOf(srcObj) != nil) {
             
            if (objProp == &reflexiveObjName)
                return srcObj.reflexiveObjName;
            return srcObj.pronoun().reflexive.name;
        }

         
        return nil;
    }

     



    construct()
    {
         
        verbTab = new LookupTable(128, 256);

         
        forEachInstance(CustomVocab, function(cv) {

             
            local vec = new Vector(cv.verbParams.length() * 2);

             
            foreach (local p in cv.verbParams)
            {
                 
                local toks = p.split('/').mapAll({ s: s.trim() });

                 



                if (toks.length() == 3)
                    toks += toks[3];

                 
                verbTab[toks[1]] = toks;
                verbTab[toks[2]] = toks;

                 



                vec.append([toks[1], conjugate]);
                vec.append([toks[2], conjugate]);
            }

             
            params += vec;
        });

         





        inherited();
    }

     
    verbTab = nil
    
     



    sLetters = ['s', 'x', 'z', 'sh', 'ch']

     



    awkwardEnding(nam)
    {
        return sLetters.indexWhich({lts: nam.endsWith(lts)})!= nil;
    }

    
;

 




conjugate(ctx, params)
{
     
    local toks = swedishMessageParams.verbTab[params[1]];
    if (toks == nil)
        return nil;

    switch (Narrator.tense)
    {
    case Present:
         
        return toks[2];
    case Past:
         
        return toks[3];
    case Perfect:
         
        return 'har <<toks[4]>>';
    case PastPerfect:
         
        return 'hade <<toks[4]>>';
        
    case Future:
         
        return 'kommer att <<toks[1]>>';
        
    case FuturePerfect:
         
        return 'kommer att ha <<toks[4]>>';
    }
    
    return nil;
}

 





































langAdjust(txt)
{
    if(txt == nil)
        return '';

    local adjPat = R'([^ {}]+)<lbrace>(a|t/a|n/t/na|d/t/de|d/t/a|d/t/da|en/et/a|en/et/na)<rbrace>';
    for(;;)
    {
        local rf = rexSearch(adjPat, txt);
        if(rf == nil) break;
        local root = rexGroup(1)[3];
        local ending = rexGroup(2)[3];
        txt = txt.findReplace(root + '{' + ending + '}',
                              '{conjadj ' + root + ' ' + ending + '}');
    }

    local verbPat = R'([^ {}]+)<lbrace>(r/de|r/de/t|er/te/t|er/de|er/de/t|r/dde/tt)<rbrace>';
    for(;;)
    {
        local rf = rexSearch(verbPat, txt);
        if(rf == nil) break;
        local root = rexGroup(1)[3];
        local ending = rexGroup(2)[3];
        txt = txt.findReplace(root + '{' + ending + '}',
                              '{conj ' + root + ' ' + ending + '}');
    }

    return txt;
}





adjustAdjectiveAgreement(ctx, params)
{
    local root = params[2];
    if(ctx == nil)
        return root;

    local uterEnding = '';
    local neuterEnding = '';
    local pluralEnding = '';

    switch(params[3])
    {
    case 'a':
        pluralEnding = 'a';
        break;
    case 't/a':
        neuterEnding = 't';
        pluralEnding = 'a';
        break;
    case 'n/t/na':
        uterEnding = 'n';
        neuterEnding = 't';
        pluralEnding = 'na';
        break;
    case 'd/t/de':
        uterEnding = 'd';
        neuterEnding = 't';
        pluralEnding = 'de';
        break;
    case 'en/et/a':
        uterEnding = 'en';
        neuterEnding = 'et';
        pluralEnding = 'a';
        break;
    case 'en/et/na':
        uterEnding = 'en';
        neuterEnding = 'et';
        pluralEnding = 'na';
        break;
    case 'd/t/a':
        uterEnding = 'd';
        neuterEnding = 't';
        pluralEnding = 'a';
        break;
    case 'd/t/da':
        uterEnding = 'd';
        neuterEnding = 't';
        pluralEnding = 'da';
        break;
    }

    local obj;
    if (ctx.curObj != nil)
        obj = ctx.curObj;
    else if (ctx.cmd != nil && ctx.cmd.dobj != nil)
        obj = ctx.cmd.dobj;
    else
        obj = ctx.actor;

    if(obj == nil)
        return root;

    if(obj.plural)
        return root + pluralEnding;
    if(obj.isNeuter)
        return root + neuterEnding;
    return root + uterEnding;
}




conjugateSwedish(ctx, params)
{
    local root = params[2];
    local presentEnding = '';
    local pastEnding = '';
    local supinumEnding = '';
    local infinitive = root + 'a';

    switch(params[3])
    {
    case 'r/de':
    case 'r/de/t':
        presentEnding = 'r';
        pastEnding = 'de';
        supinumEnding = 't';
        infinitive = root;
        break;
    case 'er/te/t':
        presentEnding = 'er';
        pastEnding = 'te';
        supinumEnding = 't';
        break;
    case 'er/de':
        presentEnding = 'er';
        pastEnding = 'de';
        supinumEnding = 't';
        break;
    case 'er/de/t':
        presentEnding = 'er';
        pastEnding = 'de';
        supinumEnding = 't';
        break;
    case 'r/dde/tt':
        presentEnding = 'r';
        pastEnding = 'dde';
        supinumEnding = 'tt';
        infinitive = root;
        break;
    }

    switch(Narrator.tense)
    {
    case Present:     return root + presentEnding;
    case Past:        return root + pastEnding;
    case Perfect:     return 'har ' + root + supinumEnding;
    case PastPerfect: return 'hade ' + root + supinumEnding;
    case Future:      return 'ska ' + infinitive;
    case FuturePerfect: return 'ska ha ' + root + supinumEnding;
    }
    return root + presentEnding;
}

 






pastParticiple(verb)
{
    local b1 = verb.find('[');
    local b2 = verb.find(']');
    
    
    if(b1 != nil && b2 != nil && b2 > b1)
    {
        local stem = verb.substr(1, b1 - 1);
        local suffix = verb.substr(b1 + 1, b2 - b1 - 1);
        local dash = suffix.find('/');
        local ending = suffix;
        if(dash)
        {    
            ending = suffix.substr(dash + 1, suffix.length - 2);
            
        }
        
        if(ending.startsWith('?'))
        {
            stem = stem + stem.substr(-1, 1);
            ending = ending.substr(2);
        }
        return stem + ending;
                                     
    }
    else
        return swedishMessageParams.verbTab[verb][4];
    
}


 
modify MessageCtx
    paramToString(val)
    {
        if (dataType(val) == 5 && val.ofKind(Mentionable))
            return val.theName;
        return inherited(val);
    }
;

conjugateKanInte(ctx, params)
{
    local t = Narrator.tense;
    if (t == Present)       return 'kan inte';
    if (t == Past)          return 'kunde inte';
    if (t == Perfect)       return 'har inte kunnat';
    if (t == PastPerfect)   return 'hade inte kunnat';
    if (t == Future)        return 'kommer inte att kunna';
    if (t == FuturePerfect) return 'kommer inte att ha kunnat';
    return nil;
}

 



conjugateBe(ctx, params)
{
     




    local idx = ctx.subjEffectivelyPlural ? 4 : ctx.subj.person;

     



    local idx2 = ctx.subj.person == 3 && !ctx.subj.plural ? 2 : 1;

     
    switch (Narrator.tense)
    {
    case Present:
        return ['är', 'är', 'är', 'är'][idx];

    case Past:
        return ['var', 'var', 'var', 'var'][idx];

    case Perfect:
        return ['har varit', 'har varit'][idx2];

    case PastPerfect:
        return 'hade varit';

    case Future:
        return 'kommer att vara';

    case FuturePerfect:
        return 'kommer att ha varit';
    }

    return nil;
}

 




conjugateBeNot(ctx, params)
{
     




    local idx = ctx.subjEffectivelyPlural ? 4 : ctx.subj.person;

     



    local idx2 = ctx.subj.person == 3 && !ctx.subj.plural ? 2 : 1;

     
    switch (Narrator.tense)
    {
    case Present:
        return '<<['är', 'är', 'är', 'är'][idx]>> inte';

    case Past:
        return '<<['var', 'var', 'var', 'var'][idx]>> inte';

    case Perfect:
        return ['har inte varit', 'har inte varit'][idx2];

    case PastPerfect:
        return 'hade inte varit';

    case Future:
        return 'kommer inte att vara';

    case FuturePerfect:
        return 'kommer inte att ha varit';
    }

    return nil;
}

 




conjugateIsnt(ctx, params)
{
     




    local idx = ctx.subjEffectivelyPlural ? 4 : ctx.subj.person;

     



    local idx2 = ctx.subj.person == 3 && !ctx.subjEffectivelyPlural ? 2 : 1;

     
    switch (Narrator.tense)
    {
    case Present:
        return ['är inte', 'är inte', 'är inte', 'är inte'][idx];

    case Past:
        return ['var inte', 'var inte', 'var inte', 'var inte'][idx];

    case Perfect:
        return ['har inte varit', 'har inte varit'][idx2];

    case PastPerfect:
        return 'hade inte varit';

    case Future:
        return 'kommer inte att vara';

    case FuturePerfect:
        return 'kommer inte att ha varit';
    }

    return nil;
}

 




conjugateIm(ctx, params)
{
     




    local idx = ctx.subjEffectivelyPlural ? 4 : ctx.subj.person;

     



    local idx2 = ctx.subj.person == 3 && !ctx.subjEffectivelyPlural ? 2 : 1;

     
    switch (Narrator.tense)
    {
    case Present:
        return ['\'m', '\'re', '\'s', '\'re'][idx];

    case Past:
        return [' var', ' var', ' var', ' var'][idx];

    case Perfect:
        return ['\'ve varit', '\'s varit'][idx2];

    case PastPerfect:
        return '\'d varit';

    case Future:
        return '\'ll vara';

    case FuturePerfect:
        return '\'ll ha varit';
    }

    return nil;
}

 





conjugateWas(ctx, params)
{ 
    switch (Narrator.tense)
    {
    case Present:
        return ctx.subjEffectivelyPlural || ctx.subj.person == 2 ? 'var' : 'var';
        
    case Past:
    case Perfect:
    case PastPerfect:
        return 'hade varit';
        
    case Future:
    case FuturePerfect:
        return 'kommer att ha varit';
    }
    
    return nil;
}

conjugateWasnt(ctx, params)
{ 
    switch (Narrator.tense)
    {
    case Present:
        return ctx.subjEffectivelyPlural || ctx.subj.person == 2 ? 'var inte' : 'var inte';
        
    case Past:
    case Perfect:
    case PastPerfect:
        return 'hade inte varit';
        
    case Future:
    case FuturePerfect:
        return 'kommer inte att ha varit';
    }
    
    return nil;
}
    
conjugateWasnot(ctx, params)
{ 
    switch (Narrator.tense)
    {
    case Present:
        return ctx.subj.plural || ctx.subj.person == 2 ? 'var inte' : 'var inte';
        
    case Past:
    case Perfect:
    case PastPerfect:
        return 'hade inte varit';
        
    case Future:
    case FuturePerfect:
        return 'kommer inte att ha varit';
    }
    
    return nil;
}

 





conjugateIve(ctx, params)
{
    local fullForm = swedishMessageParams.awkwardEnding(ctx.subj.name);
    
    switch (Narrator.tense)
    {
    case Present:
        if(fullForm)
            return !ctx.subjEffectivelyPlural && ctx.subj.person == 3 ? ' har' : ' har';
        else
            return !ctx.subjEffectivelyPlural && ctx.subj.person == 3 ? '\'s' : '\'ve';
        
        
        
    case Past:
    case Perfect:
    case PastPerfect:
        return fullForm ? ' hade' : '\'d';       
        
    case Future:
    case FuturePerfect:
        return fullForm ? ' kommer att ha' : '\'ll ha'; 
    }
    
    return nil;
}    

 
conjugateHavnt(ctx, params)
{
    switch (Narrator.tense)
    {
    case Present:       
            return !ctx.subjEffectivelyPlural && ctx.subj.person == 3 ? 'har inte' 
            : 'har inte';      
        
    case Past:
    case Perfect:
    case PastPerfect:
        return 'hade inte';       
        
    case Future:
    case FuturePerfect:
        return 'kommer inte att ha' ;
    }
    
    return nil;
}


conjugateHavenot(ctx, params)
{
    switch (Narrator.tense)
    {
    case Present:       
            return !ctx.subjEffectivelyPlural && ctx.subj.person == 3 ? 'har inte' 
            : 'har inte';      
        
    case Past:
    case Perfect:
    case PastPerfect:
        return 'hade inte';       
        
    case Future:
    case FuturePerfect:
        return 'kommer inte att ha' ;
    }
    
    return nil;
}

 




conjugateCan(ctx, params, beFunc, present, past)
{
    local neg = (present.find('inte') != nil);
    switch (Narrator.tense)
    {
    case Present:
        return present;

    case Past:
        return past;

    case Perfect:
        return neg ? 'har inte kunnat' : 'har kunnat';

    case PastPerfect:
        return neg ? 'hade inte kunnat' : 'hade kunnat';

    case Future:
        return neg ? 'kommer inte att kunna' : 'kommer att kunna';

    case FuturePerfect:
        return neg ? 'kommer inte att ha kunnat' : 'kommer att ha kunnat';
    }

    return nil;
}

 





conjugateMust(ctx, params)
{
    local inf = params[2].split('[')[1];    
    
    local part = pastParticiple(params[2]);
    local idx = ctx.subj.person == 3 && !ctx.subjEffectivelyPlural ? 2 : 1;

    switch (Narrator.tense)
    {
    case Present:
        return 'måste <<inf>>';

    case Past:
        return 'var tvungen att <<inf>>';

    case Perfect:
        return ['måste ha ', 'måste ha '][idx] + part;
        
    case PastPerfect:
        return 'var tvungen att ha <<part>>';
        
    case Future:
        return 'kommer att behöva <<inf>>';
        
    case FuturePerfect:
        return 'kommer att behöva ha <<part>>';
    }

    return nil;
}


 



modify Action
     getVerbPhrase(inf, ctx)
     {
         



        rexMatch('(.*)/(<alphanum|-|squote>+)(.*)', verbRule.verbPhrase);

         
        if (inf)
        {
             



            return rexGroup(1)[3] + rexGroup(3)[3];
        }
        else
        {
             
            return rexGroup(2)[3] + rexGroup(3)[3];
        }
    }
  
     



    reportImplicitActions = true
    
    
     





    buildImplicitActionAnnouncement(success, clearReports = true)
    {
        
         



       
        if(!reportImplicitActions)
            return '';
        
        local rep = '';
        local cur;
        
        
         






        if(isImplicit)
        {    
            cur = implicitAnnouncement(success);
            
            if(cur != nil)
                (libGlobal.curCommand).implicitActionReports += cur;
        }    
            
        
         




        
        if((success == nil || !isImplicit) &&
           (libGlobal.curCommand).implicitActionReports.length > 0)
        {
            
            local lst = mergeDuplicates((libGlobal.curCommand).implicitActionReports);
            
            
             





            
            rep = bmsg('<.assume>');

             



            for (cur in lst, local i = 1 ;; ++i)
            {    
                rep += cur;
                
                 



                if(i < lst.length)
                    
                    
                    rep += ' sedan ';
            }
            
            local prp = getPostImplicitReports();
            
            if(clearReports)
            {
                 
                (libGlobal.curCommand).implicitActionReports = [];
                
                (libGlobal.curCommand).postImplicitReports = [];
            }
            
             
            
            return rep + bmsg(' först<./assume>\n') + prp;
        }
        
         




        
        return '';
    }
    
       
     









    implicitAnnouncement(success)
    {
        return success ? getVerbPhrase(nil, nil) : 
              
              
              'försöker '
               + getVerbPhrase(true, nil);
    }
    
    
    
     
    spPrefix(str) { return (str == '' ? str : ' ' + str); }
    spSuffix(str) { return (str == '' ? str : str + ' '); }
    
     




    announceObject(obj)
    {
        "<.announceObj><<obj.name>>:<./announceObj> ";
    }
;

modify TAction
     





    vPhrase(dobj, iobj?)
    {
        return verbRule.verbPhrase;
    }
    
      
    getVerbPhrase(inf, ctx)
    {
        local dobj;
        local dobjText;
        local dobjIsPronoun;
        local ret;

         
        dobj = curDobj;
         
         
        dobjIsPronoun = nil;        

          
        dobjText = dobj.theName;

         

        ret = getVerbPhrase1(inf, vPhrase(dobj), dobjText, dobjIsPronoun);

         
        return ret;
    }

     











    getVerbPhrase1(inf, vp, dobjText, dobjIsPronoun)
    {
        local ret;
        local dprep;
        local vcomp;

         





        rexMatch('(.*)/(<alphanum|-|squote>+)(.*) '
                 + '<lparen>(.*?)<space>*?<alpha>+<rparen>(.*)',
                 vp);

         
        if (inf)
            ret = rexGroup(1)[3];
        else
            ret = rexGroup(2)[3];

         
        vcomp = rexGroup(3)[3];

         
        dprep = rexGroup(4)[3];

         



        if (!dobjIsPronoun)
            ret += spPrefix(vcomp);

         
        ret += spPrefix(dprep);

         
        ret += ' ' + dobjText;

         



        if (dobjIsPronoun)
            ret += spPrefix(vcomp);

         



        ret += rexGroup(5)[3];

         
        return ret;
    }
;

modify TIAction
      
    getVerbPhrase(inf, ctx)
    {
        local dobj, dobjText, dobjIsPronoun;
        local iobj, iobjText;
        local ret;

         
        dobj = curDobj;
        
        dobjText = dobj.theName;
        dobjIsPronoun = nil;

         
        iobj = curIobj;

        iobjText = (iobj != nil ? iobj.theName : nil);

         
        ret = getVerbPhrase2(inf, vPhrase(dobj, iobj), 
                             dobjText, dobjIsPronoun, iobjText);



        
         
        return ret;
    }

     






    getVerbPhrase2(inf, vp, dobjText, dobjIsPronoun, iobjText)
    {
        local ret;
        local vcomp;
        local dprep, iprep;

         
        rexMatch('(.*)/(<alphanum|-|squote>+)(?:<space>+(<^lparen>*))?'
                 + '<space>+<lparen>(.*?)<space>*<alpha>+<rparen>'
                 + '<space>+<lparen>(.*?)<space>*<alpha>+<rparen>',
                 vp);

         
        if (inf)
            ret = rexGroup(1)[3];
        else
            ret = rexGroup(2)[3];

         
        vcomp = (rexGroup(3) == nil ? '' : rexGroup(3)[3]);

         
        dprep = rexGroup(4)[3];
        iprep = rexGroup(5)[3];

         



        if (!dobjIsPronoun)
            ret += spPrefix(vcomp);

         



        ret += spPrefix(dprep) + ' ' + dobjText;

         



        if (dobjIsPronoun)
            ret += spPrefix(vcomp);

         
        if (iobjText != nil)
            ret += spPrefix(iprep) + ' ' + iobjText;

         
        return ret;
    }
;

 
 




modify LocType
    prep = ''
    intoPrep = prep
;


modify In
    prep = 'i'  
    intoPrep = 'in i'
;


modify Outside
    prep = 'del av'
;


modify On
    prep = 'på'    
    intoPrep = 'in i'
;

modify Under
    prep = 'under'
;

modify Behind
    prep = 'bakom'
;


modify Held
    prep = 'hållen av'
;


modify Worn
    prep = 'bärs av'
;


modify Into
    prep = 'in i'
;

modify OutOf
    prep = 'ut ur'
;

modify Down
    prep = 'ner'
;

modify Up
    prep = 'upp';
;

modify Through
    prep = 'genom';
;

modify Carrier
    prep = 'buren av'
;

 


property myAction;

class LCommandTopicHelper: object
    
     




    
    actionPhrase()
    {
        if(myAction == nil || myAction.verbRule == nil)
            return 'gör något'; 
         





        local txt = '';
        
         



        local verb = myAction.verbRule.verbPhrase.split('/')[1];
        
         






        foreach(local cur in myAction.grammarTemplates)
        {
            if(cur.length > txt.length && cur.startsWith(verb))
                txt = cur;
        }
        
         



        if(myAction.curDobj != nil)            
            txt = txt.findReplace('(dobj)', getName(myAction.curDobj));
           
         



        if(myAction.curIobj != nil)        
            txt = txt.findReplace('(iobj)', getName(myAction.curIobj));
        
        if((libGlobal.curCommand).verbProd.dirMatch)
            txt = txt.findReplace('(direction)',
                                  (libGlobal.curCommand).verbProd.dirMatch.dir.name);
        return txt;
    }
    
     



    getName(obj)
    {
         
        if(obj == (libGlobal.playerChar))
            return 'jag';
        
         




        if(obj == (libGlobal.curActor))
            return (libGlobal.curActor).plural ? 'er själva' : 'dig själv';
        
         
        return obj.theName;   
    }
;
    

 
 




yesOrNo()
{
     
    "<.commandnone>";

     

    local str = inputManager.getInputLine(nil);

     
    "<.commandmid>";

     

    return rexMatch('<space>*[jJ]', str) != nil;
}


 


replace reverseAttachableDoer: Doer 'fäst SimpleAttachable till Attachable'
    execAction(c)
    {
        if(((libGlobal.curAction).curIobj).reverseConnect(((libGlobal.curAction).curDobj)))
            doInstead(Attach, ((libGlobal.curAction).curIobj), ((libGlobal.curAction).curDobj));
        else
            inherited(c);            
    }    
;

 






removeDoer: Doer 'ta bort Thing'

    execAction(c)
    {
         



        if(c.dobj.separateRemove)
            inherited(c);        
        else if(c.dobj.wornBy == c.actor)
            redirect(c, Doff, dobj: c.dobj);
        else
            redirect(c, Take, dobj: c.dobj);
    }    
;

 





putOnGroundDoer: Doer 'lägg Thing på Floor; kasta Thing på Floor'
    execAction(c)
    {
         



        
        local oldDropLocation;
        local oldLocation;
        try
        {
             
            oldLocation = (libGlobal.curActor).location;
            oldDropLocation = oldLocation.dropLocation;
            
             
            oldLocation.dropLocation = (libGlobal.curActor).getOutermostRoom;
            
             
            redirect(c, Drop, dobj: c.dobj);
        }
        finally
        {
             
            oldLocation.dropLocation = oldDropLocation;
        }
    }
;

 





getOnGroundDoer: Doer 'stå på Floor; gå på Floor'
    execAction(c)
    {
        if((libGlobal.playerChar).location.ofKind(Room))
            "{Jag} {är} stående på {the dobj}. ";
        else
            redirect(c, GetOut);    
    }
;

 
takePathDoer: Doer 'ta PathPassage'
    execAction(c)
    {
        redirect(c, GoThrough);
    }
    
     

    strict = true
    
     

    ignoreError = true
;
 






decimalPreParser: StringPreParser
    doParsing(str, which)
    {
        str = str.findReplace( R'<digit>+<period><digit>+',
                              { match, index, orig: '"'+match+'"' }  );
        
        return str;
    }
;

 






disambigPreParser: StringPreParser
    doParsing(str, which)
    {
         




        if(which == rmcDisambig && libGlobal.enumerateDisambigOptions)
        {
            
             
            local str2 = str.findReplace(['(', ')'], '');
            
                                    
            local num = tryInt(str2);            
            
             




            if(num && num <= ordinals.length && num > 0)
            {    
                if(num <= libGlobal.disambigLen)
                    return ordinals[num];    
                
                "Det fanns bara <<libGlobal.disambigLen>> alternativ.<.p>";
                return nil;
            }
        }       
        
           
         
        return str;
    }
    
     




    ordinals = ['första', 'andra', 'tredje', 'fjärde' ,'femte', 'sjätte', 'sjunde',
        'åttonde', 'nionde', 'tionde', 'elfte', 'tolvte', 'trettonde', 'fjortonde',
        'femtonde', 'sextonde', 'sjuttonde', 'artonde', 'nittonde',
        'tjugonde'
    ];
;

modify SpecialVerb
     

    prepositions = ['i', 'på', 'med', 'till', 'under', 'bakom', 'från']
    
     
    articles = ['den', 'det', 'en', 'ett', 'några']
;

 





enumTabObj: object
    enumTab = 
    [
        dubious -> 'tvivelaktig',
        likely -> 'sannolik',
        unlikely -> 'osannolik',
        untrue -> 'osann',
        small -> 'liten',
        medium -> 'medium',
        large -> 'stor',
        notLockable -> 'inte låsbar',
        lockableWithoutKey -> 'låsbar utan nyckel',
        lockableWithKey -> 'låsbar med nyckel',
        indirectLockable -> 'indirekt låsbar',
        masculine -> 'maskulin',
        feminine -> 'feminin',
        neuter -> 'neuter',
        OpenGoal -> 'Öppet mål',
        ClosedGoal -> 'Stängt mål',
        UndiscoveredGoal -> 'Oupptäckt mål',
        null -> 'null',
        oneToOne -> 'en till en',
        oneToMany -> 'en till många',
        manyToOne -> 'många till en',
        manyToMany -> 'många till många',
        normalRelation -> 'normal relation',
        reverseRelation -> 'omvänd relation'
    ]
    
    reverseEnumTab =
    [
        'tvivelaktig' -> dubious,
        'sannolik' -> likely,
        'osannolik' -> unlikely,
        'osann' -> untrue
    ]
    
     
    getEnum(arg)
    {
        switch(dataType(arg))
        {
        case 8:
            return reverseEnumTab[arg];
        case 15:
            return enumTab[arg];
        default:
            return nil;
        }
    }
;

enum normalRelation, reverseRelation;
 






 




amorousStance: Stance     name = 'amorous'     score = 50;
lovingStance: Stance     name = 'loving'     score = 40;
warmStance: Stance     name = 'warm'     score = 30;
friendlyStance: Stance     name = 'friendly'     score = 20;
lukewarmStance: Stance     name = 'lukewarm'     score = 10;
neutralStance: Stance     name = 'neutral'     score = 0;
coolStance: Stance     name = 'cool'     score = -10;
unfriendlyStance: Stance     name = 'unfriendly'     score = -20;
hostileStance: Stance     name = 'hostile'     score = -30;
rancorousStance: Stance     name = 'rancorous'     score = -40;
loathingStance: Stance     name = 'loathing'     score = -50;

 




neutralMood: Mood     name = 'neutral';
calmMood: Mood     name = 'calm';
happyMood: Mood     name = 'happy';
euphoricMood: Mood     name = 'euphoric';
contentedMood: Mood     name = 'contented';
sadMood: Mood     name = 'sad';
depressedMood: Mood     name = 'depressed';
angryMood: Mood     name = 'angry';
furiousMood: Mood     name = 'furious';
afraidMood: Mood     name = 'afraid';
terrifiedMood: Mood     name = 'terrified';
confidentMood: Mood     name = 'confident';
boldMood: Mood     name = 'bold';
lonelyMood: Mood     name = 'lonely';
boredMood: Mood     name = 'bored';
excitedMood: Mood     name = 'excited';

 

modify libGlobal
    defaultStance = neutralStance
    defaultMood = neutralMood
;

modify MessageCtx
     
    pronounProps = [&heName, &himName, &herName, &hersName, &reflexiveName  ]
    
     

    pronounUsed = pronounProps.indexOf(sourceProp)
    
    
     

    subjEffectivelyPlural = subj.plural || (pronounUsed && subj.pronoun.plural)
;










 


function pronounParams(person, plural, isNeuter, isGenderNeutral, isHim, isHer, isIt) {
    switch(person)
    {
    case 1:
        return (plural ? Us : Me);
    case 2:
        return (plural ? Yall : You);
    default:
        return ((plural || isGenderNeutral)
        ? Them :
            isHim ? Him : isHer ? Her : isNeuter ? ItNeuter : It);
    }
}











function splitWithDelimiterPattern(str, pat) {
    local pairs = new Vector();
    local idx = 1; 

    
    while(idx <= str.length) {

      local result = rexMatch(pat, str, idx);
      if(result == nil) {
        
        
        pairs += [[str.substr(idx, str.length), nil]];
        break;
      } 

      
      local word = rexGroup(1)[3];
      local delimiter = rexGroup(2)[3];
      pairs += [[word, delimiter]];

      
      idx = rexGroup(2)[1] + 1; 
    }
    return pairs;
};



function shortenRepeatingCharacters(word) {
    local match = rexMatch(LMentionable.tripleLetterPat, word);
    if(match) {
        local groupOfRepeats = rexGroup(1);
        if(groupOfRepeats.length > 2) {
            
            local startPos = groupOfRepeats[1];
            local similarCount = groupOfRepeats[2];
            local lengthToRemove = similarCount - 2;
            local pruned =  word.splice(startPos, lengthToRemove, '');
            
            return pruned;
        }
    }
    return word;
}




class WordPart: object {
    word = nil
    ending = nil
    jointS = nil
    useIndividually = nil
    
    
    altEnding = nil
    construct(word, ending, jointS, useIndividually, altEnding = nil) {
        self.word = word;
        self.ending = ending;
        self.jointS = jointS;
        self.useIndividually = useIndividually;
        self.altEnding = altEnding;
    }
}


























function createCompoundWordVariations(obj, cur, partOfSpeech, matchFlags, enableShortenRepeatingCharacters = true) {
    
    
    
    
    
    
    local wordParts = new Vector();

    
    
    local wordVariations = new Vector(); 

    
    
    local parts = splitWithDelimiterPattern(cur, LMentionable.wordPartDelPat);



    
    
    local ending = parts[parts.length][1]; 

    
    
    
    

    
    local isNounOrPluralEndingUter = ((matchFlags & 0x0004) != 0 || (matchFlags & 0x0008) != 0 )
                                  && (ending.endsWith('n') || ending.endsWith('na'));

    
    
    
    local isAdjectiveEndingUter = (matchFlags & 0x0002) != 0 
                               && (ending.endsWith('e') || ending.endsWith('a'));

    
    
    
    local isEndingNeuter = !isNounOrPluralEndingUter && !isAdjectiveEndingUter;

    
    
    

    
    
    for(local i = 1; i<=parts.length-1; i++) {
        local part = parts[i][1];
        
        
        local match = rexMatch('([^<:^>]+)(:<alpha>*)?(<caret>s)?', part);
        if(match == nil) {
            
            tadsSay('\n<font color=red>VARNING: Notationsmismatch av "<<cur>>"\n.Använd enligt följande mall: äpple+n, äppel+kaka+n,papper+et eller papper^s+flyg+plan+et</font>\n');
            continue;
        }
        local word = rexGroup(1)[3];        
        
        
        
        local useIndividually =  parts[i][2] != '|';

        local jointS = rexGroup(3) != nil;  
        local genderMod = rexGroup(2);      
        local genderModContent = genderMod ? rexGroup(2)[3] : nil; 

        
        
        
        
        
        
        
        
        
        
        
        if(i == parts.length-1) {
            local altEnding = nil;
            if(genderMod && genderModContent && !jointS) {
                local suffix = genderModContent.findReplace(':', '', 0x0001);
                if(suffix.length() > 0)
                    altEnding = suffix;
            }
            wordParts.append(new WordPart(word, ending, nil, useIndividually, altEnding));
            break;
        } 

        
        
        
        
        
        local partEnding = ending;  

        if(genderMod) {
            if(genderModContent) {
                
                
                
                genderModContent = genderModContent.findReplace('^s', '', 0x0001);
                genderModContent = genderModContent.findReplace(':', '', 0x0001);
                partEnding = genderModContent;
            } else {
                
                
                local endsWithVocal = rexMatch('.*[aeioyu]$', word);

                
                
                if(isEndingNeuter) {
                    
                    
                    partEnding = endsWithVocal? 't' : 'et'; 
                
                } else {
                    if(endsWithVocal) {
                        partEnding = 'n'; 
                    } else {
                        
                        
                        
                        
                        partEnding = rexMatch('.*(el|er|or|al)$', word) ? 'n' : 'en';
                        
                    }
                }
            }
        } else {
            local endsWithVocal = rexMatch('.*[aeioyu]$', word);
            
            
            if((matchFlags & 0x0008) != 0) {
                
                
                
            } else if(isEndingNeuter) {
                partEnding = endsWithVocal? 't' : 'et';   
            } else {
                if(endsWithVocal) {
                    partEnding = 'n';                     
                } else {
                    
                    partEnding = rexMatch('.*(el|er|or|al)$', word) ? 'n' : 'en';
                    
                }
            }
        }
        wordParts.append(new WordPart(word,partEnding,jointS, useIndividually));
    }
    local wordPartsList = wordParts.toList();
    local nParts = wordPartsList.length;

    
    
    local longestCompoundWord = wordPartsList
        .mapAll({x: '<<x.word>><<x.jointS?'s':''>>'})
        .join('');
    if(wordPartsList[nParts].jointS)
        longestCompoundWord = longestCompoundWord.substr(1, -1);

    
    
    
    for(local start = 1; start <= nParts; start++) {
        for(local len = 1; start + len - 1 <= nParts; len++) {
            local sub = wordPartsList.sublist(start, len);
            local lastPart = sub[sub.length];

            local compound = sub.mapAll({x: '<<x.word>><<x.jointS?'s':''>>'}).join('');
            if(lastPart.jointS) compound = compound.substr(1, -1);

            if(lastPart.useIndividually) {
                
                
                wordVariations.append(lastPart.altEnding != nil
                    ? compound + lastPart.altEnding
                    : compound);
                wordVariations.append(compound + lastPart.ending);
            }
        }
    }

    
    
    local lastWordPart = wordPartsList[nParts];
    local wordWithoutEnding = lastWordPart.altEnding != nil
        ? longestCompoundWord + lastWordPart.altEnding
        : longestCompoundWord;
    local wordWithEnding = longestCompoundWord + ending;

    if(enableShortenRepeatingCharacters) {
        wordVariations = wordVariations.mapAll(shortenRepeatingCharacters);
        wordWithoutEnding = shortenRepeatingCharacters(wordWithoutEnding);
        wordWithEnding = shortenRepeatingCharacters(wordWithEnding);
    }

    
    
    wordVariations = wordVariations.getUnique();
    
    wordVariations.forEach(function(wordVariation) {
        
        obj.addDictWord(wordVariation, partOfSpeech, matchFlags);
        
         




    });

    
    
    return object {
        standardForm = wordWithoutEnding
        definiteForm = wordWithEnding
    };
}

modify Actor
    sayActorArriving(fromLoc)
    {
        local traveler = self;
        ((libGlobal.curAction).setMessageParams('traveler', traveler));
        
         
        local dir = getOutermostRoom.getDirectionTo(fromLoc);      
        
         
        if(dir)
            "{Ref subj traveler} anländ{er/e} <<dir.arrivalName>>. ";
        
         
        else            
            "{Ref subj traveler} anländ{er/e} till området. ";
    }
;








Vocab:IAction     baseActionClass = Vocab
    execAction(cmd) {
        displayVocab();
    }
;

function displayVocab() {
    local objList = [];
    local stringList = [];
    local propList = [];
            
    local nounList = [];
    local adjectiveList = [];
    local pluralList = [];
    local adjApostSList = [];
    local litAdjList = [];

    cmdDict.forEachWord({ x,y,z: objList += x});
    cmdDict.forEachWord({ x,y,z: stringList += y});
    cmdDict.forEachWord({ x,y,z: propList += z});
    
    local len = objList.length();
    for (local i = 1; i < len; i++) {
        local obj = propList[i];
        switch(obj) {
            case &noun:               nounList += stringList[i]; break;
            case &adjective:          adjectiveList += stringList[i]; break;
            case &plural:             pluralList += stringList[i]; break;
            case &adjApostS:          adjApostSList += stringList[i]; break;
            case &literalAdjective:   litAdjList += stringList[i]; break;
        }
    }
    "<.p>[NOUNS]<.p>";              foreach (local cur in nounList)         "\^<<cur>> ";
    "<.p>[ADJECTIVES]<.p>";         foreach (local cur in adjectiveList)    "\^<<cur>> ";
    "<.p>[PLURALS]<.p>";            foreach (local cur in pluralList)       "\^<<cur>> ";
    "<.p>[ADJAPOSTS]<.p>";          foreach (local cur in adjApostSList)    "\^<<cur>> ";    
    "<.p>[LITERALADJECTIVE]<.p>";   foreach (local cur in litAdjList)       "\^<<cur>> ";
}

Vokabular:LiteralAction     baseActionClass = Vokabular;

grammar predicate(Vokabular):
    'vokab' | 'voc' | 'vocab' | 'vokabulär' | 'vokabulär'
    : VerbProduction
    action = Vocab 
    verbPhrase = 'se/ser vokabulär'
; 

Ord:TAction     baseActionClass = Ord     verDobjProp = &verifyDobjOrd     remapDobjProp = &remapDobjOrd     preCondDobjProp = &preCondDobjOrd     checkDobjProp = &checkDobjOrd     actionDobjProp  = &actionDobjOrd     reportDobjProp = &reportDobjOrd
    execAction(cmd) {
        
        
        local str = new Vector();
        for(local vw in cmd.dobj.vocabWords) {
            str.append(' * <<vw.wordStr>> <<vw.posFlags>>\n'); 
        }
        str.sort();
        local explain =  'Hittade objektet: [<<obj>>],  \bFöljande ord finns definierade: \b'

;
        say(toString(explain + str.join('')));
    }
    afterAction() { }
    turnSequence() { }
;

grammar predicate(Ord):
    ('ord'|'ordgranska') singleNoun->dobjMatch
    : VerbProduction
    action = Ord  
    verbPhrase = 'ordgranska/ordgranskar (vad)'
    missingQ = 'vad vill du ordgranska'
; 

function displayGrammarInfo(o) {
    say('Needs to be adapted to adv3Lite');
     




















}

function displayWordPartOnly(wordPart) {
    if(wordPart == &noun) {
        tadsSay(' &noun ');
    }
    if(wordPart == &plural) {
        tadsSay(' &plural ');
    }
    if(wordPart == &adjective) {
        tadsSay(' &noun ');
    }
    if(wordPart == &literalAdjective) {
        tadsSay(' &literalAdjective ');
    }
    if(wordPart == &adjApostS) {
        tadsSay(' &adjApostS ');
    }
}

function displayWordPart(wordPart, cur, obj) {
    if(wordPart == &noun) {
        tadsSay('\ <<cur>> (substantiv)');
    }
    if(wordPart == &plural) {
        tadsSay('\ <<cur>> (plural)');
    }
    if(wordPart == &adjective) {
        tadsSay('\ <<cur>> (adjektiv)');
    }
    if(wordPart == &literalAdjective) {
        tadsSay('\ <<cur>> (literalAdjective)');
    }
    if(wordPart == &adjApostS) {
        tadsSay('\ <<cur>> (adjApostS)');
    }
    tadsSay('\t\t\t\t\t\t -> \ [<<obj.name>>]\n');
}




modify Test
    run()
    {
        "====================================\n";
        "Test: \"<<testName>>\"\n";

        if(restartBeforeTest) {
            local hld = allNewTests.savedState();
            if(allNewTests.restoregame(&restartSaveFile) == nil) {
                allNewTests.isTesting = nil;    
                return;
            }
            allNewTests.restoreState(hld);
        }

         
        if(restoreStartStateAfterTest)
            allNewTests.savegame(&revertSaveFile); 

         



        if (location && (libGlobal.playerChar).location != location)
        {
            (libGlobal.playerChar).moveInto(location);	
            
             
            if(reportMove)
                (libGlobal.playerChar).getOutermostRoom.lookAroundWithin();
        }
        
         
        getHolding();

         
        local txt;
        local temp = new TemporaryFile();
        local f = File.openTextFile(temp, 0x0002, 'utf-8'); 

        local testVec = new Vector(testList);

         
        local linecnt = 0;
        testVec.forEach(new function(x)  {
            local c = x.trim();
            f.writeFile('><<c>>\n');
            ++linecnt;
        });
        f.closeFile();
        allNewTests.isTesting = true;
        setScriptFile(temp,2);
        do
        {
             
            if(defined(scoreNotifier) && scoreNotifier.checkNotification())
                ;
            
             
            if(defined(eventManager) && eventManager.executePrompt())
                ;
        
            try
            {
                 
                "<.p>";
                
                 
                "<.inputline>";
                
                
                ">";

                txt = inputManager.getInputLine();
                "<./inputline>\n";   
                
                if(clearAssertBufferBeforeCmd && !txt.startsWith('assert'))
                    allNewTests.lastMsg = '';
                
                
                 
                txt = StringPreParser.runAll(txt, Parser.rmcType());
                
                 


        
                if(txt == nil)
                    continue;
                
                 
                Parser.parse(txt);
            }
            catch(TerminateCommandException tce)
            {
                
            }
            
             
            statusLine.showStatusLine();
 
        } while (--linecnt > 0 && allNewTests.isTesting);

        if(restoreStartStateAfterTest) {

            local hld = allNewTests.savedState();
            allNewTests.restoregame(&revertSaveFile); 
            allNewTests.restoreState(hld);
        }
        
        if(!allNewTests.isTesting)
            setScriptFile(nil);
        temp.deleteFile();        
    }
;





