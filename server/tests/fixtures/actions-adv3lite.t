


property handleTopic;
property showSuggestions;
property sayHello;
property showScore;
property scoreNotify;
property showHints;
property disableHints;
property activated;
property extraHintsExist;
property showExitsCommand;
property exitsOnOffCommand;
property isOdor;
property isNoise;
property enumerateSuggestions;
property hyperlinkSuggestions;
property thinkDesc;
property follow;
property optionsExplained;

Quit:SystemAction     baseActionClass = Quit
   
    
    execAction(cmd)
    {        
        message('quit query', nil);
       
        if(yesOrNo())
            throw new QuittingException;        
    }
;

Undo:SystemAction     baseActionClass = Undo
   
    
    execAction(cmd)
    {
        if(undo())
        {
            message('undo okay', nil,libGlobal.lastCommandForUndo)
;
            
             
            PostUndoObject.classExec();
            
            return true;
        }
        else
        {
            message('undo failed', nil);
            return nil;
        }
    }
    
;

Restart:SystemAction     baseActionClass = Restart
    
    
    execAction(cmd)
    {
        message('restart query', nil)
;
        
        if(inputManager.getInputLine().toLower.startsWith(affirmativeLetter))
            doRestartGame();
        
    }
    
    affirmativeLetter = 'y'
    
    doRestartGame()
    {
         
        PreRestartObject.classExec();

         



















        throw new RestartSignal();
        
    }
;

Credits:SystemAction     baseActionClass = Credits
    
    
    execAction(cmd)
    {
        versionInfo.showCredit();
        "<.p>";
    }
;

About:SystemAction     baseActionClass = About
    execAction(cmd)
    {
        versionInfo.showAbout();
        "<.p>";
    }
;

Version:SystemAction     baseActionClass = Version
    execAction(cmd)
    {
        local lst = ModuleID.getModuleList();
        foreach(local cur in lst)    
           cur.showVersion();
        
        "<.p>";          
    }
;

Exits:SystemAction     baseActionClass = Exits
    execAction(cmd)
    {
        if((libGlobal.exitListerObj) == nil)
            sayNoExitLister();
        else
            (libGlobal.exitListerObj).showExitsCommand();
    }
;

ExitsMode:SystemAction     baseActionClass = ExitsMode
    execAction(cmd)
    {
        if((libGlobal.exitListerObj) == nil)
        {
            sayNoExitLister();
            return;
        }
        
        if(cmd.verbProd.on_ != nil)
            (libGlobal.exitListerObj).exitsOnOffCommand(true, true);
        
        if(cmd.verbProd.off_ != nil)
            (libGlobal.exitListerObj).exitsOnOffCommand(nil, nil);
        
        if(cmd.verbProd.look_ != nil)
            (libGlobal.exitListerObj).exitsOnOffCommand(nil, true);
        
        if(cmd.verbProd.stat_ != nil)
            (libGlobal.exitListerObj).exitsOnOffCommand(true, nil);
    }
        
;

ExitsColour:SystemAction     baseActionClass = ExitsColour
    execAction(cmd)
    {
        if((libGlobal.exitListerObj) == nil)
        {
            sayNoExitLister(); 
            return;
        }
        
        if(defined(statuslineExitLister) && cmd.verbProd.on_ != nil)
        {
            statuslineExitLister.highlightUnvisitedExits = 
                (cmd.verbProd.on_ == 'on');
            

            message('exit color onoff', nil,cmd.verbProd.on_)
;
        }
        
        if(defined(statuslineExitLister) && cmd.verbProd.colour_ != nil)
        {
            statuslineExitLister.unvisitedExitColour = cmd.verbProd.colour_;
            statuslineExitLister.highlightUnvisitedExits = true;
            message('exit color change', nil,cmd.verbProd.colour_)
;
        }
    }
;

sayNoExitLister()
{
    message('no exit lister', nil)
;    
}


Score:SystemAction     baseActionClass = Score
    execAction(cmd)
    {
         
        if (libGlobal.scoreObj != nil)
        {
             
            libGlobal.scoreObj.showScore();

             



            if (!mentionedFullScore)
            {
                 


                htmlSay(buildMessage('mention full score', nil)
);

                 
                Score.mentionedFullScore = true;
            }
        }
        else
             
            scoreNotPresent(); 
        
    }
    
    scoreNotPresent()
    {
          message('score not present', nil)
;            
    }
    
    mentionedFullScore = nil
;

FullScore:SystemAction     baseActionClass = FullScore
    execAction(cmd)
    {
         
        showFullScore();

         
        Score.mentionedFullScore = true;
    }

     
    showFullScore()
    {
         
        if (libGlobal.scoreObj != nil)
            libGlobal.scoreObj.showFullScore();
        else
            Score.scoreNotPresent;
    }
   
;

Notify:SystemAction     baseActionClass = Notify
    execAction(cmd)
    {
         
        if (libGlobal.scoreObj != nil)
            showNotifyStatus(libGlobal.scoreObj.scoreNotify.isOn);        
        else
            commandNotPresent;
    }
    
       
    showNotifyStatus(stat)
    {
        message('show notify status', nil)
;
    }
;

NotifyOn:SystemAction     baseActionClass = NotifyOn
    execAction(cmd)
    {
         
        if (libGlobal.scoreObj != nil)
        {
            libGlobal.scoreObj.scoreNotify.isOn = true;
            acknowledgeNotifyStatus(true);
        }
        else
            commandNotPresent;
    }
;

NotifyOff:SystemAction     baseActionClass = NotifyOff
    execAction(cmd)
    {
         
        if (libGlobal.scoreObj != nil)
        {
            libGlobal.scoreObj.scoreNotify.isOn = nil;
            acknowledgeNotifyStatus(nil);
        }
        else
            commandNotPresent;
    }
;

ToggleDisambigEnumeration:SystemAction     baseActionClass = ToggleDisambigEnumeration    
    execAction(cmd)
    {
        if(libGlobal.enumerateDisambigOptions)
        {
            libGlobal.enumerateDisambigOptions = nil;
            message('disambig enum off', nil);
        }
        else
        {
            libGlobal.enumerateDisambigOptions = true;
            message('disambig enum off', nil);
        }
    }
;

EnumerateSuggestions:SystemAction     baseActionClass = EnumerateSuggestions
    execAction(cmd)
    {
        if(defined(suggestedTopicLister))
        {
            suggestedTopicLister.enumerateSuggestions = !suggestedTopicLister.enumerateSuggestions;
            
            message('toggle suggestion enum', nil)
;          
        }
        if(!defined(suggestedTopicLister))
            message('no suggestions present', nil);
    }
;

HyperlinkSuggestions:SystemAction     baseActionClass = HyperlinkSuggestions
    execAction(cmd)       
    {
         
        if(systemInfo(34) != 3)
        {
            message('needs html terp', nil);
            throw new AbortActionSignal();
        }
        
        if(defined(suggestedTopicLister))
        {
            suggestedTopicLister.hyperlinkSuggestions = !suggestedTopicLister.hyperlinkSuggestions;
            
            message('toggle suggestion enum', nil)
;
        }
        if(!defined(suggestedTopicLister))
            message('no suggestions present', nil);
    }
;

Hints:SystemAction     baseActionClass = Hints
    execAction(cmd)
    {
        if((libGlobal.hintManagerObj) == nil)
            sayHintsNotPresent();
        else        
            (libGlobal.hintManagerObj).showHints();
        
    }
    
    sayHintsNotPresent() 
    {
        message('hints not present', nil)
;
    }
;
        

HintsOff:SystemAction     baseActionClass = HintsOff
    execAction(cmd)
    {
        if((libGlobal.hintManagerObj) == nil)
            message('no hints to disable', nil)
;
        else
            (libGlobal.hintManagerObj).disableHints();
    }
;

ExtraHints:SystemAction     baseActionClass = ExtraHints
    execAction(cmd)
    {
        if((libGlobal.extraHintManagerObj) == nil || !(libGlobal.extraHintManagerObj).extraHintsExist())
        {
            message('no extra hints', nil)
;
            return;
        }
        
        onOff = cmd.verbProd.onOff;
        
        if(onOff == nil)
        {
            showExtraHintStatus();
            
            return;
                    
        }
        onOff = onOff.toLower();
        
        if(onOff == hintsOff)
            (libGlobal.extraHintManagerObj).deactivate();
        else
            (libGlobal.extraHintManagerObj).activate();
        
        message('extra hints on or off', nil,onOff);
    }
    
     




    showExtraHintStatus()
    {
        local cmdstr = extraHintsCmd + onOrOff(!extraHintsActive).toUpper();
        

        message('extra hints status', nil,cmdstr)

;
            return;
    }
    
    extraHintsActive = ((libGlobal.extraHintManagerObj) != nil && (libGlobal.extraHintManagerObj).activated)
    
    onOrOff(stat) { return stat ? hintsOn : hintsOff; }
    
    onOff = nil
    
    hintsOff = buildMessage('extra hints off', nil)
    hintsOn = buildMessage('extra hints on', nil)
    
    extraHintsCmd = buildMessage('extra hints command', nil)
;

TipsOn:SystemAction     baseActionClass = TipsOn
    execAction(cmd)
    {
        tipMode.isOn = true;
        message('tips on', nil);
    }    
;

TipsOff:SystemAction     baseActionClass = TipsOff
    execAction(cmd)
    {
        tipMode.isOn = nil;
        message('tips on', nil);
    }    
;

Brief:SystemAction     baseActionClass = Brief
    execAction(cmd)
    {
        if(gameMain.verbose)
        {
            gameMain.verbose = nil;




            message('game now brief', nil)
;
        }
        else
            message('game already brief', nil);
    }
;

Verbose:SystemAction     baseActionClass = Verbose
    execAction(cmd)
    {
        if(gameMain.verbose)            
            message('game already verbose', nil);        
        else
        {
            gameMain.verbose = true;

            message('game now verbose', nil)
;
        }            
    }
;


 
InventoryTall:SystemAction     baseActionClass = InventoryTall
    execAction(cmd)
    {
         
        Inventory.inventoryStyle = self;
        
         
        message('inventory tall', nil);
    }
;
  
 
InventoryWide:SystemAction     baseActionClass = InventoryWide        
    execAction(cmd)
    {
         
        Inventory.inventoryStyle = self;
        
         
        message('inventory wide', nil);
    }
;

 
InventoryHybrid:SystemAction     baseActionClass = InventoryHybrid    
    execAction(cmd)
    {
         
        Inventory.inventoryStyle = self;
        
         
        message('inventory hybrid', nil);
    }
;


Inventory:IAction     baseActionClass = Inventory
    execAction(cmd)
    {
         




        if(splitListing)
        {
             
            local wornList = (libGlobal.curActor).contents.subset({o: o.wornBy == (libGlobal.curActor) });
            
             
            local carriedList = (libGlobal.curActor).contents.subset({o: o.wornBy == nil &&
                o.isFixed == nil});
            
             
            local wornListShown = 0;
            
             



            if(wornList.length > 0)
            {               
                (libGlobal.curActor).myWornLister.show(wornList, 0, nil);
                
                 



                if(carriedList.length == 0 || inventoryStyle == InventoryHybrid)
                    ".<.p>";
                
                 


                wornListShown = 1;
                
            }
             





            if(carriedList.length > 0 || wornList.length == 0)
                (libGlobal.curActor).myInventoryLister.show(carriedList, wornListShown);
        }
        else
        {
            (libGlobal.curActor).myInventoryLister.show((libGlobal.curActor).contents, 0);
        }
        
         
        (libGlobal.curActor).contents.forEach({x: x.noteSeen()});
    }
   
        
     



    splitListing = (inventoryStyle != InventoryTall)
    
    
     
    inventoryStyle = InventoryWide
;

Look:IAction     baseActionClass = Look
    execAction(cmd)
    {
        (libGlobal.curActor).outermostVisibleParent().lookAroundWithin();
    }

;

Wait:IAction     baseActionClass = Wait
    execAction(cmd)
    {
        message('wait', nil);
    }
   
;

Jump: SpecialTravelAction
        
    preCond = ((libGlobal.curActor).location && (libGlobal.curActor).location.getOutToJump ?
               [actorOutOfNested]: nil)
    travelProp = &jump
    
    fallback(loc) {  message('jump', nil);    }
    
    connotTravelInDark(loc)
    {
        message('leap in the dark', nil);
    }
    
;

Yell:IAction     baseActionClass = Yell
    execAction(cmd)
    {
        message('yell', nil);
    }
;

Smell:IAction     baseActionClass = Smell
    execAction(cmd)
    {
         




        local s_list = (libGlobal.curActor).getOutermostRoom.allContents.subset(
            {x: Q.canSmell((libGlobal.curActor), x)  &&  x.isProminentSmell});
        
         
        s_list += (libGlobal.curActor).getOutermostRoom;
        
        s_list = s_list.getUnique();
        
         
        local r_list = getRemoteSmellList().getUnique() - s_list;
               
         



        local somethingDisplayed = nil;
        
        
         




        foreach(local cur in s_list)
        {
            if(cur.displayAlt(&smellDesc))
                somethingDisplayed = true;
        }
        
         
        if(listRemoteSmells(r_list))
            somethingDisplayed = true;
        
        
                 
        if(!somethingDisplayed)            
            message('smell nothing intransitive', nil)
;

    }
    
     
    getRemoteSmellList() { return []; }
    
     
    listRemoteSmells(lst) { return nil; }
;


Listen:IAction     baseActionClass = Listen
    execAction(cmd)
    {
         


        
        local s_list = (libGlobal.curActor).getOutermostRoom.allContents.subset(
            {x: Q.canHear((libGlobal.curActor),x) && x.isProminentNoise});
        
         
        s_list += (libGlobal.curActor).getOutermostRoom;
        
        s_list = s_list.getUnique();
        
        local r_list = getRemoteSoundList().getUnique() - s_list;
        
         



        local somethingDisplayed = nil;
        
        foreach(local cur in s_list)
        {
            if(cur.displayAlt(&listenDesc))
                somethingDisplayed = true;
        }
        
        if(listRemoteSounds(r_list))
            somethingDisplayed = true;
        
        
        if(!somethingDisplayed)
            message('hear nothing listen', nil)
;

        
    }
    
     
    getRemoteSoundList() { return []; }
    
     
    listRemoteSounds(lst) { return nil; }
