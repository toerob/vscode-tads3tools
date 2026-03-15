enum ModePlayer, ModeNPC;

class Topic: VocabObject
    isKnown = true
    canBeSensed(sense, trans, ambient) { return nil; }
        canResolvePossessive = nil
;
 
class FollowInfo: object
    obj = nil
    connector = nil
    sourceLocation = nil
;

class Posture: object
    tryMakingPosture(loc) { }
    setActorToPosture(actor, loc) { }
;

standing: Posture
    tryMakingPosture(loc) { return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     StandOnAction,loc); }
    setActorToPosture(actor, loc) { _nestedAction(nil, actor, StandOnAction,loc); }
;

sitting: Posture
    tryMakingPosture(loc) { return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     SitOnAction,loc); }
    setActorToPosture(actor, loc) { _nestedAction(nil, actor, SitOnAction,loc); }
;

lying: Posture
    tryMakingPosture(loc) { return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     LieOnAction,loc); }
    setActorToPosture(actor, loc) { _nestedAction(nil, actor, LieOnAction,loc); }
;

conversationManager: OutputFilter, PreinitObject
    customTags = nil
    doCustomTag(tag, arg) {   }
        filterText(ostr, txt)
    {
        local start;
        
         
        for (start = 1 ; ; )
        {
            local match;
            local arg;
            local actor;
            local sp;
            local tag;
            local nxtOfs;
            
             
            match = rexSearch(tagPat, txt, start);

             
            if (match == nil)
                break;

             
            nxtOfs = match[1] + match[2];

             
            arg = rexGroup(3);
            if (arg != nil)
                arg = arg[3];

             
            tag = rexGroup(1)[3].toLower();

             
            switch (tag)
            {
            case 'reveal':
                 
                setRevealed(arg);
                break;

            case 'convbegin':
            

                actor = idToActor[toInteger(arg)];

            

                actor.responseSetConvNode = nil;

                 
                respondingActor = actor;

                 
                break;

            case 'convend':
            

                sp = arg.find(' ');
                actor = idToActor[toInteger(arg.substr(1, sp - 1))];

                 
                arg = arg.substr(sp + 1);

                 
                if (arg == '')
                    arg = nil;

            
                if (!actor.responseSetConvNode)
                    actor.setConvNodeReason(arg, 'convend');

            

                (libGlobal.playerChar).setPronounObj(actor);

                 
                break;

            case 'convnode':
            
                if (respondingActor != nil)
                {
                                    local ctxt = mainOutputStream.captureOutput(
                        {: respondingActor.setConvNodeReason(arg, 'convnode') });

                     
                    txt = txt.substr(1, nxtOfs - 1)
                        + ctxt
                        + txt.substr(nxtOfs);
                }
                break;

            case 'convstay':
            

                if (respondingActor != nil)
                    respondingActor.responseSetConvNode = true;
                break;

            case 'topics':
                 
                scheduleTopicInventory();
                break;

            default:
                 
                doCustomTag(tag, arg);
                break;
            }

             
            start = nxtOfs;
        }

    
        return rexReplace(tagPat, txt, '', 0x0001);
    }
        tagPat = static new RexPattern(
        '<nocase><langle><dot>'
        + '(reveal|convbegin|convend|convnode|convstay|topics'
        + (customTags != nil ? '|' + customTags : '')
        + ')'
        + '(<space>+(<^rangle>+))?'
        + '<rangle>')

    scheduleTopicInventory()
    {
         
        pendingTopicInventory = true;
    }

    showOrScheduleTopicInventory(actor, otherActor)
    {
         
        if ((mainOutputStream.curTranscript).currentActionHasReport(
            {x: x.ofKind(MainCommandReport)}))
        {
             
            scheduleTopicInventory();
        }
        else
        {
             
            actor.suggestTopicsFor(otherActor, nil);
        }
    }
    beginResponse(actor)
    {
         
        if (actor.convMgrID == nil)
        {
             
            idToActor.append(actor);

             
            actor.convMgrID = idToActor.length();
        }

         
        (mainOutputStream.curTranscript).addReport(new ConvBeginReport(actor.convMgrID));
    }
    finishResponse(actor, node)
    {
        local prv;
        local oldNode;
        
         
        if (node != nil && node.ofKind(ConvNode))
            node = node.name;

    
        if ((prv = (mainOutputStream.curTranscript).getLastReport()) != nil
            && prv.ofKind(ConvBeginReport)
            && prv.actorID == actor.convMgrID)
        {
             
            (mainOutputStream.curTranscript).deleteLastReport();

             
            return;
        }

    

        if (node == nil
            && (oldNode = actor.curConvNode) != nil
            && oldNode.isSticky)
        {
             
            node = oldNode.name;
        }

         
        (mainOutputStream.curTranscript).addReport(new ConvEndReport(actor.convMgrID, node));
    }

    respondingActor = nil
        setRevealed(tag)
    {
        revealedNameTab[tag] = true;
    }
    revealedNameTab = static new LookupTable(32, 32)
        idToActor = static new Vector(32)
        execute()
    {
         
        forEachInstance(ConvNode,
                        { obj: obj.getActor().convNodeTab[obj.name] = obj });

    
        new PromptDaemon(self, &topicInventoryDaemon);
    }

    topicInventoryDaemon()
    {
         
        if (pendingTopicInventory)
        {            (libGlobal.playerChar).suggestTopics(nil);

             
            pendingTopicInventory = nil;
        }
    }
        pendingTopicInventory = nil
;

 
 
class TopicDatabase: object    topicGroupActive = true
    topicGroupScoreAdjustment = 0

    handleTopic(fromActor, topic, convType, path)
    {
        local resp;

         
        resp = findTopicResponse(fromActor, topic, convType, path);
        
         
        if (resp != nil)
        {
             
            showTopicResponse(fromActor, topic, resp);
            
             
            return true;
        }
        else
        {
             
            return nil;
        }
    }
        showTopicResponse(fromActor, topic, resp)
    {
         
        resp.handleTopic(fromActor, topic);
    }

    findTopicResponse(fromActor, topic, convType, path)
    {
        local topicList;
        local best, bestScore;

    

        topicList = self.(convType.topicListProp);
        
         
        if (topicList == nil)
            return nil;

         
        best = new Vector();
        bestScore = nil;
        foreach (local cur in topicList)
        {
             
            local score = cur.adjustScore(cur.matchTopic(fromActor, topic));

            if (score != nil
                && cur.checkIsActive()
                && (bestScore == nil || score >= bestScore))
            {
                 
                if (bestScore != nil && score > bestScore)
                    best = new Vector();

                 
                best.append(cur);

                 
                bestScore = score;
            }
        }

    

        if (best.length() == 0)
        {
             
            best = nil;
        }
        else if (best.length() == 1)
        {
             
            best = best[1];
        }
        else
        {
        
            local toks = topic.topicProd.getOrigTokenList().mapAll(
                {x: ((x)[1])});
            local winner = nil;
            foreach (local t in best)
            {
                 
                winner = t.breakTopicTie(best, topic, fromActor, toks);

                 
                if (winner != nil)
                    break;
            }

            if (winner == nil)
            {
                local rWinner = nil;
                foreach (local t in best)
                {
                     
                    local m = t.matchObj;
                    if (m == nil)
                    {
                    

                        winner = nil;
                        break;
                    }

                

                    local ri;
                    if (m.ofKind(Collection))
                    {
                         
                        foreach (local mm in m)
                        {
                             
                            local riCur = topic.getResolveInfo(mm);

                             
                            if (compareVocabMatch(riCur, ri) > 0)
                                ri = riCur;
                        }
                    }
                    else
                    {
                         
                        ri = topic.getResolveInfo(m);
                    }

                
                    if (ri == nil)
                    {
                        winner = nil;
                        break;
                    }

                
                    if (compareVocabMatch(ri, rWinner) > 0)
                    {
                        rWinner = ri;
                        winner = t;
                    }
                }
            }

        
            best = (winner != nil ? winner : best[1]);
        }

    

        if (best != nil && path != nil && best.propDefined(&deferToEntry))
        {
             
            for (local i = 1, local len = path.length() ; i <= len ; ++i)
            {
                local inf;
                
            

                inf = path[i].findTopicResponse(fromActor, topic, convType,
                                                path.sublist(i + 1));

            

                if (inf != nil && best.deferToEntry(inf))
                    return nil;
            }
        }

         
        return best;
    }

    compareVocabMatch(a, b)
    {
    
        if (a == nil && b == nil)
            return 0;
        if (a == nil)
            return -1;
        if (b == nil)
            return 1;

    
        local fa = a.flags_, fb = b.flags_;

         
        if ((fa & 0x0004) && !(fb & 0x0004))
            return -1;
        if (!(fa & 0x0004) && (fb & 0x0004))
            return 1;

         
        if ((fa & 0x0002) && !(fb & 0x0002))
            return -1;
        if (!(fa & 0x0002) && (fb & 0x0002))
            return 1;

         
        return 0;
    }
        showSuggestedTopicList(lst, asker, askee, explicit)
    {
         
        scopeList = asker.scopeList();
        
         
        for (local i = 1, local len = lst.length() ; i <= len ; ++i)
        {
            local a = lst[i];
            
             
            for (local j = i + 1 ; j <= len ; ++j)
            {
                local b = lst[j];
                
            

                if (a.suggestionGroup == b.suggestionGroup
                    && a.fullName == b.fullName
                    && a.isSuggestionActive(asker, scopeList)
                    && b.isSuggestionActive(asker, scopeList))
                {
                     
                    lst.removeElementAt(j);

                     
                    --j;
                    --len;
                }
            }
        }

         
        new SuggestedTopicLister(asker, askee, explicit)
            .showList(asker, nil, lst, 0, 0, nil, nil);
    }

    limitSuggestions = nil
    addTopic(topic)
    {
         
        foreach (local cur in topic.includeInList)
            addTopicToList(topic, cur);
    }
        removeTopic(topic)
    {
         
        foreach (local cur in topic.includeInList)
            removeTopicFromList(topic, cur);
    }
        addSuggestedTopic(topic)
    {
         
        addTopicToList(topic, &suggestedTopics);
    }
        removeSuggestedTopic(topic)
    {
         
        removeTopicFromList(topic, &suggestedTopics);
    }
    addTopicToList(topic, listProp)
    {
         
        if (self.(listProp) == nil)
            self.(listProp) = new Vector(8);

         
        self.(listProp).append(topic);
    }
        removeTopicFromList(topic, listProp)
    {
         
        if (self.(listProp) != nil)
            self.(listProp).removeElement(topic);
    }
    suggestedTopics = nil


    getTopicOwner() { return nil; }
;

 

class ActorTopicDatabase: TopicDatabase
    initiateTopic(obj)
    {
         
        if (handleTopic((libGlobal.playerChar), obj, initiateConvType, nil))
        {
        
            getTopicOwner().noteConversation((libGlobal.playerChar));

             
            return true;
        }

         
        return nil;
    }
        showTopicResponse(fromActor, topic, resp)
    {
        local actor = getTopicOwner();
        local newNode;

    

        local isConv = resp.isConversational;
        
         
        conversationManager.beginResponse(actor);
            
         
        resp.handleTopic(fromActor, topic);

            if (isConv)
            newNode = nil;
        else
            newNode = actor.curConvNode;

         
        conversationManager.finishResponse(actor, newNode);
    }
    askTopics = nil
    askForTopics = nil
    tellTopics = nil
    showTopics = nil
    giveTopics = nil
    miscTopics = nil
    commandTopics = nil
    initiateTopics = nil
        specialTopics = nil
;

 
 


