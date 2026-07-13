


property subLocation;
property lookAroundShowExits;
property stanceToward;
property setStanceToward;
property destinationName;

 










class Mentionable: LMentionable
     








    vocab = nil

     






    name = nil

     

















    roomTitle = nil

     













    disambigName = (name)

     










    disambigGroup = 0

     














    disambigOrder = (listOrder)

     

















    proper = nil

     






    qualified = (proper)

     

















    person = 3

     















































    isIt = (!(isHim || isHer || isGenderNeutral))
    isHim = nil
    isHer = nil

     














    plural = nil
    
     




    ambiguouslyPlural = nil

     
















    massNoun = nil
    
     













    nominalContents = nil

     






    distinguishByContents = nil

     






































    matchName(tokens)
    {        
        return matchNameCommon(tokens, matchPhrases, matchPhrasesExclude);      
    }
    
     





    
    matchNameCommon(tokens, phrases, excludes)
    {
         




        if(isHidden && (libGlobal.curCommand).action.unhides not in (true, (libGlobal.curCommand).potentialRole))
            return 0;
        
         



        
        local phraseMatch = 0;
        
         



        if(phrases != nil)
        {    
                        
            phraseMatch = phraseMatchName(phrases, tokens);
            
             






            if(phraseMatch is in (0, nil) && excludes)    
                return 0;
            
             




            if(dataType(phraseMatch) != 7)
                phraseMatch = 0;
        }
        
         



        local simpleMatch = simpleMatchName(tokens);
        
         



        if(simpleMatch == 0)
            return 0;
        
        
         



        return phraseMatch | simpleMatch;
    }
    
    

     
























    matchNameDisambig(tokens)
    {
        
         




        
        return matchNameCommon(tokens, disambigMatchPhrases, true);
           
    }
   
     






    simpleMatchName(tokens)
    {
         
        if (tokens.length() == 0)
            return 0;
        
         
        local strength = 0x2000 | 0x1000;

         
        local partOfSpeech = 0;

         
        local vw = vocabWords, cmp = Mentionable.dictComp;

         




        if (distinguishByContents)
        {
            vw += nominalContents != nil
                ? nominalContents.vocabWords : emptyVocabWords;
        }

         
        local stateCnt = states.length();

         
        for (local i = 1, local len = tokens.length() ; i <= len ; ++i)
        {
             
            local tok = tokens[i];

             
            local match = matchToken(tok, vw, cmp);

             



            if (match == 0)
            {
                 
                for (local j = 1 ; j <= stateCnt ; ++j)
                {
                     
                    local state = states[j];
                    if ((match = state.matchName(
                        tok, self.(state.stateProp), cmp)) != 0)
                        break;
                }
            }

             



            if (match == 0)
                return 0;

             






            strength = min(strength, match & 0xF000);
            partOfSpeech |= match;
        }

         









        partOfSpeech &= 0x0FFF & ~0x0001;

         




        if (partOfSpeech == 0)
            return 0;

         
        return strength | partOfSpeech;
    }

    
     




    phraseMatchName(phrases, tokens)
    {
         
        local ok = true;
        
         
        local tokLen = tokens.length;
        
         
        local cmp = Mentionable.dictComp;
        
         



        foreach(local pm in valToList(phrases))
        {
             
            local pmList = pm.split(' ');
            
             




            if(pmList.overlapsWith(tokens))
            {
                 


                
                local pmLength = pmList.length();
                for(local i in 1 .. tokLen - pmLength + 1)
                {
                     



                    if(tokens.sublist(i, pmLength).strComp(pmList, cmp))
                    {
                        return pmLength > 1 ? 0x0010 : 0x0002;                            
                    }                                            
                }
                 




                ok = 0;
            }           
        }
        
         
        return ok;
    }
    
    
    
     








    matchPhrases = nil
    
    
     






    disambigMatchPhrases = matchPhrases
        
    
     




    matchPhrasesExclude = true
   
     
    
     



    construct()
    {
         
        initVocab();

         
        foreach (local s in State.all)
        {
            if (s.appliesTo(self))
                states += s;
        }
    }

     




    vocabWords = []

     
    states = []
    
     














    filterResolveList(np, cmd, mode) { }
    
     



    originalVocab = nil
    
     



    altVocab = nil
    
     











    useAltVocabWhen = nil
    
     






    finalizeVocabWhen = nil
    
     
    initAltVocab()    
    {
         



        libGlobal.altVocabLst += self;
        
         
        originalVocab = vocab;
    }
    
     







    updateVocab()
    {                
        if(altVocab)
        {          
             
            local uavw = useAltVocabWhen; 
            
             



            if(uavw == nil && vocab != originalVocab)
                replaceVocab(originalVocab);
            
             



            if(dataType(altVocab) == 10)
            {
                 




                if((uavw != nil && uavw < 1) || finalizeVocabWhen)
                {
                    libGlobal.altVocabLst -= self;
                    
                    uavw = -uavw;
                }
                 





                if(uavw != uavwNum && (uavw == nil || uavw <= altVocab.length))
                {
                    uavwNum = uavw;
                    
                    local newVocab = (uavw && uavw > 0) ? altVocab[uavw] : originalVocab;
                    
                    replaceVocab(newVocab);
                }
            }
            else
            {
                 



                if(uavw && vocab != altVocab)
                    replaceVocab(altVocab);            
                
                 




                if(uavw == -1 || finalizeVocabWhen)
                    libGlobal.altVocabLst -= self;
            }
        }
    }
    
     
    uavwNum = nil
    
     







    actionReport(msg, msg2?)
    {
        if((libGlobal.curAction).isImplicit)
            (libGlobal.curCommand).postImplicitReports += msg2 ?? msg;
        else
            say(msg);
    }
    
    
     



    
    
    
     






    isCommonTopic = nil
;

 
 







matchToken(tok, words, cmp)
{
     
    local strength = 0, partOfSpeech = 0;

     
    for (local len = words.length(), local i = 1 ; i <= len ; ++i)
    {
         
        local entry = words[i];

         
        local match = cmp.matchValues(tok, entry.wordStr);

         
        if (match == 0)
            continue;

         




        local result =
            (match & 0x0004 ? 0 : 0x2000)
            | (match & ~0xFF ? 0 : 0x1000);

         







        if (entry.strengthFlags & ~result)
            continue;

         
















        if (result > strength)
        {
             
            strength = result;
            partOfSpeech = entry.posFlags;
        }
        else if (result == strength)
        {
             
            partOfSpeech |= entry.posFlags;
        }
    }

     
    return strength | partOfSpeech;
}


 
 



class VocabWord: object
    construct(w, f)
    {
         
        wordStr = w;

         
        posFlags = f & 0x0FFF;
        strengthFlags = f & 0xF000;
    }

     
    wordStr = nil

     
    posFlags = 0

     
    strengthFlags = 0
;


 
 



















class State: LState
     







    stateProp = nil

     




    appliesTo(obj) { return obj.propDefined(stateProp); }

     











    matchName(tok, state, cmp)
    {
         
        local v = getVocab(state);
        if (v == nil)
            return 0;

         
        return matchToken(tok, v, cmp);
    }

     




    getVocab(state)
    {
         
        return vocabTab[state];
    }

     
    vocabTab = nil

     

















    adjectives = []

     










    vocabWords = []

     
    all = []

     
    construct()
    {
         
        local tab = vocabTab = new LookupTable(8, 16);

         
        inherited();

         
        foreach (local a in adjectives)
        {
             
            local st = a[1];
            if (tab[st] == nil)
                tab[st] = [];

             
            foreach (local adj in a[2])
            {
                initWord(adj);
                tab[st] += new VocabWord(adj, 0x0002);
            }
        }

         
        foreach (local w in vocabWords)
        {
             



            local st = w[1];
            if (tab[st] == nil)
                tab[st] = [];

             
            initWord(w[2]);
            tab[st] += new VocabWord(w[2], w[3]);
        }
    }

     
    classInit()
    {
         
        forEachInstance(State, { s: State.all += s });
    }
;

 



class ReplaceRedirector: Redirector
    
     







    
    redirect(cmd, altAction, dobj:?, iobj:?, aobj:?, isReplacement: = true)
    {
        if(iobj != nil && dobj != nil && aobj != nil)
            execNestedAction(isReplacement, (libGlobal.curActor), altAction, dobj, iobj, aobj); 
        else if(iobj != nil && dobj != nil)    
            execNestedAction(isReplacement, (libGlobal.curActor), altAction, dobj, iobj);
        else if(dobj != nil)
            execNestedAction(isReplacement, (libGlobal.curActor), altAction, dobj);
        else
            execNestedAction(isReplacement, (libGlobal.curActor), altAction);
    }
;

 




