

 










 
 



class DebugAction:IAction     baseActionClass = DebugAction
    execAction()
    {
         
        if (t3DebugTrace(1))
            t3DebugTrace(2);
        else
            "Debugger not present. ";
    }
;

 
 




class NoteDarknessAction:IAction     baseActionClass = NoteDarknessAction
    execAction()
    {
         




        if ((libGlobal.curActor).isLocationLit())
        {
             
            (libGlobal.curActor).lookAround(true);
        }
        else
        {
             
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&newlyDarkMsg)));
        }
    }

     
    actionTime = 0

     
    isRepeatable = nil

     
    includeInUndo = nil
;

 
 


class AgainAction:IAction     baseActionClass = AgainAction
     
    isRepeatable = nil

     



    includeInUndo = nil

     
    lastIssuingActor = nil
    lastTargetActor = nil
    lastTargetActorPhrase = nil
    lastAction = nil

     
    saveForAgain(issuingActor, targetActor, targetActorPhrase, action)
    {
         
        lastIssuingActor = issuingActor;
        lastTargetActor = targetActor;
        lastTargetActorPhrase = targetActorPhrase;
        lastAction = action.createClone();
    }

     
    clearForAgain() { lastAction = nil; }

     







    doAction(issuingActor, targetActor, targetActorPhrase,
             countsAsIssuerTurn)
    {
         
        if (lastAction == nil)
        {
            (libGlobal.libMessageObj).noCommandForAgain();
            return;
        }

         



        if (!targetActor.isPlayerChar)
        {
            (libGlobal.libMessageObj).againCannotChangeActor();
            return;
        }

         



        if (lastIssuingActor != lastTargetActor
            && !lastIssuingActor.canTalkTo(lastTargetActor))
        {
             
            (libGlobal.libMessageObj).againCannotTalkToTarget(
                lastIssuingActor, lastTargetActor);
            return;
        }

         







        if (lastTargetActor != lastIssuingActor)
            countsAsIssuerTurn = true;

         
        lastAction.resetAction();
        
         
        lastAction.repeatAction(lastTargetActor, lastTargetActorPhrase,
                                lastIssuingActor, countsAsIssuerTurn);

         





        if (lastTargetActor != lastIssuingActor)
            lastIssuingActor.waitForIssuedCommand(lastTargetActor);
    }

     



    actionTime = 0
;

 
 






class PreSaveObject: ModuleExecObject
     



;

 



class PostRestoreObject: ModuleExecObject
     




     
















    restoreCode = nil
;

 




class PreRestartObject: ModuleExecObject
     



;

 



class PostUndoObject: ModuleExecObject
     



;

 
 



class SaveAction:FileOpAction     baseActionClass = SaveAction
     
    filePromptMsg = ((libGlobal.libMessageObj).getSavePrompt())

     
    fileDisposition = 2
    fileTypeID = 15

     
    showCancelMsg() { (libGlobal.libMessageObj).saveCanceled(); }
    
     
    performFileOp(fname, ack, desc:?)
    {
         
        PreSaveObject.classExec();
        
         



        try
        {
             
            saveGame(fname, gameMain.getSaveDesc(desc));
        }
        catch (StorageServerError sse)
        {
             
            (libGlobal.libMessageObj).saveFailedOnServer(sse);

             
            return;
        }
        catch (RuntimeError err)
        {
             
            (libGlobal.libMessageObj).saveFailed(err);
            
             
            return;
        }
        
         
        (libGlobal.libMessageObj).saveOkay();
    }

     






    includeInUndo = nil

     




    isRepeatable = nil
;

 





class SaveStringAction:SaveAction     baseActionClass = SaveStringAction
    execSystemAction()
    {
         



        performFileOp(fname_.getStringText(), true);
    }
;


 
 



class RestoreAction:SystemAction     baseActionClass = RestoreAction
    execSystemAction()
    {
         
        askAndRestore();

         



        throw new TerminateCommandException();
    }

     






    askAndRestore()
    {
        local succ;        
        local result;
        local origElapsedTime;

         
        succ = nil;

         
        origElapsedTime = realTimeManager.getElapsedTime();

         
        result = getInputFile((libGlobal.libMessageObj).getRestorePrompt(), 1,
                              15, 0);

         



        realTimeManager.setElapsedTime(origElapsedTime);

         
        switch(result[1])
        {
        case 0:
             



            if (performRestore(result[2], 2))
            {
                 
                succ = true;
            }
            else
            {
                 




                realTimeManager.setElapsedTime(origElapsedTime);
            }

             
            break;

        case 1:
             
            if (result.length() > 1)
                (libGlobal.libMessageObj).filePromptFailedMsg(result[2]);
            else
                (libGlobal.libMessageObj).filePromptFailed();
            break;

        case 2:
             
            (libGlobal.libMessageObj).restoreCanceled();
            break;
        }

         






        if (succ)
            AgainAction.clearForAgain();

         
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
             
            (libGlobal.libMessageObj).restoreFailedOnServer(sse);

             
            return nil;
        }
        catch (RuntimeError err)
        {
             
            switch(err.errno_)
            {
            case 1201:
                 
                (libGlobal.libMessageObj).restoreInvalidFile();
                break;
                
            case 1202:
                 
                (libGlobal.libMessageObj).restoreInvalidMatch();
                break;
                
            case 1207:
                 
                (libGlobal.libMessageObj).restoreCorruptedFile();
                break;
                
            default:
                 
                (libGlobal.libMessageObj).restoreFailed(err);
                break;
            }

             
            return nil;
        }

         
        (libGlobal.libMessageObj).restoreOkay();
        
         
        PostRestoreObject.restoreCode = code;

         
        PostRestoreObject.classExec();

         



        "\b";
        libGlobal.playerChar.lookAround(true);

         
        return true;
    }
    
     






    includeInUndo = nil
;

 





class RestoreStringAction:RestoreAction     baseActionClass = RestoreStringAction
    execSystemAction()
    {
         




        performRestore(fname_.getStringText(), 2);

         
        throw new TerminateCommandException();
    }
;

 
 


class RestartAction:SystemAction     baseActionClass = RestartAction
    execSystemAction()
    {
         
        (libGlobal.libMessageObj).confirmRestart();
        if (yesOrNo())
        {
             






             
            doRestartGame();
        }
        else
        {
             
            (libGlobal.libMessageObj).notRestarting();
        }
    }

     
    doRestartGame()
    {
         






        commandSequencer.setCommandMode();
        "<.commandsep>";

         
        PreRestartObject.classExec();

         



















        throw new RestartSignal();
    }

     
    includeInUndo = nil
;

 
 


class UndoAction:SystemAction     baseActionClass = UndoAction
     







    doAction(issuingActor, targetActor, targetActorPhrase,
             countsAsIssuerTurn)
    {
         



        undoTip.makeShown();

         



        if (!targetActor.isPlayerChar)
        {
             



            (libGlobal.libMessageObj).systemActionToNPC();
            return;
        }

         
        performUndo(true);
    }

     






    performUndo(asCommand)
    {
         
        if (undo())
        {
            local oldActor;
            local oldIssuer;
            local oldAction;

             
            PostUndoObject.classExec();

             
            oldActor = (libGlobal.curActor);
            oldIssuer = (libGlobal.curIssuingActor);
            oldAction = (libGlobal.curAction);

             
            (libGlobal.curActor) = (libGlobal.playerChar);
            (libGlobal.curIssuingActor) = (libGlobal.playerChar);
            (libGlobal.curAction) = self;

             
            try
            {
                 
                (libGlobal.libMessageObj).undoOkay(libGlobal.lastActorForUndo,
                                      libGlobal.lastCommandForUndo);
                
                 
                libGlobal.playerChar.lookAround(true);
            }
            finally
            {
                 
                (libGlobal.curActor) = oldActor;
                (libGlobal.curIssuingActor) = oldIssuer;
                (libGlobal.curAction) = oldAction;
            }
                
             



            if (asCommand)
                AgainAction.saveForAgain((libGlobal.playerChar), (libGlobal.playerChar), nil, self);

             
            return true;
        }
        else
        {
             
            (libGlobal.libMessageObj).undoFailed();

             
            return nil;
        }
    }

     



    includeInUndo = nil
;

 
 


class SaveDefaultsAction:SystemAction     baseActionClass = SaveDefaultsAction
    execSystemAction()
    {
         
        settingsUI.saveSettingsMsg();
    }

     
    includeInUndo = nil
;

 


class RestoreDefaultsAction:SystemAction     baseActionClass = RestoreDefaultsAction
    execSystemAction()
    {
         




        settingsUI.restoreSettingsMsg();
    }

     
    includeInUndo = nil
;


 
 


class QuitAction:SystemAction     baseActionClass = QuitAction
    execSystemAction()
    {
         
        (libGlobal.libMessageObj).confirmQuit();
        if (yesOrNo())
        {
             
            terminateGame();
        }
        else
        {
             
            (libGlobal.libMessageObj).notTerminating();
        }
    }

     




    terminateGame()
    {
         
        (libGlobal.libMessageObj).okayQuitting();
            
         
        throw new QuittingException;
    }

     
    includeInUndo = nil
;

 




class PauseAction:SystemAction     baseActionClass = PauseAction
    execSystemAction()
    {
        local elapsed;
        
         



        elapsed = realTimeManager.getElapsedTime();

         
    waitLoop:
        for (;;)
        {
             




            switch(inputManager.getKey(nil, {: (libGlobal.libMessageObj).pausePrompt() }))
            {
            case ' ':
                 
                break waitLoop;

            case 's':
            case 'S':
                 
                (libGlobal.libMessageObj).pauseSaving();
                
                 




                realTimeManager.setElapsedTime(elapsed);

                 
                SaveAction.execSystemAction();

                 
                "<.p>";
                (libGlobal.libMessageObj).pausePrompt();

                 
                break;
                
            case '[eof]':
                 
                "\b";
                throw new EndOfFileException();

            default:
                 
                break;
            }
        }

         
        (libGlobal.libMessageObj).pauseEnded();

         





        realTimeManager.setElapsedTime(elapsed);
    }
;

 


class VerboseAction:SystemAction     baseActionClass = VerboseAction
    execSystemAction()
    {
         
        gameMain.verboseMode.isOn = true;

         
        (libGlobal.libMessageObj).acknowledgeVerboseMode(true);
    }
;

 


class TerseAction:SystemAction     baseActionClass = TerseAction
    execSystemAction()
    {
         
        gameMain.verboseMode.isOn = nil;

         
        (libGlobal.libMessageObj).acknowledgeVerboseMode(nil);
    }
;

 
property showScore;
property showFullScore;
property scoreNotify;

 