class SuggestedTopic: object


    fullName = (fromEnclosingSuggestedTopic(&fullName, ''))
    name = (fromEnclosingSuggestedTopic(&name, ''))


    associatedTopic = nil

    location = nil

    suggestTo = ((libGlobal.playerChar))
        suggestionGroup = []
        findEnclosingSuggestedTopic()
    {
         
        for (local loc = location ; loc != nil ; loc = loc.location)
        {
             
            if (loc.ofKind(SuggestedTopic))
                return loc;
        }

         
        return nil;
    }
        findOuterSuggestedTopic()
    {
        local outer;
        
         
        for (local loc = self, outer = nil ; loc != nil ; loc = loc.location)
        {
             
            if (loc.ofKind(SuggestedTopic))
                outer = loc;
        }

         
        return outer;
    }
    fromEnclosingSuggestedTopic(prop, defaultVal)
    {
         
        local enc = findEnclosingSuggestedTopic();

    

        return (enc != nil ? enc.(prop) : defaultVal);
    }

    isSuggestionActive(actor, scopeList)
    {
    


        return (actor == suggestTo
                && associatedTopicIsActive()
                && associatedTopicCanMatch(actor, scopeList)
                && !curiositySatisfied);
    }

    timesToSuggest = 1

    curiositySatisfied = (timesToSuggest != nil
                          && associatedTopicTalkCount() >= timesToSuggest)
                              initializeSuggestedTopic()
    {
         
        if (location != nil)
            location.addSuggestedTopic(self);

    
        if (ofKind(TopicEntry))
            associatedTopic = self;
    }    associatedTopicIsActive() { return associatedTopic.checkIsActive(); }
        associatedTopicTalkCount() { return associatedTopic.talkCount; }
        associatedTopicCanMatch(actor, scopeList)
        { return associatedTopic.isMatchPossible(actor, scopeList); }
    noteSuggestion() { }
;

 class SuggestedTopicTree: SuggestedTopic
     
    associatedTopicIsActive()
    {
         
        return associatedTopic.anyAltIsActive;
    }
        associatedTopicTalkCount()
    {
         
        return associatedTopic.altTalkCount;
    }
;

 class SuggestedAskTopic: SuggestedTopic
    suggestionGroup = [suggestionAskGroup]
;

 


class SuggestedTellTopic: SuggestedTopic
    suggestionGroup = [suggestionTellGroup]
;

 


class SuggestedAskForTopic: SuggestedTopic
    suggestionGroup = [suggestionAskForGroup]
;

 

class SuggestedGiveTopic: SuggestedTopic
    suggestionGroup = [suggestionGiveGroup]
;

 

class SuggestedShowTopic: SuggestedTopic
    suggestionGroup = [suggestionShowGroup]
;

 

class SuggestedYesTopic: SuggestedTopic
    suggestionGroup = [suggestionYesNoGroup]
;
class SuggestedNoTopic: SuggestedTopic
    suggestionGroup = [suggestionYesNoGroup]
;

 
 

class ConvNode: ActorTopicDatabase
     

    name = ''

    isSticky = nil

    npcGreetingMsg()
    {
         
        if (npcGreetingList != nil)
            npcGreetingList.doScript();
    }
        npcGreetingList = nil    npcContinueMsg = nil
    npcContinueList = nil

    autoShowTopics()
    {
         
        return (specialTopics != nil
                && specialTopics.indexWhich({x: x.checkIsActive()}) != nil);
    }
        npcInitiateConversation()
    {
        local actor = getActor();
        
         
        conversationManager.beginResponse(actor);

         
        getActor().noteConversation((libGlobal.playerChar));
        
         
        npcGreetingMsg();

         
        handleTopic((libGlobal.playerChar), actorHelloTopicObj, helloConvType, nil);

         
        conversationManager.finishResponse(actor, self);
    }

    npcContinueConversation()
    {
        local actor = getActor();
        local disp;
        
         
        conversationManager.beginResponse(actor);

         
        disp = outputManager.curOutputStream.watchForOutput(function()
        {            if (npcContinueList != nil)
                npcContinueList.doScript();
            else
                npcContinueMsg;
        });

         
        conversationManager.finishResponse(actor, self);

    
        if (disp)
            getActor().noteConversation((libGlobal.playerChar));

         
        return disp;
    }
        getActor()
    {
         
        if (location.ofKind(ActorState))
            return location.getActor();

         
        return location;
    }
        getTopicOwner() { return getActor(); }


    handleConversation(otherActor, topic, convType, path)
    {
         
        return handleTopic(otherActor, topic, convType, path);
    }

    canEndConversation(actor, reason) { return true; }

    endConversation(actor, reason) { }
    processSpecialCmd(str, procStr)
    {
        local match;
        local cnt;

         
        activeSpecialTopic = nil;

    
        if (specialTopics == nil)
            return str;
        
         
        cnt = 0;
        foreach (local cur in specialTopics)
        {
             
            if (cur.checkIsActive() && cur.matchPreParse(str, procStr))
            {
                 
                match = cur;

                 
                ++cnt;
            }
        }

    

        if (cnt == 1)
        {            activeSpecialTopic = match;

            return 'xspcltopic "' + SpecialTopicAction.encodeOrig(str) + '"';
        }
        else
        {
             
            return str;
        }
    }

    patWhitespace = static new RexPattern('<space>+')
    patDelim = static new RexPattern('<punct|space>')

    saySpecialTopic(fromActor)
    {
         
        if (activeSpecialTopic != nil)
        {
            local actor = getTopicOwner();
            
             
            conversationManager.beginResponse(actor);

             
            activeSpecialTopic.handleTopic(fromActor, nil);
            conversationManager.finishResponse(actor, nil);

             
            activeSpecialTopic = nil;
        }
        else
        {

            (libGlobal.libMessageObj).commandNotPresent;
        }
    }
    activeSpecialTopic = nil    noteActiveReason(reason)
    {
        noteActive();
    }
    


    noteActive()
    {
         
        if (autoShowTopics())
            conversationManager.scheduleTopicInventory();
    }
    noteLeaving() { }
;

 
 
specialTopicPreParser: StringPreParser
    doParsing(str, which)
    {
        local actor;
        local node;
        
    

        if (which == rmcAskLiteral)
            return str;

    

        if ((actor = (libGlobal.playerChar).getCurrentInterlocutor()) == nil
            || (node = actor.curConvNode) == nil)
            return str;

         
        return node.processSpecialCmd(str, processInputStr(str));
    }
    


    processInputStr(str) { return str; }
;

 
 

class ConvType: object

    unknownMsg = nil
    topicListProp = nil
        defaultResponseProp = nil

    defaultResponse(db, otherActor, topic) { }

    afterResponse(actor, otherActor) { }
;

helloConvType: ConvType
    unknownMsg = &sayHelloMsg
    topicListProp = &miscTopics
    defaultResponseProp = &defaultGreetingResponse
    defaultResponse(db, other, topic)
        { db.defaultGreetingResponse(other); }
            afterResponse(actor, otherActor)
    {
         
        conversationManager.showOrScheduleTopicInventory(actor, otherActor);
    }
;

byeConvType: ConvType
    unknownMsg = &sayGoodbyeMsg
    topicListProp = &miscTopics
    defaultResponseProp = &defaultGoodbyeResponse
    defaultResponse(db, other, topic)
        { db.defaultGoodbyeResponse(other); }
;

yesConvType: ConvType
    unknownMsg = &sayYesMsg
    topicListProp = &miscTopics
    defaultResponseProp = &defaultYesResponse
    defaultResponse(db, other, topic)
        { db.defaultYesResponse(other); }
;

noConvType: ConvType
    unknownMsg = &sayNoMsg
    topicListProp = &miscTopics
    defaultResponseProp = &defaultNoResponse
    defaultResponse(db, other, topic)
        { db.defaultNoResponse(other); }
;

askAboutConvType: ConvType
    topicListProp = &askTopics
    defaultResponseProp = &defaultAskResponse
    defaultResponse(db, other, topic)
        { db.defaultAskResponse(other, topic); }
;

askForConvType: ConvType
    topicListProp = &askForTopics
    defaultResponseProp = &defaultAskForResponse
    defaultResponse(db, other, topic)
        { db.defaultAskForResponse(other, topic); }
;

tellAboutConvType: ConvType
    topicListProp = &tellTopics
    defaultResponseProp = &defaultTellResponse
    defaultResponse(db, other, topic)
        { db.defaultTellResponse(other, topic); }
;

giveConvType: ConvType
    topicListProp = &giveTopics
    defaultResponseProp = &defaultGiveResponse
    defaultResponse(db, other, topic)
        { db.defaultGiveResponse(other, topic); }
;

showConvType: ConvType
    topicListProp = &showTopics
    defaultResponseProp = &defaultShowResponse
    defaultResponse(db, other, topic)
        { db.defaultShowResponse(other, topic); }
;

commandConvType: ConvType
    topicListProp = &commandTopics
    defaultResponseProp = &defaultCommandResponse
    defaultResponse(db, other, topic)
        { db.defaultCommandResponse(other, topic); }
;

 
initiateConvType: ConvType
    topicListProp = &initiateTopics
;

 consultConvType: ConvType
    topicListProp = &consultTopics
;

 
 
class TopicEntry: object

    matchObj = nil

    isActive = true

         isConversational = true

    impliesGreeting = (isConversational)

    getActor()
    {
        local owner;

    

        if ((owner = location.getTopicOwner()) != nil && owner.ofKind(Actor))
            return owner;
        else
            return nil;
    }

    checkIsActive()
    {
    

        if (!isActive)
            return nil;

         
        if (altTopicList.indexWhich({x: x.isActive}) != nil)
            return nil;

         
        return location.topicGroupActive();
    }
    anyAltIsActive()
    {
    
        if (!location.topicGroupActive())
            return nil;

    
        if (isActive || altTopicList.indexWhich({x: x.isActive}) != nil)
            return true;

         
        return nil;
    }

    adjustScore(score)
    {
         
        if (score == nil)
            return score;

         
        return score + location.topicGroupScoreAdjustment;
    }

    

    matchScore = 100
    includeInList = []

    topicResponse = ""
    talkCount = 0

    altTalkCount = 0

    getTopicOwner()
    {
        if (location != nil)
            return location.getTopicOwner();
        else
            return nil;
    }
    initializeTopicEntry()
    {
         
        if (location != nil)
            location.addTopic(self);

         
        altTopicList = altTopicList.sort(
            nil, {a, b: a.altTopicOrder - b.altTopicOrder});
    }
        addTopic(entry)
    {
         
        if (location != nil)
            location.addTopic(entry);
    }
    addAltTopic(entry)
    {
         
        altTopicList += entry;
    }
        topicGroupScoreAdjustment = (location.topicGroupScoreAdjustment)
        topicGroupActive = (location.topicGroupActive)
        altTopicList = []

    

    

    breakTopicTie(matchList, topic, fromActor, toks)
    {
    
        return nil;
    }

    setTopicPronouns(fromActor, topic) { }

    handleTopic(fromActor, topic)
    {
         
        noteInvocation(fromActor);

         
        setTopicPronouns(fromActor, topic);
        
         
        if (ofKind(Script))
        {
             
            doScript();
        }
        else
        {
             
            topicResponse;
        }
    }
        noteInvocation(fromActor)
    {
    
        noteAltInvocation(fromActor, self);

         
        ++talkCount;
    }

    noteAltInvocation(fromActor, alt)
    {
        local owner;
        
         
        if ((owner = location.getTopicOwner()) != nil)
            owner.notifyTopicResponse(fromActor, alt);
        
         
        ++altTalkCount;
    }

    addSuggestedTopic(t)
    {
    


        if (t.location == self)
            t.associatedTopic = self;

         
        if (location != nil)
            location.addSuggestedTopic(t);
    }
;

 
class TopicGroup: object    isActive = true
    matchScoreAdjustment = 0

    getTopicOwner() { return location.getTopicOwner(); }
        topicGroupActive()
    {
    
        return isActive && location.topicGroupActive();
    }

    topicGroupScoreAdjustment = (matchScoreAdjustment
                                 + location.topicGroupScoreAdjustment)
                                     addTopic(topic) { location.addTopic(topic); }
                                     addSuggestedTopic(topic) { location.addSuggestedTopic(topic); }
;

 class AltTopic: TopicEntry
     
    matchTopic(fromActor, topic)
        { return location.matchTopic(fromActor, topic); }
            isMatchPossible(actor, scopeList)
        { return location.isMatchPossible(actor, scopeList); }
            matchPreParse(str, pstr) { return location.matchPreParse(str, pstr); }
            setTopicPronouns(fromActor, topic)
        { location.setTopicPronouns(fromActor, topic); }
            includeInList = (location.includeInList)
            initializeAltTopic()
    {
         
        if (location != nil)
            location.addAltTopic(self);
    }
    checkIsActive()
    {
         
        if (!isActive)
            return nil;

    
        if (location != nil
            && location.altTopicList.lastValWhich({x: x.isActive}) != self)
        {
        
            return nil;
        }

         
        return location.topicGroupActive();
    }
        impliesGreeting = (location.impliesGreeting)
        isConversational = (location.isConversational)

    altTopicOrder = (sourceTextOrder)
        noteInvocation(fromActor)
    {
         
        ++talkCount;

         
        if (location != nil)
            location.noteAltInvocation(fromActor, self);
    }
        altTalkCount = (location != nil ? location.altTalkCount : talkCount)