class Thing:  ReplaceRedirector, Mentionable
   
    
     




    
     



    roomHeadline(pov)
    {
         



        say(isIlluminated ? roomTitle : darkName);

         
        if (pov.location not in (self, nil))
            pov.location.roomSubhead(pov);
    }
    
     





    recognizableInDark = nil
    
     
    roomTitle = name
    
     
    darkName =  buildMessage('dark name', nil)
    
     
    darkDesc() 
    { 

        message('dark desc', nil)
; 
    }
    
     










    
    interiorDesc = (desc)

     



    isIlluminated()
    {
         


        
        if(isLit)
            return true;
            
         


        
        return isThereALightSourceIn(contents);
    }
    
     




    isThereALightSourceIn(lst)
    {
        foreach(local obj in lst)
        {
             
            if(obj.isLit)
                return true;
            
             




            if(obj.contents.length > 0 
               && (obj.isOpen || obj.contType != In || obj.isTransparent)
               && isThereALightSourceIn(obj.contents))
                return true;                      
            
        }
        
                 
        return nil;
    }
    
     





    roomContentsLister = lookLister
    
     




    roomSubContentsLister = lookContentsLister
    
     





    useInteriorDesc = nil
    
     





    lookAroundWithin()
    {
          
        unmention(contents);
        
                 
        unmentionRemoteContents();
        
         
        "<.roomname><<roomHeadline((libGlobal.playerChar))>><./roomname>\n";
        
        if(((libGlobal.curAction) != nil      && ((libGlobal.curAction).ofKind(GoTo)||(libGlobal.curAction).ofKind(Continue))) && !gameMain.verbose)
            return;

    
        
         
        local descObj = self;
        
         
        local loc = (libGlobal.curActor).location;        
        
         



        while(loc && loc != self)
        {
            if(loc.useInteriorDesc)
            {
                descObj = loc;
                break;
            }
            
            loc = loc.location;
        }
        
        
         
        if(isIlluminated)
        {
             
            if(gameMain.verbose || !visited || ((libGlobal.curAction) != nil && (libGlobal.curAction).ofKind(Look)))
                "<.roomdesc><<descObj.interiorDesc>><./roomdesc><.p>";
            
             
            "<.roomcontents>";
            listContents();
            "<./roomcontents>";
            
             
            setSeen();
            visited = true;
            examined = true;
        }
        
         



        else
        {
             
            "<.roomdesc><<darkDesc>><./roomdesc>";
            
             






            if(recognizableInDark)
            {
                visited = true;
                setKnown();
            }
        
        }
        "<.p>";
        
                 
        if((libGlobal.exitListerObj) != nil)
            (libGlobal.exitListerObj).lookAroundShowExits((libGlobal.curActor), self, isIlluminated);
    }
    
     
    listContents(lister = &roomContentsLister)
    {    
        
         
        if(!canSeeIn() && !(libGlobal.curActor).isIn(self))
            return;
        
         



        local firstSpecialList = [];
        
         
        local miscContentsList = [];
        
         



        local secondSpecialList = [];
          
         



        
        local loc = (libGlobal.curActor).location;                
        
         




        if(loc != self && lister == &roomContentsLister)
        {
             





            if((libGlobal.curAction) == nil)
                (libGlobal.curAction) = Look.createInstance();
            
             
            ((libGlobal.curAction).setMessageParams('loc', loc));
            
             



            if(loc.pcListedInLook)
            {
                             
                message('list immediate container', nil);
                
                 
                loc.mentioned = true;
                
                 



                if(loc.ofKind(SubComponent) && loc.location != nil)
                    loc.location.mentioned = true;
            }
            
             



            if(!loc.isHidden && loc.contentsListedInLook)            
                listSubcontentsOf([loc]);
        }
        
         
        foreach(local obj in contents)
        {            
             
            if(obj.isHidden)
                continue;
            
             



            if((obj.propType(&initSpecialDesc) != 1 &&
               obj.useInitSpecialDesc()) ||
               (obj.propType(&specialDesc) != 1 && obj.useSpecialDesc()))
            {
                 




                if(obj.specialDescBeforeContents)
                    firstSpecialList += obj;
                
                 
                else
                    secondSpecialList += obj;
            }
             



            else if(obj.lookListed)
                miscContentsList += obj;
                      
             
            obj.noteSeen();
        }
        
         
        firstSpecialList = firstSpecialList.sort(nil, {a, b: a.specialDescOrder -
                                                 b.specialDescOrder});
                 
         
        secondSpecialList = secondSpecialList.sort(nil, {a, b: a.specialDescOrder -
                                                 b.specialDescOrder});

         



        foreach(local obj in firstSpecialList)        
            obj.showSpecialDesc();                
        
         



        
        if(lister == &roomContentsLister)
            showFirstConnectedSpecials((libGlobal.playerChar));
        
         



        miscContentsList = miscContentsList.subset({o: o.mentioned == nil});
                
         



        self.(lister).show(miscContentsList, self);
               
         
        listSubcontentsOf(contents, &roomSubContentsLister);
        
          





            if(!paraBrksBtwnSubcontents)
                "<.p>";
        
         



        if(lister == &roomContentsLister)        
            showConnectedMiscContents((libGlobal.playerChar));
                
         



        secondSpecialList = secondSpecialList.subset({o: o.mentioned == nil});
        
        foreach(local obj in secondSpecialList)
            obj.showSpecialDesc();
        
        
         



       if(lister == &roomContentsLister)
           showSecondConnectedSpecials((libGlobal.playerChar));
    }
    
     




    listSubcontentsOf(contList, lister = &examineLister)
    {
       
         



        contList = valToList(contList);
        
         



        
         
        local lst = [];
        
         



        foreach(local cur in contList)
        {
            foreach(local prop in remapProps)
            {
                local obj = cur.(prop);
                if(obj != nil)
                    lst += obj;
            }
        }
        
         



        contList = contList.appendUnique(lst);
        
         
        contList = contList.subset({o: (libGlobal.curActor).canSee(o)});
        
        
 
         






        contList = contList.sort(nil, {a, b: a.listOrder - b.listOrder});
                     
        
        foreach(local obj in contList)
        {
             


            
            if(obj.contType == Carrier && markInventoryAsSeen)
                obj.allContents.subset({o: (libGlobal.playerChar).canSee(o) }).forEach( {o:
                    o.noteSeen() });           
            
             





            if(obj.contType == Carrier 
               || obj.(obj.(lister).contentsListedProp) == nil
               || (!(libGlobal.curActor).isIn(obj) && obj.canSeeIn() == nil)
               || obj.contents.length == 0)
                continue;
            
                      
             


 
            local objList = obj.contents.subset({x: x.mentioned == nil 
                                                && x.isHidden == nil
                                                && x != (libGlobal.playerChar)});
            
            
             



            local firstSpecialList = objList.subset(
                {o: (o.propType(&specialDesc) != 1 && o.useSpecialDesc())
                || (o.propType(&initSpecialDesc) != 1 &&
                    o.useInitSpecialDesc() )
                }
                );
            
            
             



            objList = objList - firstSpecialList;
            
            
             



            local secondSpecialList = firstSpecialList.subset(
                { o: o.specialDescBeforeContents == nil });
            
            
             





            firstSpecialList = firstSpecialList - secondSpecialList;
            
             



            firstSpecialList = firstSpecialList.sort(nil, {a, b: a.specialDescOrder -
                b.specialDescOrder});
            
             



            secondSpecialList = secondSpecialList.sort(nil, {a, b: a.specialDescOrder -
                b.specialDescOrder});
            
            
             



            firstSpecialList = firstSpecialList.subset({o: o.mentioned == nil});
            foreach(local cur in firstSpecialList)                    
                cur.showSpecialDesc(); 
            
            
            objList = objList.subset({o: o.mentioned == nil});
             
            if(objList.length > 0)   
            {
                obj.(lister).show(objList, obj, paraBrksBtwnSubcontents);                      
                objList.forEach({o: o.mentioned = true });
            }
            
             



            if(!paraBrksBtwnSubcontents && secondSpecialList.indexWhich({o:o.isListed}))
                " ";
            
            
             



            secondSpecialList = secondSpecialList.subset({o: o.mentioned == nil});
            foreach(local cur in secondSpecialList)        
                cur.showSpecialDesc(); 
            
            
             





            local lstr = obj.(lister);
            
            if(obj.contents.length > 0 && lstr.listRecursively)

                listSubcontentsOf(obj.contents, lister);                     
            
        }         
    }
    
     





     
    remoteObjInName(pov) { return objInName; }
    
     




    paraBrksBtwnSubcontents = (gameMain.paraBrksBtwnSubcontents)
    
     




    unmention(lst)
    {
        foreach(local obj in lst)
        {
            obj.mentioned = nil;
            
             



            if(obj.contents.length > 0 && !obj.ofKind(Floor))
                unmention(obj.contents);
        }
    }
    
     



    
    unmentionRemoteContents() {}
    showFirstConnectedSpecials(pov) {}
    showConnectedMiscContents(pov) {}
    showSecondConnectedSpecials(pov) {}
    
     











    statusName(actor)
    {
         




        if (location != nil && Q.canSee(actor, location))
            location.statusName(actor);
        else
        {
            roomHeadline(actor);
        }
    }
    
     






    getStatuslineExitsHeight()
    {
        if ((libGlobal.exitListerObj) != nil)
            return (libGlobal.exitListerObj).getStatuslineExitsHeight();
        else
            return 0;
    }
    
     
    showStatuslineExits()
    {
        location.showStatuslineExits();
    }
    
     



    wouldBeLitFor(actor)   
    {
        return getOutermostRoom.isIlluminated;
    }
    

     



    
     





    desc = ""     
    
     




    stateDesc = ''
    
     



    examineStatus()
    {        
         
        display(&stateDesc);
        
         



        if(contType != Carrier && areContentsListedInExamine)
        {          
             



            unmention(contents);
            
             
            listSubcontentsOf(self, &examineLister);            
        }                   
    }
    
         
    examineLister = descContentsLister
    
       
     




    mentioned = nil
    
     



    areContentsListedInExamine = contentsListedInExamine
    
     



    openStatusReportable = (isOpenable && isOpen)
            
     




    
    specialDesc = nil
    
     






 
    useSpecialDesc = true
    
    
     
    initSpecialDesc = nil
    
    
     



    useInitSpecialDesc = (!moved)
    
     





    specialDescOrder = 100
    
     





    
    specialDescBeforeContents = (location && location.ofKind(Room))
    
     
    specialDescListWith = nil
    
    
     
    showSpecialDesc()
    {
         



        if(mentioned)
            return;
        
        
        
         



        if(propType(&initSpecialDesc) != 1 && useInitSpecialDesc)
        {
            initSpecialDesc;
            
            mentioned = true;
        }       
        else if(propType(&specialDesc) != 1)
        {        
            specialDesc;
            
            mentioned = true;
        }
           
         
        if(mentioned)
            "<.p>";
        
         
        noteSeen();
    }
    
    
    
     



    
    isFixed = (isDecoration)
    
     




    
     



    isListed = (!isFixed)
    
     


    lookListed = (isListed)
    
     
    inventoryListed = (isListed)
    
         
    examineListed = (isListed)
    
     


    searchListed = (isListed)
    
     



    contentsListed = true
    
     



    contentsListedInLook = (contentsListed)
    
     


    
    contentsSublisted = contentsListed
    
     




    pcListedInLook = (contentsListedInLook)
    
     



    contentsListedInExamine = (contentsListed)
    
     




    contentsListedInSearch = true
    
     




    
    markInventoryAsSeen = true
    
     



    
    readDesc = nil
    
     
    smellDesc = nil
    
     



    isProminentSmell = true
    
     
    feelDesc = nil
    
     





    
     
    listenDesc = nil
    
     



    isProminentNoise = true
    
     
    tasteDesc = nil
      
     
    listableContents = (contents.subset({x: x.lookListed}))
    
     
    listableContentsOf(cont)
    {
        local lst = [];
        foreach(local obj in cont.contents)
        {
            if(obj.isListed)
                lst += obj;
        }
        return lst;    
    }
    
     





    globalParamName = nil
    
   
     


    
    isLit = nil
    
     
    makeLit(stat) { isLit = stat; }
    
     



    visibleInDark = nil
    
     





    inDarkDesc = nil
    
     





    isLightable = nil
    
     




    objInPrep = (contType.prep)
    
     




    objIntoPrep = (contType.intoPrep)
    
     



    bulk = 0
    
     



    bulkCapacity = 10000
    
     





    maxSingleBulk = (bulkCapacity)
    
    
     




    maxItemsCarried = 100000
    
     
    getBulkWithin()
    {
        local totalBulk = 0;
        foreach(local cur in contents)
            totalBulk += cur.bulk;
        
        return totalBulk;
    }
    
     



    getCarriedBulk()
    {
        local totalBulk = 0;
        foreach(local cur in directlyHeld)
        {           
            totalBulk += cur.bulk;
        }
        
        return totalBulk;
    }
    
     




    length = nil
    
     





    maxLength = length
    
     
    fitsLength(cont)
    {
         



        if(length == nil || cont.maxLength == nil)
            return true;
        
         



        return length <= cont.maxLength;
    }    
    
     





    checkInsert(obj)
    {
         
        ((libGlobal.curAction).setMessageParams('obj', obj));
        
         




        if(obj.bulk > maxSingleBulk || obj.bulk > bulkCapacity || !obj.fitsLength(self))
            message('too big', nil,objInPrep, theName)
;
            
         




        else if(obj.bulk > bulkCapacity - getBulkWithin())
            message('no room', nil,objInPrep, theName)
;            
    }
    
    
     
    remapProps = [&remapOn, &remapIn, &remapUnder, &remapBehind]
    
    
     





    remapIn = nil
    
     



    remapOn = nil
    
     




    remapUnder = nil
    
     




    remapBehind = nil
    
    
     




    
    notionalContents()
    {
        local nc = [];
        
        if(isTransparent || !enclosing)
            nc = contents;
        if(remapIn != nil && (remapIn.isTransparent || !remapIn.enclosing))
            nc = nc + remapIn.contents;
        if(remapOn != nil)
            nc = nc + remapOn.contents;
        if(remapUnder != nil)
            nc = nc + remapUnder.contents;
        if(remapBehind != nil)
            nc = nc + remapBehind.contents;
        
        return nc;
    }
    
     







    
    hiddenUnder = []
    
     







   
    hiddenBehind = []
    
     




   
    hiddenIn = []
    
    
     





    
    maxBulkHiddenUnder = 100
    maxBulkHiddenBehind = 100
    maxBulkHiddenIn = 100
    
         
    getBulkHiddenUnder = (totalBulkIn(hiddenUnder))
    getBulkHiddenIn = (totalBulkIn(hiddenIn))
    getBulkHiddenBehind = (totalBulkIn(hiddenBehind))
    
     
    totalBulkIn(lst)
    {
        local totBulk = 0;
        for(local item in valToList(lst))
            totBulk += item.bulk;
        
        return totBulk;
    }
                          
     



    isHidden = nil
    
     




    discover(stat = true)
    {
        isHidden = !stat;
        
         



        if(stat && Q.canSee((libGlobal.playerChar), self))
            noteSeen();
    }
       
     



    
    lockability = (keyList == nil) ? notLockable : lockableWithKey
    
     



    isLocked = lockability not in (nil, notLockable)
        
     



    
    makeLocked(stat)
    {
        isLocked = stat;
    }
    
     


    isSwitchable = nil
    
     
    isOn = nil
    
     
    makeOn(stat) { isOn = stat; }
    
     
    isWearable = nil
    
     



    wornBy = nil
    
     


    
    makeWorn(stat)  { wornBy = stat; }
    
     
    isDirectlyHeldBy(obj) { return location == obj && !isFixed && wornBy == nil; }
    
    

     



    directlyHeld = (contents.subset({ obj: !obj.isFixed &&
            obj.wornBy == nil }))

     
    isWornBy(obj)
    {
        return (location == obj ? wornBy == obj :
                location != nil && location.isWornBy(obj));
    }

     
    isDirectlyWornBy(obj) { return location == obj && wornBy == obj; }

     
    directlyWorn = (contents.subset({ obj: obj.wornBy == self }))
    
    
    
     




    canPutUnderMe = (contType == Under)
    
     




    canPutBehindMe = (contType == Behind)    
    
     




    canPutInMe = (contType == In)    
    
    
     


    
    isBoardable = nil
    
     
    
    isEdible = nil  
   
     




    combineDuplicateObjects = true
    
     













    nominalContents = nil

     






    distinguishByContents = nil

    
       




    contType = Outside
    
    
     
    contents = [ ]
    
     








    location = nil
    
     






    addToContents(obj, vec?)
    {
        contents = contents.appendUnique([obj]);
        if(vec != nil)
            vec.appendUnique(self);
    }
    
     






    removeFromContents(obj, vec?)
    {
        local idx = contents.indexOf(obj);
        if(idx != nil)
            contents = contents.removeElementAt(idx);
        
        if(vec != nil)
            vec.removeElement(self);
    }

     


    
    moveInto(newCont)
    {
         
        if(location != nil)            
            location.removeFromContents(self);
        
         



        if(newCont != location)
        {
            wornBy = nil; 
            
            movedTo = nil;
        }
        
         
        location = newCont;
               
         



        if(location != nil)
            location.addToContents(self);        
    }
    
     
    actionMoveInto(newCont)
    {
         



        if(location != nil)
            location.notifyRemove(self);            
        
         





        if(newCont != nil)
            newCont.notifyInsert(self); 
        
         
        local oldRoom = trackedLocation;
        
         
        moveInto(newCont);
        
         
        moved = true;
        
         
        if(Q.canSee((libGlobal.playerChar), self))
            noteSeen();
        
         



        local newRoom;
        
         



        if(locationHistoryLength && oldRoom != (newRoom = trackedLocation))
            updateLocationHistory(newRoom);
            
    }
    
       
    
     




    notifyRemove(obj) { }
    
     







    checkRemove(obj) 
    {  
        if(location)
            location.checkRemove(obj); 
    }
    
     



    notifyInsert(obj) { }
    
     



    trackRoomsOnly = true
    
    
     




    trackedLocation = (trackRoomsOnly ? getOutermostRoom : location)
    
     



    locationHistoryLength = nil
    
     



    locationHistory = nil
    
         
    getLocationHistory()  { return valToList(locationHistory); }
    
    updateLocationHistory(newRoom)
    {
         
        locationHistory = valToList(locationHistory)  + newRoom;
        
         



        if(locationHistory.length > locationHistoryLength)
            locationHistory = locationHistory.cdr();    
    }
    
     



    getPreviousLocation()
    {
         
        local idx = valToList(locationHistory).length - 1;
        
         



        return idx > 0 ? locationHistory[idx] : nil ;
    }
    
     




    moveMLIntoAdd(ml)
    {
        if(contents.indexOf(ml) == nil)
            addToContents(ml);     
        
        
        if(ml.locationList.indexOf(self) == nil)
            ml.locationList += self;
    }
    
     



    moveMLOutOf(ml)
    {
        removeFromContents(ml);  
        
        ml.locationList -= self;    
    }
    
    
    
     
    canSee(obj) { return Q.canSee(self, obj); }
    
     
    canHear(obj) { return Q.canHear(self, obj); }
    
     
    canSmell(obj) { return Q.canSmell(self, obj); }
    
     
    canReach(obj) { return Q.canReach(self, obj); }
    
     



    canTouch(obj) { return canReach(obj); }
    
    
      









    isChild(obj, typ)    
    {
         



        if(typ not in (nil, obj.contType))
            return nil;
        
         
        return isIn(obj);
    }

     





    isDirectChild(obj, typ)
    {
         



        if(typ not in (nil, obj.contType))
            return nil;
        
         
        return isDirectlyIn(obj);
    }
    
    
     
    isDirectlyIn(cont)
    {
         
        if(cont == nil)
            return location == nil;
        
         




        return location == cont || valToList(cont.contents).indexOf(self) != nil;
    }
    
     
    isIn(cont)
    {
         
        if(isDirectlyIn(cont))
            return true;
        
         
        if(location == nil)
            return nil;
        
         
        return location.isIn(cont);
    }
    
     
    isOrIsIn(cont)
    {
        return self == cont || isIn(cont);
    }
    
      



    intContents = ( contType == In ? contents : [] )

     




    extContents = ( contType == In ? [] : contents)

     




    
    isInitialPlayerChar = nil
    
     
    preinitThing()
    {
         




        if(isInitialPlayerChar && gameMain.propType(&initialPlayerChar) != 5)
        {
             
            gameMain.initialPlayerChar = self;
            
             
            (libGlobal.playerChar) = gameMain.initialPlayerChar;
        }
        
        
         





        if(subLocation != nil && location != nil)
            location = location.(subLocation);
        
         
        if(propType(&location) == 5 
           || (propType(&location) == 11 && lexicalParent && location == lexicalParent))
            location.addToContents(self);
        
         
        if (globalParamName != nil)
            libGlobal.nameTable_[globalParamName] = self;
        
         
        owner = valToList(owner);
        
         
        if(keyList != nil)
        {
            foreach(local key in valToList(keyList))
            {
                if(key.ofKind(Key))
                {
                    key.actualLockList = key.actualLockList.appendUnique([self]);
                    key.plausibleLockList = key.plausibleLockList.appendUnique([self]);
                }
            }
            
            foreach(local key in valToList(knownKeyList))
            {
                if(key.ofKind(Key))
                {
                    key.knownLockList = key.knownLockList.appendUnique([self]);                    
                }
            }       
                    
        }
        
         




        
        for(local prop in remapProps)
        {
            local obj = self.(prop);
            if(obj)
                obj.listOrder = listOrder;
        }
        
         
        foreach(local item in valToList(initiallyKnowsAbout))
            setKnowsAbout(item);
        
         
        if(altVocab)
            initAltVocab();
        
         



        if(locationHistoryLength)
            locationHistory = [trackedLocation];
        

         





        if(isBoardable == nil && contType != On)
        {
            if(canSitOnMe)
                "WARNING! canSitOnMe is true on <<theName>> when <<theName>> cannot be boarded.\n"
;
            if(canStandOnMe)
                "WARNING! canStandOnMe is true on <<theName>> when <<theName>> cannot be boarded.\n"
;
            if(canLieOnMe)
                "WARNING! canLieOnMe is true on <<theName>> when <<theName>> cannot be boarded.\n"
;
            
            if(canSitOnMe || canStandOnMe || canLieOnMe)
                "You either need to make <<objToString()>> a Platform or remove your override on its canSit/Stand/LieOnMe properties\b"
;
        }
        
        

    }
    
     



    getOutermostRoom = (location == nil ? nil : location.getOutermostRoom)
    
    
    interiorParent()
    {
         
        if (location == nil)
            return nil;

         
        if (location.contType == In || location.ofKind(Room))
            return location;

         
        return location.interiorParent();
    }
    
     



    isInterior(obj)
    {
        if(location == nil)
            return nil;
        
        if(location == obj && obj.contType == In)
            return true;
        
        if(location.ofKind(SubComponent) && location.contType == In &&
           location.location == obj)
            return true;
        
        return location.isInterior(obj);
    }
    
     






    directChildParent(other)
    {
         
        for (local o = other ; o != nil ; o = o.location)
        {
            if (o.location == self)
                return o;
        }

         
        return nil;
    }
    
       




    childLocType(child)
    {
         
        child = directChildParent(child);

         




        return (child != nil ? child.locType : nil);
    }
    
     




    
    commonContainingParent(other)
    {
         
        local l1 = location;
        local l2 = other.location;
        
          



        
        if(l1 == nil || l2 == nil)
            return nil;
        
          
        while (l1 != nil || l2 != nil)
        {
             
            if (l2 != nil && isIn(l2))
                return l2;

             
            if (l1 != nil && other.isIn(l1))
                return l1;
            
             
            l1 = (l1 != nil ? l1.location : nil);
            l2 = (l2 != nil ? l2.location : nil);
        }

         
        return nil;
    }
    
    
    



    commonInteriorParent(other)
    {
         
        local l1 = interiorParent();
        local l2 = other.interiorParent();
        
         



        
        if(l1 == nil || l2 == nil)
            return nil;
        
         
        while (l1 != nil || l2 != nil)
        {
             
            if (l2 != nil && isInterior(l2))
                return l2;

             
            if (l1 != nil && other.isInterior(l1))
                return l1;
            
             
            l1 = (l1 != nil ? l1.interiorParent() : nil);
            l2 = (l2 != nil ? l2.interiorParent() : nil);
        }

         
        return nil;
    }
    
    
     









    containerPath(other)
    {
         
        local outPath = new Vector(10), inPath = new Vector(10);

         
        local commonPar = nil;

         
        traceContainerPath(
            other,
            { c: outPath.append(c) },
            { c: commonPar = c },
            { c: inPath.append(c) });

         
        return [outPath.toList(), commonPar, inPath.toList()];
    }
    
     















    traceContainerPath(other, outFunc, parentFunc, inFunc)
    {
         
        local cpar = commonInteriorParent(other);

         
        for (local c = interiorParent() ; c != cpar ; c = c.interiorParent())
            outFunc(c);

         
        parentFunc(cpar);

         




        local stk = new Vector(10);
        for (local c = other.interiorParent() ; c != cpar ; 
             c = c.interiorParent())
            stk.push(c);
        
         
        while (!stk.isEmpty())
            inFunc(stk.pop());
    }
    
     
















    containerPathBlock(other, inProp, outProp)
    {
         
        local vec = new Vector(10);

         
        traceContainerPath(
            other,
            new function(c) { if (!c.(inProp)) vec.append(c); },
            new function(c) { if (c == nil && outermostParent) vec.append(outermostParent()); },
            new function(c) { if (!c.(outProp)) vec.append(c); });

         
        return vec;
    }

     




    firstContainerPathBlock(other, inProp, outProp)
    {
        local v = containerPathBlock(other, inProp, outProp);
        return (v.length() != 0 ? v[1] : nil);
    }

        
    outermostVisibleParent()
    {
         



        local loc;
        for (loc = location ; loc != nil ; loc = loc.location)
        {
             
            if (loc.location == nil)
                break;

             
            if (loc.contType == In && !loc.canSeeOut)
                break;
        }

         
        return loc;
        

    }
    
     



    locType()
    {
                 
        if(location == nil)
            return nil;
        
         



        if(location.contType == Carrier)
        {
             
            if(wornBy == location)
                return Worn;
            
             





            if(isFixed)
                return Outside;
            
             
            return Held;
        }
        
         
        else return location.contType;      
    }
    
      



    outermostParent()
    {
        return locationWhich({ p: p.location == nil });
    }
    
     
    isOutside(obj)
    {
        return (location == obj ? locType == Outside :
                location != nil && location.isOutside(obj));
    }
    
     
    isHeldBy(obj)
    {
        return (location == obj ? locType == Held :
                location != nil && location.isHeldBy(obj));
    }

    
     



    isVehicle = nil
    
     










    

   
     




    listOrder = 100

     



    listWith = nil

     



    groupOrder = listOrder

      



    collectiveGroups = nil
    
     



















    owner = []

     
















    ownsContents = (contType == Carrier)

     




    nominalOwner()
    {
         
        if (owner.length() > 0)
            return owner[1];

         
        return locationWhich({loc: loc.ownsContents});
    }

     













    ownedBy(obj)
    {
         
        if (owner.indexOf(obj))
            return true;

         
        if (isChild(obj, nil))
            return true;

         
        if (location != nil && location.ownedBy(obj))
            return true;

         
        return nil;
    }

     



    allContents()
    {
        local vec = new Vector(20);
               
        addToAllContents(vec, contents);
        
        return vec.toList;
    }
    
    addToAllContents(vec, lst)
    {
        vec.appendUnique(lst);
        foreach(local cur in lst)
        {
            if(!cur.ofKind(Room))
                addToAllContents(vec, cur.contents);
        }
    }
    

     
    directlyIn = (contents.subset({ obj: obj.locType == In }))
    
        
     



    tryCheck(prop)
    {
        local ret;
        try
        {
            ret = (outputManager.curOutputStream).captureOutput({: self.(prop) });      
        }
        catch (ExitSignal ex)
        {
            if(ret is in ('', nil))
                ret = (libGlobal.curAction).failCheckMsg;
        }
        finally
        {
            return ret;
        }
    }
    
    locationWhich(func)
    {
         



        local loc;
        for (loc = location ; loc != nil && !func(loc) ; loc = loc.location) ;

         
        return loc;
    }
    
     











    isTransparent = nil

     















    enclosing = (contType == In && isOpen == nil)

     





    canSeeIn = (isTransparent || !enclosing)

     





    canSeeOut = (isTransparent || !enclosing)

    
     














    isSoundproof = nil    
    
      




    canHearIn = (!isSoundproof || !enclosing)

     




    canHearOut = (!isSoundproof || !enclosing)

     













    isSmellproof = true
    
    
     



    canSmellIn = (!isSmellproof || !enclosing)

     



    canSmellOut = (!isSmellproof || !enclosing)

     




    canReachOut = (!enclosing)

     




    canReachIn = (!enclosing)

     





    
    
     






    
     





    checkReach(actor) {  }
      
     









    checkReachIn(actor, target?)  
    {
        checkReach(actor);
    }
    
    
     


    
    allowReachOut(obj) { return true; }
    
     
    
     


        
    autoGetOutToReach = true
    
    
     


 
    allowReachIn(obj) { return true; }
    
      


        
    autoGetInToReach = true
    
     



    cannotReachInMsg(targObj, blockObj)
    {        
        return buildMessage('cannot reach inside from', nil,targObj.theName, blockObj.theName)
;
    }

       
     






    reachBlockedMsg(target)
    {
        local obj = self;
        ((libGlobal.curAction).setMessageParams('obj', obj,'target', target));
        return  buildMessage('cannot reach', nil)
;
    }
    
     



    tooFarAwayMsg
    {
        local obj = self;
        ((libGlobal.curAction).setMessageParams('obj', obj));
        return buildMessage('too far away', nil);
    }
    
     




    cannotReachOutMsg(target)
    {
        local loc = self;
        ((libGlobal.curAction).setMessageParams('loc', loc,'target', target));
        return buildMessage('cannot reach out', nil)
;
    }
    
    
     







    shinesOut()
    {
         
        if (isLit)
            return true;

         
        if (contents.indexWhich(
            { c: c.locType.ofKind(ExtLocType) && c.shinesOut() }) != nil)
            return true;

         
        if (canSeeIn
            && contents.indexWhich(
                { c: c.locType.ofKind(IntLocType) && c.shinesOut() }) != nil)
            return true;

         
        return nil;
    }

     





    litWithin()
    {
         
        if (isLit)
            return true;

         
        if (contents.indexWhich(
            { c: c.locType.ofKind(IntLocType) && !c.ofKind(Floor)
              && c.shinesOut() }) != nil)
            return true;

         



        if (canSeeOut)
        {
            local p = interiorParent();
            if (p != nil && p.litWithin())
                return true;
        }

         
        return nil;
    }

    
    
     



    moved = nil

     





    examined = nil  
    
     




    seen = nil

     





    lastSeenAt = nil

         
    noteSeen()
    {
        (libGlobal.playerChar).setHasSeen(self);
        lastSeenAt = location;
    }       
    
     




    
    familiar = nil
    
     







        
     
    setKnowsAbout(obj, val?) 
    { 
        switch(dataType(obj))
        {
        case 5:
            obj.(knownProp) = true; 
            break;
        case 8:
            setInformed(obj, val);
            break;
        default:
            ;
        }
    }
    
     
    setKnown() { (libGlobal.playerChar).setKnowsAbout(self); }
    
     
    setHasSeen(obj) { obj.(seenProp) = true; }
    
     
    setSeen() { (libGlobal.playerChar).setHasSeen(self); }
    
     
    hasSeen(obj) { return obj.(seenProp); }
       
     



   
    knowsAbout(obj)
    {
        switch(dataType(obj))
        { 
        
         


    
        case 5:
            return hasSeen(obj) || obj.(knownProp);
            
             



        case 8:
            return informedAbout(obj);
            
        default:
            return nil;           
                
        }
    }    
   
    
     


    known = ((libGlobal.playerChar).knowsAbout(self)) 
    
    
      





    knownProp = &familiar
    seenProp = &seen
    
         
    informedNameTab = nil
    
     



    
    setInformed(tag, val?)
    {
        if(informedNameTab == nil)
            informedNameTab = new LookupTable(32, 32);
               
        if(val == nil && informedNameTab[tag] == nil)        
            informedNameTab[tag] = true;
        else
            informedNameTab[tag] = val ?? true;
    }
    
     
    forget(tag)
    {
        if(informedNameTab)
            informedNameTab.removeElement(tag);
    }
    
    
     




    informedAbout(tag) 
    {        
        return informedNameTab == nil ? nil 
            : (libGlobal.informedTrueOrFalseOnly ? (informedNameTab[tag] != nil)
               : informedNameTab[tag]);     
    }
    
     




         
    initiallyKnowsAbout = nil
    
     




    
    currentInterlocutor = nil
    
    
      



    canTalkTo(other)
    {
        return Q.canTalkTo(self, other);
    }
   
       





    
    myInventoryLister = Inventory.inventoryStyle == InventoryWide ? inventoryLister :
    inventoryTallLister
    
     
    myWornLister = wornLister
    
     







































    scoreObject(cmd, role, lst, m) 
    {
        m.score += vocabLikelihood;
        
         



        if(libGlobal.lastWrittenOnObj == self && cmd.action == WriteOn && role
           == IndirectObject)
            m.score += 20;
        
         



        if(libGlobal.lastTypedOnObj == self && cmd.action == TypeOn && role
           == IndirectObject)
            m.score += 20;
        
    }

     






    vocabLikelihood = 0
          
    
     



    getFacets = []
    
    
     


    
    beforeTravel(traveler, connector) {}
    
    
     


     
    afterTravel(traveler, connector) {}
    
     




    travelVia(conn, announceArrival = true)
    {
         



        
        if(ofKind(TravelConnector))
            inherited TravelConnector(conn);
        
        else    
             
            conn.travelVia(self);
    }
    
     





    
    handleCommand(action)
    {
        message('cannot command thing', nil,aName)
;
    }
    
    
     







    
    preAction(lst)
    {
    }
    
     




    actorAction() { }
    
     




    
    beforeAction() { }
    
     



  
    afterAction() { }
    
     
    isPlayerChar = ((libGlobal.playerChar) == self)
    
     












    hideFromAll(action) { return nil; }
    
     



    byRoom(arg) { return ''; }
    
     



    myThoughtManager = nil
    
     




    verobj = self
    
     




    postureDesc = ''
    
     





    
      





    
    isDecoration = nil
    
     











    

    decorationActions = [Examine, GoTo, GoNear]



     




    
    propertyset '*DobjDefault'
    {
        verify
        {
            (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notImportantMsg, nil, verobj));
        }
    }
    
    propertyset '*IobjDefault'
    {
        verify()
        {
            (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notImportantMsg, nil, verobj));
        }
    }
    
    notImportantMsg = buildMessage('not important', nil)
    
    
     


    
    verifyActor()
    {
        




        if(contType != Carrier)
            (libGlobal.curAction).addVerifyResult(new VerifyResult(70, '', true, verobj));
    }
    
    remapActor = nil
    
    preCondActor = [objAudible]
    
    
     
    
    propertyset '*DobjExamine'
    {
        preCond = [objVisible]
        
        verify() 
        { 
            if(isDecoration)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(70, '', true, verobj));
            else
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj)); 
        }
        
        check() { }
        
        action()
        {            
            local descDisplayed = nil;
            
             




            if(propType(&inDarkDesc) != 1 
               && !getOutermostRoom.isIlluminated())
            {
                 
                display(&inDarkDesc);
                
                 




                return;
            }
            
             






            if((outputManager.curOutputStream).watchForOutput({:display(&desc) }))
               descDisplayed = true;
            
             



            if((outputManager.curOutputStream).watchForOutput({:examineStatus()} ))
                descDisplayed = true;
               
             



            if(!descDisplayed)

                message('nothing special', nil,self)
; 
               
            
             
            examined = true;
            
             





            if((libGlobal.curActor) == (libGlobal.playerChar))
                noteSeen();
            
            
            "\n";
        }
    }
    
     
    tooDarkToSeeMsg = buildMessage('too dark to see', nil)
    
     



    isSmellable = true
       
    
    cannotSmellMsg = buildMessage('cannot smell', nil)
    
    propertyset '*DobjSmellSomething'
    {
        preCond = [objSmellable]
        
        verify()
        {
            if(!isSmellable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotSmellMsg, nil, verobj));
        }
        
        action()
        {
            displayAlt(&smellDesc, &smellNothingMsg);            
        }
    }
    

    smellNothingMsg = buildMessage('smell nothing', nil)
    
    propertyset '*DobjListenTo'
    {
        
        preCond = [objAudible]
        
        action()
        {
            displayAlt(&listenDesc, &hearNothingMsg);           
        }
    }
    

    hearNothingMsg = buildMessage('hear nothing listen to', nil)
    
     



    isTasteable = true
    
    

    cannotTasteMsg = buildMessage('cannot taste', nil)
    
    propertyset '*DobjTaste'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isTasteable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTasteMsg, nil, verobj));
        }
        
        action()
        {
            if(propType(&tasteDesc) == 1)           
                message('taste nothing', nil);
            else
                display(&tasteDesc);      
        }
    }
    
    
     




    isFeelable = true
    

    cannotFeelMsg = buildMessage('cannot feel', nil)
    
     





    checkFeelMsg = nil
    
    propertyset '*DobjFeel'    
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isFeelable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFeelMsg, nil, verobj));
        }
        
        check()
        {
            if(dataType(&checkFeelMsg) != 1)
                display(&checkFeelMsg);
        
        }
        
        action()
        {
            if(((libGlobal.curAction) != nil && (libGlobal.curAction).ofKind(Touch)) && propDefined(&touchDesc) && propType(&touchDesc) != 1)
                display(&touchDesc);
            
            else if(propType(&feelDesc) == 1)            
                message('feel nothing', nil);
            else
                display(&feelDesc);
        }
    }
    
     
    isTakeable = (!isFixed)
    
     
    propertyset '*DobjTouch' {         preCond { return preCondDobjFeel; }         verify() { verifyDobjFeel; }         remap() { return remapDobjFeel; }         check() { checkDobjFeel; }         action() { actionDobjFeel; }         report() { reportDobjFeel; }     }
    
    propertyset '*DobjTake'    
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isTakeable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTakeMsg, nil, verobj));
            
            if(isDirectlyIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyHeldMsg, nil, verobj));
            
            if((libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotTakeMyContainerMsg, nil, verobj));
            
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTakeSelfMsg, nil, verobj));
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check() 
        {
            
             
            if(location)
                location.checkRemove(self);
            
             



            checkRoomToHold();
        }
        
        action()
        {
             



            revealOnMove();     
            
             



            actionMoveInto((libGlobal.curActor));
        }
        
         




        report()
        {            
            message('report take', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
       

    cannotTakeMsg = buildMessage('cannot take', nil)
    

    alreadyHeldMsg = buildMessage('already holding', nil)
    

    cannotTakeMyContainerMsg = buildMessage('cannot take my container', nil,objInPrep)
    
    cannotTakeSelfMsg = buildMessage('cannot take self', nil)
    
     



    dropItemsBehind = true
    
     



    dropItemsUnder = true
    
    
     









    
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
            moveReport += 

                buildMessage('reveal move under', nil,theName, makeListStr(hiddenUnder), himName)
;
                     
            moveHidden(&hiddenUnder, underLoc);
            
        }
        
        
         




        if(hiddenBehind.length > 0)
        {
            moveReport += 

                buildMessage('reveal move behind', nil,theName, makeListStr(hiddenBehind), himName)
;
                        
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

                buildMessage('report left behind', nil,theName, makeListStr(lst))
;
        }
        
        
         



        if(moveReport != '' )
            (libGlobal.curCommand).afterReports += moveReport;
    }
    
     


    
    moveHidden(prop, loc)
    {
        foreach(local cur in self.(prop))
        {
            cur.moveInto(loc);
            cur.noteSeen();
        }
        self.(prop) = [];
                
    }
    
     






    
    checkRoomToHold()
    {
         


        if(bulk > (libGlobal.curActor).maxSingleBulk)

            message('too big to carry', nil)
;
        
         




        if(defined(BagOfHolding) 
           && (bulk > (libGlobal.curActor).bulkCapacity - (libGlobal.curActor).getCarriedBulk ||
               (libGlobal.curActor).directlyHeld.length > (libGlobal.curActor).maxItemsCarried - 1)
           && BagOfHolding.tryHolding(self));
        
        
         


        else if(bulk > (libGlobal.curActor).bulkCapacity - (libGlobal.curActor).getCarriedBulk ||
                (libGlobal.curActor).directlyHeld.length > (libGlobal.curActor).maxItemsCarried - 1)
            message('cannot carry any more', nil)
;
    }
    
     
    isDroppable = true
    
     
    cannotDropMsg = buildMessage('cannot drop', nil)
    
     
    dropLocation = self
    
     



    canDropContents = nil
    
    propertyset '*DobjDrop'
    {
        preCond = [touchObj, objNotWorn, objCarried]
        
        verify()
        {
            
             


            
            if(!isDroppable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDropMsg, nil, verobj));           
        }
                
        
        action()
        {           
            actionMoveInto((libGlobal.curActor).location.dropLocation);
        }
        
        report()
        {
            message('report drop', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));            
        }
    }
    
    notHoldingMsg = buildMessage('not holding', nil)
    partOfYouMsg = buildMessage('part of me', nil)
    
     
    isReadable = (propType(&readDesc) != 1)
    
    propertyset '*DobjRead'
    {
        preCond = [objVisible]
        
        verify()
        {
            if(!isReadable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotReadMsg, nil, verobj));
        }
        
        action()
        {
            if(propType(&readDesc) == 1)
                say(cannotReadMsg);
            else                
                display(&readDesc);         
        }
    }
    
    cannotReadMsg = buildMessage('cannot read', nil)
    

     



    isFollowable = nil
    
    propertyset '*DobjFollow'
    {
        preCond = [objVisible]
        
        verify()
        {
            if(!isFollowable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFollowMsg, nil, verobj));
            
            if(self == (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotFollowSelfMsg, nil, verobj));
        }
    }
    
    

    cannotFollowMsg = buildMessage('cannot follow', nil)
    

    cannotFollowSelfMsg = buildMessage('cannot follow self', nil)

    
   
     



    isAttackable = nil
    
    propertyset '*DobjAttack'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isAttackable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttackMsg, nil, verobj));
        }
        
        check()
        {
            if(dataType(&checkAttackMsg) != 1)
                display(&checkAttackMsg);
        }
        
         



        report()
        {
            say(futileToAttackMsg); 
        }
    }
   
     


 
    checkAttackMsg = nil
    

    cannotAttackMsg = buildMessage('cannot attack', nil)
    
    propertyset '*DobjAttackWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isAttackable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttackMsg, nil, verobj));
        }
        
        
         



        report()
        {
            say(futileToAttackMsg); 
        }       
    }
    
    futileToAttackMsg = buildMessage('futile attack', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))

    
    propertyset '*IobjAttackWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canAttackWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttackWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotAttackWithSelfMsg, nil, verobj));
        }
    }
    
    
         
    canAttackWithMe = nil
    

    cannotAttackWithSelfMsg = buildMessage('cannot attack with self', nil)
    

    cannotAttackWithMsg = buildMessage('cannot attack with', nil)
    
    propertyset '*DobjStrike' {         preCond { return preCondDobjAttack; }         verify() { verifyDobjAttack; }         remap() { return remapDobjAttack; }         check() { checkDobjAttack; }         action() { actionDobjAttack; }         report() { reportDobjAttack; }     }
    
     



    isBreakable = true
    
     
    shouldBeBroken = nil
    
    propertyset '*DobjBreak'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isBreakable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotBreakMsg, nil, verobj));
            else if(!shouldBeBroken)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, shouldNotBreakMsg, nil, verobj));            
        }       
    }
    

    cannotBreakMsg = buildMessage('cannot break', nil)
    

    shouldNotBreakMsg = buildMessage('dont break', nil)
    
     
    isThrowable = (!isFixed)
    
    propertyset '*DobjThrowDir'
    {
        preCond = [objHeld ,objNotWorn]
        
        verify()
        {
            if(!isThrowable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowMsg, nil, verobj));
               
        }
             
         



        action() { actionMoveInto(getOutermostRoom.dropLocation); }
        
        report()
        {
            local obj = (object: Thing              {                  plural = ((libGlobal.curAction).reportList.length > 1 ||                            (libGlobal.curAction).reportList[1].plural);                  isIt = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isIt : nil);                 isHim = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHim : nil);                 isHer = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHer : nil);                 name = makeListStr((libGlobal.curCommand).action.reportList, &theName);                  qualified = true;              } );
            
            ((libGlobal.curAction).setMessageParams('obj', obj));
            

            message('throw dir', nil,(libGlobal.curAction).direction.name)