;

Sleep:IAction     baseActionClass = Sleep
    execAction(cmd)
    {
        message('no sleeping', nil);
    }
;



GoIn: TravelAction
    direction = inDir
    predefinedDirection = true
;

GoOut: TravelAction
    direction = outDir
    predefinedDirection = true
    
    execAction(cmd)
    {
        if(!(libGlobal.curActor).location.ofKind(Room))
        {
            local getOffAction;
            getOffAction = (libGlobal.curActor).location.contType == On ? GetOff : GetOutOf;
            replaceAction(getOffAction, (libGlobal.curActor).location);
        }
        else
        {
            "<<buildImplicitActionAnnouncement(true)>>";
            doTravel();
        }
    }
;

 




Go: TravelAction
    predefinedDirection = true
    
     




    execCycle(cmd)
    {
        if(direction == nil)
            direction = cmd.dobj;
        inherited(cmd);
    }
    
    execAction(cmd)
    {
        if(direction == nil)
            direction = cmd.dobj;
        inherited(cmd);
    }
    
     
    resolvedObjectsInScope() { return true; }

;
    
 














    
 class SpecialTravelAction: IAction
    baseActionClass = SpecialTravelAction
        
     



    travelProp = nil
    
     




    darkTravelAllowed = nil
    
     



    requireOutOfNested = true
  
    
     
    execAction(cmd)
    {
         
        local loc = (libGlobal.curActor).getOutermostRoom;
        local conn;
        
         



        if(!loc.isIlluminated && !darkTravelAllowed)
        {
            "<<loc.cannotGoThatWayInDarkMsg>><.p>";
            return;
        }    
        
         


     
        if(!loc.propDefined(travelProp) || loc.propType(travelProp) == nil)
        {
            fallback(loc);
            return;
        }
        
         



        switch(loc.propType(travelProp))
        {
             
        case 5:
            conn = loc.(travelProp);
            if(conn.ofKind(TravelConnector) && conn.isConnectorApparent)
            {
                getOutOfNested(conn);
                conn.travelVia((libGlobal.curActor));
            }
            else
                 
                noGoodHereMsg;
            break;
             



        case 9:
        case 11:
             
            conn = loc.(travelProp);
            
             



            if(objOfKind(conn, TravelConnector))
            {
                getOutOfNested(conn);
                conn.travelVia((libGlobal.curActor));       
            }
             
            else 
                noteRetval(loc, conn);                                
            break;
             
        case 8:
            say(loc.travelProp);
            break;
             
        default:
            noGoodHereMsg;
            break;            
        } 
    }
    
     



    fallback(loc) { noGoodHereMsg; }
    
    
     



    connotTravelInDark(loc)
    {
         
        loc.cannotGoThatWayInDark(&travelProp);
    }
    
     



    noGoodHereMsg = message('doesnt work here', nil)
    
     





    noteRetval(loc, val)
    {
        if(dataType(val) == 8)
           say(val);
    }
    
     
    getOutOfNested(conn)
    {
         



        if(requireOutOfNested)
            delegated TravelAction(conn);
    }
;


GetOut:IAction     baseActionClass = GetOut
    execAction(cmd)
    {        
        GoOut.execAction(cmd);
    }
;

ClimbVague: SpecialTravelAction
    travelProp = &climb    
    
    fallback(loc) { askMissingObject(Climb, DirectObject);  }
;

 





Stand:IAction     baseActionClass = Stand
    execAction(cmd)
    {
        if(!(libGlobal.curActor).location.ofKind(Room))
            replaceAction(GetOff, (libGlobal.curActor).location);
        else
        {
            message('already standing', nil);
        }
        
    }
;


Sit:IAction     baseActionClass = Sit
    execAction(cmd)
    {
        askMissingObject(SitOn, DirectObject);          
    }
;

Lie:IAction     baseActionClass = Lie
    execAction(cmd)
    {
        askMissingObject(LieOn, DirectObject);
    }   
;


Travel: TravelAction
    direction = (dirMatch.dir)
;

VagueTravel:IAction     baseActionClass = VagueTravel
    execAction(cmd)
    {
        message('vague travel', nil);       
    }
;


GoBack:IAction     baseActionClass = GoBack
    execAction(cmd)
    {
        local pathBack = nil;
        
        if(libGlobal.lastLoc == nil)
        {
            message('nowhere back', nil);
            return;            
        }
        
        pathBack = defined(routeFinder) ? 
             routeFinder.findPath((libGlobal.curActor).getOutermostRoom,
                libGlobal.lastLoc) : nil;
               
        
        if(pathBack == nil)
        {
            message('no way back', nil);
            return;
        }
        
        if(pathBack.length == 1)
        {
            message('already back there', nil);
            return;
        }
        
        local dir = pathBack[2][1];
        
        message('going back dir', nil,dir.name);
        
        (libGlobal.curActor).getOutermostRoom.(dir.dirProp).travelVia((libGlobal.curActor));
        
    }
;

GoToMode:SystemAction     baseActionClass = GoToMode
    execAction(c)
    {
        local vp = c.verbProd;
        if(vp.brief_ != nil)
        {
            gameMain.briefGoTo = true;
            message('brief goto', nil);
        }
        if(vp.fast_ != nil)
        {
            gameMain.briefGoTo = nil;
            gameMain.fastGoTo = true;
            message('brief goto', nil);
        }
        if(vp.normal_ != nil)
        {
            gameMain.briefGoTo = nil;
            gameMain.fastGoTo = nil;
            message('brief goto', nil);
        }       
        
    }
;

GoTo:TAction     baseActionClass = GoTo     verDobjProp = &verifyDobjGoTo     remapDobjProp = &remapDobjGoTo     preCondDobjProp = &preCondDobjGoTo     checkDobjProp = &checkDobjGoTo     actionDobjProp  = &actionDobjGoTo     reportDobjProp = &reportDobjGoTo
    
     
    addExtraScopeItems(whichRole?)
    {
       scopeList = scopeList.appendUnique(Q.knownScopeList);
    }
    
    againRepeatsParse = nil
    
    reportImplicitActions = nil
;

Continue:IAction     baseActionClass = Continue
    execAction(cmd)
    {
        local path;
        path = defined(pcRouteFinder) ? pcRouteFinder.cachedRoute : nil;
        if(path == nil)
        {
            message('no journey', nil);
            return;
        }
        
        local idx = path.indexWhich({x: x[2] == (libGlobal.curActor).getOutermostRoom});
        
        if(idx == nil)
        {
            path = defined(pcRouteFinder) ?
                pcRouteFinder.findPath((libGlobal.curActor).getOutermostRoom,
                                       pcRouteFinder.currentDestination) : nil;
            
            if(path == nil)
            {
                message('off route', nil)
;
                return;
            }
            else
                idx = 1;                
        }
        
        if(idx == path.length)
        {
            say((libGlobal.curActor).getOutermostRoom.alreadyThereMsg);
            return;
        }
        
        local dir = path[idx + 1][1];
        
        takeStep(dir, path[path.length][2]);
        
        
    }
    
    takeStep(dir, dest, fastGo?)    
    {
        
        local path = defined(pcRouteFinder) ? pcRouteFinder.cachedRoute : nil;
        
        local idx = path.indexWhich({x: x[2] == (libGlobal.curActor).getOutermostRoom});
         




        if(fastGo && turnPerStep && idx && idx > 1)
        {
            beforeAction();            
        }
        
         
        message('going dir', nil,dir.name);
        
         



        local oldLoc = (libGlobal.curActor).getOutermostRoom;
        
         
        (libGlobal.curActor).getOutermostRoom.(dir.dirProp).travelVia((libGlobal.curActor));
        
         



        if((libGlobal.curActor).getOutermostRoom == oldLoc)
            throw new ExitSignal();
        
        if(!(libGlobal.curActor).isIn(dest) && !fastGo)           
        {
            htmlSay(contMsg);
            if(!optionsExplained)
            {
                explainOptions();
                optionsExplained = true;
            }
        }
        
         




        if(fastGo && turnPerStep && idx && idx < path.length - 1)
        {
            afterAction();
            turnSequence();
        }
        
    }
    
     



    turnPerStep = true
    

    contMsg =  buildMessage('explain continue', nil)
    
 
    optionsExcplained = nil
    
    explainOptions()
    {



        message('explain goto options', nil)
;
    }
;

Topics:SystemAction     baseActionClass = Topics
    execAction(cmd)
    {
        local otherActor = (libGlobal.playerChar).currentInterlocutor;
        
        if(otherActor == nil)
            message('no interlocutor', nil);
        else
        {            
            otherActor.showSuggestions(true);
        }
    }
    
    afterAction() {}
;
    

Examine:TAction     baseActionClass = Examine     verDobjProp = &verifyDobjExamine     remapDobjProp = &remapDobjExamine     preCondDobjProp = &preCondDobjExamine     checkDobjProp = &checkDobjExamine     actionDobjProp  = &actionDobjExamine     reportDobjProp = &reportDobjExamine
    announceMultiAction = true
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.ofKind(Room)});
    }

    againRepeatsParse = nil
;

 







   
ExamineOrGoTo:TAction     baseActionClass = ExamineOrGoTo     verDobjProp = &verifyDobjExamineOrGoTo     remapDobjProp = &remapDobjExamineOrGoTo     preCondDobjProp = &preCondDobjExamineOrGoTo     checkDobjProp = &checkDobjExamineOrGoTo     actionDobjProp  = &actionDobjExamineOrGoTo     reportDobjProp = &reportDobjExamineOrGoTo
    exec(cmd)
    {        
        if(defined(pcRouteFinder) && cmd.dobj.ofKind(Room)
           && !cmd.actor.isIn(cmd.dobj))        
            cmd.action = GoTo;
        else
            cmd.action = Examine;
        
        (libGlobal.curAction) = cmd.action;
        (libGlobal.curAction).reset();
        (libGlobal.curAction).exec(cmd);     
    }
    
    
     
    addExtraScopeItems(whichRole?)
    {
        scopeList = scopeList.appendUnique(Q.knownScopeList.subset({x:
            x.ofKind(Room)}));
    }
    
    
;

Follow:TAction     baseActionClass = Follow     verDobjProp = &verifyDobjFollow     remapDobjProp = &remapDobjFollow     preCondDobjProp = &preCondDobjFollow     checkDobjProp = &checkDobjFollow     actionDobjProp  = &actionDobjFollow     reportDobjProp = &reportDobjFollow
    againRepeatsParse = nil   
;


Read:TAction     baseActionClass = Read     verDobjProp = &verifyDobjRead     remapDobjProp = &remapDobjRead     preCondDobjProp = &preCondDobjRead     checkDobjProp = &checkDobjRead     actionDobjProp  = &actionDobjRead     reportDobjProp = &reportDobjRead
    announceMultiAction = true
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.ofKind(Room)});
    }

    againRepeatsParse = nil
;

SmellSomething:TAction     baseActionClass = SmellSomething     verDobjProp = &verifyDobjSmellSomething     remapDobjProp = &remapDobjSmellSomething     preCondDobjProp = &preCondDobjSmellSomething     checkDobjProp = &checkDobjSmellSomething     actionDobjProp  = &actionDobjSmellSomething     reportDobjProp = &reportDobjSmellSomething
    announceMultiAction = true
    againRepeatsParse = nil
    
     
    addExtraScopeItems(whichRole?)
    {
        if(defined(Odor))
        {
            local odorList = (libGlobal.curActor).getOutermostRoom.allContents.subset(
                { o: o.isOdor && Q.canSmell((libGlobal.curActor), o) } );
            
            scopeList = scopeList.appendUnique(odorList);
        }
    }
    
;

ListenTo:TAction     baseActionClass = ListenTo     verDobjProp = &verifyDobjListenTo     remapDobjProp = &remapDobjListenTo     preCondDobjProp = &preCondDobjListenTo     checkDobjProp = &checkDobjListenTo     actionDobjProp  = &actionDobjListenTo     reportDobjProp = &reportDobjListenTo
    announceMultiAction = true
    againRepeatsParse = nil
    
     
    addExtraScopeItems(whichRole?)
    {
        if(defined(Noise))
        {
            local noiseList = (libGlobal.curActor).getOutermostRoom.allContents.subset(
                { n: n.isNoise && Q.canHear((libGlobal.curActor), n) } );
            
            scopeList = scopeList.appendUnique(noiseList);
        }
    }    
    
;

Taste:TAction     baseActionClass = Taste     verDobjProp = &verifyDobjTaste     remapDobjProp = &remapDobjTaste     preCondDobjProp = &preCondDobjTaste     checkDobjProp = &checkDobjTaste     actionDobjProp  = &actionDobjTaste     reportDobjProp = &reportDobjTaste
    announceMultiAction = true
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.ofKind(Room)});
    }
    againRepeatsParse = nil
;

Feel:TAction     baseActionClass = Feel     verDobjProp = &verifyDobjFeel     remapDobjProp = &remapDobjFeel     preCondDobjProp = &preCondDobjFeel     checkDobjProp = &checkDobjFeel     actionDobjProp  = &actionDobjFeel     reportDobjProp = &reportDobjFeel
    announceMultiAction = true
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.ofKind(Room)});
    }
    againRepeatsParse = nil
;


Touch:TAction     baseActionClass = Touch     verDobjProp = &verifyDobjTouch     remapDobjProp = &remapDobjTouch     preCondDobjProp = &preCondDobjTouch     checkDobjProp = &checkDobjTouch     actionDobjProp  = &actionDobjTouch     reportDobjProp = &reportDobjTouch
    announceMultiAction = true
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.ofKind(Room)});
    }
    againRepeatsParse = nil
;