;

 
class TopicMatchTopic: TopicEntry
     

    matchPattern = nil
    matchExactCase = nil

    matchTopic(fromActor, topic)
    {
    
        if (matchObj != nil)
        {            if (matchObj.ofKind(Collection))
            {
                 
                if (matchObj.indexWhich({x: findMatchObj(x, topic)}) != nil)
                    return matchScore;
            }
            else
            {
                 
                if (findMatchObj(matchObj, topic))
                    return matchScore;
            }
        }

    
        if (matchPattern != nil && topic.canMatchLiterally())
        {
            local txt;

        
            txt = topic.getTopicText();

        
            if (!matchExactCase)
                txt = txt.toLower();

             
            if (rexMatch(matchPattern, txt) != nil)
                return matchScore;
        }

         
        return nil;
    }
    findMatchObj(obj, rt)
    {
         
        if (rt.inScopeList.indexOf(obj) != nil)
            return true;

         
        return (rt.likelyList.indexOf(obj) != nil);
    }

    isMatchPossible(actor, scopeList)
    {
         
        if (matchObj == nil)
        {            return true;
        }
        else if (matchObj.ofKind(Collection))
        {
        
            return (matchObj.indexWhich(
                {x: actor.knowsAbout(x) || scopeList.indexOf(x)}) != nil);
        }
        else
        {
        
            return (actor.knowsAbout(matchObj)
                    || scopeList.indexOf(matchObj) != nil);
        }
    }
        setTopicPronouns(fromActor, topic)
    {
         
        if (matchObj == nil)
        {        }
        else if (matchObj.ofKind(Collection))
        {
            local lst;
            
            lst = matchObj.subset(
                {x: x.ofKind(Thing) && topic.inScopeList.indexOf(x) != nil});

             
            if (lst.length() == 0)
                lst = matchObj.subset(
                    {x: (x.ofKind(Thing)
                         && topic.likelyList.indexOf(x) != nil)});

        
            if (lst.length() == 1)
                fromActor.setPronounObj(lst[1]);
        }
        else
        {
        
            if (matchObj.ofKind(Thing))
                fromActor.setPronounObj(matchObj);
        }
    }
;

 
class AskTellTopic: TopicMatchTopic
     
    includeInList = [&askTopics, &tellTopics]
;

 


class AskTopic: AskTellTopic
    includeInList = [&askTopics]
;

 


class TellTopic: AskTellTopic
    includeInList = [&tellTopics]
;

 


class AskForTopic: AskTellTopic
    includeInList = [&askForTopics]
;

 

class AskAboutForTopic: AskTellTopic
    includeInList = [&askTopics, &askForTopics]
;

 

class AskTellAboutForTopic: AskTellTopic
    includeInList = [&askTopics, &tellTopics, &askForTopics]
;

 

class ThingMatchTopic: TopicEntry

    matchTopic(fromActor, obj)
    {
    
        if (matchObj.ofKind(Collection))
        {
             
            if (matchObj.indexOf(obj) != nil)
                return matchScore;
        }
        else
        {
             
            if (matchObj == obj)
                return matchScore;
        }

         
        return nil;
    }

    isMatchPossible(actor, scopeList)
    {
         
        if (matchObj.ofKind(Collection))
        {
             
            return (matchObj.indexWhich({x: scopeList.indexOf(x)}) != nil);
        }
        else
        {
             
            return scopeList.indexOf(matchObj);
        }
    }
        setTopicPronouns(fromActor, topic)
    {
    
        if (topic.ofKind(Thing))
            fromActor.setPronounObj(topic);
    }
;

 

class GiveShowTopic: ThingMatchTopic
     
    includeInList = [&giveTopics, &showTopics]
;

 


class GiveTopic: GiveShowTopic
    includeInList = [&giveTopics]
;

 


class ShowTopic: GiveShowTopic
    includeInList = [&showTopics]
;

 

class TopicOrThingMatchTopic: ThingMatchTopic, TopicMatchTopic
    matchTopic(fromActor, obj)
    {
    

        if (obj.ofKind(ResolvedTopic))
            return inherited TopicMatchTopic(fromActor, obj);
        else
            return inherited ThingMatchTopic(fromActor, obj);
    }

    isMatchPossible(actor, scopeList)
    {
         
        return (inherited TopicMatchTopic(actor, scopeList)
                || inherited ThingMatchTopic(actor, scopeList));
    }

    setTopicPronouns(fromActor, obj)
    {
    

        if (obj.ofKind(ResolvedTopic))
            return inherited TopicMatchTopic(fromActor, obj);
        else
            return inherited ThingMatchTopic(fromActor, obj);
    }
;

 class AskTellShowTopic: TopicOrThingMatchTopic
    includeInList = [&askTopics, &tellTopics, &showTopics]
;

 

class AskTellGiveShowTopic: TopicOrThingMatchTopic
    includeInList = [&askTopics, &tellTopics, &giveTopics, &showTopics]
;

 
class CommandTopic: TopicEntry
     
    includeInList = [&commandTopics]
        matchTopic(fromActor, obj)
    {
    

        if (matchObj.ofKind(Collection))
        {
             
            if (matchObj.indexWhich({x: obj.ofKind(x)}) != nil)
                return matchScore;
        }
        else
        {
             
            if (obj.ofKind(matchObj))
                return matchScore;
        }

         
        return nil;
    }

    isMatchPossible(actor, scopeList) { return true; }
        setTopicPronouns(fromActor, topic) { }
;

 
class MiscTopic: TopicEntry
    matchTopic(fromActor, obj)
    {
    
        return (matchList.indexOf(obj) != nil) ? matchScore : nil;
    }

    isMatchPossible(actor, scopeList) { return true; }
;

 

class HelloTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [helloTopicObj, impHelloTopicObj]

    impliesGreeting = nil

    noteInvocation(fromActor)
    {
        inherited(fromActor);
        "<.convstay>";
    }
;

 

class ImpHelloTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [impHelloTopicObj]
    matchScore = 200

    impliesGreeting = nil

    noteInvocation(fromActor)
    {
        inherited(fromActor);
        "<.convstay>";
    }
;

 


class ActorHelloTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [actorHelloTopicObj]
    matchScore = 200
        impliesGreeting = nil

    noteInvocation(fromActor)
    {
        inherited(fromActor);
        "<.convstay>";
    }
;

 

class ByeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [byeTopicObj,
                 leaveByeTopicObj, boredByeTopicObj, actorByeTopicObj]    impliesGreeting = nil
;

 
class ImpByeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [leaveByeTopicObj, boredByeTopicObj, actorByeTopicObj]
    matchScore = 200
;

 
class BoredByeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [boredByeTopicObj]
    matchScore = 300
;

 class LeaveByeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [leaveByeTopicObj]
    matchScore = 300
;

 class ActorByeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [actorByeTopicObj]
    matchScore = 300
;

 
class HelloGoodbyeTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [helloTopicObj, impHelloTopicObj,
                 byeTopicObj, boredByeTopicObj, leaveByeTopicObj,
                 actorByeTopicObj]

    impliesGreeting = nil
;

 helloTopicObj: object;
byeTopicObj: object;

 impHelloTopicObj: object;

 actorHelloTopicObj: object;

 

boredByeTopicObj: object;
leaveByeTopicObj: object;

 actorByeTopicObj: object;

 class YesNoTopic: MiscTopic
    includeInList = [&miscTopics]
    matchList = [yesTopicObj, noTopicObj]
;

class YesTopic: YesNoTopic
    matchList = [yesTopicObj]
;

class NoTopic: YesNoTopic
    matchList = [noTopicObj]
;

 yesTopicObj: object;
noTopicObj: object;

 

class DefaultTopic: TopicEntry    excludeMatch = []
        matchTopic(fromActor, topic)
    {
    

        if (topic.ofKind(ResolvedTopic))
        {
             
            if (topic.inScopeList.intersect(excludeMatch).length() != 0
                || topic.likelyList.intersect(excludeMatch).length() != 0)
                return nil;
        }
        else if (excludeMatch.indexOf(topic) != nil)
            return nil;

         
        return matchScore;
    }
        matchScore = 1
        isMatchPossible(actor, scopeList) { return true; }
        setTopicPronouns(fromActor, topic)
    {
            if (topic != nil)
        {
            if (topic.ofKind(Thing))
            {
                 
                fromActor.setPronounObj(topic);
            }
            else if (topic.ofKind(ResolvedTopic))
            {
                local lst;
                
            
                lst = topic.inScopeList.subset({x: x.ofKind(Thing)});
                if (lst.length() == 0)
                    lst = topic.likelyList.subset({x: x.ofKind(Thing)});

                 
                if (lst.length() == 1)
                    fromActor.setPronounObj(lst[1]);
            }
        }
    }
;

 
class DefaultCommandTopic: DefaultTopic
    includeInList = [&commandTopics]
    matchScore = 3
;
class DefaultAskTopic: DefaultTopic
    includeInList = [&askTopics]
    matchScore = 3
;
class DefaultTellTopic: DefaultTopic
    includeInList = [&tellTopics]
    matchScore = 3
;
class DefaultAskTellTopic: DefaultTopic
    includeInList = [&askTopics, &tellTopics]
    matchScore = 2
;
class DefaultGiveTopic: DefaultTopic
    includeInList = [&giveTopics]
    matchScore = 3
;
class DefaultShowTopic: DefaultTopic
    includeInList = [&showTopics]
    matchScore = 3
;
class DefaultGiveShowTopic: DefaultTopic
    includeInList = [&giveTopics, &showTopics]
    matchScore = 2
;
class DefaultAskForTopic: DefaultTopic
    includeInList = [&askForTopics]
    matchScore = 3
;
class DefaultAnyTopic: DefaultTopic
    includeInList = [&askTopics, &tellTopics, &showTopics, &giveTopics,
                     &askForTopics, &miscTopics, &commandTopics]

    excludeMatch = [actorHelloTopicObj, actorByeTopicObj]
    matchScore = 1
;

 
class SpecialTopic: TopicEntry, SuggestedTopicTree
     
    keywordList = []

    initializeSpecialTopic()
    {
         
        foreach (local cur in keywordList)
        {

            cmdDict.addWord(SpecialTopic, cur, &specialTopicWord);
        }
    }

    matchPat = nil
    
     
    name = ''

    fullName = (name)
        noteSuggestion() { specialTopicHistory.noteListing(self); }
        includeInList = [&specialTopics]

    timesToSuggest = nil
        matchTopic(fromActor, topic)
    {
         

        if (getConvNode().activeSpecialTopic == self)
            return matchScore;
        else
            return nil;
    }

    isMatchPossible(actor, scopeList) { return true; }
    matchPreParse(str, procStr)
    {
         
        if (matchPat == nil)
        {
            local pat;

             
            pat = '<nocase><space>*(%<';

             
            for (local i = 1, local len = keywordList.length() ;
                 i <= len ; ++i)
            {
                 
                pat += keywordList[i];

                 
                if (i == len)
                    pat += '%><space>*)+';
                else
                    pat += '%><space>*|%<';
            }

             
            matchPat = new RexPattern(pat);
        }

         
        return rexMatch(matchPat, procStr) == procStr.length();
    }
        getConvNode()
    {
         
        for (local loc = location ; loc != nil ; loc = loc.location)
        {
             
            if (loc.ofKind(ConvNode))
                return loc;
        }

         
        return nil;
    }
;

 

transient specialTopicHistory: object

    maxEntries = 20
        noteListing(t)
    {
    

        historyList.removeElement(t);

    
        if (maxEntries != nil && historyList.length() >= maxEntries)
            historyList.removeElementAt(1);

         
        historyList.append(t);
    }

    checkHistory(toks)
    {
        local str, procStr;
        
         
        str = cmdTokenizer.buildOrigText(toks);
        procStr = specialTopicPreParser.processInputStr(str);
        
    
        if (maxEntries != nil)
        {
             
            for (local l = historyList, local i = 1, local len = l.length() ;
                 i <= len ; ++i)
            {
                 
                if (l[i].matchPreParse(str, procStr))
                    return true;
            }
        }
        else
        {
             
            for (local o = firstObj(SpecialTopic) ; o != nil ;
                 o = nextObj(o, SpecialTopic))
            {
                 
                if (o.matchPreParse(str, procStr))
                    return true;
            }
        }

         
        return nil;
    }

    historyList = (self.(targetprop) = (new transient Vector(maxEntries)))