class ScoreAction:SystemAction     baseActionClass = ScoreAction
    execSystemAction()
    {
         
        if (libGlobal.scoreObj != nil)
        {
             
            libGlobal.scoreObj.showScore();

             



            if (!mentionedFullScore)
            {
                 
                (libGlobal.libMessageObj).mentionFullScore;

                 
                ScoreAction.mentionedFullScore = true;
            }
        }
        else
            (libGlobal.libMessageObj).scoreNotPresent;
    }

     
    includeInUndo = nil

     
    mentionedFullScore = nil
;

 


class FullScoreAction:SystemAction     baseActionClass = FullScoreAction
    execSystemAction()
    {
         
        showFullScore();

         
        ScoreAction.mentionedFullScore = true;
    }

     
    showFullScore()
    {
         
        if (libGlobal.scoreObj != nil)
            libGlobal.scoreObj.showFullScore();
        else
            (libGlobal.libMessageObj).scoreNotPresent;
    }

     
    includeInUndo = nil
;

 


class NotifyAction:SystemAction     baseActionClass = NotifyAction
    execSystemAction()
    {
         
        if (libGlobal.scoreObj != nil)
            (libGlobal.libMessageObj).showNotifyStatus(
                libGlobal.scoreObj.scoreNotify.isOn);
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }
;

 


class NotifyOnAction:SystemAction     baseActionClass = NotifyOnAction
    execSystemAction()
    {
         
        if (libGlobal.scoreObj != nil)
        {
            libGlobal.scoreObj.scoreNotify.isOn = true;
            (libGlobal.libMessageObj).acknowledgeNotifyStatus(true);
        }
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }
;

 


class NotifyOffAction:SystemAction     baseActionClass = NotifyOffAction
    execSystemAction()
    {
         
        if (libGlobal.scoreObj != nil)
        {
            libGlobal.scoreObj.scoreNotify.isOn = nil;
            (libGlobal.libMessageObj).acknowledgeNotifyStatus(nil);
        }
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }
;

 



class VersionAction:SystemAction     baseActionClass = VersionAction
    execSystemAction()
    {
         
        foreach (local cur in ModuleID.getModuleList())
            cur.showVersion();
    }

     
    includeInUndo = nil
;

 



class CreditsAction:SystemAction     baseActionClass = CreditsAction
    execSystemAction()
    {
         
        foreach (local cur in ModuleID.getModuleList())
            cur.showCredit();
    }

     
    includeInUndo = nil
;

 


class AboutAction:SystemAction     baseActionClass = AboutAction
    execSystemAction()
    {
        local anyOutput;
        
         
        anyOutput = outputManager.curOutputStream
                    .watchForOutput(function()
        {
             
            foreach (local cur in ModuleID.getModuleList())
                cur.showAbout();
        });

         



        if (!anyOutput)
            (libGlobal.libMessageObj).noAboutInfo;
    }

     
    includeInUndo = nil
;

 





transient scriptStatus: object
     




    scriptFile = nil

     
    recordFile = nil

     
    noteWithoutScriptWarning = nil
;

 





property isWebTempFile;

 





class FileOpAction:SystemAction     baseActionClass = FileOpAction
     
    filePromptMsg = ''

     
    fileDisposition = 2

     
    fileTypeID = 2

     
    showCancelMsg = ""

     








    performFileOp(fname, ack, desc:?)
    {
         




    }

    execSystemAction()
    {
         




        setUpFileOp(true);
    }

     
    setUpFileOp(ack)
    {
        local result;
        local origElapsedTime;

         
        origElapsedTime = realTimeManager.getElapsedTime();

         
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
                (libGlobal.libMessageObj).filePromptFailedMsg(result[2]);
            else
                (libGlobal.libMessageObj).filePromptFailed();
            break;

        case 2:
             
            showCancelMsg();
            break;
        }

         




        realTimeManager.setElapsedTime(origElapsedTime);
    }

     
    includeInUndo = nil

     
    isRepeatable = nil
;

 



class ScriptAction:FileOpAction     baseActionClass = ScriptAction
     
    filePromptMsg = ((libGlobal.libMessageObj).getScriptingPrompt())
    fileTypeID = 2
    fileDisposition = 2

     
    showCancelMsg() { (libGlobal.libMessageObj).scriptingCanceled(); }

     



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
                    (libGlobal.libMessageObj).scriptingOkayWebTemp();
                else
                    (libGlobal.libMessageObj).scriptingOkay();
            }
        }
        else
        {
             
            scriptStatus.scriptFile = nil;

             
            if (ack)
            {
                if (exc != nil)
                    (libGlobal.libMessageObj).scriptingFailedException(exc);
                else
                    (libGlobal.libMessageObj).scriptingFailed;
            }
        }
    }
;

 




class ScriptStringAction:ScriptAction     baseActionClass = ScriptStringAction
    execSystemAction()
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

 



class ScriptOffAction:SystemAction     baseActionClass = ScriptOffAction
    execSystemAction()
    {
         
        turnOffScripting(true);
    }

     
    turnOffScripting(ack)
    {
         
        if (scriptStatus.scriptFile == nil)
        {
            (libGlobal.libMessageObj).scriptOffIgnored();
            return;
        }

         
        aioSetLogFile(nil, 1);

         
        scriptStatus.scriptFile = nil;

         
        if (ack)
            (libGlobal.libMessageObj).scriptOffOkay();
    }

     
    includeInUndo = nil
;

 



class RecordAction:FileOpAction     baseActionClass = RecordAction
     
    filePromptMsg = ((libGlobal.libMessageObj).getRecordingPrompt())
    fileTypeID = 5
    fileDisposition = 2

     
    showCancelMsg() { (libGlobal.libMessageObj).recordingCanceled(); }

     



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
                (libGlobal.libMessageObj).recordingOkay();
        }
        else
        {
             
            scriptStatus.recordFile = nil;

             
            if (ack)
            {
                if (exc != nil)
                    (libGlobal.libMessageObj).recordingFailedException(exc);
                else
                    (libGlobal.libMessageObj).recordingFailed();
            }
        }
    }

     
    logFileType = 2
;

 
class RecordEventsAction:RecordAction     baseActionClass = RecordEventsAction
    logFileType = 3
;

 
class RecordStringAction:RecordAction     baseActionClass = RecordStringAction
    execSystemAction()
    {
         
        performFileOp(fname_.getStringText(), true);
    }
;

 
class RecordEventsStringAction:RecordStringAction     baseActionClass = RecordEventsStringAction
    logFileType = 3
;

 



class RecordOffAction:SystemAction     baseActionClass = RecordOffAction
    execSystemAction()
    {
         
        turnOffRecording(true);
    }

     
    turnOffRecording(ack)
    {
         
        if (scriptStatus.recordFile == nil)
        {
            (libGlobal.libMessageObj).recordOffIgnored();
            return;
        }

         
        aioSetLogFile(nil, 2);

         
        scriptStatus.recordFile = nil;

         
        if (ack)
            (libGlobal.libMessageObj).recordOffOkay();
    }

     
    includeInUndo = nil
;

 


class ReplayAction:FileOpAction     baseActionClass = ReplayAction
     
    filePromptMsg = ((libGlobal.libMessageObj).getReplayPrompt())
    fileTypeID = 5
    fileDisposition = 1

     
    showCancelMsg() { (libGlobal.libMessageObj).replayCanceled(); }

     
    scriptOptionFlags = 0

     
    performFileOp(fname, ack)
    {
         




        if (ack)
            (libGlobal.libMessageObj).inputScriptOkay(
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
                (libGlobal.libMessageObj).inputScriptFailed(exc);
            else
                (libGlobal.libMessageObj).inputScriptFailed();
        }
    }
;

 
class ReplayStringAction:ReplayAction     baseActionClass = ReplayStringAction
    execSystemAction()
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


 
property showFootnote;

 



class FootnoteAction:SystemAction     baseActionClass = FootnoteAction
    execSystemAction()
    {
         
        if (libGlobal.footnoteClass != nil)
            libGlobal.footnoteClass.showFootnote(numMatch.getval());
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }

     
    includeInUndo = nil
;

property footnoteSettings;

 
class FootnotesAction:SystemAction     baseActionClass = FootnotesAction
    execSystemAction()
    {
        if (libGlobal.footnoteClass != nil)
        {
             
            libGlobal.footnoteClass.footnoteSettings.showFootnotes =
                showFootnotes;

             
            (libGlobal.libMessageObj).acknowledgeFootnoteStatus(showFootnotes);
        }
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }

     



    showFootnotes = nil
;

class FootnotesFullAction:FootnotesAction     baseActionClass = FootnotesFullAction
    showFootnotes = FootnotesFull
;

class FootnotesMediumAction:FootnotesAction     baseActionClass = FootnotesMediumAction
    showFootnotes = FootnotesMedium
;

class FootnotesOffAction:FootnotesAction     baseActionClass = FootnotesOffAction
    showFootnotes = FootnotesOff
;

class FootnotesStatusAction:SystemAction     baseActionClass = FootnotesStatusAction
    execSystemAction()
    {
         
        if (libGlobal.footnoteClass != nil)
            (libGlobal.libMessageObj).showFootnoteStatus(libGlobal.footnoteClass.
                                            footnoteSettings.showFootnotes);
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }

     
    includeInUndo = nil
;

class InventoryAction:IAction     baseActionClass = InventoryAction
    execAction()
    {
         
        (libGlobal.curActor).showInventory(inventoryMode == InventoryTall);
    }

     
    inventoryMode = InventoryWide;
;

class InventoryTallAction:IAction     baseActionClass = InventoryTallAction
    execAction()
    {
         
        InventoryAction.inventoryMode = InventoryTall;

         
        InventoryAction.checkAction();
        InventoryAction.execAction();
    }
;

class InventoryWideAction:IAction     baseActionClass = InventoryWideAction
    execAction()
    {
         
        InventoryAction.inventoryMode = InventoryWide;

         
        InventoryAction.checkAction();
        InventoryAction.execAction();
    }
;

class WaitAction:IAction     baseActionClass = WaitAction
    execAction()
    {
         
        ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(&timePassesMsg)));
    }
;

class LookAction:IAction     baseActionClass = LookAction
    execAction()
    {
         
        (libGlobal.curActor).lookAround(true);
    }
;

class SleepAction:IAction     baseActionClass = SleepAction
    execAction()
    {
         
        (libGlobal.curActor).goToSleep();
    }
;