Take:TAction     baseActionClass = Take     verDobjProp = &verifyDobjTake     remapDobjProp = &remapDobjTake     preCondDobjProp = &preCondDobjTake     checkDobjProp = &checkDobjTake     actionDobjProp  = &actionDobjTake     reportDobjProp = &reportDobjTake
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.isDirectlyIn(cmd.actor) && !x.isFixed});
    }
    
    
    announceMultiAction = nil
    allowAll = true
    
     



    reportFailureAfterSuccess = true
    
     




    advancedGroupHandling = reportFailureAfterSuccess
     



    execGroup(cmd)
    {
         



        if(advancedGroupHandling && cmd.matchedMulti && cmd.dobjs.length > 1)
        {
             
            local fixedList = cmd.dobjs.subset({d:d.obj.isFixed});
            
             
            local portableList = cmd.dobjs - fixedList;
            
             



            local tooBigList = portableList.subset({d: d.obj.bulk > cmd.actor.maxSingleBulk || 
                                                   !d.obj.fitsLength(cmd.actor)});
            
             



            local takeList = portableList.subset({d:!d.obj.isDirectlyHeldBy(cmd.actor)});
            
             



            local heldList = portableList - takeList;
            
             
            takeList = takeList - tooBigList;
                       
             
            if(heldList.length > 0)
            {
                local heldObjsList = heldList.mapAll({d:d.obj});
                message('already holding objects', nil,makeListStr(heldObjsList, &theName))
;
            }
            
             
            if(tooBigList.length > 0)           
            {

                local tooBigObjs = tooBigList.mapAll({d:d.obj});
                message('too big for me to hold', nil,listStrIs(tooBigObjs));                
            }
            
             



            
            local bulkCapacityRemaining = cmd.actor.bulkCapacity - cmd.actor.getCarriedBulk();
            
             
            local itemCapacityRemaining = cmd.actor.maxItemsCarried - cmd.actor.directlyHeld.length;
            
             



            local exceedList = [];
            
             



          
            takeList = takeList.sort(nil, {a, b: a.obj.bulk - b.obj.bulk });
            
             




            if(cmd.actor.allContents.indexWhich({o: o.ofKind(BagOfHolding) 
                                                && cmd.actor.canReach(o) }) == nil)
            {
                foreach(local d in takeList)
                { 
                     




                    if(d.obj.bulk > bulkCapacityRemaining || itemCapacityRemaining < 1)
                        exceedList += d;
                    
                     
                    itemCapacityRemaining--;
                    
                     
                    bulkCapacityRemaining -= d.obj.bulk;                  
                }
            }
            
             




            if(exceedList.length > 0)
            {
                 
                takeList -= exceedList;
                
                 
                local excessItems = exceedList.mapAll({d: d.obj});
                
                 



                local tooFullToHoldMsg = buildMessage('hands too full to hold', nil,makeListStr(excessItems, &theName))
;
                
                (libGlobal.curCommand).afterReports += tooFullToHoldMsg;
            }
            
             



            cmd.dobjs = takeList + fixedList;                
        }       
    }

   
;

Drop:TAction     baseActionClass = Drop     verDobjProp = &verifyDobjDrop     remapDobjProp = &remapDobjDrop     preCondDobjProp = &preCondDobjDrop     checkDobjProp = &checkDobjDrop     actionDobjProp  = &actionDobjDrop     reportDobjProp = &reportDobjDrop      
    allowAll = true
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: x.isDirectlyIn(cmd.actor) && !x.isFixed});
    }  
    
     




    advancedGroupHandling = true
    
    execGroup(cmd)
    {
         



        if(advancedGroupHandling && cmd.matchedMulti && cmd.dobjs.length > 1)
        {
            cmd.dobjs = cmd.dobjs.subset({d:d.obj.isDirectlyHeldBy(cmd.actor)});
            
             
            if(cmd.dobjs.length < 1)
                message('not holding any', nil);
        }
    }
;



Throw:TAction     baseActionClass = Throw     verDobjProp = &verifyDobjThrow     remapDobjProp = &remapDobjThrow     preCondDobjProp = &preCondDobjThrow     checkDobjProp = &checkDobjThrow     actionDobjProp  = &actionDobjThrow     reportDobjProp = &reportDobjThrow
    getAll(cmd, role)
    {
        return scopeList.subset({ x: !x.isFixed});
    }   
;


Attack:TAction     baseActionClass = Attack     verDobjProp = &verifyDobjAttack     remapDobjProp = &remapDobjAttack     preCondDobjProp = &preCondDobjAttack     checkDobjProp = &checkDobjAttack     actionDobjProp  = &actionDobjAttack     reportDobjProp = &reportDobjAttack
    againRepeatsParse = nil
;

Strike:TAction     baseActionClass = Strike     verDobjProp = &verifyDobjStrike     remapDobjProp = &remapDobjStrike     preCondDobjProp = &preCondDobjStrike     checkDobjProp = &checkDobjStrike     actionDobjProp  = &actionDobjStrike     reportDobjProp = &reportDobjStrike
    againRepeatsParse = nil
;

Open:TAction     baseActionClass = Open     verDobjProp = &verifyDobjOpen     remapDobjProp = &remapDobjOpen     preCondDobjProp = &preCondDobjOpen     checkDobjProp = &checkDobjOpen     actionDobjProp  = &actionDobjOpen     reportDobjProp = &reportDobjOpen       
;

Close:TAction     baseActionClass = Close     verDobjProp = &verifyDobjClose     remapDobjProp = &remapDobjClose     preCondDobjProp = &preCondDobjClose     checkDobjProp = &checkDobjClose     actionDobjProp  = &actionDobjClose     reportDobjProp = &reportDobjClose        
;

LookIn:TAction     baseActionClass = LookIn     verDobjProp = &verifyDobjLookIn     remapDobjProp = &remapDobjLookIn     preCondDobjProp = &preCondDobjLookIn     checkDobjProp = &checkDobjLookIn     actionDobjProp  = &actionDobjLookIn     reportDobjProp = &reportDobjLookIn  
    againRepeatsParse = nil
;

LookUnder:TAction     baseActionClass = LookUnder     verDobjProp = &verifyDobjLookUnder     remapDobjProp = &remapDobjLookUnder     preCondDobjProp = &preCondDobjLookUnder     checkDobjProp = &checkDobjLookUnder     actionDobjProp  = &actionDobjLookUnder     reportDobjProp = &reportDobjLookUnder    
    againRepeatsParse = nil
;

LookBehind:TAction     baseActionClass = LookBehind     verDobjProp = &verifyDobjLookBehind     remapDobjProp = &remapDobjLookBehind     preCondDobjProp = &preCondDobjLookBehind     checkDobjProp = &checkDobjLookBehind     actionDobjProp  = &actionDobjLookBehind     reportDobjProp = &reportDobjLookBehind
    againRepeatsParse = nil
;

LookThrough:TAction     baseActionClass = LookThrough     verDobjProp = &verifyDobjLookThrough     remapDobjProp = &remapDobjLookThrough     preCondDobjProp = &preCondDobjLookThrough     checkDobjProp = &checkDobjLookThrough     actionDobjProp  = &actionDobjLookThrough     reportDobjProp = &reportDobjLookThrough
    againRepeatsParse = nil
;

LookDir:IAction     baseActionClass = LookDir
    baseActionClaas = LookDir    
       
    execAction(cmd)
    {   
        if(!handleLookIn())
            sayNoNeedToLookDir();
    }
     



    handleLookIn()
    {
        if(direction == inDir)            
        {
            inLook();        
            return true;
        }
        return nil;            
    }
    
     



    inLook()  { askMissingObject(LookIn, DirectObject); }   
    
    sayNoNeedToLookDir()
    {
        message('no need to lookdir', nil)
;
        throw new AbortActionSignal();
    }
    
    direction = nil
;

LookDir2:IAction     baseActionClass = LookDir2    
    execAction(cmd)
    {
        LookDir.execAction(cmd);
        "<.p>";
        cmd.verbProd.dirMatch = cmd.verbProd.dirMatch2;                 
        LookDir.execAction(cmd);
    }
;


Unlock:TAction     baseActionClass = Unlock     verDobjProp = &verifyDobjUnlock     remapDobjProp = &remapDobjUnlock     preCondDobjProp = &preCondDobjUnlock     checkDobjProp = &checkDobjUnlock     actionDobjProp  = &actionDobjUnlock     reportDobjProp = &reportDobjUnlock    
;

Lock:TAction     baseActionClass = Lock     verDobjProp = &verifyDobjLock     remapDobjProp = &remapDobjLock     preCondDobjProp = &preCondDobjLock     checkDobjProp = &checkDobjLock     actionDobjProp  = &actionDobjLock     reportDobjProp = &reportDobjLock        
;

SwitchOn:TAction     baseActionClass = SwitchOn     verDobjProp = &verifyDobjSwitchOn     remapDobjProp = &remapDobjSwitchOn     preCondDobjProp = &preCondDobjSwitchOn     checkDobjProp = &checkDobjSwitchOn     actionDobjProp  = &actionDobjSwitchOn     reportDobjProp = &reportDobjSwitchOn        
;

SwitchOff:TAction     baseActionClass = SwitchOff     verDobjProp = &verifyDobjSwitchOff     remapDobjProp = &remapDobjSwitchOff     preCondDobjProp = &preCondDobjSwitchOff     checkDobjProp = &checkDobjSwitchOff     actionDobjProp  = &actionDobjSwitchOff     reportDobjProp = &reportDobjSwitchOff        
;

Turn:TAction     baseActionClass = Turn     verDobjProp = &verifyDobjTurn     remapDobjProp = &remapDobjTurn     preCondDobjProp = &preCondDobjTurn     checkDobjProp = &checkDobjTurn     actionDobjProp  = &actionDobjTurn     reportDobjProp = &reportDobjTurn  
    againRepeatsParse = nil
;

Wear:TAction     baseActionClass = Wear     verDobjProp = &verifyDobjWear     remapDobjProp = &remapDobjWear     preCondDobjProp = &preCondDobjWear     checkDobjProp = &checkDobjWear     actionDobjProp  = &actionDobjWear     reportDobjProp = &reportDobjWear       
;

Doff:TAction     baseActionClass = Doff     verDobjProp = &verifyDobjDoff     remapDobjProp = &remapDobjDoff     preCondDobjProp = &preCondDobjDoff     checkDobjProp = &checkDobjDoff     actionDobjProp  = &actionDobjDoff     reportDobjProp = &reportDobjDoff    
    allowAll = true    
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: x.wornBy == (libGlobal.curActor)});
    }
;

TakeOff:IAction     baseActionClass = TakeOff
    execAction(c)
    {
        message('not a bird', nil);
        
         




    }   
;

Break:TAction     baseActionClass = Break     verDobjProp = &verifyDobjBreak     remapDobjProp = &remapDobjBreak     preCondDobjProp = &preCondDobjBreak     checkDobjProp = &checkDobjBreak     actionDobjProp  = &actionDobjBreak     reportDobjProp = &reportDobjBreak
    againRepeatsParse = nil
;

Climb:TAction     baseActionClass = Climb     verDobjProp = &verifyDobjClimb     remapDobjProp = &remapDobjClimb     preCondDobjProp = &preCondDobjClimb     checkDobjProp = &checkDobjClimb     actionDobjProp  = &actionDobjClimb     reportDobjProp = &reportDobjClimb       
;

ClimbUp:TAction     baseActionClass = ClimbUp     verDobjProp = &verifyDobjClimbUp     remapDobjProp = &remapDobjClimbUp     preCondDobjProp = &preCondDobjClimbUp     checkDobjProp = &checkDobjClimbUp     actionDobjProp  = &actionDobjClimbUp     reportDobjProp = &reportDobjClimbUp      
;

ClimbDown:TAction     baseActionClass = ClimbDown     verDobjProp = &verifyDobjClimbDown     remapDobjProp = &remapDobjClimbDown     preCondDobjProp = &preCondDobjClimbDown     checkDobjProp = &checkDobjClimbDown     actionDobjProp  = &actionDobjClimbDown     reportDobjProp = &reportDobjClimbDown        
;

Board:TAction     baseActionClass = Board     verDobjProp = &verifyDobjBoard     remapDobjProp = &remapDobjBoard     preCondDobjProp = &preCondDobjBoard     checkDobjProp = &checkDobjBoard     actionDobjProp  = &actionDobjBoard     reportDobjProp = &reportDobjBoard        
;

StandOn:TAction     baseActionClass = StandOn     verDobjProp = &verifyDobjStandOn     remapDobjProp = &remapDobjStandOn     preCondDobjProp = &preCondDobjStandOn     checkDobjProp = &checkDobjStandOn     actionDobjProp  = &actionDobjStandOn     reportDobjProp = &reportDobjStandOn   
;

SitOn:TAction     baseActionClass = SitOn     verDobjProp = &verifyDobjSitOn     remapDobjProp = &remapDobjSitOn     preCondDobjProp = &preCondDobjSitOn     checkDobjProp = &checkDobjSitOn     actionDobjProp  = &actionDobjSitOn     reportDobjProp = &reportDobjSitOn    
;

LieOn:TAction     baseActionClass = LieOn     verDobjProp = &verifyDobjLieOn     remapDobjProp = &remapDobjLieOn     preCondDobjProp = &preCondDobjLieOn     checkDobjProp = &checkDobjLieOn     actionDobjProp  = &actionDobjLieOn     reportDobjProp = &reportDobjLieOn    
;


StandIn:TAction     baseActionClass = StandIn     verDobjProp = &verifyDobjStandIn     remapDobjProp = &remapDobjStandIn     preCondDobjProp = &preCondDobjStandIn     checkDobjProp = &checkDobjStandIn     actionDobjProp  = &actionDobjStandIn     reportDobjProp = &reportDobjStandIn    
;

SitIn:TAction     baseActionClass = SitIn     verDobjProp = &verifyDobjSitIn     remapDobjProp = &remapDobjSitIn     preCondDobjProp = &preCondDobjSitIn     checkDobjProp = &checkDobjSitIn     actionDobjProp  = &actionDobjSitIn     reportDobjProp = &reportDobjSitIn    
;

