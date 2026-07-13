


 
 




World: PreinitObject
     


    scope()
    {
        local s = scope_;

        if (s == nil)
            scope_ = s = Q.scopeList((libGlobal.playerChar));

        return s;
    }

     
    scope_ = nil

     



    universalScope = nil
    
    buildUniversalScope()
    {
        local vec = new Vector(100);
        forEachInstance(Mentionable, {o: vec.append(o) });
        universalScope = vec.toList;
    }
    
    execute()
    {
        buildUniversalScope();
    }
    
    
;


 
 















class Parser: object
     



























    autoLook = true

     








    
    defaultActions = true

     






















    autoSpell = ((libGlobal.playerChar).currentInterlocutor == nil)

     













    spellTimeLimit = 250

     
















































    showUnknownWords = nil

     









    parse(str)
    {
         
        specialVerbMgr.currentSV = nil;
        
         
        local toks;
        try
        {
             
            toks = cmdTokenizer.tokenize(str);
            
             
            while(toks.length > 0 && ((toks[toks.length])[2]) == tokPunct)
                toks = toks.removeElementAt(toks.length);
            
        }
        catch (TokErrorNoMatch err)
        {
             



            message('token error', nil,err.curChar_)
;

           
            
            
             
            return;
        }

         




        if(question == nil)
            (libGlobal.curActor) = (libGlobal.playerChar);        
        
         
        local history = new transient SpellingHistory(self);

         
        local firstCmd = true;

         
        try
        {
             
            if (toks.length() == 0)
            {
                 



                question = nil;
                lastTokens = nil;

                 
                emptyCommand();

                 
                return;
            }

             
            local lst = oopsCommand.parseTokens(toks, cmdDict);
            if (lst.length() != 0)
            {
                 
                local ui;
                if (lastTokens == nil
                    || (ui = spellingCorrector.findUnknownWord(lastTokens))
                        == nil)
                {
                     
                    throw new CantOopsError();
                }
                
                 
                toks = OopsProduction.applyCorrection(lst[1], lastTokens, ui);
            }
            
              
            updateVocab();
            
                          
            toks = specialVerbMgr.matchSV(toks);  
            
             





            for (local root = firstCommandPhrase ; toks.length() != 0 ; )
            {
                 
                local cmdLst = nil;

                 



                local qErr = nil, defErr = nil;

                 








                if (firstCmd && question != nil && question.priority)
                {
                     
                    local l = question.parseAnswer(toks, cmdDict);

                     
                    if (l != nil && l.cmd != nil)
                        cmdLst = l;

                     
                    if (l != nil)
                        qErr = l.getResErr();
                }

                 



                if (cmdLst == nil || cmdLst.cmd == nil)
                {
                    cmdLst = new CommandList(
                        root, toks, cmdDict, { p: new Command(p) });
                }

                 










                if (cmdLst.cmd == nil
                    && firstCmd
                    && question != nil
                    && !question.priority)
                {
                     
                    local l = question.parseAnswer(toks, cmdDict);

                     
                    if (l != nil && l.cmd != nil)
                        cmdLst = l;

                     
                    if (l != nil)
                        qErr = l.getResErr();
                }

                 







                if (cmdLst.cmd == nil
                    && firstCmd)
                {
                    local l;                   
                    
                    
                     





                    
                    if((libGlobal.playerChar).currentInterlocutor != nil
                       && cmdLst.length == 0 
                       && Q.canTalkTo((libGlobal.playerChar),
                                      (libGlobal.playerChar).currentInterlocutor)
                       && str.find(',') == nil
                       && (libGlobal.playerChar).currentInterlocutor.allowImplicitSay())
                    {
                         l = new CommandList(
                            topicPhrase, toks, cmdDict,
                            { p: new Command(SayAction, p) });
                        
                        libGlobal.lastCommandForUndo = str;
                        savepoint();
                    }
                     







                    else if(defaultActions)                                                
                        l = new CommandList(
                            defaultCommandPhrase, toks, cmdDict,
                            { p: new Command(p) });                       
                    
                    
                       
                     
                    if (l != nil && l.acceptCurable() != nil)
                    {
                        cmdLst = l;
                        
                         
                        defErr = l.getResErr();
                    }
                }
                
                 








                if (cmdLst.length() != nil
                    && history.hasCorrections())
                {
                     
                    local c = cmdLst.getBestCmd();

                     
                    if (c != nil && c.tokenLen < toks.length())
                    {
                         
                        local l = commandPhrase.parseTokens(
                            c.nextTokens, cmdDict);

                         



                        if (l.length() == 0)
                            cmdLst = new CommandList();
                    }
                }
                
                 






                if (cmdLst.length() == 0
                    || (history.hasCorrections()
                        && cmdLst.getResErr() != nil
                        && !cmdLst.getResErr().allowOnRespell))
                {
                     






                    local err = (qErr != nil ? qErr :
                                 defErr != nil ? defErr :
                                 new NotUnderstoodError());
                    
                     
                    local newToks = history.checkSpelling(toks, err);
                    if (newToks != nil)
                    {
                         
                        toks = newToks;
                        continue;
                    }

                     








                    if (err is in (defErr, qErr))
                    {
                         
                        err = new NotUnderstoodError();
                        
                         
                        newToks = history.checkSpelling(toks, err);
                        if (newToks != nil)
                        {
                             
                            toks = newToks;
                            continue;
                        }
                    
                        
                         






                        history.clear();                   
                    }
                
                     
                    throw err;
                }

                 
                if (cmdLst.cmd != nil)
                {
                     
                    local cmd = cmdLst.cmd;
                    
                     

















                     
                    if(cmd && cmd.verbProd != nil &&                        
                        (cmd.badMulti != nil 
                       || (cmd.verbProd.dobjMatch != nil &&
                           cmd.verbProd.dobjMatch.grammarTag == 'normal'
                           && cmd.dobjs.length > 1)
                       ||
                       (cmd.verbProd.iobjMatch != nil &&
                           cmd.verbProd.iobjMatch.grammarTag == 'normal'
                           && cmd.iobjs.length > 1)                          
                        ||
                       (cmd.verbProd.accMatch != nil &&
                           cmd.verbProd.accMatch.grammarTag == 'normal'
                           && cmd.accs.length > 1)
                           ))
                        cmd.cmdErr = new BadMultiError(cmd.np);
                    
                     
                    if (cmd.cmdErr != nil)
                        throw cmd.cmdErr;

                     






                    question = nil;
                    lastTokens = nil;
                    
                     
                    history.noteSpelling(toks);
                    
                     
                    cmd.exec();
                    
                     
                    history = new transient SpellingHistory(self);
                    
                     





                    root = cmd.endOfSentence
                        ? firstCommandPhrase : commandPhrase;
                    
                     
                    firstCmd = nil;
                    
                     
                    toks = cmd.nextTokens;
                    continue;
                }

                 









                local c = cmdLst.acceptAny();

                 







                if (!c.cmdErr.curable)
                {
                     











                    local spellErr = c.cmdErr;
                    if (c.cmdErr.ofKind(UnmatchedNounError)
                        && c.miscWordLists.length() > 0
                        && c.missingNouns > 0)
                        spellErr = new NotUnderstoodError();

                     
                    local newToks = history.checkSpelling(toks, spellErr);

                     
                    if (newToks != nil)
                    {
                         
                        toks = newToks;
                        continue;
                    }
                }

                 
                throw c.cmdErr;
            }
        }
        catch (ParseError err)
        {
             



            local h = history.rollback(toks, err);
            toks = h.oldToks;
            err = h.parseError;

             



            if (err.curable)
                question = new ParseErrorQuestion(err);
            
             





            local ui;
            if (!err.curable
                && showUnknownWords
                && (ui = spellingCorrector.findUnknownWord(toks)) != nil)
            {
                 
                err = new UnknownWordError(((toks[ui])[3]));
            }
            
             



            if (!err.ofKind(OopsError))
                lastTokens = toks;
            
             
            history.noteSpelling(toks);

             
            err.display();
        }
        catch (CommandSignal sig)
        {
             



        }
    }

     




    lastTokens = nil

     







    question = nil

     






    emptyCommand()
    {
        if (autoLook)
            new Command(Look).exec();
        else
        {
             






            message('empty command line', nil);

        }
    }
    
     




    
    DefaultAction = ExamineOrGoTo
    
     
    rmcType()
    {
        if(Parser.question != nil && Parser.question.err != nil)
        {
             



            if(Parser.question.err.ofKind(EmptyNounError))
                return rmcAskObject;
            
             



            if(Parser.question.err.ofKind(AmbiguousError))
                return rmcDisambig;            
        }
        
         



        return rmcCommand;
    }
    
     



    updateVocab()
    {
         
        local lst = libGlobal.altVocabLst;
        
         



        if(lst.length > 30)
        {
             
            local scope = Q.scopeList((libGlobal.playerChar)).toList();
            
             
            lst = lst.intersect(scope);
            
        }
        
         
        lst.forEach({ x: x.updateVocab() });
    }