class TakeAction:TAction     baseActionClass = TakeAction     verDobjProp = &verifyDobjTake     remapDobjProp = &remapDobjTake     preCondDobjProp = &preCondDobjTake     checkDobjProp = &checkDobjTake     actionDobjProp  = &actionDobjTake
     
    actionAllowsAll = true

     
    getAllDobj(actor, scopeList)
    {
        local locList;
        local dropLoc;
        local actorLoc;
        
         












        actorLoc = actor.location;
        dropLoc = actor.getDropDestination(nil, nil);

         



        locList = new Vector(10);
        locList.append(dropLoc);

         
        for (local cur = actorLoc ; cur != nil && cur != dropLoc ;
             cur = cur.location)
        {
             
            locList.append(cur);
        }

         




        return scopeList.subset(
            {x: (locList.indexWhich(
                {loc: x.isDirectlyIn(loc) || x.isInFixedIn(loc)}) != nil
                 && !actor.isIn(x)) });
    }
;

class TakeFromAction:TIAction     baseActionClass = TakeFromAction     verDobjProp = &verifyDobjTakeFrom     verIobjProp = &verifyIobjTakeFrom     remapDobjProp = &remapDobjTakeFrom     remapIobjProp = &remapIobjTakeFrom     preCondDobjProp = &preCondDobjTakeFrom     preCondIobjProp = &preCondIobjTakeFrom     checkDobjProp = &checkDobjTakeFrom     checkIobjProp = &checkIobjTakeFrom     actionDobjProp  = &actionDobjTakeFrom     actionIobjProp = &actionIobjTakeFrom
     
    actionAllowsAll = true

     
    getAllDobj(actor, scopeList)
    {
         
        return getIobj() == nil
            ? []
            : getIobj().getAllForTakeFrom(scopeList);
    }
;

class RemoveAction:TAction     baseActionClass = RemoveAction     verDobjProp = &verifyDobjRemove     remapDobjProp = &remapDobjRemove     preCondDobjProp = &preCondDobjRemove     checkDobjProp = &checkDobjRemove     actionDobjProp  = &actionDobjRemove
;

class DropAction:TAction     baseActionClass = DropAction     verDobjProp = &verifyDobjDrop     remapDobjProp = &remapDobjDrop     preCondDobjProp = &preCondDobjDrop     checkDobjProp = &checkDobjDrop     actionDobjProp  = &actionDobjDrop
     
    actionAllowsAll = true

     
    getAllDobj(actor, scopeList)
    {
         
        return scopeList.subset({x: x.isDirectlyIn(actor)});
    }
;

class ExamineAction:TAction     baseActionClass = ExamineAction     verDobjProp = &verifyDobjExamine     remapDobjProp = &remapDobjExamine     preCondDobjProp = &preCondDobjExamine     checkDobjProp = &checkDobjExamine     actionDobjProp  = &actionDobjExamine
;

class ReadAction:TAction     baseActionClass = ReadAction     verDobjProp = &verifyDobjRead     remapDobjProp = &remapDobjRead     preCondDobjProp = &preCondDobjRead     checkDobjProp = &checkDobjRead     actionDobjProp  = &actionDobjRead
;

class LookInAction:TAction     baseActionClass = LookInAction     verDobjProp = &verifyDobjLookIn     remapDobjProp = &remapDobjLookIn     preCondDobjProp = &preCondDobjLookIn     checkDobjProp = &checkDobjLookIn     actionDobjProp  = &actionDobjLookIn
;

class SearchAction:TAction     baseActionClass = SearchAction     verDobjProp = &verifyDobjSearch     remapDobjProp = &remapDobjSearch     preCondDobjProp = &preCondDobjSearch     checkDobjProp = &checkDobjSearch     actionDobjProp  = &actionDobjSearch
;

class LookUnderAction:TAction     baseActionClass = LookUnderAction     verDobjProp = &verifyDobjLookUnder     remapDobjProp = &remapDobjLookUnder     preCondDobjProp = &preCondDobjLookUnder     checkDobjProp = &checkDobjLookUnder     actionDobjProp  = &actionDobjLookUnder
;

class LookBehindAction:TAction     baseActionClass = LookBehindAction     verDobjProp = &verifyDobjLookBehind     remapDobjProp = &remapDobjLookBehind     preCondDobjProp = &preCondDobjLookBehind     checkDobjProp = &checkDobjLookBehind     actionDobjProp  = &actionDobjLookBehind
;

class LookThroughAction:TAction     baseActionClass = LookThroughAction     verDobjProp = &verifyDobjLookThrough     remapDobjProp = &remapDobjLookThrough     preCondDobjProp = &preCondDobjLookThrough     checkDobjProp = &checkDobjLookThrough     actionDobjProp  = &actionDobjLookThrough
;

class FeelAction:TAction     baseActionClass = FeelAction     verDobjProp = &verifyDobjFeel     remapDobjProp = &remapDobjFeel     preCondDobjProp = &preCondDobjFeel     checkDobjProp = &checkDobjFeel     actionDobjProp  = &actionDobjFeel
;

class TasteAction:TAction     baseActionClass = TasteAction     verDobjProp = &verifyDobjTaste     remapDobjProp = &remapDobjTaste     preCondDobjProp = &preCondDobjTaste     checkDobjProp = &checkDobjTaste     actionDobjProp  = &actionDobjTaste
;

class SmellAction:TAction     baseActionClass = SmellAction     verDobjProp = &verifyDobjSmell     remapDobjProp = &remapDobjSmell     preCondDobjProp = &preCondDobjSmell     checkDobjProp = &checkDobjSmell     actionDobjProp  = &actionDobjSmell
;

class ListenToAction:TAction     baseActionClass = ListenToAction     verDobjProp = &verifyDobjListenTo     remapDobjProp = &remapDobjListenTo     preCondDobjProp = &preCondDobjListenTo     checkDobjProp = &checkDobjListenTo     actionDobjProp  = &actionDobjListenTo
;

 




class SenseImplicitAction:IAction     baseActionClass = SenseImplicitAction
     
    mySense = nil

     
    descProp = nil
    
     
    defaultMsgProp = nil

     
    resultLister = nil

     
    execAction()
    {
        local senseTab;
        local presenceList;
            
         
        senseTab = (libGlobal.curActor).senseInfoTable(mySense);

         
        presenceList = senseInfoTableSubset(senseTab,
            {obj, info: obj.(mySense.presenceProp)});

         



        if (presenceList.length() != 0)
        {
             
            resultLister.showList((libGlobal.curActor), nil, presenceList, 0, 0,
                                  senseTab, nil);
        }
        else
        {
             
            ((mainOutputStream.curTranscript).addReport(new DefaultCommandReport(defaultMsgProp)));
        }
    }
;

class SmellImplicitAction:SenseImplicitAction     baseActionClass = SmellImplicitAction
    mySense = smell
    descProp = &smellDesc
    defaultMsgProp = &nothingToSmellMsg
    resultLister = smellActionLister
;

class ListenImplicitAction:SenseImplicitAction     baseActionClass = ListenImplicitAction
    mySense = sound
    descProp = &soundDesc
    defaultMsgProp = &nothingToHearMsg
    resultLister = listenActionLister
;

class PutInAction:TIAction     baseActionClass = PutInAction     verDobjProp = &verifyDobjPutIn     verIobjProp = &verifyIobjPutIn     remapDobjProp = &remapDobjPutIn     remapIobjProp = &remapIobjPutIn     preCondDobjProp = &preCondDobjPutIn     preCondIobjProp = &preCondIobjPutIn     checkDobjProp = &checkDobjPutIn     checkIobjProp = &checkIobjPutIn     actionDobjProp  = &actionDobjPutIn     actionIobjProp = &actionIobjPutIn
     
    actionAllowsAll = true

     
    getAllDobj(actor, scopeList)
    {
        local loc;
        local iobj = nil;
        local iobjIdent = nil;

         
        loc = actor.location;

         
        if (iobjList_ != nil && iobjList_.length() > 0)
        {
            iobj = iobjList_[1].obj_;
            iobjIdent = iobj.getIdentityObject();
        }
        
         








        return scopeList.subset({x:
                                (x.isDirectlyIn(loc)
                                 || x.isInFixedIn(loc)
                                 || x.isDirectlyIn(actor))
                                && x != iobj
                                && x != iobjIdent
                                && !x.isDirectlyIn(iobj)});
    }
;

class PutOnAction:TIAction     baseActionClass = PutOnAction     verDobjProp = &verifyDobjPutOn     verIobjProp = &verifyIobjPutOn     remapDobjProp = &remapDobjPutOn     remapIobjProp = &remapIobjPutOn     preCondDobjProp = &preCondDobjPutOn     preCondIobjProp = &preCondIobjPutOn     checkDobjProp = &checkDobjPutOn     checkIobjProp = &checkIobjPutOn     actionDobjProp  = &actionDobjPutOn     actionIobjProp = &actionIobjPutOn
     
    actionAllowsAll = true

     
    getAllDobj(actor, scopeList)
    {
         
        local loc = actor.location;
        return scopeList.subset({x:
                                (x.isDirectlyIn(loc)
                                 || x.isInFixedIn(loc)
                                 || x.isDirectlyIn(actor))
                                && x != getIobj()
                                && !x.isDirectlyIn(getIobj())});
    }
;

class PutUnderAction:TIAction     baseActionClass = PutUnderAction     verDobjProp = &verifyDobjPutUnder     verIobjProp = &verifyIobjPutUnder     remapDobjProp = &remapDobjPutUnder     remapIobjProp = &remapIobjPutUnder     preCondDobjProp = &preCondDobjPutUnder     preCondIobjProp = &preCondIobjPutUnder     checkDobjProp = &checkDobjPutUnder     checkIobjProp = &checkIobjPutUnder     actionDobjProp  = &actionDobjPutUnder     actionIobjProp = &actionIobjPutUnder
;

class PutBehindAction:TIAction     baseActionClass = PutBehindAction     verDobjProp = &verifyDobjPutBehind     verIobjProp = &verifyIobjPutBehind     remapDobjProp = &remapDobjPutBehind     remapIobjProp = &remapIobjPutBehind     preCondDobjProp = &preCondDobjPutBehind     preCondIobjProp = &preCondIobjPutBehind     checkDobjProp = &checkDobjPutBehind     checkIobjProp = &checkIobjPutBehind     actionDobjProp  = &actionDobjPutBehind     actionIobjProp = &actionIobjPutBehind
;

class WearAction:TAction     baseActionClass = WearAction     verDobjProp = &verifyDobjWear     remapDobjProp = &remapDobjWear     preCondDobjProp = &preCondDobjWear     checkDobjProp = &checkDobjWear     actionDobjProp  = &actionDobjWear
;

class DoffAction:TAction     baseActionClass = DoffAction     verDobjProp = &verifyDobjDoff     remapDobjProp = &remapDobjDoff     preCondDobjProp = &preCondDobjDoff     checkDobjProp = &checkDobjDoff     actionDobjProp  = &actionDobjDoff
;