LieIn:TAction     baseActionClass = LieIn     verDobjProp = &verifyDobjLieIn     remapDobjProp = &remapDobjLieIn     preCondDobjProp = &preCondDobjLieIn     checkDobjProp = &checkDobjLieIn     actionDobjProp  = &actionDobjLieIn     reportDobjProp = &reportDobjLieIn   
;

Enter:TAction     baseActionClass = Enter     verDobjProp = &verifyDobjEnter     remapDobjProp = &remapDobjEnter     preCondDobjProp = &preCondDobjEnter     checkDobjProp = &checkDobjEnter     actionDobjProp  = &actionDobjEnter     reportDobjProp = &reportDobjEnter   
;

GetOff:TAction     baseActionClass = GetOff     verDobjProp = &verifyDobjGetOff     remapDobjProp = &remapDobjGetOff     preCondDobjProp = &preCondDobjGetOff     checkDobjProp = &checkDobjGetOff     actionDobjProp  = &actionDobjGetOff     reportDobjProp = &reportDobjGetOff        
;

GetOutOf:TAction     baseActionClass = GetOutOf     verDobjProp = &verifyDobjGetOutOf     remapDobjProp = &remapDobjGetOutOf     preCondDobjProp = &preCondDobjGetOutOf     checkDobjProp = &checkDobjGetOutOf     actionDobjProp  = &actionDobjGetOutOf     reportDobjProp = &reportDobjGetOutOf    
;
    
GoThrough:TAction     baseActionClass = GoThrough     verDobjProp = &verifyDobjGoThrough     remapDobjProp = &remapDobjGoThrough     preCondDobjProp = &preCondDobjGoThrough     checkDobjProp = &checkDobjGoThrough     actionDobjProp  = &actionDobjGoThrough     reportDobjProp = &reportDobjGoThrough    
;

GoAlong:TAction     baseActionClass = GoAlong     verDobjProp = &verifyDobjGoAlong     remapDobjProp = &remapDobjGoAlong     preCondDobjProp = &preCondDobjGoAlong     checkDobjProp = &checkDobjGoAlong     actionDobjProp  = &actionDobjGoAlong     reportDobjProp = &reportDobjGoAlong    
;

TravelVia:TAction     baseActionClass = TravelVia     verDobjProp = &verifyDobjTravelVia     remapDobjProp = &remapDobjTravelVia     preCondDobjProp = &preCondDobjTravelVia     checkDobjProp = &checkDobjTravelVia     actionDobjProp  = &actionDobjTravelVia     reportDobjProp = &reportDobjTravelVia
;

Push:TAction     baseActionClass = Push     verDobjProp = &verifyDobjPush     remapDobjProp = &remapDobjPush     preCondDobjProp = &preCondDobjPush     checkDobjProp = &checkDobjPush     actionDobjProp  = &actionDobjPush     reportDobjProp = &reportDobjPush
    againRepeatsParse = nil
;

Pull:TAction     baseActionClass = Pull     verDobjProp = &verifyDobjPull     remapDobjProp = &remapDobjPull     preCondDobjProp = &preCondDobjPull     checkDobjProp = &checkDobjPull     actionDobjProp  = &actionDobjPull     reportDobjProp = &reportDobjPull
    againRepeatsParse = nil
;

Search:TAction     baseActionClass = Search     verDobjProp = &verifyDobjSearch     remapDobjProp = &remapDobjSearch     preCondDobjProp = &preCondDobjSearch     checkDobjProp = &checkDobjSearch     actionDobjProp  = &actionDobjSearch     reportDobjProp = &reportDobjSearch
    againRepeatsParse = nil
;

Remove:TAction     baseActionClass = Remove     verDobjProp = &verifyDobjRemove     remapDobjProp = &remapDobjRemove     preCondDobjProp = &preCondDobjRemove     checkDobjProp = &checkDobjRemove     actionDobjProp  = &actionDobjRemove     reportDobjProp = &reportDobjRemove
    againRepeatsParse = nil
;

Move:TAction     baseActionClass = Move     verDobjProp = &verifyDobjMove     remapDobjProp = &remapDobjMove     preCondDobjProp = &preCondDobjMove     checkDobjProp = &checkDobjMove     actionDobjProp  = &actionDobjMove     reportDobjProp = &reportDobjMove
    againRepeatsParse = nil
;
    
Light:TAction     baseActionClass = Light     verDobjProp = &verifyDobjLight     remapDobjProp = &remapDobjLight     preCondDobjProp = &preCondDobjLight     checkDobjProp = &checkDobjLight     actionDobjProp  = &actionDobjLight     reportDobjProp = &reportDobjLight   
;

Extinguish:TAction     baseActionClass = Extinguish     verDobjProp = &verifyDobjExtinguish     remapDobjProp = &remapDobjExtinguish     preCondDobjProp = &preCondDobjExtinguish     checkDobjProp = &checkDobjExtinguish     actionDobjProp  = &actionDobjExtinguish     reportDobjProp = &reportDobjExtinguish    
;

Eat:TAction     baseActionClass = Eat     verDobjProp = &verifyDobjEat     remapDobjProp = &remapDobjEat     preCondDobjProp = &preCondDobjEat     checkDobjProp = &checkDobjEat     actionDobjProp  = &actionDobjEat     reportDobjProp = &reportDobjEat
;

Drink:TAction     baseActionClass = Drink     verDobjProp = &verifyDobjDrink     remapDobjProp = &remapDobjDrink     preCondDobjProp = &preCondDobjDrink     checkDobjProp = &checkDobjDrink     actionDobjProp  = &actionDobjDrink     reportDobjProp = &reportDobjDrink
;

Clean:TAction     baseActionClass = Clean     verDobjProp = &verifyDobjClean     remapDobjProp = &remapDobjClean     preCondDobjProp = &preCondDobjClean     checkDobjProp = &checkDobjClean     actionDobjProp  = &actionDobjClean     reportDobjProp = &reportDobjClean
    againRepeatsParse = nil
;

Dig:TAction     baseActionClass = Dig     verDobjProp = &verifyDobjDig     remapDobjProp = &remapDobjDig     preCondDobjProp = &preCondDobjDig     checkDobjProp = &checkDobjDig     actionDobjProp  = &actionDobjDig     reportDobjProp = &reportDobjDig
    againRepeatsParse = nil
;

Kiss:TAction     baseActionClass = Kiss     verDobjProp = &verifyDobjKiss     remapDobjProp = &remapDobjKiss     preCondDobjProp = &preCondDobjKiss     checkDobjProp = &checkDobjKiss     actionDobjProp  = &actionDobjKiss     reportDobjProp = &reportDobjKiss
    againRepeatsParse = nil
;

Detach:TAction     baseActionClass = Detach     verDobjProp = &verifyDobjDetach     remapDobjProp = &remapDobjDetach     preCondDobjProp = &preCondDobjDetach     checkDobjProp = &checkDobjDetach     actionDobjProp  = &actionDobjDetach     reportDobjProp = &reportDobjDetach
    getAll(cmd, role)
    {
        return scopeList.subset({ x: x.attachedTo != nil});
    }
;

DigWith:TIAction     baseActionClass = DigWith     verDobjProp = &verifyDobjDigWith     verIobjProp = &verifyIobjDigWith     remapDobjProp = &remapDobjDigWith     remapIobjProp = &remapIobjDigWith     preCondDobjProp = &preCondDobjDigWith     preCondIobjProp = &preCondIobjDigWith     checkDobjProp = &checkDobjDigWith     checkIobjProp = &checkIobjDigWith     actionDobjProp  = &actionDobjDigWith     actionIobjProp = &actionIobjDigWith     reportDobjProp = &reportDobjDigWith     reportIobjProp = &reportIobjDigWith
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

CleanWith:TIAction     baseActionClass = CleanWith     verDobjProp = &verifyDobjCleanWith     verIobjProp = &verifyIobjCleanWith     remapDobjProp = &remapDobjCleanWith     remapIobjProp = &remapIobjCleanWith     preCondDobjProp = &preCondDobjCleanWith     preCondIobjProp = &preCondIobjCleanWith     checkDobjProp = &checkDobjCleanWith     checkIobjProp = &checkIobjCleanWith     actionDobjProp  = &actionDobjCleanWith     actionIobjProp = &actionIobjCleanWith     reportDobjProp = &reportDobjCleanWith     reportIobjProp = &reportIobjCleanWith
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

MoveTo:TIAction     baseActionClass = MoveTo     verDobjProp = &verifyDobjMoveTo     verIobjProp = &verifyIobjMoveTo     remapDobjProp = &remapDobjMoveTo     remapIobjProp = &remapIobjMoveTo     preCondDobjProp = &preCondDobjMoveTo     preCondIobjProp = &preCondIobjMoveTo     checkDobjProp = &checkDobjMoveTo     checkIobjProp = &checkIobjMoveTo     actionDobjProp  = &actionDobjMoveTo     actionIobjProp = &actionIobjMoveTo     reportDobjProp = &reportDobjMoveTo     reportIobjProp = &reportIobjMoveTo
    resolveIobjFirst = nil
    getAll(cmd, role)
    {
        if(role==DirectObject)            
            return scopeList.subset({ x: x.isMoveable});
        else
            return inherited(cmd, role);
    }
    againRepeatsParse = nil
;

MoveAwayFrom:TIAction     baseActionClass = MoveAwayFrom     verDobjProp = &verifyDobjMoveAwayFrom     verIobjProp = &verifyIobjMoveAwayFrom     remapDobjProp = &remapDobjMoveAwayFrom     remapIobjProp = &remapIobjMoveAwayFrom     preCondDobjProp = &preCondDobjMoveAwayFrom     preCondIobjProp = &preCondIobjMoveAwayFrom     checkDobjProp = &checkDobjMoveAwayFrom     checkIobjProp = &checkIobjMoveAwayFrom     actionDobjProp  = &actionDobjMoveAwayFrom     actionIobjProp = &actionIobjMoveAwayFrom     reportDobjProp = &reportDobjMoveAwayFrom     reportIobjProp = &reportIobjMoveAwayFrom    
    resolveIobjFirst = nil
    
    getAll(cmd, role)
    {
        if(role==DirectObject)            
            return scopeList.subset({ x: x.isMoveable && x.movedTo != nil});
        else
            return inherited(cmd, role);
    }
    againRepeatsParse = nil
;

MoveWith:TIAction     baseActionClass = MoveWith     verDobjProp = &verifyDobjMoveWith     verIobjProp = &verifyIobjMoveWith     remapDobjProp = &remapDobjMoveWith     remapIobjProp = &remapIobjMoveWith     preCondDobjProp = &preCondDobjMoveWith     preCondIobjProp = &preCondIobjMoveWith     checkDobjProp = &checkDobjMoveWith     checkIobjProp = &checkIobjMoveWith     actionDobjProp  = &actionDobjMoveWith     actionIobjProp = &actionIobjMoveWith     reportDobjProp = &reportDobjMoveWith     reportIobjProp = &reportIobjMoveWith
    resolveIobjFirst = nil
    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: x.isMoveable});
    }
    againRepeatsParse = nil
;

PutOn:TIAction     baseActionClass = PutOn     verDobjProp = &verifyDobjPutOn     verIobjProp = &verifyIobjPutOn     remapDobjProp = &remapDobjPutOn     remapIobjProp = &remapIobjPutOn     preCondDobjProp = &preCondDobjPutOn     preCondIobjProp = &preCondIobjPutOn     checkDobjProp = &checkDobjPutOn     checkIobjProp = &checkIobjPutOn     actionDobjProp  = &actionDobjPutOn     actionIobjProp = &actionIobjPutOn     reportDobjProp = &reportDobjPutOn     reportIobjProp = &reportIobjPutOn       
    announceMultiAction = nil
    allowAll = true
    getAll(cmd, role)   
    {
        return putAllScope(curIobj, scopeList);
    }
;

 











putAllScope(iobj, slist)
{
     
    local portables = slist.subset({x: !x.isFixed});
    
     
    if(portables.length < 1)
        return slist.subset({x: !x.ofKind(Room) && x != (libGlobal.curActor)});
    
     



    local suitables = portables.subset({x: iobj == nil || !x.isOrIsIn(iobj)});
    
     
    if(suitables.length > 0)
        return suitables;
    
     
    
    return portables;
}


PutIn:TIAction     baseActionClass = PutIn     verDobjProp = &verifyDobjPutIn     verIobjProp = &verifyIobjPutIn     remapDobjProp = &remapDobjPutIn     remapIobjProp = &remapIobjPutIn     preCondDobjProp = &preCondDobjPutIn     preCondIobjProp = &preCondIobjPutIn     checkDobjProp = &checkDobjPutIn     checkIobjProp = &checkIobjPutIn     actionDobjProp  = &actionDobjPutIn     actionIobjProp = &actionIobjPutIn     reportDobjProp = &reportDobjPutIn     reportIobjProp = &reportIobjPutIn          
    announceMultiAction = nil
    allowAll = true
    
    getAll(cmd, role)   
    {
        return putAllScope(curIobj, scopeList);
    }
    
; 




PutUnder:TIAction     baseActionClass = PutUnder     verDobjProp = &verifyDobjPutUnder     verIobjProp = &verifyIobjPutUnder     remapDobjProp = &remapDobjPutUnder     remapIobjProp = &remapIobjPutUnder     preCondDobjProp = &preCondDobjPutUnder     preCondIobjProp = &preCondIobjPutUnder     checkDobjProp = &checkDobjPutUnder     checkIobjProp = &checkIobjPutUnder     actionDobjProp  = &actionDobjPutUnder     actionIobjProp = &actionIobjPutUnder     reportDobjProp = &reportDobjPutUnder     reportIobjProp = &reportIobjPutUnder      
    announceMultiAction = nil
    allowAll = true
    
    getAll(cmd, role)   
    {
        return putAllScope(curIobj, scopeList);
    }
;