;

 
 




class CommandSignal: Exception
;


 


class ExitCommandLineSignal: CommandSignal
;
    

 
 



class CommandList: object
     









    construct([args])
    {
                 
        if (args.matchProto([GrammarProd, Collection, Dictionary, 12]))
        {
             
            local prod = args[1], toks = args[2], dict = args[3],
                wrapper = args[4];

             
            cmdLst = prod.parseTokens(toks, dict).mapAll(wrapper);
            
             
            cmdLst = Command.sortList(cmdLst);
            
             




            foreach (local c in cmdLst)
            {
                try
                {                    
                     
                    c.resolveNouns();
                    
                     
                     



                    if(cmd == nil || !c.madeTopic)
                        cmd = c;
                    
                     



                    if(!cmd.madeTopic)
                       break;
                }
                catch(InsufficientNounsError err)
                {
                    c.cmdErr = err;
                    throw err;
                }
                catch(NoneInOwnerError err)
                {
                    c.cmdErr = err;
                    throw err;
                }
                
                catch (ParseError err)
                {
                     
                    c.cmdErr = err;
                    
                     







                    if (err.curable && curable == nil)
                        curable = c;
                }
            }
        }
        else if (args.matchProto([Command]))
        {
             
            cmd = args[1];
            cmdLst = [cmd];
        }
        else if (args.matchProto([]))
        {
             
            cmd = nil;
            cmdLst = [];
        }
        else
            throw new ArgumentMismatchError();
    }

     
    length() { return cmdLst.length(); }

     




    acceptCurable()
    {
         
        if (cmd == nil)
            cmd = curable;

         
        return cmd;
    }

     





    acceptAny()
    {
         
        return cmd = getBestCmd();
    }

     





    getBestCmd()
    {
         
        if (cmd != nil)
            return cmd;

         
        if (curable != nil)
            return curable;

         
        if (cmdLst.length() > 0)
            return cmdLst[1];

         
        return nil;
    }

     




    getResErr()
    {
         
        if (cmd != nil)
            return cmd.cmdErr;

         
        if (curable != nil)
            return curable.cmdErr;

         
        local c = cmdLst.valWhich({ c: c.cmdErr != nil });
        return (c != nil ? c.cmdErr : nil);
    }

     
    cmdLst = []

     



    cmd = nil

     




    curable = nil
;


 
 














class Question: object
     


























    priority = nil
    
     











    parseAnswer(toks, dict) { return nil; }

     
    answerTemplate = nil
;

 



class GramQuestion: Question
     







    construct(prod, func)
    {
        answerProd = prod;
        answerFunc = func;
    }

     




    parseAnswer(toks, dict)
    {
         
        return new CommandList(
            answerProd, toks, dict, { p: makeCommand(p) });
    }

     





    makeCommand(prod) { return new FuncCommand(prod, answerFunc); }

     
    answerProd = nil

     
    answerFunc = nil
;

 



class YesNoQuestion: GramQuestion
     




    construct(func)
    {
         






        inherited(yesOrNoPhrase, { cmd: func(cmd.yesOrNoAnswer) });
    }

     




    priority = true
;

 



class RexQuestion: Question
     








    construct(pat, func)
    {
        answerPat = pat;
        answerFunc = func;
    }

    parseAnswer(toks, dict)
    {
         
        local str = cmdTokenizer.buildOrigText(toks);

         
        if (rexMatch(answerPat, str,) != nil)
        {
             
            return new CommandList(new FuncCommand(
                nil, { cmd: answerFunc(str) }));
        }
        else
        {
             
            return nil;
        }
    }

     
    answerPat = nil

     
    answerFunc = nil
;

 


class ParseErrorQuestion: Question
    construct(err)
    {
         
        self.err = err;
    }

    parseAnswer(toks, dict)
    {
         
        return err.tryCuring(toks, dict);
    }

     
    err = nil
    
     





    priority = true
;


 
 












class Distinguisher: object
     




    sortOrder = 0

     



    equal(a, b) { return nil; }

     








    appliesTo(obj) { return true; }

     



    apply(lst)
    {
         
        local r = new DistResult(self);

         
        r.appliesTo = lst.subset({ obj: appliesTo(obj) });

         
        local toDo = new Vector(10, r.appliesTo);

         
        while (toDo.length() > 0)
        {
             
            local obj = toDo.pop();

             
            local sv = new Vector(10);

             
            sv.append(obj);

             
            r.partitioned.append(sv);

             
            for (local i = toDo.length() ; i > 0 ; --i)
            {
                 
                local obj2 = toDo[i];
                if (equal(obj, obj2))
                {
                     
                    sv.append(obj2);

                     
                    toDo.removeElementAt(i);
                }
            }
        }

         
        return r;
    }

     
    all = []

     
    classInit()
    {
         
        forEachInstance(Distinguisher, {d: all += d});

         
        all = all.sort(nil, {a, b: a.sortOrder - b.sortOrder});
    }

     
    classInitFirst = [StateDistinguisher]

     














    getNames(objs, article, disambig = nil)
    {        
         
        local names = new Vector(objs.length());

         
        local dres = new Vector(Distinguisher.all.length());

         
        foreach (local d in Distinguisher.all)
            dres.append(d.apply(objs));
        
         



        Distinguisher.disambiguating = disambig;

         
        while (objs.length() != 0)
        {
             
            local obj = objs.pop();

             
            local ores = dres.subset({ r: r.appliesTo.indexOf(obj) != nil });

             


































            ores.sort(nil, new function(a, b)
            {
                 
                local asiz = a.partSize(obj);
                local bsiz = b.partSize(obj);

                 
                if (asiz != bsiz)
                    return asiz - bsiz;

                 
                return a.distinguisher.sortOrder - b.distinguisher.sortOrder;
            });

             
            local used = new Vector(10);

             





            used.append(ores[1].distinguisher);
            local rem = ores[1].partition(obj).toList();

             



            for (local i = 2, local olen = ores.length() ;
                 rem.length() > 1 && i <= olen ; ++i)
            {
                 



                local rcur = ores[i];
                local isect = rem.intersect(rcur.partition(obj).toList());

                 





                if (isect.length() < rem.length())
                {
                     
                    rem = isect;

                     
                    used.append(rcur.distinguisher);
                }
            }

             










            local rlen = rem.length();
            local nm = obj.distinguishedName(
                article ? (rlen == 1 ? Definite : Indefinite) : Unqualified,
                used);

             





            for (local i = 2 ; i <= rlen ; ++i)
                objs.removeElement(rem[i]);

             
            names.append([nm, rem]);
        }

         
        return names;
    }
    
    disambiguating = nil
;

 


class DistResult: object
    construct(dist)
    {
         
        distinguisher = dist;

         
        partitioned = new Vector(10);
    }

     
    partition(obj)
    {
        return partitioned.valWhich({ p: p.indexOf(obj) != nil });
    }

     
    partSize(obj)
    {
        return partition(obj).length();
    }

     
    appliesTo = []

     





    partitioned = []

     
    distinguisher = nil
;

 







nameDistinguisher: Distinguisher
    sortOrder = 100 
    equal(a, b) { return a.name.find(b.name) || b.name.find(a.name); }
;

 