class AskForAction:ConvTopicTAction     baseActionClass = AskForAction     verDobjProp = &verifyDobjAskFor     remapDobjProp = &remapDobjAskFor     preCondDobjProp = &preCondDobjAskFor     checkDobjProp = &checkDobjAskFor     actionDobjProp = &actionDobjAskFor     whichMessageTopic = IndirectObject
;

class AskAboutAction:ConvTopicTAction     baseActionClass = AskAboutAction     verDobjProp = &verifyDobjAskAbout     remapDobjProp = &remapDobjAskAbout     preCondDobjProp = &preCondDobjAskAbout     checkDobjProp = &checkDobjAskAbout     actionDobjProp = &actionDobjAskAbout     whichMessageTopic = IndirectObject
;

class TellAboutAction:ConvTopicTAction     baseActionClass = TellAboutAction     verDobjProp = &verifyDobjTellAbout     remapDobjProp = &remapDobjTellAbout     preCondDobjProp = &preCondDobjTellAbout     checkDobjProp = &checkDobjTellAbout     actionDobjProp = &actionDobjTellAbout     whichMessageTopic = IndirectObject
     






    isConversational(issuer)
    {
        local dobj;
        
         



        dobj = getResolvedDobjList();
        return (dobj.length() == 1 && dobj[1] == issuer);
    }
;

 






class AskVagueAction:TopicTAction     baseActionClass = AskVagueAction     verDobjProp = &verifyDobjAskVague     remapDobjProp = &remapDobjAskVague     preCondDobjProp = &preCondDobjAskVague     checkDobjProp = &checkDobjAskVague     actionDobjProp = &actionDobjAskVague     whichMessageTopic = IndirectObject
;
class TellVagueAction:TopicTAction     baseActionClass = TellVagueAction     verDobjProp = &verifyDobjTellVague     remapDobjProp = &remapDobjTellVague     preCondDobjProp = &preCondDobjTellVague     checkDobjProp = &checkDobjTellVague     actionDobjProp = &actionDobjTellVague     whichMessageTopic = IndirectObject
;

class HelloAction:ConvIAction     baseActionClass = HelloAction
    execAction()
    {
         
        (libGlobal.curIssuingActor).sayHello((libGlobal.curActor));
    }
;

class GoodbyeAction:ConvIAction     baseActionClass = GoodbyeAction
    execAction()
    {
         
        (libGlobal.curIssuingActor).sayGoodbye((libGlobal.curActor));
    }
;

class YesAction:ConvIAction     baseActionClass = YesAction
    execAction()
    {
         
        (libGlobal.curIssuingActor).sayYes((libGlobal.curActor));
    }
;

class NoAction:ConvIAction     baseActionClass = NoAction
    execAction()
    {
         
        (libGlobal.curIssuingActor).sayNo((libGlobal.curActor));
    }
;

 













class SpecialTopicAction:LiteralAction     baseActionClass = SpecialTopicAction
    execAction()
    {
         



        (libGlobal.curIssuingActor).saySpecialTopic();
    }

     




    repeatAction(lastTargetActor, lastTargetActorPhrase,
                 lastIssuingActor, countsAsIssuerTurn)
    {
        local cmd;

         
        cmd = getEnteredText();
        
         



        if (specialTopicPreParser.doParsing(cmd, rmcCommand)
            .startsWith('xspcltopic '))
        {
             




            inherited(lastTargetActor, lastTargetActorPhrase,
                      lastIssuingActor, countsAsIssuerTurn);
        }
        else
        {
             



            (libGlobal.libMessageObj).againNotPossible(lastIssuingActor);
        }
    }

     



    getEnteredText() { return decodeOrig(getLiteral()); }

     




    encodeOrig(txt)
    {
         
        return txt.findReplace(['%', '"'], ['%%', '%q']);
    }

     
    decodeOrig(txt)
    {
         
        return txt.findReplace(['%%', '%q'], ['%', '"']);
    }
;

grammar predicate(SpecialTopic):
    'xspcltopic' literalPhrase->literalMatch
    : SpecialTopicAction

     



    getOrigText() { return getEnteredText(); }
;

 
grammar predicate(EmptySpecialTopic):
    'xspcltopic' : IAction

     
    execAction() { (libGlobal.libMessageObj).commandNotPresent; }
;

class KissAction:TAction     baseActionClass = KissAction     verDobjProp = &verifyDobjKiss     remapDobjProp = &remapDobjKiss     preCondDobjProp = &preCondDobjKiss     checkDobjProp = &checkDobjKiss     actionDobjProp  = &actionDobjKiss
;

class YellAction:IAction     baseActionClass = YellAction
    execAction()
    {
         
        ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&okayYellMsg)));
    }
;

class TalkToAction:TAction     baseActionClass = TalkToAction     verDobjProp = &verifyDobjTalkTo     remapDobjProp = &remapDobjTalkTo     preCondDobjProp = &preCondDobjTalkTo     checkDobjProp = &checkDobjTalkTo     actionDobjProp  = &actionDobjTalkTo
;

class TopicsAction:SystemAction     baseActionClass = TopicsAction
    execSystemAction()
    {
         
        if (firstObj(SuggestedTopic, 0x0001) != nil)
        {
             
            (libGlobal.curActor).suggestTopics(true);
        }
        else
        {
             
            (libGlobal.libMessageObj).commandNotPresent;
        }
    }

     
    includeInUndo = nil
;

class GiveToAction:TIAction     baseActionClass = GiveToAction     verDobjProp = &verifyDobjGiveTo     verIobjProp = &verifyIobjGiveTo     remapDobjProp = &remapDobjGiveTo     remapIobjProp = &remapIobjGiveTo     preCondDobjProp = &preCondDobjGiveTo     preCondIobjProp = &preCondIobjGiveTo     checkDobjProp = &checkDobjGiveTo     checkIobjProp = &checkIobjGiveTo     actionDobjProp  = &actionDobjGiveTo     actionIobjProp = &actionIobjGiveTo
    getDefaultIobj(np, resolver)
    {
         
        local obj = resolver.getTargetActor().getCurrentInterlocutor();
        if (obj != nil)
            return [new ResolveInfo(obj, 0, np)];
        else
            return inherited(np, resolver);
    }
;

 





giveMeToAskFor: GlobalRemapping
     





    getRemapping(issuingActor, targetActor, action)
    {
         




        if (action.ofKind(GiveToAction)
            && action.canIobjResolveTo(issuingActor))
        {
             
            local newAction = AskForAction.createActionInstance();

             
            newAction.setOriginalAction(action);

             












            newAction.setPronounOverride(PronounYou, targetActor);

             





            local dobj = new PreResolvedProd(targetActor);

             







            local iobj = newAction.reparseMatchAsTopic(
                action.dobjMatch, issuingActor, issuingActor);

             
            newAction.setObjectMatches(dobj, iobj);
            
             



            return [issuingActor, newAction];
        }

         
        return nil;
    }
;


class ShowToAction:TIAction     baseActionClass = ShowToAction     verDobjProp = &verifyDobjShowTo     verIobjProp = &verifyIobjShowTo     remapDobjProp = &remapDobjShowTo     remapIobjProp = &remapIobjShowTo     preCondDobjProp = &preCondDobjShowTo     preCondIobjProp = &preCondIobjShowTo     checkDobjProp = &checkDobjShowTo     checkIobjProp = &checkIobjShowTo     actionDobjProp  = &actionDobjShowTo     actionIobjProp = &actionIobjShowTo
    getDefaultIobj(np, resolver)
    {
         
        local obj = resolver.getTargetActor().getCurrentInterlocutor();
        if (obj != nil)
            return [new ResolveInfo(obj, 0, np)];
        else
            return inherited(np, resolver);
    }
;

class FollowAction:TAction     baseActionClass = FollowAction     verDobjProp = &verifyDobjFollow     remapDobjProp = &remapDobjFollow     preCondDobjProp = &preCondDobjFollow     checkDobjProp = &checkDobjFollow     actionDobjProp  = &actionDobjFollow
     




    initResolver(issuingActor, targetActor)
    {
         
        inherited(issuingActor, targetActor);

         




        scope_ = scope_.appendUnique(targetActor.getFollowables());
    }
;

class AttackAction:TAction     baseActionClass = AttackAction     verDobjProp = &verifyDobjAttack     remapDobjProp = &remapDobjAttack     preCondDobjProp = &preCondDobjAttack     checkDobjProp = &checkDobjAttack     actionDobjProp  = &actionDobjAttack
;

class AttackWithAction:TIAction     baseActionClass = AttackWithAction     verDobjProp = &verifyDobjAttackWith     verIobjProp = &verifyIobjAttackWith     remapDobjProp = &remapDobjAttackWith     remapIobjProp = &remapIobjAttackWith     preCondDobjProp = &preCondDobjAttackWith     preCondIobjProp = &preCondIobjAttackWith     checkDobjProp = &checkDobjAttackWith     checkIobjProp = &checkIobjAttackWith     actionDobjProp  = &actionDobjAttackWith     actionIobjProp = &actionIobjAttackWith
     



    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class ThrowAction:TAction     baseActionClass = ThrowAction     verDobjProp = &verifyDobjThrow     remapDobjProp = &remapDobjThrow     preCondDobjProp = &preCondDobjThrow     checkDobjProp = &checkDobjThrow     actionDobjProp  = &actionDobjThrow
;

class ThrowDirAction:TAction     baseActionClass = ThrowDirAction     verDobjProp = &verifyDobjThrowDir     remapDobjProp = &remapDobjThrowDir     preCondDobjProp = &preCondDobjThrowDir     checkDobjProp = &checkDobjThrowDir     actionDobjProp  = &actionDobjThrowDir
     
    getDirection() { return dirMatch.dir; }
;

class ThrowAtAction:TIAction     baseActionClass = ThrowAtAction     verDobjProp = &verifyDobjThrowAt     verIobjProp = &verifyIobjThrowAt     remapDobjProp = &remapDobjThrowAt     remapIobjProp = &remapIobjThrowAt     preCondDobjProp = &preCondDobjThrowAt     preCondIobjProp = &preCondIobjThrowAt     checkDobjProp = &checkDobjThrowAt     checkIobjProp = &checkIobjThrowAt     actionDobjProp  = &actionDobjThrowAt     actionIobjProp = &actionIobjThrowAt
;

