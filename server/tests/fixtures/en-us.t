modify GameInfoModuleID
    languageCode = 'en-US'
;

yesOrNo()
{
     
    "<.commandnone>";
        local str = inputManager.getInputLine(nil, nil);

    "<.commandmid>";
        return rexMatch('<space>*[yY]', str) != nil;
}
PreinitObject
    execute()
    {
         
        languageGlobals.setStringComparator(
            new StringComparator(gameMain.parserTruncLength, nil, []));
    }

    execAfterMe = [adv3LibPreinit]
;

 

languageGlobals: object
     
         setStringComparator(sc)
    {
         
        dictComparator = sc;
        cmdDict.setComparator(sc);
    }
        digitGroupSeparator = ','
        decimalPointCharacter = '.'

    dictComparator = nil
;

modify GameMainDef

    parserTruncLength = 6

    usePastTense = nil
;

 
 

modify ThingState
    stateTokens = []

    matchName(obj, origTokens, adjustedTokens, states)
    {
         
        for (local i = 1, local len = adjustedTokens.length() ;
             i <= len ; i += 2)
        {
             
            local cur = adjustedTokens[i];


            if (stateTokens.indexWhich({t: t == cur}) != nil)
                continue;

                            if (states.indexWhich(
                {s: s.stateTokens.indexOf(cur) != nil}) != nil)
                return nil;
        }

        return obj;
    }
        findStateToken(toks)
    {
         
                 for (local i = 1, local len = toks.length() ; i <= len ; i += 2)
        {
             
                         if (stateTokens.indexWhich({x: x == toks[i]}) != nil)
                return true;
        }

        return nil;
    }

    listName(lst) { return listName_; }
        listName_ = nil
;

 

modify VocabObject

    vocabWords = ''

        construct()
    {
         
        initializeVocab();

        addToDictionary(&noun);
        addToDictionary(&adjective);
        addToDictionary(&plural);
        addToDictionary(&adjApostS);
        addToDictionary(&literalAdjective);
    }

    addToDictionary(prop)
    {
         
        if (self.(prop) != nil)
            cmdDict.addWord(self, self.(prop), prop);
    }

    initializeVocab()
    {
         
        inheritVocab(self, new Vector(10));
    }
        inheritVocab(target, done)
    {
         
                 if (done.indexOf(self) != nil)
            return;

        done.append(self);


        if (propDefined(&vocabWords, 2))
            target.initializeVocabWith(vocabWords);

        foreach (local sc in getSuperclassList())
            sc.inheritVocab(target, done);
    }
        initializeVocabWith(str)
    {
        local sectPart;
        local modList = [];

        sectPart = &adjective;

        while (str != '')
        {
            local len;
            local cur;


            if (str.startsWith('"'))
            {
                 
                len = str.find('"', 2);
            }
            else
            {
                 
                len = rexMatch('<^space|star|/>*', str);
            }

            if (len == nil)
                len = str.length();

            if (len != 0)
            {
                 
                cur = str.substr(1, len);


                if (sectPart == &adjective
                    && (len == str.length()
                        || str.substr(len + 1, 1) != ' '))
                {
                     
                    sectPart = &noun;
                }

                                if (cur != '-')
                {
                     

                    local wordPart = sectPart;


                    if (cur.startsWith('(') && cur.endsWith(')'))
                    {
                         
                        cur = cur.substr(2, cur.length() - 2);

                                                if (weakTokens == nil)
                            weakTokens = [];

                        weakTokens += cur;
                    }


                    if (cur.startsWith('"'))
                    {
                        if (cur.endsWith('"'))
                            cur = cur.substr(2, cur.length() - 2);
                        else
                            cur = cur.substr(2);

                        wordPart = &literalAdjective;
                    }
                    else if (cur.endsWith('\'s'))
                    {
                        wordPart = &adjApostS;

                        cur = cur.substr(1, cur.length() - 2);
                    }

                    if (self.(wordPart) == nil)
                        self.(wordPart) = [cur];
                    else
                        self.(wordPart) += cur;

                    cmdDict.addWord(self, cur, wordPart);
                                        if (cur.endsWith('.'))
                    {
                        local abbr;


                        abbr = cur.substr(1, cur.length() - 1);
                        self.(wordPart) += abbr;
                        cmdDict.addWord(self, abbr, wordPart);
                    }

                    if (modList.indexOf(wordPart) == nil)
                        modList += wordPart;
                }
            }

            if (len + 1 < str.length())
            {
                 
                switch(str.substr(len + 1, 1))
                {
                case ' ':
                     
                    break;
                                    case '*':
                     
                    sectPart = &plural;
                    break;
                                    case '/':
                     
                    sectPart = &noun;
                    break;
                }

                str = str.substr(len + 2);

                if ((len = rexMatch('<space>+', str)) != nil)
                    str = str.substr(len + 1);
            }
            else
            {
                 
                break;
            }
        }

        foreach (local p in modList)
            self.(p) = self.(p).getUnique();
    }
;
modify Thing
    isPlural = nil

    isMassNoun = nil

    isHim = nil
    isHer = nil
        isIt
    {
         
        return !(isHim || isHer);
    }

    canMatchHim = (isHim)
    canMatchHer = (isHer)
    canMatchIt = (isIt)
    canMatchThem = (isPlural)

    canMatchPronounType(typ)
    {
         
        switch (typ)
        {
        case PronounHim:
            return canMatchHim;
                    case PronounHer:
            return canMatchHer;
                    case PronounIt:
            return canMatchIt;
                    case PronounThem:
            return canMatchThem;
                    default:
            return nil;
        }
    }
        listCardinality(lister) { return isPlural ? 2 : 1; }

    isProperName = nil
        isQualifiedName = (isProperName)
        name = ''
        disambigName = (name)

    equivalenceKey = (disambigName)

    theDisambigName = (name == disambigName
                       ? theName : theNameFrom(disambigName))

                           aDisambigName = (name == disambigName ? aName : aNameFrom(disambigName))

                           countDisambigName(cnt)
    {
        return (name == disambigName && pluralName == pluralDisambigName
                ? countName(cnt)
                : countNameFrom(cnt, disambigName, pluralDisambigName));
    }

        pluralDisambigName = (name == disambigName
                          ? pluralName : pluralNameFrom(disambigName))
                              disambigEquivName = (disambigName)
                              listName = (aName)

    countName(count) { return countNameFrom(count, name, pluralName); }

        countNameFrom(count, singularStr, pluralStr)
    {
         
        if (count == 1)
            return 'one ' + singularStr;


        return spellIntBelowExt(count, 100, 0, 0x0001)
            + ' ' + pluralStr;
    }

    pronounSelector = (isPlural ? 4 : isHer ? 3 : isHim ? 2 : 1)
        itNom { return ['it', 'he', 'she', 'they'][pronounSelector]; }
    itObj { return ['it', 'him', 'her', 'them'][pronounSelector]; }
    itPossAdj { return ['its', 'his', 'her', 'their'][pronounSelector]; }
    itPossNoun { return ['its', 'his', 'hers', 'theirs'][pronounSelector]; }

    itReflexive
    {
        return ['itself', 'himself', 'herself', 'themselves']
               [pronounSelector];
    }

    thatNom { return ['that', 'he', 'she', 'those'][pronounSelector]; }
    thatIsContraction
    {
        return thatNom + (gameMain.usePastTense ? (' ' + verbToBe) : (isPlural ? ' are' : '&rsquo;s'));
    }
    thatObj { return ['that', 'him', 'her', 'those'][pronounSelector]; }

        itIs { return itNom + ' ' + verbToBe; }

    itIsContraction
    {
        return itNom
            + (gameMain.usePastTense ? (' ' + verbToBe) : (isPlural ? '&rsquo;re' : '&rsquo;s'));
    }
        itVerb(verb)
    {
        return itNom + ' ' + conjugateRegularVerb(verb);
    }

    conjugateRegularVerb(verb)
    {
         

        if (gameMain.usePastTense)
        {
             

            if (verb.endsWith('e')) return verb + 'd';


            else if (rexMatch(iesEndingPat, verb))
                    return verb.substr(1, verb.length() - 1) + 'ied';


            else return verb + 'ed';
        }
        else
        {
            if (isPlural)
            {
                                 return verb;
            }
            else
            {
                 

                if (rexMatch(iesEndingPat, verb))
                    return verb.substr(1, verb.length() - 1) + 'ies';
                else if (rexMatch(esEndingPat, verb))
                    return verb + 'es';
                else
                    return verb + 's';
            }
        }
    }

    iesEndingPat = static new RexPattern('.*[^aeiou]y$')
    esEndingPat = static new RexPattern('.*(o|ch|sh)$')
        theName = (theNameFrom(name))
        theNameObj { return theName; }
        theNameFrom(str) { return (isQualifiedName ? '' : 'the ') + str; }
        theNamePossAdj
    {
         
        return theName
            + (isPlural && theName.endsWith('s') ? '&rsquo;' : '&rsquo;s');
    }

    theNamePossNoun = (theNamePossAdj)
        theNameWithOwner()
    {
        local owner;

                if ((owner = getNominalOwner()) != nil)
            return owner.theNamePossAdj + ' ' + name;
        else
            return theName;
    }
        objInPrep = 'in'

    actorInPrep = (objInPrep)

    actorOutOfPrep = 'out of'

    actorIntoPrep
    {
        if (actorInPrep is in ('in', 'on'))
            return actorInPrep + 'to';
        else
            return actorInPrep;
    }

        actorInName = (actorInPrep + ' ' + theNameObj)
    actorInAName = (actorInPrep + ' ' + aNameObj)
    actorOutOfName = (actorOutOfPrep + ' ' + theNameObj)
    actorIntoName = (actorIntoPrep + ' ' + theNameObj)
        inRoomName(pov) { return actorInName; }
        putInName() { return (libGlobal.libMessageObj).(putDestMessage)(self); }
        childInName(childName)
        { return childInNameGen(childName, theName); }

    childInNameWithOwner(childName)
        { return childInNameGen(childName, theNameWithOwner); }

            childInRemoteName(childName, pov)
        { return childInNameGen(childName, inRoomName(pov)); }

    childInNameGen(childName, myName)
        { return childName + ' ' + objInPrep + ' ' + myName; }

    aNameOwnerLoc(ownerPriority)
    {
        local owner;

        if ((owner = getNominalOwner()) != nil
            && (ownerPriority || isDirectlyIn(owner)))
        {
            local ret;

                        ret = owner.theNamePossAdj + ' ' + pluralName;
            if (!isMassNoun && !isPlural)
                ret = 'one of ' + ret;

            return ret;
        }
        else
        {
             
            return location.childInNameWithOwner(aName);
        }
    }
    theNameOwnerLoc(ownerPriority)
    {
        local owner;

        if ((owner = getNominalOwner()) != nil
            && (ownerPriority || isDirectlyIn(owner)))
        {
             
            return owner.theNamePossAdj + ' ' + name;
        }
        else
        {
             
            return location.childInNameWithOwner(theName);
        }
    }
    countNameOwnerLoc(cnt, ownerPriority)
    {
        local owner;

        if ((owner = getNominalOwner()) != nil
            && (ownerPriority || isDirectlyIn(owner)))
        {
             
            return owner.theNamePossAdj + ' ' + countName(cnt);
        }
        else
        {
             
            return location.childInNameWithOwner('the ' + countName(cnt));
        }
    }
        notePromptByOwnerLoc(ownerPriority)
    {
        local owner;

        if ((owner = getNominalOwner()) != nil
            && (ownerPriority || isDirectlyIn(owner)))
        {
             
            owner.notePromptByPossAdj();
        }
    }

    notePromptByPossAdj()
    {
        if (isHim)
            (libGlobal.playerChar).setHim(self);
        if (isHer)
            (libGlobal.playerChar).setHer(self);
    }
        aName = (aNameFrom(name))

    aNameObj { return aName; }
        aNameFrom(str)
    {
         
        local inStr = str;


        local vowels = '8aeiou\u00E0\u00E1\u00E2\u00E3\u00E4\u00E5\u00E6'
                       + '\u00E8\u00E9\u00EA\u00EB\u00EC\u00ED\u00EE\u00EF'
                       + '\u00F2\u00F3\u00F4\u00F5\u00F6\u00F8\u00F9\u00FA'
                       + '\u00FB\u00FC\u0101\u0103\u0105\u0113\u0115\u0117'
                       + '\u0119\u011B\u0129\u012B\u012D\u012F\u014D\u014F'
                       + '\u0151\u0169\u016B\u016D\u016F\u0171\u0173\u01A1'
                       + '\u01A3\u01B0\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8'
                       + '\u01DA\u01DC\u01DF\u01E1\u01E3\u01EB\u01ED\u01FB'
                       + '\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B'
                       + '\u020D\u020F\u0215\u0217\u0254\u025B\u0268\u0289'
                       + '\u1E01\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E2D\u1E2F'
                       + '\u1E4D\u1E4F\u1E51\u1E53\u1E73\u1E75\u1E77\u1E79'
                       + '\u1E7B\u1E9A\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB'
                       + '\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB'
                       + '\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB'
                       + '\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB'
                       + '\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB'
                       + '\u1EED\u1EEF\u1EF1\uFF41\uFF4F\uFF55';

                               local vowelsUpperOnly = '\u0130\u019f';

                               local ys = 'y\u00FD\u00FF\u0177\u01B4\u1E8F\u1E99\u1EF3'
                   + '\u1EF5\u1EF7\u1EF9\u24B4\uFF59';

        if (isQualifiedName)
            return str;

        if (isPlural || isMassNoun)
        {
             
            return 'some ' + str;
        }
        else
        {
            local firstChar;
            local firstCharLower;

            if (inStr == '')
                return 'a';

            firstChar = inStr.substr(1, 1);

            if (rexMatch(patTagOrQuoteChar, firstChar) != nil)
            {
                 
                                 local len = rexMatch(patLeadingTagOrQuote, inStr);

                if (len != nil)
                {
                     
                    inStr = inStr.substr(len + 1);

                    firstChar = inStr.substr(1, 1);
                }
            }

            firstCharLower = firstChar.toLower();

                        if (rexMatch(patOneLetterWord, inStr) != nil)
            {
                 

                return (rexMatch(patOneLetterAnWord, inStr) != nil
                        ? 'an ' : 'a ') + str;
            }


            if (vowels.find(firstCharLower) != nil
                || vowelsUpperOnly.find(firstChar) != nil)
            {
                 
                return 'an ' + str;
            }
            else if (ys.find(firstCharLower) != nil)
            {
                local secondChar;

                secondChar = inStr.substr(2, 1);


                if (secondChar == ''
                    || rexMatch(patIsAlpha, secondChar) == nil
                    || vowels.find(secondChar.toLower()) != nil
                    || vowelsUpperOnly.find(secondChar) != nil)
                {
                     

                    return 'a ' + str;
                }
                else
                {
                     
                    return 'an ' + str;
                }
            }
            else if (rexMatch(patElevenEighteen, inStr) != nil)
            {
                 
                                 return 'an ' + str;
            }
            else
            {
                 
                return 'a ' + str;
            }
        }
    }

    patTagOrQuoteChar = static new RexPattern('[<"\']')
    patLeadingTagOrQuote = static new RexPattern(
        '(<langle><^rangle>+<rangle>|"|\')+')
    patOneLetterWord = static new RexPattern('<alpha>(<^alpha>|$)')
    patOneLetterAnWord = static new RexPattern('<nocase>[aefhilmnorsx]')
    patIsAlpha = static new RexPattern('<alpha>')
    patElevenEighteen = static new RexPattern('1[18](<^digit>|$)')

    pluralName = (pluralNameFrom(name))

    pluralNameFrom(str)
    {
        local len;
        local lastChar;
        local lastPair;

                if (isPlural)
            return str;

        if (rexMatch(patOfPhrase, str) != nil)
        {
            local ofSuffix;


            str = rexGroup(1)[3];
            ofSuffix = rexGroup(2)[3];

                        return pluralNameFrom(str) + ofSuffix;
        }

        len = str.length();
        if (len == 0)
            return '';


        if (len == 1)
        {
            if (rexMatch(patSingleApostropheS, str) != nil)
                return str + '&rsquo;s';
            else
                return str + 's';
        }

        lastChar = str.substr(len, 1);
        lastPair = (len == 1 ? lastChar : str.substr(len - 1, 2));

                if (rexMatch(patUpperOrDigit, lastChar) != nil)
            return str + 's';


        if (lastChar == '.')
            return str + '&rsquo;s';

                    if (rexMatch(patVowelY, lastPair) != nil)
            return str.substr(1, len - 1) + 'ies';

        if ('sxzh'.find(lastChar) != nil)
            return str + 'es';

        return str + 's';
    }

    patSingleApostropheS = static new RexPattern('<case><lower|A|E|I|M|U|V>')
    patUpperOrDigit = static new RexPattern('<upper|digit>')
    patVowelY = static new RexPattern('[^aeoiu]y')
    patOfPhrase = static new RexPattern(
        '<nocase>(.+?)(<space>+of<space>+.+)')

    nameIs { return theName + ' ' + verbToBe; }

    nameIsnt { return nameIs + 'n&rsquo;t'; }
        nameVerb(verb) { return theName + ' ' + conjugateRegularVerb(verb); }

    verbToBe
    {
        return (gameMain.usePastTense ? (isPlural ? 'were' : 'was') : (isPlural ? 'are' : 'is'));
    }

    verbWas { return (gameMain.usePastTense ? ('had been') : (isPlural ? 'were' : 'was')); }

    verbToHave { return (gameMain.usePastTense ? ('had') : (isPlural ? 'have' : 'has')); }

        verbToDo = ((gameMain.usePastTense ? ('did') : ('do' + verbEndingEs)))
    nameDoes = (theName + ' ' + verbToDo)
    verbToGo = ((gameMain.usePastTense ? ('went') : ('go' + verbEndingEs)))
    verbToCome = ((gameMain.usePastTense ? ('came') : ('come' + verbEndingS)))
    verbToLeave = ((gameMain.usePastTense ? ('left') : ('leave' + verbEndingS)))
    verbToSee = ((gameMain.usePastTense ? ('saw') : ('see' + verbEndingS)))
    nameSees = (theName + ' ' + verbToSee)
    verbToSay = ((gameMain.usePastTense ? ('said') : ('say' + verbEndingS)))
    nameSays = (theName + ' ' + verbToSay)
    verbMust = ((gameMain.usePastTense ? ('had to') : ('must')))
    verbCan = ((gameMain.usePastTense ? ('could') : ('can')))
    verbCannot = ((gameMain.usePastTense ? ('could not') : ('cannot')))
    verbCant = ((gameMain.usePastTense ? ('couldn&rsquo;t') : ('can&rsquo;t')))
    verbWill = ((gameMain.usePastTense ? ('would') : ('will')))
    verbWont = ((gameMain.usePastTense ? ('wouldn&rsquo;t') : ('won&rsquo;t')))

    verbEndingS { return isPlural ? '' : 's'; }
    verbEndingSD = ((gameMain.usePastTense ? ('d') : (verbEndingS)))
    verbEndingSEd = ((gameMain.usePastTense ? ('ed') : (verbEndingS)))
    verbEndingSMessageBuilder_ =
        ((gameMain.usePastTense ? (langMessageBuilder.pastEnding_) : (verbEndingS)))

            verbEndingEs { return (gameMain.usePastTense ? ('ed') : (isPlural ? '' : 'es')); }
    verbEndingIes { return (gameMain.usePastTense ? ('ied') : (isPlural ? 'y' : 'ies')); }
        dummyName = ''
        propWithPresent(prop, [args])
    {
        return (withTense(nil, ({: self.(prop)(args...)})));
    }

    propWithPresentMessageBuilder_
    {
        return propWithPresent(langMessageBuilder.fixedTenseProp_);
    }

         propertyset '*DobjStrike' {         preCond { return preCondDobjAttack; }         verify() { verifyDobjAttack; }         remap() { return remapDobjAttack; }         check() { checkDobjAttack; }         action() { actionDobjAttack; }     }
;

class NameAsOther: object
     
    targetObj = nil

    isPlural = (targetObj.isPlural)
    isMassNoun = (targetObj.isMassNoun)
    isHim = (targetObj.isHim)
    isHer = (targetObj.isHer)
    isIt = (targetObj.isIt)
    isProperName = (targetObj.isProperName)
    isQualifiedName = (targetObj.isQualifiedName)
    name = (targetObj.name)

    disambigName = (targetObj.disambigName)
    theDisambigName = (targetObj.theDisambigName)
    aDisambigName = (targetObj.aDisambigName)
    countDisambigName(cnt) { return targetObj.countDisambigName(cnt); }
    disambigEquivName = (targetObj.disambigEquivName)
    listName = (targetObj.listName)
    countName(cnt) { return targetObj.countName(cnt); }

    itNom = (targetObj.itNom)
    itObj = (targetObj.itObj)
    itPossAdj = (targetObj.itPossAdj)
    itPossNoun = (targetObj.itPossNoun)
    itReflexive = (targetObj.itReflexive)
    thatNom = (targetObj.thatNom)
    thatObj = (targetObj.thatObj)
    thatIsContraction = (targetObj.thatIsContraction)
    itIs = (targetObj.itIs)
    itIsContraction = (targetObj.itIsContraction)
    itVerb(verb) { return targetObj.itVerb(verb); }
    conjugateRegularVerb(verb)
        { return targetObj.conjugateRegularVerb(verb); }
    theName = (targetObj.theName)
    theNameObj = (targetObj.theNameObj)
    theNamePossAdj = (targetObj.theNamePossAdj)
    theNamePossNoun = (targetObj.theNamePossNoun)
    theNameWithOwner = (targetObj.theNameWithOwner)
    aNameOwnerLoc(ownerPri)
        { return targetObj.aNameOwnerLoc(ownerPri); }
    theNameOwnerLoc(ownerPri)
        { return targetObj.theNameOwnerLoc(ownerPri); }
    countNameOwnerLoc(cnt, ownerPri)
        { return targetObj.countNameOwnerLoc(cnt, ownerPri); }
    notePromptByOwnerLoc(ownerPri)
        { targetObj.notePromptByOwnerLoc(ownerPri); }
    notePromptByPossAdj()
        { targetObj.notePromptByPossAdj(); }
    aName = (targetObj.aName)
    aNameObj = (targetObj.aNameObj)
    pluralName = (targetObj.pluralName)
    nameIs = (targetObj.nameIs)
    nameIsnt = (targetObj.nameIsnt)
    nameVerb(verb) { return targetObj.nameVerb(verb); }
    verbToBe = (targetObj.verbToBe)
    verbWas = (targetObj.verbWas)
    verbToHave = (targetObj.verbToHave)
    verbToDo = (targetObj.verbToDo)
    nameDoes = (targetObj.nameDoes)
    verbToGo = (targetObj.verbToGo)
    verbToCome = (targetObj.verbToCome)
    verbToLeave = (targetObj.verbToLeave)
    verbToSee = (targetObj.verbToSee)
    nameSees = (targetObj.nameSees)
    verbToSay = (targetObj.verbToSay)
    nameSays = (targetObj.nameSays)
    verbMust = (targetObj.verbMust)
    verbCan = (targetObj.verbCan)
    verbCannot = (targetObj.verbCannot)
    verbCant = (targetObj.verbCant)
    verbWill = (targetObj.verbWill)
    verbWont = (targetObj.verbWont)
        verbEndingS = (targetObj.verbEndingS)
    verbEndingSD = (targetObj.verbEndingSD)
    verbEndingSEd = (targetObj.verbEndingSEd)
    verbEndingEs = (targetObj.verbEndingEs)
    verbEndingIes = (targetObj.verbEndingIes)