;
        }
    }
    
    cannotThrowMsg = buildMessage('cannot throw', nil)
    
    
     






    isOpenable = nil
    
     




    isOpen = (!isOpenable)
    
     



    
    makeOpen(stat)
    {
        isOpen = stat;
        if(stat)
            opened = true;
    }
    
     



    opened = nil
    
     



    autoUnlock = nil
    
    
    propertyset '*DobjOpen'
    {
        
        preCond = autoUnlock ? [touchObj, objUnlocked] : [touchObj]
        
         




        remap()
        {
            if(!isOpenable && remapIn != nil && remapIn.isOpenable)
                return remapIn;
            else
                return self;
        }
        
        verify()
        {
            if(isOpenable == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotOpenMsg, nil, verobj));
            
            if(isOpen)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyOpenMsg, nil, verobj));
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));                          
        }
        
         




        check()
        {
            if(isLocked)           
                say(lockedMsg);            
        }
        
        action()
        {
            makeOpen(true);
            
             




            if(!(libGlobal.curAction).isImplicit)
            {              
                unmention(contents);
                listSubcontentsOf(self, &myOpeningContentsLister);
            }           
        }
        
        report()
        {
            message('okay open', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
     



    myOpeningContentsLister = openingContentsLister

    okayOpenMsg = 'Opened.|{I} open{s/ed} {1}. '
    

    cannotOpenMsg = buildMessage('cannot open', nil)
    alreadyOpenMsg = buildMessage('already open', nil)
    lockedMsg = buildMessage('locked', nil)
 
    
              
    isCloseable = (isOpenable)
    
    propertyset '*DobjClose'
    {
        preCond = [touchObj]
        
        remap()
        {
            if(!isCloseable && remapIn != nil && remapIn.isCloseable)
                return remapIn;
            else
                return self;
        }
        
        
        verify()
        {
            if(!isCloseable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCloseMsg, nil, verobj));
            if(!isOpen)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyClosedMsg, nil, verobj));
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
           
        
        action()
        {            
            makeOpen(nil);
        }
        
        report()
        {
            message('report close', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    

    cannotCloseMsg = buildMessage('not closeable', nil)
    alreadyClosedMsg = buildMessage('already closed', nil)
    
       
    
     



    isTurnable = true
    
    
    propertyset '*DobjTurn'
    {
        
        preCond = [touchObj]
        
        verify()
        {
            if(!isTurnable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTurnMsg, nil, verobj));
            else if(isDirectlyIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
            else
                (libGlobal.curAction).addVerifyResult(new VerifyResult(80, '', true, verobj));
        }
        
        report()
        {
            say(turnNoEffectMsg);
        }
        
    }
    
    cannotTurnMsg = buildMessage('cannot turn', nil)
    

    turnNoEffectMsg = buildMessage('turn useless', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
    
    propertyset '*DobjTurnWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isTurnable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTurnMsg, nil, verobj));
            else if(isDirectlyIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
            else
                (libGlobal.curAction).addVerifyResult(new VerifyResult(80, '', true, verobj));
        }
        
        report()
        {
            say(turnNoEffectMsg);
        }
        
    }
    
     
    canTurnWithMe = nil
    
    propertyset '*IobjTurnWith'
    {
        preCond = [objHeld]
        verify() 
        {           
            if(!canTurnWithMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTurnWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTurnWithSelfMsg, nil, verobj)); 
        }
    }
        
    

    cannotTurnWithMsg = buildMessage('cannot turn with', nil)
    

    cannotTurnWithSelfMsg = buildMessage('turn self', nil)
    
     
    isCuttable = nil
    
    propertyset '*DobjCut'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isCuttable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCutMsg, nil, verobj)); 
        }
        
        action() { askMissingObject(CutWith, IndirectObject); }
    }
    
    propertyset '*DobjCutWith'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isCuttable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCutMsg, nil, verobj)); 
        }
    }
    
     
    canCutWithMe = nil
    
    propertyset '*IobjCutWith'
    {
        preCond = [objHeld]
        
        verify()
        {                       
            if(!canCutWithMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCutWithMsg, nil, verobj));
            
            if(self == (((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotCutWithSelfMsg, nil, verobj));
        }
    }
    
    cannotCutMsg = buildMessage('cannot cut', nil)

    cannotCutWithMsg = buildMessage('cannot cut with', nil)

    cannotCutWithSelfMsg = buildMessage('cannot cut with self', nil)
                     
    
     




    autoTakeOnFindHidden = (isFixed)
    
     





    findHiddenDest = (autoTakeOnFindHidden ? (libGlobal.curActor) : location)
      
    propertyset '*DobjLookIn'
    {
        preCond = [objVisible, containerInteriorVisible]
        
        remap = remapIn
                
        verify()
        {
            if(contType == In || remapIn != nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(120, '', true, verobj));
                        
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        action()
        {       
            





            if(contType == In)
            {            
                 



                if(hiddenIn.length > 0)                
                    moveHidden(&hiddenIn, self);                    
                
                
                 
                if(contents.length == 0)
                    display(&lookInMsg);                    
                
                 
                else
                {
                     
                    unmention(contents);
                    
                     






                    if((outputManager.curOutputStream).watchForOutput(
                        {: listSubcontentsOf(self, &myLookInLister) }) == nil)
                      display(&lookInMsg);       

                }
            }
            
             




            else if(hiddenIn.length > 0)            
                findHidden(&hiddenIn, In);                               
                        
            
             
            else
                display(&lookInMsg);
        }
        
    }
    
     



    myLookInLister = lookInLister
    
    
     





    lookInMsg = buildMessage('look in', nil)
    
    
     




    
    findHidden(prop, prep)
    {
         
        sayFindHidden(prop, prep);
        
         
        moveHidden(prop, findHiddenDest);        
    }
    
     




    sayFindHidden(prop, prep)
    {
         message('find hidden', nil,prep.prep, makeListStr(self.(prop)))

;
    }
    
     



    canLookUnderMe = true  
    
    
    propertyset '*DobjLookUnder'
    {
        preCond = [objVisible, touchObj]
        
        remap = remapUnder        
        
        verify()
        {
            if(!canLookUnderMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLookUnderMsg, nil, verobj));       
        }
        
        
        action()
        {            
             




                       
            if(contType == Under)
            {
                
                 



                if(hiddenUnder.length > 0)                
                    moveHidden(&hiddenUnder, self);                    
                
                 
                if(contents.length == 0)
                    display(&lookUnderMsg);  
                
                 
                else
                {
                     
                    unmention(contents);
                    
                     






                    if((outputManager.curOutputStream).watchForOutput(
                        {: listSubcontentsOf(self, &myLookUnderLister) }) == nil)
                        display(&lookUnderMsg);  
                    
                }
            }
            
             




            else if(hiddenUnder.length > 0)            
                findHidden(&hiddenUnder, Under);      
            
             
            else
                display(&lookUnderMsg);           
            
        }
    }
    
     



    myLookUnderLister = lookInLister
    

    cannotLookUnderMsg = buildMessage('cannot look under', nil)
    

    lookUnderMsg = buildMessage('look under', nil)
    
     
    
     


    
    canLookBehindMe = true    
    
    propertyset '*DobjLookBehind'
    {
        preCond = [objVisible, touchObj]
        
        remap = remapBehind        
        
        verify()
        {
            if(!canLookBehindMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLookBehindMsg, nil, verobj));
        }
        
        
        action()
        {            
             





            if(contType == Behind)
            {
                
                 



                if(hiddenBehind.length > 0)                
                    moveHidden(&hiddenBehind, self);                    
                
                 



                if(contents.length == 0)
                    display(&lookBehindMsg);  
                
                 
                else
                {
                     
                    unmention(contents);
                    
                     






                    if((outputManager.curOutputStream).watchForOutput(
                        {: listSubcontentsOf(self, &myLookBehindLister) }) == nil)                        
                        display(&lookBehindMsg); 

                }
            }
            
             




            else if(hiddenBehind.length > 0)            
                findHidden(&hiddenBehind, Behind);     
            
             
            else
                display(&lookBehindMsg);           
            
            
        }
    }
    
    
     



    myLookBehindLister = lookInLister
    
    

    cannotLookBehindMsg = buildMessage('cannot look behind', nil)
    

    lookBehindMsg = buildMessage('look behind', nil)
    
           
    
     



    canLookThroughMe = true
    
    propertyset '*DobjLookThrough'
    {
        preCond = [objVisible]
        
        verify()
        {
            if(!canLookThroughMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLookThroughMsg, nil, verobj));            
        }
        
        action() { display(&lookThroughMsg); }
    }
    

    cannotLookThroughMsg = buildMessage('cannot look through', nil)
    

    lookThroughMsg = buildMessage('look through', nil)
    
    
     
    canGoThroughMe = nil
    
    propertyset '*DobjGoThrough'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canGoThroughMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotGoThroughMsg, nil, verobj)); 
        }
    }
    

    cannotGoThroughMsg = buildMessage('cannot go through', nil)
    
    
     
    canGoAlongMe = nil
    
    propertyset '*DobjGoAlong'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canGoAlongMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotGoAlongMsg, nil, verobj)); 
        }
    }
    

    cannotGoAlongMsg = buildMessage('cannot go through', nil)
    
    
     
    isPushable = true
    
    propertyset '*DobjPush'
    {
        preCond = [touchObj]
        verify()
        {
            if(!isPushable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushMsg, nil, verobj));
        }
        
        report() { say(pushNoEffectMsg); }
    }
        

    cannotPushMsg = buildMessage('cannot push', nil)
    

    pushNoEffectMsg = buildMessage('push no effect', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
    
     
    isPullable = true
    
    propertyset '*DobjPull'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isPullable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPullMsg, nil, verobj));
        }
        
        report() { say(pullNoEffectMsg); }
    }
    

    cannotPullMsg = buildMessage('cannot pull', nil)
    

    pullNoEffectMsg = buildMessage('pull no effect', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
    
     




    cannotPutMsg = cannotTakeMsg
    
       
    propertyset '*DobjPutOn'
    {
        preCond = [objHeld, objNotWorn]
        
        verify()
        {
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPutInSelfMsg, nil, verobj));  
            
            if(isFixed)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutMsg, nil, verobj));
            
            if(isDirectlyIn((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyInMsg, nil, verobj));
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, circularlyInMsg, nil, verobj));     
            
           
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        
        action()
        {          
                                                 
        }
        
        report()
        {
            message('report put on', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));            
        }
    }
    
    alreadyInMsg = buildMessage('already in', nil,(((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).objInName)
    

    circularlyInMsg = buildMessage('circularly in', nil,(((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).objInName)
        

    cannotPutInSelfMsg = buildMessage('cannot put in self', nil,((libGlobal.curAction).curIobj).objInPrep)
    
    propertyset '*IobjPutOn'
    {
        
        preCond = [touchObj]
        
        remap = remapOn         
        
        verify()
        {
            if(contType != On)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutOnMsg, nil, verobj));
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check()
        {
            checkInsert(((libGlobal.curAction).curDobj));
        }
        
        action()
        {
            ((libGlobal.curAction).curDobj).actionMoveInto(self);
        }      
    
    }
    

    cannotPutOnMsg = buildMessage('cannot put on', nil)
    
    propertyset '*DobjPutIn'
    {
        preCond = [objHeld, objNotWorn]
        
        verify()
        {            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPutInSelfMsg, nil, verobj));   
            
            if(isDirectlyIn((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyInMsg, nil, verobj));
            
            if(isFixed)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutMsg, nil, verobj));
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, circularlyInMsg, nil, verobj));    
                        
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
              
        action()
        {                     
                                       
        }
        
        report()
        {
            message('report put in', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));            
        }
    }
    
    
        
    propertyset '*IobjPutIn'
    {
        preCond = [containerInteriorAccessible, touchObj]
        
        remap = remapIn        
        
        verify()
        {
            if(!canPutInMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutInMsg, nil, verobj));
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check()
        {            
             




            if(contType == In)
               checkInsert(((libGlobal.curAction).curDobj));
            
             



            else if(((libGlobal.curAction).curDobj).bulk > maxBulkHiddenIn - getBulkHiddenIn)

                message('no room in', nil)
;            
        }
        
        action()
        {
            
             




            
            if(contType == In)
                ((libGlobal.curAction).curDobj).actionMoveInto(self);
            else
            {
                hiddenIn += ((libGlobal.curAction).curDobj);
                ((libGlobal.curAction).curDobj).actionMoveInto(nil);
            }  
        }      
    
    }
    
    cannotPutInMsg = buildMessage('cannot put in', nil)
    
    
    
    propertyset '*DobjPutUnder'
    {
        preCond = [objHeld, objNotWorn]
        
                
        verify()
        {
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPutInSelfMsg, nil, verobj));     
            
            if(isFixed)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutMsg, nil, verobj));
            
            if(isDirectlyIn((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyInMsg, nil, verobj));
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, circularlyInMsg, nil, verobj));           
            
                         
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));           
        }
        
        action()
        {
             
        }
        
        report()
        {
            message('report put under', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
        
            
    }
    
    propertyset '*IobjPutUnder'
    {
        preCond = [touchObj]
        
        remap = remapUnder
        
        verify()
        {
            if(!canPutUnderMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutUnderMsg, nil, verobj));
            else
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check() 
        { 
             




            if(contType == Under)
               checkInsert(((libGlobal.curAction).curDobj)); 
            
             



            else if(((libGlobal.curAction).curDobj).bulk > maxBulkHiddenUnder - getBulkHiddenUnder)

                message('no room under', nil)
;    
        }
        
        action()
        {
             





            if(contType == Under)
                ((libGlobal.curAction).curDobj).actionMoveInto(self);
            else
            {
                hiddenUnder += ((libGlobal.curAction).curDobj);
                ((libGlobal.curAction).curDobj).actionMoveInto(nil);
            }
        }
        
        
    }
    
    cannotPutUnderMsg = buildMessage('cannot put under', nil)
        
    propertyset '*DobjPutBehind'
    {
        preCond = [objHeld, objNotWorn]
        
        verify()
        {
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPutInSelfMsg, nil, verobj));     
            
            if(isFixed)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutMsg, nil, verobj));
            
            if(isDirectlyIn((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyInMsg, nil, verobj));
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, circularlyInMsg, nil, verobj));           
            
                         
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));           
        }
        
        action()
        {
             
        }
        
        report()
        {
            message('report put behind', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
        
            
    }
    
    propertyset '*IobjPutBehind'
    {
        preCond = [touchObj]
        
        remap = remapBehind
        
        verify()
        {
            if(!canPutBehindMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPutBehindMsg, nil, verobj));
            else
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check() 
        { 
             




            if(contType == Behind)
                checkInsert(((libGlobal.curAction).curDobj));
            
             




             else if(((libGlobal.curAction).curDobj).bulk > maxBulkHiddenBehind - getBulkHiddenBehind)

                message('no room behind', nil)
;    
        }
        
        action()
        {
             





            if(contType == Behind)
                ((libGlobal.curAction).curDobj).actionMoveInto(self);
            else
            {
                hiddenBehind += ((libGlobal.curAction).curDobj);
                ((libGlobal.curAction).curDobj).actionMoveInto(nil);
            }
        }
        
        
    }   
    
    cannotPutBehindMsg = buildMessage('cannot put behind', nil)
    
     




        
    keyList = nil
       
     



    knownKeyList = nil
    
     




    
    propertyset '*DobjUnlockWith'
    {
        
        preCond = [touchObj]
        
         




        remap()
        {
            if(lockability == notLockable && remapIn != nil &&
               remapIn.lockability != notLockable)
                return remapIn;
            else
                return self;
        }
        
        verify()
        {
             



            if(lockability == notLockable || lockability == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notLockableMsg, nil, verobj));
            
             






            if(lockability == lockableWithoutKey)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, keyNotNeededMsg, nil, verobj));
            
            if(lockability == indirectLockable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, indirectLockableMsg, nil, verobj));
            
             



            if(lockability == lockableWithKey)
            {
                if(isLocked)
                    (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
                else
                    (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notLockedMsg, nil, verobj));
            }
        }
    }
    
    notLockableMsg = buildMessage('not lockable', nil)

    keyNotNeededMsg = buildMessage('key not needed', nil)

    indirectLockableMsg = buildMessage('indirect lockable', nil)
    notLockedMsg = buildMessage('not locked', nil)
    
     




    canUnlockWithMe = nil 
    
    propertyset '*IobjUnlockWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!canUnlockWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnlockWithMsg, nil, verobj));
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotUnlockWithSelfMsg, nil, verobj));
        }      
    }
    

    cannotUnlockWithMsg = buildMessage('cannot unlock with', nil)
    

    cannotUnlockWithSelfMsg = buildMessage('cannot unlock with self', nil)
    
    propertyset '*DobjLockWith'
    {
        preCond  = [objClosed, touchObj]
        
          




        remap()
        {
            if(lockability == notLockable && remapIn != nil &&
               remapIn.lockability != notLockable)
                return remapIn;
            else
                return self;
        }
        
        verify()
        {
            if(lockability == notLockable || lockability == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notLockableMsg, nil, verobj));
            
            if(lockability == lockableWithoutKey)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, keyNotNeededMsg, nil, verobj));
            
            if(lockability == indirectLockable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, indirectLockableMsg, nil, verobj));
            
            if(lockability == lockableWithKey)
            {
                if(isLocked)
                   (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyLockedMsg, nil, verobj));
                else                    
                    (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
            }
        }
        
    }
    

    alreadyLockedMsg = buildMessage('already locked', nil)
    
    
     



    canLockWithMe = (canUnlockWithMe)
    
    propertyset '*IobjLockWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!canLockWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLockWithMsg, nil, verobj));
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotLockWithSelfMsg, nil, verobj));
        }      
    }
    

    cannotLockWithMsg = buildMessage('cannot lock with', nil)
    

    cannotLockWithSelfMsg = buildMessage('cannot lock with self', nil)
    
    
    propertyset '*DobjUnlock'
    {
        preCond = [touchObj]
        
         




        remap()
        {
            if(lockability == notLockable && remapIn != nil &&
               remapIn.lockability != notLockable)
                return remapIn;
            else
                return self;
        }
        
        verify()
        {
            if(lockability == notLockable || lockability == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notLockableMsg, nil, verobj));
            
            if(lockability == indirectLockable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, indirectLockableMsg, nil, verobj));
            
            if(!isLocked)            
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notLockedMsg, nil, verobj));           
        }
        
        check()
        {
             



            if(lockability == lockableWithKey)            
                findPlausibleKey();                
            
               
        }
        
        action()
        {
             







            if(useKey_ != nil)
                extraReport(withKeyMsg);
            
             



 
            else if(lockability == lockableWithKey)
                askMissingObject(UnlockWith, IndirectObject);
            
             
            makeLocked(nil);               
        }
        
        report()
        {
            message('report unlock', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
        
    }
    
    okayUnlockMsg = 'Unlocked.|{I} unlock{s/ed} {1}. '
    
    propertyset '*DobjLock'
    {
        preCond = [objClosed, touchObj]
        
          




        remap()
        {
            if(lockability == notLockable && remapIn != nil &&
               remapIn.lockability != notLockable)
                return remapIn;
            else
                return self;
        }
        
        verify()
        {
            if(lockability == notLockable || lockability == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notLockableMsg, nil, verobj));
            
            if(lockability == indirectLockable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, indirectLockableMsg, nil, verobj));            
            
            if(isLocked)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyLockedMsg, nil, verobj));            
            
        }
        
        check()
        {
             



            if(lockability == lockableWithKey)            
                findPlausibleKey();                
            
               
        }
        
        action()
        {
             







            if(useKey_ != nil)
                extraReport(withKeyMsg);
                
             



    
            else if(lockability == lockableWithKey)
                askMissingObject(LockWith, IndirectObject);
         
             
            makeLocked(true);              
        }
        
        report()
        {
            message('report lock', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
    
    
    
    okayLockMsg = 'Locked.|{I} lock{s/ed} {1}. '
    
    withKeyMsg = buildMessage('with key', nil,useKey_.theName)
    
     




    findPlausibleKey(silent = nil)
    {
      
        useKey_ = nil;   
        local lockObj = self;
        
         



        foreach(local obj in (libGlobal.curActor).contents)
        {
            if(obj.ofKind(Key) 
               && obj.knownLockList.indexOf(self) !=  nil)
            {
                useKey_ = obj;
                return;
            }
        }
        
        
         



        foreach(local obj in (libGlobal.curActor).contents)
        {
            if(obj.ofKind(Key) 
               && obj.plausibleLockList.indexOf(self) !=  nil)
            {
                useKey_ = obj;
                break;
            }
        }
        
         




        if(useKey_ == nil)
        {
            if(lexicalParent != nil && lexicalParent.remapIn == self)
            {
                lexicalParent.findPlausibleKey();
                useKey_ = lexicalParent.useKey_;
                lockObj = lexicalParent;
            }
        }
        
         



        if(useKey_ && useKey_.actualLockList.indexOf(lockObj) == nil && !silent)
        {
            say(withKeyMsg);
            say(keyDoesntWorkMsg);            
        }
        
    }
  
    

    keyDoesntWorkMsg = buildMessage('key doesnt work', nil,useKey_.theName)
    
    useKey_ = nil
    
    
    
    propertyset '*DobjSwitchOn'
    {
        
        preCond = [touchObj]
        
        verify()
        {
            if(!isSwitchable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notSwitchableMsg, nil, verobj));
            else if(isOn)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyOnMsg, nil, verobj));
        }
        
        action()
        {
            makeOn(true);
        }
        
        report()
        {
            message('report turn on', nil);
        } 
    }
    

    notSwitchableMsg = buildMessage('not switchable', nil)

    alreadyOnMsg = buildMessage('already switched on', nil)
    
    propertyset '*DobjSwitchOff'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isSwitchable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notSwitchableMsg, nil, verobj));
            else if(!isOn)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyOffMsg, nil, verobj));
        }
        
        action()
        {
            makeOn(nil);
        }
        
        report()
        {
            message('report turn off', nil);
        } 
    }
    

   alreadyOffMsg = buildMessage('not switched on', nil)
    
    
    propertyset '*DobjSwitchVague'
    {
        verify()
        {
            if(!isSwitchable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notSwitchableMsg, nil, verobj));
        }
        
        action()
        {
            makeOn(!isOn);
        }
        
        report()
        {
            message('report switch', nil,isOn ?                   'on' : 'off', makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
    }
    
     



    isFlippable = (isSwitchable)
    
    propertyset '*DobjFlip'
    {
        verify() 
        { 
            if(!isFlippable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFlipMsg, nil, verobj)); 
        }
    }
    
    cannotFlipMsg = buildMessage('cannot flip', nil)
    
    
     
    isBurnable = nil
    
    propertyset '*DobjBurn'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isBurnable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotBurnMsg, nil, verobj)); 
        }
    }
        
    propertyset '*DobjBurnWith'
    {
        preCond = [touchObj]        
        verify() 
        {
            if(!isBurnable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotBurnMsg, nil, verobj)); 
        }
    }
    
     



    canBurnWithMe = nil
    
    propertyset '*IobjBurnWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canBurnWithMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotBurnWithMsg, nil, verobj)); 
        }
    }
    
    cannotBurnMsg = buildMessage('cannot burn', nil)

    cannotBurnWithMsg = buildMessage('cannot burn with', nil)
    
    propertyset '*DobjWear'
    {
        preCond = [objHeld]
        
        verify()
        {
            if(!isWearable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotWearMsg, nil, verobj));
            
            if(wornBy == (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyWornMsg, nil, verobj));
        }
        
        action()  {  makeWorn((libGlobal.curActor));  }
        
        report()
        {
            message('okay wear', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
    }
    
    cannotWearMsg = buildMessage('cannot wear', nil)
    alreadyWornMsg = buildMessage('already worn', nil)
    
    
     
    isDoffable = (isWearable)
    
    propertyset '*DobjDoff'
    {
        
        verify()
        {
            if(wornBy != (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notWornMsg, nil, verobj));
                        
            if(!isDoffable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDoffMsg, nil, verobj));
        }
        
        check()
        {
            checkRoomToHold();
        }
        
        action()  {   makeWorn(nil);  }
        
        report()
        {
            message('okay doff', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
            
        }
    }
    
  
    cannotDoffMsg = (cannotWearMsg)
    
    notWornMsg = buildMessage('not worn', nil)
    
     
    isClimbable = nil
    
    propertyset '*DobjClimb'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isClimbable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotClimbMsg, nil, verobj)); 
        }
    }
    
    canClimbUpMe = (isClimbable)
    
    propertyset '*DobjClimbUp'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canClimbUpMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotClimbMsg, nil, verobj)); 
        }
    }
    

    cannotClimbMsg = buildMessage('cannot climb', nil)
    
    canClimbDownMe = (isClimbable)
    
    propertyset '*DobjClimbDown'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canClimbDownMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotClimbDownMsg, nil, verobj)); 
        }
    }
    

    cannotClimbDownMsg = buildMessage('cannot climb down', nil)
    
    propertyset '*DobjThrow'
    {
        preCond = [objHeld, objNotWorn]
        
        verify()
        {
            if(!isThrowable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowMsg, nil, verobj));
        }
        
        action()
        {
            actionMoveInto(getOutermostRoom.dropLocation);            
        }
        
        report()
        {
            local obj = (object: Thing              {                  plural = ((libGlobal.curAction).reportList.length > 1 ||                            (libGlobal.curAction).reportList[1].plural);                  isIt = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isIt : nil);                 isHim = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHim : nil);                 isHer = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHer : nil);                 name = makeListStr((libGlobal.curCommand).action.reportList, &theName);                  qualified = true;              } );
            ((libGlobal.curAction).setMessageParams('obj', obj));

            message('throw', nil)