class ThrowToAction:TIAction     baseActionClass = ThrowToAction     verDobjProp = &verifyDobjThrowTo     verIobjProp = &verifyIobjThrowTo     remapDobjProp = &remapDobjThrowTo     remapIobjProp = &remapIobjThrowTo     preCondDobjProp = &preCondDobjThrowTo     preCondIobjProp = &preCondIobjThrowTo     checkDobjProp = &checkDobjThrowTo     checkIobjProp = &checkIobjThrowTo     actionDobjProp  = &actionDobjThrowTo     actionIobjProp = &actionIobjThrowTo
;

class DigAction:TAction     baseActionClass = DigAction     verDobjProp = &verifyDobjDig     remapDobjProp = &remapDobjDig     preCondDobjProp = &preCondDobjDig     checkDobjProp = &checkDobjDig     actionDobjProp  = &actionDobjDig
;

class DigWithAction:TIAction     baseActionClass = DigWithAction     verDobjProp = &verifyDobjDigWith     verIobjProp = &verifyIobjDigWith     remapDobjProp = &remapDobjDigWith     remapIobjProp = &remapIobjDigWith     preCondDobjProp = &preCondDobjDigWith     preCondIobjProp = &preCondIobjDigWith     checkDobjProp = &checkDobjDigWith     checkIobjProp = &checkIobjDigWith     actionDobjProp  = &actionDobjDigWith     actionIobjProp = &actionIobjDigWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class JumpAction:IAction     baseActionClass = JumpAction
    preCond = [actorStanding]
    execAction()
    {
         
        ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&okayJumpMsg)));
    }
;

class JumpOverAction:TAction     baseActionClass = JumpOverAction     verDobjProp = &verifyDobjJumpOver     remapDobjProp = &remapDobjJumpOver     preCondDobjProp = &preCondDobjJumpOver     checkDobjProp = &checkDobjJumpOver     actionDobjProp  = &actionDobjJumpOver
;

class JumpOffAction:TAction     baseActionClass = JumpOffAction     verDobjProp = &verifyDobjJumpOff     remapDobjProp = &remapDobjJumpOff     preCondDobjProp = &preCondDobjJumpOff     checkDobjProp = &checkDobjJumpOff     actionDobjProp  = &actionDobjJumpOff
;

class JumpOffIAction:IAction     baseActionClass = JumpOffIAction
    execAction()
    {
        ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotJumpOffHereMsg)));
    }
;

class PushAction:TAction     baseActionClass = PushAction     verDobjProp = &verifyDobjPush     remapDobjProp = &remapDobjPush     preCondDobjProp = &preCondDobjPush     checkDobjProp = &checkDobjPush     actionDobjProp  = &actionDobjPush
;

class PullAction:TAction     baseActionClass = PullAction     verDobjProp = &verifyDobjPull     remapDobjProp = &remapDobjPull     preCondDobjProp = &preCondDobjPull     checkDobjProp = &checkDobjPull     actionDobjProp  = &actionDobjPull
;

class MoveAction:TAction     baseActionClass = MoveAction     verDobjProp = &verifyDobjMove     remapDobjProp = &remapDobjMove     preCondDobjProp = &preCondDobjMove     checkDobjProp = &checkDobjMove     actionDobjProp  = &actionDobjMove
;

class MoveWithAction:TIAction     baseActionClass = MoveWithAction     verDobjProp = &verifyDobjMoveWith     verIobjProp = &verifyIobjMoveWith     remapDobjProp = &remapDobjMoveWith     remapIobjProp = &remapIobjMoveWith     preCondDobjProp = &preCondDobjMoveWith     preCondIobjProp = &preCondIobjMoveWith     checkDobjProp = &checkDobjMoveWith     checkIobjProp = &checkIobjMoveWith     actionDobjProp  = &actionDobjMoveWith     actionIobjProp = &actionIobjMoveWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class MoveToAction:TIAction     baseActionClass = MoveToAction     verDobjProp = &verifyDobjMoveTo     verIobjProp = &verifyIobjMoveTo     remapDobjProp = &remapDobjMoveTo     remapIobjProp = &remapIobjMoveTo     preCondDobjProp = &preCondDobjMoveTo     preCondIobjProp = &preCondIobjMoveTo     checkDobjProp = &checkDobjMoveTo     checkIobjProp = &checkIobjMoveTo     actionDobjProp  = &actionDobjMoveTo     actionIobjProp = &actionIobjMoveTo
;

class TurnAction:TAction     baseActionClass = TurnAction     verDobjProp = &verifyDobjTurn     remapDobjProp = &remapDobjTurn     preCondDobjProp = &preCondDobjTurn     checkDobjProp = &checkDobjTurn     actionDobjProp  = &actionDobjTurn
;

class TurnWithAction:TIAction     baseActionClass = TurnWithAction     verDobjProp = &verifyDobjTurnWith     verIobjProp = &verifyIobjTurnWith     remapDobjProp = &remapDobjTurnWith     remapIobjProp = &remapIobjTurnWith     preCondDobjProp = &preCondDobjTurnWith     preCondIobjProp = &preCondIobjTurnWith     checkDobjProp = &checkDobjTurnWith     checkIobjProp = &checkIobjTurnWith     actionDobjProp  = &actionDobjTurnWith     actionIobjProp = &actionIobjTurnWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class TurnToAction:LiteralTAction     baseActionClass = TurnToAction     verDobjProp = &verifyDobjTurnTo     remapDobjProp = &remapDobjTurnTo     preCondDobjProp = &preCondDobjTurnTo     checkDobjProp = &checkDobjTurnTo     actionDobjProp = &actionDobjTurnTo     whichMessageLiteral = IndirectObject
;

class SetAction:TAction     baseActionClass = SetAction     verDobjProp = &verifyDobjSet     remapDobjProp = &remapDobjSet     preCondDobjProp = &preCondDobjSet     checkDobjProp = &checkDobjSet     actionDobjProp  = &actionDobjSet
;

class SetToAction:LiteralTAction     baseActionClass = SetToAction     verDobjProp = &verifyDobjSetTo     remapDobjProp = &remapDobjSetTo     preCondDobjProp = &preCondDobjSetTo     checkDobjProp = &checkDobjSetTo     actionDobjProp = &actionDobjSetTo     whichMessageLiteral = IndirectObject
;

class TypeOnAction:TAction     baseActionClass = TypeOnAction     verDobjProp = &verifyDobjTypeOn     remapDobjProp = &remapDobjTypeOn     preCondDobjProp = &preCondDobjTypeOn     checkDobjProp = &checkDobjTypeOn     actionDobjProp  = &actionDobjTypeOn
;

class TypeLiteralOnAction:LiteralTAction     baseActionClass = TypeLiteralOnAction     verDobjProp = &verifyDobjTypeLiteralOn     remapDobjProp = &remapDobjTypeLiteralOn     preCondDobjProp = &preCondDobjTypeLiteralOn     checkDobjProp = &checkDobjTypeLiteralOn     actionDobjProp = &actionDobjTypeLiteralOn     whichMessageLiteral = DirectObject
;

class EnterOnAction:LiteralTAction     baseActionClass = EnterOnAction     verDobjProp = &verifyDobjEnterOn     remapDobjProp = &remapDobjEnterOn     preCondDobjProp = &preCondDobjEnterOn     checkDobjProp = &checkDobjEnterOn     actionDobjProp = &actionDobjEnterOn     whichMessageLiteral = DirectObject
;

class ConsultAction:TAction     baseActionClass = ConsultAction     verDobjProp = &verifyDobjConsult     remapDobjProp = &remapDobjConsult     preCondDobjProp = &preCondDobjConsult     checkDobjProp = &checkDobjConsult     actionDobjProp  = &actionDobjConsult
;

class ConsultAboutAction:TopicTAction     baseActionClass = ConsultAboutAction     verDobjProp = &verifyDobjConsultAbout     remapDobjProp = &remapDobjConsultAbout     preCondDobjProp = &preCondDobjConsultAbout     checkDobjProp = &checkDobjConsultAbout     actionDobjProp = &actionDobjConsultAbout     whichMessageTopic = IndirectObject
    getDefaultDobj(np, resolver)
    {
         



        local actor = resolver.getTargetActor();
        local obj = actor.lastConsulted;
        if (obj != nil && actor.canSee(obj))
            return [new ResolveInfo(obj, 0x0080, np)];
        else
            return inherited(np, resolver);
    }

     



    filterTopic(lst, np, resolver)
    {
        local dobj;
        
         
        if (dobjList_ != nil
            && dobjList_.length() == 1
            && (dobj = dobjList_[1].obj_).ofKind(Consultable))
        {
             



            return dobj.resolveConsultTopic(lst, topicMatch, resolver);
        }
        else
        {
             
            return inherited(lst, np, resolver);
        }
    }
;

class SwitchAction:TAction     baseActionClass = SwitchAction     verDobjProp = &verifyDobjSwitch     remapDobjProp = &remapDobjSwitch     preCondDobjProp = &preCondDobjSwitch     checkDobjProp = &checkDobjSwitch     actionDobjProp  = &actionDobjSwitch
;

class FlipAction:TAction     baseActionClass = FlipAction     verDobjProp = &verifyDobjFlip     remapDobjProp = &remapDobjFlip     preCondDobjProp = &preCondDobjFlip     checkDobjProp = &checkDobjFlip     actionDobjProp  = &actionDobjFlip
;

class TurnOnAction:TAction     baseActionClass = TurnOnAction     verDobjProp = &verifyDobjTurnOn     remapDobjProp = &remapDobjTurnOn     preCondDobjProp = &preCondDobjTurnOn     checkDobjProp = &checkDobjTurnOn     actionDobjProp  = &actionDobjTurnOn
;

class TurnOffAction:TAction     baseActionClass = TurnOffAction     verDobjProp = &verifyDobjTurnOff     remapDobjProp = &remapDobjTurnOff     preCondDobjProp = &preCondDobjTurnOff     checkDobjProp = &checkDobjTurnOff     actionDobjProp  = &actionDobjTurnOff
;

class LightAction:TAction     baseActionClass = LightAction     verDobjProp = &verifyDobjLight     remapDobjProp = &remapDobjLight     preCondDobjProp = &preCondDobjLight     checkDobjProp = &checkDobjLight     actionDobjProp  = &actionDobjLight
;

class BurnAction:TAction     baseActionClass = BurnAction     verDobjProp = &verifyDobjBurn     remapDobjProp = &remapDobjBurn     preCondDobjProp = &preCondDobjBurn     checkDobjProp = &checkDobjBurn     actionDobjProp  = &actionDobjBurn
;