PutBehind:TIAction     baseActionClass = PutBehind     verDobjProp = &verifyDobjPutBehind     verIobjProp = &verifyIobjPutBehind     remapDobjProp = &remapDobjPutBehind     remapIobjProp = &remapIobjPutBehind     preCondDobjProp = &preCondDobjPutBehind     preCondIobjProp = &preCondIobjPutBehind     checkDobjProp = &checkDobjPutBehind     checkIobjProp = &checkIobjPutBehind     actionDobjProp  = &actionDobjPutBehind     actionIobjProp = &actionIobjPutBehind     reportDobjProp = &reportDobjPutBehind     reportIobjProp = &reportIobjPutBehind      
    announceMultiAction = nil
    allowAll = true
    
    getAll(cmd, role)   
    {
        return putAllScope(curIobj, scopeList);
    }
;



UnlockWith:TIAction     baseActionClass = UnlockWith     verDobjProp = &verifyDobjUnlockWith     verIobjProp = &verifyIobjUnlockWith     remapDobjProp = &remapDobjUnlockWith     remapIobjProp = &remapIobjUnlockWith     preCondDobjProp = &preCondDobjUnlockWith     preCondIobjProp = &preCondIobjUnlockWith     checkDobjProp = &checkDobjUnlockWith     checkIobjProp = &checkIobjUnlockWith     actionDobjProp  = &actionDobjUnlockWith     actionIobjProp = &actionIobjUnlockWith     reportDobjProp = &reportDobjUnlockWith     reportIobjProp = &reportIobjUnlockWith      
    resolveIobjFirst = nil
;

LockWith:TIAction     baseActionClass = LockWith     verDobjProp = &verifyDobjLockWith     verIobjProp = &verifyIobjLockWith     remapDobjProp = &remapDobjLockWith     remapIobjProp = &remapIobjLockWith     preCondDobjProp = &preCondDobjLockWith     preCondIobjProp = &preCondIobjLockWith     checkDobjProp = &checkDobjLockWith     checkIobjProp = &checkIobjLockWith     actionDobjProp  = &actionDobjLockWith     actionIobjProp = &actionIobjLockWith     reportDobjProp = &reportDobjLockWith     reportIobjProp = &reportIobjLockWith      
    resolveIobjFirst = nil
;

Attach:TAction     baseActionClass = Attach     verDobjProp = &verifyDobjAttach     remapDobjProp = &remapDobjAttach     preCondDobjProp = &preCondDobjAttach     checkDobjProp = &checkDobjAttach     actionDobjProp  = &actionDobjAttach     reportDobjProp = &reportDobjAttach
;

AttachTo:TIAction     baseActionClass = AttachTo     verDobjProp = &verifyDobjAttachTo     verIobjProp = &verifyIobjAttachTo     remapDobjProp = &remapDobjAttachTo     remapIobjProp = &remapIobjAttachTo     preCondDobjProp = &preCondDobjAttachTo     preCondIobjProp = &preCondIobjAttachTo     checkDobjProp = &checkDobjAttachTo     checkIobjProp = &checkIobjAttachTo     actionDobjProp  = &actionDobjAttachTo     actionIobjProp = &actionIobjAttachTo     reportDobjProp = &reportDobjAttachTo     reportIobjProp = &reportIobjAttachTo    
    resolveIobjFirst = nil
;

DetachFrom:TIAction     baseActionClass = DetachFrom     verDobjProp = &verifyDobjDetachFrom     verIobjProp = &verifyIobjDetachFrom     remapDobjProp = &remapDobjDetachFrom     remapIobjProp = &remapIobjDetachFrom     preCondDobjProp = &preCondDobjDetachFrom     preCondIobjProp = &preCondIobjDetachFrom     checkDobjProp = &checkDobjDetachFrom     checkIobjProp = &checkIobjDetachFrom     actionDobjProp  = &actionDobjDetachFrom     actionIobjProp = &actionIobjDetachFrom     reportDobjProp = &reportDobjDetachFrom     reportIobjProp = &reportIobjDetachFrom    
    getAll(cmd, role)
    {
        return scopeList.subset({ x: x.attachedTo == curIobj});
    }
;

FastenTo:TIAction     baseActionClass = FastenTo     verDobjProp = &verifyDobjFastenTo     verIobjProp = &verifyIobjFastenTo     remapDobjProp = &remapDobjFastenTo     remapIobjProp = &remapIobjFastenTo     preCondDobjProp = &preCondDobjFastenTo     preCondIobjProp = &preCondIobjFastenTo     checkDobjProp = &checkDobjFastenTo     checkIobjProp = &checkIobjFastenTo     actionDobjProp  = &actionDobjFastenTo     actionIobjProp = &actionIobjFastenTo     reportDobjProp = &reportDobjFastenTo     reportIobjProp = &reportIobjFastenTo     
    resolveIobjFirst = nil
;

TurnWith:TIAction     baseActionClass = TurnWith     verDobjProp = &verifyDobjTurnWith     verIobjProp = &verifyIobjTurnWith     remapDobjProp = &remapDobjTurnWith     remapIobjProp = &remapIobjTurnWith     preCondDobjProp = &preCondDobjTurnWith     preCondIobjProp = &preCondIobjTurnWith     checkDobjProp = &checkDobjTurnWith     checkIobjProp = &checkIobjTurnWith     actionDobjProp  = &actionDobjTurnWith     actionIobjProp = &actionIobjTurnWith     reportDobjProp = &reportDobjTurnWith     reportIobjProp = &reportIobjTurnWith
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

Cut:TAction     baseActionClass = Cut     verDobjProp = &verifyDobjCut     remapDobjProp = &remapDobjCut     preCondDobjProp = &preCondDobjCut     checkDobjProp = &checkDobjCut     actionDobjProp  = &actionDobjCut     reportDobjProp = &reportDobjCut
;

CutWith:TIAction     baseActionClass = CutWith     verDobjProp = &verifyDobjCutWith     verIobjProp = &verifyIobjCutWith     remapDobjProp = &remapDobjCutWith     remapIobjProp = &remapIobjCutWith     preCondDobjProp = &preCondDobjCutWith     preCondIobjProp = &preCondIobjCutWith     checkDobjProp = &checkDobjCutWith     checkIobjProp = &checkIobjCutWith     actionDobjProp  = &actionDobjCutWith     actionIobjProp = &actionIobjCutWith     reportDobjProp = &reportDobjCutWith     reportIobjProp = &reportIobjCutWith
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

TakeFrom:TIAction     baseActionClass = TakeFrom     verDobjProp = &verifyDobjTakeFrom     verIobjProp = &verifyIobjTakeFrom     remapDobjProp = &remapDobjTakeFrom     remapIobjProp = &remapIobjTakeFrom     preCondDobjProp = &preCondDobjTakeFrom     preCondIobjProp = &preCondIobjTakeFrom     checkDobjProp = &checkDobjTakeFrom     checkIobjProp = &checkIobjTakeFrom     actionDobjProp  = &actionDobjTakeFrom     actionIobjProp = &actionIobjTakeFrom     reportDobjProp = &reportDobjTakeFrom     reportIobjProp = &reportIobjTakeFrom    
     



    
    exec(cmd)
    {
        if(!cmd.matchedAll || cmd.iobj.notionalContents.indexOf(cmd.dobj) != nil)
            inherited(cmd);
        
         
        else 
            curDobj = cmd.dobj;
    }
    
    reportAction()
    {
        if(reportList.length > 0)
            inherited;
        
         



        else if((libGlobal.curCommand).matchedAll)
            message('nothing to take', nil,(libGlobal.curCommand).iobj.theName)
;
    }
    
    getAll(cmd, role)
    {        
        return scopeList.subset({ x: !x.isFixed});
    }
    
    allowAll = true
    
    
;

ThrowAt:TIAction     baseActionClass = ThrowAt     verDobjProp = &verifyDobjThrowAt     verIobjProp = &verifyIobjThrowAt     remapDobjProp = &remapDobjThrowAt     remapIobjProp = &remapIobjThrowAt     preCondDobjProp = &preCondDobjThrowAt     preCondIobjProp = &preCondIobjThrowAt     checkDobjProp = &checkDobjThrowAt     checkIobjProp = &checkIobjThrowAt     actionDobjProp  = &actionDobjThrowAt     actionIobjProp = &actionIobjThrowAt     reportDobjProp = &reportDobjThrowAt     reportIobjProp = &reportIobjThrowAt    
    resolveIobjFirst = nil
;

ThrowTo:TIAction     baseActionClass = ThrowTo     verDobjProp = &verifyDobjThrowTo     verIobjProp = &verifyIobjThrowTo     remapDobjProp = &remapDobjThrowTo     remapIobjProp = &remapIobjThrowTo     preCondDobjProp = &preCondDobjThrowTo     preCondIobjProp = &preCondIobjThrowTo     checkDobjProp = &checkDobjThrowTo     checkIobjProp = &checkIobjThrowTo     actionDobjProp  = &actionDobjThrowTo     actionIobjProp = &actionIobjThrowTo     reportDobjProp = &reportDobjThrowTo     reportIobjProp = &reportIobjThrowTo    
    resolveIobjFirst = nil
;

AttackWith:TIAction     baseActionClass = AttackWith     verDobjProp = &verifyDobjAttackWith     verIobjProp = &verifyIobjAttackWith     remapDobjProp = &remapDobjAttackWith     remapIobjProp = &remapIobjAttackWith     preCondDobjProp = &preCondDobjAttackWith     preCondIobjProp = &preCondIobjAttackWith     checkDobjProp = &checkDobjAttackWith     checkIobjProp = &checkIobjAttackWith     actionDobjProp  = &actionDobjAttackWith     actionIobjProp = &actionIobjAttackWith     reportDobjProp = &reportDobjAttackWith     reportIobjProp = &reportIobjAttackWith
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

ThrowDir:TAction     baseActionClass = ThrowDir     verDobjProp = &verifyDobjThrowDir     remapDobjProp = &remapDobjThrowDir     preCondDobjProp = &preCondDobjThrowDir     checkDobjProp = &checkDobjThrowDir     actionDobjProp  = &actionDobjThrowDir     reportDobjProp = &reportDobjThrowDir
    execAction(cmd)
    {
        direction = cmd.verbProd.dirMatch.dir;
        inherited(cmd);
    }
    
    direction = nil
    againRepeatsParse = nil
;

JumpOffIntransitive:IAction     baseActionClass = JumpOffIntransitive    
    execAction(cmd)
    {
        if((libGlobal.curActor).location.contType == On)
            replaceAction(JumpOff, (libGlobal.curActor).location);
        else
            message('not on anything', nil);
    }    
;

JumpOff:TAction     baseActionClass = JumpOff     verDobjProp = &verifyDobjJumpOff     remapDobjProp = &remapDobjJumpOff     preCondDobjProp = &preCondDobjJumpOff     checkDobjProp = &checkDobjJumpOff     actionDobjProp  = &actionDobjJumpOff     reportDobjProp = &reportDobjJumpOff    
;

JumpOver:TAction     baseActionClass = JumpOver     verDobjProp = &verifyDobjJumpOver     remapDobjProp = &remapDobjJumpOver     preCondDobjProp = &preCondDobjJumpOver     checkDobjProp = &checkDobjJumpOver     actionDobjProp  = &actionDobjJumpOver     reportDobjProp = &reportDobjJumpOver
    againRepeatsParse = nil
;

TurnTo:LiteralTAction     baseActionClass = TurnTo     verDobjProp = &verifyDobjTurnTo     remapDobjProp = &remapDobjTurnTo     preCondDobjProp = &preCondDobjTurnTo     checkDobjProp = &checkDobjTurnTo     actionDobjProp  = &actionDobjTurnTo     reportDobjProp = &reportDobjTurnTo    
;

SetTo:LiteralTAction     baseActionClass = SetTo     verDobjProp = &verifyDobjSetTo     remapDobjProp = &remapDobjSetTo     preCondDobjProp = &preCondDobjSetTo     checkDobjProp = &checkDobjSetTo     actionDobjProp  = &actionDobjSetTo     reportDobjProp = &reportDobjSetTo    
;

Set:TAction     baseActionClass = Set     verDobjProp = &verifyDobjSet     remapDobjProp = &remapDobjSet     preCondDobjProp = &preCondDobjSet     checkDobjProp = &checkDobjSet     actionDobjProp  = &actionDobjSet     reportDobjProp = &reportDobjSet
;

TypeOnVague:TAction     baseActionClass = TypeOnVague     verDobjProp = &verifyDobjTypeOnVague     remapDobjProp = &remapDobjTypeOnVague     preCondDobjProp = &preCondDobjTypeOnVague     checkDobjProp = &checkDobjTypeOnVague     actionDobjProp  = &actionDobjTypeOnVague     reportDobjProp = &reportDobjTypeOnVague
;

TypeOn:LiteralTAction     baseActionClass = TypeOn     verDobjProp = &verifyDobjTypeOn     remapDobjProp = &remapDobjTypeOn     preCondDobjProp = &preCondDobjTypeOn     checkDobjProp = &checkDobjTypeOn     actionDobjProp  = &actionDobjTypeOn     reportDobjProp = &reportDobjTypeOn
    againRepeatsParse = nil   
    
    doActionOnce()
    {
        libGlobal.lastTypedOnObj = curDobj;
        return inherited();
    }
;

Type:LiteralAction     baseActionClass = Type
    againRepeatsParse = nil
    
    execAction(cmd) { askMissingObject(TypeOn, IndirectObject); }
;

TypeVague:IAction     baseActionClass = TypeVague
    execAction(s) { askMissingLiteral(Type, DirectObject); }
;

EnterOn:LiteralTAction     baseActionClass = EnterOn     verDobjProp = &verifyDobjEnterOn     remapDobjProp = &remapDobjEnterOn     preCondDobjProp = &preCondDobjEnterOn     checkDobjProp = &checkDobjEnterOn     actionDobjProp  = &actionDobjEnterOn     reportDobjProp = &reportDobjEnterOn
    againRepeatsParse = nil
;

