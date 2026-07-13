



















Narrator: object






























    tense = (gameMain.usePastTense ? Past : Present)
;




class VerbTense: object





    name = nil
;

Present: VerbTense
    name = 'present'
;
Past: VerbTense
    name = 'past'
;
Perfect: VerbTense
    name = 'perfect'
;
PastPerfect: VerbTense
    name = 'past perfect'
;
Future: VerbTense
    name = 'future'
;
FuturePerfect: VerbTense
    name = 'future perfect'
;





























message(id, txt, [args])
    {

        txt = buildMessage(id, txt, args...);






        oSay(txt);
    }







buildMessage(id, txt, [args])
{


    local cm = nil;
    foreach (local c in CustomMessages.all)
    {





        if (c.active && c.msgTab[id] != nil
            && (cm == nil || c.priority > cm.priority))
            cm = c;
    }


    if (DebugCtl.enabled['messages']) { debugMessage(id, txt, cm, args); } else { };


    if (cm != nil)
        txt = cm.msgTab[id];


    if(dataTypeXlat(txt) == 12)
        txt = txt();






    if(dataType(txt) == 10)
    {

        local newArgs = txt.cdr(), tempArgs = [];


        txt = txt[1];


        foreach(local cur in newArgs)
        {

            if(dataTypeXlat(cur) == 12)
                cur = cur();
            tempArgs += cur;
        }


        args = tempArgs;
    }


    local ctx = new MessageCtx(args);





    txt = langAdjust(txt);






    local bar, openBrace = 0, closeBrace = 0, newTxt = txt;
    for(;;)
    {

        openBrace = txt.find('{', closeBrace + 1);


        if(openBrace == nil)
            break;


        bar = txt.find('|', openBrace);


        if(bar == nil)
            break;


        closeBrace = txt.find('}', openBrace);


        if(closeBrace == nil)
            break;







        if(bar > closeBrace)
            continue;





        local pString = txt.substr(openBrace, closeBrace - openBrace + 1);








        local subString = (gameMain.usePastTense || Narrator.tense == Past) ?
            txt.substr(bar + 1, closeBrace - bar - 1) : txt.substr(openBrace +
                1, bar - openBrace - 1);





        newTxt = newTxt.findReplace(pString, subString, 0x0010);

    }


    txt = newTxt;


    bar = txt.find('|');
    if (bar != nil)
    {

        if (ctx.cmd != nil && ctx.cmd.terseOK())
            txt = txt.left(bar - 1);
        else
            txt = txt.substr(bar + 1);
    }


    local mo = MessageParams.langObj;


    for (local i = 1 ; i <= txt.length() ; )
    {

        local eos = txt.find(R'<.|!|?><space>', i) ?? txt.length() + 1;











        ctx.startSentence();
        local plst = new Vector(10);
        for (local j = i ; ; )
        {

            local lb = txt.find('{', j);
            if (lb == nil || lb >= eos)
                break;


            local rb = txt.find('}', lb + 1);
            if (rb == nil)
                break;


            local param = txt.substr(lb + 1, rb - lb - 1);


            param = param.trim().split(' ');






            mo.expand(ctx, param);


            plst.append([lb, rb, param]);


            j = rb + 1;
        }


        ctx.endPreScan();


        local delta = 0;
        for (local j = 1 ; j <= plst.length() ; ++j)
        {

            local cur = plst[j];
            local lb = cur[1], rb = cur[2], param = cur[3];
            local paramLen = rb - lb + 1;


            local sub = mo.expand(ctx, param);






            if (sub.startsWith('\010'))
            {

                local m = lb + delta - 1, spCnt = 0;
                while (m >= 1 && txt.toUnicode(m) == 32)
                    --m, ++spCnt;


                if (spCnt != 0)
                {

                    txt = txt.splice(m + 1, spCnt, '');


                    delta -= spCnt;
                }


                sub = sub.substr(2);
            }



            txt = txt.substr(1, lb + delta -1) + sub + txt.substr(lb + delta
                + paramLen );


            delta += sub.length() - paramLen;
        }


        i = eos + delta + 1;
    }


    return txt;
}