class BurnWithAction:TIAction     baseActionClass = BurnWithAction     verDobjProp = &verifyDobjBurnWith     verIobjProp = &verifyIobjBurnWith     remapDobjProp = &remapDobjBurnWith     remapIobjProp = &remapIobjBurnWith     preCondDobjProp = &preCondDobjBurnWith     preCondIobjProp = &preCondIobjBurnWith     checkDobjProp = &checkDobjBurnWith     checkIobjProp = &checkIobjBurnWith     actionDobjProp  = &actionDobjBurnWith     actionIobjProp = &actionIobjBurnWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }

     
    resolveFirst = DirectObject
;

class ExtinguishAction:TAction     baseActionClass = ExtinguishAction     verDobjProp = &verifyDobjExtinguish     remapDobjProp = &remapDobjExtinguish     preCondDobjProp = &preCondDobjExtinguish     checkDobjProp = &checkDobjExtinguish     actionDobjProp  = &actionDobjExtinguish
;

class AttachToAction:TIAction     baseActionClass = AttachToAction     verDobjProp = &verifyDobjAttachTo     verIobjProp = &verifyIobjAttachTo     remapDobjProp = &remapDobjAttachTo     remapIobjProp = &remapIobjAttachTo     preCondDobjProp = &preCondDobjAttachTo     preCondIobjProp = &preCondIobjAttachTo     checkDobjProp = &checkDobjAttachTo     checkIobjProp = &checkIobjAttachTo     actionDobjProp  = &actionDobjAttachTo     actionIobjProp = &actionIobjAttachTo
;

class DetachFromAction:TIAction     baseActionClass = DetachFromAction     verDobjProp = &verifyDobjDetachFrom     verIobjProp = &verifyIobjDetachFrom     remapDobjProp = &remapDobjDetachFrom     remapIobjProp = &remapIobjDetachFrom     preCondDobjProp = &preCondDobjDetachFrom     preCondIobjProp = &preCondIobjDetachFrom     checkDobjProp = &checkDobjDetachFrom     checkIobjProp = &checkIobjDetachFrom     actionDobjProp  = &actionDobjDetachFrom     actionIobjProp = &actionIobjDetachFrom
;

class DetachAction:TAction     baseActionClass = DetachAction     verDobjProp = &verifyDobjDetach     remapDobjProp = &remapDobjDetach     preCondDobjProp = &preCondDobjDetach     checkDobjProp = &checkDobjDetach     actionDobjProp  = &actionDobjDetach
;

class BreakAction:TAction     baseActionClass = BreakAction     verDobjProp = &verifyDobjBreak     remapDobjProp = &remapDobjBreak     preCondDobjProp = &preCondDobjBreak     checkDobjProp = &checkDobjBreak     actionDobjProp  = &actionDobjBreak
;

class CutAction:TAction     baseActionClass = CutAction     verDobjProp = &verifyDobjCut     remapDobjProp = &remapDobjCut     preCondDobjProp = &preCondDobjCut     checkDobjProp = &checkDobjCut     actionDobjProp  = &actionDobjCut
;

class CutWithAction:TIAction     baseActionClass = CutWithAction     verDobjProp = &verifyDobjCutWith     verIobjProp = &verifyIobjCutWith     remapDobjProp = &remapDobjCutWith     remapIobjProp = &remapIobjCutWith     preCondDobjProp = &preCondDobjCutWith     preCondIobjProp = &preCondIobjCutWith     checkDobjProp = &checkDobjCutWith     checkIobjProp = &checkIobjCutWith     actionDobjProp  = &actionDobjCutWith     actionIobjProp = &actionIobjCutWith
;

class ClimbAction:TAction     baseActionClass = ClimbAction     verDobjProp = &verifyDobjClimb     remapDobjProp = &remapDobjClimb     preCondDobjProp = &preCondDobjClimb     checkDobjProp = &checkDobjClimb     actionDobjProp  = &actionDobjClimb
;

class ClimbUpAction:TAction     baseActionClass = ClimbUpAction     verDobjProp = &verifyDobjClimbUp     remapDobjProp = &remapDobjClimbUp     preCondDobjProp = &preCondDobjClimbUp     checkDobjProp = &checkDobjClimbUp     actionDobjProp  = &actionDobjClimbUp
;

class ClimbDownAction:TAction     baseActionClass = ClimbDownAction     verDobjProp = &verifyDobjClimbDown     remapDobjProp = &remapDobjClimbDown     preCondDobjProp = &preCondDobjClimbDown     checkDobjProp = &checkDobjClimbDown     actionDobjProp  = &actionDobjClimbDown
;

class OpenAction:TAction     baseActionClass = OpenAction     verDobjProp = &verifyDobjOpen     remapDobjProp = &remapDobjOpen     preCondDobjProp = &preCondDobjOpen     checkDobjProp = &checkDobjOpen     actionDobjProp  = &actionDobjOpen
;

class CloseAction:TAction     baseActionClass = CloseAction     verDobjProp = &verifyDobjClose     remapDobjProp = &remapDobjClose     preCondDobjProp = &preCondDobjClose     checkDobjProp = &checkDobjClose     actionDobjProp  = &actionDobjClose
;

class LockAction:TAction     baseActionClass = LockAction     verDobjProp = &verifyDobjLock     remapDobjProp = &remapDobjLock     preCondDobjProp = &preCondDobjLock     checkDobjProp = &checkDobjLock     actionDobjProp  = &actionDobjLock
;

class UnlockAction:TAction     baseActionClass = UnlockAction     verDobjProp = &verifyDobjUnlock     remapDobjProp = &remapDobjUnlock     preCondDobjProp = &preCondDobjUnlock     checkDobjProp = &checkDobjUnlock     actionDobjProp  = &actionDobjUnlock
;

class LockWithAction:TIAction     baseActionClass = LockWithAction     verDobjProp = &verifyDobjLockWith     verIobjProp = &verifyIobjLockWith     remapDobjProp = &remapDobjLockWith     remapIobjProp = &remapIobjLockWith     preCondDobjProp = &preCondDobjLockWith     preCondIobjProp = &preCondIobjLockWith     checkDobjProp = &checkDobjLockWith     checkIobjProp = &checkIobjLockWith     actionDobjProp  = &actionDobjLockWith     actionIobjProp = &actionIobjLockWith
     





    resolveFirst = DirectObject

     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class UnlockWithAction:TIAction     baseActionClass = UnlockWithAction     verDobjProp = &verifyDobjUnlockWith     verIobjProp = &verifyIobjUnlockWith     remapDobjProp = &remapDobjUnlockWith     remapIobjProp = &remapIobjUnlockWith     preCondDobjProp = &preCondDobjUnlockWith     preCondIobjProp = &preCondIobjUnlockWith     checkDobjProp = &checkDobjUnlockWith     checkIobjProp = &checkIobjUnlockWith     actionDobjProp  = &actionDobjUnlockWith     actionIobjProp = &actionIobjUnlockWith
     
    resolveFirst = DirectObject

     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class EatAction:TAction     baseActionClass = EatAction     verDobjProp = &verifyDobjEat     remapDobjProp = &remapDobjEat     preCondDobjProp = &preCondDobjEat     checkDobjProp = &checkDobjEat     actionDobjProp  = &actionDobjEat
;

class DrinkAction:TAction     baseActionClass = DrinkAction     verDobjProp = &verifyDobjDrink     remapDobjProp = &remapDobjDrink     preCondDobjProp = &preCondDobjDrink     checkDobjProp = &checkDobjDrink     actionDobjProp  = &actionDobjDrink
;

class PourAction:TAction     baseActionClass = PourAction     verDobjProp = &verifyDobjPour     remapDobjProp = &remapDobjPour     preCondDobjProp = &preCondDobjPour     checkDobjProp = &checkDobjPour     actionDobjProp  = &actionDobjPour
;

class PourIntoAction:TIAction     baseActionClass = PourIntoAction     verDobjProp = &verifyDobjPourInto     verIobjProp = &verifyIobjPourInto     remapDobjProp = &remapDobjPourInto     remapIobjProp = &remapIobjPourInto     preCondDobjProp = &preCondDobjPourInto     preCondIobjProp = &preCondIobjPourInto     checkDobjProp = &checkDobjPourInto     checkIobjProp = &checkIobjPourInto     actionDobjProp  = &actionDobjPourInto     actionIobjProp = &actionIobjPourInto
;

class PourOntoAction:TIAction     baseActionClass = PourOntoAction     verDobjProp = &verifyDobjPourOnto     verIobjProp = &verifyIobjPourOnto     remapDobjProp = &remapDobjPourOnto     remapIobjProp = &remapIobjPourOnto     preCondDobjProp = &preCondDobjPourOnto     preCondIobjProp = &preCondIobjPourOnto     checkDobjProp = &checkDobjPourOnto     checkIobjProp = &checkIobjPourOnto     actionDobjProp  = &actionDobjPourOnto     actionIobjProp = &actionIobjPourOnto
;

class CleanAction:TAction     baseActionClass = CleanAction     verDobjProp = &verifyDobjClean     remapDobjProp = &remapDobjClean     preCondDobjProp = &preCondDobjClean     checkDobjProp = &checkDobjClean     actionDobjProp  = &actionDobjClean
;

class CleanWithAction:TIAction     baseActionClass = CleanWithAction     verDobjProp = &verifyDobjCleanWith     verIobjProp = &verifyIobjCleanWith     remapDobjProp = &remapDobjCleanWith     remapIobjProp = &remapIobjCleanWith     preCondDobjProp = &preCondDobjCleanWith     preCondIobjProp = &preCondIobjCleanWith     checkDobjProp = &checkDobjCleanWith     checkIobjProp = &checkIobjCleanWith     actionDobjProp  = &actionDobjCleanWith     actionIobjProp = &actionIobjCleanWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class SitAction:IAction     baseActionClass = SitAction
    execAction()
    {
         



        if ((libGlobal.curActor).posture == sitting)
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&alreadySittingMsg)));
        else
            (SitOnAction.retryWithMissingDobj((libGlobal.curAction), ResolveAsker));
    }
;

class SitOnAction:TAction     baseActionClass = SitOnAction     verDobjProp = &verifyDobjSitOn     remapDobjProp = &remapDobjSitOn     preCondDobjProp = &preCondDobjSitOn     checkDobjProp = &checkDobjSitOn     actionDobjProp  = &actionDobjSitOn
;

class LieAction:IAction     baseActionClass = LieAction
    execAction()
    {
         



        if ((libGlobal.curActor).posture == lying)
            ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&alreadyLyingMsg)));
        else
            (LieOnAction.retryWithMissingDobj((libGlobal.curAction), ResolveAsker));
    }
;

class LieOnAction:TAction     baseActionClass = LieOnAction     verDobjProp = &verifyDobjLieOn     remapDobjProp = &remapDobjLieOn     preCondDobjProp = &preCondDobjLieOn     checkDobjProp = &checkDobjLieOn     actionDobjProp  = &actionDobjLieOn
;