;

 

class InitiateTopic: ThingMatchTopic
     
    includeInList = [&initiateTopics]
    setTopicPronouns(fromActor, topic) { }
;

 
class DefaultInitiateTopic: DefaultTopic
    includeInList = [&initiateTopics]
;

 
 class ActorState: TravelMessageHandler, ActorTopicDatabase
    construct(actor) { location = actor; }

    activateState(actor, oldState) { }
    deactivateState(actor, newState) { }


    isInitState = nil
        autoSuggest = true    location = nil
    getActor()
    {
        if (location.ofKind(ActorState))
            return location.getActor();
        else
            return location;
    }
        getTopicOwner() { return getActor(); }
        initializeActorState()
    {
    
        if (isInitState)
            getActor().setCurState(self);
    }

    specialDesc() { getActor().actorHereDesc; }
        distantSpecialDesc() { getActor().actorThereDesc; }
        remoteSpecialDesc(actor) { getActor().actorThereDesc; }    specialDescListWith()
    {
    

        if (!overrides(self, ActorState, &specialDesc))
            return getActor().actorListWith;
        else
            return [];
    }
        showSpecialDescInContents(actor, cont)
    {
         
        getActor().listActorPosture(actor);
    }

    stateDesc = ""

    obeyCommand(issuingActor, action)
    {
    

        handleConversation(issuingActor, action, commandConvType);

         
        return nil;
    }

    suggestTopicsFor(actor, explicit)
    {
    

        if (!explicit && !autoSuggest)
            return;

    

        ((mainOutputStream.curTranscript).addReport(new CosmeticSpacingCommandReport('<.p>')));

         
        showSuggestedTopicList(getSuggestedTopicList(),
                               actor, getActor(), explicit);
    }
        getSuggestedTopicList()
    {
        local v = new Vector(16);
        local node;
        local lst;

         
        if ((node = getActor().curConvNode) != nil)
        {
             
            if ((lst = node.suggestedTopics) != nil)
                v.appendAll(lst);
            if (node.limitSuggestions)
                return v;
        }

         
        if ((lst = stateSuggestedTopics) != nil)
            v.appendAll(lst);

    

        if (limitSuggestions)
            return v;

         
        if ((lst = getActor().suggestedTopics) != nil)
            v.appendAll(lst);

         
        return v;
    }

    stateSuggestedTopics = (suggestedTopics)

    getImpliedConvState = (self)


    handleConversation(otherActor, topic, convType)
    {
        local actor = getActor();
        local hasDefault;
        local node;
        local path;

         
        hasDefault = propDefined(convType.defaultResponseProp);

                 path = [self];
        if (!hasDefault)
            path += actor;

    

        if ((node = actor.curConvNode) == nil
            || !node.handleConversation(otherActor, topic, convType, path))
        {
             
            path = path.sublist(2);
                        if (!handleTopic(otherActor, topic, convType, path))
            {
            

                if (hasDefault)
                {
                
                    convType.defaultResponse(self, otherActor, topic);
                }
                else
                {
                

                    actor.handleConversation(otherActor, topic, convType);
                }
            }
        }

         
        convType.afterResponse(actor, otherActor);
    }

    notifyTopicResponse(fromActor, entry) { }

    beforeAction()
    {
         
    }
        afterAction()
    {
    }
        beforeTravel(traveler, connector)
    {
        local other = getActor().getCurrentInterlocutor();
        
    
        if (connector != nil
            && other != nil
            && traveler.isActorTraveling(other))
        {
             
            if (!endConversation((libGlobal.curActor), endConvTravel))
            {
            
                throw new ExitSignal();
            }
        }
    }
        afterTravel(traveler, connector)
    {
    }    endConversation(actor, reason)
    {
        local ourActor = getActor();
        local node;

         
        if ((node = ourActor.curConvNode) != nil)
        {
            local ret;

             
            conversationManager.beginResponse(ourActor);

             
            ret = node.canEndConversation(actor, reason);

                    if (ret == blockEndConv)
            {
                 
                ourActor.noteConvAction(actor);

                 
                ret = nil;
            }

             
            conversationManager.finishResponse(
                ourActor, ourActor.curConvNode);

        
            if (!ret)
                return nil;
            
             
            node.endConversation(actor, reason);
        }

         
        ourActor.setConvNodeReason(nil, 'endConversation');

         
        return true;
    }

    takeTurn()
    {
        local actor = getActor();

    


        if (actor.curConvNode != nil
            && !actor.conversedThisTurn()
            && actor.curConvNode.npcContinueConversation())
        {
        
        }
        else if (actor.executeAgenda())
        {
             
        }
        else if (ofKind(Script))
        {
             
            doScript();
        }
    }

    justFollowed(success)
    {
         
    }

    arrivingWithDesc() { specialDesc(); }

    arrivingTurn() { }

    getNominalTraveler() { return getActor(); }
;

 

class ConversationReadyState: ActorState

    inConvState = nil
        getImpliedConvState = (inConvState)

    showGreetingMsg(actor, explicit)
    {
         
        if (handleTopic(actor, explicit ? helloTopicObj : impHelloTopicObj,
                        helloConvType, nil))
            "<.p>";
    }

    enterFromConversation(actor, reason, oldNode)
    {
        local topic;
        local reasonMap = [endConvBye, byeTopicObj,
                           endConvTravel, leaveByeTopicObj,
                           endConvBoredom, boredByeTopicObj,
                           endConvActor, actorByeTopicObj];
        
         
        topic = reasonMap[reasonMap.indexOf(reason) + 1];
        
    
        if (oldNode == nil
            || !oldNode.handleConversation(actor, topic, byeConvType, nil))
        {
             
            handleTopic(actor, topic, byeConvType, nil);
        }
    }
        handleConversation(otherActor, topic, convType)
    {
    
        if (convType == helloConvType)
        {            enterConversation(otherActor, nil);

             
            conversationManager.showOrScheduleTopicInventory(
                getActor(), otherActor);
        }
        else
        {
        
            inConvState.handleConversation(otherActor, topic, convType);
        }
    }

    initiateTopic(obj)
    {
         
        return inConvState.initiateTopic(obj);
    }
    notifyTopicResponse(fromActor, entry)
    {
        if (entry.isConversational)
            enterConversation(fromActor, entry);
    }

    enterConversation(actor, entry)
    {
        local myActor = getActor();
        local explicit = (entry == nil);
        
         
        if (!actor.canTalkTo(myActor))
        {
             
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&objCannotHearActorMsg,myActor)));
            
             
            throw new ExitSignal();
        }

    

        if (explicit || entry.impliesGreeting)
            showGreetingMsg(actor, explicit);

         
        myActor.setCurState(inConvState);
    }

    stateSuggestedTopics = (inConvState.suggestedTopics)
        initializeActorState()
    {
         
        inherited();

    

        if (location.ofKind(InConversationState))
            inConvState = location;
    }
;

 

class InConversationState: ActorState
    attentionSpan = 4

    nextState = (previousState)

    endConversation(actor, reason)
    {
        local nxt;
        local myActor = getActor();

    

        local oldNode = myActor.curConvNode;

    

        if (!inherited(actor, reason))
            return nil;

         
        nxt = nextState;

         
        if (nxt == nil)
            nxt = myActor.curState;
        
    


        if (nxt.ofKind(ConversationReadyState))
            nxt.enterFromConversation(actor, reason, oldNode);

         
        myActor.setCurState(nxt);

         
        return true;
    }
        handleConversation(otherActor, topic, convType)
    {
         
        if (convType == byeConvType)
        {
        
            local txt = nil;
            if (topic != byeTopicObj)
            {
                txt = mainOutputStream.captureOutput(
                    {: inherited(otherActor, topic, convType) });
            }

        
            if (!endConversation(otherActor, endConvBye))
                throw new ExitSignal();

             
            if (txt != nil)
                say(txt);
        }
        else
        {
             
            inherited(otherActor, topic, convType);
        }
    }

    defaultGreetingResponse(actor)
    {
    

        (libGlobal.libMessageObj).alreadyTalkingTo(getActor(), actor);
    }

    takeTurn()
    {
        local actor = getActor();
        
         
        if (!actor.conversedThisTurn())
            actor.boredomCount++;

         
        inherited();
    }
        activateState(actor, oldState)
    {
            if (previousState == nil || oldState.ofKind(ConversationReadyState))
            previousState = oldState;

    

        actor.boredomCount = 0;
        actor.addToAgenda(actor.boredomAgendaItem);

         
        actor.lastConvTime = Schedulable.gameClockTime;
    }
        deactivateState(actor, newState)
    {
    
        actor.removeFromAgenda(actor.boredomAgendaItem);

         
        inherited(actor, newState);
    }

    previousState = nil
;

 

class BoredomAgendaItem: AgendaItem
     
    construct(actor)
    {
         
        location = actor;
    }

    isReady()
    {
        local actor = getActor();
        local state = actor.curState;

        return (inherited()
                && state.ofKind(InConversationState)
                && state.attentionSpan != nil
                && actor.boredomCount >= state.attentionSpan);
    }
        invokeItem()
    {
        local actor = getActor();
        local state = actor.curState;

         
        state.endConversation(actor.getCurrentInterlocutor(), endConvBoredom);
    }
    agendaOrder = 50
;

 
class HermitActorState: ActorState
    noResponse() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,getActor()))); }
        handleConversation(otherActor, topic, convType)
    {
         
        noResponse();
    }


    limitSuggestions = true
;

 class AccompanyingState: ActorState
     

    accompanyTravel(traveler, conn) { return true; }

    getAccompanyingTravelState(traveler, connector)
    {
    

        return new AccompanyingInTravelState(
            getActor(), (libGlobal.curActor), getActor().curState);
    }

    beforeTravel(traveler, connector)
    {
    

        if (accompanyTravel(traveler, connector) && getActor() != (libGlobal.curActor))
        {

            (libGlobal.curActor).addAccompanyingActor(getActor());
            
             
            getActor().setCurState(
                getAccompanyingTravelState(traveler, connector));
        }

         
        inherited(traveler, connector);
    }
;

 class AccompanyingInTravelState: ActorState
    construct(actor, lead, next)
    {
         
        inherited(actor);

         
        leadActor = lead;
        nextState = next;
    }
        leadActor = nil

    nextState = nil

    specialDesc() { nextState.arrivingWithDesc; }
        takeTurn()
    {
    

        leadActor.accompanyingActors.removeElement(getActor());

         
        getActor().setCurState(nextState);

    
        nextState.arrivingTurn();
    }
        initiateTopic(obj) { return nextState.initiateTopic(obj); }

    sayDeparting(conn)
        { (libGlobal.libMessageObj).sayDepartingWith(getActor(), leadActor); }
    sayDepartingDir(dir, conn) { sayDeparting(conn); }
    sayDepartingThroughPassage(conn) { sayDeparting(conn); }
    sayDepartingViaPath(conn) { sayDeparting(conn); }
    sayDepartingUpStairs(conn) { sayDeparting(conn); }
    sayDepartingDownStairs(conn) { sayDeparting(conn); }

    sayArrivingLocally(dest, conn) { sayDeparting(conn); }
    sayDepartingLocally(dest, conn) { sayDeparting(conn); }
;

 
 


class PendingConvInfo: object
    construct(state, node, turns)
    {
         
        state_ = state;
        node_ = node;

         
        time_ = Schedulable.gameClockTime + turns;
    }

    state_ = nil
    node_ = nil
        time_ = nil
;

 
 

class AgendaItem: object
    getActor() { return location; }
    initiallyActive = nil

    isReady = true

    isDone = nil

    agendaOrder = 100
    invokeItem() { }

    resetItem()
    {
         
        if (propType(&isDone) != 11)
            isDone = nil;
    }
;

 


PreinitObject
    execute()
    {
        forEachInstance(AgendaItem, function(item) {
        
            if (item.initiallyActive)
                item.getActor().addToAgenda(item);
        });
    }
;

 

class ConvAgendaItem: AgendaItem
    isReady = (!getActor().conversedThisTurn()
               && getActor().canTalkTo(otherActor)
               && inherited())
    otherActor = ((libGlobal.playerChar))
;

 