;
        }
        
    }
    
    
    propertyset '*DobjBoard'
    {
        preCond = [touchObj, actorInStagingLocation]
        
        remap = remapOn
        
        verify()
        {
            if(!isBoardable || contType != On)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotBoardMsg, nil, verobj));
            
            if((libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, actorAlreadyOnMsg, nil, verobj));
            
            if(isIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotGetOnCarriedMsg, nil, verobj));
            
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotBoardSelfMsg, nil, verobj));
        }
        
        check() { checkInsert((libGlobal.curActor)); }
        
        action()
        {
            (libGlobal.curActor).actionMoveInto(self);            
        }
        
        report()
        {
            message('okay get on', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
    cannotBoardMsg = buildMessage('cannot board', nil)
    
    cannotBoardSelfMsg = buildMessage('cannot board self', nil)         
    
    actorAlreadyOnMsg = buildMessage('already on', nil)
     

    cannotGetOnCarriedMsg = buildMessage('cannot board carried', nil)
    
     


    
    propertyset '*DobjStandOn' {         preCond { return preCondDobjBoard; }         remap() { return remapDobjBoard(); }         check() { checkDobjBoard; }         action() { actionDobjBoard(); }         report() { reportDobjBoard(); }     }
    propertyset '*DobjSitOn' {         preCond { return preCondDobjBoard; }         remap() { return remapDobjBoard(); }         check() { checkDobjBoard; }         action() { actionDobjBoard(); }         report() { reportDobjBoard(); }     }
    propertyset '*DobjLieOn' {         preCond { return preCondDobjBoard; }         remap() { return remapDobjBoard(); }         check() { checkDobjBoard; }         action() { actionDobjBoard(); }         report() { reportDobjBoard(); }     }
    
     










    canSitOnMe = isBoardable
    canLieOnMe = isBoardable
    canStandOnMe = isBoardable
    
    
     










    sitOnScore = 100
    lieOnScore = 100
    standOnScore = 100
    
    propertyset '*DobjStandOn'
    {
        verify()
        {
            if(!canStandOnMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotStandOnMsg, nil, verobj));
            else
                verifyDobjBoard();
            
            (libGlobal.curAction).addVerifyResult(new VerifyResult(standOnScore, '', true, verobj));
        }
    }
    
    propertyset '*DobjSitOn'
    {
        verify()
        {
            if(!canSitOnMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotSitOnMsg, nil, verobj));
            else
                verifyDobjBoard();            
            
            (libGlobal.curAction).addVerifyResult(new VerifyResult(sitOnScore, '', true, verobj));
        }
    }
    
    propertyset '*DobjLieOn'
    {
        verify()
        {
            if(!canLieOnMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLieOnMsg, nil, verobj));
            else
                verifyDobjBoard();
            
            (libGlobal.curAction).addVerifyResult(new VerifyResult(lieOnScore, '', true, verobj));
        }
    }
    

    cannotStandOnMsg = buildMessage('cannot stand on', nil)

    cannotSitOnMsg = buildMessage('cannot sit on', nil)

    cannotLieOnMsg = buildMessage('cannot lie on', nil)
    
    
     



    isEnterable = nil
    
     
    
    propertyset '*DobjEnter' 
    {
        preCond = [touchObj, containerOpen, actorInStagingLocation]
        
        remap = remapIn
        
        verify()
        {
            if(!isEnterable || contType != In)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotEnterMsg, nil, verobj));
            
            if((libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, actorAlreadyInMsg, nil, verobj));
            
            if(isIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotGetInCarriedMsg, nil, verobj));
        }
        
        check() { checkInsert((libGlobal.curActor)); }
        
        action()
        {
            (libGlobal.curActor).actionMoveInto(self);            
        }
        
        report()
        {
            message('okay get in', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
        
    }
    

    cannotEnterMsg = buildMessage('cannot enter', nil)
    actorAlreadyInMsg = buildMessage('actor already in', nil)
     

    cannotGetInCarriedMsg = buildMessage('cannot enter carried', nil)
    
    
     



    propertyset '*DobjStandIn' {         preCond { return preCondDobjEnter; }         verify() { verifyDobjEnter; }         remap() { return remapDobjEnter; }         check() { checkDobjEnter; }         action() { actionDobjEnter; }         report() { reportDobjEnter; }     }
    propertyset '*DobjSitIn' {         preCond { return preCondDobjEnter; }         verify() { verifyDobjEnter; }         remap() { return remapDobjEnter; }         check() { checkDobjEnter; }         action() { actionDobjEnter; }         report() { reportDobjEnter; }     }
    propertyset '*DobjLieIn' {         preCond { return preCondDobjEnter; }         verify() { verifyDobjEnter; }         remap() { return remapDobjEnter; }         check() { checkDobjEnter; }         action() { actionDobjEnter; }         report() { reportDobjEnter; }     }
    
     



    exitLocation = location
    
     
    stagingLocation = (exitLocation)
    
    propertyset '*DobjGetOff'
    {        
        preCond = [actorOutOfSubNested]
        
        remap = remapOn
        
        verify()
        {
            if(!(libGlobal.curActor).isIn(self) || contType != On)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, actorNotOnMsg, nil, verobj));
            
        }
        
        action()
        {
            (libGlobal.curActor).actionMoveInto(exitLocation);            
        }
        
        report() { say(okayGetOutOfMsg); }
    }
            
    propertyset '*DobjGetOutOf' 
    {
        preCond = [containerOpen, actorOutOfSubNested]
        
        remap = remapIn
        
        verify()
        {
            if(!(libGlobal.curActor).isIn(self) || contType != In)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, actorNotInMsg, nil, verobj));
            
        }
        
        action()
        {
            (libGlobal.curActor).actionMoveInto(exitLocation);            
        }
        
        report() { say(okayGetOutOfMsg); }        
    }
    
    
    okayGetOutOfMsg = buildMessage('okay get outof', nil)
    
    actorNotInMsg = buildMessage('actor not in', nil)
    actorNotOnMsg = buildMessage('actor not on', nil)
    
     





    
    propertyset '*DobjRemove'
    {
         



             
        verify()
        {
            if(!isRemoveable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotRemoveMsg, nil, verobj));
            
             



            if(isDirectlyIn((libGlobal.curActor)) && wornBy != (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyHeldMsg, nil, verobj));
        }
    
        
    }
  
    
     
         
    isRemoveable = (isTakeable)
    
     





    cannotRemoveMsg = buildMessage('cannot remove', nil)
    
     
    propertyset '*DobjSearch' {         preCond { return preCondDobjLookIn; }         verify() { verifyDobjLookIn; }         remap() { return remapDobjLookIn; }         check() { checkDobjLookIn; }         action() { actionDobjLookIn; }         report() { reportDobjLookIn; }     }
    
     



    isMoveable = (!isFixed || canPushTravel || canPullTravel)
    
     




    propertyset '*DobjMove'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isMoveable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveMsg, nil, verobj));
        }
        
        action()  {  }
        
        report()
        {
            say(moveNoEffectMsg);
        }
    }
    
    cannotMoveMsg = buildMessage('cannot move', nil)  
    
    propertyset '*DobjMoveWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isMoveable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveMsg, nil, verobj));
                        
        }
        
        action() {  }
        
        report()
        {
            say(moveNoEffectMsg);
        }
    }
    
    moveNoEffectMsg = buildMessage('move no effect', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))

    
     





    canMoveWithMe = nil
    
    propertyset '*IobjMoveWith'
    {
        preCond = [objHeld]
        
        verify() 
        { 
            if(!canMoveWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotMoveWithSelfMsg, nil, verobj));
        }
    }
    

    cannotMoveWithMsg = buildMessage('cannot move with', nil)
    

    cannotMoveWithSelfMsg = buildMessage('cannot move with self', nil)
    
    
     











    propertyset '*DobjMoveTo'
    {
        preCond = location.ofKind(Room) ? [touchObj] : [objHeld]
        
        verify()
        {
            if(!isMoveable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveMsg, nil, verobj));
        }
        
        action()
        {
             



            if(((libGlobal.curAction).curIobj).contType == In)
                replaceAction(PutIn, self, ((libGlobal.curAction).curIobj));
            
             
            if(((libGlobal.curAction).curIobj).contType == On)
                replaceAction(PutOn, self, ((libGlobal.curAction).curIobj));        
            
             
            makeMovedTo(((libGlobal.curAction).curIobj));
        }
        
        report()
        {
            message('okay move to', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
    }
    
     



    movedTo = nil
    
     
    makeMovedTo(loc)  
    { 
        actionMoveInto(loc.location);
        if(location == loc.location)            
            movedTo = loc; 
        
    }
    
     
    canMoveToMe = true
    
    propertyset '*IobjMoveTo'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!canMoveToMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveToMsg, nil, verobj));           
            
            if(((libGlobal.curAction).curDobj).movedTo == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyMovedToMsg, nil, verobj));
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotMoveToSelfMsg, nil, verobj));
            
        }
        
    }
    

    cannotMoveToMsg = buildMessage('cannot move to', nil)
    

    cannotMoveToSelfMsg = buildMessage('cannot move to self', nil)
    

    alreadyMovedToMsg = buildMessage('already moved to', nil)
    
    propertyset '*DobjMoveAwayFrom'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isMoveable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotMoveMsg, nil, verobj));
        }
        
        action()
        {
            if(movedTo)
                movedTo = nil;
            else if(((libGlobal.curAction).curIobj).contType is in (In, On, Under, Behind))
                doInstead(TakeFrom, ((libGlobal.curAction).curDobj), ((libGlobal.curAction).curIobj));
        }
        
        report()
        {
            message('okay move from', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;   
        }
    } 
    
    propertyset '*IobjMoveAwayFrom'
    {
        verify()
        {
            if(((libGlobal.curAction).curDobj) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cantMoveAwayFromSelfMsg, nil, verobj));
            
            if(((libGlobal.curAction).curDobj).movedTo != self && contType not in (In, On, Under, Behind))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notMovedToMsg, nil, verobj));
        }
    }
    

    cantMoveAwayFromSelfMsg = buildMessage('cant move away from self', nil)
    
    notMovedToMsg = buildMessage('not by obj', nil)
    
     



    propertyset '*DobjLight'
    {
        preCond = [touchObj]
        
        verify() 
        {
            if(!isLightable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotLightMsg, nil, verobj)); 
            else if(isLit)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyLitMsg, nil, verobj));
        }
        
        action()
        {
            makeLit(true);
        }
        
        report()
        {
            message('okay lit', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    

    cannotLightMsg = buildMessage('cannot light', nil)
    
    alreadyLitMsg = buildMessage('already lit', nil)
    
     







    isExtinguishable = true
    
    propertyset '*DobjExtinguish'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isLit)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notLitMsg, nil, verobj));
            
            if(!isExtinguishable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotExtinguishMsg, nil, verobj));
            
        }
        
        action()
        {
            makeLit(nil);            
        }
        
        report()
        {
            message('extinguish', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
    notLitMsg = buildMessage('not lit', nil)
    

    cannotExtinguishMsg = buildMessage('cannot extinguish', nil)
    
        
    propertyset '*DobjEat'
    {
        preCond = [objHeld]
        
        verify() 
        { 
            if(!isEdible)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotEatMsg, nil, verobj)); 
        }
        
        action()
        {
            moveInto(nil);            
        }
        
        report()
        {
            message('eat', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
    cannotEatMsg = buildMessage('cannot eat', nil)
    
     
    isDrinkable = nil
    
    propertyset '*DobjDrink'
    {
        preCond = [touchObj]
        
        verify() 
        {
            if(!isDrinkable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDrinkMsg, nil, verobj)); 
            
        }
                
    }
        
    cannotDrinkMsg = buildMessage('not potable', nil,fluidName)
    
    
     




    isCleanable = true
    
     
    isClean = nil
    
     
    needsCleaning = nil
    
     



    mustBeCleanedWith = nil
    
    
     













    propertyset '*DobjClean'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isCleanable) 
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCleanMsg, nil, verobj));
            
            else if(isClean)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyCleanMsg, nil, verobj));        
        
            else if(!needsCleaning)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, noNeedToCleanMsg, nil, verobj));           
            
        }
        
        
        action() 
        {
            if(mustBeCleanedWith != nil)
                askMissingObject(CleanWith, IndirectObject);
            
            makeCleaned(true); 
        }
        
        report()
        {
            say(okayCleanMsg);
        }
    }
    
     





    makeCleaned(stat) { isClean = stat; }
    

    cannotCleanMsg = buildMessage('cannot clean', nil)
    

    alreadyCleanMsg = buildMessage('already clean', nil)
    

    noNeedToCleanMsg = buildMessage('no clean', nil)
        
    

    dontNeedCleaningObjMsg = buildMessage('dont need cleaning obj', nil)
    
    okayCleanMsg = message('okay clean', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))

    
    propertyset '*DobjCleanWith'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isCleanable) 
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCleanMsg, nil, verobj));
            
            else if(isClean)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyCleanMsg, nil, verobj));
        
            else if(!needsCleaning)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, noNeedToCleanMsg, nil, verobj));
            
            else if(mustBeCleanedWith == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, dontNeedCleaningObjMsg, nil, verobj));
            
            else if(valToList(mustBeCleanedWith).indexOf((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))) == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, cannotCleanWithMsg, nil, verobj));
        }
        
        
        action() { makeCleaned(true); }
        
        report()
        {
            say(okayCleanMsg);
        }
    }
    
     





      
    canCleanWithMe = nil
    
    propertyset '*IobjCleanWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canCleanWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotCleanWithMsg, nil, verobj)); 
        }
    }
    

    cannotCleanWithMsg = buildMessage('cannot clean with', nil)
    
     
    isDiggable = nil
    
    propertyset '*DobjDig'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isDiggable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDigMsg, nil, verobj)); 
        }
        
         





        action() { askMissingObject(DigWith, IndirectObject); }
    }
    
     
    canDigWithMe = nil
    
     





    propertyset '*DobjDigWith'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isDiggable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDigMsg, nil, verobj)); 
        }
    }
        
    propertyset '*IobjDigWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canDigWithMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDigWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotDigWithSelfMsg, nil, verobj));
        }
    }
    
    cannotDigMsg = buildMessage('cannot dig', nil)

    cannotDigWithMsg = buildMessage('cannot dig with', nil)

    cannotDigWithSelfMsg = buildMessage('cannot dig with self', nil)
    
    
     




    propertyset '*DobjTakeFrom' {         preCond { return preCondDobjTake; }         remap() { return remapDobjTake(); }         check() { checkDobjTake; }         action() { actionDobjTake(); }         report() { reportDobjTake(); }     }
    
    propertyset '*DobjTakeFrom'
    {           
        verify()
        {
            if(!isTakeable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTakeMsg, nil, verobj));
            
             
            local contained = nil;
            
             



            if(((libGlobal.curAction).curIobj))
            {
                if(((libGlobal.curAction).curIobj).notionalContents.indexOf(self))
                    contained = true;
            }
             



            else  
            {                
                for(local obj in ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList))
                {
                    if(obj.notionalContents.indexOf(self))
                    {
                        contained = true;
                        break;
                    }
                }
            }
            
             



            if(!contained)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notInMsg, nil, verobj));
            
             




            if((((libGlobal.curAction).curIobj) == self)
               || (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length == 1 && self == (((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTakeFromSelfMsg, nil, verobj));
        }        
    }
    
    propertyset '*IobjTakeFrom'
    {
        preCond = [touchObj]
        
        verify()       
        {          
             
            if(notionalContents.countWhich({x: !x.isFixed}) == 0)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(70, '', true, verobj));
            
             



            if(((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).overlapsWith(notionalContents) == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(80, '', true, verobj));        
        
        }      
    }
    
    notInMsg = buildMessage('not inside', nil,(((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).objInName)

    

    cannotTakeFromSelfMsg =  buildMessage('cannot take from self', nil)
    
     



    canSupply = nil
        
    propertyset '*DobjThrowAt'
    {
        preCond = [objHeld, objNotWorn]
        
        verify() { verifyDobjThrow(); }
        
        action()
        {
             







        }
    }
    
    
     



    canThrowAtMe = true
    
    propertyset '*IobjThrowAt'
    {
        preCond = [objVisible]
        
        verify()
        {
            if(!canThrowAtMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowAtMsg, nil, verobj));
            
            if(((libGlobal.curAction).curDobj) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowAtSelfMsg, nil, verobj));
        }
        
        
        action()
        {            
            ((libGlobal.curAction).curDobj).actionMoveInto(getOutermostRoom.dropLocation);
        }
        
        report()
        {
            local obj = (object: Thing              {                  plural = ((libGlobal.curAction).reportList.length > 1 ||                            (libGlobal.curAction).reportList[1].plural);                  isIt = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isIt : nil);                 isHim = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHim : nil);                 isHer = ((libGlobal.curAction).reportList.length == 1 ?                     (libGlobal.curAction).reportList[1].isHer : nil);                 name = makeListStr((libGlobal.curCommand).action.reportList, &theName);                  qualified = true;              } );
            ((libGlobal.curAction).setMessageParams('obj', obj));

            message('throw at', nil)
;            
        }
        
    }
    
     



    cannotThrowAtMsg = buildMessage('cannot throw at', nil)
    

    cannotThrowAtSelfMsg = buildMessage('cannot throw at self', nil)
    
    propertyset '*DobjThrowTo'
    {
        preCond = [objHeld, objNotWorn]
        
        verify() { verifyDobjThrow(); }
    }
    
     




    canThrowToMe = nil
    
    propertyset '*IobjThrowTo'
    {
        preCond = [objVisible]
        
        verify()
        {
            if(!canThrowToMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowToMsg, nil, verobj));
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotThrowToSelfMsg, nil, verobj));
        } 
        
    }
    

    cannotThrowToMsg = buildMessage('cannot throw to', nil)
    

    cannotThrowToSelfMsg = buildMessage('cannot throw to self', nil)
    

    throwFallsShortMsg = buildMessage('throw falls short', nil)
    
    canTurnMeTo = nil
    
    
     



    propertyset '*DobjTurnTo'
    {
        preCond = [touchObj]
        
        verify() 
        {
            if(!canTurnMeTo)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTurnToMsg, nil, verobj)); 
        }   
        
        check()
        {
            checkSetting(((libGlobal.curAction).literal));
        }
        
        action()
        {
            makeSetting(((libGlobal.curAction).literal));                        
        }
        
        report()
        {
            message('okay turn to', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName),                   ((libGlobal.curAction).literal))