WriteOn:LiteralTAction     baseActionClass = WriteOn     verDobjProp = &verifyDobjWriteOn     remapDobjProp = &remapDobjWriteOn     preCondDobjProp = &preCondDobjWriteOn     checkDobjProp = &checkDobjWriteOn     actionDobjProp  = &actionDobjWriteOn     reportDobjProp = &reportDobjWriteOn
    againRepeatsParse = nil
    
    doActionOnce()
    {
        libGlobal.lastWrittenOnObj = curDobj;
        return inherited();
    }
;

Write:LiteralAction     baseActionClass = Write
    againRepeatsParse = nil

    execAction(cmd) { askMissingObject(WriteOn, IndirectObject); }
;

WriteVague:IAction     baseActionClass = WriteVague
    execAction(c)
    {
        askMissingLiteral(Write, DirectObject);
    }
;


ConsultAbout:TopicTAction     baseActionClass = ConsultAbout     verDobjProp = &verifyDobjConsultAbout     remapDobjProp = &remapDobjConsultAbout     preCondDobjProp = &preCondDobjConsultAbout     checkDobjProp = &checkDobjConsultAbout     actionDobjProp  = &actionDobjConsultAbout     reportDobjProp = &reportDobjConsultAbout
    againRepeatsParse = nil
    unhides = IndirectObject
;

ConsultWhatAbout:TopicAction     baseActionClass = ConsultWhatAbout
    execAction(cmd)
    {
        askMissingObject(ConsultAbout, DirectObject);
    }
;

ConsultAboutVague:IAction     baseActionClass = ConsultAboutVague
    execAction(c)
    {
        message('consult about vague', nil)
;
    }
;

SwitchVague:TAction     baseActionClass = SwitchVague     verDobjProp = &verifyDobjSwitchVague     remapDobjProp = &remapDobjSwitchVague     preCondDobjProp = &preCondDobjSwitchVague     checkDobjProp = &checkDobjSwitchVague     actionDobjProp  = &actionDobjSwitchVague     reportDobjProp = &reportDobjSwitchVague
    againRepeatsParse = nil
;

Flip:TAction     baseActionClass = Flip     verDobjProp = &verifyDobjFlip     remapDobjProp = &remapDobjFlip     preCondDobjProp = &preCondDobjFlip     checkDobjProp = &checkDobjFlip     actionDobjProp  = &actionDobjFlip     reportDobjProp = &reportDobjFlip
    againRepeatsParse = nil
;

Fasten:TAction     baseActionClass = Fasten     verDobjProp = &verifyDobjFasten     remapDobjProp = &remapDobjFasten     preCondDobjProp = &preCondDobjFasten     checkDobjProp = &checkDobjFasten     actionDobjProp  = &actionDobjFasten     reportDobjProp = &reportDobjFasten   
;


Burn:TAction     baseActionClass = Burn     verDobjProp = &verifyDobjBurn     remapDobjProp = &remapDobjBurn     preCondDobjProp = &preCondDobjBurn     checkDobjProp = &checkDobjBurn     actionDobjProp  = &actionDobjBurn     reportDobjProp = &reportDobjBurn   
;

BurnWith:TIAction     baseActionClass = BurnWith     verDobjProp = &verifyDobjBurnWith     verIobjProp = &verifyIobjBurnWith     remapDobjProp = &remapDobjBurnWith     remapIobjProp = &remapIobjBurnWith     preCondDobjProp = &preCondDobjBurnWith     preCondIobjProp = &preCondIobjBurnWith     checkDobjProp = &checkDobjBurnWith     checkIobjProp = &checkIobjBurnWith     actionDobjProp  = &actionDobjBurnWith     actionIobjProp = &actionIobjBurnWith     reportDobjProp = &reportDobjBurnWith     reportIobjProp = &reportIobjBurnWith
    resolveIobjFirst = nil
;

Pour:TAction     baseActionClass = Pour     verDobjProp = &verifyDobjPour     remapDobjProp = &remapDobjPour     preCondDobjProp = &preCondDobjPour     checkDobjProp = &checkDobjPour     actionDobjProp  = &actionDobjPour     reportDobjProp = &reportDobjPour
    againRepeatsParse = nil
;

PourOnto:TIAction     baseActionClass = PourOnto     verDobjProp = &verifyDobjPourOnto     verIobjProp = &verifyIobjPourOnto     remapDobjProp = &remapDobjPourOnto     remapIobjProp = &remapIobjPourOnto     preCondDobjProp = &preCondDobjPourOnto     preCondIobjProp = &preCondIobjPourOnto     checkDobjProp = &checkDobjPourOnto     checkIobjProp = &checkIobjPourOnto     actionDobjProp  = &actionDobjPourOnto     actionIobjProp = &actionIobjPourOnto     reportDobjProp = &reportDobjPourOnto     reportIobjProp = &reportIobjPourOnto    
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

PourInto:TIAction     baseActionClass = PourInto     verDobjProp = &verifyDobjPourInto     verIobjProp = &verifyIobjPourInto     remapDobjProp = &remapDobjPourInto     remapIobjProp = &remapIobjPourInto     preCondDobjProp = &preCondDobjPourInto     preCondIobjProp = &preCondIobjPourInto     checkDobjProp = &checkDobjPourInto     checkIobjProp = &checkIobjPourInto     actionDobjProp  = &actionDobjPourInto     actionIobjProp = &actionIobjPourInto     reportDobjProp = &reportDobjPourInto     reportIobjProp = &reportIobjPourInto
    resolveIobjFirst = nil
    againRepeatsParse = nil
;

Screw:TAction     baseActionClass = Screw     verDobjProp = &verifyDobjScrew     remapDobjProp = &remapDobjScrew     preCondDobjProp = &preCondDobjScrew     checkDobjProp = &checkDobjScrew     actionDobjProp  = &actionDobjScrew     reportDobjProp = &reportDobjScrew    
;

ScrewWith:TIAction     baseActionClass = ScrewWith     verDobjProp = &verifyDobjScrewWith     verIobjProp = &verifyIobjScrewWith     remapDobjProp = &remapDobjScrewWith     remapIobjProp = &remapIobjScrewWith     preCondDobjProp = &preCondDobjScrewWith     preCondIobjProp = &preCondIobjScrewWith     checkDobjProp = &checkDobjScrewWith     checkIobjProp = &checkIobjScrewWith     actionDobjProp  = &actionDobjScrewWith     actionIobjProp = &actionIobjScrewWith     reportDobjProp = &reportDobjScrewWith     reportIobjProp = &reportIobjScrewWith    
    resolveIobjFirst = nil
;
    
Unscrew:TAction     baseActionClass = Unscrew     verDobjProp = &verifyDobjUnscrew     remapDobjProp = &remapDobjUnscrew     preCondDobjProp = &preCondDobjUnscrew     checkDobjProp = &checkDobjUnscrew     actionDobjProp  = &actionDobjUnscrew     reportDobjProp = &reportDobjUnscrew
;

UnscrewWith:TIAction     baseActionClass = UnscrewWith     verDobjProp = &verifyDobjUnscrewWith     verIobjProp = &verifyIobjUnscrewWith     remapDobjProp = &remapDobjUnscrewWith     remapIobjProp = &remapIobjUnscrewWith     preCondDobjProp = &preCondDobjUnscrewWith     preCondIobjProp = &preCondIobjUnscrewWith     checkDobjProp = &checkDobjUnscrewWith     checkIobjProp = &checkIobjUnscrewWith     actionDobjProp  = &actionDobjUnscrewWith     actionIobjProp = &actionIobjUnscrewWith     reportDobjProp = &reportDobjUnscrewWith     reportIobjProp = &reportIobjUnscrewWith    
    resolveIobjFirst = nil
;

Unfasten:TAction     baseActionClass = Unfasten     verDobjProp = &verifyDobjUnfasten     remapDobjProp = &remapDobjUnfasten     preCondDobjProp = &preCondDobjUnfasten     checkDobjProp = &checkDobjUnfasten     actionDobjProp  = &actionDobjUnfasten     reportDobjProp = &reportDobjUnfasten
;

UnfastenFrom:TIAction     baseActionClass = UnfastenFrom     verDobjProp = &verifyDobjUnfastenFrom     verIobjProp = &verifyIobjUnfastenFrom     remapDobjProp = &remapDobjUnfastenFrom     remapIobjProp = &remapIobjUnfastenFrom     preCondDobjProp = &preCondDobjUnfastenFrom     preCondIobjProp = &preCondIobjUnfastenFrom     checkDobjProp = &checkDobjUnfastenFrom     checkIobjProp = &checkIobjUnfastenFrom     actionDobjProp  = &actionDobjUnfastenFrom     actionIobjProp = &actionIobjUnfastenFrom     reportDobjProp = &reportDobjUnfastenFrom     reportIobjProp = &reportIobjUnfastenFrom    
;

PlugInto:TIAction     baseActionClass = PlugInto     verDobjProp = &verifyDobjPlugInto     verIobjProp = &verifyIobjPlugInto     remapDobjProp = &remapDobjPlugInto     remapIobjProp = &remapIobjPlugInto     preCondDobjProp = &preCondDobjPlugInto     preCondIobjProp = &preCondIobjPlugInto     checkDobjProp = &checkDobjPlugInto     checkIobjProp = &checkIobjPlugInto     actionDobjProp  = &actionDobjPlugInto     actionIobjProp = &actionIobjPlugInto     reportDobjProp = &reportDobjPlugInto     reportIobjProp = &reportIobjPlugInto   
    resolveIobjFirst = nil
;

PlugIn:TAction     baseActionClass = PlugIn     verDobjProp = &verifyDobjPlugIn     remapDobjProp = &remapDobjPlugIn     preCondDobjProp = &preCondDobjPlugIn     checkDobjProp = &checkDobjPlugIn     actionDobjProp  = &actionDobjPlugIn     reportDobjProp = &reportDobjPlugIn    
;

UnplugFrom:TIAction     baseActionClass = UnplugFrom     verDobjProp = &verifyDobjUnplugFrom     verIobjProp = &verifyIobjUnplugFrom     remapDobjProp = &remapDobjUnplugFrom     remapIobjProp = &remapIobjUnplugFrom     preCondDobjProp = &preCondDobjUnplugFrom     preCondIobjProp = &preCondIobjUnplugFrom     checkDobjProp = &checkDobjUnplugFrom     checkIobjProp = &checkIobjUnplugFrom     actionDobjProp  = &actionDobjUnplugFrom     actionIobjProp = &actionIobjUnplugFrom     reportDobjProp = &reportDobjUnplugFrom     reportIobjProp = &reportIobjUnplugFrom        
;

Unplug:TAction     baseActionClass = Unplug     verDobjProp = &verifyDobjUnplug     remapDobjProp = &remapDobjUnplug     preCondDobjProp = &preCondDobjUnplug     checkDobjProp = &checkDobjUnplug     actionDobjProp  = &actionDobjUnplug     reportDobjProp = &reportDobjUnplug    
;


PushTravelDir:TAction     baseActionClass = PushTravelDir     verDobjProp = &verifyDobjPushTravelDir     remapDobjProp = &remapDobjPushTravelDir     preCondDobjProp = &preCondDobjPushTravelDir     checkDobjProp = &checkDobjPushTravelDir     actionDobjProp  = &actionDobjPushTravelDir     reportDobjProp = &reportDobjPushTravelDir
    
    isPushTravelAction = true
    
    execAction(cmd)
    {
        local conn;
        
         
        travelAllowed = nil;
        
         
        direction = cmd.verbProd.dirMatch.dir;
        
         
        local loc = (libGlobal.curActor).getOutermostRoom; 
        


        
         



        
    retry:
         



        if(loc.propType(direction.dirProp) == 5)
        {
             
            conn = loc.(direction.dirProp); 
            
             



            if(conn.ofKind(UnlistedProxyConnector))
            {
                 
                direction = conn.direction;
                
                 
                goto retry;                  
            }
            
             




            if(conn.PushTravelVia)
                replaceAction(conn.PushTravelVia, ((libGlobal.curAction).curDobj), conn);
            
             



            if(dataTypeXlat(conn) == 12)
            {
                try
                {
                    conn();                    
                }
                catch (Exception ex)
                {
                    "Problem with function object attached to the <<direction.name>> property of <<
loc.name>>.<.p>";
                    
                    ex.displayException();
                }
            }
            else        
                
             



                
                "<b>ERROR!</b> Illegal object <<conn>> attached to the <<direction.name>> property  of <<
loc.name>>. ";
            
        }
         




        else
            nonTravel(loc, direction);
    }
    
    

    travelAllowed = nil
    direction = nil
    curIobj = nil
    
    
    doTravel() { delegated TravelAction(); }
;

PushTravelThrough:TIAction     baseActionClass = PushTravelThrough     verDobjProp = &verifyDobjPushTravelThrough     verIobjProp = &verifyIobjPushTravelThrough     remapDobjProp = &remapDobjPushTravelThrough     remapIobjProp = &remapIobjPushTravelThrough     preCondDobjProp = &preCondDobjPushTravelThrough     preCondIobjProp = &preCondIobjPushTravelThrough     checkDobjProp = &checkDobjPushTravelThrough     checkIobjProp = &checkIobjPushTravelThrough     actionDobjProp  = &actionDobjPushTravelThrough     actionIobjProp = &actionIobjPushTravelThrough     reportDobjProp = &reportDobjPushTravelThrough     reportIobjProp = &reportIobjPushTravelThrough
    viaMode = Through
    
    isPushTravelAction = true
    
    addExtraScopeItems(role)
    {
         


        
        if(objOfKind(curIobj, TravelConnector))
            scopeList = scopeList.appendUnique(valToList(curIobj));
        
         



        inherited(role);
    }
;

PushTravelEnter:TIAction     baseActionClass = PushTravelEnter     verDobjProp = &verifyDobjPushTravelEnter     verIobjProp = &verifyIobjPushTravelEnter     remapDobjProp = &remapDobjPushTravelEnter     remapIobjProp = &remapIobjPushTravelEnter     preCondDobjProp = &preCondDobjPushTravelEnter     preCondIobjProp = &preCondIobjPushTravelEnter     checkDobjProp = &checkDobjPushTravelEnter     checkIobjProp = &checkIobjPushTravelEnter     actionDobjProp  = &actionDobjPushTravelEnter     actionIobjProp = &actionIobjPushTravelEnter     reportDobjProp = &reportDobjPushTravelEnter     reportIobjProp = &reportIobjPushTravelEnter
    viaMode = Into
    
    isPushTravelAction = true