class DelayedAgendaItem: AgendaItem
     
    isReady = (Schedulable.gameClockTime >= readyTime && inherited())
        readyTime = 0    setDelay(turns)
    {
    
        readyTime = Schedulable.gameClockTime + turns;

         
        return self;
    }
;

 
 
class Actor: Thing, Schedulable, Traveler, ActorTopicDatabase
     
    isActor = true

    curState = nil
        setCurState(state)
    {
         
        if (state == curState)
            return;
        
         
        if (curState != nil)
            curState.deactivateState(self, state);

         
        if (state != nil)
            state.activateState(self, curState);

         
        curState = state;
    }

    curConvNode = nil    convNodeTab = (self.(targetprop) = (new LookupTable(32, 32)))
        setConvNode(node) { setConvNodeReason(node, nil); }
        setConvNodeReason(node, reason)
    {
         
        local oldNode = curConvNode;
        
         
        if (dataType(node) == 8)
            node = convNodeTab[node];

         
        curConvNode = node;

    

        if (node != oldNode)
        {
             
            if (oldNode != nil)
                oldNode.noteLeaving();

             
            if (node != nil)
                node.noteActiveReason(reason);
        }

    

        responseSetConvNode = true;
    }
    convMgrID = nil
    responseSetConvNode = nil
    initiateConversation(state, node)
    {
    
        if (state == nil)
            state = curState.getImpliedConvState;

    
        curState.handleTopic(self, actorHelloTopicObj, helloConvType, nil);

         
        if (state != nil && state != curState)
            setCurState(state);

         
        noteConversation((libGlobal.playerChar));

         
        setConvNodeReason(node, 'initiateConversation');

         
        if (node != nil)
            curConvNode.npcInitiateConversation();
    }
    initiateTopic(obj)
    {
         
        if (curState.initiateTopic(obj))
            return true;

         
        return inherited(obj);
    }
    scheduleInitiateConversation(state, node, turns)
    {
         
        pendingConv.append(new PendingConvInfo(state, node, turns));
    }
    endConversation()
    {
    
        curState.endConversation(self, endConvActor);
    }
    pendingConv = nil    hideFromAll(action) { return true; }
    hideFromDefault(action) { return nil; }
    meetsObjHeld(actor) { return actor == self || inherited(actor); }
    isListed = nil
    isListedInContents = nil
    isListedInInventory = true
        contentsListed = nil    desc
    {
    
        if (isPlayerChar())
        {
             
            pcDesc;
        }
        else
        {
             
            npcDesc;
        }
    }
        examineStatus()
    {
    
        if (!isPlayerChar())
            postureDesc;

         
        curState.stateDesc;

         
        inherited();
    }

    postureDesc() { descViaActorContainer(&roomActorPostureDesc, nil); }
    
    pcDesc { (libGlobal.libMessageObj).pcDesc(self); }


    npcDesc { ((mainOutputStream.curTranscript).addReport(new DefaultDescCommandReport(&npcDescMsg,self))); }
        examineListContents()
    {
         
        if (!isPlayerChar())
            holdingDesc;
    }
    
    specialDesc() { curState.specialDesc(); }
    distantSpecialDesc() { curState.distantSpecialDesc(); }
    remoteSpecialDesc(actor) { curState.remoteSpecialDesc(actor); }
    specialDescListWith() { return curState.specialDescListWith(); }


    specialDescBeforeContents = nil

    showSpecialDescInContents(actor, cont)
    {
         
        listActorPosture(actor);
    }
    specialDescOrder = 200
    actorListWith()
    {
        local group;

    

        if (overrides(self, Actor, &specialDesc))
            return [];

         
        group = location.listWithActorIn(posture);

    
        return (group == nil ? [] : [group]);
    }

    actorHereDesc { descViaActorContainer(&roomActorHereDesc, nil); }

    actorThereDesc { descViaActorContainer(&roomActorThereDesc, nil); }
    actorRoomNameStatus(room)
        { descViaActorContainer(&roomActorStatus, room); }
    descViaActorContainer(prop, contToIgnore)
    {
        local pov;
        local cont;
        
         
        cont = location.getNominalActorContainer(posture);

         
        if ((pov = getPOV()) == nil)
            pov = (libGlobal.playerChar);
        
    

        if (cont not in (nil, contToIgnore) && pov.canSee(cont))
        {
             
            cont.(prop)(self);
        }
        else
        {
             
            (libGlobal.libMessageObj).(prop)(self);
        }
    }
    
    holdingDesc
    {
    
        examineListContentsWith(holdingDescInventoryLister);
    }

    referralPerson { return isPlayerChar() ? pcReferralPerson : 3; }
        pcReferralPerson = 2

         commandReferralPerson = nil
             isPlayerChar() { return libGlobal.playerChar == self; }

    impliedCommandMode() { return isPlayerChar() ? ModePlayer : ModeNPC; }


    tryMovingObjInto(obj)
    {
        if ((libGlobal.curActor) == self)
        {
        
            return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     TakeAction,obj);
        }
        else
        {
            return _tryImplicitAction((libGlobal.curIssuingActor), (libGlobal.curActor), &announceImplicitAction,     GiveToAction,obj, self);
        }
    }
        mustMoveObjInto(obj) { ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&mustBeCarryingMsg,obj, self))); }
    bulkCapacity = 10000
    maxSingleBulk = 10

    weightCapacity = 10000

    canOwn(obj) { return true; }    travelerPreCond(conn) { return conn.actorTravelPreCond(self); }
        isListedAboardVehicle = true

    getTraveler(conn)
    {
    

        if (specialTraveler != nil)
            return specialTraveler;
        else if (location != nil)
            return location.getLocTraveler(self, conn);
        else
            return self;
    }
    getPushTraveler(obj)
    {
    

        if (specialTraveler != nil)
            return specialTraveler;
        else if (location != nil)
            return location.getLocPushTraveler(self, obj);
        else
            return self;
    }
        isActorTraveling(actor)
    {
         
        return (actor == self);
    }
        forEachTravelingActor(func)
    {
         
        (func)(self);
    }
    getTravelerActors = [self]
        getTravelerMotiveActors = [self]

    setSpecialTraveler(traveler)
    {
        local oldVal;

         
        oldVal = specialTraveler;

         
        specialTraveler = traveler;

         
        return oldVal;
    }
        specialTraveler = nil

    checkMovingTravelerInto(room, allowImplicit)
    {
         
        return room.checkMovingActorInto(allowImplicit);
    }
    checkReadyToEnterNestedRoom(dest, allowImplicit)
    {
         
        return dest.checkActorReadyToEnterNestedRoom(allowImplicit);
    }

    travelWithin(dest)
    {
         
        if (dest == location)
            return;

    
        getTraveler(nil).travelerTravelWithin(self, dest);
    }

    travelerTravelWithin(actor, dest)
    {
        local origin;

         
        origin = location;
        
         
        if (origin != nil)
            origin.actorTravelingWithin(origin, dest);

    
        if (origin != nil
            && dest != nil
            && origin.effectiveFollowLocation != dest.effectiveFollowLocation)
        {            connectionTable().forEachAssoc(
                {obj, val: obj.beforeTravel(self, nil)});
        }

         
        moveInto(dest);

    
        if ((libGlobal.curAction) != nil)
            (libGlobal.curAction).recalcSenseContext();

         
        if (dest != nil)
            dest.actorTravelingWithin(origin, dest);
    }


    checkDarkTravel(dest, connector)
    {
        local origin;
        
    

        if (isLocationLit())
            return;

         
        origin = getTraveler(connector).location;

    
        if (connector.isConnectorVisibleInDark(origin, self))
            return;

    


        connector.darkTravel(self, dest);
    }

    travelTo(dest, connector, backConnector)
    {
         
        getTraveler(connector)
            .travelerTravelTo(dest, connector, backConnector);
    }

    scriptedTravelTo(dest)
    {
        local conn;

         
        conn = location.getConnectorTo(self, dest);

         
        if (conn != nil)
            _nestedAction(nil, self, TravelViaAction,conn);
    }

    rememberLastDoor(obj) { lastDoorTraversed = obj; }

    rememberTravel(origin, dest, backConnector)
    {
         
        lastTravelDest = dest;
        lastTravelBack = backConnector;
    }

    reverseLastTravel()
    {
    

        if (lastTravelBack == nil
            || lastTravelDest == nil
            || !isIn(lastTravelDest))
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&cannotGoBackMsg)));
            throw new ExitSignal();
        }

         
        _nestedAction(nil, (libGlobal.curActor), TravelViaAction,lastTravelBack);
    }
        lastDoorTraversed = nil
        lastTravelDest = nil
    lastTravelBack = nil

    checkStagingLocation(dest)
    {
    
        if (dest.isIn(self))
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&invalidStagingContainerActorMsg,self, dest)));
        else
            inherited(dest);

         
        throw new ExitSignal();
    }

    sayArriving(conn)
        { curState.sayArriving(conn); }
    sayDeparting(conn)
        { curState.sayDeparting(conn); }
    sayArrivingLocally(dest, conn)
        { curState.sayArrivingLocally(dest, conn); }
    sayDepartingLocally(dest, conn)
        { curState.sayDepartingLocally(dest, conn); }
    sayTravelingRemotely(dest, conn)
        { curState.sayTravelingRemotely(dest, conn); }
    sayArrivingDir(dir, conn)
        { curState.sayArrivingDir(dir, conn); }
    sayDepartingDir(dir, conn)
        { curState.sayDepartingDir(dir, conn); }
    sayArrivingThroughPassage(conn)
        { curState.sayArrivingThroughPassage(conn); }
    sayDepartingThroughPassage(conn)
        { curState.sayDepartingThroughPassage(conn); }
    sayArrivingViaPath(conn)
        { curState.sayArrivingViaPath(conn); }
    sayDepartingViaPath(conn)
        { curState.sayDepartingViaPath(conn); }
    sayArrivingUpStairs(conn)
        { curState.sayArrivingUpStairs(conn); }
    sayArrivingDownStairs(conn)
        { curState.sayArrivingDownStairs(conn); }
    sayDepartingUpStairs(conn)
        { curState.sayDepartingUpStairs(conn); }
    sayDepartingDownStairs(conn)
        { curState.sayDepartingDownStairs(conn); }
    getCurrentInterlocutor()
    {
    
        if (lastInterlocutor != nil && canTalkTo(lastInterlocutor))
            return lastInterlocutor;
        else
            return nil;
    }

    getDefaultInterlocutor()
    {
        local actor;
        
         
        actor = getCurrentInterlocutor();

    

        if (actor == nil || !canTalkTo(actor))
        {
             
            local tt = new TalkToAction();
            local res = new Resolver(tt, (libGlobal.curIssuingActor), (libGlobal.curActor));
            
             
            actor = tt.getDefaultDobj(new EmptyNounPhraseProd(), res);
            
             
            if (actor != nil)
                actor = actor[1].obj_;
        }

         
        return actor;
    }

    lastInterlocutor = nil

    boredomCount = 0

    lastConvTime = -1

    conversedThisTurn() { return lastConvTime == Schedulable.gameClockTime; }


    noteConversation(other)
    {
         
        noteConvAction(other);

         
        other.noteConversationFrom(self);
    }

    noteConversationFrom(other)
    {
         
        noteConvAction(other);
    }

    noteConvAction(other)
    {
         
        lastInterlocutor = other;

         
        setPronounObj(other);

    
        boredomCount = 0;

         
        lastConvTime = Schedulable.gameClockTime;
    }
        noteConsultation(obj) { lastConsulted = obj; }

    notifyTopicResponse(fromActor, entry)
    {
         
        curState.notifyTopicResponse(fromActor, entry);
    }
        lastConsulted = nil
    agendaList = nil
    boredomAgendaItem = (self.(targetprop) = (new BoredomAgendaItem(self)))
        addToAgenda(item)
    {
         
        if (agendaList == nil)
            agendaList = new Vector(10);

         
        agendaList.append(item);

    

        agendaList.sort(nil, {a, b: a.agendaOrder - b.agendaOrder});

         
        item.resetItem();
    }
        removeFromAgenda(item)
    {
         
        if (agendaList != nil)
            agendaList.removeElement(item);
    }
    executeAgenda()
    {
        local item;

         
        if (agendaList == nil)
            return nil;
        
         
        while ((item = agendaList.lastValWhich({x: x.isDone})) != nil)
            agendaList.removeElement(item);

    


        item = agendaList.valWhich({x: x.isReady});

         
        if (item != nil)
        {
            try
            {
                 
                item.invokeItem();
            }
            catch (RuntimeError err)
            {
            


                item.isDone = true;

                 
                throw err;
            }

             
            return true;
        }
        else
        {
             
            return nil;
        }
    }

    getBulkHeld()
    {
        local total;

         
        total = 0;

         
        foreach (local cur in contents)
            total += cur.getEncumberingBulk(self);

         
        return total;
    }

    getWeightHeld()
    {
        local total;

         
        total = 0;

         
        foreach (local cur in contents)
            total += cur.getEncumberingWeight(self);

         
        return total;
    }

    tryMakingRoomToHold(obj, allowImplicit)
    {
        local objWeight;
        local objBulk;
        local aff;
        
         
        objWeight = obj.getEncumberingWeight(self);

            if (objWeight > weightCapacity)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&tooHeavyForActorMsg,obj)));
            throw new ExitSignal();
        }

    
        if (obj.whatIfHeldBy({: getWeightHeld()}, self) > weightCapacity)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&totalTooHeavyForMsg,obj)));
            throw new ExitSignal();
        }

         
        objBulk = obj.getEncumberingBulk(self);
        
    
        if (objBulk > maxSingleBulk || objBulk > bulkCapacity)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&tooLargeForActorMsg,obj)));
            throw new ExitSignal();
        }

    


        if (obj.whatIfHeldBy({: getBulkHeld()}, self) <= bulkCapacity)
            return nil;

    
        if (!allowImplicit)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&handsTooFullForMsg,obj)));
            throw new ExitSignal();
        }

            aff = getBagAffinities(contents.subset(
            {x: x.getEncumberingBulk(self) != 0 && x.isHeldBy(self)}));

         
        if (aff.length() == 0)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&handsTooFullForMsg,obj)));
            throw new ExitSignal();
        }

    

        if (aff.length() >= 4)
        {
            local a, b;
            
             
            a = BagAffinityInfo.removeMostRecent(aff);
            b = BagAffinityInfo.removeMostRecent(aff);

             
            aff.append(b);
            aff.append(a);
        }
        
    
        foreach (local cur in aff)
        {
            if (!cur.bag_.isIn(cur.obj_)
                && !obj.isIn(cur.obj_)
                && cur.bag_.tryPuttingObjInBag(cur.obj_))
            {
            

                if (obj.whatIfHeldBy({: getBulkHeld()}, self) <= bulkCapacity)
                {
                

                    return true;
                }
            }
        }
        
    

        ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&handsTooFullForMsg,obj)));
        throw new ExitSignal();
    }

    checkBulkChangeWithin(obj)
    {
        local objBulk;
        
         
        objBulk = obj.getEncumberingBulk(self);
        
    
        if (objBulk > maxSingleBulk || objBulk > bulkCapacity)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&becomingTooLargeForActorMsg,obj)));
            throw new ExitSignal();
        }

    

        if (getBulkHeld() > bulkCapacity)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&handsBecomingTooFullForMsg,obj)));
            throw new ExitSignal();
        }
    }

    nextHoldingIndex = 1
        addToContents(obj)
    {
         
        obj.holdingIndex = nextHoldingIndex++;

         
        inherited(obj);
    }
    goToSleep()
    {
         
        ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotSleepMsg)));
    }

    posture = standing    okayPostureChange()
    {
         
        local cont = location.getNominalActorContainer(posture);

         
        if (cont != nil && (libGlobal.playerChar).canSee(cont))
        {
             
            cont.roomOkayPostureChange(self);
        }
        else
        {
             
            ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&okayPostureChangeMsg,posture)));
        }
    }
    listActorPosture(povActor)
    {
         
        local cont = location.getNominalActorContainer(posture);
        
         
        if (cont != nil && povActor.canSee(cont))
            cont.roomListActorPosture(self);
    }

    standUp()
    {
         
        if (posture == standing)
        {
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&alreadyStandingMsg)));
            return;
        }

         
        location.makeStandingUp();
    }

    disembark()
    {
         
        location.disembarkRoom();
    }
    makePosture(newPosture)
    {
         
        posture = newPosture;
    }    lookAround(verbose)
    {
         
        libGlobal.enableSenseCache();
        
         
        if (location != nil)
            location.lookAroundPov(self, self, verbose);

         
        libGlobal.disableSenseCache();
    }

    getLookAroundName()
    {
        return mainOutputStream.captureOutput(
            {: location.lookAroundWithinName(self, getVisualAmbient()) })
            .specialsToText();
    }

    adjustLookAroundTable(tab, pov, actor)
    {
         
        foreach (local cur in excludeFromLookAroundList)
            tab.removeElement(cur);

         
        inherited(tab, pov, actor);
    }

    excludeFromLookAround(obj)
    {
    
        if (excludeFromLookAroundList.indexOf(obj) != nil)
            return true;

         
        excludeFromLookAroundList.append(obj);
        return nil;
    }
        unexcludeFromLookAround(obj)
    {
        excludeFromLookAroundList.removeElement(obj);
    }

    excludeFromLookAroundList = (self.(targetprop) = (new Vector(5)))
    getDropDestination(objToDrop, path)
    {
        return (location != nil
                ? location.getDropDestination(objToDrop, path)
                : nil);
    }

    scopeSenses = [sight, sound, smell]

    sightlikeSenses = [sight]

    hearinglikeSenses = [sound]

    smelllikeSenses = [smell]

    communicationSenses = [sound]
    
    canTalkTo(actor)
    {
        local common;
        
    

        common = communicationSenses.intersect(actor.communicationSenses);

    
        if (common == [])
            return nil;

    

        foreach (local curSense in common)
        {
            local result;

        
            result = actor.senseObj(curSense, self);

             
            if (actor.canBeTalkedTo(self, curSense, result))
                return true;
        }

    

        return nil;
    }

    canBeTalkedTo(talker, sense, info)
    {
    

        return info.trans is in (transparent, distant);
    }


    issueCommandsSynchronously = true
        revertTargetActorAtEndOfSentence = nil    orderingTime(targetActor)
    {
        return issueCommandsSynchronously ? 0 : 1;
    }    waitForIssuedCommand(targetActor)
    {
         
        if (!issueCommandsSynchronously)
            return;

            waitingForActor = targetActor;
        waitingForInfo = new PendingCommandMarker(self);
        targetActor.pendingCommand.append(waitingForInfo);
    }

    waitingForActor = nil
    waitingForInfo = nil


    addAccompanyingActor(actor)
    {
         
        if (accompanyingActors == nil)
            accompanyingActors = new Vector(8);

         
        accompanyingActors.append(actor);
    }
    accompanyingActors = nil
    getFollowables()
    {
         
        return followables_.mapAll({x: x.obj});
    }
    wantsFollowInfo(obj)
    {
    

        return isPlayerChar() || followingActor == obj;
    }

    trackFollowInfo(obj, conn, from)
    {
        local info;
        
    

        if (obj == self || !wantsFollowInfo(obj) || !canSee(obj))
            return;

    

        info = followables_.valWhich({x: x.obj == obj});
        if (info == nil)
        {
             
            info = new FollowInfo();
            info.obj = obj;

             
            followables_ += info;
        }

         
        info.connector = conn;
        info.sourceLocation = from;
    }

    getFollowInfo(obj)
    {
        return followables_.valWhich({x: x.obj == obj});
    }

    verifyFollowable()
    {
        return true;
    }

    actorVerifyFollow(obj)
    {
    

        if (obj.location != nil
            && (location.effectiveFollowLocation
                == obj.location.effectiveFollowLocation))
        {
        
            if (isPlayerChar)
            {
            


                if (canSee(obj))
                    ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(&followAlreadyHereMsg)));
                else
                    ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(&followAlreadyHereInDarkMsg)));
            }
        }
        else if (!canSee(obj))
        {
                    if (getFollowInfo(obj) == nil)
            {
                 
                ((libGlobal.curVerifyResults).addResult(new IllogicalNowVerifyResult(&followUnknownMsg)));
            }
        }
    }

    actorActionFollow(obj)
    {
        local canSeeObj;

         
        canSeeObj = canSee(obj);
        
    
        if (!isPlayerChar && canSeeObj)
        {
        
            if (followingActor != obj)
            {
                 
                ((mainOutputStream.curTranscript).addReport(new AfterCommandReport(&okayFollowModeMsg)));

                 
                followingActor = obj;
            }
            else if ((libGlobal.curIssuingActor) != self)
            {
                 
                ((mainOutputStream.curTranscript).addReport(new AfterCommandReport(&alreadyFollowModeMsg)));
            }

        
            if (location.effectiveFollowLocation
                == obj.location.effectiveFollowLocation)
                return;
        }

    
        if (canSeeObj && isIn(obj.getOutermostRoom()))
        {
            obj.location.effectiveFollowLocation.checkMovingActorInto(true);

            if (isPlayerChar)
                ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&okayFollowInSightMsg,location.effectiveFollowLocation)))