;
        }
    }
    
     




    
    checkSetting(val) { }
    
     
    curSetting = ''
    

    cannotTurnToMsg = buildMessage('cannot turn to', nil)
    
    
    canSetMeTo = nil
    
    propertyset '*DobjSetTo'
    {
        preCond = [touchObj]
        
        verify() 
        { 
            if(!canSetMeTo)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotSetToMsg, nil, verobj)); 
        }
        
        check()
        {
             
            checkSetting(((libGlobal.curAction).literal));
        }
        
        action()
        {
            makeSetting(((libGlobal.curAction).literal));                       
        }
        
        report()
        {
            say(okaySetMsg);
        }
    }
       
    makeSetting(val) { curSetting = val; }
    
    okaySetMsg = buildMessage('okay set to', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName),         curSetting)

    

    cannotSetToMsg = buildMessage('cannot set to', nil)
    
    
     



    propertyset '*DobjGoTo'
    {
        verify()
        {
             



            if((libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyThereMsg, nil, verobj));
            
             



            if(isIn((libGlobal.curActor).getOutermostRoom))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyPresentMsg, nil, verobj));
            
             





            if(isDecoration)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(90, '', true, verobj));
        }
        
         




        
        action()
        {
             
            local dest = lastSeenAt ? lastSeenAt.getOutermostRoom : nil;
            
             




            local route = defined(pcRouteFinder) && lastSeenAt != nil 
                ? pcRouteFinder.findPath(
                    (libGlobal.curActor).getOutermostRoom, dest) : nil;
            
             



            if(route == nil)
                sayDontKnowHowToGetThere();
            
             




            else if(route.length == 1)
                sayDontKnowHowToReach();
            
             




            else
            {
                local idx = 2;
                local dir = route[2][1];
                local oldLoc = (libGlobal.playerChar).getOutermostRoom();
                
                local commonRegions =
                    (libGlobal.playerChar).getOutermostRoom.regionsInCommonWith(dest);
                
                local regionFastGoTo = 
                    commonRegions.indexWhich({r: r.fastGoTo }) != nil;
                
                local regionBriefGoTo = 
                    commonRegions.indexWhich({r: r.briefGoTo }) != nil;
                
                local fastGo = regionFastGoTo || regionBriefGoTo 
                    || gameMain.fastGoTo || gameMain.briefGoTo;
                local wasVerbose = gameMain.verbose;
                
                try
                {                   
                    
                    if(gameMain.briefGoTo || regionBriefGoTo)
                        gameMain.verbose = nil;
                    
                    Continue.takeStep(dir, getOutermostRoom, fastGo);                
                    
                    
                     



                    while((fastGo)
                          && oldLoc != (libGlobal.playerChar).getOutermostRoom 
                          && idx < route.length)
                    {
                        local dir = route[++idx][1];
                        if(idx == route.length())
                            gameMain.verbose = wasVerbose;
                        
                        Continue.takeStep(dir, getOutermostRoom, true);
                    }    
                    
                    
                }
                finally
                {
                    gameMain.verbose = wasVerbose;
                    
                    if((gameMain.briefGoTo || regionBriefGoTo) && wasVerbose && !(libGlobal.curActor).isIn(dest))
                        (libGlobal.curActor).getOutermostRoom.lookAroundWithin();
                }
            }
        }
    }
    
     




    sayDontKnowHowToGetThere() 
        { message('route unknown', nil);}
   
    sayDontKnowHowToReach()

        {  message('destination unknown', nil)
;}
    
    
    alreadyThereMsg = buildMessage('already there', nil)
    alreadyPresentMsg = buildMessage('already present', nil)
    
    
     





    isAttachable = nil
    
    propertyset '*DobjAttach'
    {
        preCond = [touchObj]        
        verify() 
        {
            if(!isAttachable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttachMsg, nil, verobj)); 
        }
        action() { askMissingObject(AttachTo, IndirectObject); }
    }
    
    propertyset '*DobjAttachTo'
    {
        preCond = [touchObj]        
        verify() 
        {
            if(!isAttachable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttachMsg, nil, verobj)); 
        }
    }
    
    canAttachToMe = nil
    
    propertyset '*IobjAttachTo'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canAttachToMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotAttachToMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotAttachToSelfMsg, nil, verobj));
        }
    }
    
    cannotAttachMsg = buildMessage('cannot attach', nil)

    cannotAttachToMsg = buildMessage('cannot attach to', nil)
    

    cannotAttachToSelfMsg = buildMessage('cannot attach to self', nil)
   
    
    isDetachable = nil
    
    propertyset '*DobjDetach'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isDetachable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDetachMsg, nil, verobj)); 
        }            
    }
    

    cannotDetachMsg = buildMessage('cannot detach', nil)
    
    
    propertyset '*DobjDetachFrom'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isDetachable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDetachMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotDetachFromSelfMsg, nil, verobj));
        }
    }

    canDetachFromMe = nil
    
    propertyset '*IobjDetachFrom'
    {
        verify()
        {
            if(!canDetachFromMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotDetachFromMsg, nil, verobj));
        }
    }
    

    cannotDetachFromMsg = buildMessage('cannot detach from', nil)
    

    cannotDetachFromSelfMsg = buildMessage('cannot detach from self', nil)
    
    
     



    
    isFastenable = nil
    
     
    isFastened = nil
    
     




    makeFastened(stat) { isFastened = stat; }
    
    propertyset '*DobjFasten'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isFastenable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFastenMsg, nil, verobj)); 
            
            if(isFastened)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyFastenedMsg, nil, verobj));
        }
        
        action() { makeFastened(true); }
        
        report()
        {
            message('okay fasten', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    

    cannotFastenMsg = buildMessage('cannot fasten', nil)
    

    alreadyFastenedMsg = buildMessage('already fastened', nil)

        
    
    propertyset '*DobjFastenTo'
    {
        preCond = [objHeld]
        verify() 
        {
            if(!isFastenable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFastenMsg, nil, verobj)); 
        }
    }
    
    canFastenToMe = nil
    
    propertyset '*IobjFastenTo'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canFastenToMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotFastenToMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotFastenToSelfMsg, nil, verobj));
        }  
    }
    

    cannotFastenToMsg = buildMessage('cannot fasten to', nil)
    

    cannotFastenToSelfMsg = buildMessage('cannot fasten to self', nil)
                                
    isUnfastenable = nil
    
    propertyset '*DobjUnfasten'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isUnfastenable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnfastenMsg, nil, verobj)); 
            
            if(!isFastened)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notFastenedMsg, nil, verobj));
        }
    }
    
    
    
    
    propertyset '*DobjUnfastenFrom'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isUnfastenable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnfastenMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnfastenFromSelfMsg, nil, verobj));
        }
    }
    
    canUnfastenFromMe = nil
    
    propertyset '*IobjUnfastenFrom'
    {
        preCond = [touchObj]
        verify()             
        {
            if(!canUnfastenFromMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnfastenFromMsg, nil, verobj)); 
        }
    }
    

    cannotUnfastenMsg = buildMessage('cannot unfasten', nil)
    

    cannotUnfastenFromMsg = buildMessage('cannot unfasten from', nil)
    

    cannotUnfastenFromSelfMsg = buildMessage('cannot unfasten from self', nil)

    notFastenedMsg = buildMessage('not fastened', nil)
    
     



    isPlugable = nil
    canPlugIntoMe = nil
    
                          
     



                      
    propertyset '*DobjPlugInto'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isPlugable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPlugMsg, nil, verobj));
            
            if(self == (((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPlugIntoSelfMsg, nil, verobj));            
        }        
        
    }
    
    propertyset '*IobjPlugInto'
    {
        preCond = [touchObj]
        verify()
        {          
            if(!canPlugIntoMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPlugIntoMsg, nil, verobj));
        }
    }
    
    

    cannotPlugMsg = buildMessage('cannot plug', nil)

    cannotPlugIntoSelfMsg = buildMessage('cannot plug into self', nil)

    cannotPlugIntoMsg = buildMessage('cannot plug into', nil)
    
    isUnplugable = (isPlugable)
    canUnplugFromMe = (canPlugIntoMe)
    
    propertyset '*DobjUnplugFrom'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isUnplugable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnplugMsg, nil, verobj));
            
            if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotUnplugFromSelfMsg, nil, verobj));
        }
    }
    
    propertyset '*IobjUnplugFrom'
    {
        preCond = []
        
        verify()
        {
            if(!canUnplugFromMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnplugFromMsg, nil, verobj));
            
           
        }
    }
    

    cannotUnplugMsg = buildMessage('cannot unplug', nil)
    

    cannotUnplugFromSelfMsg = buildMessage('cannot unplug from self', nil)
    

    cannotUnplugFromMsg = buildMessage('cannot unplug from', nil)
    
    propertyset '*DobjPlugIn'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isPlugable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPlugMsg, nil, verobj));
        }
    }
    
    propertyset '*DobjUnplug'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!isUnplugable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnplugMsg, nil, verobj));
        }
    }
    
     
    isKissable = true
    
     



    kissRank = 80
    
    propertyset '*DobjKiss'
    {
        preCond = [touchObj]
        
        
        verify() 
        { 
            if(!isKissable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotKissMsg, nil, verobj));
             
             



            (libGlobal.curAction).addVerifyResult(new VerifyResult(kissRank, '', true, verobj)); 
        }
        
        check()
        {
            if(dataType(&checkKissMsg) != 1)
                display(&checkKissMsg);
        }
        
        action()
        {
            if(dataType(&futileToKissMsg) != 1)
                display(&futileToKissMsg);
        }
        
        
        report()
        {

            message('report kiss', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
; 
        }
    }
    
    futileToKissMsg = nil
    
    cannotKissMsg = buildMessage('cannot kiss', nil)

     




    checkKissMsg = nil
    
     



    getOutToJump = true
    
     



    canJumpOffMe = ((libGlobal.curActor).location == self && contType == On)
    
    propertyset '*DobjJumpOff'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!canJumpOffMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotJumpOffMsg, nil, verobj));
        }
        
        action()
        {
             



            (libGlobal.curActor).actionMoveInto(exitLocation);
        }
        
        report()
        {
            message('jump off', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
    }
    
    cannotJumpOffMsg = buildMessage('cannot jump off', nil)
    
     
    canJumpOverMe = nil
    
     



    propertyset '*DobjJumpOver'
    {
        preCond = [touchObj]
        
        verify()
        {
            if(!canJumpOverMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotJumpOverMsg, nil, verobj)); 
            if(((libGlobal.curAction).curDobj) == (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotJumpOverSelfMsg, nil, verobj));
        }
    }
    
    cannotJumpOverMsg = buildMessage('pointless to jump over', nil)
    
    cannotJumpOverSelfMsg = buildMessage('cannot jump over self', nil)
    
    
     
    isSettable = nil
    
     



    propertyset '*DobjSet'
    {
        preCond = [touchObj]
        verify() 
        {
            if(!isSettable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotSetMsg, nil, verobj)); 
        }
    }
    

    cannotSetMsg = buildMessage('cannot set', nil)
    
     
    canTypeOnMe = nil
    
     





    propertyset '*DobjTypeOn'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canTypeOnMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTypeOnMsg, nil, verobj));  
        }
    }
    
    propertyset '*DobjTypeOnVague'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canTypeOnMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTypeOnMsg, nil, verobj)); 
        }        
        
        action() { askMissingLiteral(TypeOn, DirectObject); }
    }
    

    cannotTypeOnMsg = buildMessage('cannot type on', nil)
    
    
     




    canEnterOnMe = nil
    
    
     




    propertyset '*DobjEnterOn'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canEnterOnMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotEnterOnMsg, nil, verobj)); 
        }
    }
    

    cannotEnterOnMsg = buildMessage('cannot enter on', nil)
    
    
     
    canWriteOnMe = nil
    
     
    propertyset '*DobjWriteOn'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canWriteOnMe)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotWriteOnMsg, nil, verobj)); 
        }        
        
    }
    

    cannotWriteOnMsg = buildMessage('cannot write on', nil)
    
     
    isConsultable = nil
    
     




    propertyset '*DobjConsultAbout'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isConsultable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotConsultMsg, nil, verobj)); 
        }
        
    }
    

    cannotConsultMsg = buildMessage('cannot consult', nil)
    
     



    isPourable = nil
    
    
     






    fluidName = theName
    
     





    propertyset '*DobjPour'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isPourable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPourMsg, nil, verobj)); 
        }
    }
    
    propertyset '*DobjPourOnto'
    {
        preCond = [touchObj]
        
        verify()
        { 
            if(!isPourable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPourMsg, nil, verobj)); 
        }
    }
    
     




      
    canPourOntoMe = true
    
     



    allowPourOntoMe = nil
    
    
    
    propertyset '*IobjPourOnto'
    {
        preCond = [touchObj]
        
        remap = (remapOn)
        
        verify()
        {
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPourOntoSelfMsg, nil, verobj));
            
            if(!canPourOntoMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPourOntoMsg, nil, verobj));
            else if(!allowPourOntoMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, shouldNotPourOntoMsg, nil, verobj));
           
        }    
    }
    
    
    
    
    propertyset '*DobjPourInto'
    {
        preCond = [touchObj]
        verify()
        { 
            if(!isPourable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPourMsg, nil, verobj)); 
        }
    }
    
     




    canPourIntoMe = (contType == In || remapIn != nil)
    
    
     



    allowPourIntoMe = nil
    
    propertyset '*IobjPourInto'
    {
        preCond = [touchObj]
        
        remap = (remapIn) 
        
        verify()
        {
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPourIntoSelfMsg, nil, verobj));
            
            if(!canPourIntoMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPourIntoMsg, nil, verobj));
            else if(!allowPourIntoMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, shouldNotPourIntoMsg, nil, verobj));
        }
    }
    
    cannotPourMsg = buildMessage('cannot pour', nil,fluidName)


    cannotPourOntoSelfMsg = buildMessage('cannot pour on self', nil)

    cannotPourIntoSelfMsg = buildMessage('cannot pour in self', nil)

    cannotPourIntoMsg = buildMessage('cannot pour into', nil,((libGlobal.curAction).curDobj).fluidName)

    cannotPourOntoMsg = buildMessage('cannot pour onto', nil,((libGlobal.curAction).curDobj).fluidName)

    shouldNotPourIntoMsg = buildMessage('should not pour into', nil,((libGlobal.curAction).curDobj).fluidName)
    

    shouldNotPourOntoMsg = buildMessage('should not pour onto', nil,((libGlobal.curAction).curDobj).fluidName)
  
    
    
     
    isScrewable = nil
    
     
    canScrewWithMe = nil
    
     




    propertyset '*DobjScrew'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isScrewable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotScrewMsg, nil, verobj)); 
        }        
    }
    
    propertyset '*DobjScrewWith'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isScrewable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotScrewMsg, nil, verobj)); 
        }       
    }
    
    propertyset '*IobjScrewWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canScrewWithMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotScrewWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotScrewWithSelfMsg, nil, verobj));
        }        
    }
    
    isUnscrewable = (isScrewable)
    canUnscrewWithMe = (canScrewWithMe)
    
    propertyset '*DobjUnscrew'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isUnscrewable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnscrewMsg, nil, verobj)); 
        }        
    }
    
    propertyset '*DobjUnscrewWith'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!isUnscrewable)
               (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnscrewMsg, nil, verobj)); 
        }      
    }
    
    propertyset '*IobjUnscrewWith'
    {
        preCond = [objHeld]
        verify() 
        { 
            if(!canUnscrewWithMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotUnscrewWithMsg, nil, verobj)); 
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotUnscrewWithSelfMsg, nil, verobj));
        }        
    }
    
    cannotScrewMsg = buildMessage('cannot screw', nil)
    cannotScrewWithMsg = buildMessage('cannot screw with', nil)
 
    cannotScrewWithSelfMsg = buildMessage('cannot screw with self', nil)
    cannotUnscrewMsg = buildMessage('cannot unscrew', nil)

    cannotUnscrewWithMsg = buildMessage('cannot unscrew with', nil)

    cannotUnscrewWithSelfMsg = buildMessage('cannot unscrew with self', nil)
    
    
     





    verifyPushTravel(via)
    {
        viaMode = via;
        
        if(!canPushTravel && !canPullTravel)
            (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushTravelMsg, nil, verobj));
        
        if(matchPushOnly && !canPushTravel)
            (libGlobal.curAction).addVerifyResult(new VerifyResult(35, cannotPushTravelMsg, nil, verobj));
        
        if(matchPullOnly && !canPullTravel)
            (libGlobal.curAction).addVerifyResult(new VerifyResult(35, cannotPushTravelMsg, nil, verobj));       
        
        
        if((libGlobal.curActor).isIn(self))
            (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotPushOwnContainerMsg, nil, verobj));
        
        if((((libGlobal.curAction).curIobj) ?? (((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).iobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) == self)
            (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPushViaSelfMsg, nil, verobj));            
        
    }
    
     




    matchPushOnly = nil
    
    
     




    matchPullOnly = nil
    
       
    viaMode = ''
    

    cannotPushOwnContainerMsg = buildMessage('cannot push own container', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])), ((libGlobal.curAction).curDobj).objInPrep)

    

    cannotPushViaSelfMsg = buildMessage('cannot push via self', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])), viaMode.prep)
    
     



    canPushTravel = nil
    
     




    canPullTravel = canPushTravel
    
     



    propertyset '*DobjPushTravelDir'
    {
        preCond = [touchObj, travelPermitted]
        
        check()
        {
             
            local conn;
            
             
            local loc = getOutermostRoom;
            
             
            local dirn = (libGlobal.curCommand).verbProd.dirMatch.dir;
            
            if(loc.propType(dirn.dirProp) == 5)
            {
                 
                conn = loc.(dirn.dirProp);
                
                 




                if(conn.ofKind(UnlistedProxyConnector))
                {
                     
                    dirn = conn.direction; 
                    
                     
                    conn = loc.propType(dirn.dirProp) == 5 ? loc.(dirn.dirProp) : nil;
                    
                }                                 
                
                 
                if(dataType(conn) == 5)
                {                    
                    if(!conn.setTravelPosture())
                        throw new ExitSignal();
                    
                    if(conn.checkTravelBarriers(self))
                        conn.checkTravelBarriers((libGlobal.curActor));
                    
                    
                }
            }
            
            
        }
    }
    
     
    sayPushTravel(dir)
    {

        message('before push travel dir', nil,dir.departureName)
;   
        "<.p>";
    }    
    
     
    pushTravelRevealItems()
    {
         





        revealOnMove();
        
         


        
        (libGlobal.curCommand).afterReport();
        
         



        (libGlobal.curCommand).afterReports = [];   
    }
    
    
        
    cannotPushTravelMsg()
    {
        if(isFixed)
            return cannotTakeMsg;
        return buildMessage('cannot push travel', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])))