;

PushTravelGetOutOf:TIAction     baseActionClass = PushTravelGetOutOf     verDobjProp = &verifyDobjPushTravelGetOutOf     verIobjProp = &verifyIobjPushTravelGetOutOf     remapDobjProp = &remapDobjPushTravelGetOutOf     remapIobjProp = &remapIobjPushTravelGetOutOf     preCondDobjProp = &preCondDobjPushTravelGetOutOf     preCondIobjProp = &preCondIobjPushTravelGetOutOf     checkDobjProp = &checkDobjPushTravelGetOutOf     checkIobjProp = &checkIobjPushTravelGetOutOf     actionDobjProp  = &actionDobjPushTravelGetOutOf     actionIobjProp = &actionIobjPushTravelGetOutOf     reportDobjProp = &reportDobjPushTravelGetOutOf     reportIobjProp = &reportIobjPushTravelGetOutOf
    viaMode = OutOf
    
    isPushTravelAction = true
;

PushTravelClimbUp:TIAction     baseActionClass = PushTravelClimbUp     verDobjProp = &verifyDobjPushTravelClimbUp     verIobjProp = &verifyIobjPushTravelClimbUp     remapDobjProp = &remapDobjPushTravelClimbUp     remapIobjProp = &remapIobjPushTravelClimbUp     preCondDobjProp = &preCondDobjPushTravelClimbUp     preCondIobjProp = &preCondIobjPushTravelClimbUp     checkDobjProp = &checkDobjPushTravelClimbUp     checkIobjProp = &checkIobjPushTravelClimbUp     actionDobjProp  = &actionDobjPushTravelClimbUp     actionIobjProp = &actionIobjPushTravelClimbUp     reportDobjProp = &reportDobjPushTravelClimbUp     reportIobjProp = &reportIobjPushTravelClimbUp
    viaMode = Up
    
    isPushTravelAction = true
;

PushTravelClimbDown:TIAction     baseActionClass = PushTravelClimbDown     verDobjProp = &verifyDobjPushTravelClimbDown     verIobjProp = &verifyIobjPushTravelClimbDown     remapDobjProp = &remapDobjPushTravelClimbDown     remapIobjProp = &remapIobjPushTravelClimbDown     preCondDobjProp = &preCondDobjPushTravelClimbDown     preCondIobjProp = &preCondIobjPushTravelClimbDown     checkDobjProp = &checkDobjPushTravelClimbDown     checkIobjProp = &checkIobjPushTravelClimbDown     actionDobjProp  = &actionDobjPushTravelClimbDown     actionIobjProp = &actionIobjPushTravelClimbDown     reportDobjProp = &reportDobjPushTravelClimbDown     reportIobjProp = &reportIobjPushTravelClimbDown
    viaMode = Down
    
    isPushTravelAction = true
;





TalkTo:TAction     baseActionClass = TalkTo     verDobjProp = &verifyDobjTalkTo     remapDobjProp = &remapDobjTalkTo     preCondDobjProp = &preCondDobjTalkTo     checkDobjProp = &checkDobjTalkTo     actionDobjProp  = &actionDobjTalkTo     reportDobjProp = &reportDobjTalkTo
    isConversational = true
;

class MiscConvAction: IAction
    execAction(cmd)
    {
        if((libGlobal.playerChar).currentInterlocutor == nil 
           || !Q.canTalkTo((libGlobal.playerChar), (libGlobal.playerChar).currentInterlocutor))
            sayNotTalking();
        else
        {           
            curObj = (libGlobal.playerChar).currentInterlocutor;
            (libGlobal.playerChar).currentInterlocutor.handleTopic(responseProp, 
                [topicObj]);
        }
            
    }
    curObj = nil
    
    getMessageParam(objName)
    {
        switch(objName)
        {
        case 'dobj':
             
            return curObj;
            
        case 'cobj':
             
            return curObj;

        default:
             
            return inherited(objName);
        }
    }
    
    responseProp = nil
    topicObj = nil
    
    isConversational = true
;

sayNotTalking()
{
    message('not talking', nil);
}


 





yesTopicObj: object familiar = true;

 
noTopicObj: object familiar = true;

SayYes: MiscConvAction
    baseActionClass = SayYes
    responseProp = &miscTopics
    topicObj = yesTopicObj
;

SayNo: MiscConvAction
    baseActionClass = SayNo
    responseProp = &miscTopics
    topicObj = noTopicObj
;

QueryVague: MiscConvAction
    baseActionClass = QueryVague
    execAction(cmd)
    {
        qType = cmd.verbProd.qtype;
         


        topicObj = new Topic(qType + '!');
        
        inherited(cmd);
    }
    
    qType = nil
    responseProp = &queryTopics
;

Goodbye: IAction
    baseActionClass = Goodbye
    
    execAction(cmd)
    {
        curObj = (libGlobal.playerChar).currentInterlocutor;
    
        if((libGlobal.playerChar).currentInterlocutor == nil ||
           !Q.canTalkTo((libGlobal.playerChar), (libGlobal.playerChar).currentInterlocutor))	
            sayNotTalking();
        else if(defined(endConvBye) &&
            (libGlobal.playerChar).currentInterlocutor.endConversation(endConvBye));
    }    
    
    curObj = nil   
    
    isConversational = true
;

Hello: IAction
    baseActionClass = Hello
    
    execAction(cmd)
    {
         
        buildScopeList();
        
         



        if((libGlobal.playerChar).currentInterlocutor == nil)
        {
             




            local greetList;
            
             



            local cls = (defined(Actor) ? Actor : nil);
            
            if(cls)                
                greetList = scopeList.subset(
                    { x: x.ofKind(cls) && x != (libGlobal.playerChar) });            
            else
                greetList = [];
            
            local greetCount = greetList.length;
            
                         
            if(greetCount == 0)
            {
                message('no one here', nil)
;
            }
             





            else
            {               
                foreach(local greeted in greetList)
                {
                    curObj = greeted;
                    greeted.sayHello();
                }
            }
        }
         



        else
        {            
            (libGlobal.playerChar).currentInterlocutor.sayHello();
        }
    }
    
    curObj = nil
    
    isConversational = true
;

TellTo:LiteralTAction     baseActionClass = TellTo     verDobjProp = &verifyDobjTellTo     remapDobjProp = &remapDobjTellTo     preCondDobjProp = &preCondDobjTellTo     checkDobjProp = &checkDobjTellTo     actionDobjProp  = &actionDobjTellTo     reportDobjProp = &reportDobjTellTo
    exec(cmd)
    {
         



        local str = cmd.dobj.name + ', ' + cmd.iobj.name;
        Parser.parse(str);
    }
    afterAction() {}
    
    isConversational = true
;


AskAbout:TopicTAction     baseActionClass = AskAbout     verDobjProp = &verifyDobjAskAbout     remapDobjProp = &remapDobjAskAbout     preCondDobjProp = &preCondDobjAskAbout     checkDobjProp = &checkDobjAskAbout     actionDobjProp  = &actionDobjAskAbout     reportDobjProp = &reportDobjAskAbout    
    isConversational = true
    unhides = IndirectObject
;

AskFor:TopicTAction     baseActionClass = AskFor     verDobjProp = &verifyDobjAskFor     remapDobjProp = &remapDobjAskFor     preCondDobjProp = &preCondDobjAskFor     checkDobjProp = &checkDobjAskFor     actionDobjProp  = &actionDobjAskFor     reportDobjProp = &reportDobjAskFor    
    isConversational = true
    unhides = IndirectObject
;

TellAbout:TopicTAction     baseActionClass = TellAbout     verDobjProp = &verifyDobjTellAbout     remapDobjProp = &remapDobjTellAbout     preCondDobjProp = &preCondDobjTellAbout     checkDobjProp = &checkDobjTellAbout     actionDobjProp  = &actionDobjTellAbout     reportDobjProp = &reportDobjTellAbout   
    isConversational = true
    unhides = IndirectObject
;

TalkAbout:TopicTAction     baseActionClass = TalkAbout     verDobjProp = &verifyDobjTalkAbout     remapDobjProp = &remapDobjTalkAbout     preCondDobjProp = &preCondDobjTalkAbout     checkDobjProp = &checkDobjTalkAbout     actionDobjProp  = &actionDobjTalkAbout     reportDobjProp = &reportDobjTalkAbout    
    isConversational = true
    unhides = IndirectObject
;

QueryAbout:TopicTAction     baseActionClass = QueryAbout     verDobjProp = &verifyDobjQueryAbout     remapDobjProp = &remapDobjQueryAbout     preCondDobjProp = &preCondDobjQueryAbout     checkDobjProp = &checkDobjQueryAbout     actionDobjProp  = &actionDobjQueryAbout     reportDobjProp = &reportDobjQueryAbout    
    execAction(cmd)
    {
        qType = cmd.verbProd.qtype;

        inherited(cmd);
    }
    qType = nil
    

    iqinfo = ((libGlobal.curCommand).verbProd.qtype)

    
    isConversational = true
    unhides = IndirectObject
;

SayTo:TopicTAction     baseActionClass = SayTo     verDobjProp = &verifyDobjSayTo     remapDobjProp = &remapDobjSayTo     preCondDobjProp = &preCondDobjSayTo     checkDobjProp = &checkDobjSayTo     actionDobjProp  = &actionDobjSayTo     reportDobjProp = &reportDobjSayTo    
    isConversational = true
;

GiveTo:TIAction     baseActionClass = GiveTo     verDobjProp = &verifyDobjGiveTo     verIobjProp = &verifyIobjGiveTo     remapDobjProp = &remapDobjGiveTo     remapIobjProp = &remapIobjGiveTo     preCondDobjProp = &preCondDobjGiveTo     preCondIobjProp = &preCondIobjGiveTo     checkDobjProp = &checkDobjGiveTo     checkIobjProp = &checkIobjGiveTo     actionDobjProp  = &actionDobjGiveTo     actionIobjProp = &actionIobjGiveTo     reportDobjProp = &reportDobjGiveTo     reportIobjProp = &reportIobjGiveTo     
     





    summaryReport = nil
    
     





    summaryProp = nil
    
     




    execGroup(cmd) 
    { 
        summaryReport = nil; 
        summaryProp = nil;
    }
;

ShowTo:TIAction     baseActionClass = ShowTo     verDobjProp = &verifyDobjShowTo     verIobjProp = &verifyIobjShowTo     remapDobjProp = &remapDobjShowTo     remapIobjProp = &remapIobjShowTo     preCondDobjProp = &preCondDobjShowTo     preCondIobjProp = &preCondIobjShowTo     checkDobjProp = &checkDobjShowTo     checkIobjProp = &checkIobjShowTo     actionDobjProp  = &actionDobjShowTo     actionIobjProp = &actionIobjShowTo     reportDobjProp = &reportDobjShowTo     reportIobjProp = &reportIobjShowTo   
    showReport = nil
    summaryProp = nil
    
     



    execGroup(cmd) 
    { 
        summaryReport = nil; 
        summaryProp = nil;
    }
    
    isConversational = true
;

ThinkAbout: TopicAction
    baseActionClass = ThinkAbout
    
    execAction(cmd)
    {
         



                 
        local interlocutor = (libGlobal.playerChar).currentInterlocutor;
        
        try
        {
            
            (libGlobal.playerChar).currentInterlocutor = nil;            
            
             
            if(libGlobal.thoughtManagerObj != nil)
                libGlobal.thoughtManagerObj.handleTopic(cmd.dobj.topicList);            
            
             
            else
            {
                 
                local tList = cmd.dobj.topicList;
                
                 



                if(tList.length > 1 && tList.indexWhich({t: t.newlyCreated == nil}))
                    tList = tList.subset({t: t.newlyCreated == nil});                
                
                 
                local top = tList[1];
                
                 
                if(top.propDefined(&thinkDesc))
                    top.displayAlt(&thinkDesc, &noThought);
                
                 
                else
                    say(noThought);
            }
        }
        finally
        {
             
            (libGlobal.playerChar).currentInterlocutor = interlocutor;
        }
    }
    
     
    noThought = buildMessage('no thought comes to mind', nil)
    
    againRepeatsParse = nil
    
    unhides = true
;

Think:IAction     baseActionClass = Think
    execAction(cmd)
    {
         



        if(ruleBook && ruleBook.follow() != null)
            return;
        
         
        sayDefaultThought();
    }    
    
    sayDefaultThought() { message('think', nil); }
    
     



    ruleBook = nil
;

class ImplicitConversationAction: TopicAction
    execAction(cmd)
    {
        if(cmd.iobj == nil && cmd.dobj != nil)
        {
            if(cmd.dobj.ofKind(ResolvedTopic))
                topics = cmd.dobj.topicList;
            else
                topics = cmd.dobj;
            
            curTopic = cmd.dobj;
        }
        else if (cmd.dobj == nil && cmd.iobj != nil)
        {
            if(cmd.iobj.ofKind(ResolvedTopic))
                topics = cmd.iobj.topicList;
            else
                topics = cmd.iobj;
            
            curTopic = cmd.iobj;
        }
        
        if((libGlobal.playerChar).currentInterlocutor == nil ||
           !Q.canTalkTo((libGlobal.playerChar), (libGlobal.playerChar).currentInterlocutor))	
            sayNotTalking();
        else
        {
            notePronounAntecedent((libGlobal.playerChar).currentInterlocutor);
            resolvePronouns();
            curObj = (libGlobal.playerChar).currentInterlocutor;
            (libGlobal.playerChar).currentInterlocutor.handleTopic(topicListProperty, 
                topics, defaultProperty);
        }
    }
    
     
    defaultProperty = &noResponseMsg
    
    
     




    
    resolvePronouns()
    {
        local actor = (libGlobal.playerChar).currentInterlocutor;
        for(local cur in topics, local i = 1;; ++i)
        {
            if(cur == Him && actor.isHim)
                topics[i] = actor;
            
            if(cur == Her && actor.isHer)
                topics[i] = actor;
            
            if(cur == It && actor.isIt)
                topics[i] = actor;
            
            if(cur == Them && actor.plural)
                topics[i] = actor;
        }
    }
    
    
    topicListProperty = nil
    topics = nil
    
    isConversational = true
    unhides = true    