;

class NameAsParent: NameAsOther
    targetObj = (lexicalParent)
;

class ChildNameAsOther: object
    objInPrep = (targetObj.objInPrep)
    actorInPrep = (targetObj.actorInPrep)
    actorOutOfPrep = (targetObj.actorOutOfPrep)
    actorIntoPrep = (targetObj.actorIntoPrep)
    childInName(childName) { return targetObj.childInName(childName); }
    childInNameWithOwner(childName)
        { return targetObj.childInNameWithOwner(childName); }
    childInNameGen(childName, myName)
        { return targetObj.childInNameGen(childName, myName); }
    actorInName = (targetObj.actorInName)
    actorOutOfName = (targetObj.actorOutOfName)
    actorIntoName = (targetObj.actorIntoName)
    actorInAName = (targetObj.actorInAName)
;

 
 

modify Surface
     
         objInPrep = 'on'
    actorInPrep = 'on'
    actorOutOfPrep = 'off of'
;
modify Underside
    objInPrep = 'under'
    actorInPrep = 'under'
    actorOutOfPrep = 'from under'
;
modify RearContainer
    objInPrep = 'behind'
    actorInPrep = 'behind'
    actorOutOfPrep = 'from behind'
;

modify Actor
     
    name = (itNom)
        pronounSelector
    {
        return ((referralPerson - 1)*4
                + (isPlural ? 4 : isHim ? 2 : isHer ? 3 : 1));
    }
        conjugationSelector
    {
        return (referralPerson + (isPlural ? 3 : 0));
    }
        itNom
    {
        return ['I', 'I', 'I', 'we',
               'you', 'you', 'you', 'you',
               'it', 'he', 'she', 'they'][pronounSelector];
    }
    itObj
    {
        return ['me', 'me', 'me', 'us',
               'you', 'you', 'you', 'you',
               'it', 'him', 'her', 'them'][pronounSelector];
    }
    itPossAdj
    {
        return ['my', 'my', 'my', 'our',
               'your', 'your', 'your', 'your',
               'its', 'his', 'her', 'their'][pronounSelector];
    }
    itPossNoun
    {
        return ['mine', 'mine', 'mine', 'ours',
               'yours', 'yours', 'yours', 'yours',
               'its', 'his', 'hers', 'theirs'][pronounSelector];
    }
    itReflexive
    {
        return ['myself', 'myself', 'myself', 'ourselves',
               'yourself', 'yourself', 'yourself', 'yourselves',
               'itself', 'himself', 'herself', 'themselves'][pronounSelector];
    }

    thatNom
    {
        return ['I', 'I', 'I', 'we',
               'you', 'you', 'you', 'you',
               'that', 'he', 'she', 'those'][pronounSelector];
    }

    thatObj
    {
        return ['me', 'me', 'me', 'us',
               'you', 'you', 'you', 'you',
               'that', 'him', 'her', 'those'][pronounSelector];
    }

    thatIsContraction
    {
        return thatNom
            + (gameMain.usePastTense ? (' ' + verbToBe) : (['&rsquo;m', '&rsquo;re', '&rsquo;s',                     '&rsquo;re', '&rsquo;re', ' are'][conjugationSelector]))
            ;
    }

    itIsContraction
    {
        return itNom + (gameMain.usePastTense ? (' ' + verbToBe) : ('&rsquo;'             + ['m', 're', 's', 're', 're', 're'][conjugationSelector]))

;
    }
        conjugateRegularVerb(verb)
    {
         

        if (referralPerson != 3 && !gameMain.usePastTense)
        {
             
                         return verb;
        }
        else
        {
             
                         return inherited(verb);
        }
    }
        theName
        { return (referralPerson == 3 ? inherited : itNom); }

    theNameObj
        { return (referralPerson == 3 ? inherited : itObj); }

    theNamePossAdj
        { return (referralPerson == 3 ? inherited : itPossAdj); }

    theNamePossNoun
    { return (referralPerson == 3 ? inherited : itPossNoun); }

        aName { return (referralPerson == 3 ? inherited : itNom); }

    aNameObj { return (referralPerson == 3 ? inherited : itObj); }

    verbToBe
    {
        return (gameMain.usePastTense ? (['was', 'were', 'was', 'were', 'were', 'were']) : (['am', 'are', 'is', 'are', 'are', 'are']))
                       [conjugationSelector];
    }

    verbWas
    {
        return (gameMain.usePastTense ? ('had been') : (['was', 'were', 'was', 'were', 'were', 'were']                     [conjugationSelector]))
;
    }

    verbToHave
    {
        return (gameMain.usePastTense ? ('had') : (['have', 'have', 'has', 'have', 'have', 'have']                     [conjugationSelector]))
;
    }

        verbEndingS
    {
        return ['', '', 's', '', '', ''][conjugationSelector];
    }
    verbEndingEs
    {
        return (gameMain.usePastTense ? ('ed') : (['', '', 'es', '', '', ''][conjugationSelector]));
    }
    verbEndingIes
    {
        return (gameMain.usePastTense ? ('ied') : (['y', 'y', 'ies', 'y', 'y', 'y'][conjugationSelector]))
;
    }

    nameIsnt
    {
        return conjugationSelector == 1 && !gameMain.usePastTense
            ? 'I&rsquo;m not' : inherited;
    }
        travelerName(arriving)
        { say((libGlobal.playerChar).hasSeen(self) ? theName : aName); }
            canMatchHim = (inherited && canMatch3rdPerson)
    canMatchHer = (inherited && canMatch3rdPerson)
    canMatchIt = (inherited && canMatch3rdPerson)
    canMatchThem = (inherited && canMatch3rdPerson)
        canMatch3rdPerson = (!isPlayerChar || referralPerson == 3)

    setPronoun(lst)
    {
         
        if (lst == [])
            return;


        if (lst.length() > 1)
        {
            local objs = lst.mapAll({x: x.obj_});

            setThem(objs);

            setIt(nil);
        }
        else if (lst.length() == 1)
        {
             
                         setPronounObj(lst[1].obj_);
        }
    }
        setPronounMulti([args])
    {
        local lst, subLst;
        local gotThem;

                if ((lst = args.valWhich({x: x.length() > 1})) != nil)
        {
             
            setPronoun(lst);

            gotThem = true;
        }

        args = args.subset({x: x.length() == 1});

        lst = args.mapAll({x: x[1].obj_});


        if ((subLst = lst.subset({x: x.canMatchIt})).length() > 0)
            setIt(subLst);
        if ((subLst = lst.subset({x: x.canMatchHim})).length() > 0)
            setHim(subLst);
        if ((subLst = lst.subset({x: x.canMatchHer})).length() > 0)
            setHer(subLst);

                    if (!gotThem
            && (subLst = lst.subset({x: x.canMatchThem})).length() > 0)
            setThem(subLst);
    }
        setPronounByType(typ, lst)
    {
         
        if (typ == PronounThem)
        {
             
            setPronounAntecedent(typ, lst.mapAll({x: x.obj_}));
        }
        else
        {
             
            setPronounAntecedent(typ, lst[1].obj_);
        }
    }

        setPronounObj(obj)
    {
         

        obj = obj.getIdentityObject();


         
        if (obj.canMatchHim)
            setHim(obj);

        if (obj.canMatchHer)
            setHer(obj);

        if (obj.canMatchIt)
            setIt(obj);

        if (obj.canMatchThem)
            setThem([obj]);
    }

    setPossAnaphorObj(obj)
    {
         
        if (obj.canMatchHim)
            possAnaphorTable[PronounHim] = obj;
        if (obj.canMatchHer)
            possAnaphorTable[PronounHer] = obj;
        if (obj.canMatchIt)
            possAnaphorTable[PronounIt] = obj;
        if (obj.canMatchThem)
            possAnaphorTable[PronounThem] = [obj];
    }
;
modify Posture

    msgVerbI = ((gameMain.usePastTense ? (msgVerbIPast) : (msgVerbIPresent)))
    msgVerbT = ((gameMain.usePastTense ? (msgVerbTPast) : (msgVerbTPresent)))









    
;
modify standing
    msgVerbIPresent = 'stand{s} up'
    msgVerbIPast = 'stood up'
    msgVerbTPresent = 'stand{s}'
    msgVerbTPast = 'stood'
    participle = 'standing'
;
modify sitting
    msgVerbIPresent = 'sit{s} down'
    msgVerbIPast = 'sat down'
    msgVerbTPresent = 'sit{s}'
    msgVerbTPast = 'sat'
    participle = 'sitting'
;
modify lying
    msgVerbIPresent = 'lie{s} down'
    msgVerbIPast = 'lay down'
    msgVerbTPresent = 'lie{s}'
    msgVerbTPast = 'lay'
    participle = 'lying'
;
modify SuggestedAskTopic
    fullName = ('ask {it targetActor/him} about ' + name)
;
modify SuggestedTellTopic
    fullName = ('tell {it targetActor/him} about ' + name)
;
modify SuggestedAskForTopic
    fullName = ('ask {it targetActor/him} for ' + name)
;
modify SuggestedGiveTopic
    fullName = ('give {it targetActor/him} ' + name)
;
modify SuggestedShowTopic
    fullName = ('show {it targetActor/him} ' + name)
;
modify SuggestedYesTopic
    name = 'yes'
    fullName = 'say yes'
;
modify SuggestedNoTopic
    name = 'no'
    fullName = 'say no'
;
modify specialTopicPreParser
    processInputStr(str)
    {
         
                 str = rexReplace(punctPat, str, '', 0x0001);

        if (rexMatch(aOrTPat, str) != nil)
            str = rexGroup(1)[3];

        return str;
    }

    aOrTPat = static new RexPattern(
        '<nocase><space>*[at]<space>+(<^space>.*)$')

    punctPat = static new RexPattern('[.?!,;:]');
;


modify SpecialTopic
    matchPreParse(str, procStr)
    {
         
        if (rexMatch(weakPat, str) != nil)
            return nil;

        return inherited(str, procStr);
    }
        weakPat = static new RexPattern('<nocase><space>*(i|l|look)<space>*$')
;

 

modify Traveler
    travelerLocName()
    {
         
        local nm = location.getDestName((libGlobal.playerChar), (libGlobal.playerChar).location);

        return (nm != nil ? nm : 'the area');
    }
        travelerRemoteLocName()
    {
         

        if (isIn((libGlobal.playerChar).getOutermostRoom()))
            return '';
        else
            return travelerLocName;
    }
;

 

modify Vehicle
     
         travelerName(arriving)
    {
         
                 say(arriving ? aName : theName);

        aboardVehicleListerObj.showList(
            libGlobal.playerChar, nil, allContents(), 0, 0,
            libGlobal.playerChar.visibleInfoTable(), nil);
    }
;

 

modify PushTraveler
    travelerName(arriving)
    {
        "<<(libGlobal.playerChar).hasSeen(self) ? theName : aName>>, pushing <<
obj_.theNameObj>>,";
    }
;

modify PathPassage
     
         propertyset '*DobjTake' { remap = (((libGlobal.curAction).getEnteredVerbPhrase() == 'take (dobj)') ? [TravelViaAction,self] : inherited()) }

         propertyset '*DobjEnter'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'enter path', 100))); }
    }
         propertyset '*DobjGoThrough'
    {
        verify() { ((libGlobal.curVerifyResults).addResult(new LogicalVerifyResult(50, 'enter path', 100))); }
    }
;
modify AskConnector
    travelObjsPhrase = 'one'
;

 

modify BasicChair
     
    objInPrep = 'on'
    actorInPrep = 'on'
    actorOutOfPrep = 'off of'
;
modify BasicPlatform
     
    objInPrep = 'on'
    actorInPrep = 'on'
    actorOutOfPrep = 'off of'
;
modify Booth
     
    objInPrep = 'in'
    actorInPrep = 'in'
    actorOutOfPrep = 'out of'
;

 

modify Matchstick
     
         propertyset '*DobjStrike' {         preCond { return preCondDobjBurn; }         verify() { verifyDobjBurn; }         remap() { return remapDobjBurn; }         check() { checkDobjBurn; }         action() { actionDobjBurn; }     }

         propertyset '*DobjLight' {         preCond { return preCondDobjBurn; }         verify() { verifyDobjBurn; }         remap() { return remapDobjBurn; }         check() { checkDobjBurn; }         action() { actionDobjBurn; }     }
;

matchStateLit: ThingState 'lit'
    stateTokens = ['lit']
;
matchStateUnlit: ThingState
    stateTokens = ['unlit']
;

 
 

modify Room
    name
    {
         
                 local cl = propDefined(&roomName, 4);
        if (cl == Room || !cl.ofKind(Room))
            return '';

        return roomName.toLower();
    }

    destName = (theName)

    childInName(childName)
    {
         
        if (!(libGlobal.playerChar).isIn(self))
            return childInRemoteName(childName, (libGlobal.playerChar));
        else
            return getNominalDropDestination().childInName(childName);
    }
    childInNameWithOwner(chiName)
    {
         
        if (!(libGlobal.playerChar).isIn(self))
            return inherited(chiName);
        else
            return getNominalDropDestination().childInNameWithOwner(chiName);
    }
;
modify Floor
    childInNameGen(childName, myName) { return childName + ' on ' + myName; }
    objInPrep = 'on'
    actorInPrep = 'on'
    actorOutOfPrep = 'off of'
;
modify defaultFloor
    noun = 'floor' 'ground'
    name = 'floor'
;
modify defaultGround
    noun = 'ground' 'floor'
    name = 'ground'
;
modify DefaultWall noun='wall' plural='walls' name='wall';
modify defaultCeiling noun='ceiling' 'roof' name='ceiling';
modify defaultNorthWall adjective='n' 'north' name='north wall';
modify defaultSouthWall adjective='s' 'south' name='south wall';
modify defaultEastWall adjective='e' 'east' name='east wall';
modify defaultWestWall adjective='w' 'west' name='west wall';
modify defaultSky noun='sky' name='sky';

 
 

modify Direction
     
    sayArriving(traveler)
    {
         
        (libGlobal.libMessageObj).sayArriving(traveler);
    }

    sayDeparting(traveler)
    {
         
        (libGlobal.libMessageObj).sayDeparting(traveler);
    }
;


modify CompassDirection
     
    sayArriving(traveler)
    {
         
        (libGlobal.libMessageObj).sayArrivingDir(traveler, name);
    }

    sayDeparting(traveler)
    {
         
        (libGlobal.libMessageObj).sayDepartingDir(traveler, name);
    }
;

grammar directionName(north): 'north' | 'n': DirectionProd    dir = northDirection ; modify northDirection    name = 'north'    backToPrefix = 'back to the';
grammar directionName(south): 'south' | 's': DirectionProd    dir = southDirection ; modify southDirection    name = 'south'    backToPrefix = 'back to the';
grammar directionName(east): 'east' | 'e': DirectionProd    dir = eastDirection ; modify eastDirection    name = 'east'    backToPrefix = 'back to the';
grammar directionName(west): 'west' | 'w': DirectionProd    dir = westDirection ; modify westDirection    name = 'west'    backToPrefix = 'back to the';
grammar directionName(northeast): 'northeast' | 'ne': DirectionProd    dir = northeastDirection ; modify northeastDirection    name = 'northeast'    backToPrefix = 'back to the';
grammar directionName(northwest): 'northwest' | 'nw': DirectionProd    dir = northwestDirection ; modify northwestDirection    name = 'northwest'    backToPrefix = 'back to the';
grammar directionName(southeast): 'southeast' | 'se': DirectionProd    dir = southeastDirection ; modify southeastDirection    name = 'southeast'    backToPrefix = 'back to the';
grammar directionName(southwest): 'southwest' | 'sw': DirectionProd    dir = southwestDirection ; modify southwestDirection    name = 'southwest'    backToPrefix = 'back to the';
grammar directionName(up): 'up' | 'u': DirectionProd    dir = upDirection ; modify upDirection    name = 'up'    backToPrefix = 'back';
grammar directionName(down): 'down' | 'd': DirectionProd    dir = downDirection ; modify downDirection    name = 'down'    backToPrefix = 'back';
grammar directionName(in): 'in': DirectionProd    dir = inDirection ; modify inDirection    name = 'in'    backToPrefix = 'back';
grammar directionName(out): 'out': DirectionProd    dir = outDirection ; modify outDirection    name = 'out'    backToPrefix = 'back';

grammar directionName(port): 'port' | 'p': DirectionProd    dir = portDirection ; modify portDirection    name = 'port'    backToPrefix = 'back to'
    sayArriving(trav)
        { (libGlobal.libMessageObj).sayArrivingShipDir(trav, 'the port direction'); }
    sayDeparting(trav)
        { (libGlobal.libMessageObj).sayDepartingShipDir(trav, 'port'); }
;
grammar directionName(starboard): 'starboard' | 'sb': DirectionProd    dir = starboardDirection ; modify starboardDirection    name = 'starboard'    backToPrefix = 'back to'
    sayArriving(trav)
        { (libGlobal.libMessageObj).sayArrivingShipDir(trav, 'starboard'); }
    sayDeparting(trav)
        { (libGlobal.libMessageObj).sayDepartingShipDir(trav, 'starboard'); }
;
grammar directionName(aft): 'aft' | 'a': DirectionProd    dir = aftDirection ; modify aftDirection    name = 'aft'    backToPrefix = 'back to'
    sayArriving(trav) { (libGlobal.libMessageObj).sayArrivingShipDir(trav, 'aft'); }
    sayDeparting(trav) { (libGlobal.libMessageObj).sayDepartingAft(trav); }
;
grammar directionName(fore): 'fore' | 'forward' | 'f': DirectionProd    dir = foreDirection ; modify foreDirection    name = 'fore'    backToPrefix = 'back to'
    sayArriving(trav) { (libGlobal.libMessageObj).sayArrivingShipDir(trav, 'forward'); }
    sayDeparting(trav) { (libGlobal.libMessageObj).sayDepartingFore(trav); }
;

 

class MessageHelper: object
    askDisambigList(matchList, fullMatchList, showIndefCounts, dist)
    {
         
        for (local i = 1, local len = matchList.length() ; i <= len ; ++i)
        {
            local equivCnt;
            local obj;

            obj = matchList[i].obj_;

                        if (i == len)
                ", or ";
            else if (i != 1)
                ", ";

                            for (equivCnt = 0, local j = 1,
                 local fullLen = fullMatchList.length() ; j <= fullLen ; ++j)
            {
                 
                                 if (!dist.canDistinguish(obj, fullMatchList[j].obj_))
                {
                     
                    ++equivCnt;
                }
            }

            if (equivCnt > 1)
            {
                 

                if (showIndefCounts)
                {
                     
                    say(dist.countName(obj, equivCnt));
                }
                else
                {
                     
                    say(dist.aName(obj));
                }
            }
            else
            {
                 
                say(dist.theName(obj));
            }
        }
    }
        shortTMsg(short, long)
    {
         
        if (((libGlobal.curAction).getDobjFlags() & (0x0020 | 0x0010))
            == 0x0020
            && (libGlobal.curAction).getDobjCount() == 1
            && gameMain.ambigAnnounceMode == DescribeClear)
        {
             
            return long;
        }
        else
        {
             
            return short;
        }
    }
        shortTIMsg(short, long)
    {
         
        if ((((libGlobal.curAction).getDobjFlags() & (0x0020 | 0x0010))
             == 0x0020
             || ((libGlobal.curAction).getIobjFlags() & (0x0020 | 0x0010))
             == 0x0020)
            && (libGlobal.curAction).getDobjCount() == 1
            && (libGlobal.curAction).getIobjCount() == 1
            && gameMain.ambigAnnounceMode == DescribeClear)
        {
             
            return long;
        }
        else
        {
             
            return short;
        }
    }
;

 

modify Resolver

    getPronounDefault(typ, np)
    {
        local map = [PronounHim, &canMatchHim,
                     PronounHer, &canMatchHer,
                     PronounIt, &canMatchIt];
        local idx = map.indexOf(typ);
        local filterProp = (idx != nil ? map[idx + 1] : nil);
        local lst;

        if (filterProp == nil)
            return [];

                    lst = getAllDefaults.subset({x: x.obj_.(filterProp)});

                    if (lst.length() == 1)
        {
             
                         lst[1].flags_ |= 0x0040;

            return lst;
        }
        else
        {
             
                         return [];
        }
    }