;
    }

    
     
    checkPushTravel()
    {
         




        if(checkTravelBarriers((libGlobal.curActor)))        
            checkTravelBarriers(((libGlobal.curAction).curDobj));     
        
              
    }
    
     
    doPushTravel(via)
    {
         





        pushTravelRevealItems();       
                 
        if(!((libGlobal.curAction).curIobj).isLocked)
            describePushTravel(via); 
        
         





        local wasHidden;
        
         
        local oldLoc = (libGlobal.curActor).getOutermostRoom;
        try
        {
            wasHidden = propType(&isHidden) is in (11, 12) ?
                    getMethod(&isHidden) : isHidden;
            
            isHidden = true;
            
            ((libGlobal.curAction).curIobj).travelVia((libGlobal.curActor));
        }
        finally
        {
            if(dataTypeXlat(wasHidden) is in (11, 12))
                setMethod(&isHidden, wasHidden);
            else
                isHidden = wasHidden;
        }
              
        
         


        
        
        if((libGlobal.curActor).isIn(((libGlobal.curAction).curIobj).getDestination(oldLoc)))
        {
            ((libGlobal.curAction).curIobj).travelVia(((libGlobal.curAction).curDobj));
            ((libGlobal.curAction).curDobj).describeMovePushable(self, (libGlobal.curActor).location);
        }
    }
    
    
    beforeMovePushable(connector, dir)
    {
         
        local conn = connector;
         
         



        if(connector.ofKind(UnlistedProxyConnector))
        {
             
            local loc = getOutermostRoom;
            
                    
             
            local prop = connector.direction.dirProp;
            
            if(loc.propType(prop) == 5)  
            {
                
                 
                conn = loc.(prop);                
                
                 
                ((libGlobal.curAction).curIobj) = conn; 
            }
            else
            {
                 
                dir = connector.direction;
                
                 
                conn = nil;
            }
        }
            
         




         
        if(conn && dataType(conn == 5))
            conn.beforeTravelNotifications(self);        
        
        
        if(((libGlobal.curAction).curIobj))
            describePushTravel((libGlobal.curAction).viaMode);    
        
         



        else if(objOfKind(conn, TravelConnector))
            sayPushTravel(dir);
        
         



    }
    
    describeMovePushable (connector, dest)
    {
        local obj = self;
        ((libGlobal.curAction).setMessageParams('obj', obj,'dest', dest));
        message('describe move pushable', nil);
        
    }
    
     







    describePushTravel(via)
    {
         
        if(((libGlobal.curAction).curIobj) && ((libGlobal.curAction).curIobj).propType(&traversalMsg) != 1)
            message('push travel traversal', nil,((libGlobal.curAction).curIobj).traversalMsg)
;
        else

            message('push travel somewhere', nil,via.prep)
; 
        
        "<.p>";
    }
    
   
    
     



    propertyset '*DobjPushTravelThrough'    
    {
        preCond = [touchObj]
        verify()   {   verifyPushTravel(Through);   }
        
        action() { doPushTravel(Through); }
    }
    
    propertyset '*IobjPushTravelThrough'
    {
        preCond = [travelPermitted, touchObj]
        verify() 
        {  
            if(!canGoThroughMe || getDestination((libGlobal.curActor).getOutermostRoom) == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushThroughMsg, nil, verobj));
        }
        
        check() { checkPushTravel(); }       
    }
    

    cannotPushThroughMsg = buildMessage('cannot push through', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])))
    
    
     





         
    propertyset '*DobjPushTravelEnter'
    {
        preCond = [touchObj]
        verify()  {  verifyPushTravel(Into);  }        
        
    }
    

    okayPushIntoMsg = buildMessage('okay push into', nil)
    
    propertyset '*IobjPushTravelEnter'
    {
        preCond = [containerOpen]
        verify() 
        {  
            if(!isEnterable)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushIntoMsg, nil, verobj));
        }
        
        check() 
        {             
            checkInsert((libGlobal.curActor));            
            checkInsert(((libGlobal.curAction).curDobj));
        }    
        
        action() 
        {
            ((libGlobal.curAction).curDobj).actionMoveInto(self);
            (libGlobal.curActor).actionMoveInto(self);
            
            if(((libGlobal.curAction).curDobj).isIn(self))
                say(okayPushIntoMsg);
        }
    }
    

    cannotPushIntoMsg = buildMessage('cannot push into', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])))
    
    propertyset '*DobjPushTravelGetOutOf'
    {
        preCond = [touchObj]
        verify()
        {
            verifyPushTravel(OutOf);
            if(!self.isIn(((libGlobal.curAction).curIobj)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, notInMsg, nil, verobj));
        }
        
        
        
    }
    
    propertyset '*IobjPushTravelGetOutOf'
    {
        preCond = [touchObj]
        
        verify() 
        {  
            if(!(libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, actorNotInMsg, nil, verobj));   
            
        }
        
        action()
        {
            ((libGlobal.curAction).curDobj).actionMoveInto(location);
            if(((libGlobal.curAction).curDobj).location ==  location)
            {
                say(okayPushOutOfMsg);
                (libGlobal.curActor).actionMoveInto(location);
            }
        }
       
    }
    

    okayPushOutOfMsg = buildMessage('okay push out of', nil)
    
    propertyset '*DobjPushTravelClimbUp'
    {
        preCond = [touchObj]
        verify()  {  verifyPushTravel(Up);  }
        
        action() { doPushTravel(Up); }
    }
    
    propertyset '*IobjPushTravelClimbUp'
    {
        preCond = [travelPermitted, touchObj]
        
        verify() 
        {  
            if(!isClimbable || getDestination((libGlobal.curActor).getOutermostRoom) == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushUpMsg, nil, verobj));
        }
        
        check() { checkPushTravel(); }
    }
    

    cannotPushUpMsg = buildMessage('cannot push up', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])))
    
    propertyset '*DobjPushTravelClimbDown'
    {
        preCond = [touchObj]
        verify()  { verifyPushTravel(Down);  }
        
        action() { doPushTravel(Down); }
    }
    
    propertyset '*IobjPushTravelClimbDown'
    {
        preCond = [travelPermitted, touchObj]
        
        verify() 
        {  
            if(!canClimbDownMe || getDestination((libGlobal.curActor).getOutermostRoom) == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPushDownMsg, nil, verobj));
        }
        
        check() { checkPushTravel(); }
    }
    

    cannotPushDownMsg = buildMessage('cannot push down', nil,((libGlobal.curCommand) == nil || (libGlobal.curCommand).verbProd == nil ? ''     : (((libGlobal.curCommand).verbProd.tokenList[1])[1])))
    
     
















    canTalkToMe = nil
    
    
    propertyset '*DobjAskAbout'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
    propertyset '*DobjAskFor'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
    
    propertyset '*DobjTellAbout'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
        
    propertyset '*DobjSayTo'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
     




    allowImplicitSay = nil
    
    propertyset '*DobjQueryAbout'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
    propertyset '*DobjTalkAbout'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    
    propertyset '*DobjTalkTo'
    {
        preCond = [canTalkToObj]
        verify() 
        { 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotTalkToSelfMsg, nil, verobj));
            
            else if(!canTalkToMe)
              (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTalkToMsg, nil, verobj)); 
        }
    }
    

    cannotTalkToMsg = buildMessage('cannot talk', nil)
    

    cannotTalkToSelfMsg = buildMessage('cannot talk to self', nil)
        
    
    propertyset '*DobjGiveTo'
    {
        preCond = [objHeld, objNotWorn]
        verify()
        {
            if(isIn(((libGlobal.curAction).curIobj)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, alreadyHasMsg, nil, verobj));
        }
    
        report()
        {
            if((libGlobal.curAction).summaryReport != nil)
                dmsg((libGlobal.curAction).summaryReport, makeListStr((libGlobal.curCommand).action.reportList, &theName));
            
            if((libGlobal.curAction).summaryProp != nil)
                ((libGlobal.curAction).curIobj).((libGlobal.curAction).summaryProp);
        }
    }
    

    alreadyHasMsg = buildMessage('already has', nil)
    
    propertyset '*IobjGiveTo'
    {
        preCond = [touchObj]
        verify() 
        { 
            if(!canTalkToMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotGiveToMsg, nil, verobj)); 
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotGiveToSelfMsg, nil, verobj));
        }
        
    }
    

    cannotGiveToMsg = buildMessage('cannot give to', nil)
    

    cannotGiveToSelfMsg = buildMessage('cannot give to self', nil)
    
    propertyset '*DobjShowTo'
    {
        preCond = isFixed ? [objVisible] : [objHeld]  
        report()
        {
            if((libGlobal.curAction).summaryReport != nil)
                dmsg((libGlobal.curAction).summaryReport, makeListStr((libGlobal.curCommand).action.reportList, &theName));
            
            if((libGlobal.curAction).summaryProp != nil)
                ((libGlobal.curAction).curIobj).((libGlobal.curAction).summaryProp);
        }
    }
    
    propertyset '*IobjShowTo'
    {
        preCond = [touchObj]
        verify() 
        {
            if((libGlobal.curActor) == self)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotShowToSelfMsg, nil, verobj));
            else if(!canTalkToMe)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotShowToMsg, nil, verobj));
        }
    }
    

    cannotShowToMsg = buildMessage('cannot show to', nil)
    

    cannotShowToSelfMsg = buildMessage('cannot show to self', nil)
    
    
    propertyset '*DobjShowToImplicit'
    {
        preCond = isFixed ? [objVisible] : [objHeld]
        
        verify() 
        {
            if((libGlobal.curActor).currentInterlocutor == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notTalkingToAnyoneMsg, nil, verobj));
            else if(!Q.canTalkTo((libGlobal.curActor), (libGlobal.curActor).currentInterlocutor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, noLongerTalkingToAnyoneMsg, nil, verobj));            
            
        }
        
        action()
        {
            (libGlobal.curActor).currentInterlocutor.handleTopic(&showTopics, [self]);
        }
        
        report()
        {
            if((libGlobal.curAction).summaryReport != nil)
                dmsg((libGlobal.curAction).summaryReport, makeListStr((libGlobal.curCommand).action.reportList, &theName));
            
            if((libGlobal.curAction).summaryProp != nil)
                (libGlobal.curActor).currentInterlocutor.((libGlobal.curAction).summaryProp);
        }
    }
    
    propertyset '*DobjGiveToImplicit'
    {
        preCond = [objHeld]
        
        verify() 
        {
            if((libGlobal.curActor).currentInterlocutor == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, notTalkingToAnyoneMsg, nil, verobj));
            else if(!Q.canTalkTo((libGlobal.curActor), (libGlobal.curActor).currentInterlocutor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, noLongerTalkingToAnyoneMsg, nil, verobj));            
            
        }
        
        action()
        {
             (libGlobal.curActor).currentInterlocutor.handleTopic(&giveTopics, [self]);
        }
        
        report()
        {
            if((libGlobal.curAction).summaryReport != nil)
                dmsg((libGlobal.curAction).summaryReport, makeListStr((libGlobal.curCommand).action.reportList, &theName));
            
            if((libGlobal.curAction).summaryProp != nil)
                (libGlobal.curActor).currentInterlocutor.((libGlobal.curAction).summaryProp);
        }
    }
    

    notTalkingToAnyoneMsg = buildMessage('not talking to anyone', nil)
    

    noLongerTalkingToAnyoneMsg = buildMessage('no longer talking to anyone', nil)
    
   
    propertyset '*DobjSpecialAction'
    {
        verify() 
        {
            (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cantSpecialActionMsg, nil, verobj));
        }
    }
    
    cantSpecialActionMsg = buildMessage('cant do special', nil,(libGlobal.curAction).specialPhrase)

    
    

     
    
    
     




    propertyset '*DobjPurloin'
    {
        verify()
        {
            if(isDirectlyIn((libGlobal.curActor)))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, alreadyHeldMsg, nil, verobj));

            if(self == (libGlobal.curActor))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(20, cannotPurloinSelfMsg, nil, verobj));
                        
            if(isFixed)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotTakeMsg, nil, verobj));
            
            if(ofKind(Room))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(30, cannotPurloinRoomMsg, nil, verobj));
            
            if((libGlobal.curActor).isIn(self))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotPurloinContainerMsg, nil, verobj));
            
            (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
        }
        
        check() {}
        
        action()
        {
             





            moveInto((libGlobal.curActor));
            
             



            isHidden = nil;
            
             




            if((libGlobal.playerChar).canSee(self))
                ((libGlobal.playerChar).setHasSeen(self));
        }
        
        report()
        {
            message('purloin', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName))
