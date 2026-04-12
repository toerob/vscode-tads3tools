

 









 



 
 



property lookAroundShowExits;


 
 




class SenseInfo: object
    construct(obj, trans, obstructor, ambient)
    {
         
        self.obj = obj;

         
        self.trans = trans;
        self.obstructor = obstructor;

         



        self.ambient = (ambient != nil
                        ? adjustBrightness(ambient, trans)
                        : nil);
    }
    
     
    obj = nil

     
    trans = nil

     
    obstructor = nil

     
    ambient = nil

     





    compareTransTo(other) { return transparencyCompare(trans, other.trans); }

     





    selectMoreTrans(a, b)
    {
         
        if (a == nil)
            return b;
        else if (b == nil)
            return a;
        else if (a.compareTransTo(b) >= 0)
            return a;
        else
            return b;
    }
;

 



class CanTouchInfo: object
     
    construct(path) { touchPath = path; }
    
     
    touchPath = nil

     





    
;

 













senseInfoTableSubset(senseTab, func)
{
    local vec;
    
     
    vec = new Vector(32);

     
    senseTab.forEachAssoc(function(obj, info)
    {
         
        if ((func)(obj, info))
            vec.append(obj);
    });

     
    return vec;
}

 















transient senseTmp: object
     




    pointOfView = nil

     
    notifyList = static new Vector(16)
;


 
 











class CheckStatus: object
     
    isSuccess = nil

     



    msgProp = nil
    msgParams = []
;

 




checkStatusSuccess: CheckStatus
    isSuccess = true
;

 




class CheckStatusFailure: CheckStatus
    construct(prop, [params])
    {
        isSuccess = nil;
        msgProp = prop;
        msgParams = params;
    }
;


 
 




class EquivalentStateInfo: object
    construct(st, obj, nameProp)
    {
         
        stateObj = st;
        stateNameProp = nameProp;

         
        stateVec = new Vector(8);
        stateVec.append(obj);
    }

     
    addEquivObj(obj) { stateVec.append(obj); }

     
    getEquivCount() { return stateVec.length(); }

     
    getEquivList() { return stateVec; }

     
    getName() { return stateObj.(stateNameProp)(stateVec); }

     
    stateObj = nil

     
    stateNameProp = nil

     
    stateVec = nil
;


 
 






class DropType: object
     







    

     

















    
;

 




dropTypeDrop: DropType
    standardReport(obj, dest)
    {
         
        ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&okayDropMsg)));
    }

    getReportPrefix(obj, dest)
    {
         
        return (libGlobal.curActor).getActionMessageObj().droppingObjMsg(obj);
    }
;

 





class DropTypeThrow: DropType
    construct(target, path)
    {
         
        target_ = target;
        path_ = path;
    }

    standardReport(obj, dest)
    {
        local nominalDest;
        
         
        nominalDest = dest.getNominalDropDestination();

         




        if (target_ == nominalDest)
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&throwFallMsg,obj, target_)));
        else
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&throwHitFallMsg,obj, target_, nominalDest)));
    }

    getReportPrefix(obj, dest)
    {
         
        return (libGlobal.curActor).getActionMessageObj().throwHitMsg(obj, target_);
    }

     
    target_ = nil

     
    path_ = nil
;


 
 




class BagAffinityInfo: object
    construct(obj, bulk, aff, bag)
    {
         
        obj_ = obj;
        bulk_ = bulk;
        aff_ = aff;
        bag_ = bag;
    }

     





    compareAffinityTo(other)
    {
         



        if (((libGlobal.curAction) != nil && (libGlobal.curAction).actionOfKind(TakeFromAction)) && ((libGlobal.curAction).getIobj()) == obj_)
            return -1;

         
        if (aff_ != other.aff_)
            return aff_ - other.aff_;

         
        if (bulk_ != other.bulk_)
            return bulk_ - other.bulk_;

         







        return other.obj_.holdingIndex - obj_.holdingIndex;
    }

     



    removeMostRecent(vec)
    {
        local best = vec[1];
        
         
        foreach (local cur in vec)
        {
             
            if (cur.obj_.holdingIndex > best.obj_.holdingIndex)
                best = cur;
        }

         
        vec.removeElement(best);

         
        return best;
    }

     
    obj_ = nil

     
    bulk_ = nil

     
    bag_ = nil

     
    aff_ = nil
;


 
 















class ThingState: object
     















    listName(lst) { return nil; }

     



    inventoryName(lst) { return listName(lst); }

     




    wornName(lst) { return listName(lst); }

     
    listingOrder = 0

     













    matchName(obj, origTokens, adjustedTokens, states)
    {
         
        return obj;
    }
;

 
 



class VocabObject: object
     































































    matchName(origTokens, adjustedTokens)
    {
         
    weakTest:
        if (weakTokens != nil)
        {
            local sc = languageGlobals.dictComparator;
                
             
            for (local i = 1, local len = adjustedTokens.length() ;
                 i <= len ; i += 2)
            {
                 
                local tok = adjustedTokens[i];
                local typ = adjustedTokens[i+1];

                 




                if (typ == &miscWord)
                    continue;

                 
                if (weakTokens.indexWhich({x: sc.matchValues(tok, x) != 0})
                    == nil)
                {
                     






                    break weakTest;
                }
            }

             





            return nil;
         }

         
        return matchNameCommon(origTokens, adjustedTokens);
    }

     















































    matchNameDisambig(origTokens, adjustedTokens)
    {
         
        return matchNameCommon(origTokens, adjustedTokens);
    }

     














    matchNameCommon(origTokens, adjustedTokens)
    {
        local st;
        
         



        if ((st = getState()) != nil)
            return st.matchName(self, origTokens, adjustedTokens, allStates);

         
        return self;
    }

     
























    pluralOrder = 100

     
















    disambigPromptOrder = (pluralOrder)

     








    vocabLikelihood = 0

     
























    filterResolveList(lst, action, whichObj, np, requiredNum)
    {
         
        return lst;
    }

     


































    expandPronounList(typ, lst) { return lst; }

     























    weakTokens = nil

     








    canResolvePossessive = true

     









    throwNoMatchForPossessive(txt)
        { throw new ParseFailureException(&noMatchForPossessive, self, txt); }

     






    throwNoMatchForLocation(txt)
        { throw new ParseFailureException(&noMatchForLocation, self, txt); }

     






    throwNothingInLocation()
        { throw new ParseFailureException(&nothingInLocation, self); }

     













    getFacets() { return []; }

     

















    isOwnedBy(obj) { return owner != nil && owner == obj; }

     









    getNominalOwner() { return owner; }

     
    owner = nil
;

 
 




findBestFacet(actor, lst)
{
    local infoList;
    local best;

     



    if (lst.length() == 0)
        return nil;
    if (lst.length() == 1)
        return lst[1];
    
     
    infoList = lst.mapAll({x: new SightTouchInfo(actor, x)});

     
    best = nil;
    foreach (local cur in infoList)
        best = SightTouchInfo.selectBetter(best, cur);

     
    return best.obj_;
}

 



class SightTouchInfo: object
    construct(actor, obj)
    {
         
        obj_ = obj;
        
         
        visInfo = actor.bestVisualInfo(obj);

         
        touchInfo = actor.senseObj(touch, obj);
    }

     
    obj_ = nil

     
    visInfo = nil
    touchInfo = nil

     





    selectBetter(a, b)
    {
        local d;
        
         
        if (a == nil)
            return b;
        if (b == nil)
            return a;

         
        d = a.visInfo.compareTransTo(b.visInfo);
        if (d > 0)
            return a;
        else if (d < 0)
            return b;
        else
        {
             
            d = a.touchInfo.compareTransTo(b.touchInfo);
            if (d >= 0)
                return a;
            else
                return b;
        }
    }
;

 
 