class StandOnAction:TAction     baseActionClass = StandOnAction     verDobjProp = &verifyDobjStandOn     remapDobjProp = &remapDobjStandOn     preCondDobjProp = &preCondDobjStandOn     checkDobjProp = &checkDobjStandOn     actionDobjProp  = &actionDobjStandOn
;

class StandAction:IAction     baseActionClass = StandAction
    execAction()
    {
         
        (libGlobal.curActor).standUp();
    }
;

class BoardAction:TAction     baseActionClass = BoardAction     verDobjProp = &verifyDobjBoard     remapDobjProp = &remapDobjBoard     preCondDobjProp = &preCondDobjBoard     checkDobjProp = &checkDobjBoard     actionDobjProp  = &actionDobjBoard
;

class GetOutOfAction:TAction     baseActionClass = GetOutOfAction     verDobjProp = &verifyDobjGetOutOf     remapDobjProp = &remapDobjGetOutOf     preCondDobjProp = &preCondDobjGetOutOf     checkDobjProp = &checkDobjGetOutOf     actionDobjProp  = &actionDobjGetOutOf
    getAllDobj(actor, scopeList)
    {
         
        return scopeList.subset({x: actor.isDirectlyIn(x)});
    }
;

class GetOffOfAction:TAction     baseActionClass = GetOffOfAction     verDobjProp = &verifyDobjGetOffOf     remapDobjProp = &remapDobjGetOffOf     preCondDobjProp = &preCondDobjGetOffOf     checkDobjProp = &checkDobjGetOffOf     actionDobjProp  = &actionDobjGetOffOf
    getAllDobj(actor, scopeList)
    {
         
        return scopeList.subset({x: actor.isDirectlyIn(x)});
    }
;

class GetOutAction:IAction     baseActionClass = GetOutAction
    execAction()
    {
         
        (libGlobal.curActor).disembark();
    }
;

class FastenAction:TAction     baseActionClass = FastenAction     verDobjProp = &verifyDobjFasten     remapDobjProp = &remapDobjFasten     preCondDobjProp = &preCondDobjFasten     checkDobjProp = &checkDobjFasten     actionDobjProp  = &actionDobjFasten
;

class FastenToAction:TIAction     baseActionClass = FastenToAction     verDobjProp = &verifyDobjFastenTo     verIobjProp = &verifyIobjFastenTo     remapDobjProp = &remapDobjFastenTo     remapIobjProp = &remapIobjFastenTo     preCondDobjProp = &preCondDobjFastenTo     preCondIobjProp = &preCondIobjFastenTo     checkDobjProp = &checkDobjFastenTo     checkIobjProp = &checkIobjFastenTo     actionDobjProp  = &actionDobjFastenTo     actionIobjProp = &actionIobjFastenTo
;

class UnfastenAction:TAction     baseActionClass = UnfastenAction     verDobjProp = &verifyDobjUnfasten     remapDobjProp = &remapDobjUnfasten     preCondDobjProp = &preCondDobjUnfasten     checkDobjProp = &checkDobjUnfasten     actionDobjProp  = &actionDobjUnfasten
;

class UnfastenFromAction:TIAction     baseActionClass = UnfastenFromAction     verDobjProp = &verifyDobjUnfastenFrom     verIobjProp = &verifyIobjUnfastenFrom     remapDobjProp = &remapDobjUnfastenFrom     remapIobjProp = &remapIobjUnfastenFrom     preCondDobjProp = &preCondDobjUnfastenFrom     preCondIobjProp = &preCondIobjUnfastenFrom     checkDobjProp = &checkDobjUnfastenFrom     checkIobjProp = &checkIobjUnfastenFrom     actionDobjProp  = &actionDobjUnfastenFrom     actionIobjProp = &actionIobjUnfastenFrom
;

class PlugInAction:TAction     baseActionClass = PlugInAction     verDobjProp = &verifyDobjPlugIn     remapDobjProp = &remapDobjPlugIn     preCondDobjProp = &preCondDobjPlugIn     checkDobjProp = &checkDobjPlugIn     actionDobjProp  = &actionDobjPlugIn
;

class PlugIntoAction:TIAction     baseActionClass = PlugIntoAction     verDobjProp = &verifyDobjPlugInto     verIobjProp = &verifyIobjPlugInto     remapDobjProp = &remapDobjPlugInto     remapIobjProp = &remapIobjPlugInto     preCondDobjProp = &preCondDobjPlugInto     preCondIobjProp = &preCondIobjPlugInto     checkDobjProp = &checkDobjPlugInto     checkIobjProp = &checkIobjPlugInto     actionDobjProp  = &actionDobjPlugInto     actionIobjProp = &actionIobjPlugInto
;

class UnplugAction:TAction     baseActionClass = UnplugAction     verDobjProp = &verifyDobjUnplug     remapDobjProp = &remapDobjUnplug     preCondDobjProp = &preCondDobjUnplug     checkDobjProp = &checkDobjUnplug     actionDobjProp  = &actionDobjUnplug
;

class UnplugFromAction:TIAction     baseActionClass = UnplugFromAction     verDobjProp = &verifyDobjUnplugFrom     verIobjProp = &verifyIobjUnplugFrom     remapDobjProp = &remapDobjUnplugFrom     remapIobjProp = &remapIobjUnplugFrom     preCondDobjProp = &preCondDobjUnplugFrom     preCondIobjProp = &preCondIobjUnplugFrom     checkDobjProp = &checkDobjUnplugFrom     checkIobjProp = &checkIobjUnplugFrom     actionDobjProp  = &actionDobjUnplugFrom     actionIobjProp = &actionIobjUnplugFrom
;

class ScrewAction:TAction     baseActionClass = ScrewAction     verDobjProp = &verifyDobjScrew     remapDobjProp = &remapDobjScrew     preCondDobjProp = &preCondDobjScrew     checkDobjProp = &checkDobjScrew     actionDobjProp  = &actionDobjScrew
;

class ScrewWithAction:TIAction     baseActionClass = ScrewWithAction     verDobjProp = &verifyDobjScrewWith     verIobjProp = &verifyIobjScrewWith     remapDobjProp = &remapDobjScrewWith     remapIobjProp = &remapIobjScrewWith     preCondDobjProp = &preCondDobjScrewWith     preCondIobjProp = &preCondIobjScrewWith     checkDobjProp = &checkDobjScrewWith     checkIobjProp = &checkIobjScrewWith     actionDobjProp  = &actionDobjScrewWith     actionIobjProp = &actionIobjScrewWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

class UnscrewAction:TAction     baseActionClass = UnscrewAction     verDobjProp = &verifyDobjUnscrew     remapDobjProp = &remapDobjUnscrew     preCondDobjProp = &preCondDobjUnscrew     checkDobjProp = &checkDobjUnscrew     actionDobjProp  = &actionDobjUnscrew
;

class UnscrewWithAction:TIAction     baseActionClass = UnscrewWithAction     verDobjProp = &verifyDobjUnscrewWith     verIobjProp = &verifyIobjUnscrewWith     remapDobjProp = &remapDobjUnscrewWith     remapIobjProp = &remapIobjUnscrewWith     preCondDobjProp = &preCondDobjUnscrewWith     preCondIobjProp = &preCondIobjUnscrewWith     checkDobjProp = &checkDobjUnscrewWith     checkIobjProp = &checkIobjUnscrewWith     actionDobjProp  = &actionDobjUnscrewWith     actionIobjProp = &actionIobjUnscrewWith
     
    getAllIobj(actor, scopeList)
    {
        return scopeList.subset({x: x.isIn(actor)});
    }
;

 
 







class TravelAction:IAction     baseActionClass = TravelAction
    execAction()
    {
        local conn;
        
         




        if ((conn = getConnector()) != nil)
        {
             



            _replaceAction((libGlobal.curActor), TravelViaAction,conn);
        }
        else
        {
             
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport(&cannotGoThatWayMsg)));
        }
    }

     
    getDirection() { return dirMatch != nil ? dirMatch.dir : nil; }

     




    getConnector()
    {
         
        return (libGlobal.curActor).location == nil
            ? nil
            : (libGlobal.curActor).location.getTravelConnector(getDirection(), (libGlobal.curActor));
    }

     






    actionOfKind(cls)
    {
         





        if (cls.ofKind(TravelAction) && cls.getDirection() != nil)
        {
             
            return (getDirection() == cls.getDirection());
        }

         
        return inherited(cls);
    }
;

 
class VagueTravelAction:IAction     baseActionClass = VagueTravelAction
    execAction()
    {
         
        ((mainOutputStream.curTranscript).addReport(new FailCommandReport(&whereToGoMsg)));
    }
;

 














class TravelDirAction:TravelAction     baseActionClass = TravelDirAction
    construct(dir)
    {
         
        dir_ = dir;
    }
    
     
    getDirection() { return dir_; }
    
     
    dir_ = nil
;

 




class NorthAction:TravelAction     baseActionClass = NorthAction
    getDirection = northDirection
;
class SouthAction:TravelAction     baseActionClass = SouthAction
    getDirection = southDirection
;
class EastAction:TravelAction     baseActionClass = EastAction
    getDirection = eastDirection
;
class WestAction:TravelAction     baseActionClass = WestAction
    getDirection = westDirection
;
class NortheastAction:TravelAction     baseActionClass = NortheastAction
    getDirection = northeastDirection
;
class NorthwestAction:TravelAction     baseActionClass = NorthwestAction
    getDirection = northwestDirection
;
class SoutheastAction:TravelAction     baseActionClass = SoutheastAction
    getDirection = southeastDirection
;
class SouthwestAction:TravelAction     baseActionClass = SouthwestAction
    getDirection = southwestDirection
;
class InAction:TravelAction     baseActionClass = InAction
    getDirection = inDirection
;
class OutAction:TravelAction     baseActionClass = OutAction
    getDirection = outDirection
;
class UpAction:TravelAction     baseActionClass = UpAction
    getDirection = upDirection
;
class DownAction:TravelAction     baseActionClass = DownAction
    getDirection = downDirection
;
class ForeAction:TravelAction     baseActionClass = ForeAction
    getDirection = foreDirection
;
class AftAction:TravelAction     baseActionClass = AftAction
    getDirection = aftDirection
;
class PortAction:TravelAction     baseActionClass = PortAction
    getDirection = portDirection
;
class StarboardAction:TravelAction     baseActionClass = StarboardAction
    getDirection = starboardDirection
;

 



class GoThroughAction:TAction     baseActionClass = GoThroughAction     verDobjProp = &verifyDobjGoThrough     remapDobjProp = &remapDobjGoThrough     preCondDobjProp = &preCondDobjGoThrough     checkDobjProp = &checkDobjGoThrough     actionDobjProp  = &actionDobjGoThrough
;