;
        }
    }
        

    cannotPurloinSelfMsg = buildMessage('cannot purloin self', nil)

    cannotPurloinRoomMsg = buildMessage('cannot purloin room', nil)

    cannotPurloinContainerMsg = buildMessage('cannot purloin container', nil)
    
    
     



    propertyset '*DobjGoNear'
    {       
        verify()
        {
            if(getOutermostRoom == nil)
                (libGlobal.curAction).addVerifyResult(new VerifyResult(40, cannotGoNearThereMsg, nil, verobj));
            
            if(ofKind(Room))
                (libGlobal.curAction).addVerifyResult(new VerifyResult(120, '', true, verobj));
        }
        
        action()
        {

            message('gonear', nil)
;
            getOutermostRoom.travelVia((libGlobal.curActor));
        }
    }
    
     
    
    cannotGoNearThereMsg = buildMessage('cannot go there', nil)
    

;


thingPreinit: PreinitObject
    execute()
    {
        forEachInstance(Thing, {obj: obj.preinitThing }); 
        
         




        foreach(local cur in getPlayerChar().contents)
            ((libGlobal.playerChar).setKnowsAbout(cur));
    }
    
    execBeforeMe = [pronounPreinit]
;

 





class Player: Actor
    
     
    isFixed = true       
    
     




    person = 2  
    
     
     
    isInitialPlayerChar = true
    
    isProper = true