disambigNameDistinguisher: Distinguisher
    sortOrder = Distinguisher.disambiguating ? 50: 100 
    equal(a, b) { return a.disambigName == b.disambigName; }
;

 





class StateDistinguisher: Distinguisher
    sortOrder = 300

     
    equal(a, b) { return a.(state.stateProp) == b.(state.stateProp); }

     
    appliesTo(obj) { return state.appliesTo(obj); }
    
     
    construct(st)
    {
         
        state = st;
    }

     
    classInit()
    {
        forEachInstance(State, {st: stateList += new StateDistinguisher(st)});
    }

     
    state = nil

     
    stateList = []
;


 



ownerDistinguisher: Distinguisher
    sortOrder = 400
    appliesTo(obj) { return obj.nominalOwner() != nil; }
    equal(a, b) { return a.nominalOwner() == b.nominalOwner(); }
;

 



locationDistinguisher: Distinguisher
    sortOrder = 500
    equal(a, b) { return a.location == b.location; }
;

 









contentsDistinguisher: Distinguisher
    sortOrder = 600
    appliesTo(obj) { return obj.distinguishByContents != nil; }
    equal(a, b)
    {
        local ac = a.nominalContents(), bc = b.nominalContents();
        return (ac != nil ? ac.name : nil) == (bc != nil ? bc.name : nil);
    }
;
    

 
 