;
modify InteractiveResolver

    resolvePronounAntecedent(typ, np, results, poss)
    {
        local lst;

        if ((lst = resolvePronounAsTargetActor(typ)) != nil)
            return lst;

        return inherited(typ, np, results, poss);
    }

    getReflexiveBinding(typ)
    {
        local lst;

        if ((lst = resolvePronounAsTargetActor(typ)) != nil)
            return lst;

        return inherited(typ);
    }

    resolvePronounAsTargetActor(typ)
    {
         

        if (actor_.canMatchPronounType(typ) && !actor_.isPlayerChar())
        {
             
            return [new ResolveInfo(actor_, 0, nil)];
        }

        return nil;
    }
;


modify DisambigResolver
    resolvePronounAntecedent(typ, np, results, poss)
    {
         
        if (!poss && typ is in (PronounHim, PronounHer))
        {
            local prop;
            local sub;

            prop = (typ == PronounHim ? &canMatchHim : &canMatchHer);


            sub = matchList.subset({x: x.obj_.(prop)});

            if (sub.length() == 1)
                return sub;

                            results.ambiguousNounPhrase(nil, ResolveAsker, 'one',
                                        sub, matchList, matchList,
                                        1, self);
            return [];
        }

                return inherited(typ, np, results, poss);
    }
;

modify nullDistinguisher
     
    canDistinguish(a, b) { return a.name != b.name; }
        name(obj) { return obj.name; }
    aName(obj) { return obj.aName; }
    theName(obj) { return obj.theName; }
    countName(obj, cnt) { return obj.countName(cnt); }
;

 

modify basicDistinguisher
    name(obj) { return obj.disambigName; }
    aName(obj) { return obj.aDisambigName; }
    theName(obj) { return obj.theDisambigName; }
    countName(obj, cnt) { return obj.countDisambigName(cnt); }
;

modify ownershipDistinguisher
    name(obj) { return obj.theNameOwnerLoc(true); }
    aName(obj) { return obj.aNameOwnerLoc(true); }
    theName(obj) { return obj.theNameOwnerLoc(true); }
    countName(obj, cnt) { return obj.countNameOwnerLoc(cnt, true); }

    notePrompt(lst)
    {
         
                 foreach (local cur in lst)
            cur.obj_.notePromptByOwnerLoc(true);
    }
;

modify locationDistinguisher
    name(obj) { return obj.theNameOwnerLoc(nil); }
    aName(obj) { return obj.aNameOwnerLoc(nil); }
    theName(obj) { return obj.theNameOwnerLoc(nil); }
    countName(obj, cnt) { return obj.countNameOwnerLoc(cnt, nil); }

    notePrompt(lst)
    {
         
        foreach (local cur in lst)
            cur.obj_.notePromptByOwnerLoc(nil);
    }
;

modify litUnlitDistinguisher
    name(obj) { return obj.nameLit; }
    aName(obj) { return obj.aNameLit; }
    theName(obj) { return obj.theNameLit; }
    countName(obj, cnt) { return obj.pluralNameLit; }
;

 

modify LightSource
     
    nameLit = ((isLit ? 'lit ' : 'unlit ') + name)
    aNameLit()
    {
         
                 if (isPlural || isMassNoun)
            return (isLit ? 'lit ' : 'unlit ') + name;
        else
            return (isLit ? 'a lit ' : 'an unlit ') + name;
    }
    theNameLit = ((isLit ? 'the lit ' : 'the unlit ') + name)
    pluralNameLit = ((isLit ? 'lit ' : 'unlit ') + pluralName)

    adjective = 'lit' 'unlit'
;


lightSourceStateOn: ThingState 'providing light'
    stateTokens = ['lit']
;
lightSourceStateOff: ThingState
    stateTokens = ['unlit']
;

wornState: ThingState 'being worn'
    wornName(lst) { return nil; }
;

unwornState: ThingState;

typographicalOutputFilter: OutputFilter
    filterText(ostr, val)
    {
         
                 val = rexReplace(eosPattern, val, '%1\u2002', 0x0001);

        val = rexReplace(abbrevPat, val, '%1. ', 0x0001);

                val = val.findReplace(['---', '--'],
                              ['\uFEFF&mdash;\u200B', '\uFEFF&ndash;\u200B']);

        return val;
    }
        eosPattern = static new RexPattern(
        '<case>'
        + '('
        +   '[.!?]'
        +   '('
        +     '<rparen|rsquare|dquote|squote|\u2019|\u201D>'
        +     '|<langle><^rangle>*<rangle>'
        +   ')*'
        + ')'
        + ' +(?![-a-z])'
        )

    abbrevPat = static new RexPattern(
        '<nocase>%<(' + abbreviations + ')<dot>\u2002')

    abbreviations = 'mr|mrs|ms|dr|prof'
;

 

langMessageBuilder: MessageBuilder

    paramList_ =
    [
         
        ['you/he', &theName, 'actor', nil, true],
        ['you/she', &theName, 'actor', nil, true],
        ['you\'re/he\'s', &itIsContraction, 'actor', nil, true],
        ['you\'re/she\'s', &itIsContraction, 'actor', nil, true],
        ['you\'re', &itIsContraction, 'actor', nil, true],
        ['you/him', &theNameObj, 'actor', &itReflexive, nil],
        ['you/her', &theNameObj, 'actor', &itReflexive, nil],
        ['your/her', &theNamePossAdj, 'actor', nil, nil],
        ['your/his', &theNamePossAdj, 'actor', nil, nil],
        ['your', &theNamePossAdj, 'actor', nil, nil],
        ['yours/hers', &theNamePossNoun, 'actor', nil, nil],
        ['yours/his', &theNamePossNoun, 'actor', nil, nil],
        ['yours', &theNamePossNoun, 'actor', nil, nil],
        ['yourself/himself', &itReflexive, 'actor', nil, nil],
        ['yourself/herself', &itReflexive, 'actor', nil, nil],
        ['yourself', &itReflexive, 'actor', nil, nil],

        ['the/he', &theName, nil, nil, true],
        ['the/she', &theName, nil, nil, true],
        ['the/him', &theNameObj, nil, &itReflexive, nil],
        ['the/her', &theNameObj, nil, &itReflexive, nil],
        ['the\'s/her', &theNamePossAdj, nil, &itPossAdj, nil],
        ['the\'s/hers', &theNamePossNoun, nil, &itPossNoun, nil],


        ['s', &verbEndingS, nil, nil, true],
        ['s/d', &verbEndingSD, nil, nil, true],
        ['s/ed', &verbEndingSEd, nil, nil, true],
        ['s/?ed', &verbEndingSMessageBuilder_, nil, nil, true],
                ['es', &verbEndingEs, nil, nil, true],
        ['es/ed', &verbEndingEs, nil, nil, true],
        ['ies', &verbEndingIes, nil, nil, true],
        ['ies/ied', &verbEndingIes, nil, nil, true],
        ['is', &verbToBe, nil, nil, true],
        ['are', &verbToBe, nil, nil, true],
        ['was', &verbWas, nil, nil, true],
        ['were', &verbWas, nil, nil, true],
        ['has', &verbToHave, nil, nil, true],
        ['have', &verbToHave, nil, nil, true],
        ['does', &verbToDo, nil, nil, true],
        ['do', &verbToDo, nil, nil, true],
        ['goes', &verbToGo, nil, nil, true],
        ['go', &verbToGo, nil, nil, true],
        ['comes', &verbToCome, nil, nil, true],
        ['come', &verbToCome, nil, nil, true],
        ['leaves', &verbToLeave, nil, nil, true],
        ['leave', &verbToLeave, nil, nil, true],
        ['sees', &verbToSee, nil, nil, true],
        ['see', &verbToSee, nil, nil, true],
        ['says', &verbToSay, nil, nil, true],
        ['say', &verbToSay, nil, nil, true],
        ['must', &verbMust, nil, nil, true],
        ['can', &verbCan, nil, nil, true],
        ['cannot', &verbCannot, nil, nil, true],
        ['can\'t', &verbCant, nil, nil, true],
        ['will', &verbWill, nil, nil, true],
        ['won\'t', &verbWont, nil, nil, true],
        ['a/he', &aName, nil, nil, true],
        ['an/he', &aName, nil, nil, true],
        ['a/she', &aName, nil, nil, true],
        ['an/she', &aName, nil, nil, true],
        ['a/him', &aNameObj, nil, &itReflexive, nil],
        ['an/him', &aNameObj, nil, &itReflexive, nil],
        ['a/her', &aNameObj, nil, &itReflexive, nil],
        ['an/her', &aNameObj, nil, &itReflexive, nil],
        ['it/he', &itNom, nil, nil, true],
        ['it/she', &itNom, nil, nil, true],
        ['it/him', &itObj, nil, &itReflexive, nil],
        ['it/her', &itObj, nil, &itReflexive, nil],

                ['its/her', &itPossAdj, nil, nil, nil],
        ['its/hers', &itPossNoun, nil, nil, nil],
                ['it\'s/he\'s', &itIsContraction, nil, nil, true],
        ['it\'s/she\'s', &itIsContraction, nil, nil, true],
        ['it\'s', &itIsContraction, nil, nil, true],
        ['that/he', &thatNom, nil, nil, true],
        ['that/she', &thatNom, nil, nil, true],
        ['that/him', &thatObj, nil, &itReflexive, nil],
        ['that/her', &thatObj, nil, &itReflexive, nil],
        ['that\'s', &thatIsContraction, nil, nil, true],
        ['itself', &itReflexive, nil, nil, nil],
        ['itself/himself', &itReflexive, nil, nil, nil],
        ['itself/herself', &itReflexive, nil, nil, nil],

        ['on', &actorInName, nil, nil, nil],
        ['in', &actorInName, nil, nil, nil],
        ['outof', &actorOutOfName, nil, nil, nil],
        ['offof', &actorOutOfName, nil, nil, nil],
        ['onto', &actorIntoName, nil, nil, nil],
        ['into', &actorIntoName, nil, nil, nil],


        ['subj', &dummyName, nil, nil, true]
    ]
        generateMessage(orig) { return inherited(processOrig(orig)); }

    processOrig(str)
    {
        local idx = 1;
        local len;
        local match;
        local replStr;


        for (;;)
        {
             

            match = rexSearch(patSpecial, str, idx);

                        if (match == nil) break;

                        idx = match[1];
            len = match[2];

                        if (rexMatch(patTenseSwitching, str, idx) == nil)
            {
                 
                                 idx += len;
                continue;
            }

                        match = rexGroup((gameMain.usePastTense ? (2) : (1)));
            replStr = match[3];

                        replStr = replStr.findReplace('[', '{', 0x0001);
            replStr = replStr.findReplace(']', '}', 0x0001);

                        str = str.substr(1, idx - 1) + replStr + str.substr(idx + len);


            idx += match[2];
        }


        return str;
    }
        patSpecial = static new RexPattern
        ('<lbrace><lbrace>|<lbrace>(?!<lbrace>)((?:<^rbrace>)*)<rbrace>')
            patTenseSwitching = static new RexPattern
    (
        '<lbrace>(?!<lbrace>)((?:<^rbrace|vbar>)*)<vbar>'
                          + '((?:<^rbrace|vbar>)*)<rbrace>'
    )
        lastSubject_ = nil

    lastSubjectName_ = nil

    getTargetProp(targetObj, paramObj, info)
    {
        local ret;

                if (targetObj == lastSubject_
            && paramObj != lastSubjectName_
            && info[4] != nil)
        {
             
            ret = info[4];
        }
        else
        {
             
            ret = inherited(targetObj, paramObj, info);
        }

        if (info[5])
        {
            lastSubject_ = targetObj;
            lastSubjectName_ = paramObj;
        }


        if (fixedTenseProp_)
        {
            fixedTenseProp_ = ret;
            ret = &propWithPresentMessageBuilder_;
        }

        return ret;
    }

    patEndOfSentence = static new RexPattern('[.;:!?]<^alphanum>')


    processResult(txt)
    {
         

        if (rexSearch(patEndOfSentence, txt) != nil)
        {
             

            lastSubject_ = nil;
            lastSubjectName_ = nil;
        }

        return inherited(txt);
    }

    patIdObjSlashIdApostS = static new RexPattern(
        '(<^space>+)(<space>+<^space>+)\'s(/<^space>+)$')
    patIdObjApostS = static new RexPattern(
        '(?!<^space>+\'s<space>)(<^space>+)(<space>+<^space>+)\'s$')
    patParamWithExclam = static new RexPattern('.*(!)(?:<space>.*|/.*|$)')
    patSSlashLetterEd = static new RexPattern(
        's/(<alpha>ed)$|(<alpha>ed)/s$')

    langRewriteParam(paramStr)
    {
         
                 local exclam = rexMatch(patParamWithExclam, paramStr);
        fixedTenseProp_ = exclam;


        if (exclam)
        {
            local exclamInd = rexGroup(1)[1];
            paramStr = paramStr.substr(1, exclamInd - 1)
                       + paramStr.substr(exclamInd + 1);
        }

        if (rexMatch(patIdObjSlashIdApostS, paramStr) != nil)
        {
             
            paramStr = rexGroup(1)[3] + '\'s'
                       + rexGroup(2)[3] + rexGroup(3)[3];
        }
        else if (rexMatch(patIdObjApostS, paramStr) != nil)
        {
             
            paramStr = rexGroup(1)[3] + '\'s' + rexGroup(2)[3];
        }


        if (rexMatch(patSSlashLetterEd, paramStr))
        {
             
                         pastEnding_ = rexGroup(1)[3];
            paramStr = 's/?ed';
        }

        return paramStr;
    }

    pastEnding_ = nil
        fixedTenseProp_ = nil
;

withTense(usePastTense, callback)
{
     

    local oldUsePastTense = gameMain.usePastTense;
     

    gameMain.usePastTense = usePastTense;
     
         local ret;
    try { ret = callback(); }
    finally { gameMain.usePastTense = oldUsePastTense; }
     

    return ret;
}

 
 spellInt(val)
{
    return spellIntExt(val, 0);
}


spellIntBelow(val, threshold)
{
    return spellIntBelowExt(val, threshold, 0, 0);
}

spellIntBelowExt(val, threshold, spellFlags, digitFlags)
{
    local absval;

    absval = (val < 0 ? -val : val);

    if (absval < threshold)
    {
         
        return spellIntExt(val, spellFlags);
    }
    else
    {
         
        return intToDecimal(val, digitFlags);
    }
}

intToDecimal(val, flags)
{
    local str;
    local sep;

    str = toString(val);

    if ((flags & 0x0002) != 0)
    {
         
        sep = ',';
    }
    else if ((flags & 0x0004) != 0)
    {
         
        sep = '.';
    }
    else if ((flags & 0x0001) != 0)
    {
         
        sep = languageGlobals.digitGroupSeparator;
    }
    else
    {
         
        sep = nil;
    }

    if (sep != nil)
    {
        local i;
        local len;


        for (i = 3, len = str.length() ; len > i ; i += 4)
        {
             
            str = str.substr(1, len - i) + sep + str.substr(len - i + 1);

            len = str.length();
        }
    }

    return str;
}


spellIntExt(val, flags)
{
    local str;
    local trailingSpace;
    local needAnd;
    local powers = [1000000000, ' billion ',
                    1000000,    ' million ',
                    1000,       ' thousand ',
                    100,        ' hundred '];

    str = '';
    trailingSpace = nil;
    needAnd = nil;

    if (val == 0)
        return 'zero';

            if (val < 0)
    {
        str = 'negative ';
        val = -val;
    }

    for (local i = 1 ; val >= 100 && i <= powers.length() ; i += 2)
    {
         
                 if ((flags & 0x0001) != 0
            && val >= 1100 && val < 10000)
        {
             
            if (needAnd && (flags & 0x0004) != 0)
                str = str.substr(1, str.length() - 1) + ', ';

            str += spellIntExt(val / 100, flags) + ' hundred ';

            val %= 100;

            trailingSpace = true;

            needAnd = true;

                        break;
        }

        if (val >= powers[i])
        {
             
            if (needAnd && (flags & 0x0004) != 0)
                str = str.substr(1, str.length() - 1) + ', ';

            str += spellIntExt(val / powers[i], flags) + powers[i+1];

            val %= powers[i];


            trailingSpace = true;

            needAnd = true;
        }
    }
        if ((flags & 0x0002) != 0
        && needAnd
        && val != 0)
    {
         
        str += 'and ';
        trailingSpace = true;
    }

    if (val >= 20)
    {
         
        str += ['twenty', 'thirty', 'forty', 'fifty', 'sixty',
                'seventy', 'eighty', 'ninety'][val/10 - 1];
        val %= 10;

        if (val != 0)
            str += '-';

        trailingSpace = nil;
    }
    else if (val >= 10)
    {
         
        str += ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
                'fifteen', 'sixteen', 'seventeen', 'eighteen',
                'nineteen'][val - 9];

        val = 0;

        trailingSpace = nil;
    }

    if (val != 0)
    {
         
        str += ['one', 'two', 'three', 'four', 'five',
                'six', 'seven', 'eight', 'nine'][val];

        trailingSpace = nil;
    }

    if (trailingSpace)
        str = str.substr(1, str.length() - 1);

    return str;
}

intOrdinal(n)
{
    local s;

    s = toString(n);

    if (n >= 10 && n <= 19)
    {
         
        return s + 'th';
    }
    else
    {
         
                 switch(n % 10)
        {
        case 1:
            return s + 'st';
                    case 2:
            return s + 'nd';
                    case 3:
            return s + 'rd';
                    default:
            return s + 'th';
        }
    }
}

 
 spellIntOrdinal(n)
{
    return spellIntOrdinalExt(n, 0);
}


spellIntOrdinalExt(n, flags)
{
    local s;

    s = spellIntExt(n, flags);
        if (s == 'zero')
        return 'zeroeth';
    if (s.endsWith('one'))
        return s.substr(1, s.length() - 3) + 'first';
    else if (s.endsWith('two'))
        return s.substr(1, s.length() - 3) + 'second';
    else if (s.endsWith('three'))
        return s.substr(1, s.length() - 5) + 'third';
    else if (s.endsWith('five'))
        return s.substr(1, s.length() - 4) + 'fifth';
    else if (s.endsWith('eight'))
        return s.substr(1, s.length() - 5) + 'eighth';
    else if (s.endsWith('nine'))
        return s.substr(1, s.length() - 4) + 'ninth';
    else if (s.endsWith('y'))
        return s.substr(1, s.length() - 1) + 'ieth';
    else
        return s + 'th';
}
parseInt(str)
{
    try
    {
         
        local toks = cmdTokenizer.tokenize(str);

        return parseIntTokens(toks);
    }
    catch (Exception exc)
    {
         
                 return nil;
    }
}

parseIntTokens(toks)
{
    try
    {
         
                 if (toks.length() != 0
            && rexMatch('<digit>+', ((toks[1])[3])) != nil)
        {
            try
            {
                return toInteger(((toks[1])[3]));
            }
            catch (Exception exc)
            {
                 
                return nil;
            }
        }
        
         
        local lst = spelledNumber.parseTokens(toks, cmdDict);

                return (lst.length() != 0 ? lst[1].getval() : nil);
    }
    catch (Exception exc)
    {
         
                 return nil;
    }
}
enum token tokApostropheS;

enum token tokPluralApostrophe;

enum token tokAbbrPeriod;

enum token tokPoundInt;