class Thing: VocabObject
     



    construct()
    {
         








        if (!isThingConstructed)
        {
             
            inherited();

             
            initializeThing();

             
            isThingConstructed = true;
        }
    }

     




    isThingConstructed = nil

     




















    globalParamName = nil

     












    setGlobalParamName(name)
    {
         
        if (globalParamName != nil
            && langMessageBuilder.nameTable_[globalParamName] == self)
            langMessageBuilder.nameTable_.removeElement(globalParamName);

         
        globalParamName = name;

         
        if (name != nil)
            langMessageBuilder.nameTable_[name] = self;
    }

     












    specialDesc = nil

     

















    distantSpecialDesc = (specialDesc)
    obscuredSpecialDesc = (specialDesc)

     













    remoteSpecialDesc(actor) { distantSpecialDesc; }

     









    specialDescOrder = 100

     





























    specialDescBeforeContents = true

     



    showSpecialDescWithInfo(info, pov)
    {
        local povActor = getPOVActorDefault((libGlobal.curActor));
        
         







        if (getOutermostRoom() != povActor.getOutermostRoom()
            || pov != povActor)
        {
             



            showRemoteSpecialDesc(povActor);
        }
        else if (info.trans == obscured)
        {
             
            showObscuredSpecialDesc();
        }
        else if (info.trans == distant)
        {
             
            showDistantSpecialDesc();
        }
        else if (canDetailsBeSensed(sight, info, pov))
        {
             



            showSpecialDesc();
        }
    }

     










    showSpecialDesc()
    {
         



        if (useInitSpecialDesc())
            initSpecialDesc;
        else
            specialDesc;
    }

     
    showObscuredSpecialDesc()
    {
        if (useInitSpecialDesc())
            obscuredInitSpecialDesc;
        else
            obscuredSpecialDesc;
    }

     
    showDistantSpecialDesc()
    {
        if (useInitSpecialDesc())
            distantInitSpecialDesc;
        else
            distantSpecialDesc;
    }

     
    showRemoteSpecialDesc(actor)
    {
        if (useInitSpecialDesc())
            remoteInitSpecialDesc(actor);
        else
            remoteSpecialDesc(actor);
    }

     




    useSpecialDesc()
    {
         



        return propType(&specialDesc) != 1 || useInitSpecialDesc();
    }

     




    useSpecialDescInRoom(room) { return useSpecialDesc(); }

     







    useSpecialDescInContents(cont)
    {
         




        return useSpecialDesc() && self.isIn(cont);
    }

     



    showSpecialDescInContentsWithInfo(info, pov, cont)
    {
        local povActor = getPOVActorDefault((libGlobal.curActor));
        
         
        if (getOutermostRoom() != povActor.getOutermostRoom()
            || pov != povActor)
            showRemoteSpecialDescInContents(povActor, cont);
        else if (info.trans == obscured)
            showObscuredSpecialDescInContents(povActor, cont);
        else if (info.trans == distant)
            showDistantSpecialDescInContents(povActor, cont);
        else if (canDetailsBeSensed(sight, info, pov))
            showSpecialDescInContents(povActor, cont);
    }

     







    showSpecialDescInContents(actor, cont)
        { showSpecialDesc(); }
    showObscuredSpecialDescInContents(actor, cont)
        { showObscuredSpecialDesc(); }
    showDistantSpecialDescInContents(actor, cont)
        { showDistantSpecialDesc(); }
    showRemoteSpecialDescInContents(actor, cont)
        { showRemoteSpecialDesc(actor); }

     














    initSpecialDesc = nil

     












    obscuredInitSpecialDesc = (initSpecialDesc)
    distantInitSpecialDesc = (initSpecialDesc)

     
    remoteInitSpecialDesc(actor) { distantInitSpecialDesc; }

     






    initDesc = nil

     











    isInInitState = (!moved)

     









    useInitSpecialDesc()
        { return isInInitState && propType(&initSpecialDesc) != 1; }

     






    useInitDesc()
        { return isInInitState && propType(&initDesc) != 1; }


     



    moved = nil

     













    seen = nil

     























    suppressAutoSeen = nil

     



    described = nil

     









    setContentsSeenBy(infoTab, actor)
    {
         



        infoTab.forEachAssoc(function(obj, info)
        {
            if (obj.isIn(self) && !obj.suppressAutoSeen)
                actor.setHasSeen(obj);
        });
    }

     






    setAllSeenBy(infoTab, actor)
    {
         
        infoTab.forEachAssoc(function(obj, info)
        {
            if (!obj.suppressAutoSeen)
                actor.setHasSeen(obj);
        });
    }

     





    noteSeenBy(actor, prop)
    {
         
        self.(prop) = true;
    }

     












    isKnown = nil

     














    hideFromAll(action) { return nil; }

     




    hideFromDefault(action) { return hideFromAll(action); }
    
     























    isListed { return isListedInContents; }

     









    isListedInContents { return !useSpecialDescInContents(location); }

     



    isListedInInventory { return true; }

     



    isListedAboardVehicle = nil

     





    isListedInRoomPart(part)
    {
         



        return (isNominallyInRoomPart(part)
                && part.isObjListedInRoomPart(self));
    }

     




















    isNominallyInRoomPart(part)
    {
         





        if (location == nil
            || location.getRoomPartLocation(part) != location)
            return nil;

         
        if (!moved && initNominalRoomPartLocation != nil)
            return (part == initNominalRoomPartLocation);

         
        if (specialNominalRoomPartLocation != nil)
            return (part == specialNominalRoomPartLocation);

         







        if (location.getNominalDropDestination() == part)
            return true;

         
        return nil;
    }

     


















    useSpecialDescInRoomPart(part)
    {
         
        if (!isNominallyInRoomPart(part))
            return nil;

         




        if (useInitSpecialDesc() && initNominalRoomPartLocation == part)
            return true;

         




        if (useSpecialDesc() && specialNominalRoomPartLocation == part)
            return true;

         
        return nil;
    }

     







    initNominalRoomPartLocation = nil

     
















    specialNominalRoomPartLocation = nil

     





















    contentsListed = (contentsListedInExamine
                      && (isListed || useSpecialDesc()))

     




    contentsListedInExamine = true

     





















    contentsListedSeparately = nil

     


















     





    showListItem(options, pov, infoTab)
    {
         
        showListItemGen(options, pov, infoTab, &listName);
    }

     




    showListItemGen(options, pov, infoTab, stateNameProp)
    {
        local info;
        local st;
        local stName;

         
        info = infoTab[self];

         
        say(withVisualSenseInfo(pov, info, &listName));

         







        if ((st = getStateWithInfo(info, pov)) != nil
            && (stName = st.(stateNameProp)([self])) != nil)
        {
             
            (libGlobal.libMessageObj).showListState(stName);
        }
    }

     



    showListItemCounted(lst, options, pov, infoTab)
    {
         
        showListItemCountedGen(lst, options, pov, infoTab, &listName);
    }

     





    showListItemCountedGen(lst, options, pov, infoTab, stateNameProp)
    {
        local info;
        local stateList;
        
         
        info = infoTab[self];
        
         
        say(countListName(lst.length(), pov, info));

         
        stateList = new Vector(10);
        foreach (local cur in lst)
        {
            local st;

             
            info = infoTab[cur];
            
             



            if ((st = cur.getStateWithInfo(info, pov)) != nil
                && st.(stateNameProp)(lst) != nil)
            {
                local stInfo;

                 




                stInfo = stateList.valWhich({x: x.stateObj == st});
                if (stInfo != nil)
                {
                     
                    stInfo.addEquivObj(cur);
                }
                else
                {
                     
                    stateList.append(
                        new EquivalentStateInfo(st, cur, stateNameProp));
                }
            }
        }

         
        if (stateList.length() != 0)
        {
             
            stateList.sort(nil, {a, b: (a.stateObj.listingOrder
                                            - b.stateObj.listingOrder)});
                                           
             











            if (stateList.length() == 1
                && stateList[1].getEquivCount() == lst.length())
            {
                 
                (libGlobal.libMessageObj).allInSameListState(stateList[1].getEquivList(),
                                                stateList[1].getName());
            }
            else
            {
                 
                equivalentStateLister.showListAll(stateList.toList(), 0, 0);
            }
        }
    }

     






    countListName(equivCount, pov, info)
    {
        return withVisualSenseInfo(pov, info, &countName, equivCount);
    }

     



    showInventoryItem(options, pov, infoTab)
    {
         
        showListItemGen(options, pov, infoTab, &inventoryName);
    }
    showInventoryItemCounted(lst, options, pov, infoTab)
    {
         
        showListItemCountedGen(lst, options, pov, infoTab, &inventoryName);
    }

     


    showWornItem(options, pov, infoTab)
    {
         
        showListItemGen(options, pov, infoTab, &wornName);
    }
    showWornItemCounted(lst, options, pov, infoTab)
    {
         
        showListItemCountedGen(lst, options, pov, infoTab, &wornName);
    }

     














    getStateWithInfo(info, pov)
    {
         



        if (canDetailsBeSensed(sight, info, pov))
            return getState();
        else
            return nil;
    }

     




    getState = nil

     





    allStates = []

     
























    desc { ((mainOutputStream.curTranscript).addReport(new DefaultDescCommandReport(&thingDescMsg,self))); }

     




    lookInDesc { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&nothingInsideMsg))); }

     

















    

     
    defaultDistantDesc { (libGlobal.libMessageObj).distantThingDesc(self); }

     




















    

     











    

     
    defaultObscuredDesc(obs) { (libGlobal.libMessageObj).obscuredThingDesc(self, obs); }

     






    soundDesc { ((mainOutputStream.curTranscript).addReport(new DefaultDescCommandReport(&thingSoundDescMsg,self))); }

     
    distantSoundDesc { (libGlobal.libMessageObj).distantThingSoundDesc(self); }

     
    obscuredSoundDesc(obs) { (libGlobal.libMessageObj).obscuredThingSoundDesc(self, obs); }

     






    smellDesc { ((mainOutputStream.curTranscript).addReport(new DefaultDescCommandReport(&thingSmellDescMsg,self))); }

     
    distantSmellDesc { (libGlobal.libMessageObj).distantThingSmellDesc(self); }

     
    obscuredSmellDesc(obs) { (libGlobal.libMessageObj).obscuredThingSmellDesc(self, obs); }

     






    tasteDesc { (libGlobal.libMessageObj).thingTasteDesc(self); }

     




    feelDesc { (libGlobal.libMessageObj).thingFeelDesc(self); }

     











    smellHereDesc() { }
    soundHereDesc() { }

     










    isEquivalent = nil

     
















    distinguishers = [basicDistinguisher,
                      ownershipDistinguisher,
                      locationDistinguisher]

     














    getAnnouncementDistinguisher(lst)
    {
        return (gameMain.useDistinguishersInAnnouncements
                ? getBestDistinguisher(lst)
                : nullDistinguisher);
    }

     




    getInScopeDistinguisher()
    {
         
        return getBestDistinguisher((libGlobal.curActor).scopeList());
    }

     




    getBestDistinguisher(lst)
    {
        local bestDist, bestCnt;

         
        lst -= self;

         







        if (lst.subset({obj: !nullDistinguisher.canDistinguish(self, obj)})
            .length() == 0)
            return nullDistinguisher;

         





        lst = lst.subset(
            {obj: !basicDistinguisher.canDistinguish(self, obj)});

         
        if (lst.length() == 0)
            return basicDistinguisher;

         
        bestDist = basicDistinguisher;
        bestCnt = lst.countWhich({obj: bestDist.canDistinguish(self, obj)});

         




        foreach (local dist in distinguishers)
        {
             
            if (dist == bestDist)
                continue;

             
            local cnt = lst.countWhich({obj: dist.canDistinguish(self, obj)});

             



            if (cnt == lst.length())
                return dist;

             





            if (cnt > bestCnt)
            {
                bestDist = dist;
                bestCnt = cnt;
            }
        }

         




        return bestDist;
    }

     









    isVocabEquivalent(obj)
    {
         





        return (distinguishers.indexWhich(
            {cur: cur.canDistinguish(self, obj)}) == nil);
    }

     




















    collectiveGroups = (collectiveGroup != nil ? [collectiveGroup] : [])

     




    collectiveGroup = nil

     



    hasCollectiveGroup(g) { return collectiveGroups.indexOf(g) != nil; }

     





















    listWith = []

     




    specialDescListWith = []

     








    roomName = (name)

     


















    roomDesc { (libGlobal.curActor).listActorPosture(getPOVActorDefault((libGlobal.curActor))); }

     






    roomFirstDesc { roomDesc; }

     













    roomRemoteDesc(actor) { roomDesc; }

     
    roomDarkName = ((libGlobal.libMessageObj).roomDarkName)

     
    roomDarkDesc { (libGlobal.libMessageObj).roomDarkDesc; }

     












    roomActorThereDesc(actor)
    {
        local pov = getPOV();
        
         




        if (location != nil && pov != nil && pov.canSee(location))
            location.roomActorThereDesc(actor);
        else
            (libGlobal.libMessageObj).actorInRemoteRoom(actor, self, pov);
    }
    
     















    lookAround(actor, verbose)
    {
         
        lookAroundPov(actor, self, verbose);
    }

     


























    lookAroundPov(actor, pov, verbose)
    {
         




        if (isLookAroundCeiling(actor, pov))
        {
             
            fromPOV(actor, pov, &lookAroundWithin, actor, pov, verbose);
        }
        else
        {
             
            location.lookAroundPov(actor, pov, verbose);
        }
    }

     


























    isLookAroundCeiling(actor, pov)
    {
         




        return (location == nil || !actor.canSee(location));
    }

     
































    lookAroundWithin(actor, pov, verbose)
    {
        local illum;
        local infoTab;
        local info;
        local specialList;
        local specialBefore, specialAfter;

         
        if (verbose == true)
        {
             
            verbose = (0x0001 | 0x0002
                       | 0x0004 | 0x0008);
        }
        else if (verbose == nil)
        {
             
            verbose = (0x0001 | 0x0004 | 0x0008);
        }

         



        if (!actor.hasSeen(self))
            verbose |= 0x0002;

         



        infoTab = actor.visibleInfoTableFromPov(pov);

         
        info = infoTab[pov];
        if (info != nil)
        {
             
            illum = info.ambient;
        }
        else
        {
             
            illum = 0;
        }

         




        adjustLookAroundTable(infoTab, pov, actor);
        
         
        if ((verbose & 0x0001) != 0)
        {
            "<.roomname>";
            lookAroundWithinName(actor, illum);
            "<./roomname>";
        }

         
        if ((verbose & 0x0002) != 0)
        {
             
            "<.roomdesc>";
            lookAroundWithinDesc(actor, illum);
            "<./roomdesc>";
        }

         
        if ((verbose & 0x0004) != 0)
        {
            local plst;

             












            specialList = specialDescList(
                infoTab,
                {obj: obj.useSpecialDescInRoom(self) && !obj.isIn(actor)});

             



            plst = partitionList(specialList,
                                 {obj: obj.specialDescBeforeContents});
            specialBefore = plst[1];
            specialAfter = plst[2];

             



            specialContentsLister.showList(pov, nil, specialBefore,
                                           0, 0, infoTab, nil);
        }

         
        if ((verbose & 0x0008) != 0)
        {
             










            lookAroundWithinContents(actor, illum, infoTab);
        }

         




        if ((verbose & 0x0004) != 0)
        {
             
            specialContentsLister.showList(pov, nil, specialAfter,
                                           0, 0, infoTab, nil);
        }
        
         
        lookAroundWithinSense(actor, pov, sound, roomListenLister);

         
        lookAroundWithinSense(actor, pov, smell, roomSmellLister);

         
        lookAroundWithinShowExits(actor, illum);

         




        if (illum > 1)
            actor.setHasSeen(self);
    }

     











    statusName(actor)
    {
         




        if (location != nil && actor.canSee(location))
            location.statusName(actor);
        else
            lookAroundWithinName(actor, actor.getVisualAmbient());
    }

     













    adjustLookAroundTable(tab, pov, actor)
    {
         
        tab.removeElement(pov);

         
        if (self not in (actor, pov))
        {
             
            pov.adjustLookAroundTable(tab, pov, actor);

             
            if (actor != pov)
                actor.adjustLookAroundTable(tab, pov, actor);
        }
    }

     








    lookAroundWithinName(actor, illum)
    {
         



        if (illum > 1)
        {
             
            "\^<<roomName>>";
        }
        else
        {
             
            say(roomDarkName);
        }

         
        actor.actorRoomNameStatus(self);
    }

     







    lookAroundWithinDesc(actor, illum)
    {
         



        if (illum > 1)
        {
            local pov = getPOVDefault(actor);
            
             






            if (!actor.isIn(self) || actor != pov)
            {
                 
                roomRemoteDesc(actor);
            }
            else if (actor.hasSeen(self))
            {
                 
                roomDesc;
            }
            else
            {
                 



                roomFirstDesc;
            }
        }
        else
        {
             
            roomDarkDesc;
        }
    }

     



    lookAroundWithinContents(actor, illum, infoTab)
    {
        local lst;
        local lister;
        local remoteLst;
        local recurse;

         
        local outer = getOutermostRoom();

         
        setAllSeenBy(infoTab, actor);
        
         



        if (illum != nil && illum < 2)
        {
             











            lst = senseInfoTableSubset(
                infoTab, {obj, info: !obj.isIn(actor)});
            
             
            lister = darkRoomContentsLister;

             
            remoteLst = nil;

             






            recurse = nil;
        }
        else
        {
             
            lst = contents;

             
            lst -= actor;

             






            lister = (actor.isIn(self) && actor == getPOVDefault(actor)
                      ? roomContentsLister
                      : remoteRoomContentsLister(self));

             






            remoteLst = new Vector(5);
            infoTab.forEachAssoc(function(obj, info)
            {
                 
                if (obj != outer && !obj.isIn(outer))
                {
                    local objOuter;
                    
                     



                    objOuter = obj.getOutermostRoom();

                     
                    if (remoteLst.indexOf(objOuter) == nil)
                        remoteLst.append(objOuter);
                }
            });

             



            recurse = true;
        }

         
        "<.p>";

         
        lister.showList(actor, self, lst, (recurse ? 0x0002 : 0),
                        0, infoTab, nil, examinee: self);

         



        if (remoteLst != nil)
        {
             
            for (local i = 1, local len = remoteLst.length() ; i <= len ; ++i)
            {
                local cur;
                local cont;

                 
                cur = remoteLst[i];

                 
                cont = cur.contents;

                 






                cont = cont.subset({x: !x.isIn(outer)});
                for (local j = 1 ; j < i ; ++j)
                    cont = cont.subset({x: !x.isIn(remoteLst[j])});
                
                 



                outer.remoteRoomContentsLister(cur).showList(
                    actor, cur, cont, 0x0002, 0, infoTab, nil,
                    examinee: self);
            }
        }
    }

     




    lookAroundWithinSense(actor, pov, sense, lister)
    {
        local infoTab;
        local presenceList;

         



        infoTab = pov.senseInfoTable(sense);

         





        presenceList = senseInfoTableSubset(infoTab,
            {obj, info: obj.(sense.presenceProp) && !obj.isIn(actor)});

         
        foreach (local cur in presenceList)
            actor.setKnowsAbout(cur);

         
        lister.showList(pov, nil, presenceList, 0, 0, infoTab, nil,
                        examinee: self);
    }

     




    lookAroundWithinShowExits(actor, illum)
    {
         
        if ((libGlobal.exitListerObj) != nil)
            (libGlobal.exitListerObj).lookAroundShowExits(actor, self, illum);
    }

     




    roomContentsLister { return roomLister; }

     























    remoteRoomContentsLister(other) { return new RemoteRoomLister(other); }

     




    darkRoomContentsLister { return darkRoomLister; }

     



    getOutermostRoom()
    {
         
        return (location != nil ? location.getOutermostRoom() : self);
    }

     
    getOutermostVisibleRoom(pov)
    {
        local enc;
        
         





        if (location != nil
            && (enc = location.getOutermostVisibleRoom(pov)) != nil)
            return enc;

         





        return (pov.canSee(self) ? self : nil);
    }

     













    getLocTraveler(trav, conn)
    {
         



        return (location != nil ? location.getLocTraveler(trav, conn) : trav);
    }

     







    getLocPushTraveler(trav, obj)
    {
         



        return (location != nil
                ? location.getLocPushTraveler(trav, obj)
                : trav);
    }

     




    roomTravelPreCond()
    {
         
        if (location != nil)
            return location.roomTravelPreCond();

         



        return [];
    }

     









    isActorTravelReady(conn)
    {
         
        if (location != nil)
            return location.isActorTravelReady(conn);

         



        return true;
    }

     
    notTravelReadyMsg = (location != nil ? location.notTravelReadyMsg : nil)

     
    cannotGoShowExits(actor)
    {
        if (location != nil)
            location.cannotGoShowExits(actor);
    }

     
    showStatuslineExits()
    {
        if (location != nil)
            location.showStatuslineExits();
    }

     
    getStatuslineExitsHeight()
        { return location != nil ? location.getStatuslineExitsHeight() : 0; }

     


















    getTravelConnector(dir, actor)
    {
        local conn;
        
         



        if (propDefined(dir.dirProp) && (conn = self.(dir.dirProp)) != nil)
            return conn;

         





        if (location != nil && (actor == nil || actor.canSee(location)))
        {
             



            return location.getTravelConnector(dir, actor);
        }
        else
        {
             




            return dir.defaultConnector(self);
        }
    }

     



    getConnectorTo(actor, dest)
    {
        local conn;
        
         
        foreach (local dir in Direction.allDirections)
        {
             
            conn = getTravelConnector(dir, actor);

             
            if (conn != nil)
                conn = conn.connectorGetConnectorTo(self, actor, dest);

             
            if (conn != nil)
                return conn;
        }

         
        return nil;
    }

     





    directionForConnector(conn, actor)
    {
         
        foreach (local dir in Direction.allDirections)
        {
             
            if (self.getTravelConnector(dir, actor) == conn)
                return dir;
        }

         
        return nil;
    }

     




    localDirectionLinkForConnector(conn)
    {
         
        foreach (local dir in Direction.allDirections)
        {
             



            if (self.(dir.dirProp) == conn)
                return dir;
        }

         
        return nil;
    }

     





    checkTravelerDirectlyInRoom(traveler, allowImplicit)
    {
         
        return location.checkTravelerDirectlyInRoom(traveler, allowImplicit);
    }

     















    checkActorOutOfNested(allowImplicit)
    {
         
        foreach (local cur in contents)
        {
            if ((libGlobal.curActor).isIn(cur))
                return cur.checkActorOutOfNested(allowImplicit);
        }

         
        ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&cannotDoFromHereMsg)));
        throw new ExitSignal();
    }

     





    roomLocation = (location != nil ? location.roomLocation : nil)

     





    getRoomPartLocation(part)
    {
        if (location != nil)
            return location.getRoomPartLocation(part);
        else
            return nil;
    }

     



    roomDaemon()
    {
        if (location != nil)
            location.roomDaemon();
    }

     









    atmosphereList()
    {
        if (location != nil && (libGlobal.playerChar).canSee(location))
            return location.atmosphereList;
        else
            return nil;
    }

     





    getRoomNotifyList()
    {
        local lst = [];
        
         
        forEachContainer(
            {cont: lst = lst.appendUnique(cont.getRoomNotifyList())});

         
        return lst;
    }

     





























    isShipboard()
    {
         
        return (location != nil ? location.isShipboard() : nil);
    }

     






    holdingIndex = 0

     




    weight = 1
    bulk = 1

     



    getBulkWithin()
    {
        local total;
        
         
        total = 0;
        foreach (local cur in contents)
            total += cur.getBulk();
        
         
        return total;
    }

     



    getDestName(actor, origin)
    {
        if (location != nil)
            return location.getDestName(actor, origin);
        else
            return '';
    }
    
     







    effectiveFollowLocation = (location != nil
                               ? location.effectiveFollowLocation
                               : self)

     
































    getDropDestination(obj, path)
    {
         



        return location != nil
            ? location.getDropDestination(obj, path)
            : self;
    }

     














    adjustThrowDestination(thrownObj, path)
    {
        return self;
    }

     


















































    receiveDrop(obj, desc)
    {
         
        obj.moveInto(self);

         
        desc.standardReport(obj, self);
    }

     











    getNominalDropDestination() { return self; }

     



    announceDefaultObject(whichObj, action, resolvedAllObjects)
    {
         
        return (libGlobal.libMessageObj).announceDefaultObject(
            self, whichObj, action, resolvedAllObjects);
    }
    
     




    getWeight()
    {
        local total;

         
        total = weight;
                
         



        foreach (local cur in contents)
            total += cur.getWeight();

         
        return total;
    }

     
















    getBulk()
    {
         
        return bulk;
    }

     












    getEncumberingBulk(actor)
    {
         
        return getBulk();
    }

     













    getEncumberingWeight(actor)
    {
         
        return getWeight();
    }

     




























    whatIf(func, [changes])
    {
        local oldList;
        local cnt;
        local i;
        
         





        cnt = changes.length();
        oldList = new Vector(cnt / 2);

         
        for (i = 1 ; i <= cnt ; i += 2)
        {
            local curProp;
            local newVal;
            
             
            curProp = changes[i];
            newVal = changes[i+1];
            
             
            switch(curProp)
            {
            case &moveInto:
                 








                oldList.append(saveLocation());
                if (newVal != self && !newVal.isIn(self))
                    baseMoveInto(newVal);
                break;

            default:
                 





                oldList.append(self.(curProp));
                self.(curProp) = newVal;
                break;
            }
        }

         





        try
        {
             
            return (func)();
        }
        finally
        {
             
            for (i = 1, local j = 1 ; i <= cnt ; i += 2, ++j)
            {
                local curProp;
                local oldVal;
            
                 
                curProp = changes[i];
                oldVal = oldList[j];
            
                 
                switch(curProp)
                {
                case &moveInto:
                     
                    restoreLocation(oldVal);
                    break;

                default:
                     
                    self.(curProp) = oldVal;
                    break;
                }
            }
        }
    }

     



    whatIfHeldBy(func, actor)
    {
         



        return whatIf(func, &moveInto, actor);
    }

     






















    checkBulkChange()
    {
         




        forEachContainer(
            {loc: loc.checkBulkChangeWithin(self)});
    }

     










    checkBulkChangeWithin(changingObj)
    {
    }

     







    getBagAffinities(lst)
    {
        local infoVec;
        local bagVec; 
        
         




        bagVec = new Vector(10);
        getBagsOfHolding(bagVec);

         
        if (bagVec.length() == 0)
            return [];

         
        infoVec = new Vector(lst.length());

         
        foreach (local cur in lst)
        {
            local maxAff;
            local bestBag;

             
            maxAff = 0;
            bestBag = nil;
            foreach (local bag in bagVec)
            {
                local aff;

                                 
                aff = bag.affinityFor(cur);

                 





                if (aff != 0 && (bestBag == nil || aff > maxAff))
                {
                     
                    maxAff = aff;
                    bestBag = bag;
                }
            }

             



            if (bestBag != nil)
                infoVec.append(new BagAffinityInfo(
                    cur, cur.getEncumberingBulk(self),
                    maxAff, bestBag));
        }
        
         
        infoVec = infoVec.sort(true, {a, b: a.compareAffinityTo(b)});

         





















        for (local i = 1, local len = infoVec.length(), local moves = 0 ;
             i <= len && moves <= len ; ++i)
        {
             
            local cur = infoVec[i];
            local dest = cur.bag_;
            
             



            local idx = infoVec.indexWhich({x: x.obj_ == dest});

             




            if (idx != nil && idx < i)
            {
                 
                infoVec.removeElementAt(i);

                 
                infoVec.insertAt(idx, cur);

                 
                ++moves;

                 















                i = idx + 1;
            }
        }

         
        return infoVec;
    }
    
     




    getBagsOfHolding(vec)
    {
         



        if (transSensingIn(touch) != transparent)
            return;

         
        foreach (local cur in contents)
            cur.getBagsOfHolding(vec);
    }

     





























    brightness = 0
    
     





    sightSize = medium
    soundSize = medium
    smellSize = medium
    touchSize = medium

     
























    sightPresence = true
    soundPresence = nil
    smellPresence = nil
    touchPresence = true

     




    contentsLister = thingContentsLister

     



    descContentsLister = thingDescContentsLister

     



    lookInLister = thingLookInLister

     




    inlineContentsLister = inlineListingContentsLister

     





    specialContentsLister = specialDescLister


     














    canBeSensed(sense, trans, ambient)
    {
         



        if (sense.ambienceProp != nil)
        {
             



            if (adjustBrightness(ambient, trans) == 0)
                return nil;
        }

         
        switch(trans)
        {
        case transparent:
        case attenuated:
             



            return true;

        case obscured:
        case distant:
             



            return sense.canObjBeSensed(self, trans, ambient);

        default:
             
            return nil;
        }
    }

     





    canDetailsBeSensed(sense, info, pov)
    {
         
        if (info == nil || info.trans == opaque)
            return nil;

         



        if (self.(sense.sizeProp) == large)
            return true;

         




        return (info.trans is in (transparent, attenuated));
    }

     




    fromPOV(actor, pov, propToCall, [args])
    {
         
        pushPOV(actor, pov);

         
        try
        {
             
            self.(propToCall)(args...);
        }
        finally
        {
             
            popPOV();
        }
    }

     



















    location = nil

     




    getCommonDirectContainer(obj)
    {
         
        local found = nil;
        
         
        forEachContainer(function(loc) {
             



            if (obj.isDirectlyIn(loc))
                found = loc;
        });

         
        return found;
    }

     



    getCommonContainer(obj)
    {
         
        local found = nil;
        
         
        forEachContainer(function(loc) {
             



            if (obj.isIn(loc))
                found = loc;
        });

         
        if (found != nil)
            return found;

         



        forEachContainer(function(loc) {
            local cur;

             
            cur = loc.getCommonContainer(obj);

             
            if (cur != nil)
                found = cur;
        });

         
        return found;
    }

     


















    getIdentityObject() { return self; }

     



    isComponentOf(obj) { return nil; }

     




    initializeThing()
    {
         
        initializeLocation();

         




        if (isEquivalent)
            initializeEquivalent();

         
        if (globalParamName != nil)
            langMessageBuilder.nameTable_[globalParamName] = self;
    }

     



    initializeLocation()
    {
        if (location != nil)
            location.addToContents(self);
    }

     










    initializeEquivalent()
    {
         






        if (equivalentGrouper != nil)
            listWith -= equivalentGrouper;

         
        equivalentGrouper = equivalentGrouperTable[equivalenceKey];

         
        if (equivalentGrouper == nil)
        {
             
            equivalentGrouper = equivalentGrouperClass.createInstance();

             
            equivalentGrouperTable[equivalenceKey] = equivalentGrouper;
        }

         





        if (propType(&listWith) != 11)
            listWith += equivalentGrouper;
    }

     





    equivalentGrouperTable = static (new LookupTable(32, 64))

     



    equivalentGrouperClass = ListGroupEquivalent

     







    equivalentGrouper = nil

     



    contents = []

     



    getNoise()
    {
         



        return contents.valWhich(
            {obj: obj.ofKind(Noise) && obj.soundPresence});
    }

     



    getOdor()
    {
         



        return contents.valWhich(
            {obj: obj.ofKind(Odor) && obj.smellPresence});
    }

     



    allContents()
    {
        local vec;
        
         
        vec = new Vector(32);

         
        addAllContents(vec);

         
        return vec;
    }

     




    getAllForTakeFrom(scopeList)
    {
         



        return scopeList.subset(
            {x: x != self && x.isDirectlyIn(self) && !x.isComponentOf(self)});
    }

     



    addAllContents(vec)
    {
         
        foreach (local cur in contents)
        {
             



            if (vec.indexOf(cur) != nil)
                continue;
            
             
            vec.append(cur);

             
            cur.addAllContents(vec);
        }
    }

     



















    showObjectContents(pov, lister, options, indent, infoTab)
    {
         
        local cont = lister.getListedContents(self, infoTab);
        
         
        if (cont != [])
            lister.showList(pov, self, cont, options, indent, infoTab, nil);
    }

     




    showInventoryContents(pov, lister, options, indent, infoTab)
    {
         
        showObjectContents(pov, lister, options, indent, infoTab);
    }

     








    getListedContents(lister, infoTab)
    {
         



        return getContentsForExamine(lister, infoTab)
            .subset({x: lister.isListed(x)});
    }

     




    getContentsForExamine(lister, infoTab)
    {
         




        return contents.subset({x: infoTab[x] != nil});
    }

     











    isTopLevel = nil

     





















    isIn(obj)
    {
        local loc = location;
        
         
        if (loc == nil)
        {
             


















            if (obj == nil)
            {
                 




                return !isTopLevel;
            }
            else
            {
                 



                return nil;
            }
        }

         
        if (loc == obj)
            return true;

         
        return loc.isIn(obj);
    }

     





    isDirectlyIn(obj)
    {
         
        return location == obj;
    }

     




    isNominallyIn(obj)
    {
         
        if (isIn(obj))
            return true;

         



        if (obj.ofKind(RoomPart) && isNominallyInRoomPart(obj))
            return true;

         
        return nil;
    }

     











    isInFixedIn(loc)
    {
         
        return location != nil && location.contentsInFixedIn(loc);
    }

     
    isOrIsIn(obj) { return self == obj || isIn(obj); }

     




    contentsInFixedIn(loc) { return nil; }

     













    isHeldBy(actor)
    {
         



        return isDirectlyIn(actor);
    }

     








    meetsObjHeld(actor) { return isHeldBy(actor); }

     










    appendHeldContents(vec)
    {
         
    }

     































    isOwnedBy(obj)
    {
        local cont;
        
         



        if (owner != nil)
            return owner == obj;
        
         



        if (isDirectlyIn(obj))
        {
             





            return obj.canOwn(self);
        }

         
        cont = location;

         
        if (cont == nil)
        {
             







            if (isIn(obj))
            {
                 



                forEachContainer(function(x)
                {
                    if (x == obj || x.isIn(obj))
                        cont = x;
                });
            }
            else
            {
                 



                return nil;
            }
        }

         




        if (cont.canOwn(self))
            return nil;

         




        return cont.isOwnedBy(obj);
    }

     












    owner = nil

     















    getNominalOwner()
    {
         
        if (owner != nil)
            return owner;

         
        if (location == nil)
            return nil;

         
        if (location.canOwn(self))
            return location;

         
        return location.getNominalOwner();
    }

     






    canOwn(obj) { return nil; }

     



    getCarryingActor()
    {
         
        if (location == nil)
            return nil;

         
        if (location.isActor)
            return location;

         
        return location.getCarryingActor();
    }

     



    tryHolding()
    {
         





        if (isIn((libGlobal.curActor)))
            return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     TakeFromAction,self, location);
        else
            return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     TakeAction,self);
    }

     






    tryMovingObjInto(obj) { return nil; }

     






    mustMoveObjInto(obj) { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&mustBeInMsg,obj, self))); }

     








    addToContents(obj)
    {
         
        if (contents.indexOf(obj) == nil)
            contents += obj;
    }

     





    removeFromContents(obj)
    {
         
        contents -= obj;
    }

     



    saveLocation()
    {
         



        return location;
    }

     



    restoreLocation(oldLoc)
    {
         
        baseMoveInto(oldLoc);
    }

     









    moveInto(newContainer)
    {
         
        moveIntoNotifyPath(newContainer);

         
        mainMoveInto(newContainer);
    }

     







    moveIntoForTravel(newContainer)
    {
         



        mainMoveInto(newContainer);
    }

     




    mainMoveInto(newContainer)
    {
         
        sendNotifyRemove(self, newContainer, &notifyRemove);

         
        if (newContainer != nil)
            newContainer.sendNotifyInsert(self, newContainer, &notifyInsert);

         
        notifyMoveInto(newContainer);

         
        baseMoveInto(newContainer);

         
        moved = true;
    }

     







    baseMoveInto(newContainer)
    {
         
        if (location != nil)
            location.removeFromContents(self);

         
        location = newContainer;

         



        if (location != nil)
            location.addToContents(self);
    }

     


    moveIntoNotifyPath(newContainer)
    {
        local path;
        
         
        if ((path = getMovePathTo(newContainer)) == nil)
            return;

         




        if (isIn(newContainer))
        {
             








            path = path.sublist(1, path.length() - 2);
        }
        else
        {
             






            path += [PathIn, nil];
        }

         
        traversePath(path, function(target, op) {
             
            target.notifyMoveViaPath(self, newContainer, op);

             
            return true;
        });
    }

     






    forEachContainer(func, [args])
    {
         
        if (location != nil)
            (func)(location, args...);
    }

     





    forEachConnectedContainer(func, [args])
    {
         
        forEachContainer(func, args...);
    }

     



    getConnectedContainers()
    {
        local loc;

         



        return ((loc = location) == nil ? [] : [loc]);
    }

     





    cloneMultiInstanceContents()
    {
        local origContents;
        
         





        origContents = contents;
        contents = [];

         
        foreach (local cur in origContents)
            cur.cloneForMultiInstanceContents(self);
    }

     



    cloneForMultiInstanceContents(loc)
    {
         
        local cl = createInstance();

         
        cl.baseMoveInto(loc);

         
        cl.cloneMultiInstanceContents();
    }

     


















    checkStagingLocation(dest)
    {
         



        if (dest.isIn(self))
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&invalidStagingContainerMsg,self, dest)));
        else
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&invalidStagingLocationMsg,self)));

         
        throw new ExitSignal();
    }

     


    acceptCommand(issuingActor)
    {
         
        (libGlobal.libMessageObj).cannotTalkTo(self, issuingActor);

         
        return nil;
    }

     


    isLikelyCommandTarget = nil

     








    getExtraScopeItems(actor) { return []; }

     








    connectionTable()
    {
        local tab;
        local cache;

         
        if ((cache = libGlobal.connectionCache) != nil
            && (tab = cache[self]) != nil)
            return tab;

         
        senseTmp.pointOfView = self;

         
        tab = new LookupTable(32, 64);

         
        addDirectConnections(tab);

         
        if (cache != nil)
            cache[self] = tab;

         
        return tab;
    }

     




    addDirectConnections(tab)
    {
        local cur;
        
         
        tab[self] = true;

         





        foreach (cur in collectiveGroups)
            tab[cur] = true;

         




















        for (local clst = contents, local i = 1,
             local len = clst.length() ; i <= len ; ++i)
        {
             
            cur = clst[i];
            
             
            if (tab[cur] == nil)
                cur.addDirectConnections(tab);
        }

         
        if ((cur = location) != nil && tab[cur] == nil)
            cur.addDirectConnections(tab);
    }

     

















    tryImplicitRemoveObstructor(sense, obj)
    {
         
        return nil;
    }

     



    cannotReachObject(obj)
    {
         







        (libGlobal.libMessageObj).cannotReachObject(obj);
    }

     





    cannotSeeSoundSource(obj) { }

     
    cannotSeeSmellSource(obj) { }

     




    getTouchPathTo(obj)
    {
        local path;
        local key = [self, obj];
        local cache;
        local info;

         
        if ((cache = libGlobal.canTouchCache) != nil
            && (info = cache[key]) != nil)
        {
             
            return info.touchPath;
        }

         
        path = selectPathTo(obj, &canTouchViaPath);

         
        if (cache != nil)
            cache[key] = new CanTouchInfo(path);

         
        return path;
    }

     




    canTouch(obj)
    {
        local path;
        local result;
        local key = [self, obj];
        local cache;
        local info;

         
        if ((cache = libGlobal.canTouchCache) != nil
            && (info = cache[key]) != nil)
        {
             
            if (info.propDefined(&canTouch))
                return info.canTouch;

             



            path = info.touchPath;
        }
        else
        {
             
            path = getTouchPathTo(obj);
        }
        
         
        if (path == nil)
        {
             
            result = nil;
        }
        else
        {
             
            result = traversePath(path,
                {ele, op: ele.canTouchViaPath(self, obj, op)});
        }

         
        if (cache != nil)
        {
             
            if (info == nil)
                cache[key] = info = new CanTouchInfo(path);

             
            info.canTouch = result;
        }

         
        return result;
    }

     


    findTouchObstructor(obj)
    {
         
        cacheSenseInfo(connectionTable(), touch);
        
         
        return findOpaqueObstructor(touch, obj);
    }

     



    getMovePathTo(newLoc)
    {
         




        return selectPathTo(newLoc, &canMoveViaPath);
    }

     



    getThrowPathTo(newLoc)
    {
         



        return selectPathTo(newLoc, &canThrowViaPath);
    }

     

























    checkMoveViaPath(obj, dest, op) { return checkStatusSuccess; }

     







    checkThrowViaPath(obj, dest, op)
        { return checkMoveViaPath(obj, dest, op); }

     











    checkTouchViaPath(obj, dest, op)
        { return checkMoveViaPath(obj, dest, op); }

     







    canMoveViaPath(obj, dest, op)
        { return checkMoveViaPath(obj, dest, op).isSuccess; }

     
    canThrowViaPath(obj, dest, op)
        { return checkThrowViaPath(obj, dest, op).isSuccess; }

     
    canTouchViaPath(obj, dest, op)
        { return checkTouchViaPath(obj, dest, op).isSuccess; }

     










    notifyMoveViaPath(obj, dest, op)
    {
        local stat;

         
        stat = checkMoveViaPath(obj, dest, op);

         
        if (!stat.isSuccess)
        {
             
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(stat.msgProp,stat.msgParams...)));

             
            throw new ExitSignal();
        }
    }

     









    selectPathTo(obj, traverseProp)
    {
        local allPaths;
        local goodPaths;
        local minPath;
        
         
        allPaths = getAllPathsTo(obj);

         
        if (allPaths.length() == 0)
            return nil;

         
        goodPaths = new Vector(allPaths.length());

         
        for (local i = 1, local len = allPaths.length() ; i <= len ; ++i)
        {
            local path = allPaths[i];
            local ok;
            
             





            ok = true;
            traversePath(path, function(target, op) {
                 



                if (target.(traverseProp)(self, obj, op))
                {
                     
                    return true;
                }
                else
                {
                     
                    ok = nil;

                     
                    return nil;
                }
            });

             



            if (ok)
                goodPaths.append(path);
        }

         
        if (goodPaths.length() == 0)
            goodPaths = allPaths;

         
        minPath = nil;
        for (local i = 1, local len = goodPaths.length() ; i <= len ; ++i)
        {
             
            local path = goodPaths[i];
            
             
            if (minPath == nil || path.length() < minPath.length())
                minPath = path;
        }

         
        return minPath;
    }

     











    traversePath(path, func)
    {
        local len;
        local target;

         




        if (path == nil || (len = path.length()) == 0)
            return true;
        
         
        if (path[1] != nil && !(func)(path[1], PathFrom))
            return nil;

         
        for (target = nil, local i = 2 ; i <= len ; i += 2)
        {
            local op;
            
             
            op = path[i];
            
             
            switch(op)
            {
            case PathIn:
                 



                target = path[i-1];
                break;

            case PathOut:
                 



                target = path[i+1];
                break;

            case PathPeer:
                 



                target = path[i-1].getCommonDirectContainer(path[i+1]);
                break;

            case PathThrough:
                 





                target = path[i-1];
                break;
            }

             
            if (target != nil && !(func)(target, op))
            {
                 
                return nil;
            }
        }

         







        if (path[len] != nil
            && path[len] != target
            && !(func)(path[len], PathTo))
            return nil;

         
        return true;
    }

     















    getAllPathsTo(obj)
    {
        local vec;
        
         
        vec = new Vector(10);

         
        buildContainmentPaths(vec, [self], obj);

         
        if (obj != nil && vec.length() == 0)
            obj.specialPathFrom(self, vec);

         
        return vec;
    }

     










    specialPathFrom(src, vec) { }

     



    buildContainmentPaths(vec, pathHere, obj)
    {
        local i, len;
        local cur;
        
         
        for (i = 1, len = contents.length() ; i <= len ; ++i)
        {
             
            cur = contents[i];

             









            if (cur == obj)
            {
                 





                vec.append(normalizePath(pathHere + [PathIn, obj]));
            }
            else if (pathHere.indexOf(cur) == nil)
            {
                 



                cur.buildContainmentPaths(vec, pathHere + [PathIn, cur], obj);
            }
        }

         
        for (local clst = getConnectedContainers, i = 1, len = clst.length() ;
             i <= len ; ++i)
        {
             
            cur = clst[i];

             




            if (cur == obj)
            {
                 




                vec.append(normalizePath(pathHere + [PathOut, cur]));
            }
            else if (pathHere.indexOf(cur) == nil)
            {
                 



                cur.buildContainmentPaths(vec,
                                          pathHere + [PathOut, cur], obj);
            }
        }
    }

     
































    normalizePath(path)
    {
         




        for (local i = 2 ; i <= path.length() ; i += 2)
        {
             






            if (path[i] == PathIn
                && i + 2 <= path.length()
                && path[i+2] == PathOut
                && path[i-1].getCommonDirectContainer(path[i+3]) == nil)
            {
                 
                path = path.sublist(1, i + 1)
                       + PathThrough
                       + path.sublist(i + 1);
            }
        }

         



        for (local i = 2 ; i <= path.length() ; i += 2)
        {
             




            if (path[i] == PathOut
                && i + 2 <= path.length()
                && path[i+2] == PathIn)
            {
                 



                path = path.sublist(1, i - 1)
                       + PathPeer
                       + path.sublist(i + 3);
            }
        }

         
        return path;
    }
    
     






    getVisualSenseInfo()
    {
        local infoTab;
        
         
        if (explicitVisualSenseInfo != nil)
            return explicitVisualSenseInfo;

         
        infoTab = getPOVDefault((libGlobal.curActor)).visibleInfoTable();

         
        return infoTab[self];
    }

     







    withVisualSenseInfo(pov, senseInfo, methodToCall, [args])
    {
        local oldSenseInfo;
        
         
        oldSenseInfo = setVisualSenseInfo(senseInfo);

         
        pushPOV(pov, pov);

         
        try
        {
             



            return self.(methodToCall)(args...);
        }
        finally
        {
             
            popPOV();
            
             
            setVisualSenseInfo(oldSenseInfo);
        }
    }

     




    setVisualSenseInfo(info)
    {
        local oldInfo;

         
        oldInfo = explicitVisualSenseInfo;

         
        explicitVisualSenseInfo = info;

         
        return oldInfo;
    }

     
    explicitVisualSenseInfo = nil

     




    transSensingIn(sense) { return transparent; }

     
















    transSensingOut(sense) { return transSensingIn(sense); }

     
















































    fillMedium()
    {
        local loc;
        
        return ((loc = location) != nil ? loc.fillMedium() : nil);
    }

     







    canSee(obj) { return senseObj(sight, obj).trans != opaque; }
    canHear(obj) { return senseObj(sound, obj).trans != opaque; }
    canSmell(obj) { return senseObj(smell, obj).trans != opaque; }

     
    canBeSeenBy(actor) { return actor.canSee(self); }
    canBeHeardBy(actor) { return actor.canHear(self); }
    canBeSmelledBy(actor) { return actor.canSmell(self); }
    canBeTouchedBy(actor) { return actor.canTouch(self); }

     
    canBeSeen = (canBeSeenBy((libGlobal.playerChar)))
    canBeHeard = (canBeHeardBy((libGlobal.playerChar)))
    canBeSmelled = (canBeSmelledBy((libGlobal.playerChar)))
    canBeTouched = (canBeTouchedBy((libGlobal.playerChar)))

     







    isOccludedBy(occluder, sense, pov) { return nil; }

     










    senseObj(sense, obj)
    {
        local info;

         
        info = senseInfoTable(sense)[obj];

         
        if (info == nil)
            info = new SenseInfo(obj, opaque, nil, 0);

         
        return info;
    }

     
















    findOpaqueObstructor(sense, obj)
    {
        local path;
        
         
        path = getAllPathsTo(obj);

         



        if (path == nil)
            return nil;

         





        path = path[1];

         




        for (local i = 3, local len = path.length() ; i <= len ; i += 2)
        {
            local obj;
            local trans;
            local ambient;

             
            obj = path[i];

             




            if (path[i-1] == PathOut)
            {
                 
                trans = obj.tmpTransWithin_;
                ambient = obj.tmpAmbientWithin_;
            }
            else
            {
                 
                trans = obj.tmpTrans_;
                ambient = obj.tmpAmbient_;
            }

             



            if (!obj.canBeSensed(sense, trans, ambient))
            {
                 
                return path[i-2];
            }
        }

         
        return nil;
    }
    
     










    senseInfoTable(sense)
    {
        local objs;
        local tab;
        local siz;
        local cache;
        local key = [self, sense];

         
        if ((cache = libGlobal.senseCache) != nil
            && (tab = cache[key]) != nil)
            return tab;
        
         





        objs = connectionTable();

         
        senseTmp.pointOfView = self;

         
        cacheSenseInfo(objs, sense);

         
        siz = objs.getEntryCount();
        tab = new LookupTable(32, siz == 0 ? 32 : siz);
        objs.forEachAssoc(function(cur, val)
        {
             
            cur.addToSenseInfoTable(sense, tab);
        });

         
        if (cache != nil)
            cache[key] = tab;

         
        return tab;
    }

     



















    addToSenseInfoTable(sense, tab)
    {
        local trans;
        local ambient;
        local obs;

         



        if (tmpPathIsIn_)
        {
             
            trans = tmpTrans_;
            ambient = tmpAmbient_;
            obs = tmpObstructor_;
        }
        else
        {
             
            trans = tmpTransWithin_;
            ambient = tmpAmbientWithin_;
            obs = tmpObstructorWithin_;
        }

         
        if (canBeSensed(sense, trans, ambient))
            tab[self] = new SenseInfo(self, trans, obs, ambient);
    }

     



    sensePresenceList(sense)
    {
        local infoTab;
        
         
        infoTab = senseInfoTable(sense);

         




        return senseInfoTableSubset(infoTab,
            {obj, info: obj.(sense.presenceProp)});
    }

     










    senseAmbientMax(senses)
    {
        local objs;
        local maxSoFar;

         
        maxSoFar = 0;
        
         
        objs = connectionTable();

         
        for (local i = 1, local lst = senses, local len = lst.length() ;
             i <= len ; ++i)
        {
             



            cacheAmbientInfo(objs, lst[i]);

             



            if (tmpAmbient_ > maxSoFar)
                maxSoFar = tmpAmbient_;
        }

         
        return maxSoFar;
    }

     







    cacheSenseInfo(objs, sense)
    {
         
        local nlst = senseTmp.notifyList;
        if (nlst.length() != 0)
            nlst.removeRange(1, nlst.length());

         
        cacheAmbientInfo(objs, sense);

         
        cacheSensePath(sense);

         
        for (local i = 1, local len = nlst.length() ; i <= len ; ++i)
            nlst[i].finishSensePath(objs, sense);
    }

     



    cacheAmbientInfo(objs, sense)
    {
        local aprop;
        
         




        if ((aprop = sense.ambienceProp) != nil)
        {
            local sources;

             
            sources = new Vector(16);

             




            objs.forEachAssoc(function(cur, val)
            {
                 
                cur.clearSenseInfo();

                 
                if (cur.(aprop) != 0)
                    sources.append(cur);
            });

             




            for (local i = 1, local len = sources.length() ; i <= len ; ++i)
            {
                 
                local cur = sources[i];
                
                 
                if (cur.(aprop) != 0)
                    cur.transmitAmbient(sense);
            }
        }
        else
        {
             



            objs.forEachAssoc({cur, val: cur.clearSenseInfo()});
        }
    }

     



    transmitAmbient(sense)
    {
        local ambient;
        
         
        ambient = self.(sense.ambienceProp);

         
        if (ambient > tmpAmbient_)
        {
             





            tmpAmbient_ = ambient;
            tmpAmbientFill_ = nil;

             




            if (ambient >= 2)
            {
                 
                shineOnLoc(sense, ambient, nil);

                 
                shineOnContents(sense, ambient, nil);
            }
        }

         






        if (ambient == 1 && ambient > tmpAmbientWithin_)
            tmpAmbientWithin_ = ambient;
    }

     


    shineOnLoc(sense, ambient, fill)
    {
         



        if (location != nil)
            location.shineFromWithin(self, sense, ambient, fill);
    }

     


    shineOnContents(sense, ambient, fill)
    {
        local levelWithin;
        
         






        levelWithin = adjustBrightness(ambient, transSensingOut(sense));

         







        if (levelWithin >= 2 && levelWithin > tmpAmbientWithin_)
        {
            local fillWithin;

             
            tmpAmbientWithin_ = levelWithin;

             





            fillWithin = tmpFillMedium_;
            if (fillWithin != fill && fillWithin != nil)
            {
                 



                levelWithin = adjustBrightness(levelWithin,
                                               fillWithin.senseThru(sense));
            }
            
             
            if (levelWithin >= 2)
            {
                 
                for (local clst = contents, local i = 1,
                     local len = clst.length() ; i <= len ; ++i)
                {
                     
                    clst[i].shineFromWithout(self, sense,
                                             levelWithin, fillWithin);
                }
            }
        }
    }

     






    shineFromWithin(fromChild, sense, ambient, fill)
    {
        local levelWithout;
        local levelWithin;
        local fillWithin;
        
         










        levelWithin = ambient;
        fillWithin = tmpFillMedium_;
        if (fillWithin != fill && fillWithin != nil)
        {
             
            levelWithin = adjustBrightness(levelWithin,
                                           fillWithin.senseThru(sense));
        }

         
        if (levelWithin < 2)
            return;

         















        levelWithout = adjustBrightness(levelWithin, transSensingIn(sense));

         




        if (levelWithout > tmpAmbient_)
        {
             
            tmpAmbient_ = levelWithout;
            tmpAmbientFill_ = fillWithin;

             
            shineOnLoc(sense, levelWithout, fillWithin);
        }

         
        if (levelWithin > tmpAmbientWithin_)
        {
             
            tmpAmbientWithin_ = levelWithin;

             
            for (local i = 1, local clst = contents,
                 local len = clst.length() ; i <= len ; ++i)
            {
                 
                local cur = clst[i];

                 
                if (cur != fromChild)
                    cur.shineFromWithout(self, sense,
                                         levelWithin, fillWithin);
            }
        }
    }

     


    shineFromWithout(fromParent, sense, level, fill)
    {
         
        if (level > tmpAmbient_)
        {
             
            tmpAmbient_ = level;
            tmpAmbientFill_ = fill;

             
            shineOnContents(sense, level, fill);
        }
    }

     




    cacheSensePath(sense)
    {
         
        tmpPathIsIn_ = true;
        tmpTrans_ = transparent;
        tmpTransWithin_ = transparent;
        tmpObstructor_ = nil;
        tmpObstructorWithin_ = nil;

         
        sensePathToLoc(sense, transparent, nil, nil);

         
        sensePathToContents(sense, transparent, nil, nil);
    }

     


    sensePathToLoc(sense, trans, obs, fill)
    {
         



        if (location != nil)
            location.sensePathFromWithin(self, sense, trans, obs, fill);
    }

     


    sensePathToContents(sense, trans, obs, fill)
    {
        local transWithin;
        local obsWithin;
        local fillWithin;

         




        transWithin = transparencyAdd(trans, transSensingIn(sense));
        obsWithin = (trans == transWithin ? obs : self);

         




        fillWithin = tmpFillMedium_;
        if (fillWithin != fill && fillWithin != nil)
        {
            local oldTransWithin = transWithin;
            
             
            transWithin = transparencyAdd(transWithin,
                                          fillWithin.senseThru(sense));
            if (transWithin != oldTransWithin)
                obsWithin = fill;
        }

         
        if (transWithin != opaque)
        {
             
            for (local clst = contents,
                 local i = 1, local len = clst.length() ; i <= len ; ++i)
            {
                 
                clst[i].sensePathFromWithout(self, sense, transWithin,
                                             obsWithin, fillWithin);
            }
        }
    }

     


    sensePathFromWithin(fromChild, sense, trans, obs, fill)
    {
        local transWithin;
        local fillWithin;
        local transWithout;
        local obsWithout;

         









        transWithin = trans;
        fillWithin = tmpFillMedium_;
        if (fillWithin != fill && fillWithin != nil)
        {
             
            transWithin = transparencyAdd(transWithin,
                                          fillWithin.senseThru(sense));
            if (transWithin != trans)
                obs = fillWithin;
        }

         
        if (transWithin == opaque)
            return;

         




        transWithout = transparencyAdd(transWithin, transSensingOut(sense));
        obsWithout = (transWithout != transWithin ? self : obs);

         




        if (transparencyCompare(transWithout, tmpTrans_) > 0)
        {
             
            tmpTrans_ = transWithout;
            tmpObstructor_ = obsWithout;

             
            tmpPathIsIn_ = nil;

             
            sensePathToLoc(sense, transWithout, obsWithout, fillWithin);
        }

         



        if (transparencyCompare(transWithin, tmpTransWithin_) > 0)
        {
             
            tmpTransWithin_ = transWithin;
            tmpObstructorWithin_ = obs;

             
            tmpPathIsIn_ = nil;
            
             
            for (local i = 1, local clst = contents,
                 local len = clst.length() ; i <= len ; ++i)
            {
                 
                local cur = clst[i];
                
                 
                if (cur != fromChild)
                    cur.sensePathFromWithout(self, sense, transWithin,
                                             obs, fillWithin);
            }
        }
    }

     


    sensePathFromWithout(fromParent, sense, trans, obs, fill)
    {
         
        if (transparencyCompare(trans, tmpTrans_) > 0)
        {
             
            tmpTrans_ = trans;
            tmpObstructor_ = obs;

             
            tmpPathIsIn_ = true;

             
            sensePathToContents(sense, trans, obs, fill);
        }
    }
    

     



    clearSenseInfo()
    {
        tmpPathIsIn_ = true;
        tmpAmbient_ = 0;
        tmpAmbientWithin_ = 0;
        tmpAmbientFill_ = nil;
        tmpTrans_ = opaque;
        tmpTransWithin_ = opaque;
        tmpObstructor_ = nil;
        tmpObstructorWithin_ = nil;

         
        tmpFillMedium_ = fillMedium();
    }

     





    tmpAmbient_ = 0

     





    tmpAmbientFill_ = nil

     




    tmpTrans_ = opaque

     



    tmpObstructor_ = nil

     





    tmpAmbientWithin_ = 0
    tmpTransWithin_ = opaque
    tmpObstructorWithin_ = nil

     





    tmpPathIsIn_ = true

     




    tmpFillMedium_ = nil

     








    mergeSenseInfoTable(a, b)
    {
         
        if (a == nil)
            return b;
        else if (b == nil)
            return a;
        
         



        b.forEachAssoc({obj, info: a[obj] = mergeSenseInfo(a[obj], info)});

         
        return a;
    }

     




    mergeSenseInfo(a, b)
    {
         
        if (a == nil)
            return b;
        if (b == nil)
            return a;

         





        if (a.trans == b.trans)
        {
             




            if (a.ambient >= b.ambient)
                return a;
            else
                return b;
        }
        else
        {
             



            if (transparencyCompare(a.trans, b.trans) < 0)
                return b;
            else
                return a;
        }
    }

     






    beforeAction()
    {
         
    }

     




    afterAction()
    {
         
    }

     











    beforeTravel(traveler, connector) {   }

     





    afterTravel(traveler, connector) {   }

     













    getObjectNotifyList()
    {
         
        return objectNotifyList;
    }

     








    addObjectNotifyItem(obj)
    {
        objectNotifyList += obj;
    }

     
    removeObjectNotifyItem(obj)
    {
        objectNotifyList -= obj;
    }

     
    objectNotifyList = []

     
     














    verifyMoveTo(newLoc)
    {
         
        sendNotifyRemove(self, newLoc, &verifyRemove);

         
        if (newLoc != nil)
            newLoc.sendNotifyInsert(self, newLoc, &verifyInsert);
    }

     






    sendNotifyRemove(obj, newLoc, msg)
    {
         
        forEachContainer(function(loc) {
             





            if (newLoc == nil
                || (loc != newLoc && !newLoc.isIn(loc)))
            {
                 
                loc.(msg)(obj);

                 
                loc.sendNotifyRemove(obj, newLoc, msg);
            }
        });
    }

     










    sendNotifyInsert(obj, newCont, msg)
    {
         







        if (!obj.isIn(self))
        {
             



            forEachContainer({loc: loc.sendNotifyInsert(obj, newCont, msg)});

             
            self.(msg)(obj, newCont);
        }
        else if (newCont == self && !obj.isDirectlyIn(self))
        {
             
            self.(msg)(obj, self);
        }
    }

     





    verifyRemove(obj)
    {
    }

     




    verifyInsert(obj, newCont)
    {
         



        if (isIn(obj))
            ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(obj.circularlyInMessage,newCont, obj)));
    }

     



    circularlyInMessage = &circularlyInMsg

     










    notifyRemove(obj)
    {
    }

     










    notifyInsert(obj, newCont)
    {
    }

     















    notifyMoveInto(newCont)
    {
    }

     
     
















    propHidesProp(prop1, prop2)
    {
        local definer1;
        local definer2;
        
         



        definer1 = propDefined(prop1, 4);
        definer2 = propDefined(prop2, 4);

         
        if (definer1 == nil)
            return nil;

         
        if (definer2 == nil)
            return true;

         



        if (definer1.ofKind(definer2))
            return true;

         



        if (definer2.ofKind(definer1))
            return nil;

         








        return superHidesSuper(definer1, definer2);
    }

     




    superHidesSuper(s1, s2)
    {
        local lst;
        local idx1, idx2;
        
         
        lst = getSuperclassList();

         
        if (lst.length() == 0)
            return nil;

         




        if (lst.length() == 1)
            return lst[1].superHidesSuper(s1, s2);

         




        for (local i = 1, idx1 = idx2 = nil ;
             i <= lst.length() && (idx1 == nil || idx2 == nil) ; ++i)
        {
             




            if (idx1 == nil && lst[i].ofKind(s1))
                idx1 = i;

             
            if (idx2 == nil && lst[i].ofKind(s2))
                idx2 = i;
        }

         





        if (idx1 != idx2)
            return idx1 < idx2;

         





        return lst[idx1].superHidesSuper(s1, s2);
    }

     







    failCheck(msg, [params])
    {
        ((mainOutputStream.curTranscript).addReport(new FailCommandReport(msg,params...)));
        throw new ExitSignal();
    }

     
     


    sentinelDobjExamine = __objref(ExamineAction, warn)     propertyset '*DobjExamine'
    {
        preCond = [objVisible]
        verify()
        {
             
            if (!isIn((libGlobal.curActor)))
                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(80, 'not held', 100)));
        }
        action()
        {
             



            fromPOV((libGlobal.curActor), (libGlobal.curActor), &mainExamine);
        }
    }

     



    mainExamine()
    {
         
        basicExamine();

         



        basicExamineListen(nil);
        basicExamineSmell(nil);
        
         
        examineSpecialContents();
    }

     






    basicExamine()
    {
         
        local info = getVisualSenseInfo();
        local t = info.trans;

         








        if (getOutermostRoom() != getPOVDefault((libGlobal.curActor)).getOutermostRoom()
            && propDefined(&remoteDesc))
        {
             
            remoteDesc(getPOVDefault((libGlobal.curActor)));
        }
        else if (t == obscured && propDefined(&obscuredDesc))
        {
             
            obscuredDesc(info.obstructor);
        }
        else if (t == distant && propDefined(&distantDesc))
        {
             
            distantDesc;
        }
        else if (canDetailsBeSensed(sight, info, getPOVDefault((libGlobal.curActor))))
        {
             





            if (useInitDesc())
                initDesc;
            else
                desc;

             
            described = true;

             
            examineStatus();
        }
        else if (t == obscured)
        {
             





            defaultObscuredDesc(info.obstructor);
        }
        else if (t == distant)
        {
             




            defaultDistantDesc;
        }
    }

     











    examineStatus()
    {
         
        examineListContents();
    }

     





    examineListContents()
    {
         
        examineListContentsWith(descContentsLister);
    }

     
    examineListContentsWith(lister)
    {
         
        local tab = (libGlobal.curActor).visibleInfoTable();

         
        setContentsSeenBy(tab, (libGlobal.curActor));

         
        if (!contentsListedInExamine)
            return;

         
        local lst = getContentsForExamine(lister, tab);
        
         
        lister.showList((libGlobal.curActor), self, lst, 0x0002, 0, tab, nil,
                        examinee: self);
    }

     







    basicExamineListen(explicit)
    {
         
        local obj = getNoise();

         




        if (!explicit && (obj == nil || obj.isAmbient))
            return;

         
        local info = getPOVDefault((libGlobal.curActor)).senseObj(sound, self);
        local t = info.trans;

         




        if (canDetailsBeSensed(sound, info, getPOVDefault((libGlobal.curActor))))
        {
             




            if (obj != nil)
            {
                 
                obj.noteDisplay();
                
                 
                obj.sourceDesc;
            }
            else
            {
                 
                soundDesc;
            }
        }
        else if (t == obscured)
        {
             
            obscuredSoundDesc(info.obstructor);
        }
        else if (t == distant)
        {
             
            distantSoundDesc;
        }

         





        if (explicit)
        {
            local senseTab;
            local presenceList;

             
            senseTab = getPOVDefault((libGlobal.curActor)).senseInfoTable(sound);

             
            presenceList = senseInfoTableSubset(
                senseTab,
                {x, info: x.soundPresence && x.isIn(self) && x != obj});

             
            foreach (local cur in presenceList)
                cur.soundHereDesc();
        }
    }

     



    basicExamineSmell(explicit)
    {
        local obj;
        local info;
        local t;

         
        obj = getOdor();

         




        if (!explicit && (obj == nil || obj.isAmbient))
            return;
        
         
        info = getPOVDefault((libGlobal.curActor)).senseObj(smell, self);
        t = info.trans;

         




        if (canDetailsBeSensed(smell, info, getPOVDefault((libGlobal.curActor))))
        {
             
            if (obj != nil)
            {
                 
                obj.noteDisplay();
                
                 
                obj.sourceDesc;
            }
            else
            {
                 
                smellDesc;
            }
        }
        else if (t == obscured)
        {
             
            obscuredSmellDesc(info.obstructor);
        }
        else if (t == distant)
        {
             
            distantSmellDesc;
        }

         





        if (explicit)
        {
            local senseTab;
            local presenceList;

             
            senseTab = getPOVDefault((libGlobal.curActor)).senseInfoTable(smell);

             
            presenceList = senseInfoTableSubset(
                senseTab,
                {x, info: x.smellPresence && x.isIn(self) && x != obj});

             
            foreach (local cur in presenceList)
                cur.smellHereDesc();
        }
    }

     







    basicExamineTaste()
    {
         
        tasteDesc;
    }

     





    basicExamineFeel()
    {
         
        feelDesc;
    }

     





    examineSpecialContents()
    {
         
        local infoTab = (libGlobal.curActor).visibleInfoTable();

         



        local lst = specialDescList(
            infoTab, {obj: obj.useSpecialDescInContents(self)});

         
        (new SpecialDescContentsLister(self)).showList(
            (libGlobal.curActor), nil, lst, 0, 0, infoTab, nil);
    }

     




    specialDescList(infoTab, cond)
    {
        local lst;
        
         



        lst = infoTab.keysToList();

         
        lst = lst.subset(cond);

         







        return lst.sort(nil, function(a, b) {
             
            if (a.specialDescOrder != b.specialDescOrder)
                return a.specialDescOrder - b.specialDescOrder;

             



            if (a.isIn(b))
                return 1;
            else if (b.isIn(a))
                return -1;
            else
                return 0;
        });
    }
    

     
     


    sentinelDobjRead = __objref(ReadAction, warn)     propertyset '*DobjRead'
    {
        preCond = [objVisible]
        verify()
        {
             



            ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not readable', 100)));

             
            if (!isIn((libGlobal.curActor)))
                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(80, 'not held', 100)));
        }
        action()
        {
             
            actionDobjExamine();
        }
    }

     
     


    sentinelDobjLookIn = __objref(LookInAction, warn)     propertyset '*DobjLookIn'
    {
        preCond = [objVisible]
        verify()
        {
             
            if (!isIn((libGlobal.curActor)))
                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(80, 'not held', 100)));
        }
        action()
        {
             
            lookInDesc;
        }
    }

     
     



    sentinelDobjSearch = __objref(SearchAction, warn)     propertyset '*DobjSearch' {         preCond { return preCondDobjLookIn; }         verify() { verifyDobjLookIn; }         remap() { return remapDobjLookIn; }         check() { checkDobjLookIn; }         action() { actionDobjLookIn; }     }

     
     


    sentinelDobjLookUnder = __objref(LookUnderAction, warn)     propertyset '*DobjLookUnder'
    {
        preCond = [objVisible]
        verify() { }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&nothingUnderMsg))); }
    }

     
     


    sentinelDobjLookBehind = __objref(LookBehindAction, warn)     propertyset '*DobjLookBehind'
    {
        preCond = [objVisible]
        verify() { }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&nothingBehindMsg))); }
    }

     
     


    sentinelDobjLookThrough = __objref(LookThroughAction, warn)     propertyset '*DobjLookThrough'
    {
        verify() { }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&nothingThroughMsg))); }
    }

     
     


    sentinelDobjListenTo = __objref(ListenToAction, warn)     propertyset '*DobjListenTo'
    {
        preCond = [objAudible]
        verify() { }
        action()
        {
             
            fromPOV((libGlobal.curActor), (libGlobal.curActor), &basicExamineListen, true);
        }
    }

     
     


    sentinelDobjSmell = __objref(SmellAction, warn)     propertyset '*DobjSmell'
    {
        preCond = [objSmellable]
        verify() { }
        action()
        {
             



            fromPOV((libGlobal.curActor), (libGlobal.curActor), &basicExamineSmell, true);
        }
    }

     
     


    sentinelDobjTaste = __objref(TasteAction, warn)     propertyset '*DobjTaste'
    {
         
        preCond = [touchObj]
        verify()
        {
             
            ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not edible', 100)));
        }
        action()
        {
             
            fromPOV((libGlobal.curActor), (libGlobal.curActor), &basicExamineTaste);
        }
    }

     
     


    sentinelDobjFeel = __objref(FeelAction, warn)     propertyset '*DobjFeel'
    {
         
        preCond = [touchObj]
        verify() { }
        action()
        {
             
            fromPOV((libGlobal.curActor), (libGlobal.curActor), &basicExamineFeel);
        }
    }
    

     
     



    sentinelDobjTake = __objref(TakeAction, warn)     propertyset '*DobjTake'
    {
        preCond = [touchObj, objNotWorn, roomToHoldObj]
        verify()
        {
             



            if (isDirectlyIn((libGlobal.curActor)))
            {
                 
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&alreadyHoldingMsg)));
            }
            else
            {
                local carrier;
                
                 








                if (isIn((libGlobal.curActor)))
                    ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(70, 'already in', 100)));

                 






                carrier = getCarryingActor();
                if (carrier != nil && carrier != (libGlobal.curActor))
                    ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(60, 'other owner', 100)));
            }

             



            verifyMoveTo((libGlobal.curActor));
        }
    
        action()
        {
             
            moveInto((libGlobal.curActor));

             
            ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&okayTakeMsg)));
        }
    }

     
     









    sentinelDobjRemove = __objref(RemoveAction, warn)     propertyset '*DobjRemove'
    {
        preCond = [touchObj, objNotWorn, roomToHoldObj]
        verify()
        {
             
            if (isHeldBy((libGlobal.curActor)))
                ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(&cannotRemoveHeldMsg)));
        }
        action() { (TakeFromAction.retryWithMissingIobj((libGlobal.curAction), ResolveAsker)); }
    }

     
     


    sentinelDobjTakeFrom = __objref(TakeFromAction, warn)     propertyset '*DobjTakeFrom'
    {
        preCond = [touchObj, objNotWorn, roomToHoldObj]
        verify()
        {
             



            if (((libGlobal.curAction).getIobj()) != nil && !self.isIn(((libGlobal.curAction).getIobj())))
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(((libGlobal.curAction).getIobj()).takeFromNotInMessage)));

             
            verifyDobjTake();
        }
        check()
        {
             
            checkDobjTake();
        }
        action()
        {
             
            _replaceAction((libGlobal.curActor), TakeAction,self);
        }
    }
    sentinelIobjTakeFrom = __objref(TakeFromAction, warn)     propertyset '*IobjTakeFrom'
    {
        verify()
        {
             
            if (((libGlobal.curAction).getDobj()) == nil)
            {
                 





                if (((libGlobal.curAction).getTentativeDobj()).indexWhich({x: x.obj_.isIn(self)}) == nil)
                    ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(takeFromNotInMessage)));
                else if (((libGlobal.curAction).getTentativeDobj()).indexWhich(
                    {x: x.obj_.isDirectlyIn(self)}) != nil)
                    ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(150, 'directly in', 100)));
            }
            else if (!((libGlobal.curAction).getDobj()).isIn(self))
            {
                 



                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(takeFromNotInMessage)));
            }
            else if (((libGlobal.curAction).getDobj()).isDirectlyIn(self))
            {
                 



                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(150, 'directly in', 100)));
            }
        }
    }

     
    takeFromNotInMessage = &takeFromNotInMsg

     
     


    sentinelDobjDrop = __objref(DropAction, warn)     propertyset '*DobjDrop'
    {
        preCond = [objHeld]
        verify()
        {
             
            if (isIn((libGlobal.curActor)))
            {
                 




                verifyMoveTo((libGlobal.curActor).getDropDestination(self, nil));
            }
            else
            {
                 
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&notCarryingMsg)));
            }
        }

        action()
        {
             
            (libGlobal.curActor).getDropDestination(self, nil)
                .receiveDrop(self, dropTypeDrop);
        }
    }

     
     



    sentinelDobjPutIn = __objref(PutInAction, warn)     propertyset '*DobjPutIn'
    {
        preCond = [objHeld]
        verify()
        {
             






            if (((libGlobal.curAction).getIobj()) != nil && isDirectlyIn(((libGlobal.curAction).getIobj())))
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&alreadyPutInMsg)));

             
            if (((libGlobal.curAction).getIobj()) == self)
                ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(&cannotPutInSelfMsg)));

             
            verifyMoveTo(((libGlobal.curAction).getIobj()));
        }
    }
    sentinelIobjPutIn = __objref(PutInAction, warn)     propertyset '*IobjPutIn'
    {
        preCond = [touchObj]
        verify()
        {
             
            ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAContainerMsg)));
        }
    }

     
     



    sentinelDobjPutOn = __objref(PutOnAction, warn)     propertyset '*DobjPutOn'
    {
        preCond = [objHeld]
        verify()
        {
             
            if (((libGlobal.curAction).getIobj()) != nil && isDirectlyIn(((libGlobal.curAction).getIobj())))
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&alreadyPutOnMsg)));

             
            if (((libGlobal.curAction).getIobj()) == self)
                ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(&cannotPutOnSelfMsg)));

             
            verifyMoveTo(((libGlobal.curAction).getIobj()));
        }
    }

    sentinelIobjPutOn = __objref(PutOnAction, warn)     propertyset '*IobjPutOn'
    {
        preCond = [touchObj]
        verify()
        {
             
            ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notASurfaceMsg)));
        }
    }

     
     


    sentinelDobjPutUnder = __objref(PutUnderAction, warn)     propertyset '*DobjPutUnder'
    {
        preCond = [objHeld]
        verify() { }
    }

    sentinelIobjPutUnder = __objref(PutUnderAction, warn)     propertyset '*IobjPutUnder'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPutUnderMsg))); }
    }

     
     


    sentinelDobjPutBehind = __objref(PutBehindAction, warn)     propertyset '*DobjPutBehind'
    {
        preCond = [objHeld]
        verify() { }
    }

    sentinelIobjPutBehind = __objref(PutBehindAction, warn)     propertyset '*IobjPutBehind'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPutBehindMsg))); }
    }

     
     


    sentinelDobjWear = __objref(WearAction, warn)     propertyset '*DobjWear'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notWearableMsg))); }
    }

     
     


    sentinelDobjDoff = __objref(DoffAction, warn)     propertyset '*DobjDoff'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notDoffableMsg))); }
    }

     
     


    sentinelDobjKiss = __objref(KissAction, warn)     propertyset '*DobjKiss'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not kissable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotKissMsg))); }
    }

     
     


    sentinelDobjAskFor = __objref(AskForAction, warn)     propertyset '*DobjAskFor'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAddressableMsg,self))); }
    }

     
     


    sentinelDobjTalkTo = __objref(TalkToAction, warn)     propertyset '*DobjTalkTo'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAddressableMsg,self))); }
    }

     
     


    sentinelDobjGiveTo = __objref(GiveToAction, warn)     propertyset '*DobjGiveTo'
    {
        preCond = [objHeld]
        verify()
        {
             



            if (((libGlobal.curAction).getIobj()) != nil && isHeldBy(((libGlobal.curAction).getIobj())))
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&giveAlreadyHasMsg)));

             
            inherited();
        }
    }
    sentinelIobjGiveTo = __objref(GiveToAction, warn)     propertyset '*IobjGiveTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotGiveToMsg))); }
    }

     
     


    sentinelDobjShowTo = __objref(ShowToAction, warn)     propertyset '*DobjShowTo'
    {
        preCond = [objHeld]
        verify()
        {
             
            if (isHeldBy((libGlobal.curActor)))
            {
                 
            }
            else if (isIn((libGlobal.curActor)))
            {
                 



                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(80, 'not held', 100)));
            }
            else
            {
                 



                ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(70, 'not carried', 100)));
            }
        }
        check()
        {
             




            if (!((libGlobal.curAction).getIobj()).canSee(self))
            {
                ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&actorCannotSeeMsg,((libGlobal.curAction).getIobj()), self)));
                throw new ExitSignal();
            }

             





            if (!((libGlobal.curAction).getIobj()).canSee((libGlobal.curActor)))
            {
                ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&actorCannotSeeMsg,((libGlobal.curAction).getIobj()), (libGlobal.curActor))));
                throw new ExitSignal();
            }
        }
    }
    sentinelIobjShowTo = __objref(ShowToAction, warn)     propertyset '*IobjShowTo'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotShowToMsg))); }
    }

     
     


    sentinelDobjAskAbout = __objref(AskAboutAction, warn)     propertyset '*DobjAskAbout'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAddressableMsg,self))); }
    }

     
     


    sentinelDobjTellAbout = __objref(TellAboutAction, warn)     propertyset '*DobjTellAbout'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAddressableMsg,self))); }
    }

     
     



    sentinelDobjAskVague = __objref(AskVagueAction, warn)     propertyset '*DobjAskVague'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&askVagueMsg))); }
    }
    sentinelDobjTellVague = __objref(TellVagueAction, warn)     propertyset '*DobjTellVague'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&tellVagueMsg))); }
    }

     
     


    sentinelDobjFollow = __objref(FollowAction, warn)     propertyset '*DobjFollow'
    {
        verify()
        {
             
            if (!verifyFollowable())
                return;

             
            if ((libGlobal.curActor) == ((libGlobal.curAction).getDobj()))
                ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotFollowSelfMsg)));

             
            (libGlobal.curActor).actorVerifyFollow(self);
        }
        action()
        {
             
            (libGlobal.curActor).actorActionFollow(self);
        }
    }

     





    verifyFollowable()
    {
        ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notFollowableMsg)));
        return nil;
    }

     
     


    sentinelDobjAttack = __objref(AttackAction, warn)     propertyset '*DobjAttack'
    {
        preCond = [touchObj]
        verify() { }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&uselessToAttackMsg))); }
    }

     
     


    sentinelDobjAttackWith = __objref(AttackWithAction, warn)     propertyset '*DobjAttackWith'
    {
        preCond = [touchObj]

         



        verify() { }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&uselessToAttackMsg))); }
    }
    sentinelIobjAttackWith = __objref(AttackWithAction, warn)     propertyset '*IobjAttackWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&notAWeaponMsg))); }
    }

     
     









    sentinelDobjThrow = __objref(ThrowAction, warn)     propertyset '*DobjThrow'
    {
        verify() { }
        action() { (ThrowAtAction.retryWithMissingIobj((libGlobal.curAction), ResolveAsker)); }
    }

     
     





    sentinelDobjThrowDir = __objref(ThrowDirAction, warn)     propertyset '*DobjThrowDir'
    {
        verify()
        {
            if ((libGlobal.curAction).getDirection() == downDirection)
                ((libGlobal.curVerifyResults).addResult(         new IllogicalAlreadyVerifyResult(&shouldNotThrowAtFloorMsg)));
        }
        action()
        {
             



            ((mainOutputStream.curTranscript).addReport(new FailCommandReport((libGlobal.curAction).getDirection() == downDirection                           ? &shouldNotThrowAtFloorMsg                           : &dontThrowDirMsg)))

;
        }
    }


     
     


    sentinelDobjThrowAt = __objref(ThrowAtAction, warn)     propertyset '*DobjThrowAt'
    {
        preCond = [objHeld]
        verify()
        {
             
            verifyMoveTo((libGlobal.curActor).getDropDestination(self, nil));

             
            if (((libGlobal.curAction).getIobj()) == self)
                ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(&cannotThrowAtSelfMsg)));

             
            if (((libGlobal.curAction).getIobj()) != nil && ((libGlobal.curAction).getIobj()).isIn(self))
                ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(&cannotThrowAtContentsMsg)));
        }
        action()
        {
             



            processThrow(((libGlobal.curAction).getIobj()), &throwTargetHitWith);
        }
    }
    sentinelIobjThrowAt = __objref(ThrowAtAction, warn)     propertyset '*IobjThrowAt'
    {
         
        verify() { }
    }

     






    processThrow(target, hitProp)
    {
        local path;
        local stat;
        
         
        path = getThrowPathTo(target);
        
         
        stat = traversePath(
            path, {obj, op: throwViaPath(obj, op, target, path)});
        
         







        if (stat)
            target.(hitProp)(self, path);
    }

     












    throwViaPath(obj, op, target, path)
    {
         





        if (obj.canThrowViaPath(self, target, op))
        {
             
            return true;
        }
        else
        {
             
            return obj.stopThrowViaPath(self, path);
        }
    }

     








    throwTargetHitWith(projectile, path)
    {
         



        getHitFallDestination(projectile, path)
            .receiveDrop(projectile, new DropTypeThrow(self, path));
    }

     




















    stopThrowViaPath(projectile, path)
    {
         
        throwTargetHitWith(projectile, path);
        
         
        return nil;
    }
    
     



















    getHitFallDestination(thrownObj, path)
    {
        local prvCont;
        local prvOp;
        local idx;
        local dest;
        local common;

         
        idx = path.indexOf(self);

         




        prvCont = path[idx - 2];
        
         
        prvOp = path[idx - 1];

         




















        if (prvCont == thrownObj)
        {
             
            dest = (location != nil
                    ? location.getDropDestination(thrownObj, path)
                    : self);
        }
        else if (prvCont.isIn(self))
        {
             
            dest = getDropDestination(thrownObj, path);
        }
        else if (prvOp == PathPeer
                 && (common = getCommonDirectContainer(prvCont)) != nil)
        {
             




            dest = common.getDropDestination(thrownObj, path);
        }
        else
        {
             





            dest = prvCont.getDropDestination(thrownObj, path);
        }

         



        return dest.adjustThrowDestination(thrownObj, path);
    }

     
     


    sentinelDobjThrowTo = __objref(ThrowToAction, warn)     propertyset '*DobjThrowTo'
    {
        preCond = [objHeld]
        verify()
        {
             



            verifyDobjThrowAt();
        }
        action()
        {
             



            processThrow(((libGlobal.curAction).getIobj()), &throwTargetCatch);
        }
    }

    sentinelIobjThrowTo = __objref(ThrowToAction, warn)     propertyset '*IobjThrowTo'
    {
        verify()
        {
             
            ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotThrowToMsg)));
        }
    }

     



    throwTargetCatch(obj, path)
    {
         
        obj.moveInto(self);

         
        if (obj.isDirectlyIn(self))
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&throwCatchMsg,obj, self)));
    }

     
     






    sentinelDobjDig = __objref(DigAction, warn)     propertyset '*DobjDig'
    {
        preCond = [touchObj]
        verify() { }
        action() { (DigWithAction.retryWithMissingIobj((libGlobal.curAction), ResolveAsker)); }
    }

     
     


    sentinelDobjDigWith = __objref(DigWithAction, warn)     propertyset '*DobjDigWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDigMsg))); }
    }
    sentinelIobjDigWith = __objref(DigWithAction, warn)     propertyset '*IobjDigWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDigWithMsg))); }
    }

     
     


    sentinelDobjJumpOver = __objref(JumpOverAction, warn)     propertyset '*DobjJumpOver'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotJumpOverMsg))); }
    }

     
     


    sentinelDobjJumpOff = __objref(JumpOffAction, warn)     propertyset '*DobjJumpOff'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotJumpOffMsg))); }
    }

     
     


    sentinelDobjPush = __objref(PushAction, warn)     propertyset '*DobjPush'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not pushable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&pushNoEffectMsg))); }
    }

     
     


    sentinelDobjPull = __objref(PullAction, warn)     propertyset '*DobjPull'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not pullable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&pullNoEffectMsg))); }
    }

     
     


    sentinelDobjMove = __objref(MoveAction, warn)     propertyset '*DobjMove'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not movable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&moveNoEffectMsg))); }
    }

     
     


    sentinelDobjMoveWith = __objref(MoveWithAction, warn)     propertyset '*DobjMoveWith'
    {
        preCond = [iobjTouchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not movable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&moveNoEffectMsg))); }
    }
    sentinelIobjMoveWith = __objref(MoveWithAction, warn)     propertyset '*IobjMoveWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotMoveWithMsg))); }
    }

     
     


    sentinelDobjMoveTo = __objref(MoveToAction, warn)     propertyset '*DobjMoveTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not movable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&moveToNoEffectMsg))); }
    }

     
     


    sentinelDobjTurn = __objref(TurnAction, warn)     propertyset '*DobjTurn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnMsg))); }
    }

     
     


    sentinelDobjTurnTo = __objref(TurnToAction, warn)     propertyset '*DobjTurnTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnMsg))); }
    }

     
     


    sentinelDobjTurnWith = __objref(TurnWithAction, warn)     propertyset '*DobjTurnWith'
    {
        preCond = [iobjTouchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnMsg))); }
    }
    sentinelIobjTurnWith = __objref(TurnWithAction, warn)     propertyset '*IobjTurnWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnWithMsg))); }
    }

     
     


    sentinelDobjSet = __objref(SetAction, warn)     propertyset '*DobjSet'
    {
        verify() { }
        action() { (PutOnAction.retryWithMissingIobj((libGlobal.curAction), ResolveAsker)); }
    }

     
     


    sentinelDobjSetTo = __objref(SetToAction, warn)     propertyset '*DobjSetTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotSetToMsg))); }
    }

     
     


    sentinelDobjConsult = __objref(ConsultAction, warn)     propertyset '*DobjConsult'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotConsultMsg))); }
    }

    sentinelDobjConsultAbout = __objref(ConsultAboutAction, warn)     propertyset '*DobjConsultAbout'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotConsultMsg))); }
    }

     
     


    sentinelDobjTypeOn = __objref(TypeOnAction, warn)     propertyset '*DobjTypeOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTypeOnMsg))); }

         




        action() { (TypeLiteralOnAction.retryWithMissingLiteral((libGlobal.curAction))); }
    }

     


    sentinelDobjTypeLiteralOn = __objref(TypeLiteralOnAction, warn)     propertyset '*DobjTypeLiteralOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTypeOnMsg))); }
    }

     
     


    sentinelDobjEnterOn = __objref(EnterOnAction, warn)     propertyset '*DobjEnterOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotEnterOnMsg))); }
    }

     
     


    sentinelDobjSwitch = __objref(SwitchAction, warn)     propertyset '*DobjSwitch'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotSwitchMsg))); }
    }

     
     


    sentinelDobjFlip = __objref(FlipAction, warn)     propertyset '*DobjFlip'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotFlipMsg))); }
    }

     
     


    sentinelDobjTurnOn = __objref(TurnOnAction, warn)     propertyset '*DobjTurnOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnOnMsg))); }
    }

     
     


    sentinelDobjTurnOff = __objref(TurnOffAction, warn)     propertyset '*DobjTurnOff'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotTurnOffMsg))); }
    }

     
     



    sentinelDobjLight = __objref(LightAction, warn)     propertyset '*DobjLight' {         preCond { return preCondDobjBurn; }         verify() { verifyDobjBurn; }         remap() { return remapDobjBurn; }         check() { checkDobjBurn; }         action() { actionDobjBurn; }     }

     
     



    sentinelDobjBurn = __objref(BurnAction, warn)     propertyset '*DobjBurn'
    {
        preCond = [touchObj]
        verify()
        {
             



            ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not flammable', 100)));
        }
        action()
        {
             
            (BurnWithAction.retryWithMissingIobj((libGlobal.curAction), ResolveAsker));
        }
    }

     
     


    sentinelDobjBurnWith = __objref(BurnWithAction, warn)     propertyset '*DobjBurnWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotBurnMsg))); }
    }
    sentinelIobjBurnWith = __objref(BurnWithAction, warn)     propertyset '*IobjBurnWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotBurnWithMsg))); }
    }

     
     


    sentinelDobjExtinguish = __objref(ExtinguishAction, warn)     propertyset '*DobjExtinguish'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotExtinguishMsg))); }
    }

     
     


    sentinelDobjAttachTo = __objref(AttachToAction, warn)     propertyset '*DobjAttachTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotAttachMsg))); }
    }
    sentinelIobjAttachTo = __objref(AttachToAction, warn)     propertyset '*IobjAttachTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotAttachToMsg))); }
    }

     
     


    sentinelDobjDetachFrom = __objref(DetachFromAction, warn)     propertyset '*DobjDetachFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDetachMsg))); }
    }
    sentinelIobjDetachFrom = __objref(DetachFromAction, warn)     propertyset '*IobjDetachFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDetachFromMsg))); }
    }

     
     


    sentinelDobjDetach = __objref(DetachAction, warn)     propertyset '*DobjDetach'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDetachMsg))); }
    }

     
     


    sentinelDobjBreak = __objref(BreakAction, warn)     propertyset '*DobjBreak'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&shouldNotBreakMsg))); }
    }

     
     


    sentinelDobjCutWith = __objref(CutWithAction, warn)     propertyset '*DobjCutWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'not cuttable', 100))); }
        action() { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&cutNoEffectMsg))); }
    }

    sentinelIobjCutWith = __objref(CutWithAction, warn)     propertyset '*IobjCutWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotCutWithMsg))); }
    }

     
     


    sentinelDobjClimb = __objref(ClimbAction, warn)     propertyset '*DobjClimb'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotClimbMsg))); }
    }

    sentinelDobjClimbUp = __objref(ClimbUpAction, warn)     propertyset '*DobjClimbUp'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotClimbMsg))); }
    }

    sentinelDobjClimbDown = __objref(ClimbDownAction, warn)     propertyset '*DobjClimbDown'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotClimbMsg))); }
    }

     
     


    sentinelDobjOpen = __objref(OpenAction, warn)     propertyset '*DobjOpen'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotOpenMsg))); }
    }

     
     


    sentinelDobjClose = __objref(CloseAction, warn)     propertyset '*DobjClose'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotCloseMsg))); }
    }

     
     


    sentinelDobjLock = __objref(LockAction, warn)     propertyset '*DobjLock'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotLockMsg))); }
    }

     
     


    sentinelDobjUnlock = __objref(UnlockAction, warn)     propertyset '*DobjUnlock'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnlockMsg))); }
    }

     
     


    sentinelDobjLockWith = __objref(LockWithAction, warn)     propertyset '*DobjLockWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotLockMsg))); }
    }
    sentinelIobjLockWith = __objref(LockWithAction, warn)     propertyset '*IobjLockWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotLockWithMsg))); }
    }

     
     


    sentinelDobjUnlockWith = __objref(UnlockWithAction, warn)     propertyset '*DobjUnlockWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnlockMsg))); }
    }
    sentinelIobjUnlockWith = __objref(UnlockWithAction, warn)     propertyset '*IobjUnlockWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnlockWithMsg))); }
    }

     
     


    sentinelDobjEat = __objref(EatAction, warn)     propertyset '*DobjEat'
    {
         



        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotEatMsg))); }
    }

     
     


    sentinelDobjDrink = __objref(DrinkAction, warn)     propertyset '*DobjDrink'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotDrinkMsg))); }
    }

     
     


    sentinelDobjPour = __objref(PourAction, warn)     propertyset '*DobjPour'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPourMsg))); }
    }

     
     


    sentinelDobjPourInto = __objref(PourIntoAction, warn)     propertyset '*DobjPourInto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPourMsg))); }
    }
    sentinelIobjPourInto = __objref(PourIntoAction, warn)     propertyset '*IobjPourInto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPourIntoMsg))); }
    }

     
     


    sentinelDobjPourOnto = __objref(PourOntoAction, warn)     propertyset '*DobjPourOnto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPourMsg))); }
    }
    sentinelIobjPourOnto = __objref(PourOntoAction, warn)     propertyset '*IobjPourOnto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPourOntoMsg))); }
    }

     
     


    sentinelDobjClean = __objref(CleanAction, warn)     propertyset '*DobjClean'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotCleanMsg))); }
    }

     
     


    sentinelDobjCleanWith = __objref(CleanWithAction, warn)     propertyset '*DobjCleanWith'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotCleanMsg))); }
    }
    sentinelIobjCleanWith = __objref(CleanWithAction, warn)     propertyset '*IobjCleanWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotCleanWithMsg))); }
    }

     
     


    sentinelDobjSitOn = __objref(SitOnAction, warn)     propertyset '*DobjSitOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotSitOnMsg))); }
    }

     
     


    sentinelDobjLieOn = __objref(LieOnAction, warn)     propertyset '*DobjLieOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotLieOnMsg))); }
    }

     
     


    sentinelDobjStandOn = __objref(StandOnAction, warn)     propertyset '*DobjStandOn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotStandOnMsg))); }
    }

     
     


    sentinelDobjBoard = __objref(BoardAction, warn)     propertyset '*DobjBoard'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotBoardMsg))); }
    }

     
     


    sentinelDobjGetOutOf = __objref(GetOutOfAction, warn)     propertyset '*DobjGetOutOf'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnboardMsg))); }
    }

     


    sentinelDobjGetOffOf = __objref(GetOffOfAction, warn)     propertyset '*DobjGetOffOf'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotGetOffOfMsg))); }
    }

     
     


    sentinelDobjFasten = __objref(FastenAction, warn)     propertyset '*DobjFasten'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotFastenMsg))); }
    }

     
     


    sentinelDobjFastenTo = __objref(FastenToAction, warn)     propertyset '*DobjFastenTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotFastenMsg))); }
    }
    sentinelIobjFastenTo = __objref(FastenToAction, warn)     propertyset '*IobjFastenTo'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotFastenToMsg))); }
    }

     
     


    sentinelDobjUnfasten = __objref(UnfastenAction, warn)     propertyset '*DobjUnfasten'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnfastenMsg))); }
    }

     
     


    sentinelDobjUnfastenFrom = __objref(UnfastenFromAction, warn)     propertyset '*DobjUnfastenFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnfastenMsg))); }
    }
    sentinelIobjUnfastenFrom = __objref(UnfastenFromAction, warn)     propertyset '*IobjUnfastenFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnfastenFromMsg))); }
    }

     
     


    sentinelDobjPlugIn = __objref(PlugInAction, warn)     propertyset '*DobjPlugIn'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPlugInMsg))); }
    }

     
     


    sentinelDobjPlugInto = __objref(PlugIntoAction, warn)     propertyset '*DobjPlugInto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPlugInMsg))); }
    }
    sentinelIobjPlugInto = __objref(PlugIntoAction, warn)     propertyset '*IobjPlugInto'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPlugInToMsg))); }
    }

     
     


    sentinelDobjUnplug = __objref(UnplugAction, warn)     propertyset '*DobjUnplug'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnplugMsg))); }
    }

     
     


    sentinelDobjUnplugFrom = __objref(UnplugFromAction, warn)     propertyset '*DobjUnplugFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnplugMsg))); }
    }
    sentinelIobjUnplugFrom = __objref(UnplugFromAction, warn)     propertyset '*IobjUnplugFrom'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnplugFromMsg))); }
    }

     
     


    sentinelDobjScrew = __objref(ScrewAction, warn)     propertyset '*DobjScrew'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotScrewMsg))); }
    }

     
     


    sentinelDobjScrewWith = __objref(ScrewWithAction, warn)     propertyset '*DobjScrewWith'
    {
        preCond = [iobjTouchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotScrewMsg))); }
    }
    sentinelIobjScrewWith = __objref(ScrewWithAction, warn)     propertyset '*IobjScrewWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotScrewWithMsg))); }
    }

     
     


    sentinelDobjUnscrew = __objref(UnscrewAction, warn)     propertyset '*DobjUnscrew'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnscrewMsg))); }
    }

     
     


    sentinelDobjUnscrewWith = __objref(UnscrewWithAction, warn)     propertyset '*DobjUnscrewWith'
    {
        preCond = [iobjTouchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnscrewMsg))); }
    }
    sentinelIobjUnscrewWith = __objref(UnscrewWithAction, warn)     propertyset '*IobjUnscrewWith'
    {
        preCond = [objHeld]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotUnscrewWithMsg))); }
    }

     
     


    sentinelDobjEnter = __objref(EnterAction, warn)     propertyset '*DobjEnter'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotEnterMsg))); }
    }

     


    sentinelDobjGoThrough = __objref(GoThroughAction, warn)     propertyset '*DobjGoThrough'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotGoThroughMsg))); }
    }

     
     



    sentinelDobjPushTravel = __objref(PushTravelAction, warn)     propertyset '*DobjPushTravel'
    {
        preCond = [touchObj]
        verify() { ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&cannotPushTravelMsg))); }
    }

     





    sentinelDobjPushTravelThrough = __objref(PushTravelThroughAction, warn)     propertyset '*DobjPushTravelThrough' {         preCond { return preCondDobjPushTravel; }         verify() { verifyDobjPushTravel; }         remap() { return remapDobjPushTravel; }         check() { checkDobjPushTravel; }         action() { actionDobjPushTravel; }     }     sentinelIobjPushTravelThrough = __objref(PushTravelThroughAction, warn)     propertyset '*IobjPushTravelThrough'     {         verify()             { (libGlobal.curAction).verifyPushTravelIobj(self, GoThroughAction); }     }
    sentinelDobjPushTravelEnter = __objref(PushTravelEnterAction, warn)     propertyset '*DobjPushTravelEnter' {         preCond { return preCondDobjPushTravel; }         verify() { verifyDobjPushTravel; }         remap() { return remapDobjPushTravel; }         check() { checkDobjPushTravel; }         action() { actionDobjPushTravel; }     }     sentinelIobjPushTravelEnter = __objref(PushTravelEnterAction, warn)     propertyset '*IobjPushTravelEnter'     {         verify()             { (libGlobal.curAction).verifyPushTravelIobj(self, EnterAction); }     }
    sentinelDobjPushTravelGetOutOf = __objref(PushTravelGetOutOfAction, warn)     propertyset '*DobjPushTravelGetOutOf' {         preCond { return preCondDobjPushTravel; }         verify() { verifyDobjPushTravel; }         remap() { return remapDobjPushTravel; }         check() { checkDobjPushTravel; }         action() { actionDobjPushTravel; }     }     sentinelIobjPushTravelGetOutOf = __objref(PushTravelGetOutOfAction, warn)     propertyset '*IobjPushTravelGetOutOf'     {         verify()             { (libGlobal.curAction).verifyPushTravelIobj(self, GetOutOfAction); }     }
    sentinelDobjPushTravelClimbUp = __objref(PushTravelClimbUpAction, warn)     propertyset '*DobjPushTravelClimbUp' {         preCond { return preCondDobjPushTravel; }         verify() { verifyDobjPushTravel; }         remap() { return remapDobjPushTravel; }         check() { checkDobjPushTravel; }         action() { actionDobjPushTravel; }     }     sentinelIobjPushTravelClimbUp = __objref(PushTravelClimbUpAction, warn)     propertyset '*IobjPushTravelClimbUp'     {         verify()             { (libGlobal.curAction).verifyPushTravelIobj(self, ClimbUpAction); }     }
    sentinelDobjPushTravelClimbDown = __objref(PushTravelClimbDownAction, warn)     propertyset '*DobjPushTravelClimbDown' {         preCond { return preCondDobjPushTravel; }         verify() { verifyDobjPushTravel; }         remap() { return remapDobjPushTravel; }         check() { checkDobjPushTravel; }         action() { actionDobjPushTravel; }     }     sentinelIobjPushTravelClimbDown = __objref(PushTravelClimbDownAction, warn)     propertyset '*IobjPushTravelClimbDown'     {         verify()             { (libGlobal.curAction).verifyPushTravelIobj(self, ClimbDownAction); }     }
;