class NounPhrase: object
     
    construct(parent, prod)
    {
         



        self.parent = parent;
        self.prod = self.coreProd = prod;
    }

     
    clone()
    {
         
        local cl = createClone();

         
        foreach (local p in cl.getPropList())
        {
            local v;
            if (cl.propType(p) == 5 && (v = cl.(p)).ofKind(Vector))
                cl.(p) = new Vector(v.length(), v);
        }

         
        return cl;
    }

     



















    errName = (errNameProd.getText())

     
    errNameProd = (coreProd)

     




    expandErrName(np)
    {
         



        for (local prod = np.prod ; prod != nil ; prod = prod.parent)
        {
             



            if (prod == errNameProd || errNameProd.isChildOf(prod))
            {
                 
                errNameProd = prod;

                 
                break;
            }
        }
    }

     




    contains(np)
    {
        return (np == self
                || (possQual != nil && possQual.contains(np))
                || (locQual != nil && locQual.contains(np))
                || (exclusions != nil
                    && exclusions.indexWhich({ x: x.contains(np) }) != nil));
    }
    
     






    matchVocab(cmd)
    {
         
        local v = new Vector(32);

                 
        cmd.action.buildScopeList();
        local scope = cmd.action.scopeList;

         
        if (pronoun != nil)
        {
             
            addMatches(v, pronoun.resolve(), 0);

             
            if (v.length() == 0)
                throw new NoAntecedentError(self, pronoun);

             
            v = v.subset(
                { m: m.obj.ofKind(Pronoun) || scope.find(m.obj) });

             
            if (v.length() == 0)
                throw new AntecedentScopeError(cmd, self, pronoun);

        }
        else if (determiner == All && tokens == [])
        {
             
            addMatches(v, cmd.action.getAllUnhidden(cmd, role), 0);
            cmd.matchedAll = true;
        }
        else
        {
             




            v.appendAll(matchNameScope(cmd, scope));
        }

         
        matches = v;

         
        if (contQual != nil)
        {
             
            contQual.matchVocab(cmd);

             
            contQual.applyContQual();

             
            if (matches.length() == 0)
                throw new NoneWithContentsError(cmd, self, contQual);

             









            expandErrName(contQual);
        }

         
        if (possQual != nil)
        {
             
            possQual.matchVocabPoss(cmd);

             



            possQual.applyPossessive();

             
            if (matches.length() == 0)
                throw new NoneInOwnerError(cmd, self, possQual);

             
            expandErrName(possQual);
        }

         
        if (locQual != nil)
        {
             
            locQual.matchVocab(cmd);

             
            locQual.applyLocational();

             
            if (matches.length() == 0)
                throw new NoneInLocationError(cmd, self, locQual);

             
            expandErrName(locQual);
        }

         
        if (exclusions != nil)
            exclusions.forEach({ x: x.applyExclusion(cmd) });
    }

     




    addMatches(vec, lst, match)
    {
         
        if (lst == nil)
            return;

         
        vec.appendAll(valToList(lst).mapAll({ obj: new NPMatch(self, obj, match) }));
    }

     



    matchNameScope(cmd, scope)
    {
         
        local v = new Vector(32);
        
         



        foreach (local obj in scope)
        {
             
            local match = obj.matchName(tokens);
            
             
            if (match)
                v.append(new NPMatch(self, obj, match));
        }

         



        if (v.length() > 0)
        {
             
            v.sort(true, { a, b: a.strength - b.strength });

             




            v = v.subset({ a: a.strength == v[1].strength });
        }
        else
        {
             
            throw new UnmatchedNounError(cmd, self);
        }

         
        return v;
    }

     




















    matchVocabPoss(cmd)
    {
         
        local v = matches = new Vector(32);

         
        if (pronoun != nil)
        {
             














            local done = nil;
            cmd.forEachNP(new function(np)
            {
                 
                if (done)
                    return;

                 



                if (np == parent)
                {
                    done = true;
                    return;
                }

                 




                if (np.role == ActorRole && pronoun.person == 2)
                {
                    v.appendAll(np.matches);
                    done = true;
                    return;
                }

                 
                local s = np.matches.subset(
                    { o: pronoun.matchObj(o.obj) });

                 



                if (s.length() != 0)
                {
                    v.appendAll(s);
                    done = true;
                }
            });

             



            if (v.length() == 0)
                v.appendAll(pronoun.resolve().mapAll({
                    x: new NPMatch(self, x, 0) }));
        }
        else
        {
             




            local expScope = new Vector(32);
            foreach (local obj in parent.matches)
            {
                 



                local owner = obj.obj.owner;
                if (owner != nil)
                    expScope.appendAll(owner);
            }

             
            expScope.appendUnique(World.scope.toList());

             
            v.appendAll(matchNameScope(cmd, expScope));
        }

         



        if (possQual != nil)
            possQual.matchVocabPoss(cmd);
    }

     




    applyPossessive()
    {
         











        local m = matches.subset(
            { o: parent.matches.indexWhich(
                { p: p.obj.ownedBy(o.obj) }) != nil });

         
        if (m.length() > 0)
            matches = m;
        
         
        if (possQual != nil)
            possQual.applyPossessive();

         
        parent.matches = parent.matches.subset(
            { p: matches.indexWhich(
                { o: p.obj.ownedBy(o.obj) }) != nil });
    }

     




    applyContQual()
    {
         



        local m = matches.subset(
            { o: parent.matches.indexWhich(
                { p: o.obj.isChild(p.obj, nil) }) != nil });

         
        if (m.length() > 0)
            matches = m;

         
        if (contQual != nil)
            contQual.applyContQual();

         
        parent.matches = parent.matches.subset(
            { p: matches.indexWhich(
                { o: o.obj.isChild(p.obj, nil) }) != nil });
    }
    
     




    applyLocational()
    {
         



        local m = matches.subset(
            { o: parent.matches.indexWhich(
                { p: p.obj.isChild(o.obj, locType) }) != nil });

         
        if (m.length() > 0)
            matches = m;

         
        if (locQual != nil)
            locQual.applyLocational();

         
        m = parent.matches.subset(
            { p: matches.indexWhich(
                { o: p.obj.isDirectChild(o.obj, locType) }) != nil });

         
        if (m.length() == 0)
            m = parent.matches.subset(
                { p: matches.indexWhich(
                    { o: p.obj.isChild(o.obj, locType) }) != nil });

         
        parent.matches = m;
    }
    
     




    applyExclusion(cmd)
    {
         
        matchVocab(cmd);

         
        parent.matches = parent.matches.subset(
            { p: matches.indexWhich(
                { o: o.obj == p.obj }) == nil });
    }

     







































    selectObjects(cmd)
    {
         
        local mode = determiner;
        
         




        if(cmd.disambig.length > 0)
            mode = cmd.disambig[1][1].determiner;
        

         





        matches.groupSort(
            { ent, idx: [ent.obj.disambigGroup, ent.obj.disambigOrder] });

         
        if (mode == nil)
            mode = Definite;

         







        if (mode == Definite
            && quantifier == nil
            && matches.indexWhich({ m: m.match & 0x0008 }) != nil)
            mode = All;

         





        local num = (quantifier != nil ? quantifier : 1);

         



        if (num > matches.length() 
            && objs.indexWhich({o: o.canSupply}) == nil)
            throw new InsufficientNounsError(cmd, self);
        
        if (mode == Definite && isAllEquivalent(matches) && matches.length > 1)
            mode = Indefinite;

        
        for(local cur in objs)
            cur.filterResolveList(self, cmd, mode);
        
         
        switch (mode)
        {
        case Definite:        
             



            if (matches.length() > num)
                disambiguate(cmd, num, cmd.action);
            else
                 





                cmd.action.(role.objProp) = cmd.(role.objListProp)[1].obj;
            break;

        case Indefinite:
             




            
             
            cmd.action.scoreObjects(cmd, role, matches);
            
             
            matches.sort(true, { a, b: a.score - b.score });
            
            if (matches.length() > num)
                matches.removeRange(num + 1, matches.length());

             
            matches.forEach({ m: m.flags |= 0x0002 });
            cmd.matchedMulti = true;
            break;

        case All:
             



            matches.forEach({ m: m.flags |= 0x0004 });
            cmd.matchedMulti = true;
            break;
        }
    }

     



    isAllEquivalent(matchList){
        local names = Distinguisher.getNames(
            matchList.mapAll({ x: x.obj }), nil);
        return (names.length() == 1);
    }
    
     



    disambiguate(cmd, num, action)
    {
         
        action.scoreObjects(cmd, role, matches);

         
        matches.sort(true, { a, b: a.score - b.score });

         















        local sub = matches.subset({x: x.score == matches[1].score});
        
        if (isAllEquivalent(sub))
            sub.setLength(num);
        
        if (sub.length() == num)
        {
             






            local names = Distinguisher.getNames(
                matches.mapAll({ x: x.obj }), nil);            

             
            matches = sub;

             
            foreach (local m in matches)
            {
                m.flags |= 0x0001;
                m.name = names.valWhich({ n: n[2].indexOf(m.obj) != nil })[1];
            }
            
             
            return;
        }        
        else if (sub.length() > num && num > 1)                    
        {
             











            throw new AmbiguousMultiDefiniteError(cmd,self);
        }
    
         






        matches = sub;
        

         
        ambigError(cmd);
        matches.setLength(num);
    }

     


    ambigError(cmd)
    {
         
        local disambig = cmd.fetchDisambigReply();
        if (disambig != nil)
        {
             
            local dmatches = new Vector(matches.length());

             
            foreach (local dnp in disambig)
            {
                 



                dmatches.appendAll(
                    dnp.applyDisambig(cmd, matches, disambigNameList));
            }

             






            matches = dmatches;
            return;
        }

         




        local nameList = Distinguisher.getNames(
            matches.mapAll({ x: x.obj }), true , true);

         






        nameList.groupSort(new function(entry, idx)
        {
             
            local gobj = entry[2].valWhich({ x: x.disambigGroup != nil });
            
             
            return gobj != nil
                ? [gobj.disambigGroup, gobj.disambigOrder]
                : [nil, idx];
        });

         



        disambigNameList = nameList;       
        
         
        throw new AmbiguousError(cmd, self, nameList);
        
        
    }

     



    applyDisambig(cmd, ambigMatches, nameList)
    {
         





        matches = ambigMatches;

         
        if (ordinal != nil)
        {
             
            local n;
            if (ordinal == -1 && nameList.length() > 0)
                n = nameList[nameList.length()];
            else if (ordinal >= 1 && ordinal <= nameList.length())
                n = nameList[ordinal];
            else
                throw new OrdinalRangeError(self, ordinal);

             



            n = n[2][1];
            matches = matches.subset({ m: m.obj == n });
        }

         
        if (locQual != nil)
        {
             
            locQual.matchVocab(cmd);
            locQual.applyLocational();

             
            if (matches.length() == 0)
                throw new NoneInLocationError(cmd, parent, locQual);
        }
                
         
        if (possQual != nil)
        {
             
            possQual.matchVocabPoss(cmd);
            possQual.applyPossessive();

             
            if (matches.length() == 0)
                throw new NoneInOwnerError(cmd, parent, possQual);
        }

         
        if (contQual != nil)
        {
             
            contQual.matchVocab(cmd);
            contQual.applyContQual();

             
            if (matches.length() == 0)
                throw new NoneWithContentsError(cmd, parent, contQual);
        }

         
        if (tokens.length() > 0)
        {
             


















            if (tokens.length() > 0 && matches.length() > 0)
            {
                 
                local m = matches.subset(
                    { o: o.obj.matchNameDisambig(tokens) != 0 });
                
                 
                if (m.length() == 0)
                {
                     
                    local locs = World.scope.subset(
                        { o: o.matchNameDisambig(tokens) != 0 });

                     
                    m = matches.subset(
                        { o: locs.indexWhich(
                            { l: o.obj.isChild(l, nil) }) != nil });
                }
                
                 
                if (m.length() == 0)
                {
                     
                    local owners = new Vector(50, World.scope.toList());
                    foreach (local obj in matches)
                    {
                        local owner = obj.obj.owner;
                        if (owner != nil)
                            owners.appendAll(owner);
                    }

                     
                    owners = owners.subset(
                        { o: o.matchNameDisambig(tokens) != 0 });

                     
                    m = matches.subset(
                        { o: owners.indexWhich(
                            { l: o.obj.ownedBy(l) }) != nil });
                }
                
                 
                if (m.length() == 0)
                {
                     
                    local conts = World.scope.subset(
                        { c: c.matchNameDisambig(tokens) != 0 });

                     
                    m = matches.subset(
                        { o: conts.indexOf(o.obj.nominalContents) != nil });
                }
                
                 
                if (m.length() == 0)
                    throw new UnmatchedNounError(cmd, self);

                 
                matches = m;
            }
        }

         
        local num = (quantifier != nil ? quantifier : 1);

         
        if (matches.length() < num)
            throw new InsufficientNounsError(cmd, self);
        
        if (determiner == Definite && isAllEquivalent(matches))
            determiner = Indefinite;
        
         
        switch (determiner)
        {
        case Definite:
             





            if (num < matches.length())
                ambigError(cmd);
            break;
            
        case Indefinite:
             
            if (matches.length() > num)
                matches.removeRange(num + 1, matches.length());

             
            matches.forEach({ m: m.flags |= 0x0002 });
            break;
            
        case All:
             
            break;
        }

         
        return matches;
    }

     




    resolveAll(cmd)
    {
         
        if (determiner == All)
        {
             




            if (tokens == [])
            {
                 
                matchVocab(cmd);
            }
            else
            {
                 



                local all = cmd.action.getAll(cmd, role);
                local sub = matches.subset({ m: all.indexOf(m.obj) != nil });

                 









                if (sub.length() != 0)
                    matches = sub;
            }
        }
    }
    
     




    resolveReflexives(cmd)
    {
         
        if (matches.length() == 1 && matches[1].obj.ofKind(Pronoun))
        {
             



            matches = cmd.resolveReflexive(matches[1].obj).mapAll(
                { x: new NPMatch(self, x, 0) });

             
            if (matches.length() == 0)
                throw new NoAntecedentError(self, pronoun);
        }
        else
        {
             









            matches.forEach({ match: cmd.saveReflexiveAnte(match.obj) });

             
            cmd.saveReflexiveAnte(matches.mapAll({ x: x.obj }));
        }
    }

     
    buildObjList()
    {
        objs = matches.mapAll({x: x.obj});
    }

     




    matches = []

     




    objs = []

     
    addLiteral(tok) { tokens += tok; }

     
    addPossessive(prod)
    {
         
        return possQual = new NounPhrase(self, prod);
    }

     
    addContents(prep, prod)
    {
         
        contPrep = prep;

         
        return contQual = new NounPhrase(self, prod);
    }

     
    addLocation(locType, prod)
    {
         
        locQual = new NounPhrase(self, prod);

         
        locQual.locType = locType;

         
        return locQual;
    }

     
    addQuantifier(num)
    {
        quantifier = num;
    }

     
    addOrdinal(num)
    {
        ordinal = num;
    }

     
    addExclusionItem(prod)
    {
         
        if (exclusions == nil)
            exclusions = [];

         
        local np = new NounPhrase(self, prod);

         
        exclusions += np;

         
        return np;
    }

     




    isMultiple()
    {
        return determiner == All
            || (quantifier != nil && quantifier > 1)
            || matches.indexWhich({ m: m.match & 0x0008 }) != nil;
    }

     





    role = (parent.role)

     
    parent = nil

     
    prod = nil

     




    coreProd = nil

     
    tokens = []

     
    pronoun = nil

     
    possQual = nil

     
    locQual = nil

     




    locType = nil

     
    contQual = nil

     
    contPrep = nil

     
    quantifier = nil

     




    ordinal = nil

     
    determiner = nil

     



    exclusions = nil

     
    disambigNameList = nil