;

        
AskAboutImplicit: ImplicitConversationAction
    baseActionClass = AskAboutImplicit
    topicListProperty = &askTopics
;

AskForImplicit: ImplicitConversationAction
    baseActionClass = AskForImplicit
    topicListProperty = &askForTopics
;

TellAboutImplicit: ImplicitConversationAction
    baseActionClass = TellAboutImplicit
    topicListProperty = &tellTopics
;

TalkAboutImplicit: ImplicitConversationAction
    baseActionClass = TalkAboutImplicit
    topicListProperty = &talkTopics
;

ShowToImplicit:TAction     baseActionClass = ShowToImplicit     verDobjProp = &verifyDobjShowToImplicit     remapDobjProp = &remapDobjShowToImplicit     preCondDobjProp = &preCondDobjShowToImplicit     checkDobjProp = &checkDobjShowToImplicit     actionDobjProp  = &actionDobjShowToImplicit     reportDobjProp = &reportDobjShowToImplicit
    showReport = nil
    
     





    summaryProp = nil
    
     



    execGroup(cmd) 
    { 
        summaryReport = nil; 
        summaryProp = nil;
    }
;

GiveToImplicit:TAction     baseActionClass = GiveToImplicit     verDobjProp = &verifyDobjGiveToImplicit     remapDobjProp = &remapDobjGiveToImplicit     preCondDobjProp = &preCondDobjGiveToImplicit     checkDobjProp = &checkDobjGiveToImplicit     actionDobjProp  = &actionDobjGiveToImplicit     reportDobjProp = &reportDobjGiveToImplicit
    showReport = nil
    
     





    summaryProp = nil
     



    execGroup(cmd) 
    { 
        summaryReport = nil; 
        summaryProp = nil;
    }
;
              

Query: ImplicitConversationAction
    baseActionClass = Query
    execAction(cmd)
    {
        qType = cmd.verbProd.qtype;

        inherited(cmd);
    }
    qType = nil
    topicListProperty = &queryTopics
    

    dqinfo = ((libGlobal.curCommand).verbProd.qtype)

;

SayAction: ImplicitConversationAction
    baseActionClass = SayAction
    topicListProperty = &sayTopics
    defaultProperty = &defaultSayResponse
;

 



SpecialAction:TAction     baseActionClass = SpecialAction     verDobjProp = &verifyDobjSpecialAction     remapDobjProp = &remapDobjSpecialAction     preCondDobjProp = &preCondDobjSpecialAction     checkDobjProp = &checkDobjSpecialAction     actionDobjProp  = &actionDobjSpecialAction     reportDobjProp = &reportDobjSpecialAction
    specialPhrase = nil
;


 





transient scriptStatus: object
     




    scriptFile = nil

     
    recordFile = nil

     
    noteWithoutScriptWarning = nil
;



 





property isWebTempFile;

 





class FileOpAction: SystemAction
     
    filePromptMsg = ''

     
    fileDisposition = 2

     
    fileTypeID = 2

     
    showCancelMsg = ""

     








    performFileOp(fname, ack, desc:?)
    {
         




    }

    execAction(cmd)
    {
         




        setUpFileOp(true);
    }

     
    setUpFileOp(ack)
    {
        local result;


         
        result = getInputFile(filePromptMsg, fileDisposition, fileTypeID, 0);

         
        switch(result[1])
        {
        case 0:
             
            if (result.length >= 3)
                performFileOp(result[2], ack, desc:result[3]);
            else
                performFileOp(result[2], ack);
            break;

        case 1:
             
            if (result.length() > 1)
                filePromptFailedMsg(result[2]);
            else
                filePromptFailed();
            break;

        case 2:
             
            showCancelMsg();
            break;
        }

        
    }

     
    includeInUndo = nil

     
    isRepeatable = nil
;

 



ScriptOn:FileOpAction     baseActionClass = ScriptOn
     
    filePromptMsg = (buildMessage('get scripting prompt', nil)
)
    
    fileTypeID = 2
    fileDisposition = 2

     
    showCancelMsg() { message('scripting canceled', nil); }

     



    setUpScripting(ack) { setUpFileOp(ack); }

     
    performFileOp(fname, ack)
    {
         
        local ok = nil, exc = nil;
        try
        {
            ok = aioSetLogFile(fname, 1);
        }
        catch (Exception e)
        {
            exc = e;
        }
        if (ok)
        {
             
            scriptStatus.scriptFile = fname;

             






            scriptStatus.noteWithoutScriptWarning = nil;

             
            if (ack)
            {
                if (fname.isWebTempFile)
                    htmlSay(scriptingOkayWebTemp);                  
                else
                    htmlSay(scriptingOkay);
                    
            }
        }
        else
        {
             
            scriptStatus.scriptFile = nil;

             
            if (ack)
            {
                if (exc != nil)
                    message('scripting failed exception', nil)
;
                    
                else
                    message('scripting failed', nil)
;
                   
            }
        }
    }
    




    scriptingOkayWebTemp = buildMessage('scripting okay web temp', nil)
    



    scriptingOkay = buildMessage('scripting okay', nil)
;

 




ScriptString:ScriptOn     baseActionClass = ScriptString
    execAction(cmd)
    {
         
        if (fname_ != nil)
        {
             
            performFileOp(fname_.getStringText(), true);
        }
        else
        {
             
            inherited();
        }
    }
;

 



ScriptOff:SystemAction     baseActionClass = ScriptOff
    execAction(cmd)
    {
         
        turnOffScripting(true);
    }

     
    turnOffScripting(ack)
    {
         
        if (scriptStatus.scriptFile == nil)
        {

            message('script off ignored', nil)
;

            return;
        }

         
        aioSetLogFile(nil, 1);

         
        scriptStatus.scriptFile = nil;

         
        if (ack)
            message('script off okay', nil);
           
    }

     
    includeInUndo = nil
;

 



Record:FileOpAction     baseActionClass = Record
     
    filePromptMsg = (buildMessage('get recording prompt', nil)
)
    
    fileTypeID = 5
    fileDisposition = 2

     
    showCancelMsg() { message('recording canceled', nil); }

     



    setUpRecording(ack) { setUpFileOp(ack); }

     
    performFileOp(fname, ack)
    {
         
        local ok = nil, exc = nil;
        try
        {
            ok = aioSetLogFile(fname, logFileType);
        }
        catch (Exception e)
        {
            exc = e;
        }
        if (ok)
        {
             
            scriptStatus.recordFile = fname;

             
            if (ack)



                 htmlSay(buildMessage('recording okay', nil)
);                
                
        }
        else
        {
             
            scriptStatus.recordFile = nil;

             
            if (ack)
            {
                if (exc != nil)
                    message('recording failed exception', nil)
;
                    
                else
                    message('recording failed', nil)
;
            }
        }
    }

     
    logFileType = 2
;

 
RecordEvents:Record     baseActionClass = RecordEvents
    logFileType = 3
;

 
RecordString:Record     baseActionClass = RecordString
    execAction(cmd)
    {
         
        performFileOp(fname_.getStringText(), true);
    }
;

 
RecordEventsString:RecordString     baseActionClass = RecordEventsString
    logFileType = 3
;

 



RecordOff:SystemAction     baseActionClass = RecordOff
    execAction(cmd)
    {
         
        turnOffRecording(true);
    }

     
    turnOffRecording(ack)
    {
         
        if (scriptStatus.recordFile == nil)
        {
            message('record off ignored', nil)
;
           
            return;
        }

         
        aioSetLogFile(nil, 2);

         
        scriptStatus.recordFile = nil;

         
        if (ack)
            message('record off okay', nil);
    }

     
    includeInUndo = nil
;

 


Replay:FileOpAction     baseActionClass = Replay
     
    filePromptMsg = (buildMessage('get replay prompt', nil)
)
    
    fileTypeID = 5
    fileDisposition = 1

     
    showCancelMsg() { message('replay canceled', nil); }

     
    scriptOptionFlags = 0

     
    performFileOp(fname, ack)
    {
         




        if (ack)
            inputScriptOkay(
                fname.ofKind(TemporaryFile) ? fname.getFilename() : fname);

         
        local ok = nil, exc = nil;
        try
        {
            ok = setScriptFile(fname, scriptOptionFlags);
        }
        catch (Exception e)
        {
            exc = e;
        }
        if (!ok)
        {
            if (exc != nil)
                message('input script failed exception', nil)
;               
            else
                message('input script failed', nil)
;
              
        }
    }
    
     
    inputScriptOkay(fname)
    {
        message('input script okay', nil)
;
    }

    
;

 
ReplayString:Replay     baseActionClass = ReplayString
    execAction(cmd)
    {
         



        if (fname_ != nil)
        {
             
            performFileOp(fname_.getStringText(), true);
        }
        else
        {
             
            inherited();
        }
    }
;


 
 



Save:FileOpAction     baseActionClass = Save
     
    filePromptMsg = (buildMessage('get save prompt', nil))

     
    fileDisposition = 2
    fileTypeID = 15

     
    showCancelMsg() { message('save cancelled', nil); }
    
     
    performFileOp(fname, ack, desc:?)
    {
         
        PreSaveObject.classExec();
        
         



        try
        {
             
            saveGame(fname, gameMain.getSaveDesc(desc));
        }
        catch (StorageServerError sse)
        {
                        

            message('save failed on server', nil)
;

             
            return;
        }
        catch (RuntimeError err)
        {
             

            message('save failed', nil)
;            
            
             
            return;
        }
        
         
        message('save okay', nil);
        
    }

     






    includeInUndo = nil

     




    isRepeatable = nil
;

 





SaveString:Save     baseActionClass = SaveString
    execAction(cmd)
    {
         



        performFileOp(fname_.getStringText(), true);
    }
;

Restore:SystemAction     baseActionClass = Restore
    execAction(cmd)
    {
         
        askAndRestore();

         



        throw new TerminateCommandException();
    }

     






    askAndRestore()
    {
        local succ;        
        local result;


         
        succ = nil;

         
        result = getInputFile(buildMessage('get restore prompt', nil), 
                              1, 15, 0);

         
        switch(result[1])
        {
        case 0:
             



            if (performRestore(result[2], 2))
            {
                 
                succ = true;
            }
           
             
            break;

        case 1:
             
            if (result.length() > 1)
                filePromptFailedMsg(result[2]);
            else
                filePromptFailed();
            break;

        case 2:
             
            message('restore canceled', nil);            
            break;
        }

         






        if (succ)
            Again.clearForAgain();

         
        return succ;
    }

     












    startupRestore(fname)
    {
         



        if (performRestore(fname, 1))
        {
             
            return true;
        }
        else
        {
             



            try
            {
                 
                failedRestoreOptions();

                 
                return true;
            }
            catch (QuittingException qe)
            {
                 
                return nil;
            }
        }
    }
    

     




    performRestore(fname, code)
    {
        try
        {
             
            restoreGame(fname);
        }
        catch (StorageServerError sse)
        {
             

            message('restore failed on server', nil)
;            

             
            return nil;
        }
        catch (RuntimeError err)
        {
             
            switch(err.errno_)
            {
            case 1201:
                 
                message('restore invalid file', nil)
;                
                break;
                
            case 1202:
                 

                message('restore invalid match', nil)
;               
                break;
                
            case 1207:
                 



                message('restore corrupted file', nil)
;                
                break;
                
            default:
                 
                message('restore failed', nil)
;                
                break;
            }

             
            return nil;
        }

         
        message('restore okay', nil);
               
         
        PostRestoreObject.restoreCode = code;

         
        PostRestoreObject.classExec();

         



        "\\b";
        libGlobal.playerChar.outermostVisibleParent().lookAroundWithin();

         
        return true;
    }
    
     






    includeInUndo = nil
    
     
    filePromptFailed()
    {

        message('file prompt failed', nil)
;
    }

     
    filePromptFailedMsg(msg)
    {
        message('file prompt failed msg', nil)
;
    }
;

 





RestoreString:Restore     baseActionClass = RestoreString
    execAction(cmd)
    {
         




        performRestore(fname_.getStringText(), 2);

         
        throw new TerminateCommandException();
    }
;


Again:SystemAction     baseActionClass = Again
    
    exec(cmd)
    {
        if((gameMain.againRepeatsParse && libGlobal.lastCommandForAgain is in
           ('',nil)) || (!gameMain.againRepeatsParse && libGlobal.lastCommand is
           in ('', nil)))
        {
            message('no repeat', nil);
        }
        else if (gameMain.againRepeatsParse)
        {
            Parser.parse(libGlobal.lastCommandForAgain);
        }
        else
        {
            libGlobal.lastCommand.exec();
        }
    }
    
    clearForAgain()
    {
        libGlobal.lastAction = nil;
        libGlobal.lastCommand = nil;
    }
    
    againRepeatsParse = nil 
    
;

 

DoNothing:TIAction     baseActionClass = DoNothing     verDobjProp = &verifyDobjDoNothing     verIobjProp = &verifyIobjDoNothing     remapDobjProp = &remapDobjDoNothing     remapIobjProp = &remapIobjDoNothing     preCondDobjProp = &preCondDobjDoNothing     preCondIobjProp = &preCondIobjDoNothing     checkDobjProp = &checkDobjDoNothing     checkIobjProp = &checkIobjDoNothing     actionDobjProp  = &actionDobjDoNothing     actionIobjProp = &actionIobjDoNothing     reportDobjProp = &reportDobjDoNothing     reportIobjProp = &reportIobjDoNothing
    curDobj = (libGlobal.playerChar)
    curIobj = (libGlobal.playerChar).location
    curObj = curDobj
    grammarTemplates = ['do nothing']
;