;

 




class Key: Thing
    
     
    actualLockList = []
    
     




    plausibleLockList = []
    
     






    knownLockList = []
    
     



    isPossibleKeyFor(obj)
    {
         







        
        if(obj.lexicalParent != nil && obj.lexicalParent.remapIn == obj
           &&(knownLockList.indexOf(obj.lexicalParent) != nil
              || plausibleLockList.indexOf(obj.lexicalParent) != nil))
            return true;
        
         



        return knownLockList.indexOf(obj) != nil ||
            plausibleLockList.indexOf(obj) != nil;
    }
    
     
    canUnlockWithMe = true
    
    propertyset '*IobjUnlockWith'
    {
        preCond = [objHeld]
        
               
        verify()
        {
            inherited;
            
             



            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) && isPossibleKeyFor((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
            
             
            else
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, notAPlausibleKeyMsg, nil, verobj));            
        }
        
        check()
        {
             














            
            if(actualLockList.indexOf(((libGlobal.curAction).curDobj)) == nil
               && (((libGlobal.curAction).curDobj).lexicalParent == nil
               || ((libGlobal.curAction).curDobj).lexicalParent.remapIn != ((libGlobal.curAction).curDobj)
               || actualLockList.indexOf(((libGlobal.curAction).curDobj).lexicalParent) == nil))
                say(keyDoesntFitMsg);              
        }
        
        action()
        {
             
            ((libGlobal.curAction).curDobj).makeLocked(nil);
            
             
            if(knownLockList.indexOf(((libGlobal.curAction).curDobj)) == nil)
                knownLockList += ((libGlobal.curAction).curDobj);
        }
        
        report()
        {
            message('okay unlock with', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
        
    }
    
    okayUnlockWithMsg = '{I} unlock{s/ed} {the dobj} with {the iobj}. '
    
    propertyset '*IobjLockWith'
    {
        preCond = [objHeld]
        
        verify()
        {
            inherited;
            
            if((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)) && isPossibleKeyFor((((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj))))
                (libGlobal.curAction).addVerifyResult (new VerifyResult(100, '', true, verobj));
            else
                (libGlobal.curAction).addVerifyResult(new VerifyResult(35, notAPlausibleKeyMsg, nil, verobj));            
        }
        
        check()
        {
             














             if(actualLockList.indexOf(((libGlobal.curAction).curDobj)) == nil
               && (((libGlobal.curAction).curDobj).lexicalParent == nil
               || ((libGlobal.curAction).curDobj).lexicalParent.remapIn != ((libGlobal.curAction).curDobj)
               || actualLockList.indexOf(((libGlobal.curAction).curDobj).lexicalParent) == nil))
                say(keyDoesntFitMsg);              
        }
        
        action()
        {
             
            ((libGlobal.curAction).curDobj).makeLocked(true);
            
             
            if(knownLockList.indexOf(((libGlobal.curAction).curDobj)) == nil)
                knownLockList += ((libGlobal.curAction).curDobj);
        }
        
        report()
        {
             message('okay lock with', nil,makeListStr((libGlobal.curCommand).action.reportList, &theName));
        }
    }
    
     
    okayLockWithMsg = '{I} lock{s/ed} {the dobj} with {the iobj}. '
    
     




    notAPlausibleKeyMsg = '\^<<theName>> clearly won\'t work on <<(((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).theName>>. '
    
     
    keyDoesntFitMsg = '\^<<theName>> won\'t fit <<(((libGlobal.curAction).curDobj) ?? (((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList).length > 0 ? ((libGlobal.curCommand).dobjs.mapAll({x: x.obj}).toList)[1] : failVerifyObj)).theName>>. '
    
    preinitThing()
    {
        inherited;
        
         




        plausibleLockList = plausibleLockList.appendUnique(actualLockList);
        
    }
    
;

 







































class SubComponent : Thing
     



    isFixed = true

      
    preinitThing() {
         



        if(location == nil)
            location = lexicalParent;
        
        initializeSubComponent(location);
        
         
        origVocabLikelihood = vocabLikelihood;
        
        
        
        inherited;
    }
   
      
    origVocabLikelihood = 0
    
      



    contType() {
        if (location == nil)
            return inherited;
        if(location.remapIn == self)
            return In;
        else if(location.remapOn == self)
            return On;
        else if(location.remapUnder == self)
            return Under;
        else if(location.remapBehind == self)
            return Behind;
        return inherited;
    }

     


    listOrder() {
        if (contType != nil)
            return contType.listOrder;
        return inherited;
    }

     






    name() {         if (location != nil)             return location.name;         else             return inherited;         }
    proper() {         if (location != nil)             return location.proper;         else             return inherited;         }
    qualified() {         if (location != nil)             return location.qualified;         else             return inherited;         }
    person() {         if (location != nil)             return location.person;         else             return inherited;         }
    plural() {         if (location != nil)             return location.plural;         else             return inherited;         }
    massNoun() {         if (location != nil)             return location.massNoun;         else             return inherited;         }
    isHim() {         if (location != nil)             return location.isHim;         else             return inherited;         }
    isHer() {         if (location != nil)             return location.isHer;         else             return inherited;         }
    isIt() {         if (location != nil)             return location.isIt;         else             return inherited;         }
    aName() {         if (location != nil)             return location.aName;         else             return inherited;         }
    theName() {         if (location != nil)             return location.theName;         else             return inherited;         }
    owner() {         if (location != nil)             return location.owner;         else             return inherited;         }
    ownerNamed() {         if (location != nil)             return location.ownerNamed;         else             return inherited;         }


     

    matchName(tokens) {
        local match = inherited(tokens);

        if(location != nil) {
            if(match != 0 || Q.scopeList((libGlobal.curActor)).toList().indexOf(location) == nil) {
                vocabLikelihood = origVocabLikelihood;
            } else {
                vocabLikelihood = origVocabLikelihood - 15;
            }
            match |= location.matchName(tokens);
        } else {
            vocabLikelihood = origVocabLikelihood;
        }

        return match;
    }
    
    matchNameDisambig(tokens)
    {
        local match = inherited(tokens);
        if(location != nil)
            match |= location.matchNameDisambig(tokens);
        return match;
    }

     




     
    filterResolveList(np, cmd, mode)
    {       
        if(np.matches.length > 1)
        {
            if((libGlobal.curActor).isIn(self) && contType == In)
                np.matches = np.matches.subset({m: m.obj == self});
            else
                np.matches = np.matches.subset({m: m.obj != self});
        }
    }
    
     



    nameAs(parent) {}

     






    initializeSubComponent(parent) 
    {       
        if(parent.remapIn == self)
        {
            parent.getFacets = valToList(parent.getFacets).appendUnique([self]);
            getFacets = valToList(getFacets).appendUnique([parent]);
            
            
             




            if(lexicalParent == nil && vocabLikelihood == 0)
                vocabLikelihood = 10;
        }
    } 
    
     



    exitLocation = (location == nil ? lexicalParent.location : location.location)
;


 




class MultiLoc: object
    
     





    locationList = []
    
    
     


   
    initialLocationList = []
    
     



    
    exceptions = []
    
    
     






    initialLocationClass = nil
    
     






    isInitiallyIn(obj) { return true; }
    
     




    
    addToLocations()
    {
         








        if(initialLocationList == nil || initialLocationList.length == 0)
        {
            initialLocationList = locationList;
            locationList = [];               
        }
        
         
        local locationVec = new Vector(10);
        
         




        foreach(local loc in valToList(initialLocationList))
        {           
            loc.addToContents(self, locationVec);             
        }
        
         





        if(initialLocationClass != nil)
        {
            for(local obj = firstObj(initialLocationClass); obj != nil; obj =
                nextObj(obj, initialLocationClass))   
            {
                if(isInitiallyIn(obj))
                    obj.addToContents(self, locationVec);
            }
        }
        
         




        foreach(local loc in valToList(exceptions))            
        {
            loc.removeFromContents(self, locationVec); 
        }
        
         


        locationList = locationVec.toList();
    }
      
     


      
   moveIntoAdd(locs)
    {
        locs = valToList(locs);
        foreach(local loc in locs)
             



            loc.moveMLIntoAdd(self);
    }
    
     

         
    moveOutOf(loc)
    {
         



        loc.moveMLOutOf(self);        
    }
    
     



    
    moveInto(loc)
    {
        foreach(local cur in locationList)
            cur.removeFromContents(self);
        
        locationList = [];
        
        if(loc != nil)
            moveIntoAdd(loc);
    }
    
        
     


    
    isDirectlyIn(loc)
    {               
        if(loc != nil)
            return valToList(loc.contents).indexOf(self) != nil;
        
         




        return locationList == [];
    }
    
     


    
    isIn(loc)
    {
        return isDirectlyIn(loc) 
            || locationList.indexWhich({x: x.isIn(loc)}) != nil;    
    }
    
    
    
     







    
    location()
    {
         



         if(locationList.length == 0)
            return nil;       
        
         



        local rm = (libGlobal.curActor) == nil ? (libGlobal.playerChar).getOutermostRoom :
        (libGlobal.curActor).getOutermostRoom;
             
        
         


        
        if(isDirectlyIn(rm))
            return rm;
        
         


        
        local loc = locationList.valWhich({x: x.isIn(rm)});
        
        if(loc != nil)
            return loc;
        
        
         



        
        local actor = (libGlobal.curActor) ?? (libGlobal.playerChar);
        
        foreach(local r in valToList(actor.visibleRooms))
        {
            loc = locationList.valWhich({x: x.isOrIsIn(r)});
            
            if(loc)
                return loc;
        
        }
        
        
         



        if(lastSeenAt != nil && locationList.indexOf(lastSeenAt) != nil)        
            return lastSeenAt;    
        
          




         
        return locationList[1];
    }   
;

 








class Floor: MultiLoc, Thing
     



    isFixed = true
    
    isDecoration = true
    
     
    initialLocationClass = Room
    
     
    contType = On
    
     





    isInitiallyIn(obj) { return obj.floorObj == self; }
    
     




    
    contents = (isIn((libGlobal.playerChar).outermostVisibleParent)) ?         
                  ((libGlobal.playerChar).outermostVisibleParent().contents - self) : []   
    
     




    decorationActions = [Examine, TakeFrom]
    
    
     




    
    contentsListed = nil        
;


 



defaultGround: Floor
;

 
multiLocInitiator: PreinitObject
    execute()
    {
         



        for(local cur = firstObj(MultiLoc); cur !=nil ; cur = nextObj(cur,
            MultiLoc))
            
            cur.addToLocations();
    }
    
     



    execBeforeMe = [regionPreinit]
;




 







class Topic: Mentionable
    construct(name_)
    {        
        vocab = name_;
        initVocab();
    }
    
     


    
    familiar = true
    
        
    setKnown() { (libGlobal.playerChar).setKnowsAbout(self); }
    
     
    known = ((libGlobal.playerChar).knowsAbout(self)) 
    
     



    getTopicText()
    {
        return name == nil ? vocab : name;
    }
    
     
    newlyCreated = nil
;

 
class EndConvBlocker: object;
class AgendaManager: object;
class ActorTopicDatabase: TopicDatabase;
class TopicDatabase: object;


 





class Actor: EndConvBlocker, AgendaManager, ActorTopicDatabase, Thing
    isFixed = true
    contType = Carrier
    ownsContents = true
    mood = nil
    stance = nil
    cannotTalkToMsg = buildMessage('cannot talk basicactor', nil)
    cannotGiveToMsg = cannotTalkToMsg
    cannotShowToMsg = cannotTalkToMsg
    isAttackable = true
    checkAttackMsg = cannotAttackMsg    
    
     
    contentsListedInExamine = true
    examineStatus()
    {
        inherited();
                       
        if(contentsListedInExamine && listableContents.length > 0)        
            nestedActorAction(self, Inventory);      
        
    }
;