;

 





class TopicPhrase: NounPhrase
      






    matchVocab(cmd)
    {
         
        local v = new Vector(32);
        
         
        
        
        
        local scope = Q.topicScopeList;
        
         
        if (pronoun != nil)
        {
             
            addMatches(v, pronoun.resolve(), 0);
            
             
            if (v.length() == 0)
                throw new NoAntecedentError(self, pronoun);
            
             
            v = v.subset(
                { m: m.obj.ofKind(Pronoun) || scope.find(m.obj) });
            
             
            if (v.length() == 0)
                throw new AntecedentScopeError(cmd, self, pronoun);
            
        }
        
        else
        {
             




             v.appendAll(matchNameScope(cmd, scope));
            
             




            local obj = new Topic(tokens.join(' ').trim());
            
             



            obj.newlyCreated = true;
            
             
            local lst = [obj];

            addMatches(v, lst, 1);
            
            matches = v;  
            
            cmd.madeTopic = true;
            

        }
        
         
        matches = v;
        
        
        
         



        if (possQual != nil && matches.indexWhich({x: x.obj.ofKind(Thing)}))
        {
             
            possQual.matchVocabPoss(cmd);
            
             



            possQual.applyPossessive();
            
             
            if (matches.length() == 0)
                throw new NoneInOwnerError(cmd, self, possQual);
            
             
            expandErrName(possQual);
        }
        
      
        

        {        
           
        }
        
        
        local res = new ResolvedTopic(matches.mapAll({o: o.obj}).toList, tokens);
        
        res = new NPMatch(v[1].np, res, v[1].match);
        
        matches = new Vector([res]);
        
        
    }
    
    matchNameScope(cmd, scope)
    {
         
        local v = new Vector(32);
        
         



        foreach (local obj in scope)
        {
             
            local match = obj.matchName(tokens);
            
             
            if (match)
                v.append(new NPMatch(self, obj, match));
        }


         
        return v;
    }
    
    selectObjects(cmd)
    {
        filterResolveList(self, cmd, All);
    }
;

class ResolvedTopic: object
    construct(lst, toks)
    {
         




        if(lst != nil && lst.length > 1)
            topicList = lst.sort(nil, {a, b: a.name.length - b.name.length});
        else       
            topicList = lst;    
        tokens = toks;
    }    
    
    topicList = nil
    tokens = nil
    
     
    getBestMatch()
    {
        if(topicList == nil)
            return nil;
        
         



        local top = topicList.valWhich({t:!t.newlyCreated});
        
         



        return top ?? topicList[1];
    }    
    
    getTopicText = tokens.join(' ').trim()
    theName = (topicList != nil ? topicList[1].theName : getTopicText)
    aName = (topicList != nil ? topicList[1].aName : getTopicText)
    name = (topicList != nil ? topicList[1].name : getTopicText)
    person = 3
;

 




class LiteralPhrase: NounPhrase
    matchVocab(cmd)
    {
        local v = new Vector(2);
        
         
        local litName = tokens.join(' ');
               
         
        local obj = new LiteralObject(litName.trim());
        
         
        local lst = [obj];
        addMatches(v, lst, 0x1000);
        
        matches = v;   
    }
    
    selectObjects(cmd)
    {
         
    }
;

 

class LiteralObject: object
    construct(name_)
    {
        name = name_;
    }
    
    name = nil
    theName = (name)
    person = 3
;
    
 




class NumberPhrase: NounPhrase
     matchVocab(cmd)
    {
        local v = new Vector(2);
        
                 
        local val = prod.numval;
               
         
        local obj = new NumericObject(tokens, val);
        
         
        local lst = [obj];
        addMatches(v, lst, 0x1000);
        
        matches = v;   
    }
    
    selectObjects(cmd)
    {
         
    }
;

 
class NumericObject: object
    construct(toks, val)
    {   
        numToks = toks;
        numVal = val;
    }
    
    numToks = nil
    numVal = nil
    numStr = (numToks.join(' '))
;
    

 
 


class NPMatch: object
    construct(np, obj, match)
    {
         
        self.np = np;
        self.obj = obj;
        self.match = match;

         





        self.name = obj.name;

         


















        self.strength = (match & ~0x0008)
            | (match & 0x0008 ? 0x0004 : 0);
    }

     
    np = nil

     
    obj = nil

     



    match = 0

     
    strength = 0

     
    flags = 0

     



    score = 0

     





    name = ''
;


 
 


















class Production: object
     
    getText()
    {
         
        if (tokenList == nil)
            return '';
        
         
        return cmdTokenizer.buildOrigText(getTokens());
    }

     
    getTokens()
    {
         



        return nilToList(tokenList).sublist(
            firstTokenIndex, lastTokenIndex - firstTokenIndex + 1);
    }

     



    build(cmd, np)
    {
         
        if (endOfSentence)
            noteEndOfSentence(cmd, self);

         
        local info = grammarInfoForBuild();
        for (local i = 2, local len = info.length() ; i <= len ; ++i)
        {
             
            local cur = info[i];

             
            switch (dataType(cur))
            {
            case 8:
                 
                visitLiteral(cmd, np, cur);
                break;

            case 5:
                 



                cur.parent = self;

                 
                visitProd(cmd, np, cur);
                break;
            }
        }

         




        if (determiner != nil)
            np.determiner = determiner;
    }

     






    grammarInfoForBuild()
    {
        return grammarInfo();
    }
    
    
     


















    addNounListItem(cmd, prod)
    {
        if (nounPhraseRole != nil)
            return cmd.addNounListItem(nounPhraseRole, prod);
        else
            return parent.addNounListItem(cmd, prod);
    }

     



    noteEndOfSentence(cmd, prod)
    {
        if (parent != nil)
            parent.noteEndOfSentence(cmd, prod);
    }

     









    npClass = (parent != nil ? parent.npClass : NounPhrase)

     











    nounPhraseRole = nil

     



    getNounPhraseRole()
    {
        return nounPhraseRole != nil
            ? nounPhraseRole : parent.nounPhraseRole;
    }

     




    visitLiteral(cmd, np, tok)
    {
         
        if(np != nil)
           np.addLiteral(tok);
    }

     




    visitProd(cmd, np, prod)
    {
         
        prod.build(cmd, np);
    }

     





    determiner = nil

     












    parent = nil

     




    findParent(func)
    {
         
        local par;
        for (par = parent ; par != nil && !func(par) ; par = par.parent) ;

         
        return par;
    }

     
    isChildOf(prod)
    {
         
        for (local par = parent ; par != nil ; par = par.parent)
        {
             
            if (par == prod)
                return true;
        }

         
        return nil;
    }

     



    findAction()
    {
         
        local vp = findChild(VerbProduction);

         
        return (vp != nil ? vp.action : nil);
    }

     


    findChild(cls)
    {
         
        if (ofKind(cls))
            return self;

         
        for (local gi = grammarInfo(), local i = 2, local len = gi.length() ;
             i <= len ; ++i)
        {
             
            local chi = gi[i].findChild(cls);
            if (chi != nil)
                return chi;
        }

         
        return nil;
    }