cmdTokenizer: Tokenizer
    rules_ = static
    [
         
        ['whitespace', new RexPattern('<Space>+'), nil, &tokCvtSkip, nil],

        ['punctuation', new RexPattern('[.,;:?!]'), tokPunct, nil, nil],

                ['spelled number',
         new RexPattern('<NoCase>(twenty|thirty|forty|fifty|sixty|'
                        + 'seventy|eighty|ninety)-'
                        + '(one|two|three|four|five|six|seven|eight|nine)'
                        + '(?!<AlphaNum>)'),
         tokWord, &tokCvtSpelledNumber, nil],

         
                 ['three initials',
         new RexPattern('<alpha><period><alpha><period><alpha><period>'),
         tokWord, &tokCvtAbbr, &acceptAbbrTok],
                 ['two initials',
         new RexPattern('<alpha><period><alpha><period>'),
         tokWord, &tokCvtAbbr, &acceptAbbrTok],


        ['abbreviation',
         new RexPattern('<Alpha|-><AlphaNum|-|squote>*<period>'),
         tokWord, &tokCvtAbbr, &acceptAbbrTok],


        ['apostrophe-s word',
         new RexPattern('<Alpha|-|&><AlphaNum|-|&|squote>*<squote>[sS]'),
         tokWord, &tokCvtApostropheS, nil],

                 ['plural possessive word',
         new RexPattern('<Alpha|-|&><AlphaNum|-|&|squote>*<squote>'
                        + '(?!<AlphaNum>)'),
         tokWord, &tokCvtPluralApostrophe, nil],

                 ['word',
         new RexPattern('<Alpha|-|&><AlphaNum|-|&|squote>*'),
         tokWord, nil, nil],

        ['abbreviation with initial digit',
         new RexPattern('<Digit>(?=<AlphaNum|-|&|squote>*<Alpha|-|&|squote>)'
                        + '<AlphaNum|-|&|squote>*<period>'),
         tokWord, &tokCvtAbbr, &acceptAbbrTok],


        ['word with initial digit',
         new RexPattern('<Digit>(?=<AlphaNum|-|&|squote>*<Alpha|-|&|squote>)'
                        + '<AlphaNum|-|&|squote>*'), tokWord, nil, nil],

        ['string ascii-quote',
         new RexPattern('<min>([`\'"])(.*)%1(?!<AlphaNum>)'),
         tokString, nil, nil],

        ['string back-quote',
         new RexPattern('<min>`(.*)\'(?!<AlphaNum>)'), tokString, nil, nil],

        ['string curly single-quote',
         new RexPattern('<min>\u2018(.*)\u2019'), tokString, nil, nil],
        ['string curly double-quote',
         new RexPattern('<min>\u201C(.*)\u201D'), tokString, nil, nil],


        ['string unterminated',
         new RexPattern('([`\'"\u2018\u201C](.*)'), tokString, nil, nil],

        ['integer', new RexPattern('[0-9]+'), tokInt, nil, nil],

        ['integer with #',
         new RexPattern('#[0-9]+'), tokPoundInt, nil, nil]
    ]
        tokCvtApostropheS(txt, typ, toks)
    {
        local w;
        local s;

                w = txt.substr(1, txt.length() - 2);
        s = txt.substr(-2);

        toks.append([w, typ, w]);

        toks.append([s, tokApostropheS, s]);
    }
        tokCvtPluralApostrophe(txt, typ, toks)
    {
        local w;
        local s;

                w = txt.substr(1, txt.length() - 1);
        s = txt.substr(-1);

        toks.append([w, typ, w]);

        toks.append([s, tokPluralApostrophe, s]);
    }
        tokCvtSpelledNumber(txt, typ, toks)
    {
         
        rexMatch(patAlphaDashAlpha, txt);

        toks.append([rexGroup(1)[3], typ, rexGroup(1)[3]]);

        toks.append(['-', typ, '-']);

        toks.append([rexGroup(2)[3], typ, rexGroup(2)[3]]);
    }
    patAlphaDashAlpha = static new RexPattern('(<alpha>+)-(<alpha>+)')
        acceptAbbrTok(txt)
    {
         
        return cmdDict.isWordDefined(
            txt, {result: (result & 0x0004) == 0});
    }

    tokCvtAbbr(txt, typ, toks)
    {
        local w;

        w = txt.substr(1, txt.length() - 1);
        toks.append([w, typ, w]);

        toks.append(['.', tokAbbrPeriod, '.']);
    }
        buildOrigText(toks)
    {
        local str;

        str = '';

        for (local i = 1, local len = toks.length() ; i <= len ; ++i)
        {
             
            str += ((toks[i])[3]);


            if (i + 2 <= len
                && rexMatch(patSpelledTens, ((toks[i])[1])) != nil
                && ((toks[i+1])[1]) == '-'
                && rexMatch(patSpelledUnits, ((toks[i+2])[1])) != nil)
            {
                 

                str += ((toks[i+1])[3]) + ((toks[i+2])[3]);

                i += 2;
            }
            else if (i + 1 <= len
                     && ((toks[i])[2]) == tokWord
                     && ((toks[i+1])[2]) is in
                        (tokApostropheS, tokPluralApostrophe))
            {
                 
                                 str += ((toks[i+1])[3]);

                ++i;
            }


            if (i != len
                && rexMatch(patPunct, ((toks[i+1])[1])) == nil
                && ((toks[i])[1]) != '(')
                str += ' ';
        }

        return str;
    }

    patSpelledTens = static new RexPattern(
        '<nocase>twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety')
    patSpelledUnits = static new RexPattern(
        '<nocase>one|two|three|four|five|six|seven|eight|nine')
    patPunct = static new RexPattern('[.,;:?!)]')
;
grammar firstCommandPhrase(withActor):
    singleNounOnly->actor_ ',' commandPhrase->cmd_
    : FirstCommandProdWithActor

    execActorPhrase(issuingActor)
    {
         
        resolvedActor_.commandReferralPerson = 2;
    }
;
grammar firstCommandPhrase(askTellActorTo):
    ('ask' | 'tell' | 'a' | 't') singleNounOnly->actor_
    'to' commandPhrase->cmd_
    : FirstCommandProdWithActor

    execActorPhrase(issuingActor)
    {
         
                 if (resolvedActor_ != nil)
        {
             
            resolvedActor_.setPossAnaphorObj(resolvedActor_);

            resolvedActor_.commandReferralPerson = 3;

                        issuingActor.setPronounObj(resolvedActor_);
        }
    }
;


grammar actorBadCommandPhrase(main):
    singleNounOnly->actor_ ',' miscWordList
    | ('ask' | 'tell' | 'a' | 't') singleNounOnly->actor_ 'to' miscWordList
    : FirstCommandProdWithActor

    resolveNouns(issuingActor, targetActor, results)
    {
         
        return actor_.resolveNouns(getResolver(issuingActor), results);
    }
;

 

grammar commandOnlyConjunction(sentenceEnding):
    '.'
    | '!'
    : BasicProd

    isEndOfSentence() { return true; }
;
grammar commandOnlyConjunction(nonSentenceEnding):
    'then'
    | 'and' 'then'
    | ',' 'then'
    | ',' 'and' 'then'
    | ';'
    : BasicProd

    isEndOfSentence() { return nil; }
;

 

grammar commandOrNounConjunction(main):
    ','
    | 'and'
    | ',' 'and'
    : BasicProd

    isEndOfSentence() { return nil; }
;


grammar nounConjunction(main):
    ','
    | 'and'
    | ',' 'and'
    : BasicProd

    isEndOfSentence() { return nil; }
;

 

grammar nounList(terminal): terminalNounPhrase->np_ : NounListProd
    resolveNouns(resolver, results)
    {
         
        return np_.resolveNouns(resolver, results);
    }
;

grammar nounList(nonTerminal): completeNounPhrase->np_ : NounListProd
    resolveNouns(resolver, results)
    {
         
        return np_.resolveNouns(resolver, results);
    }
;


grammar nounList(list): nounMultiList->lst_ : NounListProd
    resolveNouns(resolver, results)
    {
         
        return lst_.resolveNouns(resolver, results);
    }
;

grammar nounList(empty): [badness 500] : EmptyNounPhraseProd
    responseProd = nounList
;

grammar nounMultiList(multi):
    nounMultiList->lst_ nounConjunction terminalNounPhrase->np_
    : NounListProd
    resolveNouns(resolver, results)
    {
         
        return np_.resolveNouns(resolver, results)
            + lst_.resolveNouns(resolver, results);
    }
;


grammar nounMultiList(nonterminal): nonTerminalNounMultiList->lst_
    : NounListProd
    resolveNouns(resolver, results)
    {
         
        return lst_.resolveNouns(resolver, results);
    }
;

grammar nonTerminalNounMultiList(pair):
    completeNounPhrase->np1_ nounConjunction completeNounPhrase->np2_
    : NounListProd
    resolveNouns(resolver, results)
    {
         
        return np1_.resolveNouns(resolver, results)
            + np2_.resolveNouns(resolver, results);
    }
;

grammar nonTerminalNounMultiList(multi):
    nonTerminalNounMultiList->lst_ nounConjunction completeNounPhrase->np_
    : NounListProd
    resolveNouns(resolver, results)
    {
         
        return lst_.resolveNouns(resolver, results)
            + np_.resolveNouns(resolver, results);
    }
;

grammar exceptList(single): exceptNounPhrase->np_ : ExceptListProd
    resolveNouns(resolver, results)
    {
        return np_.resolveNouns(resolver, results);
    }
;
grammar exceptList(list):
    exceptNounPhrase->np_ nounConjunction exceptList->lst_
    : ExceptListProd
    resolveNouns(resolver, results)
    {
         
        return np_.resolveNouns(resolver, results)
            + lst_.resolveNouns(resolver, results);
    }
;


grammar exceptNounPhrase(singleComplete): completeNounPhraseWithoutAll->np_
    : ExceptListProd
    resolveNouns(resolver, results)
    {
        return np_.resolveNouns(resolver, results);
    }
;
grammar exceptNounPhrase(singlePossessive): possessiveNounPhrase->poss_
    : ButPossessiveProd
;

grammar singleNoun(normal): singleNounOnly->np_ : LayeredNounPhraseProd
;

grammar singleNoun(empty): [badness 500] : EmptyNounPhraseProd
     
    responseProd = nil

    fallbackResponseProd = singleNoun
;

grammar singleNoun(multiple): nounMultiList->np_ : SingleNounWithListProd
;

 
 grammar singleNounOnly(main):
    terminalNounPhrase->np_
    | completeNounPhrase->np_
    : SingleNounProd
;
class PrepSingleNounProd: SingleNounProd
    resolveNouns(resolver, results)
    {
        return np_.resolveNouns(resolver, results);
    }

        isSpecialResponseMatch()
    {
        return (np_ != nil && np_.firstTokenIndex > 1);
    }
;


class PrepSingleTopicProd: TopicProd
    resolveNouns(resolver, results)
    {
        return np_.resolveNouns(resolver, results);
    }
;
grammar inSingleNoun(main):
     singleNoun->np_ | ('in' | 'into' | 'in' 'to') singleNoun->np_
    : PrepSingleNounProd
;
grammar forSingleNoun(main):
   singleNoun->np_ | 'for' singleNoun->np_ : PrepSingleNounProd
;
grammar toSingleNoun(main):
   singleNoun->np_ | 'to' singleNoun->np_ : PrepSingleNounProd
;
grammar throughSingleNoun(main):
   singleNoun->np_ | ('through' | 'thru') singleNoun->np_
   : PrepSingleNounProd
;
grammar fromSingleNoun(main):
   singleNoun->np_ | 'from' singleNoun->np_ : PrepSingleNounProd
;
grammar onSingleNoun(main):
   singleNoun->np_ | ('on' | 'onto' | 'on' 'to') singleNoun->np_
    : PrepSingleNounProd
;
grammar withSingleNoun(main):
   singleNoun->np_ | 'with' singleNoun->np_ : PrepSingleNounProd
;
grammar atSingleNoun(main):
   singleNoun->np_ | 'at' singleNoun->np_ : PrepSingleNounProd
;
grammar outOfSingleNoun(main):
   singleNoun->np_ | 'out' 'of' singleNoun->np_ : PrepSingleNounProd
;
grammar aboutTopicPhrase(main):
   topicPhrase->np_ | 'about' topicPhrase->np_
   : PrepSingleTopicProd
;
grammar completeNounPhrase(main):
    completeNounPhraseWithAll->np_ | completeNounPhraseWithoutAll->np_
    : LayeredNounPhraseProd
;


grammar completeNounPhrase(miscPrep):
    [badness 100] completeNounPhrase->np1_
        ('with' | 'into' | 'in' 'to' | 'through' | 'thru' | 'for' | 'to'
         | 'onto' | 'on' 'to' | 'at' | 'under' | 'behind')
        completeNounPhrase->np2_
    : NounPhraseProd
    resolveNouns(resolver, results)
    {
         
        results.noteBadPrep();

        np1_.resolveNouns(resolver, results);
        np2_.resolveNouns(resolver, results);

        return [];
    }
;

 

grammar completeNounPhraseWithoutAll(qualified): qualifiedNounPhrase->np_
    : LayeredNounPhraseProd
;

grammar completeNounPhraseWithoutAll(it):   'it' : ItProd;
grammar completeNounPhraseWithoutAll(them): 'them' : ThemProd;
grammar completeNounPhraseWithoutAll(him):  'him' : HimProd;
grammar completeNounPhraseWithoutAll(her):  'her' : HerProd;

grammar completeNounPhraseWithoutAll(yourself):
    'yourself' | 'yourselves' | 'you' : YouProd
;

grammar completeNounPhraseWithoutAll(itself): 'itself' : ItselfProd
     
    checkAgreement(lst)
    {
         
        return (lst.length() == 1 && lst[1].obj_.canMatchIt);
    }
;
grammar completeNounPhraseWithoutAll(themselves):
    'themself' | 'themselves' : ThemselvesProd

    checkAgreement(lst)
    {
         

        return true;
    }
;
grammar completeNounPhraseWithoutAll(himself): 'himself' : HimselfProd
     
    checkAgreement(lst)
    {
         
        return (lst.length() == 1 && lst[1].obj_.canMatchHim);
    }
;
grammar completeNounPhraseWithoutAll(herself): 'herself' : HerselfProd
     
    checkAgreement(lst)
    {
         
        return (lst.length() == 1 && lst[1].obj_.canMatchHer);
    }
;


grammar completeNounPhraseWithoutAll(me): 'me' | 'myself' : MeProd;

grammar completeNounPhraseWithAll(main):
    'all' | 'everything'
    : EverythingProd
;
grammar terminalNounPhrase(allBut):
    ('all' | 'everything') ('but' | 'except' | 'except' 'for')
        exceptList->except_
    : EverythingButProd
;

grammar terminalNounPhrase(pluralExcept):
    (qualifiedPluralNounPhrase->np_ | detPluralNounPhrase->np_)
    ('except' | 'except' 'for' | 'but' | 'but' 'not') exceptList->except_
    : ListButProd
;


grammar terminalNounPhrase(anyBut):
    'any' nounPhrase->np_
    ('but' | 'except' | 'except' 'for' | 'but' 'not') exceptList->except_
    : IndefiniteNounButProd
;

 

grammar qualifiedNounPhrase(main):
    qualifiedSingularNounPhrase->np_
    | qualifiedPluralNounPhrase->np_
    : LayeredNounPhraseProd
;

grammar qualifiedSingularNounPhrase(definite):
    ('the' | 'the' 'one' | 'the' '1' | ) indetSingularNounPhrase->np_
    : DefiniteNounProd
;


grammar qualifiedSingularNounPhrase(indefinite):
    ('a' | 'an') indetSingularNounPhrase->np_
    : IndefiniteNounProd
;

grammar qualifiedSingularNounPhrase(arbitrary):
    ('any' | 'one' | '1' | 'any' ('one' | '1')) indetSingularNounPhrase->np_
    : ArbitraryNounProd
;


grammar qualifiedSingularNounPhrase(possessive):
    possessiveAdjPhrase->poss_ indetSingularNounPhrase->np_
    : PossessiveNounProd
;


grammar qualifiedSingularNounPhrase(anyPlural):
    'any' 'of' explicitDetPluralNounPhrase->np_
    : ArbitraryNounProd
;

grammar qualifiedSingularNounPhrase(theOneIn):
    'the' 'one' ('that' ('is' | 'was') | 'that' tokApostropheS | )
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : VagueContainerDefiniteNounPhraseProd

        mainPhraseText = 'one'
;

grammar qualifiedSingularNounPhrase(anyOneIn):
    ('anything' | 'one') ('that' ('is' | 'was') | 'that' tokApostropheS | )
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : VagueContainerIndefiniteNounPhraseProd
;

grammar indetSingularNounPhrase(basic):
    nounPhrase->np_
    : LayeredNounPhraseProd
;

grammar indetSingularNounPhrase(locational):
    nounPhrase->np_
    ('that' ('is' | 'was')
     | 'that' tokApostropheS
     | 'that' ('are' | 'were')
     | )
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : ContainerNounPhraseProd
;
grammar qualifiedPluralNounPhrase(determiner):
    ('any' | ) detPluralOnlyNounPhrase->np_
    : LayeredNounPhraseProd
;

grammar qualifiedPluralNounPhrase(anyNum):
    ('any' | ) numberPhrase->quant_ indetPluralNounPhrase->np_
    | ('any' | ) numberPhrase->quant_ 'of' explicitDetPluralNounPhrase->np_
    : QuantifiedPluralProd
;

grammar qualifiedPluralNounPhrase(allNum):
    'all' numberPhrase->quant_ indetPluralNounPhrase->np_
    | 'all' numberPhrase->quant_ 'of' explicitDetPluralNounPhrase->np_
    : ExactQuantifiedPluralProd
;

grammar qualifiedPluralNounPhrase(both):
    'both' detPluralNounPhrase->np_
    | 'both' 'of' explicitDetPluralNounPhrase->np_
    : BothPluralProd
;

grammar qualifiedPluralNounPhrase(all):
    'all' detPluralNounPhrase->np_
    | 'all' 'of' explicitDetPluralNounPhrase->np_
    : AllPluralProd
;

grammar qualifiedPluralNounPhrase(theOnesIn):
    ('the' 'ones' ('that' ('are' | 'were') | )
     | ('everything' | 'all')
       ('that' ('is' | 'was') | 'that' tokApostropheS | ))
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : AllInContainerNounPhraseProd
;
grammar detPluralNounPhrase(main):
    indetPluralNounPhrase->np_ | explicitDetPluralNounPhrase->np_
    : LayeredNounPhraseProd
;
grammar detPluralOnlyNounPhrase(main):
    implicitDetPluralOnlyNounPhrase->np_
    | explicitDetPluralOnlyNounPhrase->np_
    : LayeredNounPhraseProd
;

grammar implicitDetPluralOnlyNounPhrase(main):
    indetPluralOnlyNounPhrase->np_
    : DefinitePluralProd
;

grammar explicitDetPluralNounPhrase(definite):
    'the' indetPluralNounPhrase->np_
    : DefinitePluralProd
;

grammar explicitDetPluralNounPhrase(definiteNumber):
    'the' numberPhrase->quant_ indetPluralNounPhrase->np_
    : ExactQuantifiedPluralProd
;

grammar explicitDetPluralNounPhrase(possessive):
    possessiveAdjPhrase->poss_ indetPluralNounPhrase->np_
    : PossessivePluralProd
;

grammar explicitDetPluralNounPhrase(possessiveNumber):
    possessiveAdjPhrase->poss_ numberPhrase->quant_
    indetPluralNounPhrase->np_
    : ExactQuantifiedPossessivePluralProd
;
grammar explicitDetPluralOnlyNounPhrase(definite):
    'the' indetPluralOnlyNounPhrase->np_
    : AllPluralProd
;
grammar explicitDetPluralOnlyNounPhrase(definiteNumber):
    'the' numberPhrase->quant_ indetPluralNounPhrase->np_
    : ExactQuantifiedPluralProd
;
grammar explicitDetPluralOnlyNounPhrase(possessive):
    possessiveAdjPhrase->poss_ indetPluralOnlyNounPhrase->np_
    : PossessivePluralProd
;
grammar explicitDetPluralOnlyNounPhrase(possessiveNumber):
    possessiveAdjPhrase->poss_ numberPhrase->quant_
    indetPluralNounPhrase->np_
    : ExactQuantifiedPossessivePluralProd
;

grammar indetPluralNounPhrase(basic):
    pluralPhrase->np_ | adjPhrase->np_
    : LayeredNounPhraseProd
;


grammar indetPluralNounPhrase(locational):
    (pluralPhrase->np_ | adjPhrase->np_) ('that' ('are' | 'were') | )
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : ContainerNounPhraseProd
;


grammar indetPluralOnlyNounPhrase(basic):
    pluralPhrase->np_
    : LayeredNounPhraseProd
;
grammar indetPluralOnlyNounPhrase(locational):
    pluralPhrase->np_ ('that' ('are' | 'were') | )
    ('in' | 'inside' | 'inside' 'of' | 'on' | 'from')
    completeNounPhraseWithoutAll->cont_
    : ContainerNounPhraseProd
;
grammar nounPhrase(main): compoundNounPhrase->np_
    : LayeredNounPhraseProd
;

grammar pluralPhrase(main): compoundPluralPhrase->np_
    : LayeredNounPhraseProd
;
grammar compoundNounPhrase(simple): simpleNounPhrase->np_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        return np_.getVocabMatchList(resolver, results, extraFlags);
    }
    getAdjustedTokens()
    {
        return np_.getAdjustedTokens();
    }
;
grammar compoundNounPhrase(of):
    simpleNounPhrase->np1_ 'of'->of_ compoundNounPhrase->np2_
    | simpleNounPhrase->np1_ 'of'->of_ 'the'->the_ compoundNounPhrase->np2_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local lst1;
        local lst2;

        lst1 = np1_.getVocabMatchList(resolver, results, extraFlags);
        lst2 = np2_.getVocabMatchList(resolver, results, extraFlags);


        return intersectNounLists(lst1, lst2);
    }
    getAdjustedTokens()
    {
        local ofLst;

        if (the_ == nil)
            ofLst = [of_, &miscWord];
        else
            ofLst = [of_, &miscWord, the_, &miscWord];

        return np1_.getAdjustedTokens() + ofLst + np2_.getAdjustedTokens();
    }
;


grammar compoundPluralPhrase(simple): simplePluralPhrase->np_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        return np_.getVocabMatchList(resolver, results, extraFlags);
    }
    getAdjustedTokens()
    {
        return np_.getAdjustedTokens();
    }
;


grammar compoundPluralPhrase(of):
    simplePluralPhrase->np1_ 'of'->of_ compoundNounPhrase->np2_
    | simplePluralPhrase->np1_ 'of'->of_ 'the'->the_ compoundNounPhrase->np2_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local lst1;
        local lst2;

        lst1 = np1_.getVocabMatchList(resolver, results, extraFlags);
        lst2 = np2_.getVocabMatchList(resolver, results, extraFlags);


        return intersectNounLists(lst1, lst2);
    }
    getAdjustedTokens()
    {
        local ofLst;

        if (the_ == nil)
            ofLst = [of_, &miscWord];
        else
            ofLst = [of_, &miscWord, the_, &miscWord];

        return np1_.getAdjustedTokens() + ofLst + np2_.getAdjustedTokens();
    }
;

 

grammar simpleNounPhrase(noun): nounWord->noun_ : NounPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
        return noun_.getVocabMatchList(resolver, results, extraFlags);
    }
    getAdjustedTokens()
    {
        return noun_.getAdjustedTokens();
    }
;

grammar simpleNounPhrase(adjNP): adjWord->adj_ simpleNounPhrase->np_
    : NounPhraseWithVocab

    getVocabMatchList(resolver, results, extraFlags)
    {
         
                 return intersectNounLists(
            adj_.getVocabMatchList(resolver, results, extraFlags),
            np_.getVocabMatchList(resolver, results, extraFlags));
    }
    getAdjustedTokens()
    {
        return adj_.getAdjustedTokens() + np_.getAdjustedTokens();
    }
;


 
 grammar simpleNounPhrase(number): literalAdjPhrase->adj_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
                 results.noteAdjEnding();

        local lst = adj_.getVocabMatchList(resolver, results,
                                           extraFlags | 0x0001);

        if (resolver.isGlobalScope)
            lst = adj_.addNounMatchList(lst, resolver, results, extraFlags);

        return lst;
    }
    getAdjustedTokens()
    {
         
        return adj_.getAdjustedTokens();
    }