;
        }
        else
        {
            local info;
            local srcLoc;
            
             
            info = getFollowInfo(obj);

             
            srcLoc = info.sourceLocation.effectiveFollowLocation;

             
            if (info.connector == nil)
            {
                                 if (canSee(srcLoc))
                {
                

                    ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&followUnknownMsg)));
                }
                else
                {
                

                    ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&cannotFollowFromHereMsg,srcLoc)));
                }

                 
                return;
            }
            if (location.effectiveFollowLocation != srcLoc)
            {
            

                if (!canSee(srcLoc))
                {
                    ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&cannotFollowFromHereMsg,srcLoc)));
                    return;
                }

                            srcLoc.checkMovingActorInto(true);
            }
        
             
            _nestedAction(nil, (libGlobal.curActor), TravelViaAction,info.connector);
        }
    }

    followables_ = []
        hasSeen(obj) { return obj.(seenProp); }
        setHasSeen(obj) { obj.noteSeenBy(self, seenProp); }
        noteSeenBy(actor, prop)
    {
         
        inherited(actor, prop);

         
        actor.trackFollowInfo(self, nil, location);
    }

    knowsAbout(obj) { return canSee(obj) || hasSeen(obj) || obj.(knownProp); }
        setKnowsAbout(obj) { obj.(knownProp) = true; }

    seenProp = &seen

    knownProp = &isKnown

         knowsTopic(obj)
    {
         
        return knowsAbout(obj);
    }
    isLikelyTopic(obj)
    {
         
        return knowsTopic(obj);
    }
        getTopicOwner() { return self; }

    suggestTopics(explicit)
    {
        local actor;
        
    
        if ((actor = getCurrentInterlocutor()) != nil)
        {
        
            actor.suggestTopicsFor(self, explicit);
        }
        else if (explicit)
        {
             
            (libGlobal.libMessageObj).noTopicsNotTalking;
        }
    }

    suggestTopicsFor(actor, explicit)
    {
         
        curState.suggestTopicsFor(actor, explicit);
    }

    beforeAction()
    {
    
        if ((libGlobal.curActor) != self
            && (((libGlobal.curAction) != nil && (libGlobal.curAction).actionOfKind(TakeAction)) || ((libGlobal.curAction) != nil && (libGlobal.curAction).actionOfKind(TakeFromAction)))
            && ((libGlobal.curAction).getDobj()).isIn(self))
        {
             
            checkTakeFromInventory((libGlobal.curActor), ((libGlobal.curAction).getDobj()));
        }

         
        curState.beforeAction();
    }

    actorAction()
    {
         
    }

    afterAction()
    {
         
        curState.afterAction();
    }
        beforeTravel(traveler, connector)
    {
         
        curState.beforeTravel(traveler, connector);

    

        traveler.forEachTravelingActor(
            {actor: trackFollowInfo(actor, connector, traveler.location)});

    
        if (!traveler.isActorTraveling(traveler))
            trackFollowInfo(traveler, connector, traveler.location);
    }
        afterTravel(traveler, connector)
    {
         
        curState.afterTravel(traveler, connector);
    }
    actorTravel(traveler, connector)
    {
    

        if (accompanyingActors != nil
            && accompanyingActors.length() != 0)
        {
            foreach (local cur in accompanyingActors)
            {
                 
                if (!cur.isIn(self))
                    _nestedAction(nil, cur, TravelViaAction,((libGlobal.curAction).getDobj()));
            }
            accompanyingActors.removeRange(1, accompanyingActors.length());
        }
    }
    checkTakeFromInventory(actor, obj)
    {
         
        ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&willNotLetGoMsg,self, obj)));
        throw new ExitSignal();
    }

    getActorNotifyList()
    {
        return actorNotifyList;
    }

    addActorNotifyItem(obj)
    {
        actorNotifyList += obj;
    }
        removeActorNotifyItem(obj)
    {
        actorNotifyList -= obj;
    }
        actorNotifyList = []

    getVisualAmbient()
    {
        local ret;
        local cache;

         
        if ((cache = libGlobal.actorVisualAmbientCache) != nil
            && (ret = cache[self]) != nil)
        {
             
            return ret;
        }

         
        ret = senseAmbientMax(sightlikeSenses);

         
        if (cache != nil)
            cache[self] = ret;

         
        return ret;
    }

    isLocationLit()
    {
    

        if (sightlikeSenses.indexOf(sight) != nil
            && location != nil
            && location.brightness > 1
            && location.transSensingOut(sight) == transparent)
            return true;

    

        return (getVisualAmbient() > 1);
    }

    bestVisualInfo(obj)
    {
        local best;

         
        best = nil;

         
        foreach (local sense in sightlikeSenses)
        {
        
            best = SenseInfo.selectMoreTrans(best, senseObj(sense, obj));
        }

         
        return best;
    }
        scopeList()
    {
        local lst;

         
        lst = new Vector(32);

         
        lst.append(self);

         
        foreach (local sense in scopeSenses)
        {            lst.appendUnique(sensePresenceList(sense));
        }

         
        lst.appendUnique(contents);

    

        foreach (local cur in contents)
            cur.appendHeldContents(lst);

         
        if (location != nil)
        {
             
            local extra = location.getExtraScopeItems(self);

             
            if (extra.length() != 0)
                lst.appendUnique(extra);
        }

    


        for (local i = 1 ; i <= lst.length() ; ++i)
        {
            local extra;

             
            extra = lst[i].getExtraScopeItems(self);

             
            if (extra.length() != 0)
                lst.appendUnique(extra);
        }

         
        return lst.toList();
    }
    canSee(obj)
    {
         
        foreach (local sense in sightlikeSenses)
        {
        
            if (senseObj(sense, obj).trans != opaque)
                return true;
        }

         
        return nil;
    }

    canHear(obj)
    {
         
        foreach (local sense in hearinglikeSenses)
        {
        
            if (senseObj(sense, obj).trans != opaque)
                return true;
        }
        
         
        return nil;
    }

    canSmell(obj)
    {
         
        foreach (local sense in smelllikeSenses)
        {
        
            if (senseObj(sense, obj).trans != opaque)
                return true;
        }
        
         
        return nil;
    }

    findVisualObstructor(obj)
    {
         
        foreach (local sense in sightlikeSenses)
        {
            local obs;

             
            cacheSenseInfo(connectionTable(), sense);
            
             
            if ((obs = findOpaqueObstructor(sense, obj)) != nil)
                return obs;
        }

         
        return nil;
    }

    visibleInfoTable()
    {
         
        return visibleInfoTableFromPov(self);
    }
    visibleInfoTableFromPov(pov)
    {
        local tab;

         
        tab = nil;

         
        foreach (local sense in sightlikeSenses)
        {
            local cur;
            
             
            cur = pov.senseInfoTable(sense);

             
            tab = mergeSenseInfoTable(cur, tab);
        }

         
        return tab;
    }
    inventorySenseInfoTable()
    {
        local visInfo;
        local cont;
        local ambient;
        local info;
        
    
        visInfo = visibleInfoTable();

         
        if ((info = visInfo[self]) != nil)
            ambient = info.ambient;
        else
            ambient = 0;
        
    

        cont = new Vector(32);
        foreach (local cur in contents)
        {
             
            cont.append(cur);

             
            cur.appendHeldContents(cont);
        }

    
        foreach (local cur in cont)
        {
             
            if (knowsAbout(cur))
                visInfo[cur] = new SenseInfo(cur, transparent, nil, ambient);
        }

         
        return visInfo;
    }

    showInventory(tall)
    {
    
        showInventoryWith(tall, inventoryLister);
    }

    showInventoryWith(tall, inventoryLister)
    {
        local infoTab;

         
        infoTab = inventorySenseInfoTable();

         
        inventoryLister.showList(self, self, contents,
                                 0x0002 | (tall ? 0x0001 : 0),
                                 0, infoTab, nil);

         
        inventorySense(sound, inventoryListenLister);

         
        inventorySense(smell, inventorySmellLister);
    }

    inventorySense(sense, lister)
    {
        local infoTab;
        local presenceList;
        
         
        infoTab = senseInfoTable(sense);
        
    
        presenceList = senseInfoTableSubset(infoTab,
            {obj, info: obj.isIn(self) && obj.(sense.presenceProp)});

         
        ((mainOutputStream.curTranscript).addReport(new CosmeticSpacingCommandReport('<.p>')));
        
         
        lister.showList(self, nil, presenceList, 0, 0, infoTab, nil);
    }
    inventoryLister = actorInventoryLister


    holdingDescInventoryLister = actorHoldingDescInventoryListerLong

    initializeActor()
    {
         
        pendingCommand = new Vector(5);

         
        if (inventoryLister == nil)
            inventoryLister = actorInventoryLister;

         
        antecedentTable = new LookupTable(8, 8);
        possAnaphorTable = new LookupTable(8, 8);

         
        if (curState == nil)
            setCurState(new ActorState(self));

         
        pendingConv = new Vector(5);
    }

    noteConditionsBefore()
    {
         
        locationBefore = location;
        locationLitBefore = isLocationLit();
    }

    noteConditionsAfter()
    {
            if (location == locationBefore
            && isLocationLit() != locationLitBefore)
        {
             
            "<.commandsep>";

             
            _newAction(CommandTranscript, nil, self, NoteDarknessAction);

        
            "<.commandsep>";
        }
    }
        locationBefore = nil
    locationLitBefore = nil
        nextRunTime = 0    scheduleOrder = 100
        calcScheduleOrder()
    {
         
        if (readyForTurn())
            scheduleOrder = isPlayerChar() ? 100 : 200;
        else
            scheduleOrder = isPlayerChar() ? 300 : 400;

         
        return scheduleOrder;
    }

    readyForTurn()
    {
    
        if (checkWaitingForActor())
            return nil;

    


        if (isPlayerChar())
            return true;

    

        if (pendingCommand.indexWhich({x: x.hasCommand}) != nil)
            return true;

    
        return nil;
    }

    checkWaitingForActor()
    {
        local cmdIdx;
        local idx;

         
        if (waitingForActor == nil)
            return nil;

            idx = waitingForActor.pendingCommand.indexOf(waitingForInfo);
        cmdIdx = waitingForActor.pendingCommand.indexWhich({x: x.hasCommand});
        if (idx != nil && cmdIdx != nil && idx > cmdIdx)
        {
            return true;
        }

    


        if (waitingForActor.nextRunTime > nextRunTime)
            return true;

         
        waitingForActor = nil;
        waitingForInfo = nil;

         
        return nil;
    }
        mostRecentAction = nil
    addBusyTime(action, units)
    {
         
        mostRecentAction = action;

         
        nextRunTime += units;
    }
    idleTurn()
    {
        local tCur = Schedulable.gameClockTime;
        local origNextRunTime = nextRunTime;
        
    
        if (lastConvTime < tCur)
        {
             
            local info = pendingConv.valWhich({x: tCur >= x.time_});

             
            if (info != nil)
            {
                 
                pendingConv.removeElement(info);

                 
                initiateConversation(info.state_, info.node_);
            }
        }

         
        curState.takeTurn();

    


        if (nextRunTime == origNextRunTime)
            ++nextRunTime;
    }

    nonIdleTurn()
    {
         
        followingActor = nil;
    }
    followingActor = nil
    cannotFollow()
    {
    
        followingActor = nil;
    }

    executeTurn()
    {
         
        "<.commandsep>";
        
         
        return withActionEnv(EventAction, self,
            {: callWithSenseContext(isPlayerChar() ? nil : self, sight,
                                    {: executeActorTurn() }) });
    }
    executeActorTurn()
    {
    
        if (pendingResponse != nil && canTalkTo(pendingResponse.issuer_))
        {            if (pendingResponse.issuer_.isPlayerChar())
            {
            
                getParserDeferredMessageObj().(pendingResponse.prop_)(
                    self, pendingResponse.args_...);
            }
            else
            {
                 
                pendingResponse.issuer_.notifyIssuerParseFailure(
                    self, pendingResponse.prop_, pendingResponse.args_);
            }

        
            pendingResponse = nil;
        }
            
         
        if (checkWaitingForActor())
        {
        
            idleTurn();
            return true;
        }
            
    

        if (pendingCommand.length() == 0 && isPlayerChar())
        {
            local toks;
            
             
            toks = readMainCommandTokens(rmcCommand);
            
            (mainOutputStream.curTranscript).activate();
            
            if (toks == nil)
                return true;
            
             
            toks = toks[2];
            
                    addPendingCommand(true, self, toks);
        }

    
        if (pendingCommand.length() != 0)
        {
            local cmd;
            
             
            cmd = pendingCommand[1];
            pendingCommand.removeElementAt(1);
            
             
            if (cmd.hasCommand)
                nonIdleTurn();
            
             
            cmd.executePending(self);
            
            if (pendingCommand.indexWhich({x: x.hasCommand}) == nil)
                return nil;
            else
                return true;
        }
        
    
        if (followingActor != nil
            && location != nil
            && (followingActor.location.effectiveFollowLocation
                != location.effectiveFollowLocation))
        {
            local info;
            
             
            info = getFollowInfo(followingActor);
                
            if (info != nil)
            {
                local success;
                
            
                _newAction(CommandTranscript, nil, self, FollowAction,followingActor);
                
                 
                success = (location.effectiveFollowLocation ==
                           followingActor.location.effectiveFollowLocation);
                    
                 
                curState.justFollowed(success);
                
            
                if (!success)
                {
                     
                    cannotFollow();
                }
                
                 
                return true;
            }
            else
            {
            
                cannotFollow();
            }
        }

         
        idleTurn();
        
         
        return true;
    }

    isLikelyCommandTarget = true


    acceptCommand(issuingActor)
    {
         
        if (isPlayerChar())
            return true;

         
        if (issuingActor != self && !issuingActor.canTalkTo(self))
        {
             
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&objCannotHearActorMsg,self)));

             
            return nil;
        }

         
        if (nextRunTime > Schedulable.gameClockTime)
        {
             
            notifyParseFailure(issuingActor, &refuseCommandBusy,
                               [issuingActor]);

             
            return nil;
        }

         
        if (!acceptCommandBusy(issuingActor))
            return nil;

         
        return true;
    }    acceptCommandBusy(issuingActor)
    {
         
        if (pendingCommand.length() != 0)
        {            foreach (local info in pendingCommand)
            {
            
                if (info.issuer_ != issuingActor)
                {
                     
                    notifyParseFailure(issuingActor, &refuseCommandBusy,
                                       [issuingActor]);

                     
                    return nil;
                }
            }
            pendingCommand.removeRange(1, pendingCommand.length());
        }

         
        return true;
    }

    obeyCommand(issuingActor, action)
    {
         
        issuingActor.noteConversation(self);

         
        return curState.obeyCommand(issuingActor, action);
    }
    
    sayHello(actor) { sayToActor(actor, helloTopicObj, helloConvType); }
    sayGoodbye(actor) { sayToActor(actor, byeTopicObj, byeConvType); }
    sayYes(actor) { sayToActor(actor, yesTopicObj, yesConvType); }
    sayNo(actor) { sayToActor(actor, noTopicObj, noConvType); }
        sayToActor(actor, topic, convType)
    {
    

        if (actor == self)
            actor = getDefaultInterlocutor();

    
        if (actor != nil)
        {
             
            if (!canTalkTo(actor))
            {
                 
                ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&objCannotHearActorMsg,actor)));
                throw new ExitSignal();
            }

             
            noteConversation(actor);
            
             
            actor.curState.handleConversation(self, topic, convType);
        }
        else
        {
        
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(convType.unknownMsg)));
        }
    }


    saySpecialTopic()
    {
        local actor;
        
         
        if ((actor = getCurrentInterlocutor()) == nil
            || actor.curConvNode == nil)
        {
                    (libGlobal.libMessageObj).commandNotPresent;
        }
        else
        {
             
            noteConversation(actor);

             
            actor.curConvNode.saySpecialTopic(self);
        }
    }
    addPendingCommand(startOfSentence, issuer, toks)
    {
         
        pendingCommand.append(
            new PendingCommandToks(startOfSentence, issuer, toks));
    }

    addFirstPendingCommand(startOfSentence, issuer, toks)
    {
         
        pendingCommand.insertAt(
            1, new PendingCommandToks(startOfSentence, issuer, toks));
    }
    addPendingAction(startOfSentence, issuer, action, [objs])
    {
         
        pendingCommand.append(new PendingCommandAction(
            startOfSentence, issuer, action, objs...));
    }
    addFirstPendingAction(startOfSentence, issuer, action, [objs])
    {
         
        pendingCommand.insertAt(1, new PendingCommandAction(
            startOfSentence, issuer, action, objs...));
    }

    pendingCommand = nil
    pendingResponse = nil

    getParserMessageObj()
    {
    


        return isPlayerChar() ? playerMessages : npcMessages;
    }
    getParserDeferredMessageObj() { return npcDeferredMessages; }

    getActionMessageObj()
    {
    

        return isPlayerChar() ? playerActionMessages: npcActionMessages;
    }

    notifyParseFailure(issuingActor, messageProp, args)
    {
    


        callWithSenseContext(nil, nil, function()
        {
             
            if (issuingActor.isPlayerChar())
            {
            

                if (issuingActor != self && !canTalkTo(issuingActor))
                {
                

                    cannotRespondToCommand(issuingActor, messageProp, args);
                }
                else
                {
                
                    getParserMessageObj().(messageProp)(self, args...);
                }
            }
            else
            {
            

                issuingActor.
                    notifyIssuerParseFailure(self, messageProp, args);
            }
        });
    }

    cannotRespondToCommand(issuingActor, messageProp, args)
    {
    

        pendingResponse =
            new PendingResponseInfo(issuingActor, messageProp, args);

    

    }

         notifyIssuerParseFailure(targetActor, messageProp, args)
    {
         
    }
    antecedentTable = nil
    possAnaphorTable = nil

    setIt(obj)
    {
        setPronounAntecedent(PronounIt, obj);
    }
    
     
    setHim(obj)
    {
        setPronounAntecedent(PronounHim, obj);
    }
    
     
    setHer(obj)
    {
        setPronounAntecedent(PronounHer, obj);
    }
        setThem(lst)
    {
        setPronounAntecedent(PronounThem, lst);
    }
        getPronounAntecedent(typ)
    {
         
        return antecedentTable[typ];
    }
        setPronounAntecedent(typ, val)
    {
         
        antecedentTable[typ] = val;

         
        possAnaphorTable[typ] = val;
    }
        setPossAnaphor(typ, val)
    {
         
        possAnaphorTable[typ] = val;
    }
        getPossAnaphor(typ) { return possAnaphorTable[typ]; }
        forgetPossAnaphors()
    {
         
        antecedentTable.forEachAssoc(
            {key, val: possAnaphorTable[key] = val});
    }
    copyPronounAntecedentsFrom(issuer)
    {
         
        issuer.antecedentTable.forEachAssoc(
            {key, val: setPronounAntecedent(key, val)});
    }

     
    takeFromNotInMessage = &takeFromNotInActorMsg
        verifyNotSelf(msg)
    {
         
        if (self == (libGlobal.curActor))
            ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(msg)));
    }

    

    sentinelDobjTake = __objref(TakeAction, warn)     propertyset '*DobjTake' { verify()     {         verifyNotSelf(&takingSelfMsg);         inherited();     } }
    sentinelDobjDrop = __objref(DropAction, warn)     propertyset '*DobjDrop' { verify()     {         verifyNotSelf(&droppingSelfMsg);         inherited();     } }
    sentinelDobjPutOn = __objref(PutOnAction, warn)     propertyset '*DobjPutOn' { verify()     {         verifyNotSelf(&puttingSelfMsg);         inherited();     } }
    sentinelDobjPutUnder = __objref(PutUnderAction, warn)     propertyset '*DobjPutUnder' { verify()     {         verifyNotSelf(&puttingSelfMsg);         inherited();     } }
    sentinelDobjThrow = __objref(ThrowAction, warn)     propertyset '*DobjThrow' { verify()     {         verifyNotSelf(&throwingSelfMsg);         inherited();     } }
    sentinelDobjThrowAt = __objref(ThrowAtAction, warn)     propertyset '*DobjThrowAt' { verify()     {         verifyNotSelf(&throwingSelfMsg);         inherited();     } }
    sentinelDobjThrowDir = __objref(ThrowDirAction, warn)     propertyset '*DobjThrowDir' { verify()     {         verifyNotSelf(&throwingSelfMsg);         inherited();     } }
    sentinelDobjThrowTo = __objref(ThrowToAction, warn)     propertyset '*DobjThrowTo' { verify()     {         verifyNotSelf(&throwingSelfMsg);         inherited();     } }
        sentinelIobjThrowTo = __objref(ThrowToAction, warn)     propertyset '*IobjThrowTo'
    {
        verify()
        {
             
            ((libGlobal.curVerifyResults).addResult(new IllogicalVerifyResult(&willNotCatchMsg,self)));
        }
    }
        sentinelDobjPutIn = __objref(PutInAction, warn)     propertyset '*DobjPutIn'
    {
        verify()
        {
             
            if ((libGlobal.curActor) == self)
                ((libGlobal.curVerifyResults).addResult(new NonObviousVerifyResult('')));
        }

        check()
        {
             
            if ((libGlobal.curActor) == self)
                _replaceAction((libGlobal.curActor), EnterAction,((libGlobal.curAction).getIobj()));

             
            inherited();
        }
    }

    sentinelDobjKiss = __objref(KissAction, warn)     propertyset '*DobjKiss'
    {
        preCond = [touchObj]
        verify()
        {
             
            verifyNotSelf(&cannotKissSelfMsg);
        }
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotKissActorMsg))); }
    }

    sentinelDobjAskFor = __objref(AskForAction, warn)     propertyset '*DobjAskFor'
    {
        preCond = [canTalkToObj]
        verify()
        {
             
            verifyNotSelf(&cannotAskSelfForMsg);
        }
        action()
        {
             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), ((libGlobal.curAction).getTopic()), askForConvType);
        }
    }

    sentinelDobjTalkTo = __objref(TalkToAction, warn)     propertyset '*DobjTalkTo'
    {
        preCond = [canTalkToObj]
        verify()
        {
             
            verifyNotSelf(&cannotTalkToSelfMsg);
        }
        action()
        {
             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), helloTopicObj, helloConvType);
        }
    }

    sentinelIobjGiveTo = __objref(GiveToAction, warn)     propertyset '*IobjGiveTo'
    {
        verify()
        {
             
            verifyNotSelf(&cannotGiveToSelfMsg);

             
            if (((libGlobal.curAction).getDobj()) == ((libGlobal.curAction).getIobj()))
                ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(&cannotGiveToItselfMsg)));
        }
        action()
        {
             
            noteObjectShown(((libGlobal.curAction).getDobj()));

             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), ((libGlobal.curAction).getDobj()), giveConvType);
        }
    }

    sentinelIobjShowTo = __objref(ShowToAction, warn)     propertyset '*IobjShowTo'
    {
        verify()
        {
             
            verifyNotSelf(&cannotShowToSelfMsg);

             
            if (((libGlobal.curAction).getDobj()) == ((libGlobal.curAction).getIobj()))
                ((libGlobal.curVerifyResults).addResult(new IllogicalSelfVerifyResult(&cannotShowToItselfMsg)));
        }
        action()
        {
             
            noteObjectShown(((libGlobal.curAction).getDobj()));

             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), ((libGlobal.curAction).getDobj()), showConvType);
        }
    }


    noteObjectShown(obj)
    {
        local info;

         
        info = visibleInfoTable();

         
        if (info[obj] != nil)
            setHasSeen(obj);

         
        obj.setContentsSeenBy(info, self);
    }

    sentinelDobjAskAbout = __objref(AskAboutAction, warn)     propertyset '*DobjAskAbout'
    {
        preCond = [canTalkToObj]
        verify()
        {
             
            verifyNotSelf(&cannotAskSelfMsg);
        }
        action()
        {
             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), ((libGlobal.curAction).getTopic()), askAboutConvType);
        }
    }

    sentinelDobjTellAbout = __objref(TellAboutAction, warn)     propertyset '*DobjTellAbout'
    {
        preCond = [canTalkToObj]
        verify()
        {
             
            verifyNotSelf(&cannotTellSelfMsg);
        }
        check()
        {
             
            if (((libGlobal.curAction).getDobj()) == (libGlobal.curIssuingActor))
                _replaceAction((libGlobal.curIssuingActor), AskAboutAction,(libGlobal.curActor), ((libGlobal.curAction).getTopic()));

        }
        action()
        {
             
            (libGlobal.curActor).noteConversation(self);

             
            curState.handleConversation((libGlobal.curActor), ((libGlobal.curAction).getTopic()), tellAboutConvType);
        }
    }

    handleConversation(actor, topic, convType)
    {
         
        if (!handleTopic(actor, topic, convType, nil))
        {
             
            defaultConvResponse(actor, topic, convType);
        }
    }

    defaultConvResponse(actor, topic, convType)
    {
         
        convType.defaultResponse(self, actor, topic);
    }

    defaultGreetingResponse(actor)
        { ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&noResponseFromMsg,self))); }
            defaultGoodbyeResponse(actor)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }
    defaultAskResponse(fromActor, topic)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }

         defaultTellResponse(fromActor, topic)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }
            defaultShowResponse(byActor, topic)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&notInterestedMsg,self))); }
            defaultGiveResponse(byActor, topic)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&notInterestedMsg,self))); }
            defaultAskForResponse(byActor, obj)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }
            defaultYesResponse(fromActor)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }
            defaultNoResponse(fromActor)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&noResponseFromMsg,self))); }
            defaultCommandResponse(fromActor, topic)
        { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&refuseCommand,self, fromActor))); }