;

 



























































class CommandProduction: Production
     
    actor_ = nil

     



















    actorPerson = 2
    
     
    build(cmd, np)
    {
         
        if (actor_ != nil)
            cmd.actorPerson = actorPerson;

         



        if (cmd2_ != nil)
        {
             



            cmd.nextTokens = tokenList.sublist(cmd2_.firstTokenIndex);
        }
        else if (conj_ != nil)
        {
             




            cmd.nextTokens = tokenList.sublist(conj_.lastTokenIndex + 1);
        }

         
        inherited(cmd, np);
    }

     
    visitProd(cmd, np, prod)
    {
         
        if (prod == actor_)
            np = cmd.addNounListItem(ActorRole, prod);

         






        if (prod is in (cmd_, actor_, conj_))
        {
             
            if (prod.lastTokenIndex > cmd.tokenLen)
                cmd.tokenLen = prod.lastTokenIndex;

             
            inherited(cmd, np, prod);
        }
    }

     
    noteEndOfSentence(cmd, prod)
    {
         



        if (prod == conj_ || prod.isChildOf(conj_))
            cmd.endOfSentence = true;
    }
;

 






































class NounRole: object
     




    matchProp = nil

     
    npListProp = nil

     
    objListProp = nil

     
    objProp = nil

     
    objMatchProp = nil

     





    isPredicate = true

     



    missingReplyProp = nil

     



    name = ''

     




    order = 1000

     
    all = []

     
    allPredicate = []

     
    construct()
    {
         
        NounRole.all += self;

         
        if (isPredicate)
            NounRole.allPredicate += self;
        
         
        NounRole.all = NounRole.all.sort(nil, { a, b: a.order - b.order });
        NounRole.allPredicate = NounRole.allPredicate.sort(
            nil, { a, b: a.order - b.order });
    }
;

 








DirectObject: NounRole
    matchProp = &dobjMatch
    npListProp = &dobjNPs
    objListProp = &dobjs
    objProp = &dobj
    objMatchProp = &dobjInfo
    missingReplyProp = &dobjReply
    curObjProp = &curDobj
    name = 'dobj'
    order = 1
;

 





IndirectObject: NounRole
    matchProp = &iobjMatch
    npListProp = &iobjNPs
    objListProp = &iobjs
    objProp = &iobj
    objMatchProp = &iobjInfo
    missingReplyProp = &iobjReply
    curObjProp = &curIobj
    name = 'iobj'
    order = 2
;

 







AccessoryObject: NounRole
    matchProp = &accMatch
    npListProp = &accNPs
    objListProp = &accs
    objProp = &acc
    objMatchProp = &accInfo
    missingReplyProp = &accReply
    curObjProp = &curAobj
    name = 'acc'
    order = 3
;

 





ActorRole: NounRole
    npListProp = &actorNPs
    objListProp = &actors
    objProp = &actor
    isPredicate = nil
;


 















































class VerbProduction: Production
     












    priority = 50

     



    isActive = true
    
     
    build(cmd, np)
    {
         
        cmd.action = action;
        cmd.verbProd = self;
        cmd.predPriority = priority;
        cmd.predActive = isActive;;

         
        inherited(cmd, np);

         
        if (missingRole != nil)
            cmd.emptyNounRole(missingRole);
    }

     





    visitProd(cmd, np, prod)
    {
         










        local r;
        if ((r = NounRole.all.valWhich(
            {x: x.matchProp != nil && self.(x.matchProp) == prod})) != nil)
        {
             
            prod.nounPhraseRole = r;

             
            np = prod.addNounListItem(cmd, prod);
        }

         



        prod.build(cmd, np);
    }

     






    answerMissing(cmd, np) { }
;

 












class NounListProduction: Production
     




    visitProd(cmd, np, prod)
    {
         
        if (prod == np2_)
            np = prod.addNounListItem(cmd, prod);

         
        if (prod is in (np1_, np2_))
            np.prod = prod;

         
        inherited(cmd, np, prod);
    }
;

 











class BadListProduction: Production
    build(cmd, np)
    {
         
        cmd.badMulti = getNounPhraseRole();

         
        inherited(cmd, np);
    }
;

 




class ExceptListProduction: Production
     







    build(cmd, np)
    {
         



        qualifiedNP = np;

         




        np = np.addExclusionItem(self);

         
        inherited(cmd, np);
    }

     



    addNounListItem(cmd, prod)
    {
         
        return qualifiedNP.addExclusionItem(prod);
    }

     
    qualifiedNP = nil
;

 













class CoreNounPhraseProduction: Production
    build(cmd, np)
    {
         
        np.coreProd = self;

         
        inherited(cmd, np);
    }
;

 



class EmptyNounProduction: Production
    build(cmd, np)
    {
         
        cmd.emptyNounRole(np.role);
    }
;

 



class NumberNounProduction: Production
     
    npClass = NumberPhrase
;

 



class TopicNounProduction: Production
     
    npClass = TopicPhrase
;

 



class LiteralNounProduction: Production
     
    npClass = LiteralPhrase
;

 




class PronounProduction: Production
     





    build(cmd, np)
    {
         
        np.pronoun = pronoun;

         
        inherited(cmd, np);
    }
;

 





class PossessiveProduction: Production
     





    build(cmd, np)
    {
         



        np = np.addPossessive(self);

         
        np.pronoun = pronoun;

         
        inherited(cmd, np);
    }
;

 











class ContentsQualifierProduction: Production
     





    visitProd(cmd, np, prod)
    {
         



        if (prod == cont_)
            np = np.addContents(prep_.getText(), prod);

         
        inherited(cmd, np, prod);
    }
;
    

 















class LocationalProduction: Production
     





    visitProd(cmd, np, prod)
    {
         



        if (prod == cont_)
        {
             
            np = np.addLocation(locType, prod);

             





            if (prep_ != nil)
                prep_.build(cmd, np);
        }            

         



        if (prod == prep_)
            return;

         
        inherited(cmd, np, prod);
    }

     







    locType = nil
;

 











class LocationPrepProduction: Production
     
    locType = nil

     



    build(cmd, np)
    {
         
        np.locType = locType;
        
         
        inherited(cmd, np);
    }
;    

 













class QuantifierProduction: Production
     





    build(cmd, np)
    {
         
        if (numval != nil)
            np.addQuantifier(numval);

         
        inherited(cmd, np);
    }

     









    visitProd(cmd, np, prod)
    {
         
        if (prod == quant_)
        {
             
            np.addQuantifier(prod.numval);

             
        }
        else
        {
             
            inherited(cmd, np, prod);
        }
    }
;

 





class OrdinalProduction: Production
    build(cmd, np)
    {
         
        np.addOrdinal(ordval);

         



    }
;

 








class MiscWordListProduction: Production
    build(cmd, np)
    {
         
        cmd.noteMiscWords(np);

         
        inherited(cmd, np);
    }
;

 




class OopsProduction: Production
     



    applyCorrection(prod, toks, typoIdx)
    {
         
        local cmd = new OopsCommand();
        prod.build(cmd, nil);
        
         
        oopsTip.makeShown();

         



        return toks.splice(typoIdx, 1, cmd.tokens...);
    }

     
    build(cmd, np)
    {
         
        cmd.tokens += toks_.getTokens();
    }
;

 


class OopsCommand: object
     
    tokens = []
;

 



class DisambigProduction: Production
    addNounListItem(cmd, prod)
    {
         



        return cmd.addDisambigNP(prod);
    }
;

 


property yesOrNoAnswer;
class YesOrNoProduction: Production
    build(cmd, np)
    {
         
        cmd.yesOrNoAnswer = answer;

         
        inherited(cmd, np);
    }
;

 
 






































class Pronoun: object
     












    resolve() { return ante; }

     




    person = 3

     














    setAntecedents(obj){ ante = obj; }

     




    matchObj(obj)
    {
        return !obj.ofKind(Collection) && obj.matchPronoun(self);
    }

     
    ante = []

     



    reflexive = nil

     




    all = []

     
    construct()
    {
         
        local cl = propDefined(&all, 4);

         
        cl.all += self;
    }