;

grammar simpleNounPhrase(numberAndNoun):
    literalAdjPhrase->adj_ nounWord->noun_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local nounList;
        local adjList;

        nounList = noun_.getVocabMatchList(resolver, results, extraFlags);

        adjList = adj_.getVocabMatchList(resolver, results, extraFlags);

        return intersectNounLists(nounList, adjList);
    }
    getAdjustedTokens()
    {
        return adj_.getAdjustedTokens() + noun_.getAdjustedTokens();
    }
;

grammar simpleNounPhrase(nounAndNumber):
    nounWord->noun_ literalAdjPhrase->adj_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local nounList;
        local adjList;

        nounList = noun_.getVocabMatchList(resolver, results, extraFlags);

        adjList = adj_.getVocabMatchList(resolver, results, extraFlags);

        return intersectNounLists(nounList, adjList);
    }
    getAdjustedTokens()
    {
        return noun_.getAdjustedTokens() + adj_.getAdjustedTokens();
    }
;


grammar simpleNounPhrase(adj): adjWord->adj_ : NounPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        results.noteAdjEnding();

        local lst = adj_.getVocabMatchList(
            resolver, results, extraFlags | 0x0001);

        if (resolver.isGlobalScope)
            lst = adj_.addNounMatchList(lst, resolver, results, extraFlags);

        return lst;
    }
    getAdjustedTokens()
    {
         
        return adj_.getAdjustedTokens();
    }
;
grammar simpleNounPhrase(adjAndOne): adjective->adj_ 'one'
    : NounPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
         

        results.noteAdjEnding();

        return getWordMatches(adj_, &adjective, resolver,
                              extraFlags | 0x0001, 0x0002);
    }
    getAdjustedTokens()
    {
        return [adj_, &adjective];
    }
;

grammar simpleNounPhrase(misc):
    [badness 200] miscWordList->lst_ : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        local lst = lst_.getVocabMatchList(resolver, results, extraFlags);


        if (lst == nil || lst.length() == 0)
            results.noteMiscWordList(lst_.getOrigText());

        return lst;
    }
    getAdjustedTokens()
    {
        return lst_.getAdjustedTokens();
    }
;

grammar simpleNounPhrase(empty): [badness 600] : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return results.emptyNounPhrase(resolver);
    }
    getAdjustedTokens()
    {
        return [];
    }
;

class AdjPhraseWithVocab: NounPhraseWithVocab
     
    adjVocabProp = &adj_
        addNounMatchList(lst, resolver, results, extraFlags)
    {
         
        local nLst = getWordMatches(
            self.(adjVocabProp), &noun, resolver, extraFlags, 0x0002);

        return combineWordMatches(lst, nLst);
    }
;
grammar literalAdjPhrase(number):
    numberPhrase->num_ | poundNumberPhrase->num_
    : AdjPhraseWithVocab
        adj_ = (num_.getStrVal())
    getVocabMatchList(resolver, results, extraFlags)
    {
        local numList;

                numList = getWordMatches(num_.getStrVal(), &adjective,
                                 resolver, extraFlags, 0x0002);

        numList += getWordMatches('#', &adjective, resolver,
                                  extraFlags, 0x0002);

        return numList;
    }
    getAdjustedTokens()
    {
        return [num_.getStrVal(), &adjective];
    }
;
grammar literalAdjPhrase(string): quotedStringPhrase->str_
    : AdjPhraseWithVocab
        adj_ = (str_.getStringText().toLower())
    getVocabMatchList(resolver, results, extraFlags)
    {
        local strList;
        local wLst;

                strList = getWordMatches(str_.getStringText().toLower(),
                                 &literalAdjective,
                                 resolver, extraFlags, 0x0002);

        wLst = getWordMatches('\u0001', &literalAdjective, resolver,
                              extraFlags, 0x0002);
        strList = combineWordMatches(strList, wLst);

        return strList;
    }
    getAdjustedTokens()
    {
        return [str_.getStringText().toLower(), &adjective];
    }
;

grammar literalAdjPhrase(literalAdj): literalAdjective->adj_
    : AdjPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local lst;

        lst = getWordMatches(adj_, &literalAdjective, resolver,
                             extraFlags, 0x0002);

        if (resolver.isGlobalScope)
        {
             
            local aLst = getWordMatches(adj_, &adjective, resolver,
                                        extraFlags, 0x0002);

            lst = combineWordMatches(lst, aLst);
        }

        return lst;
    }
    getAdjustedTokens()
    {
        return [adj_, &literalAdjective];
    }
;

class NounWordProd: NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
        local w;
        local nLst;

        w = getNounText();

        nLst = getWordMatches(w, &noun, resolver, extraFlags, 0x0002);

                if (resolver.isGlobalScope)
        {
             
            local aLst = getWordMatches(w, &adjective, resolver,
                                        extraFlags, 0x0002);

            nLst = combineWordMatches(nLst, aLst);
        }

        return nLst;
    }
    getAdjustedTokens()
    {
         
        return [getNounText(), &noun];
    }

    getNounText() { return noun_; }
;
grammar nounWord(noun): noun->noun_ : NounWordProd
;
grammar nounWord(nounAbbr): noun->noun_ tokAbbrPeriod->period_
    : NounWordProd
        getNounText() { return noun_ + period_; }
;
grammar adjWord(adj): adjective->adj_ : AdjPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return getWordMatches(adj_, &adjective, resolver,
                              extraFlags, 0x0002);
    }
    getAdjustedTokens()
    {
        return [adj_, &adjective];
    }
;
grammar adjWord(adjApostS): adjApostS->adj_ tokApostropheS->apost_
    : AdjPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return getWordMatches(adj_, &adjApostS, resolver,
                              extraFlags, 0x0002);
    }
    getAdjustedTokens()
    {
        return [adj_, &adjApostS];
    }
;
grammar adjWord(adjAbbr): adjective->adj_ tokAbbrPeriod->period_
    : AdjPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         

        return getWordMatches(adj_ + period_, &adjective, resolver,
                              extraFlags, 0x0002);
    }
    getAdjustedTokens()
    {
         
        return [adj_ + period_, &adjective];
    }
;
grammar possessiveAdjPhrase(its): 'its' : ItsAdjProd
     
    checkAnaphorAgreement(lst)
        { return lst.length() == 1 && lst[1].obj_.canMatchIt; }
;
grammar possessiveAdjPhrase(his): 'his' : HisAdjProd
     
    checkAnaphorAgreement(lst)
        { return lst.length() == 1 && lst[1].obj_.canMatchHim; }
;
grammar possessiveAdjPhrase(her): 'her' : HerAdjProd
     
    checkAnaphorAgreement(lst)
        { return lst.length() == 1 && lst[1].obj_.canMatchHer; }
;
grammar possessiveAdjPhrase(their): 'their' : TheirAdjProd
     
    checkAnaphorAgreement(lst)
        { return lst.length() == 1 && lst[1].obj_.isPlural; }
;
grammar possessiveAdjPhrase(your): 'your' : YourAdjProd
     
    checkAnaphorAgreement(lst) { return nil; }
;
grammar possessiveAdjPhrase(my): 'my' : MyAdjProd
     
    checkAnaphorAgreement(lst) { return nil; }
;
grammar possessiveAdjPhrase(npApostropheS):
    ('the' | ) nounPhrase->np_ tokApostropheS->apost_ : LayeredNounPhraseProd

    getOrigMainText()
    {
         
        return np_.getOrigText();
    }
;
grammar possessiveAdjPhrase(ppApostropheS):
    ('the' | ) pluralPhrase->np_
       (tokApostropheS->apost_ | tokPluralApostrophe->apost_)
    : LayeredNounPhraseProd

    getOrigMainText()
    {
         
        return np_.getOrigText();
    }
        resolveNouns(resolver, results)
    {
         
        results.notePlural();

        return inherited(resolver, results);
    }

    isPluralPossessive = true
;


grammar possessiveNounPhrase(its): 'its': ItsNounProd;
grammar possessiveNounPhrase(his): 'his': HisNounProd;
grammar possessiveNounPhrase(hers): 'hers': HersNounProd;
grammar possessiveNounPhrase(theirs): 'theirs': TheirsNounProd;
grammar possessiveNounPhrase(yours): 'yours' : YoursNounProd;
grammar possessiveNounPhrase(mine): 'mine' : MineNounProd;
grammar possessiveNounPhrase(npApostropheS):
    ('the' | )
    (nounPhrase->np_ tokApostropheS->apost_
     | pluralPhrase->np (tokApostropheS->apost_ | tokPluralApostrophe->apost_))
    : LayeredNounPhraseProd

    getOrigMainText()
    {
         
        return np_.getOrigText();
    }
;
grammar simplePluralPhrase(plural): plural->plural_ : NounPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
        local lst;

        lst = getWordMatches(plural_, &plural, resolver,
                             extraFlags, 0x0004);

        local nLst = getWordMatches(plural_, &noun, resolver,
                                    extraFlags, 0x0002);

        local comboLst = combineWordMatches(lst, nLst);


        if (resolver.isGlobalScope)
        {
             
            lst = comboLst;
        }
        else if (comboLst.length() > lst.length())
        {
             

            lst.forEach({x: x.flags_ |= 0x0040});
        }

        return lst;
    }
    getAdjustedTokens()
    {
        return [plural_, &plural];
    }
;
grammar simplePluralPhrase(adj): adjWord->adj_ simplePluralPhrase->np_ :
    NounPhraseWithVocab

    getVocabMatchList(resolver, results, extraFlags)
    {
         
                 return intersectNounLists(
            adj_.getVocabMatchList(resolver, results, extraFlags),
            np_.getVocabMatchList(resolver, results, extraFlags));
    }
    getAdjustedTokens()
    {
        return adj_.getAdjustedTokens() + np_.getAdjustedTokens();
    }
;
grammar simplePluralPhrase(poundNum):
    poundNumberPhrase->num_ simplePluralPhrase->np_
    : NounPhraseWithVocab

    getVocabMatchList(resolver, results, extraFlags)
    {
        local baseList;
        local numList;

        baseList = np_.getVocabMatchList(resolver, results, extraFlags);

        numList = getWordMatches(num_.getStrVal(), &adjective,
                                 resolver, extraFlags, 0x0002)
                  + getWordMatches('#', &adjective,
                                   resolver, extraFlags, 0x0002);

        return intersectNounLists(numList, baseList);
    }
    getAdjustedTokens()
    {
        return [num_.getStrVal(), &adjective] + np_.getAdjustedTokens();
    }
;

grammar simplePluralPhrase(adjAndOnes): adjective->adj_ 'ones'
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return getWordMatches(adj_, &adjective, resolver,
                              extraFlags | 0x0001, 0x0002);
    }
    getAdjustedTokens()
    {
        return [adj_, &adjective];
    }
;

grammar simplePluralPhrase(empty): [badness 600] : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return results.emptyNounPhrase(resolver);
    }
    getAdjustedTokens()
    {
        return [];
    }
;


grammar simplePluralPhrase(misc):
    [badness 300] miscWordList->lst_ : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        local lst = lst_.getVocabMatchList(resolver, results, extraFlags);

                if (lst == nil || lst.length() == 0)
            results.noteMiscWordList(lst_.getOrigText());

        return lst;
    }
    getAdjustedTokens()
    {
        return lst_.getAdjustedTokens();
    }
;

 
 

grammar adjPhrase(adj): adjective->adj_ : AdjPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        results.noteAdjEnding();

        local lst = getWordMatches(adj_, &adjective, resolver,
                                   extraFlags | 0x0001, 0x0002);

        if (resolver.isGlobalScope)
            lst = addNounMatchList(lst, resolver, results, extraFlags);

        return lst;
    }
        getAdjustedTokens()
    {
        return [adj_, &adjective];
    }
;
grammar adjPhrase(adjAdj): adjective->adj_ adjPhrase->ap_
    : NounPhraseWithVocab
     
    getVocabMatchList(resolver, results, extraFlags)
    {
         
                 return intersectWordMatches(
            adj_, &adjective, resolver, extraFlags, 0x0002,
            ap_.getVocabMatchList(resolver, results, extraFlags));
    }
    getAdjustedTokens()
    {
        return [adj_, &adjective] + ap_.getAdjustedTokens();
    }
;

grammar topicPhrase(main): singleNoun->np_ : TopicProd
;

grammar topicPhrase(misc): miscWordList->np_ : TopicProd
   resolveNouns(resolver, results)
   {
        
       results.noteMiscWordList(np_.getOrigText());

       return inherited(resolver, results);
   }
;
grammar quotedStringPhrase(main): tokString->str_ : LiteralProd
     
         getStringText() { return stripQuotesFrom(str_); }
;

stripQuotesFrom(str)
{
    local hasOpen;
    local hasClose;

    hasOpen = hasClose = nil;
        if (str.startsWith('\'') || str.startsWith('"'))
    {
         
        hasOpen = true;
        hasClose = (str.length() > 2 && str.endsWith(str.substr(1, 1)));
    }
    else if (str.startsWith('`'))
    {
         
        hasOpen = true;
        hasClose = (str.length() > 2
                    && (str.endsWith('`') || str.endsWith('\'')));
    }
    else if (str.startsWith('\u201C'))
    {
         
        hasOpen = true;
        hasClose = str.endsWith('\u201D');
    }
    else if (str.startsWith('\u2018'))
    {
         
        hasOpen = true;
        hasClose = str.endsWith('\u2019');
    }

    if (hasOpen)
    {
        if (hasClose)
            str = str.substr(2, str.length() - 2);
        else
            str = str.substr(2);
    }

    return str;
}
grammar literalPhrase(string): quotedStringPhrase->str_ : LiteralProd
    getLiteralText(results, action, which)
    {
         
        return str_.getStringText();
    }
        getTentativeLiteralText()
    {
         
                 return str_.getStringText();
    }
        resolveLiteral(results)
    {
         
        results.noteLiteral(str_.getOrigText());
    }
;
grammar literalPhrase(miscList): miscWordList->misc_ : LiteralProd
    getLiteralText(results, action, which)
    {
         
        local txt = misc_.getOrigText();

                if (misc_.getOrigTokenList().length() == 1)
            txt = stripQuotesFrom(txt);

        return txt;
    }
        getTentativeLiteralText()
    {
         
        return misc_.getOrigText();
    }
        resolveLiteral(results)
    {
         

        results.noteLiteral(misc_.getOrigText());
    }
;

grammar literalPhrase(empty): [badness 400]: EmptyLiteralPhraseProd
    resolveLiteral(results) { }
;

grammar miscWordList(wordOrNumber):
    tokWord->txt_ | tokInt->txt_ | tokApostropheS->txt_
    | tokPluralApostrophe->txt_
    | tokPoundInt->txt_ | tokString->txt_ | tokAbbrPeriod->txt_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return [];
    }
    getAdjustedTokens()
    {
         
        return [txt_, &miscWord];
    }
;
grammar miscWordList(list):
    (tokWord->txt_ | tokInt->txt_ | tokApostropheS->txt_
     | tokPluralApostrophe->txt_ | tokAbbrPeriod->txt_
     | tokPoundInt->txt_ | tokString->txt_) miscWordList->lst_
    : NounPhraseWithVocab
    getVocabMatchList(resolver, results, extraFlags)
    {
         
        return [];
    }
    getAdjustedTokens()
    {
         
        return [txt_, &miscWord] + lst_.getAdjustedTokens();
    }
;
grammar mainDisambigPhrase(main):
    disambigPhrase->dp_
    | disambigPhrase->dp_ '.'
    : BasicProd
    resolveNouns(resolver, results)
    {
        return dp_.resolveNouns(resolver, results);
    }
    getResponseList() { return dp_.getResponseList(); }
;


grammar disambigPhrase(all):
    'all' | 'everything' | 'all' 'of' 'them' : DisambigProd
    resolveNouns(resolver, results)
    {
         
        return removeAmbigFlags(resolver.getAll(self));
    }

    getResponseList() { return [self]; }
;
grammar disambigPhrase(both): 'both' | 'both' 'of' 'them' : DisambigProd
    resolveNouns(resolver, results)
    {
         

        return removeAmbigFlags(resolver.getAll(self));
    }

    getResponseList() { return [self]; }
;
grammar disambigPhrase(any): 'any' | 'any' 'of' 'them' : DisambigProd
    resolveNouns(resolver, results)
    {
        local lst;

        lst = resolver.matchList.sublist(1, 1);

                if (lst.length() > 0)
            lst[1].flags_ |= 0x0040;

        return lst;
    }

    getResponseList() { return [self]; }
;
grammar disambigPhrase(list): disambigList->lst_ : DisambigProd
    resolveNouns(resolver, results)
    {
        return removeAmbigFlags(lst_.resolveNouns(resolver, results));
    }

    getResponseList() { return lst_.getResponseList(); }
;
grammar disambigPhrase(ordinalList):
    disambigOrdinalList->lst_ 'ones'
    | 'the' disambigOrdinalList->lst_ 'ones'
    : DisambigProd
        resolveNouns(resolver, results)
    {
         
        return removeAmbigFlags(lst_.resolveNouns(resolver, results));
    }

    getResponseList() { return [lst_]; }
;

grammar disambigList(single): disambigListItem->item_ : DisambigProd
    resolveNouns(resolver, results)
    {
        return item_.resolveNouns(resolver, results);
    }

    getResponseList() { return [item_]; }
;
grammar disambigList(list):
    disambigListItem->item_ commandOrNounConjunction disambigList->lst_
    : DisambigProd
        resolveNouns(resolver, results)
    {
        return item_.resolveNouns(resolver, results)
            + lst_.resolveNouns(resolver, results);
    }

    getResponseList() { return [item_] + lst_.getResponseList(); }
;


class DisambigOrdProd: DisambigProd
    resolveNouns(resolver, results)
    {
         
        results.noteDisambigOrdinal();

        return selectByOrdinal(ord_, resolver, results);
    }
        selectByOrdinal(ordTok, resolver, results)
    {
        local idx;
        local matchList = resolver.ordinalMatchList;


        idx = cmdDict.findWord(ordTok, &ordinalWord)[1].numval;

                if (idx == -1)
            idx = matchList.length();

        if (idx > matchList.length())
        {
             
            results.noteOrdinalOutOfRange(ordTok);

            return [];
        }

        return matchList.sublist(idx, 1);
    }
;

class DisambigVocabProd: DisambigProd
;


grammar disambigListItem(ordinal):
    ordinalWord->ord_
    | ordinalWord->ord_ 'one'
    | 'the' ordinalWord->ord_
    | 'the' ordinalWord->ord_ 'one'
    : DisambigOrdProd
;
grammar disambigListItem(noun):
    completeNounPhraseWithoutAll->np_
    | terminalNounPhrase->np_
    : DisambigVocabProd
    resolveNouns(resolver, results)
    {
         
        local lst = np_.resolveNouns(resolver, results);

        results.noteMatches(lst);

        return lst;
    }
;
grammar disambigListItem(plural):
    pluralPhrase->np_
    : DisambigVocabProd
    resolveNouns(resolver, results)
    {
        local lst;


        lst = np_.resolveNouns(resolver, results);

                if (lst.length() == 0)
            results.noMatch(resolver.getAction(), np_.getOrigText());
        else
            results.noteMatches(lst);

        return lst;
    }
;
grammar disambigListItem(possessive): possessiveNounPhrase->poss_
    : DisambigPossessiveProd
;


grammar disambigOrdinalList(tail):
    ordinalWord->ord1_ ('and' | ',') ordinalWord->ord2_ : DisambigOrdProd
    resolveNouns(resolver, results)
    {
         
        results.noteDisambigOrdinal();
        results.noteDisambigOrdinal();

        return selectByOrdinal(ord1_, resolver, results)
            + selectByOrdinal(ord2_, resolver, results);
    }
;
grammar disambigOrdinalList(head):
    ordinalWord->ord_ ('and' | ',') disambigOrdinalList->lst_
    : DisambigOrdProd
    resolveNouns(resolver, results)
    {
         
        results.noteDisambigOrdinal();

        return selectByOrdinal(ord_, resolver, results)
            + lst_.resolveNouns(resolver, results);
    }
;
object ordinalWord='former' numval=1;
object ordinalWord='first' numval=1;
object ordinalWord='second' numval=2;
object ordinalWord='third' numval=3;
object ordinalWord='fourth' numval=4;
object ordinalWord='fifth' numval=5;
object ordinalWord='sixth' numval=6;
object ordinalWord='seventh' numval=7;
object ordinalWord='eighth' numval=8;
object ordinalWord='ninth' numval=9;
object ordinalWord='tenth' numval=10;
object ordinalWord='eleventh' numval=11;
object ordinalWord='twelfth' numval=12;
object ordinalWord='thirteenth' numval=13;
object ordinalWord='fourteenth' numval=14;
object ordinalWord='fifteenth' numval=15;
object ordinalWord='sixteenth' numval=16;
object ordinalWord='seventeenth' numval=17;
object ordinalWord='eighteenth' numval=18;
object ordinalWord='nineteenth' numval=19;
object ordinalWord='twentieth' numval=20;
object ordinalWord='1st' numval=1;
object ordinalWord='2nd' numval=2;
object ordinalWord='3rd' numval=3;
object ordinalWord='4th' numval=4;
object ordinalWord='5th' numval=5;
object ordinalWord='6th' numval=6;
object ordinalWord='7th' numval=7;
object ordinalWord='8th' numval=8;
object ordinalWord='9th' numval=9;
object ordinalWord='10th' numval=10;
object ordinalWord='11th' numval=11;
object ordinalWord='12th' numval=12;
object ordinalWord='13th' numval=13;
object ordinalWord='14th' numval=14;
object ordinalWord='15th' numval=15;
object ordinalWord='16th' numval=16;
object ordinalWord='17th' numval=17;
object ordinalWord='18th' numval=18;
object ordinalWord='19th' numval=19;
object ordinalWord='20th' numval=20;