debugMessage(id, txt, cm, args)
{
    if(id is in (nil,'','command results prefix', 'command prompt', 'command results suffix'
)
       || outputManager.curOutputStream != mainOutputStream)
        return;

    local idchk = [id, libGlobal.totalTurns];

    if(DebugCtl.messageIDs[idchk] != nil)
        return;
    else
        DebugCtl.messageIDs[idchk] = true;

    oSay('\nmessage(id=<<id>>, default text=\'<<txt>>\' ');
    if (cm != nil)
        oSay('custom text=\'<<cm.msgTab[id]>>\'');

    if (args.length() != 0)
    {
        oSay(', args={ ');
        for (local i = 1 ; i <= args.length() ; ++i)
        {
            local a = args[i];
            if (i > 1)
                oSay(', ');
            if (dataType(a) == 8)
                oSay(''''<<args[i]>>'''');
            else
                oSay('object(name=<<a.name>>)');
        }
        oSay(' }');
    }
    oSay(')\n');
}









enum vSubject;


enum vObject;





enum vAmbig;


enum vPossessive;












class MessageCtx: object
    construct(args)
    {

        self.args = args;


        cmd = (libGlobal.curCommand);


        if (cmd == nil)
            cmd = messageDummyCommand;
    }


    startSentence()
    {

        subj = nil;
        vobj = nil;
        gotVerb = nil;
        reflexiveAnte.clear();


        prescan = true;


        lastParam = nil;
    }










    endPreScan()
    {






        reflexiveAnte.clear();


        prescan = nil;


        lastParam = nil;
    }






    noteParam(val)
    {

        return lastParam = val;
    }





    paramToString(val)
    {
        switch (dataType(val))
        {
        case 8:
            return val;

        case 7:
            return toString(val);

        case 5:
            if (val.ofKind(Mentionable) || val.ofKind(Pronoun))
                return val.name;
            else if (val.ofKind(List) || val.ofKind(Vector))
                return val.mapAll({ x: paramToString(x) }).join(', ');
            else if (val.ofKind(BigNumber))
                return toString(val);
            else
                return '(object)';

        case true:
            return 'true';

        case nil:
            return '';

        default:
            return '(?)';
        }
    }








    paramToNum(val)
    {
        switch (dataType(val))
        {
        case 8:
            return toInteger(val);

        case 7:
            return val;

        case 5:
            if (val.ofKind(BigNumber))
                return val;
            if (val.ofKind(List) || val.ofKind(Vector))
                return val.length();
            return 1;

        case 10:
            return val.length();

        case nil:
            return 0;

        default:
            return 1;
        }
    }











    noteObj(obj, role)
    {

        noteParam(obj);





        if (role == vAmbig && MessageParams.langObj.sentenceOrder != nil)
        {

            local so = MessageParams.langObj.sentenceOrder;


            local ssv = (so.find(R'S.*V') != nil ? -1 : 1);
            local osv = (so.find(R'O.*V') != nil ? -1 : 1);


            local fo = (so.find(R'S.*O') != nil ? vSubject : vObject);


            local sv = (gotVerb ? 1 : -1);













            if (ssv == sv && osv == sv)
                role = (subj != nil ? vObject :
                        vobj != nil ? vSubject : fo);
            else if (ssv == sv && subj == nil)
                role = vSubject;
            else if (osv == sv && vobj == nil)
                role = vObject;
        }


        if (role == vSubject)
            subj = obj;
        else if (role == vObject)
            vobj = obj;






        if(role != vSubject)
            return;


















        local idx = reflexiveAnte.indexWhich({ o: o.ofKind(Thing) });

        if (idx == nil)
        {







            reflexiveAnte.append(obj);
        }
        else
        {













            reflexiveAnte[idx] = obj;
        }
    }




    noteVerb()
    {

        gotVerb = true;
    }







    lastParamPlural()
    {
        switch (dataType(lastParam))
        {
        case 7:
            return lastParam != 1;

        case 5:
            if (lastParam.ofKind(Mentionable) || lastParam.ofKind(Pronoun))
                return lastParam.plural;
            else if (lastParam.ofKind(List) || lastParam.ofKind(Vector))
                return lastParam.length() != 1;
            else if (lastParam.ofKind(BigNumber))
                return lastParam != 1;
            else
                return nil;

        case 10:
            return lastParam.length() != 1;

        default:
            return nil;
        }
    }







    actorIsPC()
    {
        return cmd == nil || cmd.actor == nil
            || cmd.actor == (libGlobal.playerChar);
    }


    lastParam = nil


    prescan = nil


    subj = nil


    vobj = nil


    gotVerb = nil


    args = nil


    cmd = nil

    sourceProp = nil

    noteSourceProp(prop)
    {
        sourceProp = prop;
    }














    reflexiveAnte = (self.(targetprop) = (new Vector(5)))

    subjPlural()
    {
        if(subj.isGenderNeutral && lastParam.ofKind(Pronoun))
           return true;

        return subj.plural;
    }
;




messageDummyCommand: object

    actor = ((libGlobal.playerChar))

;









dmsg(txt, [args])
{
    message('', txt, args...);
}



bmsg(txt, [args])
{
    return buildMessage('', txt, args...);
}














class CustomMessages: object

















    priority = 200













    active = true














    messages = []





    construct()
    {

        CustomMessages.all += self;


        msgTab = new LookupTable(64, 128);


        for (local i = 1, local len = messages.length() ; i <= len ; i += 2)
            msgTab[messages[i]] = messages[i+1];
    }


    msgTab = nil





    all = []
;











class MessageParams: object









    expand(ctx, params)
    {

        local pname = params[1].trim();


        local forcePresentTense = nil;




        if(pname.right(1) == '!')
        {
            forcePresentTense = true;
            pname = pname.left(-1);
            params[1] = pname;
        }

        local t = paramTab[pname.toLower()];







        local txt = nil;
        if (t != nil)
        {





            if(ctx.subj == nil)
                ctx.subj = dummy_;








            local oldTense = Narrator.propType(&tense) == 11 ? gameMain.usePastTense :
            Narrator.tense;






            if(forcePresentTense)
            {
                if(dataType(&oldTense) == 5)
                    Narrator.tense = Present;
                else
                    gameMain.usePastTense = nil;
            }


            txt = t[2](ctx, params);







            if(forcePresentTense)
            {
                if(dataType(&oldTense) == 5)
                    Narrator.tense = oldTense;
                else
                    gameMain.usePastTense = oldTense;
            }






            if (txt != nil && !ctx.prescan && rexMatch(R'<upper>', pname) != nil)
                txt = txt.firstChar().toUpper() + txt.delFirst();
        }





        if (txt == nil && !ctx.prescan)
            txt = '{' + params.join(' ') + '}';


        return txt;
    }
























    params = [ ]


































    cmdInfo(ctx, src, objProp, role)
    {
        try
        {

            local srcObj = nil;


            if (dataType(src) == 8)
            {

                if (rexMatch(R'<digit>+', src) != nil)
                {

                    src = ctx.args[toInteger(src)];
                }
                else
                {

                    src = findStrParam(src, role);






                    if(src == nil)
                        return nil;

                }

            }


            if (dataType(src) == 6)
                srcObj = ctx.cmd.(src);
            else if (dataType(src) == 5
                     && (src.ofKind(Mentionable) || src.ofKind(Pronoun)
                         || src.ofKind(LiteralObject) ||
                         src.ofKind(ResolvedTopic)))
            {
                srcObj = src;
                ctx.noteSourceProp(objProp);
            }


            if (srcObj != nil && role == vObject && !ctx.prescan)
            {
                local r = cmdInfoReflexive(ctx, srcObj, objProp);
                if (r != nil)
                    return r;
            }


            if (srcObj != nil)
                ctx.noteObj(srcObj, role);






            return ctx.prescan ? nil : srcObj.(objProp);
        }
        catch (Exception e)
        {




            return nil;
        }
    }

    findStrParam(src, role)
    {
        local targetObj;

        if ((libGlobal.curAction) != nil)
        {

            targetObj = (libGlobal.curAction).getMessageParam(src);
        }
        else
        {

            targetObj = nil;
        }

        if (targetObj == nil)
        {

            targetObj = libGlobal.nameTable_[src];





            if (dataTypeXlat(targetObj) == 12)
            {

                targetObj = (targetObj)();
            }
        }






        if (targetObj == nil && role != nil)
        {

            local role = NounRole.all.valWhich({ r: r.name == src });


            if(role != nil)
               targetObj = role.objProp;
        }










        if(targetObj == nil)
        {
            targetObj = dummy_;
            dummy_.noteName('[' + src + ']');
        }


        return targetObj;
    }





    paramTab = nil


    langObj = nil


    construct()
    {

        MessageParams.langObj = self;


        paramTab = new LookupTable(64, 128);
        foreach (local p in params)
            paramTab[p[1]] = p;
    }
;



dummy_: Thing
    noteName(src) { }
;

pluralDummy_: Thing
    noteName(src) { }
;