;

 
It: Pronoun
;

 
Her: Pronoun
;

 
Him: Pronoun
;

 
Them: Pronoun
     



    matchObj(obj)
    {
        return obj.ofKind(Collection) || obj.matchPronoun(self);
    }
    
    plural = true
;

 

















You: Pronoun
     






    resolve() 
    { 
         



             
        if((libGlobal.curCommand) && (libGlobal.curCommand).actorNPs == [] && (libGlobal.curCommand).actorPerson == 2)
            return [(libGlobal.playerChar)];
        
        return [self]; 
    }

     
    person = 2
;

 


















Yall: Pronoun
    resolve() { return You.resolve(); }
    person = 2
;

 
















Me: Pronoun
     



    resolve() { return [libGlobal.playerChar]; }

     
    person = 1
;

 












Us: Pronoun
    resolve() { return Me.resolve(); }
;


 
















class ReflexivePronoun: Pronoun
     
    construct()
    {
        inherited();
        pronoun.reflexive = self;
    }

     








    resolve() { return pronoun; }

     



    pronoun = nil

     
    person = (pronoun.person)

     




    all = []
;

 
Myself: ReflexivePronoun
    pronoun = Me
;

 
Yourself: ReflexivePronoun
    pronoun = You
;

 
Itself: ReflexivePronoun
    pronoun = It
;

 
Herself: ReflexivePronoun
    pronoun = Her
;

 
Himself: ReflexivePronoun
    pronoun = Him
;

 
Ourselves: ReflexivePronoun
    pronoun = Us
;

 
Yourselves: ReflexivePronoun
    pronoun = Yall
;

 
Themselves: ReflexivePronoun
    pronoun = Them
;


 
 











class Determiner: object;

 
Unqualified: Determiner;

 
Definite: Determiner;

 
Indefinite: Determiner;

 
All: Determiner;


 
 


class ParseError: Exception
     


    display() { "Unknown parsing error."; }

     













    rankCorrection(toks, idx, dict) { return 1; }

     










    allowOnRespell = nil

     











    curable = nil

     














    tryCuring(toks, dict) { return nil; }

     






    errStage = 1
;

 



class NotUnderstoodError: ParseError
    display()
    {
         




        message('not understood', nil);        
    }

     






    rankCorrection(toks, idx, dict)
    {
         
        local txt = ((toks[idx])[1]);

         
        local w = actionDictionary.wordToAction[txt];
        if (w != nil)
        {
             
            local maxAct = w.maxVal({ a: a.spellingPriority });

             





            local xlst = actionDictionary.xwords[txt] - txt;
            local xbonus = (toks.indexWhich(
                { t: xlst.indexOf(((t)[1])) != nil }) != nil);

             



            return 200 + maxAct*2 + (xbonus ? 1 : 0);
        }

         
        w = dict.findWord(txt);
        if (w.indexWhich(
            { x: dataType(x) == 5 && x.ofKind(GrammarProd) }) != nil)
            return 100;

         




        return 1;
    }
;

 



class UnknownWordError: ParseError
    construct(txt)
    {
        self.badWord = txt;
    }

    display()
    {
         







        message('unknown word', nil,badWord);

    }

     
    badWord = nil
;

 


class OopsError: ParseError
;

 



class CantOopsError: OopsError
    display()
    {
         





        message('no oops now', nil);
    }
;


 



class CommandError: ParseError
    construct(cmd)
    {
         
        self.cmd = cmd;
    }

     
    cmd = nil

     




    errStage = 2
;

 






class RejectParseTreeError: CommandError
    display()
    {
         



        "\\n(Internal: Parse tree rejected.)\\n";
    }
;

 




class EmptyNounError: CommandError
    construct(cmd, role)
    {
        inherited(cmd);
        self.role = role;
    }

     
    display()
    {
        askMissingNoun(cmd, role);
    }

     



    tryCuring(toks, dict)
    {
         
        local lst = new CommandList(
            cmd.verbProd.missingRoleProd(role), toks, dict,
            new function(prod)
        {
             
            local newCmd = cmd.clone();
            
             
            newCmd.addNounProd(role, prod);
                        
             
            return newCmd;
        });

         
        lst.acceptCurable();

         
        return lst;
    }

     
    curable = true
;



 




class ResolutionError: ParseError
    construct(np)
    {
         
        inherited();
        
         
        self.np = np;

         
        self.txt = np.errName;
    }

     
    np = nil

     
    txt = nil

     








    rankCorrection(toks, idx, dict)
    {
         
        local disList = [((toks[idx])[1])];

         
        local m = 0;
        foreach (local obj in World.scope())
            m |= obj.matchNameDisambig(disList);

         



        if (m != 0)
        {
            return ((m & 0x0004) != 0 ? 102 :
                    (m & 0x0002) != 0 ? 101 : 100);
        }

         
        local w = dict.findWord(((toks[idx])[1]))
            .subset({ x: dataType(x) == 5 });

        if (w.indexWhich({ x: x.ofKind(GrammarProd) && !x.ofKind(predicate) })
            != nil)
            return 90;

         



        return 0;
    }
;

 





class ActorResolutionError: ResolutionError
    construct(cmd, np)
    {
        inherited(np);
        self.cmd = cmd;
    }

     
    cmd = nil
;

 



class UnmatchedActorError: ResolutionError
    display()
    {
         







        message('unmatched actor', nil,txt);
    }
;

 


class UnmatchedNounError: ActorResolutionError
    display()
    {
         






        message('unmatched noun', nil,cmd, stripArticle(txt));
        
        oopsTip.showTip();
    }
;

 


class PronounError: ResolutionError
    construct(np, pro)
    {
        inherited(np);
        pronoun = pro;
    }

     
    pronoun = nil
;
        

 


class NoAntecedentError: PronounError
    display()
    {
         



        message('no antecedent', nil,np.prod.getText())
;
    }
;


 


class AntecedentScopeError: PronounError
    construct(cmd, np, pro)
    {
        inherited(np, pro);
        self.cmd = cmd;
    }

    cmd = nil

    display()
    {
         



        message('antecedent out of scope', nil,cmd)
;
    }
;


 



class InsufficientNounsError: ActorResolutionError
    display()
    { 
        
        if(cmd.matchedAll)
            
             




            message('nothing suitable for all', nil)
;
        
        else
            
             




            message('not enough nouns', nil,cmd, txt)
;       

    }
;

 



class NoneInOwnerError: ActorResolutionError
    construct(cmd, np, poss)
    {
        inherited(cmd, np);
        possQual = poss;
    }

     
    possQual = nil

    display()
    {
         





        if (possQual.matches.length() != 1)
        {
             








            message('none in owners', nil,cmd, possQual.prod.getText(), txt)
;
        }
        else
        {
             







            local obj = possQual.matches[1].obj;
            ((libGlobal.curAction).setMessageParams('obj', obj));
            
            message('none in owner', nil,cmd,  txt)
;
                      
        }
    }    
    
;

 



class NoneInLocationError: ActorResolutionError
    construct(cmd, np, loc)
    {
        inherited(cmd, np);
        locQual = loc;
    }

     
    locQual = nil
    
    display()
    {
         





        if (locQual.matches.length() !=  1)
        {
             







            message('none in locations', nil,cmd, txt, locQual.locType.prep, locQual.prod.getText())
;
        }
        else
        {
             







            message('none in location', nil,cmd, txt, locQual.locType.prep, locQual.matches[1].obj)

;
        }
    }
;

 



class NoneWithContentsError: ActorResolutionError
    construct(cmd, np, cont)
    {
        inherited(cmd, np);
        contQual = cont;
    }

     
    contQual = nil

    display()
    {
         





        if (contQual.matches.length() != 1)
        {
             








            message('none with contents in list', nil,cmd, txt, contQual.prod.getText())

;
        }
        else
        {
             








            message('none with contents', nil,cmd, txt, contQual.matches[1].obj)

;
        }
    }
;

 