;

 
 

class UntakeableActor: Actor, Immovable
     
    cannotTakeMsg = &cannotTakeActorMsg
    cannotMoveMsg = &cannotMoveActorMsg
    cannotPutMsg = &cannotPutActorMsg
        sentinelDobjTaste = __objref(TasteAction, warn)     propertyset '*DobjTaste'
    {
        action() { ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotTasteActorMsg))); }
    }

    contentsInFixedIn(loc) { return nil; }
;

 class Person: UntakeableActor
     
    cannotTakeMsg = &cannotTakePersonMsg
    cannotMoveMsg = &cannotMovePersonMsg
    cannotPutMsg = &cannotPutPersonMsg
    cannotTasteActorMsg = &cannotTastePersonMsg

    bulk = 10
;

 
 

class PendingResponseInfo: object
    construct(issuer, prop, args)
    {
        issuer_ = issuer;
        prop_ = prop;
        args_ = args;
    }
        issuer_ = nil
        prop_ = nil
    args_ = []
;

 class PendingCommandInfo: object
    construct(issuer) { issuer_ = issuer; }
        hasCommand = true
            executePending(targetActor) { }
            issuer_ = nil
            startOfSentence_ = nil
;

 
class PendingCommandToks: PendingCommandInfo
    construct(startOfSentence, issuer, toks)
    {
        inherited(issuer);
        
        startOfSentence_ = startOfSentence;
        tokens_ = toks;
    }

    executePending(targetActor)
    {
         
        executeCommand(targetActor, issuer_, tokens_, startOfSentence_);
    }
    
     
    tokens_ = nil
;

 
class PendingCommandAction: PendingCommandInfo
    construct(startOfSentence, issuer, action, [objs])
    {
        inherited(issuer);
        
        startOfSentence_ = startOfSentence;
        action_ = action;
        objs_ = objs;
    }
        executePending(targetActor)
    {
         
        try
        {
             
            newActionObj(CommandTranscript, issuer_,
                         targetActor, action_, objs_...);
        }
        catch (TerminateCommandException tcExc)
        {
        
        }
    }
    action_ = nil
    objs_ = nil
;

 
class PendingCommandMarker: PendingCommandInfo
    hasCommand = nil
;

setPlayer(actor)
{ 
    libGlobal.playerChar = actor;
    setRootPOV(actor, actor);
}