object ordinalWord='last' numval=-1;
object ordinalWord='latter' numval=-1;

class NumberProd: BasicProd
     
    getval() { return 0; }
        getStrVal() { return toString(getval()); }
;


grammar numberPhrase(digits): tokInt->num_ : NumberProd
     
    getval() { return toInteger(num_); }

        getStrVal() { return num_; }
;
grammar numberPhrase(spelled): spelledNumber->num_ : NumberProd
     
    getval() { return num_.getval(); }
;


grammar poundNumberPhrase(main): tokPoundInt->num_ : NumberProd
    getval() { return toInteger(num_.substr(2)); }

        getStrVal() { return num_.substr(2); }
;

 
 object digitWord='one' numval=1;
object digitWord='two' numval=2;
object digitWord='three' numval=3;
object digitWord='four' numval=4;
object digitWord='five' numval=5;
object digitWord='six' numval=6;
object digitWord='seven' numval=7;
object digitWord='eight' numval=8;
object digitWord='nine' numval=9;
object teenWord='ten' numval=10;
object teenWord='eleven' numval=11;
object teenWord='twelve' numval=12;
object teenWord='thirteen' numval=13;
object teenWord='fourteen' numval=14;
object teenWord='fifteen' numval=15;
object teenWord='sixteen' numval=16;
object teenWord='seventeen' numval=17;
object teenWord='eighteen' numval=18;
object teenWord='nineteen' numval=19;
object tensWord='twenty' numval=20;
object tensWord='thirty' numval=30;
object tensWord='forty' numval=40;
object tensWord='fifty' numval=50;
object tensWord='sixty' numval=60;
object tensWord='seventy' numval=70;
object tensWord='eighty' numval=80;
object tensWord='ninety' numval=90;
grammar spelledSmallNumber(digit): digitWord->num_ : NumberProd
    getval()
    {
         
                 return cmdDict.findWord(num_, &digitWord)[1].numval;
    }
;
grammar spelledSmallNumber(teen): teenWord->num_ : NumberProd
    getval()
    {
         
        return cmdDict.findWord(num_, &teenWord)[1].numval;
    }
;
grammar spelledSmallNumber(tens): tensWord->num_ : NumberProd
    getval()
    {
         
        return cmdDict.findWord(num_, &tensWord)[1].numval;
    }
;
grammar spelledSmallNumber(tensAndUnits):
    tensWord->tens_ '-'->sep_ digitWord->units_
    | tensWord->tens_ digitWord->units_
    : NumberProd
    getval()
    {
         
        return cmdDict.findWord(tens_, &tensWord)[1].numval
            + cmdDict.findWord(units_, &digitWord)[1].numval;
    }
;
grammar spelledSmallNumber(zero): 'zero' : NumberProd
    getval() { return 0; }
;
grammar spelledHundred(small): spelledSmallNumber->num_ : NumberProd
    getval() { return num_.getval(); }
;
grammar spelledHundred(hundreds): spelledSmallNumber->hun_ 'hundred'
    : NumberProd
    getval() { return hun_.getval() * 100; }
;
grammar spelledHundred(hundredsPlus):
    spelledSmallNumber->hun_ 'hundred' spelledSmallNumber->num_
    | spelledSmallNumber->hun_ 'hundred' 'and'->and_ spelledSmallNumber->num_
    : NumberProd
    getval() { return hun_.getval() * 100 + num_.getval(); }
;
grammar spelledHundred(aHundred): 'a' 'hundred' : NumberProd
    getval() { return 100; }
;
grammar spelledHundred(aHundredPlus):
    'a' 'hundred' 'and' spelledSmallNumber->num_
    : NumberProd
    getval() { return 100 + num_.getval(); }
;
grammar spelledThousand(thousands): spelledHundred->thou_ 'thousand'
    : NumberProd
    getval() { return thou_.getval() * 1000; }
;
grammar spelledThousand(thousandsPlus):
    spelledHundred->thou_ 'thousand' spelledHundred->num_
    : NumberProd
    getval() { return thou_.getval() * 1000 + num_.getval(); }
;
grammar spelledThousand(thousandsAndSmall):
    spelledHundred->thou_ 'thousand' 'and' spelledSmallNumber->num_
    : NumberProd
    getval() { return thou_.getval() * 1000 + num_.getval(); }
;
grammar spelledThousand(aThousand): 'a' 'thousand' : NumberProd
    getval() { return 1000; }
;
grammar spelledThousand(aThousandAndSmall):
    'a' 'thousand' 'and' spelledSmallNumber->num_
    : NumberProd
    getval() { return 1000 + num_.getval(); }
;
grammar spelledMillion(millions): spelledHundred->mil_ 'million': NumberProd
    getval() { return mil_.getval() * 1000000; }
;
grammar spelledMillion(millionsPlus):
    spelledHundred->mil_ 'million'
    (spelledThousand->nxt_ | spelledHundred->nxt_)
    : NumberProd
    getval() { return mil_.getval() * 1000000 + nxt_.getval(); }
;
grammar spelledMillion(aMillion): 'a' 'million' : NumberProd
    getval() { return 1000000; }
;
grammar spelledMillion(aMillionAndSmall):
    'a' 'million' 'and' spelledSmallNumber->num_
    : NumberProd
    getval() { return 1000000 + num_.getval(); }
;
grammar spelledMillion(millionsAndSmall):
    spelledHundred->mil_ 'million' 'and' spelledSmallNumber->num_
    : NumberProd
    getval() { return mil_.getval() * 1000000 + num_.getval(); }
;
grammar spelledNumber(main):
    spelledHundred->num_
    | spelledThousand->num_
    | spelledMillion->num_
    : NumberProd
    getval() { return num_.getval(); }
;

 
 

grammar oopsCommand(main):
    oopsPhrase->oops_ | oopsPhrase->oops_ '.' : BasicProd
    getNewTokens() { return oops_.getNewTokens(); }
;
grammar oopsPhrase(main):
    'oops' miscWordList->lst_
    | 'oops' ',' miscWordList->lst_
    | 'o' miscWordList->lst_
    | 'o' ',' miscWordList->lst_
    : BasicProd
    getNewTokens() { return lst_.getOrigTokenList(); }
;
grammar oopsPhrase(missing):
    'oops' | 'o'
    : BasicProd
    getNewTokens() { return nil; }
;

modify finishOptionQuit
    desc = "<<aHrefAlt('quit', 'QUIT', '<b>Q</b>UIT', 'Leave the story')>>"
    responseKeyword = 'quit'
    responseChar = 'q'
;
modify finishOptionRestore
    desc = "<<aHrefAlt('restore', 'RESTORE', '<b>R</b>ESTORE',
            'Restore a saved position')>> a saved position"
    responseKeyword = 'restore'
    responseChar = 'r'
;
modify finishOptionRestart
    desc = "<<aHrefAlt('restart', 'RESTART', 'RE<b>S</b>TART',
            'Start the story over from the beginning')>> the story"
    responseKeyword = 'restart'
    responseChar = 's'
;
modify finishOptionUndo
    desc = "<<aHrefAlt('undo', 'UNDO', '<b>U</b>NDO',
            'Undo the last move')>> the last move"
    responseKeyword = 'undo'
    responseChar = 'u'
;
modify finishOptionCredits
    desc = "see the <<aHrefAlt('credits', 'CREDITS', '<b>C</b>REDITS',
            'Show credits')>>"
    responseKeyword = 'credits'
    responseChar = 'c'
;
modify finishOptionFullScore
    desc = "see your <<aHrefAlt('full score', 'FULL SCORE',
            '<b>F</b>ULL SCORE', 'Show full score')>>"
    responseKeyword = 'full score'
    responseChar = 'f'
;
modify finishOptionAmusing
    desc = "see some <<aHrefAlt('amusing', 'AMUSING', '<b>A</b>MUSING',
            'Show some amusing things to try')>> things to try"
    responseKeyword = 'amusing'
    responseChar = 'a'
;
modify restoreOptionStartOver
    desc = "<<aHrefAlt('start', 'START', '<b>S</b>TART',
            'Start from the beginning')>> the game from the beginning"
    responseKeyword = 'start'
    responseChar = 's'
;
modify restoreOptionRestoreAnother
    desc = "<<aHrefAlt('restore', 'RESTORE', '<b>R</b>ESTORE',
            'Restore a saved position')>> a different saved position"
;

class GetVerbPhraseContext: object
     
    objNameObj(obj)
    {
         
                 if (obj == pronounObj)
            return obj.itObj;
        else
            return obj.theNameObj;
    }

    isObjPronoun(obj) { return (obj == pronounObj); }

    setPronounObj(obj) { pronounObj = obj; }

    pronounObj = nil
;


defaultGetVerbPhraseContext: GetVerbPhraseContext
     
    setPronounObj(obj) { }
;

class ImplicitAnnouncementContext: object
    useInfPhrase = nil

    isInList = nil
        isInSublist = nil

    getVerbCtx = nil

    buildImplicitAnnouncement(txt)
    {
         
        if (!isInList)
            txt = '<./p0>\n<.assume>first ' + txt + '<./assume>\n';

        return txt;
    }
;

standardImpCtx: ImplicitAnnouncementContext;

tryingImpCtx: ImplicitAnnouncementContext
     
         useInfPhrase = true

    buildImplicitAnnouncement(txt)
    {
         
                 if (!isInSublist)
            txt = 'trying to ' + txt;

        return inherited(txt);
    }
;


askingImpCtx: tryingImpCtx;


class ListImpCtx: ImplicitAnnouncementContext, GetVerbPhraseContext
     
         setBaseCtx(ctx)
    {
         
                 if (ctx.justTrying)
            baseCtx = tryingImpCtx;
        else if (ctx.justAsking)
            baseCtx = askingImpCtx;
        else
            baseCtx = standardImpCtx;
    }

    isInList = true

    getVerbCtx = (self)

    useInfPhrase = (delegated baseCtx)

    buildImplicitAnnouncement(txt) { return delegated baseCtx(txt); }

    baseCtx = nil
;

 

modify Action
    resolveAction(issuingActor, targetActor) { return self; }
    whatObj(which)
    {
         
    }

    whatTranslate(txt)
    {
         
                 return (txt == 'whom' ? (libGlobal.libMessageObj).whomPronoun : txt);
    }
        objListPronoun(objList)
    {
        local himCnt, herCnt, themCnt;
        local FirstPersonCnt, SecondPersonCnt;
        local resolvedNumber;

        if (objList == nil || objList == [])
            return 'it';

        resolvedNumber = objList.length();


        foreach (local cur in objList)
        {
             
                         if (cur.extraObjects != nil)
                objList += cur.extraObjects;
        }

                if (objList.length() > 1 && resolvedNumber > 1)
            return 'them';

                    himCnt = herCnt = themCnt = 0;
        FirstPersonCnt = SecondPersonCnt = 0;
        foreach (local cur in objList)
        {
             
            if (cur.obj_.isHim)
                ++himCnt;

            if (cur.obj_.isHer)
                ++herCnt;

            if (cur.obj_.isPlural)
                ++themCnt;

            if (cur.obj_.referralPerson == 1)
                ++FirstPersonCnt;

            if (cur.obj_.referralPerson == 2)
                ++SecondPersonCnt;
        }


        if (themCnt == objList.length())
            return 'them';
        else if (FirstPersonCnt == objList.length())
            return 'myself';
        else if (SecondPersonCnt == objList.length())
            return 'yourself';
        else if (himCnt == objList.length() && herCnt == 0)
            return 'him';
        else if (herCnt == objList.length() && himCnt == 0)
            return 'her';
        else if (herCnt == 0 && himCnt == 0)
            return 'it';
        else
            return 'them';
    }
        announceDefaultObject(obj, whichObj, resolvedAllObjects)
    {
         
                 return '';
    }

        announceAllDefaultObjects(allResolved) { }
        getImplicitPhrase(ctx)
    {
         
                 return getVerbPhrase(ctx.useInfPhrase, ctx.getVerbCtx);
    }
        getInfPhrase()
    {
         
        return getVerbPhrase(true, nil);
    }

    getQuestionInf(which)
    {
         
                 return getInfPhrase();
    }
        getParticiplePhrase()
    {
         
        return getVerbPhrase(nil, nil);
    }
        getVerbPhrase(inf, ctx)
    {
         
                 rexMatch('(.*)/(<alphanum|-|squote>+)(.*)', verbPhrase);

        if (inf)
        {
             
                         return rexGroup(1)[3] + rexGroup(3)[3];
        }
        else
        {
             
            return rexGroup(2)[3] + rexGroup(3)[3];
        }
    }

    noMatch(msgObj, actor, txt) { msgObj.noMatchCannotSee(actor, txt); }

        verbFlags = 0

    spPrefix(str) { return (str == '' ? str : ' ' + str); }
    spSuffix(str) { return (str == '' ? str : str + ' '); }
;


modify TAction
     
    whatObj(which)
    {
         
                 rexSearch('<lparen>.*?(<alpha>+)<rparen>', verbPhrase);
        return whatTranslate(rexGroup(1)[3]);
    }

    announceDefaultObject(obj, whichObj, resolvedAllObjects)
    {
         
                 rexSearch('<lparen>(.*<space>+)?<alpha>+<rparen>', verbPhrase);
        local prep = (rexGroup(1) == nil ? '' : rexGroup(1)[3]);

        if (prep != nil)
            prep = adjustDefaultObjectPrep(prep, obj);


        local nm = obj.getAnnouncementDistinguisher(
            (libGlobal.curActor).scopeList()).theName(obj);

        return (prep == '' ? nm : prep + nm);
    }
        adjustDefaultObjectPrep(prep, obj) { return prep; }

    announceAllDefaultObjects(allResolved)
    {
         
        maybeAnnounceDefaultObject(dobjList_, DirectObject, allResolved);
    }

    getQuestionInf(which)
    {
         
                 rexSearch('(.*)/<alphanum|-|squote>+(.*?)<space>+'
                  + '<lparen>(.*?)<space>*?<alpha>+<rparen>',
                  verbPhrase);
        return rexGroup(1)[3] + spPrefix(rexGroup(2)[3])
            + spPrefix(rexGroup(3)[3]);
    }

    getVerbPhrase(inf, ctx)
    {
        local dobj;
        local dobjText;
        local dobjIsPronoun;
        local ret;

        if (ctx == nil)
            ctx = defaultGetVerbPhraseContext;

        dobj = getDobj();

        dobjIsPronoun = ctx.isObjPronoun(dobj);

        dobjText = ctx.objNameObj(dobj);

        ret = getVerbPhrase1(inf, verbPhrase, dobjText, dobjIsPronoun);

        ctx.setPronounObj(dobj);

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

        if (dprep != nil)
            dprep = adjustDefaultObjectPrep(dprep, getDobj());

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
    omitIobjInDobjQuery = nil
    isPrepositionalPhrasing = true

    resolveNouns(issuingActor, targetActor, results)
    {
         

        if (!isPrepositionalPhrasing)
        {
             
                         if (rexMatch('(a|an|the|some|any)<space>',
                         dobjMatch.getOrigText()) == nil)
            {
                 
                results.noteWeakPhrasing(100);
            }
        }

        inherited(issuingActor, targetActor, results);
    }

    whatObj(which)
    {
        switch (which)
        {
        case DirectObject:
             
                         rexSearch('<lparen>.*?(<alpha>+)<rparen>', verbPhrase);
            break;
                    case IndirectObject:
             
                         rexSearch('<rparen>.*<lparen>.*?(<alpha>+)<rparen>', verbPhrase);
            break;
        }

        return whatTranslate(rexGroup(1)[3]);
    }

    announceDefaultObject(obj, whichObj, resolvedAllObjects)
    {
         
        local verb = '';
        local prep = '';

                if (whichObj == DirectObject && resolvedAllObjects)
        {
             
                         rexSearch('/(<^lparen>+) <lparen>', verbPhrase);
            verb = rexGroup(1)[3] + ' ';
        }

        switch(whichObj)
        {
        case DirectObject:
             
            rexSearch('<lparen>(.*?)<space>*<alpha>+<rparen>', verbPhrase);
            prep = rexGroup(1)[3];
            break;
                    case IndirectObject:
             
            rexSearch('<rparen>.*<lparen>(.*?)<space>*<alpha>+<rparen>',
                      verbPhrase);
            prep = rexGroup(1)[3];
            break;
        }


        local nm = obj.getAnnouncementDistinguisher(
            (libGlobal.curActor).scopeList()).theName(obj);

        return spSuffix(verb) + spSuffix(prep) + nm;
    }

    announceAllDefaultObjects(allResolved)
    {
         
        maybeAnnounceDefaultObject(dobjList_, DirectObject, allResolved);

        maybeAnnounceDefaultObject(iobjList_, IndirectObject, allResolved);
    }

    getQuestionInf(which)
    {
        local ret;
        local vcomp;
        local dprep;
        local iprep;
        local pro;


         
        rexMatch('(.*)/<alphanum|-|squote>+(?:<space>+(<^lparen>*))?'
                 + '<space>+<lparen>(.*?)<space>*<alpha>+<rparen>'
                 + '<space>+<lparen>(.*?)<space>*<alpha>+<rparen>',
                 verbPhrase);

        ret = rexGroup(1)[3];

        vcomp = (rexGroup(2) == nil ? '' : rexGroup(2)[3]);

        dprep = rexGroup(3)[3];
        iprep = rexGroup(4)[3];

        pro = getOtherMessageObjectPronoun(which);

        if (which == DirectObject)
        {
             
            ret += spPrefix(vcomp) + spPrefix(dprep);

            if (!omitIobjInDobjQuery && pro != nil)
                ret += spPrefix(iprep) + ' ' + pro;
        }
        else
        {
             
            if (pro != nil)
                ret += spPrefix(dprep) + ' ' + pro;

            ret += spPrefix(vcomp) + spPrefix(iprep);
        }

        return ret;
    }


    getOtherMessageObjectPronoun(which)
    {
        local lst;

                lst = (which == DirectObject ? iobjList_ : dobjList_);
        if (lst == nil || lst == [])
            lst = (which == DirectObject
                   ? tentativeIobj_ : tentativeDobj_);

        if (lst != nil && lst != [])
        {
             
            return objListPronoun(lst);
        }
        else
        {
             
            return nil;
        }
    }

    getVerbPhrase(inf, ctx)
    {
        local dobj, dobjText, dobjIsPronoun;
        local iobj, iobjText;
        local ret;

        if (ctx == nil)
            ctx = defaultGetVerbPhraseContext;

        dobj = getDobj();
        dobjText = ctx.objNameObj(dobj);
        dobjIsPronoun = ctx.isObjPronoun(dobj);

        iobj = getIobj();
        iobjText = (iobj != nil ? ctx.objNameObj(iobj) : nil);

        ret = getVerbPhrase2(inf, verbPhrase,
                             dobjText, dobjIsPronoun, iobjText);


        if (ctx.pronounObj != iobj)
            ctx.setPronounObj(dobj);

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

modify LiteralAction
     
    verbPhrase = 'verb/verbing (what)'

    whatObj(which)
    {
         
        return delegated TAction(which);
    }
        getVerbPhrase(inf, ctx)
    {
         
        return TAction.getVerbPhrase1(inf, verbPhrase, ((libGlobal.curAction).getLiteral()), nil);
    }
        getQuestionInf(which)
    {
         
        return delegated TAction(which);
    }
    ;

    modify LiteralTAction
    announceDefaultObject(obj, whichObj, resolvedAllObjects)
    {
         

        return delegated TIAction(obj, whichMessageObject,
                                  resolvedAllObjects);
    }
        whatObj(which)
    {
         
        return delegated TIAction(which);
    }
        getQuestionInf(which)
    {
         

        return delegated TIAction(which);
    }
        getOtherMessageObjectPronoun(which)
    {
         

        if (which == whichMessageLiteral)
        {
             
                         return delegated TIAction(IndirectObject);
        }
        else
        {
             

            return 'that';
        }
    }
        getVerbPhrase(inf, ctx)
    {
        local dobj, dobjText, dobjIsPronoun;
        local litText;
        local ret;

        if (ctx == nil)
            ctx = defaultGetVerbPhraseContext;

        dobj = getDobj();
        dobjText = ctx.objNameObj(dobj);
        dobjIsPronoun = ctx.isObjPronoun(dobj);

        litText = ((libGlobal.curAction).getLiteral());


        if (whichMessageLiteral == DirectObject)
            ret = TIAction.getVerbPhrase2(inf, verbPhrase,
                                          litText, nil, dobjText);
        else
            ret = TIAction.getVerbPhrase2(inf, verbPhrase,
                                          dobjText, dobjIsPronoun, litText);

        ctx.setPronounObj(dobj);

        return ret;
    }
;

modify TopicAction
     
    whatObj(which)
    {
         
        return delegated TAction(which);
    }
        getVerbPhrase(inf, ctx)
    {
         
        return TAction.getVerbPhrase1(
            inf, verbPhrase, getTopic().getTopicText().toLower(), nil);
    }
        getQuestionInf(which)
    {
         
        return delegated TAction(which);
    }
    ;


modify TopicTAction
    announceDefaultObject(obj, whichObj, resolvedAllObjects)
    {
         

        return delegated TIAction(obj, whichMessageObject,
                                  resolvedAllObjects);
    }
        whatObj(which)
    {
         
        return delegated TIAction(which);
    }
        getQuestionInf(which)
    {
         
        return delegated TIAction(which);
    }
        getOtherMessageObjectPronoun(which)
    {
         
                 if (which == whichMessageTopic)
        {
             

            return delegated TIAction(IndirectObject);
        }
        else
        {
             
            return 'that';
        }
    }
        getVerbPhrase(inf, ctx)
    {
        local dobj, dobjText, dobjIsPronoun;
        local topicText;
        local ret;

        if (ctx == nil)
            ctx = defaultGetVerbPhraseContext;

        dobj = getDobj();
        dobjText = ctx.objNameObj(dobj);
        dobjIsPronoun = ctx.isObjPronoun(dobj);

        topicText = getTopic().getTopicText().toLower();


        if (whichMessageTopic == DirectObject)
            ret = TIAction.getVerbPhrase2(inf, verbPhrase,
                                          topicText, nil, dobjText);
        else
            ret = TIAction.getVerbPhrase2(inf, verbPhrase,
                                          dobjText, dobjIsPronoun, topicText);

        ctx.setPronounObj(dobj);

        return ret;
    }
;
grammar predicate(Take):
    ('take' | 'pick' 'up' | 'get') nounList->dobjMatch
    | 'pick' nounList->dobjMatch 'up'
    : TakeAction
    verbPhrase = 'take/taking (what)'
;
grammar predicate(TakeFrom):
    ('take' | 'get') nounList->dobjMatch
        ('from' | 'out' 'of' | 'off' | 'off' 'of') singleNoun->iobjMatch
    | 'remove' nounList->dobjMatch 'from' singleNoun->iobjMatch
    : TakeFromAction
    verbPhrase = 'take/taking (what) (from what)'
;
grammar predicate(Remove):
    'remove' nounList->dobjMatch
    : RemoveAction
    verbPhrase = 'remove/removing (what)'
;
grammar predicate(Drop):
    ('drop' | 'put' 'down' | 'set' 'down') nounList->dobjMatch
    | ('put' | 'set') nounList->dobjMatch 'down'
    : DropAction
    verbPhrase = 'drop/dropping (what)'
;
grammar predicate(Examine):
    ('examine' | 'inspect' | 'x'
     | 'look' 'at' | 'l' 'at' | 'look' | 'l') nounList->dobjMatch
    : ExamineAction
    verbPhrase = 'examine/examining (what)'
;
grammar predicate(Read):
    'read' nounList->dobjMatch
    : ReadAction
    verbPhrase = 'read/reading (what)'
;
grammar predicate(LookIn):
    ('look' | 'l') ('in' | 'inside') nounList->dobjMatch
    : LookInAction
    verbPhrase = 'look/looking (in what)'
;
grammar predicate(Search):
    'search' nounList->dobjMatch
    : SearchAction
    verbPhrase = 'search/searching (what)'
;
grammar predicate(LookThrough):
    ('look' | 'l') ('through' | 'thru' | 'out') nounList->dobjMatch
    : LookThroughAction
    verbPhrase = 'look/looking (through what)'
;
grammar predicate(LookUnder):
    ('look' | 'l') 'under' nounList->dobjMatch
    : LookUnderAction
    verbPhrase = 'look/looking (under what)'
;
grammar predicate(LookBehind):
    ('look' | 'l') 'behind' nounList->dobjMatch
    : LookBehindAction
    verbPhrase = 'look/looking (behind what)'
;
grammar predicate(Feel):
    ('feel' | 'touch') nounList->dobjMatch
    : FeelAction
    verbPhrase = 'touch/touching (what)'
;
grammar predicate(Taste):
    'taste' nounList->dobjMatch
    : TasteAction
    verbPhrase = 'taste/tasting (what)'
;
grammar predicate(Smell):
    ('smell' | 'sniff') nounList->dobjMatch
    : SmellAction
    verbPhrase = 'smell/smelling (what)'
        noMatch(msgObj, actor, txt) { msgObj.noMatchNotAware(actor, txt); }
;
grammar predicate(SmellImplicit):
    'smell' | 'sniff'
    : SmellImplicitAction
    verbPhrase = 'smell/smelling'
;
grammar predicate(ListenTo):
    ('hear' | 'listen' 'to' ) nounList->dobjMatch
    : ListenToAction
    verbPhrase = 'listen/listening (to what)'
        noMatch(msgObj, actor, txt) { msgObj.noMatchNotAware(actor, txt); }
;
grammar predicate(ListenImplicit):
    'listen' | 'hear'
    : ListenImplicitAction
    verbPhrase = 'listen/listening'
;
grammar predicate(PutIn):
    ('put' | 'place' | 'set') nounList->dobjMatch
        ('in' | 'into' | 'in' 'to' | 'inside' | 'inside' 'of') singleNoun->iobjMatch
    : PutInAction
    verbPhrase = 'put/putting (what) (in what)'
    askIobjResponseProd = inSingleNoun
;
grammar predicate(PutOn):
    ('put' | 'place' | 'drop' | 'set') nounList->dobjMatch
        ('on' | 'onto' | 'on' 'to' | 'upon') singleNoun->iobjMatch
    | 'put' nounList->dobjMatch 'down' 'on' singleNoun->iobjMatch
    : PutOnAction
    verbPhrase = 'put/putting (what) (on what)'
    askIobjResponseProd = onSingleNoun
;
grammar predicate(PutUnder):
    ('put' | 'place' | 'set') nounList->dobjMatch 'under' singleNoun->iobjMatch
    : PutUnderAction
    verbPhrase = 'put/putting (what) (under what)'
;
grammar predicate(PutBehind):
    ('put' | 'place' | 'set') nounList->dobjMatch 'behind' singleNoun->iobjMatch
    : PutBehindAction
    verbPhrase = 'put/putting (what) (behind what)'
;
grammar predicate(PutInWhat):
    [badness 500] ('put' | 'place') nounList->dobjMatch
    : PutInAction
    verbPhrase = 'put/putting (what) (in what)'
    construct()
    {
         
        iobjMatch = new EmptyNounPhraseProd();
        iobjMatch.responseProd = inSingleNoun;
    }
;
grammar predicate(Wear):
    ('wear' | 'don' | 'put' 'on') nounList->dobjMatch
    | 'put' nounList->dobjMatch 'on'
    : WearAction
    verbPhrase = 'wear/wearing (what)'
;
grammar predicate(Doff):
    ('doff' | 'take' 'off') nounList->dobjMatch
    | 'take' nounList->dobjMatch 'off'
    : DoffAction
    verbPhrase = 'take/taking off (what)'
;
grammar predicate(Kiss):
    'kiss' singleNoun->dobjMatch
    : KissAction
    verbPhrase = 'kiss/kissing (whom)'
;
grammar predicate(AskFor):
    ('ask' | 'a') singleNoun->dobjMatch 'for' topicPhrase->topicMatch
    | ('ask' | 'a') 'for' topicPhrase->topicMatch 'from' singleNoun->dobjMatch
    : AskForAction
    verbPhrase = 'ask/asking (whom) (for what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
    askIobjResponseProd = forSingleNoun
;
grammar predicate(AskWhomFor):
    ('ask' | 'a') 'for' topicPhrase->topicMatch
    : AskForAction
    verbPhrase = 'ask/asking (whom) (for what)'
    omitIobjInDobjQuery = true
    construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = singleNoun;
    }
;
grammar predicate(AskAbout):
    ('ask' | 'a') singleNoun->dobjMatch 'about' topicPhrase->topicMatch
    : AskAboutAction
    verbPhrase = 'ask/asking (whom) (about what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
;
grammar predicate(AskAboutImplicit):
    'a' topicPhrase->topicMatch
    : AskAboutAction
    verbPhrase = 'ask/asking (whom) (about what)'
    omitIobjInDobjQuery = true
    construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = singleNoun;
    }