class AmbiguousError: ResolutionError
    construct(cmd, np, names)
    {
        inherited(np);
        self.cmd = cmd;
        self.nameList = names;
    }

    display()
    {
         
        askAmbiguous(cmd, np.role, nameList.mapAll({ n: n[1] }));     
        
    }

     






    allowOnRespell = true


     



    curable = true

     





    tryCuring(toks, dict)
    {
         
        local lst = new CommandList(
            mainDisambigPhrase, toks, dict,
            new function(prod)
            {
                 
                local newCmd = cmd.clone();

                 
                local dnp = newCmd.startDisambigReply(np, prod);

                 
                prod.build(newCmd, dnp);

                 
                return newCmd;
            });

         
        lst.acceptCurable();

         
        return lst;
    }

     
    cmd = nil

     



    nameList = []
;

class AmbiguousMultiDefiniteError: UnmatchedNounError
    display()
    {

        message('be more specific', nil)
;
    }

     




    curable = true
;


 




class OrdinalRangeError: ResolutionError
    construct(np, ordinal)
    {
        inherited(np);
        self.ordinal = ordinal;
    }

    display()
    {
         





        message('ordinal out of range', nil)
;
    }

     
    ordinal = nil
;

class BadMultiError: ParseError
    display() 
    { 
        message('multi not allowed', nil)
; 
    }
;

 
 














dictionaryPlaceholder: object
;



 
class ExitSignal: Exception
;

 
class AbortImplicitSignal: Exception
;

 
class AbortActionSignal: Exception
;

 
class ExitActionSignal: Exception  
;

 
class TerminateCommandException: Exception
;


 






class SpecialVerb: object
     



    specVerb = ''
    
     



    stdVerb = ''
    
     




    matchObjs = nil
    
     



    where = nil
    
     
    during = nil
    
     




     
    when = true

     





    objChecks(dobj, iobj, aobj)
    {
        return true;
    }
    
     





    priority = 100
    
     



    tentativeDobj = nil
    
     




    tentativeDobjList = []
    
    
     
    verbPhrase = (specialVerbMgr.vWords.join())
    
     

     




     
    checkSV(lst, svPhrase)
    {
         
        obj = lst.element(2);
        
         



        if(!matchObjs.indexWhich({x:obj.ofKind(x)}))
           failCheck(svPhrase);
        
         
        customChecks(lst);
    }
    
     



    failCheck(svPhrase)
    {
         
        showFailureMsg(svPhrase);
        
         
        throw new AbortActionSignal();
    }
    
     
    showFailureMsg(svPhrase)
    {
        message('cant do that special', nil);
    }
    
     
    initSpec()
    {
         
        matchObjs = valToList(matchObjs);
        
         



        specVerb = specVerb.toLower();
        
         



        local specVerbs = specVerb.split('|');
        
         



        foreach(local s in specVerbs)
        {    
             



            local sWords = s.split(' ');
            
             
            specialVerbMgr.addToTable(sWords, self); 
            
             





             
            if(sWords.length > specialVerbMgr.maxKeyLen)
                specialVerbMgr.maxKeyLen = sWords.length;
        }       
    }
    
     
    matches(scope_, toks)
    {       
         


        
        score = priority + vocabCheck(scope_, toks);
        
         
        return customChecks();
    }
 
    
     



    vocabCheck(scope_, toks)
    {
         
        scope_ = scope_.toList();
        
         
        local vPhraseLen = specialVerbMgr.vWords.length();
        
         



        local nPhraseToks = toks.sublist(vPhraseLen + 1);
        
         



        local prepTokPos = nPhraseToks.indexWhich({x: prepositions.find(x)});
        
         



        if(prepTokPos)
            nPhraseToks = nPhraseToks.sublist(1, prepTokPos - 1);
        
                 
        nPhraseToks = nPhraseToks.subset({x: articles.find(x) == nil});
        
         
        local scopeMatch = nil;
        
         



        local bestScore = 0;
        
         
        tentativeDobj = nil;
        tentativeDobjList = [];
        
         
        foreach(local obj in matchObjs)
        {            
             
            if(scope_.indexWhich({x: x.ofKind(obj)}))
            {
                 
                scopeMatch = true;
                
                 
                local mScore = obj.matchName(nPhraseToks);
                
                if(mScore)
                {
                     
                    tentativeDobjList += obj;
                    
                     



                    if(mScore > bestScore)
                    {
                        bestScore = mScore;
                        
                        tentativeDobj = obj;
                    }
                }
            }
        }
            
         





        return scopeMatch ? (bestScore * 100) : -500000;           
    }
    
     









    customChecks(lst?)
    {
         



        if(defined(sceneManager) && during && !(valToList(during).indexWhich({x: x.isHappening})))
        {
             



            if(lst)
                return nil;
            else
                score -= 100000;
        }
        
         



        if(where && !valToList(where).indexOf(((libGlobal.curActor).getOutermostRoom)))
             



        {
            if(lst)
                return nil;
            else
                score -= 100000;
        }
        
         
        if(!when)
        {
             



            if(lst)
                return nil;
            else
                score -= 100000;       
        }
        
         



        return lst ? objAfterChecks(lst) : true;
    }
        
     
    objAfterChecks(lst)
    {
         




        return objChecks(lst.element(2), lst.element(3), lst.element(4));
    }
        
     
    score = 0
 
     
    exclusions = []
    
     
    matchExclusions(tokWords)
    {
        
         
        foreach(local ex in exclusions)
        {
             
            local excWords = ex.split(' ');
            
             
            local matched = true;
           
             
            for(local i in 1..excWords.length)
            {
                 




               
                if(i > tokWords.length() || tokWords[i] != excWords[i])
                {
                    matched = nil; 
                    break;                }
                
            }
            
             



            if(matched)
                return true;
        }
        
         



        return nil;
    }
;


 






specialVerbMgr: PreinitObject
    findMatchingSV(toks)
    {
                  
        local tokWords = toks.mapAll({t: t[1].toLower}); 
        
         
        local specs = nil; 
        
         



        for(local klen in maxKeyLen .. 1 step -1)
        {
             
            local ky = tokWords.sublist(1, klen);
            
             
            specs = specTable[ky];
            
             
            specs = valToList(specs).subset({x: !x.matchExclusions(tokWords)});
            
             




            if(valToList(specs).length > 0)
            {
                vWords = ky;
                break;
            }
        }
        
         
        if(specs == nil || specs.length == 0)
            return nil;        
        
         
        local scope_ = Q.scopeList((libGlobal.playerChar));
        
         
        foreach(local s in specs)
            s.matches(scope_, tokWords);
        
         
        local svmatches = specs.sort(true, {a, b: a.score  - b.score });
        
         
        return svmatches[1];                                           
    }
    
     
    vWords = nil
    
    matchSV(toks)
    {
         
        local sv = findMatchingSV(toks);
        
         



        if(sv)
        {              
             



            local nToks = toks.sublist(vWords.length + 1);
            
             


            
            local stdVerbWords = sv.stdVerb.split(' ');
            local stdVerbLen = stdVerbWords.length();
            local vToks = [];
            
             
            for(local i in 1 .. stdVerbLen)
            {
                vToks = vToks.append([stdVerbWords[i], tokWord, stdVerbWords[i]]);                 
            }           
            
             
            toks = vToks + nToks;
            
            
             
            currentSV = sv;
            
        }
        
         
        return toks;
    }
    
     




    checkSV(lst)
    {
        try
        {
             





            if(currentSV)
            {
                currentSV.checkSV(lst, vWords.join(' '));
                
                if(lst[1] == SpecialAction)
                    lst[1].specialPhrase = vWords.join(' ');
            }
        }
        finally
        {
             



            currentSV = nil;
        }
    }
    
     
    currentSV = nil
    
     
    execute()
    {
         
        for(local spec = firstObj(SpecialVerb); spec != nil; spec = nextObj(spec, SpecialVerb))
            spec.initSpec();               
    }

     



    addToTable(s, spec)
    {
         
        local specs = valToList(specTable[s]);
        
         
        specTable[s] = specs + spec;
    }
    
     



    specTable = static new LookupTable
    
       
     



    maxKeyLen = 0
;


 



InitialPunctPreparser:StringPreParser
    doParsing(str, which)
    {
        return str.findReplace(R'^<Punct>+', '');
        
    }    
;