class EnterAction:TAction     baseActionClass = EnterAction     verDobjProp = &verifyDobjEnter     remapDobjProp = &remapDobjEnter     preCondDobjProp = &preCondDobjEnter     checkDobjProp = &checkDobjEnter     actionDobjProp  = &actionDobjEnter
;

 






class TravelViaAction:TAction     baseActionClass = TravelViaAction     verDobjProp = &verifyDobjTravelVia     remapDobjProp = &remapDobjTravelVia     preCondDobjProp = &preCondDobjTravelVia     checkDobjProp = &checkDobjTravelVia     actionDobjProp  = &actionDobjTravelVia
     








    getCurrentObjects = []
;

 
class GoBackAction:IAction     baseActionClass = GoBackAction
    execAction()
    {
         
        (libGlobal.curActor).reverseLastTravel();
    }
;

 
 






class PushTravelAction:TAction     baseActionClass = PushTravelAction     verDobjProp = &verifyDobjPushTravel     remapDobjProp = &remapDobjPushTravel     preCondDobjProp = &preCondDobjPushTravel     checkDobjProp = &checkDobjPushTravel     actionDobjProp  = &actionDobjPushTravel
     
















    
;

 







class PushTravelDirAction:PushTravelAction     baseActionClass = PushTravelDirAction
     




    getDirection() { return dirMatch.dir; }

     
    performTravel()
    {
        local conn;
        
         
        conn = (libGlobal.curActor).location.getTravelConnector(getDirection(), (libGlobal.curActor));

         
        _nestedAction(nil, (libGlobal.curActor), TravelViaAction,conn);
    }
;

 



class PushNorthAction:PushTravelDirAction     baseActionClass = PushNorthAction
    getDirection = northDirection
;

class PushSouthAction:PushTravelDirAction     baseActionClass = PushSouthAction
    getDirection = southDirection
;

class PushEastAction:PushTravelDirAction     baseActionClass = PushEastAction
    getDirection = eastDirection
;

class PushWestAction:PushTravelDirAction     baseActionClass = PushWestAction
    getDirection = westDirection
;

class PushNorthwestAction:PushTravelDirAction     baseActionClass = PushNorthwestAction
    getDirection = northwestDirection
;

class PushNortheastAction:PushTravelDirAction     baseActionClass = PushNortheastAction
    getDirection = northeastDirection
;

class PushSouthwestAction:PushTravelDirAction     baseActionClass = PushSouthwestAction
    getDirection = southwestDirection
;

class PushSoutheastAction:PushTravelDirAction     baseActionClass = PushSoutheastAction
    getDirection = southeastDirection
;

class PushUpAction:PushTravelDirAction     baseActionClass = PushUpAction
    getDirection = upDirection
;

class PushDownAction:PushTravelDirAction     baseActionClass = PushDownAction
    getDirection = downDirection
;

class PushInAction:PushTravelDirAction     baseActionClass = PushInAction
    getDirection = inDirection
;

class PushOutAction:PushTravelDirAction     baseActionClass = PushOutAction
    getDirection = outDirection
;

class PushForeAction:PushTravelDirAction     baseActionClass = PushForeAction
    getDirection = foreDirection
;

class PushAftAction:PushTravelDirAction     baseActionClass = PushAftAction
    getDirection = aftDirection
;

class PushPortAction:PushTravelDirAction     baseActionClass = PushPortAction
    getDirection = portDirection
;

class PushStarboardAction:PushTravelDirAction     baseActionClass = PushStarboardAction
    getDirection = starboardDirection
;

 




class PushTravelViaIobjAction:TIAction, PushTravelAction     baseActionClass = PushTravelViaIobjAction
     




    verifyPushTravelIobj(obj, action)
    {
         
        remapVerify(IndirectObject, (libGlobal.curVerifyResults), [action, obj]);
    }
;

class PushTravelThroughAction:PushTravelViaIobjAction     baseActionClass = PushTravelThroughAction     verDobjProp = &verifyDobjPushTravelThrough     verIobjProp = &verifyIobjPushTravelThrough     remapDobjProp = &remapDobjPushTravelThrough     remapIobjProp = &remapIobjPushTravelThrough     preCondDobjProp = &preCondDobjPushTravelThrough     preCondIobjProp = &preCondIobjPushTravelThrough     checkDobjProp = &checkDobjPushTravelThrough     checkIobjProp = &checkIobjPushTravelThrough     actionDobjProp  = &actionDobjPushTravelThrough     actionIobjProp = &actionIobjPushTravelThrough
     







    performTravel() { _nestedAction(nil, (libGlobal.curActor), GoThroughAction,getIobj()); }
;

class PushTravelEnterAction:PushTravelViaIobjAction     baseActionClass = PushTravelEnterAction     verDobjProp = &verifyDobjPushTravelEnter     verIobjProp = &verifyIobjPushTravelEnter     remapDobjProp = &remapDobjPushTravelEnter     remapIobjProp = &remapIobjPushTravelEnter     preCondDobjProp = &preCondDobjPushTravelEnter     preCondIobjProp = &preCondIobjPushTravelEnter     checkDobjProp = &checkDobjPushTravelEnter     checkIobjProp = &checkIobjPushTravelEnter     actionDobjProp  = &actionDobjPushTravelEnter     actionIobjProp = &actionIobjPushTravelEnter
     
    performTravel() { _nestedAction(nil, (libGlobal.curActor), EnterAction,getIobj()); }
;

class PushTravelGetOutOfAction:PushTravelViaIobjAction     baseActionClass = PushTravelGetOutOfAction     verDobjProp = &verifyDobjPushTravelGetOutOf     verIobjProp = &verifyIobjPushTravelGetOutOf     remapDobjProp = &remapDobjPushTravelGetOutOf     remapIobjProp = &remapIobjPushTravelGetOutOf     preCondDobjProp = &preCondDobjPushTravelGetOutOf     preCondIobjProp = &preCondIobjPushTravelGetOutOf     checkDobjProp = &checkDobjPushTravelGetOutOf     checkIobjProp = &checkIobjPushTravelGetOutOf     actionDobjProp  = &actionDobjPushTravelGetOutOf     actionIobjProp = &actionIobjPushTravelGetOutOf
     
    performTravel() { _nestedAction(nil, (libGlobal.curActor), GetOutOfAction,getIobj()); }
;

class PushTravelClimbUpAction:PushTravelViaIobjAction     baseActionClass = PushTravelClimbUpAction     verDobjProp = &verifyDobjPushTravelClimbUp     verIobjProp = &verifyIobjPushTravelClimbUp     remapDobjProp = &remapDobjPushTravelClimbUp     remapIobjProp = &remapIobjPushTravelClimbUp     preCondDobjProp = &preCondDobjPushTravelClimbUp     preCondIobjProp = &preCondIobjPushTravelClimbUp     checkDobjProp = &checkDobjPushTravelClimbUp     checkIobjProp = &checkIobjPushTravelClimbUp     actionDobjProp  = &actionDobjPushTravelClimbUp     actionIobjProp = &actionIobjPushTravelClimbUp
     
    performTravel() { _nestedAction(nil, (libGlobal.curActor), ClimbUpAction,getIobj()); }
;

class PushTravelClimbDownAction:PushTravelViaIobjAction     baseActionClass = PushTravelClimbDownAction     verDobjProp = &verifyDobjPushTravelClimbDown     verIobjProp = &verifyIobjPushTravelClimbDown     remapDobjProp = &remapDobjPushTravelClimbDown     remapIobjProp = &remapIobjPushTravelClimbDown     preCondDobjProp = &preCondDobjPushTravelClimbDown     preCondIobjProp = &preCondIobjPushTravelClimbDown     checkDobjProp = &checkDobjPushTravelClimbDown     checkIobjProp = &checkIobjPushTravelClimbDown     actionDobjProp  = &actionDobjPushTravelClimbDown     actionIobjProp = &actionIobjPushTravelClimbDown
     
    performTravel() { _nestedAction(nil, (libGlobal.curActor), ClimbDownAction,getIobj()); }
;

 



class ExitsAction:IAction     baseActionClass = ExitsAction
    execAction()
    {
         



        if ((libGlobal.exitListerObj) != nil)
            (libGlobal.exitListerObj).showExitsCommand();
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }
;

 
property showExitsCommand, exitsOnOffCommand;

 






class ExitsModeAction:SystemAction     baseActionClass = ExitsModeAction
    execSystemAction()
    {
        local stat, look;

         




        stat = (stat_ != nil || on_ != nil);
        look = (look_ != nil || on_ != nil);

         
        if ((libGlobal.exitListerObj) != nil)
            (libGlobal.exitListerObj).exitsOnOffCommand(stat, look);
        else
            (libGlobal.libMessageObj).commandNotPresent;
    }
;

 



class OopsAction:LiteralAction     baseActionClass = OopsAction
    execAction()
    {
         
        (libGlobal.libMessageObj).oopsOutOfContext;
    }

     
    actionTime = 0
;

 
class OopsIAction:IAction     baseActionClass = OopsIAction
    doActionMain()
    {
         
        (libGlobal.libMessageObj).oopsOutOfContext;
    }

     
    actionTime = 0
;

property disableHints, showHints;

 
class HintsOffAction:SystemAction     baseActionClass = HintsOffAction
    execSystemAction()
    {
        if ((libGlobal.hintManagerObj) != nil)
            (libGlobal.hintManagerObj).disableHints();
        else
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport((libGlobal.libMessageObj).hintsNotPresent)));
    }
;

 
class HintAction:SystemAction     baseActionClass = HintAction
    execSystemAction()
    {
        if ((libGlobal.hintManagerObj) != nil)
            (libGlobal.hintManagerObj).showHints();
        else
            ((mainOutputStream.curTranscript).addReport(new MainCommandReport((libGlobal.libMessageObj).hintsNotPresent)));
    }
;

 
 





class ParseDebugAction:IAction     baseActionClass = ParseDebugAction
    execAction()
    {
        local newMode;

         




        newMode = (onOrOff_ == 'on'
                   ? true
                   : onOrOff_ == 'off'
                   ? nil
                   : !libGlobal.parserDebugMode);

         
        libGlobal.parserDebugMode = newMode;

         
        "Parser debugging is now <<
libGlobal.parserDebugMode ? 'on' : 'off'>>.\n";
    }
;

grammar predicate(ParseDebug):
    'parse-debug' 'on'->onOrOff_
    | 'parse-debug' 'off'->onOrOff_
    | 'parse-debug'
    : ParseDebugAction
;