;
grammar predicate(AskAboutWhat):
    [badness 500] 'ask' singleNoun->dobjMatch
    : AskAboutAction
    verbPhrase = 'ask/asking (whom) (about what)'
    askDobjResponseProd = singleNoun
    omitIobjInDobjQuery = true
    construct()
    {
         
        topicMatch = new EmptyNounPhraseProd();
        topicMatch.responseProd = aboutTopicPhrase;
    }
;

grammar predicate(TellAbout):
    ('tell' | 't') singleNoun->dobjMatch 'about' topicPhrase->topicMatch
    : TellAboutAction
    verbPhrase = 'tell/telling (whom) (about what)'
    askDobjResponseProd = singleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(TellAboutImplicit):
    't' topicPhrase->topicMatch
    : TellAboutAction
    verbPhrase = 'tell/telling (whom) (about what)'
    omitIobjInDobjQuery = true
    construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = singleNoun;
    }
;
grammar predicate(TellAboutWhat):
    [badness 500] 'tell' singleNoun->dobjMatch
    : TellAboutAction
    verbPhrase = 'tell/telling (whom) (about what)'
    askDobjResponseProd = singleNoun
    omitIobjInDobjQuery = true
    construct()
    {
         
        topicMatch = new EmptyNounPhraseProd();
        topicMatch.responseProd = aboutTopicPhrase;
    }
;
grammar predicate(AskVague):
    [badness 500] 'ask' singleNoun->dobjMatch topicPhrase->topicMatch
    : AskVagueAction
    verbPhrase = 'ask/asking (whom)'
;
grammar predicate(TellVague):
    [badness 500] 'tell' singleNoun->dobjMatch topicPhrase->topicMatch
    : AskVagueAction
    verbPhrase = 'tell/telling (whom)'
;
grammar predicate(TalkTo):
    ('greet' | 'say' 'hello' 'to' | 'talk' 'to') singleNoun->dobjMatch
    : TalkToAction
    verbPhrase = 'talk/talking (to whom)'
    askDobjResponseProd = singleNoun
;
grammar predicate(TalkToWhat):
    [badness 500] 'talk'
    : TalkToAction
    verbPhrase = 'talk/talking (to whom)'
    askDobjResponseProd = singleNoun
        construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = onSingleNoun;
    }
;
grammar predicate(Topics):
    'topics'
    : TopicsAction
    verbPhrase = 'show/showing topics'
;
grammar predicate(Hello):
    ('say' | ) ('hello' | 'hallo' | 'hi')
    : HelloAction
    verbPhrase = 'say/saying hello'
;
grammar predicate(Goodbye):
    ('say' | ()) ('goodbye' | 'good-bye' | 'good' 'bye' | 'bye')
    : GoodbyeAction
    verbPhrase = 'say/saying goodbye'
;
grammar predicate(Yes):
    'yes' | 'affirmative' | 'say' 'yes'
    : YesAction
    verbPhrase = 'say/saying yes'
;
grammar predicate(No):
    'no' | 'negative' | 'say' 'no'
    : NoAction
    verbPhrase = 'say/saying no'
;
grammar predicate(Yell):
    'yell' | 'scream' | 'shout' | 'holler'
    : YellAction
    verbPhrase = 'yell/yelling'
;
grammar predicate(GiveTo):
    ('give' | 'offer') nounList->dobjMatch 'to' singleNoun->iobjMatch
    : GiveToAction
    verbPhrase = 'give/giving (what) (to whom)'
    askIobjResponseProd = toSingleNoun
;
grammar predicate(GiveToType2):
    ('give' | 'offer') singleNoun->iobjMatch nounList->dobjMatch
    : GiveToAction
    verbPhrase = 'give/giving (what) (to whom)'
    askIobjResponseProd = toSingleNoun

    isPrepositionalPhrasing = nil
;
grammar predicate(GiveToWhom):
    ('give' | 'offer') nounList->dobjMatch
    : GiveToAction
    verbPhrase = 'give/giving (what) (to whom)'
    construct()
    {
         
        iobjMatch = new ImpliedActorNounPhraseProd();
        iobjMatch.responseProd = toSingleNoun;
    }
;
grammar predicate(ShowTo):
    'show' nounList->dobjMatch 'to' singleNoun->iobjMatch
    : ShowToAction
    verbPhrase = 'show/showing (what) (to whom)'
    askIobjResponseProd = toSingleNoun
;
grammar predicate(ShowToType2):
    'show' singleNoun->iobjMatch nounList->dobjMatch
    : ShowToAction
    verbPhrase = 'show/showing (what) (to whom)'
    askIobjResponseProd = toSingleNoun

    isPrepositionalPhrasing = nil
;
grammar predicate(ShowToWhom):
    'show' nounList->dobjMatch
    : ShowToAction
    verbPhrase = 'show/showing (what) (to whom)'
    construct()
    {
         
        iobjMatch = new ImpliedActorNounPhraseProd();
        iobjMatch.responseProd = toSingleNoun;
    }
;
grammar predicate(Throw):
    ('throw' | 'toss') nounList->dobjMatch
    : ThrowAction
    verbPhrase = 'throw/throwing (what)'
;
grammar predicate(ThrowAt):
    ('throw' | 'toss') nounList->dobjMatch 'at' singleNoun->iobjMatch
    : ThrowAtAction
    verbPhrase = 'throw/throwing (what) (at what)'
    askIobjResponseProd = atSingleNoun
;
grammar predicate(ThrowTo):
    ('throw' | 'toss') nounList->dobjMatch 'to' singleNoun->iobjMatch
    : ThrowToAction
    verbPhrase = 'throw/throwing (what) (to whom)'
    askIobjResponseProd = toSingleNoun
;
grammar predicate(ThrowToType2):
    'throw' singleNoun->iobjMatch nounList->dobjMatch
    : ThrowToAction
    verbPhrase = 'throw/throwing (what) (to whom)'
    askIobjResponseProd = toSingleNoun

    isPrepositionalPhrasing = nil
;
grammar predicate(ThrowDir):
    ('throw' | 'toss') nounList->dobjMatch ('to' ('the' | ) | ) directionName->dirMatch
    : ThrowDirAction
    verbPhrase = ('throw/throwing (what) ' + dirMatch.dir.name)
;

grammar predicate(ThrowDirDown):
    'throw' ('down' | 'd') nounList->dobjMatch
    : ThrowDirAction
    verbPhrase = ('throw/throwing (what) down')

    getDirection() { return downDirection; }
;
grammar predicate(Follow):
    'follow' singleNoun->dobjMatch
    : FollowAction
    verbPhrase = 'follow/following (whom)'
    askDobjResponseProd = singleNoun
;
grammar predicate(Attack):
    ('attack' | 'kill' | 'hit' | 'kick' | 'punch') singleNoun->dobjMatch
    : AttackAction
    verbPhrase = 'attack/attacking (whom)'
    askDobjResponseProd = singleNoun
;
grammar predicate(AttackWith):
    ('attack' | 'kill' | 'hit' | 'kick' | 'punch' | 'strike')
        singleNoun->dobjMatch
        'with' singleNoun->iobjMatch
    : AttackWithAction
    verbPhrase = 'attack/attacking (whom) (with what)'
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(Inventory):
    'i' | 'inventory' | 'take' 'inventory'
    : InventoryAction
    verbPhrase = 'take/taking inventory'
;
grammar predicate(InventoryTall):
    'i' 'tall' | 'inventory' 'tall'
    : InventoryTallAction
    verbPhrase = 'take/taking "tall" inventory'
;
grammar predicate(InventoryWide):
    'i' 'wide' | 'inventory' 'wide'
    : InventoryWideAction
    verbPhrase = 'take/taking "wide" inventory'
;
grammar predicate(Wait):
    'z' | 'wait'
    : WaitAction
    verbPhrase = 'wait/waiting'
;
grammar predicate(Look):
    'look' | 'look' 'around' | 'l' | 'l' 'around'
    : LookAction
    verbPhrase = 'look/looking around'
;
grammar predicate(Quit):
    'quit' | 'q'
    : QuitAction
    verbPhrase = 'quit/quitting'
;
grammar predicate(Again):
    'again' | 'g'
    : AgainAction
    verbPhrase = 'repeat/repeating the last command'
;
grammar predicate(Footnote):
    ('footnote' | 'note') numberPhrase->numMatch
    : FootnoteAction
    verbPhrase = 'show/showing a footnote'
;
grammar predicate(FootnotesFull):
    'footnotes' 'full'
    : FootnotesFullAction
    verbPhrase = 'enable/enabling all footnotes'
;
grammar predicate(FootnotesMedium):
    'footnotes' 'medium'
    : FootnotesMediumAction
    verbPhrase = 'enable/enabling new footnotes'
;
grammar predicate(FootnotesOff):
    'footnotes' 'off'
    : FootnotesOffAction
    verbPhrase = 'hide/hiding footnotes'
;
grammar predicate(FootnotesStatus):
    'footnotes'
    : FootnotesStatusAction
    verbPhrase = 'show/showing footnote status'
;
grammar predicate(TipsOn):
    ('tips' | 'tip') 'on'
    : TipModeAction
        stat_ = true
        verbPhrase = 'turn/turning tips on'
;
grammar predicate(TipsOff):
    ('tips' | 'tip') 'off'
    : TipModeAction
        stat_ = nil
        verbPhrase = 'turn/turning tips off'
;
grammar predicate(Verbose):
    'verbose'
    : VerboseAction
    verbPhrase = 'enter/entering VERBOSE mode'
;
grammar predicate(Terse):
    'terse' | 'brief'
    : TerseAction
    verbPhrase = 'enter/entering BRIEF mode'
;
grammar predicate(Score):
    'score' | 'status'
    : ScoreAction
    verbPhrase = 'show/showing score'
;
grammar predicate(FullScore):
    'full' 'score' | 'fullscore' | 'full'
    : FullScoreAction
    verbPhrase = 'show/showing full score'
;
grammar predicate(Notify):
    'notify'
    : NotifyAction
    verbPhrase = 'show/showing notification status'
;
grammar predicate(NotifyOn):
    'notify' 'on'
    : NotifyOnAction
    verbPhrase = 'turn/turning on score notification'
;
grammar predicate(NotifyOff):
    'notify' 'off'
    : NotifyOffAction
    verbPhrase = 'turn/turning off score notification'
;
grammar predicate(Save):
    'save'
    : SaveAction
    verbPhrase = 'save/saving'
;
grammar predicate(SaveString):
    'save' quotedStringPhrase->fname_
    : SaveStringAction
    verbPhrase = 'save/saving'
;
grammar predicate(Restore):
    'restore'
    : RestoreAction
    verbPhrase = 'restore/restoring'
;
grammar predicate(RestoreString):
    'restore' quotedStringPhrase->fname_
    : RestoreStringAction
    verbPhrase = 'restore/restoring'
;
grammar predicate(SaveDefaults):
    'save' 'defaults'
    : SaveDefaultsAction
    verbPhrase = 'save/saving defaults'
;
grammar predicate(RestoreDefaults):
    'restore' 'defaults'
    : RestoreDefaultsAction
    verbPhrase = 'restore/restoring defaults'
;
grammar predicate(Restart):
    'restart'
    : RestartAction
    verbPhrase = 'restart/restarting'
;
grammar predicate(Pause):
    'pause'
    : PauseAction
    verbPhrase = 'pause/pausing'
;
grammar predicate(Undo):
    'undo'
    : UndoAction
    verbPhrase = 'undo/undoing'
;
grammar predicate(Version):
    'version'
    : VersionAction
    verbPhrase = 'show/showing version'
;
grammar predicate(Credits):
    'credits'
    : CreditsAction
    verbPhrase = 'show/showing credits'
;
grammar predicate(About):
    'about'
    : AboutAction
    verbPhrase = 'show/showing story information'
;
grammar predicate(Script):
    'script' | 'script' 'on'
    : ScriptAction
    verbPhrase = 'start/starting scripting'
;
grammar predicate(ScriptString):
    'script' quotedStringPhrase->fname_
    : ScriptStringAction
    verbPhrase = 'start/starting scripting'
;
grammar predicate(ScriptOff):
    'script' 'off' | 'unscript'
    : ScriptOffAction
    verbPhrase = 'end/ending scripting'
;
grammar predicate(Record):
    'record' | 'record' 'on'
    : RecordAction
    verbPhrase = 'start/starting command recording'
;
grammar predicate(RecordString):
    'record' quotedStringPhrase->fname_
    : RecordStringAction
    verbPhrase = 'start/starting command recording'
;
grammar predicate(RecordEvents):
    'record' 'events' | 'record' 'events' 'on'
    : RecordEventsAction
    verbPhrase = 'start/starting event recording'
;
grammar predicate(RecordEventsString):
    'record' 'events' quotedStringPhrase->fname_
    : RecordEventsStringAction
    verbPhrase = 'start/starting command recording'
;
grammar predicate(RecordOff):
    'record' 'off'
    : RecordOffAction
    verbPhrase = 'end/ending command recording'
;
grammar predicate(ReplayString):
    'replay' ('quiet'->quiet_ | 'nonstop'->nonstop_ | )
        (quotedStringPhrase->fname_ | )
    : ReplayStringAction
    verbPhrase = 'replay/replaying command recording'

    scriptOptionFlags = ((quiet_ != nil ? 1 : 0)
                         | (nonstop_ != nil ? 2 : 0))
;
grammar predicate(ReplayQuiet):
    'rq' (quotedStringPhrase->fname_ | )
    : ReplayStringAction
        scriptOptionFlags = 1
;
grammar predicate(VagueTravel): 'go' | 'walk' : VagueTravelAction
    verbPhrase = 'go/going'
;
grammar predicate(Travel):
    'go' directionName->dirMatch | directionName->dirMatch
    : TravelAction
    verbPhrase = ('go/going ' + dirMatch.dir.name)
;


class EnTravelVia: TravelViaAction
    verbPhrase = 'use/using (what)'
;
grammar predicate(Port):
    'go' 'to' ('port' | 'p')
    : PortAction
    dirMatch: DirectionProd { dir = portDirection }
    verbPhrase = 'go/going to port'
;
grammar predicate(Starboard):
    'go' 'to' ('starboard' | 'sb')
    : StarboardAction
    dirMatch: DirectionProd { dir = starboardDirection }
    verbPhrase = 'go/going to starboard'
;
grammar predicate(In):
    'enter'
    : InAction
    dirMatch: DirectionProd { dir = inDirection }
    verbPhrase = 'enter/entering'
;
grammar predicate(Out):
    'exit' | 'leave'
    : OutAction
    dirMatch: DirectionProd { dir = outDirection }
    verbPhrase = 'exit/exiting'
;
grammar predicate(GoThrough):
    ('walk' | 'go' ) ('through' | 'thru')
        singleNoun->dobjMatch
    : GoThroughAction
    verbPhrase = 'go/going (through what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(Enter):
    ('enter' | 'in' | 'into' | 'in' 'to'
     | ('walk' | 'go') ('to' | 'in' | 'in' 'to' | 'into'))
    singleNoun->dobjMatch
    : EnterAction
    verbPhrase = 'enter/entering (what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(GoBack):
    'back' | 'go' 'back' | 'return'
    : GoBackAction
    verbPhrase = 'go/going back'
;
grammar predicate(Dig):
    ('dig' | 'dig' 'in') singleNoun->dobjMatch
    : DigAction
    verbPhrase = 'dig/digging (in what)'
    askDobjResponseProd = inSingleNoun
;
grammar predicate(DigWith):
    ('dig' | 'dig' 'in') singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : DigWithAction
    verbPhrase = 'dig/digging (in what) (with what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = inSingleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(Jump):
    'jump'
    : JumpAction
    verbPhrase = 'jump/jumping'
;
grammar predicate(JumpOffI):
    'jump' 'off'
    : JumpOffIAction
    verbPhrase = 'jump/jumping off'
;
grammar predicate(JumpOff):
    'jump' 'off' singleNoun->dobjMatch
    : JumpOffAction
    verbPhrase = 'jump/jumping (off what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(JumpOver):
    ('jump' | 'jump' 'over') singleNoun->dobjMatch
    : JumpOverAction
    verbPhrase = 'jump/jumping (over what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(Push):
    ('push' | 'press') nounList->dobjMatch
    : PushAction
    verbPhrase = 'push/pushing (what)'
;
grammar predicate(Pull):
    'pull' nounList->dobjMatch
    : PullAction
    verbPhrase = 'pull/pulling (what)'
;
grammar predicate(Move):
    'move' nounList->dobjMatch
    : MoveAction
    verbPhrase = 'move/moving (what)'
;
grammar predicate(MoveTo):
    ('push' | 'move') nounList->dobjMatch ('to' | 'under') singleNoun->iobjMatch
    : MoveToAction
    verbPhrase = 'move/moving (what) (to what)'
    askIobjResponseProd = toSingleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(MoveWith):
    'move' singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : MoveWithAction
    verbPhrase = 'move/moving (what) (with what)'
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(Turn):
    ('turn' | 'twist' | 'rotate') nounList->dobjMatch
    : TurnAction
    verbPhrase = 'turn/turning (what)'
;
grammar predicate(TurnWith):
    ('turn' | 'twist' | 'rotate') singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : TurnWithAction
    verbPhrase = 'turn/turning (what) (with what)'
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(TurnTo):
    ('turn' | 'twist' | 'rotate') singleNoun->dobjMatch
        'to' literalPhrase->literalMatch
    : TurnToAction
    verbPhrase = 'turn/turning (what) (to what)'
    askDobjResponseProd = singleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(Set):
    'set' nounList->dobjMatch
    : SetAction
    verbPhrase = 'set/setting (what)'
;
grammar predicate(SetTo):
    'set' singleNoun->dobjMatch 'to' literalPhrase->literalMatch
    : SetToAction
    verbPhrase = 'set/setting (what) (to what)'
    askDobjResponseProd = singleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(TypeOn):
    'type' 'on' singleNoun->dobjMatch
    : TypeOnAction
    verbPhrase = 'type/typing (on what)'
;
grammar predicate(TypeLiteralOn):
    'type' literalPhrase->literalMatch 'on' singleNoun->dobjMatch
    : TypeLiteralOnAction
    verbPhrase = 'type/typing (what) (on what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(TypeLiteralOnWhat):
    [badness 500] 'type' literalPhrase->literalMatch
    : TypeLiteralOnAction
    verbPhrase = 'type/typing (what) (on what)'
    construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = onSingleNoun;
    }
;
grammar predicate(EnterOn):
    'enter' literalPhrase->literalMatch
        ('on' | 'in' | 'in' 'to' | 'into' | 'with') singleNoun->dobjMatch
    : EnterOnAction
    verbPhrase = 'enter/entering (what) (on what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(EnterOnWhat):
    'enter' literalPhrase->literalMatch
    : EnterOnAction
    verbPhrase = 'enter/entering (what) (on what)'
    construct()
    {
         

        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.setPrompt(onSingleNoun, enterOnWhatAsker);
    }
;

enterOnWhatAsker: ResolveAsker
    askMissingObject(targetActor, action, which)
    {
         
                 throw new ReplacementCommandStringException(
            'get in ' + action.getLiteral(), (libGlobal.curIssuingActor), (libGlobal.curActor));
    }
;
grammar predicate(Consult):
    'consult' singleNoun->dobjMatch : ConsultAction
    verbPhrase = 'consult/consulting (what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(ConsultAbout):
    'consult' singleNoun->dobjMatch ('on' | 'about') topicPhrase->topicMatch
    | 'search' singleNoun->dobjMatch 'for' topicPhrase->topicMatch
    | (('look' | 'l') ('up' | 'for')
       | 'find'
       | 'search' 'for'
       | 'read' 'about')
         topicPhrase->topicMatch 'in' singleNoun->dobjMatch
    | ('look' | 'l') topicPhrase->topicMatch 'up' 'in' singleNoun->dobjMatch
    : ConsultAboutAction
    verbPhrase = 'consult/consulting (what) (about what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
;
grammar predicate(ConsultWhatAbout):
    (('look' | 'l') ('up' | 'for')
     | 'find'
     | 'search' 'for'
     | 'read' 'about')
    topicPhrase->topicMatch
    | ('look' | 'l') topicPhrase->topicMatch 'up'
    : ConsultAboutAction
    verbPhrase = 'look/looking up (what) (in what)'
    whichMessageTopic = DirectObject
    construct()
    {
         
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = inSingleNoun;
    }
;
grammar predicate(Switch):
    'switch' nounList->dobjMatch
    : SwitchAction
    verbPhrase = 'switch/switching (what)'
;
grammar predicate(Flip):
    'flip' nounList->dobjMatch
    : FlipAction
    verbPhrase = 'flip/flipping (what)'
;
grammar predicate(TurnOn):
    ('activate' | ('turn' | 'switch') 'on') nounList->dobjMatch
    | ('turn' | 'switch') nounList->dobjMatch 'on'
    : TurnOnAction
    verbPhrase = 'turn/turning on (what)'
;
grammar predicate(TurnOff):
    ('deactivate' | ('turn' | 'switch') 'off') nounList->dobjMatch
    | ('turn' | 'switch') nounList->dobjMatch 'off'
    : TurnOffAction
    verbPhrase = 'turn/turning off (what)'
;
grammar predicate(Light):
    'light' nounList->dobjMatch
    : LightAction
    verbPhrase = 'light/lighting (what)'
;
class StrikeAction:TAction     baseActionClass = StrikeAction     verDobjProp = &verifyDobjStrike     remapDobjProp = &remapDobjStrike     preCondDobjProp = &preCondDobjStrike     checkDobjProp = &checkDobjStrike     actionDobjProp  = &actionDobjStrike;
grammar predicate(Strike):
    'strike' nounList->dobjMatch
    : StrikeAction
    verbPhrase = 'strike/striking (what)'
;
grammar predicate(Burn):
    ('burn' | 'ignite' | 'set' 'fire' 'to') nounList->dobjMatch
    : BurnAction
    verbPhrase = 'light/lighting (what)'
;
grammar predicate(BurnWith):
    ('light' | 'burn' | 'ignite' | 'set' 'fire' 'to') singleNoun->dobjMatch
        'with' singleNoun->iobjMatch
    : BurnWithAction
    verbPhrase = 'light/lighting (what) (with what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(Extinguish):
    ('extinguish' | 'douse' | 'put' 'out' | 'blow' 'out') nounList->dobjMatch
    | ('blow' | 'put') nounList->dobjMatch 'out'
    : ExtinguishAction
    verbPhrase = 'extinguish/extinguishing (what)'
;
grammar predicate(Break):
    ('break' | 'ruin' | 'destroy' | 'wreck') nounList->dobjMatch
    : BreakAction
    verbPhrase = 'break/breaking (what)'
;
grammar predicate(CutWithWhat):
    [badness 500] 'cut' singleNoun->dobjMatch
    : CutWithAction
    verbPhrase = 'cut/cutting (what) (with what)'
    construct()
    {
         
        iobjMatch = new EmptyNounPhraseProd();
        iobjMatch.responseProd = withSingleNoun;
    }
;
grammar predicate(CutWith):
    'cut' singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : CutWithAction
    verbPhrase = 'cut/cutting (what) (with what)'
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(Eat):
    ('eat' | 'consume') nounList->dobjMatch
    : EatAction
    verbPhrase = 'eat/eating (what)'
;
grammar predicate(Drink):
    ('drink' | 'quaff' | 'imbibe') nounList->dobjMatch
    : DrinkAction
    verbPhrase = 'drink/drinking (what)'
;
grammar predicate(Pour):
    'pour' nounList->dobjMatch
    : PourAction
    verbPhrase = 'pour/pouring (what)'
;
grammar predicate(PourInto):
    'pour' nounList->dobjMatch ('in' | 'into' | 'in' 'to') singleNoun->iobjMatch
    : PourIntoAction
    verbPhrase = 'pour/pouring (what) (into what)'
    askIobjResponseProd = inSingleNoun
;
grammar predicate(PourOnto):
    'pour' nounList->dobjMatch ('on' | 'onto' | 'on' 'to') singleNoun->iobjMatch
    : PourOntoAction
    verbPhrase = 'pour/pouring (what) (onto what)'
    askIobjResponseProd = onSingleNoun
;
grammar predicate(Climb):
    'climb' singleNoun->dobjMatch
    : ClimbAction
    verbPhrase = 'climb/climbing (what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(ClimbUp):
    ('climb' | 'go' | 'walk') 'up' singleNoun->dobjMatch
    : ClimbUpAction
    verbPhrase = 'climb/climbing (up what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(ClimbUpWhat):
    [badness 200] ('climb' | 'go' | 'walk') 'up'
    : ClimbUpAction
    verbPhrase = 'climb/climbing (up what)'
    askDobjResponseProd = singleNoun
    construct()
    {
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = onSingleNoun;
    }
;
grammar predicate(ClimbDown):
    ('climb' | 'go' | 'walk') 'down' singleNoun->dobjMatch
    : ClimbDownAction
    verbPhrase = 'climb/climbing (down what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(ClimbDownWhat):
    [badness 200] ('climb' | 'go' | 'walk') 'down'
    : ClimbDownAction
    verbPhrase = 'climb/climbing (down what)'
    askDobjResponseProd = singleNoun
    construct()
    {
        dobjMatch = new EmptyNounPhraseProd();
        dobjMatch.responseProd = onSingleNoun;
    }
;
grammar predicate(Clean):
    'clean' nounList->dobjMatch
    : CleanAction
    verbPhrase = 'clean/cleaning (what)'
;
grammar predicate(CleanWith):
    'clean' nounList->dobjMatch 'with' singleNoun->iobjMatch
    : CleanWithAction
    verbPhrase = 'clean/cleaning (what) (with what)'
    askIobjResponseProd = withSingleNoun
    omitIobjInDobjQuery = true
;
grammar predicate(AttachTo):
    ('attach' | 'connect') nounList->dobjMatch 'to' singleNoun->iobjMatch
    : AttachToAction
    askIobjResponseProd = toSingleNoun
    verbPhrase = 'attach/attaching (what) (to what)'
;
grammar predicate(AttachToWhat):
    [badness 500] ('attach' | 'connect') nounList->dobjMatch
    : AttachToAction
    verbPhrase = 'attach/attaching (what) (to what)'
    construct()
    {
         
        iobjMatch = new EmptyNounPhraseProd();
        iobjMatch.responseProd = toSingleNoun;
    }
;
grammar predicate(DetachFrom):
    ('detach' | 'disconnect') nounList->dobjMatch 'from' singleNoun->iobjMatch
    : DetachFromAction
    verbPhrase = 'detach/detaching (what) (from what)'
    askIobjResponseProd = fromSingleNoun
;
grammar predicate(Detach):
    ('detach' | 'disconnect') nounList->dobjMatch
    : DetachAction
    verbPhrase = 'detach/detaching (what)'
;
grammar predicate(Open):
    'open' nounList->dobjMatch
    : OpenAction
    verbPhrase = 'open/opening (what)'
;
grammar predicate(Close):
    ('close' | 'shut') nounList->dobjMatch
    : CloseAction
    verbPhrase = 'close/closing (what)'
;
grammar predicate(Lock):
    'lock' nounList->dobjMatch
    : LockAction
    verbPhrase = 'lock/locking (what)'
;
grammar predicate(Unlock):
    'unlock' nounList->dobjMatch
    : UnlockAction
    verbPhrase = 'unlock/unlocking (what)'
;
grammar predicate(LockWith):
    'lock' singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : LockWithAction
    verbPhrase = 'lock/locking (what) (with what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(UnlockWith):
    'unlock' singleNoun->dobjMatch 'with' singleNoun->iobjMatch
    : UnlockWithAction
    verbPhrase = 'unlock/unlocking (what) (with what)'
    omitIobjInDobjQuery = true
    askDobjResponseProd = singleNoun
    askIobjResponseProd = withSingleNoun
;
grammar predicate(SitOn):
    'sit' ('on' | 'in' | 'down' 'on' | 'down' 'in')
        singleNoun->dobjMatch
    : SitOnAction
    verbPhrase = 'sit/sitting (on what)'
    askDobjResponseProd = singleNoun

    adjustDefaultObjectPrep(prep, obj)
        { return (obj != nil ? obj.actorInPrep + ' ' : prep); }
;
grammar predicate(Sit):
    'sit' ( | 'down') : SitAction
    verbPhrase = 'sit/sitting down'
;
grammar predicate(LieOn):
    'lie' ('on' | 'in' | 'down' 'on' | 'down' 'in')
        singleNoun->dobjMatch
    : LieOnAction
    verbPhrase = 'lie/lying (on what)'
    askDobjResponseProd = singleNoun

    adjustDefaultObjectPrep(prep, obj)
        { return (obj != nil ? obj.actorInPrep + ' ' : prep); }
;
grammar predicate(Lie):
    'lie' ( | 'down') : LieAction
    verbPhrase = 'lie/lying down'
;
grammar predicate(StandOn):
    ('stand' ('on' | 'in' | 'onto' | 'on' 'to' | 'into' | 'in' 'to')
     | 'climb' ('on' | 'onto' | 'on' 'to'))
    singleNoun->dobjMatch
    : StandOnAction
    verbPhrase = 'stand/standing (on what)'
    askDobjResponseProd = singleNoun

    adjustDefaultObjectPrep(prep, obj)
        { return (obj != nil ? obj.actorInPrep + ' ' : prep); }
;
grammar predicate(Stand):
    'stand' | 'stand' 'up' | 'get' 'up'
    : StandAction
    verbPhrase = 'stand/standing up'
;
grammar predicate(GetOutOf):
    ('out' 'of' | 'get' 'out' 'of' | 'climb' 'out' 'of' | 'leave' | 'exit')
    singleNoun->dobjMatch
    : GetOutOfAction
    verbPhrase = 'get/getting (out of what)'
    askDobjResponseProd = singleNoun

    adjustDefaultObjectPrep(prep, obj)
        { return (obj != nil ? obj.actorOutOfPrep + ' ' : prep); }
;
grammar predicate(GetOffOf):
    'get' ('off' | 'off' 'of' | 'down' 'from') singleNoun->dobjMatch
    : GetOffOfAction
    verbPhrase = 'get/getting (off of what)'
    askDobjResponseProd = singleNoun

    adjustDefaultObjectPrep(prep, obj)
        { return (obj != nil ? obj.actorOutOfPrep + ' ' : prep); }
;
grammar predicate(GetOut):
    'get' 'out'
    | 'get' 'off'
    | 'get' 'down'
    | 'disembark'
    | 'climb' 'out'
    : GetOutAction
    verbPhrase = 'get/getting out'
;
grammar predicate(Board):
    ('board'
     | ('get' ('in' | 'into' | 'in' 'to' | 'on' | 'onto' | 'on' 'to'))
     | ('climb' ('in' | 'into' | 'in' 'to')))
    singleNoun->dobjMatch
    : BoardAction
    verbPhrase = 'get/getting (in what)'
    askDobjResponseProd = singleNoun
;
grammar predicate(Sleep):
    'sleep'
    : SleepAction
    verbPhrase = 'sleep/sleeping'
;
grammar predicate(Fasten):
    ('fasten' | 'buckle' | 'buckle' 'up') nounList->dobjMatch
    : FastenAction
    verbPhrase = 'fasten/fastening (what)'
;
grammar predicate(FastenTo):
    ('fasten' | 'buckle') nounList->dobjMatch 'to' singleNoun->iobjMatch
    : FastenToAction
    verbPhrase = 'fasten/fastening (what) (to what)'
    askIobjResponseProd = toSingleNoun
;
grammar predicate(Unfasten):
    ('unfasten' | 'unbuckle') nounList->dobjMatch
    : UnfastenAction
    verbPhrase = 'unfasten/unfastening (what)'
;
grammar predicate(UnfastenFrom):
    ('unfasten' | 'unbuckle') nounList->dobjMatch 'from' singleNoun->iobjMatch
    : UnfastenFromAction
    verbPhrase = 'unfasten/unfastening (what) (from what)'
    askIobjResponseProd = fromSingleNoun
;
grammar predicate(PlugInto):
    'plug' nounList->dobjMatch ('in' | 'into' | 'in' 'to') singleNoun->iobjMatch
    : PlugIntoAction
    verbPhrase = 'plug/plugging (what) (into what)'
    askIobjResponseProd = inSingleNoun
;
grammar predicate(PlugIntoWhat):
    [badness 500] 'plug' nounList->dobjMatch
    : PlugIntoAction
    verbPhrase = 'plug/plugging (what) (into what)'
    construct()
    {
         
        iobjMatch = new EmptyNounPhraseProd();
        iobjMatch.responseProd = inSingleNoun;
    }
;
grammar predicate(PlugIn):
    'plug' nounList->dobjMatch 'in'
    | 'plug' 'in' nounList->dobjMatch
    : PlugInAction
    verbPhrase = 'plug/plugging (what)'
;
grammar predicate(UnplugFrom):
    'unplug' nounList->dobjMatch 'from' singleNoun->iobjMatch
    : UnplugFromAction
    verbPhrase = 'unplug/unplugging (what) (from what)'
    askIobjResponseProd = fromSingleNoun
;
grammar predicate(Unplug):
    'unplug' nounList->dobjMatch
    : UnplugAction
    verbPhrase = 'unplug/unplugging (what)'
;
grammar predicate(Screw):
    'screw' nounList->dobjMatch
    : ScrewAction
    verbPhrase = 'screw/screwing (what)'
;
grammar predicate(ScrewWith):
    'screw' nounList->dobjMatch 'with' singleNoun->iobjMatch
    : ScrewWithAction
    verbPhrase = 'screw/screwing (what) (with what)'
    omitIobjInDobjQuery = true
    askIobjResponseProd = withSingleNoun
;
grammar predicate(Unscrew):
    'unscrew' nounList->dobjMatch
    : UnscrewAction
    verbPhrase = 'unscrew/unscrewing (what)'
;
grammar predicate(UnscrewWith):
    'unscrew' nounList->dobjMatch 'with' singleNoun->iobjMatch
    : UnscrewWithAction
    verbPhrase = 'unscrew/unscrewing (what) (with what)'
    omitIobjInDobjQuery = true
    askIobjResponseProd = withSingleNoun
;
grammar predicate(PushTravelDir):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch directionName->dirMatch
    : PushTravelDirAction
    verbPhrase = ('push/pushing (what) ' + dirMatch.dir.name)
;
grammar predicate(PushTravelThrough):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch
    ('through' | 'thru') singleNoun->iobjMatch
    : PushTravelThroughAction
    verbPhrase = 'push/pushing (what) (through what)'
;
grammar predicate(PushTravelEnter):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch
    ('in' | 'into' | 'in' 'to') singleNoun->iobjMatch
    : PushTravelEnterAction
    verbPhrase = 'push/pushing (what) (into what)'
;
grammar predicate(PushTravelGetOutOf):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch
    'out' ('of' | ) singleNoun->iobjMatch
    : PushTravelGetOutOfAction
    verbPhrase = 'push/pushing (what) (out of what)'
;

grammar predicate(PushTravelClimbUp):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch
    'up' singleNoun->iobjMatch
    : PushTravelClimbUpAction
    verbPhrase = 'push/pushing (what) (up what)'
    omitIobjInDobjQuery = true
;
grammar predicate(PushTravelClimbDown):
    ('push' | 'pull' | 'drag' | 'move') singleNoun->dobjMatch
    'down' singleNoun->iobjMatch
    : PushTravelClimbDownAction
    verbPhrase = 'push/pushing (what) (down what)'
;
grammar predicate(Exits):
    'exits'
    : ExitsAction
    verbPhrase = 'exits/showing exits'
;
grammar predicate(ExitsMode):
    'exits' ('on'->on_ | 'all'->on_
             | 'off'->off_ | 'none'->off_
             | ('status' ('line' | ) | 'statusline') 'look'->on_
             | 'look'->on_ ('status' ('line' | ) | 'statusline')
             | 'status'->stat_ ('line' | ) | 'statusline'->stat_
             | 'look'->look_)
    : ExitsModeAction
    verbPhrase = 'turn/turning off exits display'
;
grammar predicate(HintsOff):
    'hints' 'off'
    : HintsOffAction
    verbPhrase = 'disable/disabling hints'
;
grammar predicate(Hint):
    'hint' | 'hints'
    : HintAction
    verbPhrase = 'show/showing hints'
;
grammar predicate(Oops):
    ('oops' | 'o') literalPhrase->literalMatch
    : OopsAction
    verbPhrase = 'oops/correcting (what)'
;
grammar predicate(OopsOnly):
    ('oops' | 'o')
    : OopsIAction
    verbPhrase = 'oops/correcting'
;
